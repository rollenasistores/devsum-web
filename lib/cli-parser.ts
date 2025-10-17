import { commandPatterns, quickCommands, MockOutput, CommandPattern } from './mock-cli-outputs';

export interface ParsedCommand {
  command: string;
  options: Record<string, string | boolean>;
  isValid: boolean;
  output?: MockOutput;
  suggestions?: string[];
}

export interface CommandSuggestion {
  command: string;
  description: string;
  matchScore?: number;
}

/**
 * Parse a command string and return the appropriate mock output
 */
export function parseCommand(input: string): ParsedCommand {
  // Clean and normalize input
  const cleanInput = input.trim().toLowerCase();
  
  if (!cleanInput) {
    return {
      command: '',
      options: {},
      isValid: false,
      output: {
        content: 'Please enter a command. Type "devsum --help" for available commands.',
        type: 'text',
        delay: 100
      },
      suggestions: ['devsum --help', 'devsum report --since 7d']
    };
  }

  // Find matching pattern
  for (const pattern of commandPatterns) {
    if (pattern.pattern.test(cleanInput)) {
      return {
        command: extractCommand(cleanInput),
        options: extractOptions(cleanInput),
        isValid: true,
        output: pattern.output,
        suggestions: pattern.suggestions
      };
    }
  }

  // No exact match found, try to find similar commands
  const suggestions = findSimilarCommands(cleanInput);
  
  return {
    command: extractCommand(cleanInput),
    options: extractOptions(cleanInput),
    isValid: false,
    output: {
      content: `❌ Command not found: "${input}"\n\n💡 Did you mean one of these?\n${suggestions.map(s => `  • ${s.command}`).join('\n')}\n\nType "devsum --help" for all available commands.`,
      type: 'error',
      delay: 200
    },
    suggestions: suggestions.map(s => s.command)
  };
}

/**
 * Extract the main command from input string
 */
function extractCommand(input: string): string {
  const parts = input.split(/\s+/);
  return parts[0] || '';
}

/**
 * Extract options from input string
 */
function extractOptions(input: string): Record<string, string | boolean> {
  const options: Record<string, string | boolean> = {};
  const parts = input.split(/\s+/);
  
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    
    if (part.startsWith('--')) {
      const option = part.substring(2);
      if (i + 1 < parts.length && !parts[i + 1].startsWith('-')) {
        options[option] = parts[i + 1];
        i++; // Skip the value
      } else {
        options[option] = true;
      }
    } else if (part.startsWith('-') && part.length === 2) {
      const option = part.substring(1);
      if (i + 1 < parts.length && !parts[i + 1].startsWith('-')) {
        options[option] = parts[i + 1];
        i++; // Skip the value
      } else {
        options[option] = true;
      }
    }
  }
  
  return options;
}

/**
 * Find similar commands based on fuzzy matching
 */
function findSimilarCommands(input: string): CommandSuggestion[] {
  const suggestions: CommandSuggestion[] = [];
  const inputLower = input.toLowerCase();
  
  // Check against quick commands
  for (const cmd of quickCommands) {
    const commandLower = cmd.command.toLowerCase();
    const matchScore = calculateMatchScore(inputLower, commandLower);
    
    if (matchScore > 0.3) { // Threshold for similarity
      suggestions.push({
        command: cmd.command,
        description: cmd.description,
        matchScore
      });
    }
  }
  
  // Sort by match score (highest first)
  return suggestions
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 5); // Return top 5 suggestions
}

/**
 * Calculate similarity score between two strings
 */
function calculateMatchScore(input: string, command: string): number {
  // Simple Levenshtein distance-based similarity
  const distance = levenshteinDistance(input, command);
  const maxLength = Math.max(input.length, command.length);
  
  if (maxLength === 0) return 1;
  
  return 1 - (distance / maxLength);
}

/**
 * Calculate Levenshtein distance between two strings
 */
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }
  
  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // deletion
        matrix[j - 1][i] + 1,     // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Get autocomplete suggestions for partial input
 */
export function getAutocompleteSuggestions(input: string): CommandSuggestion[] {
  const cleanInput = input.trim().toLowerCase();
  
  if (!cleanInput) {
    return quickCommands.slice(0, 5);
  }
  
  const suggestions: CommandSuggestion[] = [];
  
  // Check for partial matches
  for (const cmd of quickCommands) {
    const commandLower = cmd.command.toLowerCase();
    
    if (commandLower.startsWith(cleanInput)) {
      suggestions.push({
        command: cmd.command,
        description: cmd.description,
        matchScore: 1.0
      });
    } else if (commandLower.includes(cleanInput)) {
      suggestions.push({
        command: cmd.command,
        description: cmd.description,
        matchScore: 0.8
      });
    }
  }
  
  // If no direct matches, try fuzzy matching
  if (suggestions.length === 0) {
    return findSimilarCommands(cleanInput);
  }
  
  return suggestions
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 5);
}

/**
 * Get command history suggestions
 */
export function getCommandHistorySuggestions(history: string[], currentInput: string): string[] {
  if (!currentInput.trim()) {
    return history.slice(-10).reverse(); // Last 10 commands, most recent first
  }
  
  const inputLower = currentInput.toLowerCase();
  return history
    .filter(cmd => cmd.toLowerCase().includes(inputLower))
    .slice(-5)
    .reverse();
}

/**
 * Validate command syntax
 */
export function validateCommand(input: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const cleanInput = input.trim();
  
  if (!cleanInput) {
    errors.push('Command cannot be empty');
    return { isValid: false, errors };
  }
  
  // Check if it starts with 'devsum'
  if (!cleanInput.startsWith('devsum')) {
    errors.push('Commands must start with "devsum"');
  }
  
  // Check for basic syntax issues
  if (cleanInput.includes('  ')) {
    errors.push('Multiple spaces detected');
  }
  
  // Check for invalid characters
  if (!/^[a-zA-Z0-9\s\-_=]+$/.test(cleanInput)) {
    errors.push('Invalid characters detected');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Format command for display
 */
export function formatCommand(input: string): string {
  return input
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();
}

/**
 * Get available commands list
 */
export function getAvailableCommands(): string[] {
  return quickCommands.map(cmd => cmd.command);
}

/**
 * Get command help text
 */
export function getCommandHelp(command: string): string | null {
  const cleanCommand = command.trim().toLowerCase();
  
  if (cleanCommand === 'devsum' || cleanCommand === 'devsum --help' || cleanCommand === 'devsum -h') {
    return 'Show all available commands and options';
  }
  
  if (cleanCommand.startsWith('devsum report')) {
    return 'Generate accomplishment reports from git commits';
  }
  
  if (cleanCommand.startsWith('devsum analyze')) {
    return 'Analyze git commits and generate summary (alias for report)';
  }
  
  if (cleanCommand.startsWith('devsum commit')) {
    return 'Generate AI-powered commit messages';
  }
  
  if (cleanCommand.startsWith('devsum setup')) {
    return 'Configure DevSum settings and AI providers';
  }
  
  if (cleanCommand.startsWith('devsum login')) {
    return 'View authentication status and free mode info';
  }
  
  if (cleanCommand.startsWith('devsum analytics')) {
    return 'Interactive analytics dashboard';
  }
  
  if (cleanCommand.startsWith('devsum update')) {
    return 'Check for DevSum updates';
  }
  
  if (cleanCommand.startsWith('devsum telemetry')) {
    return 'Manage usage tracking settings';
  }
  
  return null;
}
