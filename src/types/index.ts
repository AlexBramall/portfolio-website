export type ResultKind = 'measured' | 'proxy' | 'projected';

export interface ProofChip {
  id: string;
  label: string;
  value: string | null;
}

export interface CaseResultItem {
  label: string;
  value: string | null;
}

export interface CaseResult {
  kind: ResultKind;
  summary: string;
  items: CaseResultItem[];
}

export interface CaseArtifact {
  label: string;
  href?: string;
}

export interface WorkCase {
  slug: string;
  eyebrow: string;
  title: string;
  outcome: string;
  tags: string[];
  metric: string | null;
  featured: boolean;
  context: string;
  roleScope: string;
  constraints: string;
  insights: string;
  optionsRejected: string;
  decisions: string;
  whatShipped: string;
  aiHonesty: string;
  results: CaseResult;
  learnings: string;
  artifacts: CaseArtifact[];
}

export interface StackChip {
  id: string;
  label: string;
}

export type AboutChapterId = 'form-factory' | 'nomad' | 'gilleard';

export interface AboutChapter {
  id: AboutChapterId;
  employer: string;
  roleArc: string;
  body: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
