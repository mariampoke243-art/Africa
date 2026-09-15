export interface Forum {
  id: number;
  title: string;
  description: string;
  image: string;
  overview: string;
  keyAreas?: string[];
  objectives?: string[];
  pillars?: {
    title: string;
    items: string[];
  }[];
}
export const forums: Forum[] = [
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
