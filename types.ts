
export interface Skill {
  name: string;
  category: 'Business' | 'Creative' | 'Technical';
  level: number;
}

export interface ArtWork {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
