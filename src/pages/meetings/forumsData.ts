export interface Forum {
  id: number;
  title: string;
  description: string;
  image: string;
  overview: string;

  sectoralLabel?: string;

  keyAreas?: string[];

  objectives?: string[];

  platform?: {
    title: string;
    description: string;
    items: {
      title: string;
      description: string;
    }[];
  };

  whoWeConvene?: string[];

  fromDialogueToAction?: string;

  ctaText?: string;

  pillars?: {
    title: string;
    items: string[];
  }[];
}
export const forums: Forum[] = [
  {
    id: 3,
    title: 'Africa Peace Forum',

    sectoralLabel:
      'A Sectoral Forum of the Africa Economic Forum',

    description:
      'Shaping Africa’s Peace, Security and Strategic Cooperation.',

    image: '/images/meetings/peaceforum.jpg',

    overview:
      'The Africa Peace Forum convenes leaders, governments, diplomats, security experts, investors and thinkers to address Africa’s peace and security challenges and advance the conditions for sustainable economic transformation.',

    platform: {
      title: 'The Platform',
      description:
        'A year-round platform for strategic dialogue, regional cooperation and action at the intersection of peace, security and economic development.',
      items: [
        {
          title: 'Peace & Investment Dialogues',
          description:
            'Connecting peace and security priorities with investors and development partners.',
        },
        {
          title: 'Regional Peace Dialogues',
          description:
            'Focused dialogues on Africa’s key regions and conflict dynamics, including the Great Lakes, Sahel and Horn of Africa.',
        },
        {
          title: 'Diplomatic Roundtables',
          description:
            'High-level diplomatic dialogue through the AEF Diplomatic Club.',
        },
        {
          title: 'Peace & Development Intelligence',
          description:
            'Reports and analysis examining how conflict and instability affect investment, trade and development.',
        },
        {
          title: 'Youth Peace Fellowship',
          description:
            'Developing the next generation of African peacebuilders and leaders.',
        },
        {
          title: 'Annual Africa Peace Forum',
          description:
            'The major annual convening bringing the Forum’s global community together under the Africa Economic Forum.',
        },
      ],
    },

    keyAreas: [
      'Peace & Conflict Prevention',
      'Regional Security & Cooperation',
      'Peace & Investment',
      'Diplomacy & Geopolitics',
      'Youth & Women in Peacebuilding',
      'Governance & Human Security',
    ],

    whoWeConvene: [
      'Heads of State & Government',
      'Ministers',
      'Diplomats',
      'Regional Institutions',
      'Security & Peace Leaders',
      'Investors',
      'Business Leaders',
      'Thinkers',
      'Youth & Women Leaders',
    ],

    fromDialogueToAction:
      'Connecting political leadership, institutions, business and capital to build stronger foundations for peace, stability and prosperity across Africa.',

    ctaText: 'Join the Africa Peace Forum',
  },

  {
    id: 2,
    title: 'Africa Agriculture & Food Forum (AAFF)',

    description:
      'Transforming African agriculture from subsistence farming to a modern, productive, and sustainable system.',

    image: '/images/meetings/africafood.jpg',

    overview: `The Agriculture and Food Security Forum addresses one of Africa's most critical development challenges and opportunities.

Despite possessing over 60% of the world's uncultivated arable land, Africa continues to face persistent food insecurity and agricultural productivity issues.

This forum serves as a dedicated platform to transform African agriculture from subsistence farming to a modern, productive, and sustainable system that can ensure food security for the continent's growing population while creating economic prosperity.

The forum aligns with the African Union's Comprehensive Africa Agriculture Development Programme (CAADP) and focuses on promoting agricultural innovation, sustainable practices, value chain development, and investment in agribusiness.`,

    keyAreas: [
      'Modernizing farming practices through adoption of advanced technologies, precision agriculture, and climate-resilient techniques',
      'Developing integrated value chains that connect smallholder farmers to markets, processing facilities, and distribution networks',
      'Promoting sustainable land management and water conservation practices to preserve Africa agricultural resources',
      'Facilitating investment in agricultural infrastructure, processing facilities, and storage capabilities to reduce post-harvest losses',
      'Advancing policy reforms that support agricultural development, cross-border trade, and private sector investment',
    ],

    objectives: [
      'Strengthen food security across Africa',
      'Increase agricultural productivity',
      'Support smallholder farmers',
      'Develop modern agricultural value chains',
      'Attract investment into agribusiness',
      'Promote climate-resilient agriculture',
    ],

    pillars: [
      {
        title: 'Modern Agriculture',
        items: [
          'Precision agriculture and advanced technologies',
          'Climate-resilient farming techniques',
          'Modernization of farming practices',
        ],
      },
      {
        title: 'Agricultural Value Chains',
        items: [
          'Connecting farmers to markets',
          'Food processing and distribution',
          'Reducing post-harvest losses',
        ],
      },
      {
        title: 'Sustainable Development',
        items: [
          'Sustainable land management',
          'Water conservation',
          'Climate-smart agriculture',
        ],
      },
      {
        title: 'Investment & Policy',
        items: [
          'Agricultural infrastructure investment',
          'Agribusiness development',
          'Policy reforms and cross-border trade',
        ],
      },
    ],
  },
];
