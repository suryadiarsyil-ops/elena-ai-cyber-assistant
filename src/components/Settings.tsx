import React, { useState } from 'react';
import { MODELS } from '../constants';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentModel: string;
  temperature: number;
  onModelChange: (model: string) => void;
  onTemperatureChange: (temp: number) => void;
}

export const Settings: React.FC<SettingsProps> = ({
  isOpen,
  onClose,
  currentModel,
  temperature,
  onModelChange,
  onTemperatureChange
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-cyan-400 terminal-glow">
              System Configuration
            </h2>
            <p className="text-xs text-zinc-500 mt-1 font-mono">
              Adjust neural core parameters
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-zinc-800 transition-colors"
          >
            <svg
              className="w-6 h-6 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Model Selection */}
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-3 uppercase tracking-wide">
              AI Model
            </label>
            <div className="space-y-2">
              {MODELS.map(model => (
                <button
                  key={model.id}
                  onClick={() => onModelChange(model.id)}
                  className={`w-full p-4 rounded border text-left transition-all ${
                    currentModel === model.id
                      ? 'bg-cyan-900/20 border-cyan-500/50 text-cyan-300'
                      : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-sm font-bold">{model.name}</div>
                      <div className="text-xs text-zinc-600 mt-1">
                        Speed: {model.speed}
                      </div>
                    </div>
                    {currentModel === model.id && (
                      <svg
                        className="w-5 h-5 text-cyan-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Temperature Slider */}
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-3 uppercase tracking-wide">
              Response Creativity
              <span className="ml-2 text-cyan-500 font-mono">{temperature.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-xs text-zinc-600 mt-2 font-mono">
              <span>Precise (0.0)</span>
              <span>Balanced (1.0)</span>
              <span>Creative (2.0)</span>
            </div>
            <p className="text-xs text-zinc-500 mt-3 font-mono">
              Lower values = more focused and deterministic
              <br />
              Higher values = more creative and varied
            </p>
          </div>

          {/* Info Section */}
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded">
            <div className="text-xs text-zinc-400 font-mono space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>API Connection: Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <span>Streaming: Enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span>Persistence: LocalStorage</span>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded">
            <div className="flex gap-3">
              <svg
                className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div className="text-xs text-yellow-200 font-mono">
                <div className="font-bold mb-1">SECURITY NOTICE</div>
                Changes to model settings will affect all future conversations. Current
                session messages remain unchanged.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-cyan-600 text-white hover:bg-cyan-500 transition-colors font-mono text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            Close Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
