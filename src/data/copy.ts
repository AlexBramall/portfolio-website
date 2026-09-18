import { AboutChapter } from '../types';
import { placeholder } from '../lib/placeholder';

export const copy = {
  hero: {
    roleLine: 'AI-Native Program & Product Leader',
    valueProp:
      'I lead AI-native program and product delivery across eng, design, and stakeholders so ambitious bets actually ship.',
    availability: placeholder('hero.availability'),
  },
  process: {
    bullets: [
      placeholder('process.bullets.1'),
      placeholder('process.bullets.2'),
      placeholder('process.bullets.3'),
    ],
  },
  ai: {
    honesty: placeholder('ai.honesty'),
  },
  about: {
    arc: placeholder('about.arc'),
    chapters: [
      {
        id: 'form-factory',
        employer: 'Form Factory',
        roleArc: 'Ops & delivery',
        body: placeholder('about.chapter.form_factory'),
      },
      {
        id: 'nomad',
        employer: 'Nomad',
        roleArc: 'TPM → Ecommerce Manager → Director of E-commerce & Digital Product',
        body: placeholder('about.chapter.nomad'),
      },
      {
        id: 'gilleard',
        employer: 'Gilleard',
        roleArc: 'Digital Project / Product Manager',
        body: placeholder('about.chapter.gilleard'),
      },
    ] satisfies AboutChapter[],
    credentials: [
      placeholder('about.credentials.1'),
      placeholder('about.credentials.2'),
      placeholder('about.credentials.3'),
    ],
  },
  resume: {
    url: 'https://example.com/alex-bramall-resume.pdf',
  },
  contact: {
    intro: placeholder('contact.intro'),
    channels: placeholder('contact.channels'),
  },
  stack: {
    items: [
      placeholder('stack.item_1'),
      placeholder('stack.item_2'),
      placeholder('stack.item_3'),
      placeholder('stack.item_4'),
      placeholder('stack.item_5'),
      placeholder('stack.item_6'),
    ],
  },
};
