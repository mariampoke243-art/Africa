export interface Intervenant {
  id: string;
  nom: string;
  titre: string;
  institution: string;
  domaineStrategique: string;
  photoUrl: string;
  statut: 'Confirmé' | 'Invité' | 'À l’étude' | 'À confirmer';
}

export const listeIntervenants: Intervenant[] = [
  {
    id: '1',
    nom: 'Hon. Abraham Dwuma Odoom',
    titre:
      'Agriculture Expert, Ghana Former Member of Parliament & Deputy Minister of Health',
    institution: 'Parliament',
    domaineStrategique: 'Agriculture & policy',
    photoUrl: '/images/Hon. Abraham Dwuma Odoom.jpg',
    statut: 'Confirmé',
  },

  {
    id: '2',
    nom: 'H.E Hilda Suka Mafudze',
    titre: 'Permanent Representative, AU-Southern African Regional',
    institution: 'AU-Southern African Regional',
    domaineStrategique: '',
    photoUrl: '/images/H.E Hilda Suka Mafudze.jpg',
    statut: 'Confirmé',
  },

  {
    id: '3',
    nom: 'H.E Dominique Migisha',
    titre:
      'Coordinator of the Digital Development Agency, Former President of DRC Special Advisor',
    institution: 'Digital Development Agency',
    domaineStrategique: 'Digital',
    photoUrl: '/images/H.E Dominique Migisha.jpg',
    statut: 'Confirmé',
  },

  {
    id: '4',
    nom: 'Dr. Rashed Mohamed Karkain',
    titre:
      'International Sustainable Development & Green Economy Leader, CEO Sustainable Development Research and Training Institute.',
    institution: 'Sustainable Development Research and Training Institute',
    domaineStrategique: 'Development & Economy',
    photoUrl: '/images/Dr.Rashed Mohamed Karkain.jpg',
    statut: 'Confirmé',
  },

  {
    id: '5',
    nom: 'H.E Abdullah Belhaif Al Nuaimi',
    titre: 'UAE Former Minister of Infrastructure & Climate Change',
    institution: 'Policy',
    domaineStrategique: 'Infrastructure & climate',
    photoUrl: '/images/H.E Abdullah Belhaif Al Nuaimi.jpg',
    statut: 'Confirmé',
  },

  {
    id: '6',
    nom: 'Engr Abdullahi KassimEngr',
    titre:
      'Executive Director Generation Niger Delta Power Holding Company Limited (NDPHC)',
    institution: 'Niger Delta Power Holding Company Limited (NDPHC)',
    domaineStrategique: '',
    photoUrl: '/images/Engr Abdullahi KassimEngr.jpg',
    statut: 'Confirmé',
  },

  {
    id: '7',
    nom: 'H.E Ana-Helena Chacón Echeverría',
    titre: 'Former Vice President, Costa-Rica',
    institution: 'Policy',
    domaineStrategique: 'Policy',
    photoUrl: '/images/H.E Ana-Helena Chacón Echeverría.jpg',
    statut: 'Confirmé',
  },

  {
    id: '8',
    nom: 'H.E Rosalia Arteaga',
    titre: 'Former President of Ecuador',
    institution: 'Policy',
    domaineStrategique: 'Policy',
    photoUrl: '/images/H.E Rosalia Arteaga.jpg',
    statut: 'Confirmé',
  },

  {
    id: '9',
    nom: 'H.E John Agyekum Kufuor',
    titre: 'Former President of Ghana',
    institution: 'Policy',
    domaineStrategique: 'Policy',
    photoUrl: '/images/H.E John Agyekum Kufuor.jpg',
    statut: 'Confirmé',
  },

  {
    id: '10',
    nom: 'Bako Ambianda',
    titre: 'Chairman and Chief Executive Officer of Bako Group Holdings',
    institution: 'Bako Group Holdings',
    domaineStrategique: '',
    photoUrl: '/image/Bako Ambianda.jpg',
    statut: 'Invité',
  },

  {
    id: '11',
    nom: 'Amal El Fallah Seghrouchni',
    titre:
      'Minister Delegate to the Head of Government in charge of Digital Transition and Administrative Reform.',
    institution: 'Government',
    domaineStrategique: 'Digital & Policy',
    photoUrl: '/images/Amal El Fallah Seghrouchni.jpg',
    statut: 'Invité',
  },

  {
    id: '12',
    nom: 'Éléonore Caroit',
    titre:
      'France’s Minister Delegate for Francophonie and International Partnerships.',
    institution: 'Government',
    domaineStrategique: 'Francophonie and International Partnerships',
    photoUrl: '/images/Éléonore Caroit.jpg',
    statut: 'Invité',
  },
];
