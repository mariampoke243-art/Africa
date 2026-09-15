export interface SpotlightArticle {
  id: number;
  category: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export const spotlightArticles: SpotlightArticle[] = [
  {
    id: 1,
    category: 'Institutional Partnership',
    date: 'Jan 31, 2026',
    title:
      'African Development Bank Becomes Technical Partner of the Africa Women Forum',
    description:
      'A strategic partnership strengthening collaboration around women’s economic leadership, investment and development across Africa.',
    image: '/images/africa-women.jpg',
  },

  {
    id: 2,
    category: 'Strategic Architecture',
    date: 'Jan 30, 2026',
    title:
      'The African Table: How AEF Is Rebuilding Africa’s Seat in Global Economic Decision-Making',
    description:
      'Africa needs stronger representation, strategic coordination and a more influential role in global economic decision-making.',
    image: '/images/african-table.jpg',
  },

  {
    id: 3,
    category: 'Capital & Execution',
    date: 'Jan 29, 2026',
    title:
      'From Access to Alignment: Why AEF’s Deal Rooms Matter More Than Networking',
    description:
      'Turning high-level conversations into structured investment opportunities, partnerships and measurable outcomes.',
    image: '/images/deal-rooms.jpg',
  },

  {
    id: 4,
    category: 'Strategic Architecture',
    date: 'Jan 28, 2026',
    title:
      'Why Multi-Sector Does Not Mean Fragmented: How AEF Creates Continuity for Investors and Governments',
    description:
      'AEF connects governments, investors, institutions and business leaders around a continuous economic agenda.',
    image: '/images/multi-sector.jpg',
  },

  {
    id: 5,
    category: 'Flagship Platform',
    date: 'Jan 27, 2026',
    title: 'Africa Women Forum 2026',
    description:
      'A flagship platform bringing together women leaders, investors, entrepreneurs and institutions to advance Africa’s economic transformation.',
    image: '/images/africa-women-forum-2026.jpg',
  },
];
