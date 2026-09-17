// src/data/spotlightData.ts

export interface SpotlightArticle {
  id: number;
  key: string;
  date: string;
  image: string;
  contentKey?: string;
}

export const spotlightArticles: SpotlightArticle[] = [
  {
    id: 1,
    key: 'afdbWomenForum',
    date: '2026-01-31',
    image: '/images/africa-women.jpg',
  },

  {
    id: 2,
    key: 'africanTable',
    date: '2026-01-30',
    image: '/images/african-table.jpg',
    contentKey: 'africanTableContent',
  },

  {
    id: 3,
    key: 'dealRooms',
    date: '2026-01-29',
    image: '/images/access-to-alignment.png',
  },

  {
    id: 4,
    key: 'multiSectorContinuity',
    date: '2026-01-28',
    image: '/images/multi-sector-continuity.png',
  },

  {
    id: 5,
    key: 'africaWomenForum2026',
    date: '2026-01-27',
    image: '/images/africa-women-forum.jpg',
  },
];
