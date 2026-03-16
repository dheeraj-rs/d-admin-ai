import { ChatMessage } from '../types/chat';

export const getChatResponse = async (message: string): Promise<ChatMessage> => {
  // Business logic or API call here
  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: `Response to: ${message}`,
    timestamp: new Date(),
  };
};
