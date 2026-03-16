import { Template } from '../types/template';
import { TEMPLATES } from '@/features/workspace/templates';

export const getTemplates = async (): Promise<Template[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return TEMPLATES;
};
