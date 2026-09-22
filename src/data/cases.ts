import { WorkCase } from '../types';
import { placeholder } from '../lib/placeholder';

const sampleFieldSlots = (card: '2' | '3'): Pick<
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
    slug: 'elf-shopify-migration',
    eyebrow: 'Form Factory · e.l.f. Cosmetics',
    title: 'Salesforce Commerce Cloud → Shopify',
    outcome:
      'Led the Shopify migration workstream, then expanded to Program Manager for the full frontend migration.',
    tags: ['Shopify', 'Program management', 'Ecommerce', 'Migration'],
    metric: null,
    featured: true,
    context:
      'Form Factory owned e.l.f. Cosmetics’ SFCC→Shopify migration as part of a larger platform overhaul (Sep–Jun).',
    roleScope:
      'Project lead on Shopify; then Program Manager (via Form Factory) for the broader frontend migration spanning four additional projects.',
    constraints:
      'Enterprise cutover with no room for a broken storefront; dozen+ systems had to behave as one; e.l.f.’s team needed to operate the site after handoff; Form Factory owned Shopify while other workstreams ran in parallel.',
    insights:
      'At this scale the storefront is the easy part — the risk is the connective tissue (search, loyalty, subscriptions, CRM, fulfillment). Operator experience from Nomad mattered as much as migration mechanics.',
    optionsRejected:
      'Big-bang replatform without operability design; treating Shopify as “just a theme”; keeping decisions siloed between eng and product.',
    decisions:
      'Partnered with tech leads on architecture and product leads on product decisions—especially shipping features e.l.f.’s team could operate post-launch, drawing on Nomad Director of Ecommerce/Digital Product experience.',
    whatShipped:
      'Live e.l.f. Cosmetics storefront on Shopify (SFCC cutover), including the integrations that make enterprise commerce work as one system (search, loyalty, subscriptions, CRM/messaging, analytics, content, fulfillment). After that cutover, also shipped program oversight across four additional frontend migration workstreams (as PM via Form Factory).',
    aiHonesty: 'Not an AI-product case; no AI feature claims.',
    results: {
      kind: 'proxy',
      summary:
        'Shopify President Harley Finkelstein posted on E.L.F. BEAUTY/e.l.f. going live on Shopify; Form Factory co-founder Duncan Fairley named Alex on the launch post; e.l.f. CTO Ekta Chopra and VP Global Connected Commerce Kelly Shah-McDonnell publicly thanked Alex.',
      items: [],
    },
    learnings:
      'Program ownership follows trust earned on the hard path. Cross-lead pairing (tech + product) beats status theater. Design for the client’s team to run day two, not just launch day.',
    artifacts: [],
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
