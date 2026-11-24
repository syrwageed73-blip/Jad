export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  detailedDescription: string;
  architectureType: string;
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  endpoints?: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'WS';
    path: string;
    description: string;
    status: number;
    latency: string;
  }[];
  schemaSnippet?: string;
  curlSnippet?: string;
  status: 'PUBLISHED' | 'PRODUCTION' | 'OPEN SOURCE' | 'ACTIVE';
  repoUrl: string;
  liveUrl?: string;
  role: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: {
    name: string;
    level: string;
    experience: string;
    description: string;
    highlight?: boolean;
  }[];
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  codeSample: {
    filename: string;
    language: string;
    code: string;
  };
}
