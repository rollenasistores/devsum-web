'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal, Copy, RotateCcw, Maximize2, Minimize2, X } from 'lucide-react';
import { parseCommand, getAutocompleteSuggestions, getCommandHistorySuggestions, CommandSuggestion } from '@/lib/cli-parser';
import { TerminalOutput } from '@/components/terminal-output';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TerminalEntry {
  id: string;
  command: string;
  output: string;
  type: 'markdown' | 'json' | 'html' | 'text' | 'error';
  timestamp: Date;
}

interface InteractiveTerminalProps {
  className?: string;
}

export function InteractiveTerminal({ className }: InteractiveTerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<CommandSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load command history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('devsum-terminal-history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to load terminal history:', error);
      }
    }
  }, []);

  // Save command history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('devsum-terminal-history', JSON.stringify(history));
    }
  }, [history]);

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current && !isLoading) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  // Scroll to bottom when new entries are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [entries]);

  // Handle input changes and autocomplete
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (value.trim()) {
      const autocompleteSuggestions = getAutocompleteSuggestions(value);
      setSuggestions(autocompleteSuggestions);
      setShowSuggestions(autocompleteSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, []);

  // Handle command execution
  const executeCommand = useCallback(async (command: string) => {
    if (!command.trim()) return;

    // Add to history
    const newHistory = [...history, command];
    setHistory(newHistory);
    setHistoryIndex(-1);

    // Clear input and suggestions
    setInput('');
    setSuggestions([]);
    setShowSuggestions(false);
    setIsLoading(true);

    // Hide welcome message
    if (showWelcome) {
      setShowWelcome(false);
    }

    // Parse and execute command
    const result = parseCommand(command);
    
    // Simulate realistic delay
    const delay = result.output?.delay || 300;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Add entry to terminal
    const newEntry: TerminalEntry = {
      id: Date.now().toString(),
      command,
      output: result.output?.content || '',
      type: result.output?.type || 'text',
      timestamp: new Date()
    };

    setEntries(prev => [...prev, newEntry]);
    setIsLoading(false);
  }, [history, showWelcome]);

  // Handle form submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      executeCommand(input);
    }
  }, [input, isLoading, executeCommand]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0].command);
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSuggestions([]);
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      if (isLoading) {
        setIsLoading(false);
        setInput('');
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      clearTerminal();
    }
  }, [history, historyIndex, suggestions, isLoading]);

  // Clear terminal
  const clearTerminal = useCallback(() => {
    setEntries([]);
    setShowWelcome(true);
  }, []);

  // Copy output to clipboard
  const copyOutput = useCallback((output: string) => {
    navigator.clipboard.writeText(output);
  }, []);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion: CommandSuggestion) => {
    setInput(suggestion.command);
    setShowSuggestions(false);
    inputRef.current?.focus();
  }, []);

  // Quick command buttons
  const quickCommands = [
    'devsum --help',
    'devsum report --since 7d',
    'devsum report --format json',
    'devsum commit --dry-run',
    'devsum --version'
  ];

  return (
    <div className={cn(
      'relative',
      isFullscreen ? 'fixed inset-0 z-50 bg-background' : '',
      className
    )}>
      <Card className="h-full bg-slate-950 text-green-400 font-mono">
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span className="text-sm font-medium">DevSum CLI Terminal</span>
            <Badge variant="secondary" className="text-xs">
              Interactive Demo
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearTerminal}
              className="h-8 w-8 p-0 text-slate-400 hover:text-green-400"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="h-8 w-8 p-0 text-slate-400 hover:text-green-400"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            {isFullscreen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(false)}
                className="h-8 w-8 p-0 text-slate-400 hover:text-red-400"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="h-64 sm:h-80 md:h-96 overflow-y-auto p-2 sm:p-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
          style={{ scrollbarWidth: 'thin' }}
        >
          {/* Welcome Message */}
          {showWelcome && (
            <div className="space-y-2 text-green-300 animate-in fade-in-0 duration-500">
              <div className="text-lg font-bold">🚀 Welcome to DevSum CLI Interactive Demo</div>
              <div className="text-sm text-slate-400">
                Try out DevSum commands in this simulated terminal. All outputs are realistic examples.
              </div>
              <div className="text-sm">
                <div className="text-green-400">Quick commands to try:</div>
                <div className="mt-2 space-y-1">
                  {quickCommands.map((cmd, index) => (
                    <div key={index} className="text-slate-300 hover:text-white transition-colors cursor-pointer" 
                         onClick={() => setInput(cmd)}>
                      <span className="text-slate-500">$</span> {cmd}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-xs text-slate-500 mt-4">
                💡 Use ↑/↓ arrows for command history, Tab for autocomplete, Ctrl+L to clear
              </div>
            </div>
          )}

          {/* Terminal Entries */}
          {entries.map((entry, index) => (
            <div key={entry.id} className="space-y-1 animate-in slide-in-from-bottom-2 duration-300" 
                 style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex items-center gap-2">
                <span className="text-green-400">$</span>
                <span className="text-white">{entry.command}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyOutput(entry.output)}
                  className="h-6 w-6 p-0 text-slate-400 hover:text-green-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <div className="ml-4 group">
                <TerminalOutput 
                  content={entry.output} 
                  type={entry.type}
                />
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-green-400">
              <span>$</span>
              <span className="text-white">{input}</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Command Input */}
        <div className="border-t border-slate-800 p-2 sm:p-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-sm sm:text-base">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type a DevSum command..."
                className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none focus:ring-0 focus:border-0 text-sm sm:text-base"
                disabled={isLoading}
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            
            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div 
                ref={suggestionsRef}
                className="absolute top-full left-6 sm:left-8 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-md shadow-lg z-10 max-h-32 sm:max-h-48 overflow-y-auto"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <div className="font-mono text-green-400 truncate">{suggestion.command}</div>
                    <div className="text-xs text-slate-500 hidden sm:block">{suggestion.description}</div>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>
      </Card>
    </div>
  );
}
