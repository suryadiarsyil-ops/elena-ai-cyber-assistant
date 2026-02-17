import { ChatSession, Message } from '../types';

class StorageService {
  private SESSIONS_KEY = 'elena-chat-sessions';
  private CURRENT_SESSION_KEY = 'elena-current-session';
  private PREFERENCES_KEY = 'elena-preferences';

  // Chat Sessions
  saveSessions(sessions: ChatSession[]): void {
    try {
      localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Failed to save sessions:', error);
    }
  }

  loadSessions(): ChatSession[] {
    try {
      const data = localStorage.getItem(this.SESSIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load sessions:', error);
      return [];
    }
  }

  saveCurrentSessionId(sessionId: string): void {
    try {
      localStorage.setItem(this.CURRENT_SESSION_KEY, sessionId);
    } catch (error) {
      console.error('Failed to save current session:', error);
    }
  }

  loadCurrentSessionId(): string | null {
    try {
      return localStorage.getItem(this.CURRENT_SESSION_KEY);
    } catch (error) {
      console.error('Failed to load current session:', error);
      return null;
    }
  }

  // Session Management
  createSession(title?: string): ChatSession {
    const now = Date.now();
    return {
      id: `session-${now}`,
      title: title || `New Session ${new Date(now).toLocaleDateString()}`,
      messages: [],
      createdAt: now,
      updatedAt: now
    };
  }

  updateSession(sessions: ChatSession[], sessionId: string, messages: Message[]): ChatSession[] {
    return sessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          messages,
          updatedAt: Date.now(),
          title: this.generateSessionTitle(messages)
        };
      }
      return session;
    });
  }

  deleteSession(sessions: ChatSession[], sessionId: string): ChatSession[] {
    return sessions.filter(session => session.id !== sessionId);
  }

  private generateSessionTitle(messages: Message[]): string {
    const userMessages = messages.filter(m => m.role === 'user');
    if (userMessages.length > 0) {
      const firstMessage = userMessages[0].content;
      return firstMessage.length > 50 
        ? firstMessage.substring(0, 47) + '...'
        : firstMessage;
    }
    return `Session ${new Date().toLocaleDateString()}`;
  }

  // Preferences
  savePreferences(preferences: any): void {
    try {
      localStorage.setItem(this.PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  }

  loadPreferences(): any {
    try {
      const data = localStorage.getItem(this.PREFERENCES_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return null;
    }
  }

  // Export/Import
  exportSession(session: ChatSession): void {
    const dataStr = JSON.stringify(session, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `elena-session-${session.id}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }

  importSession(file: File): Promise<ChatSession> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const session = JSON.parse(e.target?.result as string);
          if (this.isValidSession(session)) {
            resolve(session);
          } else {
            reject(new Error('Invalid session format'));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }

  private isValidSession(obj: any): obj is ChatSession {
    return (
      obj &&
      typeof obj.id === 'string' &&
      typeof obj.title === 'string' &&
      Array.isArray(obj.messages) &&
      typeof obj.createdAt === 'number' &&
      typeof obj.updatedAt === 'number'
    );
  }

  // Clear all data
  clearAll(): void {
    try {
      localStorage.removeItem(this.SESSIONS_KEY);
      localStorage.removeItem(this.CURRENT_SESSION_KEY);
      localStorage.removeItem(this.PREFERENCES_KEY);
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }
}

export const storageService = new StorageService();
