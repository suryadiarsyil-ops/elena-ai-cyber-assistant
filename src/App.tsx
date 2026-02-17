import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppStatus } from './types';
import { MessageBubble } from './components/MessageBubble';
import { Sidebar } from './components/Sidebar';
import { Settings } from './components/Settings';
import { useChatManagement } from './hooks/useChatManagement';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const {
    sessions,
    currentSessionId,
    messages,
    status,
    createNewSession,
    switchSession,
    deleteSession,
    sendMessage,
    clearCurrentSession,
    exportCurrentSession
  } = useChatManagement();

  const [inputValue, setInputValue] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [currentModel, setCurrentModel] = useState('gemini-2.0-flash-exp');
  const [temperature, setTemperature] = useState(0.7);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto Scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + 'px';
    }
  }, [inputValue]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim() || status !== AppStatus.IDLE) return;
    
    sendMessage(inputValue, temperature);
    setInputValue('');
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  }, [inputValue, status, temperature, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleModelChange = (model: string) => {
    setCurrentModel(model);
    geminiService.setModel(model);
  };

  return (
    <div className="flex h-screen w-full bg-zinc-950 text-zinc-200 overflow-hidden relative">
      {/* Scanline Effect */}
      <div className="scanline"></div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setShowMobileMenu(false)}
        >
          <div
            className="w-64 h-full bg-zinc-950 border-r border-zinc-800"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              sessions={sessions}
              currentSessionId={currentSessionId}
              onNewSession={() => {
                createNewSession();
                setShowMobileMenu(false);
              }}
              onSwitchSession={(id) => {
                switchSession(id);
                setShowMobileMenu(false);
              }}
              onDeleteSession={deleteSession}
              onExportSession={() => {
                exportCurrentSession();
                setShowMobileMenu(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onNewSession={createNewSession}
        onSwitchSession={switchSession}
        onDeleteSession={deleteSession}
        onExportSession={exportCurrentSession}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative z-20">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 md:px-6 bg-zinc-950/80 backdrop-blur">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-cyan-400 p-2 hover:bg-zinc-800 rounded"
              onClick={() => setShowMobileMenu(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-cyan-400 font-mono">
                PROTOCOL: ACTIVE_HACKER
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest hidden md:block">
                Master Artificial Recognition Intelligence
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">
              LATENCY: 24ms
            </div>
            <button
              onClick={() => clearCurrentSession()}
              className="p-2 rounded hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-cyan-400"
              title="Clear session"
            >
              <svg
                className="w-5 h-5"
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
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-cyan-400"
              title="Settings"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-8 space-y-2 scroll-smooth"
        >
          <div className="max-w-4xl mx-auto">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {status === AppStatus.THINKING && (
              <div className="flex items-center gap-2 text-cyan-500 text-xs font-mono animate-pulse">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span>[SYSTEM] ELENA is accessing neural layers...</span>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-8 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur">
          <div className="max-w-4xl mx-auto relative">
            <div className="flex items-end gap-3 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800 focus-within:border-cyan-500/50 transition-all shadow-xl">
              <textarea
                ref={inputRef}
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter command or query..."
                disabled={status !== AppStatus.IDLE}
                className="w-full bg-transparent border-none focus:ring-0 text-zinc-200 font-mono text-sm resize-none py-1 placeholder:text-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ minHeight: '24px', maxHeight: '200px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={status !== AppStatus.IDLE || !inputValue.trim()}
                className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                  status === AppStatus.IDLE && inputValue.trim()
                    ? 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                {status === AppStatus.STREAMING || status === AppStatus.THINKING ? (
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="mt-2 flex justify-between px-2 text-[10px] text-zinc-600 font-mono">
              <span>Press Enter to transmit | Shift + Enter for new line</span>
              <span className="uppercase tracking-tighter hidden md:block">
                Secure Uplink: AES-256
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        currentModel={currentModel}
        temperature={temperature}
        onModelChange={handleModelChange}
        onTemperatureChange={setTemperature}
      />

      {/* Decorative Grid Effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      ></div>
    </div>
  );
};

export default App;
