export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
}

export interface TemplatesState {
  items: Template[];
  isLoading: boolean;
  error: string | null;
}
