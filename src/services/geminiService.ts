import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT, ERROR_MESSAGES } from '../constants';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private apiKey: string = '';
  private currentModel: string = 'gemini-2.0-flash-exp';

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    
    if (!this.apiKey) {
      console.error(ERROR_MESSAGES.NO_API_KEY);
      return;
    }

    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  setModel(modelId: string) {
    this.currentModel = modelId;
  }

  async *streamChat(
    history: Array<{ role: string; content: string }>,
    temperature: number = 0.7
  ): AsyncGenerator<string, void, unknown> {
    if (!this.genAI) {
      throw new Error(ERROR_MESSAGES.NO_API_KEY);
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: this.currentModel,
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: {
          temperature,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        }
      });

      // Convert history to Gemini format
      const chatHistory = history.slice(0, -1).map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({
        history: chatHistory
      });

      const lastMessage = history[history.length - 1].content;
      const result = await chat.sendMessageStream(lastMessage);

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          yield text;
        }
      }
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      
      if (error.message?.includes('API key')) {
        throw new Error(ERROR_MESSAGES.NO_API_KEY);
      } else if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
        throw new Error(ERROR_MESSAGES.RATE_LIMIT);
      } else if (error.message?.includes('timeout')) {
        throw new Error(ERROR_MESSAGES.TIMEOUT);
      } else {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }
    }
  }

  async sendMessage(
    history: Array<{ role: string; content: string }>,
    temperature: number = 0.7
  ): Promise<string> {
    if (!this.genAI) {
      throw new Error(ERROR_MESSAGES.NO_API_KEY);
    }

    try {
      const model = this.genAI.getGenerativeModel({
        model: this.currentModel,
        systemInstruction: SYSTEM_PROMPT,
        generationConfig: {
          temperature,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
        }
      });

      const chatHistory = history.slice(0, -1).map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const chat = model.startChat({
        history: chatHistory
      });

      const lastMessage = history[history.length - 1].content;
      const result = await chat.sendMessage(lastMessage);
      
      return result.response.text();
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  }

  isInitialized(): boolean {
    return this.genAI !== null && this.apiKey !== '';
  }
}

export const geminiService = new GeminiService();
