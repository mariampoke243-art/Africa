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
    content: [
    "The Africa Economic Forum was founded on a strategic conviction: Africa must not only participate in global economic conversations, Africa must host them, shape them, and define their terms.",

    "This conviction is embodied in AEF's core strategic architecture: The African Table.",

    "The African Table is more than a symbolic concept. It is a structural redesign of how Africa engages with global capital, institutions, and governments. It represents a shift from externally framed engagement toward Africa-centered agenda-setting, where priorities, frameworks, and cooperation models are defined from African strategic interests and sovereign development goals.",

    "At the African Table, Africa is not a guest. Africa is the host.",

    "By curating the space, setting the agenda, and defining the terms of engagement, Africa reclaims agency over how partnerships are structured, how priorities are ranked, and how cooperation translates into execution.",

    "The African Table moves beyond episodic conferences and transactional meetings. It establishes a perpetual architecture of engagement, where Africa leads continuous dialogue across governments, investors, institutions, and global partners throughout the year.",

    "This model transforms Africa's role from reactive to architectural. Instead of responding to externally designed frameworks, Africa becomes a co-author of global economic structures, partnerships, and investment prioritiesand policy alignment are structured.",
      
    "Through the African Table, AEF positions Africa not as a market to be evaluated, but as a strategic co-leader shaping the future of global economic cooperation.",

    "This is a fundamental repositioning, from participation to authorship, from inclusion to leadership, from attendance to architecture."
  ],
  },

  {
    id: 3,
    category: 'Capital & Execution',
    date: 'Jan 29, 2026',
    title:
      'From Access to Alignment: Why AEF’s Deal Rooms Matter More Than Networking',
    description:
      'Turning high-level conversations into structured investment opportunities, partnerships and measurable outcomes.',
    image: '/images/access-to-alignment.png',
  },

  {
    id: 4,
    category: 'Continuity & Institutional Memory',
    date: 'Jan 28, 2026',
    title:
      'Why Multi-Sector Does Not Mean Fragmented: How AEF Creates Continuity for Investors and Governments',
    description:
      'AEF connects governments, investors, institutions and business leaders around a continuous economic agenda.',
    image: '/images/multi-sector-continuity.png',
  },

  {
    id: 5,
    category: 'Flagship Platform',
    date: 'Jan 27, 2026',
    title: 'Africa Women Forum 2026',
    description:
      'A flagship platform bringing together women leaders, investors, entrepreneurs and institutions to advance Africa’s economic transformation.',
    image: '/images/africa-women-forum.jpg',
  },
];
