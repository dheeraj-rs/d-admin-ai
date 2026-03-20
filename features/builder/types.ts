export interface Component {
  source: string;
  folder: string;
}

export interface ComponentWithCategories {
  [category: string]: Component[];
}

export interface Theme {
  name: string;
  folder: string;
}
