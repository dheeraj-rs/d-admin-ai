'use client';

import { useState, useEffect } from 'react';
import { Template } from '../types/template';
import { getTemplates } from '../services/templateService';

export const useTemplates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getTemplates();
        setTemplates(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  return { templates, isLoading };
};
