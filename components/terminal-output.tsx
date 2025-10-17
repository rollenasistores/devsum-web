'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TerminalOutputProps {
  content: string;
  type: 'markdown' | 'json' | 'html' | 'text' | 'error';
  className?: string;
}

export function TerminalOutput({ content, type, className }: TerminalOutputProps) {
  const [copied, setCopied] = useState(false);
  const [expandedJson, setExpandedJson] = useState<Set<string>>(new Set());
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Toggle JSON object expansion
  const toggleJsonExpansion = (key: string) => {
    const newExpanded = new Set(expandedJson);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedJson(newExpanded);
  };

  // Render JSON with collapsible sections
  const renderJson = (obj: any, path: string = '', depth: number = 0): React.ReactNode => {
    if (typeof obj === 'string') {
      return <span className="text-green-300">"{obj}"</span>;
    }
    
    if (typeof obj === 'number') {
      return <span className="text-blue-300">{obj}</span>;
    }
    
    if (typeof obj === 'boolean') {
      return <span className="text-purple-300">{obj ? 'true' : 'false'}</span>;
    }
    
    if (obj === null) {
      return <span className="text-gray-400">null</span>;
    }
    
    if (Array.isArray(obj)) {
      const isExpanded = expandedJson.has(path);
      return (
        <div className="ml-2">
          <button
            onClick={() => toggleJsonExpansion(path)}
            className="flex items-center gap-1 text-slate-400 hover:text-white"
          >
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            <span>[</span>
            {!isExpanded && <span className="text-slate-500">...{obj.length} items</span>}
          </button>
          {isExpanded && (
            <div className="ml-4">
              {obj.map((item, index) => (
                <div key={index}>
                  <span className="text-slate-500">{index}:</span> {renderJson(item, `${path}[${index}]`, depth + 1)}
                </div>
              ))}
              <span>]</span>
            </div>
          )}
        </div>
      );
    }
    
    if (typeof obj === 'object') {
      const isExpanded = expandedJson.has(path);
      const keys = Object.keys(obj);
      
      return (
        <div className="ml-2">
          <button
            onClick={() => toggleJsonExpansion(path)}
            className="flex items-center gap-1 text-slate-400 hover:text-white"
          >
            {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            <span>{'{'}</span>
            {!isExpanded && <span className="text-slate-500">...{keys.length} properties</span>}
          </button>
          {isExpanded && (
            <div className="ml-4">
              {keys.map((key, index) => (
                <div key={key}>
                  <span className="text-yellow-300">"{key}"</span>
                  <span className="text-slate-500">: </span>
                  {renderJson(obj[key], `${path}.${key}`, depth + 1)}
                  {index < keys.length - 1 && <span className="text-slate-500">,</span>}
                </div>
              ))}
              <span>{'}'}</span>
            </div>
          )}
        </div>
      );
    }
    
    return <span className="text-slate-300">{String(obj)}</span>;
  };

  // Render markdown with basic formatting
  const renderMarkdown = (text: string): React.ReactNode => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Headers
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-lg sm:text-xl font-bold text-white mt-4 mb-2">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-base sm:text-lg font-semibold text-white mt-3 mb-2">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-sm sm:text-base font-medium text-white mt-2 mb-1">
            {line.substring(4)}
          </h3>
        );
      }
      // Code blocks
      else if (line.startsWith('```')) {
        const language = line.substring(3);
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        elements.push(
          <pre key={i} className="bg-slate-900 p-2 sm:p-3 rounded text-xs sm:text-sm text-slate-300 overflow-x-auto my-2">
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
      }
      // Inline code
      else if (line.includes('`')) {
        const parts = line.split('`');
        const formattedLine = parts.map((part, index) => 
          index % 2 === 1 ? (
            <code key={index} className="bg-slate-800 px-1 rounded text-green-300">
              {part}
            </code>
          ) : part
        );
        elements.push(
          <p key={i} className="text-slate-300 my-1">
            {formattedLine}
          </p>
        );
      }
      // Lists
      else if (line.startsWith('- ')) {
        elements.push(
          <li key={i} className="text-slate-300 ml-4 my-1">
            {line.substring(2)}
          </li>
        );
      }
      // Bold text
      else if (line.includes('**')) {
        const parts = line.split('**');
        const formattedLine = parts.map((part, index) => 
          index % 2 === 1 ? (
            <strong key={index} className="text-white font-semibold">
              {part}
            </strong>
          ) : part
        );
        elements.push(
          <p key={i} className="text-slate-300 my-1">
            {formattedLine}
          </p>
        );
      }
      // Regular paragraphs
      else if (line.trim()) {
        elements.push(
          <p key={i} className="text-slate-300 my-1 text-sm sm:text-base">
            {line}
          </p>
        );
      }
      // Empty lines
      else {
        elements.push(<br key={i} />);
      }
    }
    
    return <div>{elements}</div>;
  };

  // Render plain text with ANSI color support
  const renderText = (text: string): React.ReactNode => {
    // Simple ANSI color code handling
    const ansiRegex = /\x1b\[[0-9;]*m/g;
    const parts = text.split(ansiRegex);
    const codes = text.match(ansiRegex) || [];
    
    return (
      <div className="whitespace-pre-wrap">
        {parts.map((part, index) => {
          const code = codes[index - 1];
          let className = 'text-slate-300';
          
          if (code) {
            if (code.includes('31') || code.includes('91')) {
              className = 'text-red-400'; // Red
            } else if (code.includes('32') || code.includes('92')) {
              className = 'text-green-400'; // Green
            } else if (code.includes('33') || code.includes('93')) {
              className = 'text-yellow-400'; // Yellow
            } else if (code.includes('34') || code.includes('94')) {
              className = 'text-blue-400'; // Blue
            } else if (code.includes('35') || code.includes('95')) {
              className = 'text-purple-400'; // Magenta
            } else if (code.includes('36') || code.includes('96')) {
              className = 'text-cyan-400'; // Cyan
            } else if (code.includes('1')) {
              className = 'text-white font-bold'; // Bold
            }
          }
          
          return (
            <span key={index} className={className}>
              {part}
            </span>
          );
        })}
      </div>
    );
  };

  // Render content based on type
  const renderContent = (): React.ReactNode => {
    switch (type) {
      case 'json':
        try {
          const parsed = JSON.parse(content);
          return renderJson(parsed);
        } catch {
          return <div className="text-red-400">Invalid JSON</div>;
        }
      
      case 'markdown':
        return renderMarkdown(content);
      
      case 'html':
        return (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHtmlPreview(!showHtmlPreview)}
                className="h-6 px-2 text-xs text-slate-400 hover:text-white"
              >
                {showHtmlPreview ? 'Hide' : 'Show'} Preview
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const blob = new Blob([content], { type: 'text/html' });
                  const url = URL.createObjectURL(blob);
                  window.open(url, '_blank');
                }}
                className="h-6 px-2 text-xs text-slate-400 hover:text-white"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Open
              </Button>
            </div>
            {showHtmlPreview ? (
              <iframe
                srcDoc={content}
                className="w-full h-64 border border-slate-700 rounded"
                sandbox="allow-scripts"
              />
            ) : (
              <pre className="bg-slate-900 p-3 rounded text-sm text-slate-300 overflow-x-auto">
                <code>{content}</code>
              </pre>
            )}
          </div>
        );
      
      case 'error':
        return (
          <div className="text-red-400 whitespace-pre-wrap">
            {content}
          </div>
        );
      
      case 'text':
      default:
        return renderText(content);
    }
  };

  return (
    <div className={cn('relative group', className)}>
      {/* Copy Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white"
      >
        <Copy className="h-3 w-3" />
      </Button>
      
      {/* Content */}
      <div className="pr-8">
        {renderContent()}
      </div>
      
      {/* Copy Success Indicator */}
      {copied && (
        <div className="absolute top-2 right-2 text-xs text-green-400 bg-slate-800 px-2 py-1 rounded">
          Copied!
        </div>
      )}
    </div>
  );
}
