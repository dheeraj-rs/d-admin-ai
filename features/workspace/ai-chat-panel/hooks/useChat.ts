'use client';

import { useState } from 'react';
import { ChatMessage } from '../types/chat';
import { getChatResponse } from '../services/chatService';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = async (content: string) => {
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', content, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);

    const assistantMsg = await getChatResponse(content);
    setMessages(prev => [...prev, assistantMsg]);
  };

  return { messages, sendMessage };
};
