// src/data/spotlightData.ts

export type SpotlightCategory =
  | 'institutionalPartnership'
  | 'strategicLeadership'
  | 'investmentDealRooms'
  | 'institutionalContinuity'
  | 'africaWomenForum';

export interface SpotlightArticle {
  id: number;
  key: string;
  category: SpotlightCategory;
  dateKey: string;
  image: string;
}

export const spotlightCategories = [
  'all',
  'institutionalPartnership',
  'strategicLeadership',
  'investmentDealRooms',
  'institutionalContinuity',
  'africaWomenForum',
] as const;

export type SpotlightCategoryFilter =
  (typeof spotlightCategories)[number];

export const spotlightArticles: SpotlightArticle[] = [
  {
    id: 1,
    key: 'afdbWomenForum',
    category: 'institutionalPartnership',
    dateKey: 'spotlight.articles.afdbWomenForum.date',
    image: '/images/africa-women.jpg',
  },
  {
    id: 2,
    key: 'africanTable',
    category: 'strategicLeadership',
    dateKey: 'spotlight.articles.africanTable.date',
    image: '/images/african-table.jpg',
  },
  {
    id: 3,
    key: 'dealRooms',
    category: 'investmentDealRooms',
    dateKey: 'spotlight.articles.dealRooms.date',
    image: '/images/access-to-alignment.png',
  },
  {
    id: 4,
    key: 'multiSectorContinuity',
    category: 'institutionalContinuity',
    dateKey: 'spotlight.articles.multiSectorContinuity.date',
    image: '/images/multi-sector-continuity.png',
  },
  {
    id: 5,
    key: 'africaWomenForum2026',
    category: 'africaWomenForum',
    dateKey: 'spotlight.articles.africaWomenForum2026.date',
    image: '/images/africa-women-forum.jpg',
  },
];
