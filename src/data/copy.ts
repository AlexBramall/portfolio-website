import { AboutChapter, ResumeContent } from '../types';
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
  work: {
    indexIntro: placeholder('work.index.intro'),
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
    location: 'Austin, Texas',
    employers: [
      {
        id: 'form-factory',
        name: 'Form Factory',
        kind: 'Agency',
        weight: 'featured',
        roles: [
          { title: 'Head of Operations & Delivery', dates: 'Jul 2024 – Present' },
          { title: 'Director of Operations & Delivery', dates: 'Aug 2023 – Jun 2024' },
          { title: 'Senior Program Manager', dates: 'May 2022 – Aug 2023' },
        ],
      },
      {
        id: 'nomad',
        name: 'Nomad',
        kind: 'Brand',
        weight: 'featured',
        roles: [
          { title: 'Director of E-commerce & Digital Product', dates: 'Mar 2022 – Sep 2022' },
          { title: 'Ecommerce Manager', dates: 'Oct 2021 – Mar 2022' },
          { title: 'Technical Project Manager', dates: 'Oct 2020 – Oct 2021' },
        ],
      },
      {
        id: 'gilleard',
        name: 'Gilleard Dental Marketing',
        kind: 'Agency',
        weight: 'quiet',
        roles: [
          { title: 'Digital Project / Product Manager', dates: 'Jun 2018 – Oct 2020' },
          { title: 'Project Coordinator', dates: 'Jan 2018 – Jun 2018' },
        ],
      },
      {
        id: 'cybercoders',
        name: 'CyberCoders',
        kind: 'Recruiting',
        weight: 'quiet',
        roles: [{ title: 'Technical Recruiter', dates: 'May 2017 – Dec 2017' }],
      },
      {
        id: 'uncommon-threads',
        name: 'Uncommon Threads',
        weight: 'quiet',
        roles: [{ title: 'Co-Founder', dates: 'Jul 2015 – Apr 2017' }],
      },
    ],
    education: {
      school: 'Wake Forest University',
      credential: 'Bachelor of Arts, Communication',
    },
    skills: [
      'Program management',
      'Product',
      'Ecommerce',
      'Shopify',
      'Cross-functional delivery',
      'AI-native operations',
    ],
  } satisfies ResumeContent as ResumeContent,
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
