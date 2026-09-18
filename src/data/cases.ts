import { WorkCase } from '../types';
import { placeholder } from '../lib/placeholder';

const sampleFieldSlots = (card: '1' | '2' | '3'): Pick<
  WorkCase,
  | 'context'
  | 'roleScope'
  | 'constraints'
  | 'insights'
  | 'optionsRejected'
  | 'decisions'
  | 'whatShipped'
  | 'aiHonesty'
  | 'results'
  | 'learnings'
  | 'artifacts'
> => ({
  context: placeholder(`work.card.${card}.context`),
  roleScope: placeholder(`work.card.${card}.role_scope`),
  constraints: placeholder(`work.card.${card}.constraints`),
  insights: placeholder(`work.card.${card}.insights`),
  optionsRejected: placeholder(`work.card.${card}.options_rejected`),
  decisions: placeholder(`work.card.${card}.decisions`),
  whatShipped: placeholder(`work.card.${card}.what_shipped`),
  aiHonesty: placeholder(`work.card.${card}.ai_honesty`),
  results: {
    kind: 'projected',
    summary: placeholder(`work.card.${card}.results.summary`),
    items: [],
  },
  learnings: placeholder(`work.card.${card}.learnings`),
  artifacts: [],
});

export const workCases: WorkCase[] = [
  {
    slug: 'sample-case',
    eyebrow: placeholder('work.card.1.eyebrow'),
    title: placeholder('work.card.1.title'),
    outcome: placeholder('work.card.1.outcome'),
    tags: [
      placeholder('work.card.1.tag_1'),
      placeholder('work.card.1.tag_2'),
      placeholder('work.card.1.tag_3'),
    ],
    metric: null,
    featured: true,
    ...sampleFieldSlots('1'),
  },
  {
    slug: 'selected-work-two',
    eyebrow: placeholder('work.card.2.eyebrow'),
    title: placeholder('work.card.2.title'),
    outcome: placeholder('work.card.2.outcome'),
    tags: [
      placeholder('work.card.2.tag_1'),
      placeholder('work.card.2.tag_2'),
    ],
    metric: null,
    featured: true,
    ...sampleFieldSlots('2'),
  },
  {
    slug: 'selected-work-three',
    eyebrow: placeholder('work.card.3.eyebrow'),
    title: placeholder('work.card.3.title'),
    outcome: placeholder('work.card.3.outcome'),
    tags: [
      placeholder('work.card.3.tag_1'),
      placeholder('work.card.3.tag_2'),
      placeholder('work.card.3.tag_3'),
      placeholder('work.card.3.tag_4'),
    ],
    metric: null,
    featured: true,
    ...sampleFieldSlots('3'),
  },
];

export const featuredCases = workCases.filter((workCase) => workCase.featured).slice(0, 3);

export function getCaseBySlug(slug: string): WorkCase | undefined {
  return workCases.find((workCase) => workCase.slug === slug);
}
