import { useState, useCallback, useEffect } from 'react';
import { Message, ChatSession, AppStatus } from '../types';
import { geminiService } from '../services/geminiService';
import { storageService } from '../services/storageService';
import { ASCII_BANNER, WELCOME_MESSAGES } from '../constants';

export function useChatManagement() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);

  // Initialize - Load sessions from storage
  useEffect(() => {
    const loadedSessions = storageService.loadSessions();
    const loadedSessionId = storageService.loadCurrentSessionId();

    if (loadedSessions.length === 0) {
      // Create first session
      const newSession = storageService.createSession('Welcome Session');
      const welcomeMsg: Message = {
        id: 'boot',
        role: 'system',
        content: `${ASCII_BANNER}\n\n> ${WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)]}\n> Type your command or query to begin...`,
        timestamp: Date.now()
      };
      newSession.messages = [welcomeMsg];
      
      setSessions([newSession]);
      setCurrentSessionId(newSession.id);
      setMessages(newSession.messages);
      
      storageService.saveSessions([newSession]);
      storageService.saveCurrentSessionId(newSession.id);
    } else {
      setSessions(loadedSessions);
      
      if (loadedSessionId && loadedSessions.find(s => s.id === loadedSessionId)) {
        setCurrentSessionId(loadedSessionId);
        const currentSession = loadedSessions.find(s => s.id === loadedSessionId);
        setMessages(currentSession?.messages || []);
      } else {
        setCurrentSessionId(loadedSessions[0].id);
        setMessages(loadedSessions[0].messages);
      }
    }
  }, []);

  // Save messages when they change
  useEffect(() => {
    if (currentSessionId && messages.length > 0) {
      const updatedSessions = storageService.updateSession(sessions, currentSessionId, messages);
      setSessions(updatedSessions);
      storageService.saveSessions(updatedSessions);
    }
  }, [messages, currentSessionId]);

  const createNewSession = useCallback(() => {
    const newSession = storageService.createSession();
    const welcomeMsg: Message = {
      id: `welcome-${Date.now()}`,
      role: 'system',
      content: `> New session initiated.\n> ${WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)]}`,
      timestamp: Date.now()
    };
    newSession.messages = [welcomeMsg];

    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    setCurrentSessionId(newSession.id);
    setMessages(newSession.messages);

    storageService.saveSessions(updatedSessions);
    storageService.saveCurrentSessionId(newSession.id);
  }, [sessions]);

  const switchSession = useCallback((sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);
      storageService.saveCurrentSessionId(sessionId);
    }
  }, [sessions]);

  const deleteSession = useCallback((sessionId: string) => {
    const updatedSessions = storageService.deleteSession(sessions, sessionId);
    setSessions(updatedSessions);

    if (currentSessionId === sessionId) {
      if (updatedSessions.length > 0) {
        setCurrentSessionId(updatedSessions[0].id);
        setMessages(updatedSessions[0].messages);
        storageService.saveCurrentSessionId(updatedSessions[0].id);
      } else {
        createNewSession();
      }
    }

    storageService.saveSessions(updatedSessions);
  }, [sessions, currentSessionId, createNewSession]);

  const sendMessage = useCallback(async (content: string, temperature: number = 0.7) => {
    if (!content.trim() || status !== AppStatus.IDLE) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setStatus(AppStatus.THINKING);

    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      const history = [...messages, userMessage]
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role, content: m.content }));

      let fullContent = '';
      setStatus(AppStatus.STREAMING);

      const stream = geminiService.streamChat(history, temperature);

      for await (const chunk of stream) {
        fullContent += chunk;
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantMessageId
              ? { ...m, content: fullContent, isStreaming: true }
              : m
          )
        );
      }

      // Mark streaming as complete
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantMessageId
            ? { ...m, isStreaming: false }
            : m
        )
      );

      setStatus(AppStatus.IDLE);
    } catch (error: any) {
      console.error('Chat error:', error);
      setStatus(AppStatus.ERROR);

      const errorMessage: Message = {
        id: 'err-' + Date.now(),
        role: 'system',
        content: `!! ERROR: ${error.message}`,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev.slice(0, -1), errorMessage]);
      setStatus(AppStatus.IDLE);
    }
  }, [messages, status]);

  const clearCurrentSession = useCallback(() => {
    const welcomeMsg: Message = {
      id: `welcome-${Date.now()}`,
      role: 'system',
      content: `> Session cleared.\n> ${WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)]}`,
      timestamp: Date.now()
    };
    setMessages([welcomeMsg]);
  }, []);

  const exportCurrentSession = useCallback(() => {
    const session = sessions.find(s => s.id === currentSessionId);
    if (session) {
      storageService.exportSession(session);
    }
  }, [sessions, currentSessionId]);

  const getCurrentSession = useCallback((): ChatSession | undefined => {
    return sessions.find(s => s.id === currentSessionId);
  }, [sessions, currentSessionId]);

  return {
    sessions,
    currentSessionId,
    messages,
    status,
    createNewSession,
    switchSession,
    deleteSession,
    sendMessage,
    clearCurrentSession,
    exportCurrentSession,
    getCurrentSession
  };
}
