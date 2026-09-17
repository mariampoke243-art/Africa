// src/pages/Meetings/forumsData.ts

export interface Forum {
  id: number;
  key: string;
  image: string;
}

export const forums: Forum[] = [
  {
    id: 3,
    key: 'africaPeaceForum',
    image: '/images/peaceforum.jpg',
  },

  {
    id: 2,
    key: 'africaAgricultureFoodForum',
    image: '/images/africafood.jpg',
  },
];
