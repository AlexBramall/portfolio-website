export interface Project {
  title: string;
  description: string;
  technologies: string[];
  metrics: {
    timeline: string;
    team: string;
    savings?: string;
    users?: string;
    efficiency?: string;
    satisfaction?: string;
  };
  image: string;
}

export interface Experience {
  year: string;
  role: string;
  company: string;
  achievements: string[];
}

export interface Competency {
  category: string;
  name: string;
  description: string;
}

export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'experience' | 'contact';
