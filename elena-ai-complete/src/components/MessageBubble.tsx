import React from 'react';
import { Message } from '../types';
import { parseMarkdown } from '../utils/markdown';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="py-3 px-4 mb-4 bg-zinc-900/50 border-l-2 border-cyan-500 rounded-r text-cyan-400 font-mono text-xs">
        <pre className="whitespace-pre-wrap font-mono">{message.content}</pre>
      </div>
    );
  }

  return (
    <div className={`flex flex-col mb-6 ${isUser ? 'items-end' : 'items-start'}`}>
      <div className="flex items-center gap-2 mb-1 px-1">
        <span
          className={`text-[10px] font-bold uppercase tracking-widest ${
            isUser ? 'text-zinc-500' : 'text-cyan-400'
          }`}
        >
          {isUser ? 'User_Access' : 'ELENA_System'}
        </span>
        <span className="text-[10px] text-zinc-600 font-mono">
          [{new Date(message.timestamp).toLocaleTimeString()}]
        </span>
        {message.isStreaming && (
          <span className="text-[10px] text-cyan-500 animate-pulse">● STREAMING</span>
        )}
      </div>
      <div
        className={`max-w-[85%] px-4 py-3 rounded-lg font-mono text-sm leading-relaxed ${
          isUser
            ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
            : 'bg-zinc-900/80 text-cyan-50 border border-cyan-900/30 message-glow'
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
        ) : (
          <div
            className="prose prose-invert prose-sm max-w-none message-content"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
          />
        )}
      </div>
    </div>
  );
};
