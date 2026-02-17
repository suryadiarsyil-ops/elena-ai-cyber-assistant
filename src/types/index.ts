export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export enum AppStatus {
  IDLE = 'idle',
  THINKING = 'thinking',
  STREAMING = 'streaming',
  ERROR = 'error'
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface ToolResult {
  success: boolean;
  output: string;
  error?: string;
}

export interface SecurityTool {
  id: string;
  name: string;
  description: string;
  category: 'reconnaissance' | 'scanning' | 'exploitation' | 'analysis' | 'utility';
  icon: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'cyberpunk';
  fontSize: 'small' | 'medium' | 'large';
  showTimestamps: boolean;
  enableSounds: boolean;
  model: string;
  temperature: number;
}
