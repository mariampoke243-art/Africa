// src/data/intervenantsData.ts

export interface Intervenant {
  id: string;
  key: string;
  nom: string;
  photoUrl: string;
  statut: 'Confirmé' | 'Invité' | 'À l’étude' | 'À confirmer';
}

export const listeIntervenants: Intervenant[] = [
  {
    id: '1',
    key: 'abrahamDwumaOdoom',
    nom: 'Hon. Abraham Dwuma Odoom',
    photoUrl: '/images/Hon. Abraham Dwuma Odoom.jpg',
    statut: 'Confirmé',
  },

  {
    id: '2',
    key: 'hildaSukaMafudze',
    nom: 'H.E Hilda Suka Mafudze',
    photoUrl: '/images/H.E Hilda Suka Mafudze.jpg',
    statut: 'Confirmé',
  },

  {
    id: '3',
    key: 'dominiqueMigisha',
    nom: 'H.E Dominique Migisha',
    photoUrl: '/images/H.E Dominique Migisha.jpg',
    statut: 'Confirmé',
  },

  {
    id: '4',
    key: 'rashedMohamedKarkain',
    nom: 'Dr. Rashed Mohamed Karkain',
    photoUrl: '/images/Dr.Rashed Mohamed Karkain.jpg',
    statut: 'Confirmé',
  },

  {
    id: '5',
    key: 'abdullahBelhaifAlNuaimi',
    nom: 'H.E Abdullah Belhaif Al Nuaimi',
    photoUrl: '/images/H.E Abdullah Belhaif Al Nuaimi.jpg',
    statut: 'Confirmé',
  },

  {
    id: '6',
    key: 'abdullahiKassim',
    nom: 'Engr Abdullahi KassimEngr',
    photoUrl: '/images/Engr Abdullahi KassimEngr.jpg',
    statut: 'Confirmé',
  },

  {
    id: '7',
    key: 'anaHelenaChaconEcheverria',
    nom: 'H.E Ana-Helena Chacón Echeverría',
    photoUrl: '/images/H.E Ana-Helena Chacón Echeverría.jpg',
    statut: 'Confirmé',
  },

  {
    id: '8',
    key: 'rosaliaArteaga',
    nom: 'H.E Rosalia Arteaga',
    photoUrl: '/images/H.E Rosalia Arteaga.jpg',
    statut: 'Confirmé',
  },

  {
    id: '9',
    key: 'johnAgyekumKufuor',
    nom: 'H.E John Agyekum Kufuor',
    photoUrl: '/images/H.E John Agyekum Kufuor.jpg',
    statut: 'Confirmé',
  },

  {
    id: '10',
    key: 'bakoAmbianda',
    nom: 'Bako Ambianda',
    photoUrl: '/image/Bako Ambianda.jpg',
    statut: 'Invité',
  },

  {
    id: '11',
    key: 'amalElFallahSeghrouchni',
    nom: 'Amal El Fallah Seghrouchni',
    photoUrl: '/images/Amal El Fallah Seghrouchni.jpg',
    statut: 'Invité',
  },

  {
    id: '12',
    key: 'eleonoreCaroit',
    nom: 'Éléonore Caroit',
    photoUrl: '/images/Éléonore Caroit.jpg',
    statut: 'Invité',
  },
];
