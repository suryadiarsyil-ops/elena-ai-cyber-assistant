import React, { useState } from 'react';
import { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onNewSession: () => void;
  onSwitchSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onExportSession: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onNewSession,
  onSwitchSession,
  onDeleteSession,
  onExportSession
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleDelete = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (showDeleteConfirm === sessionId) {
      onDeleteSession(sessionId);
      setShowDeleteConfirm(null);
    } else {
      setShowDeleteConfirm(sessionId);
      setTimeout(() => setShowDeleteConfirm(null), 3000);
    }
  };

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex-col hidden md:flex z-20 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
        <h1 className="text-xl font-bold tracking-tighter text-cyan-400 terminal-glow">
          ELENA AI
        </h1>
      </div>

      {/* New Session Button */}
      <div className="p-4 border-b border-zinc-800">
        <button
          onClick={onNewSession}
          className="w-full text-left p-3 rounded bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-800/50 transition-all text-sm font-mono mb-2 flex items-center gap-2 group"
        >
          <span className="text-cyan-500 text-lg group-hover:rotate-90 transition-transform">
            +
          </span>
          <span className="text-zinc-300">New Sequence</span>
        </button>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-3">
          Neural Sessions ({sessions.length})
        </div>
        <div className="space-y-1">
          {sessions.length === 0 ? (
            <div className="p-3 text-xs font-mono text-zinc-600 italic">
              No active sessions...
            </div>
          ) : (
            sessions.map(session => (
              <div
                key={session.id}
                onClick={() => onSwitchSession(session.id)}
                className={`group relative p-3 rounded cursor-pointer transition-all text-xs font-mono ${
                  currentSessionId === session.id
                    ? 'bg-cyan-900/20 border border-cyan-500/30 text-cyan-300'
                    : 'bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="truncate font-medium">{session.title}</div>
                    <div className="text-[10px] text-zinc-600 mt-1">
                      {session.messages.length} messages
                    </div>
                    <div className="text-[10px] text-zinc-700 mt-0.5">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDelete(session.id, e)}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-500/20 ${
                      showDeleteConfirm === session.id ? 'opacity-100 bg-red-500/20' : ''
                    }`}
                    title={showDeleteConfirm === session.id ? 'Click again to confirm' : 'Delete'}
                  >
                    <svg
                      className="w-4 h-4 text-red-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800 space-y-2">
        <button
          onClick={onExportSession}
          className="w-full p-2 rounded bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 transition-all text-xs font-mono text-zinc-400 hover:text-cyan-400 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export Session
        </button>
        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Uplink: ESTABLISHED
        </div>
        <div className="text-[10px] text-zinc-600 font-mono">v7.0.0-PRO-ELENA</div>
      </div>
    </aside>
  );
};
