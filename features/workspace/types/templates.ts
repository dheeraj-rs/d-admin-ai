export interface Template {
    id: string;
    title: string;
    description: string;
    image: string;
    category: 'Portfolio' | 'Business' | 'Blog' | 'Tool' | 'E-commerce';
}
