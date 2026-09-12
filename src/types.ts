export interface MemoryPhoto {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  tag?: string;
  date?: string;
}

export interface Milestone {
  id: string;
  title: string;
  icon: string;
  quote: string;
  description: string;
  highlightColor: string;
}
