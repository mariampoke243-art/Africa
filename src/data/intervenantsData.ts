// src/data/intervenantsData.ts

export interface Intervenant {
  id: string;
  key: string;
  nom: string;
  photoUrl: string;
  description?: string;
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
    photoUrl: '/images/Dr. Rashed Mohamed Karkain.jpg',
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
    photoUrl: '/images/Bako Ambianda.jpg',
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

  // =========================
  // CONFIRMÉS
  // =========================

  {
    id: '13',
    key: 'zarinahTraciSilas',
    nom: 'Zarinah Traci Silas, J.D.',
    photoUrl: '/images/Zarinah_Traci_Silas.jpg',
    description:
      'Co-Founder, Africa Resources Capital Holdings & Former Senior Executive Service, USA Federal Government',
    statut: 'Confirmé',
  },

  {
    id: '14',
    key: 'jacquelineJaqCampbell',
    nom: 'Jacqueline JaQ Campbell',
    photoUrl: '/images/Jaqueline JaQ Campbell.jpg',
    description:
      'Wealth Management Executive, Entrepreneur & U.S.–Africa Investment Strategist',
    statut: 'Confirmé',
  },

  {
    id: '15',
    key: 'vladimirNorov',
    nom: 'H.E Vladimir Norov',
    photoUrl: '/images/H.E Vladimir Norov.jpg',
    description:
      'Former Foreign Affairs Minister of Uzbekistan & SCO Secretary-General',
    statut: 'Confirmé',
  },

  {
    id: '16',
    key: 'akwasiOpongFosu',
    nom: 'Hon. Akwasi Opong-Fosu Ph.D',
    photoUrl: '/images/Hon. Akwasi Opong-Fosu.jpg',
    description:
      'Chairman of the Ghana Investment Promotion Centre, Former Minister of State & Member of Parliament',
    statut: 'Confirmé',
  },

  {
    id: '17',
    key: 'mikeHorton',
    nom: 'Dr. Mike Horton',
    photoUrl: '/images/Mike Horton.jpg',
    description:
      'Former Federal Chief AI Officer, U.S, Director of the Center for Applied AI Maturity, Northeastern University',
    statut: 'Confirmé',
  },

  {
    id: '18',
    key: 'afolakeOyinloye',
    nom: 'Afolake Oyinloye',
    photoUrl: '/images/Afolake Oyinloye.jpg',
    description: 'Journalist, AfricaNews',
    statut: 'Confirmé',
  },

  {
    id: '19',
    key: 'eliezerMoodiSandberg',
    nom: 'H.E Eliezer Moodi Sandberg',
    photoUrl: '/images/H.E Eliezer Moodi Sandberg.jpg',
    description: 'Israeli Former Minister of Science and Technology',
    statut: 'Confirmé',
  },

  {
    id: '20',
    key: 'muhammadAzfarAhsan',
    nom: 'H.E Muhammad Azfar Ahsan',
    photoUrl: '/images/H.E Muhammad Azfar.jpg',
    description: 'Former Minister of Investment, Pakistan',
    statut: 'Confirmé',
  },

  // =========================
  // INVITÉS
  // =========================

  {
    id: '21',
    key: 'dagmawitMogesBekele',
    nom: 'Dagmawit Moges Bekele',
    photoUrl: '/images/Dagmawit Moges Bekele.jpg',
    description:
      'Director of the African Union Peace Fund Secretariat.',
    statut: 'Invité',
  },

  {
    id: '22',
    key: 'kevinChikaUrama',
    nom: 'Prof. Kevin Chika Urama',
    photoUrl: '/images/Prof. Kevin Chika Urama.jpg',
    description:
      'Chief Economist and Vice-President in charge of Economic Governance and Knowledge Management at the African Development Bank Group.',
    statut: 'Invité',
  },

  {
    id: '23',
    key: 'mosesVilakati',
    nom: 'H.E. Moses Vilakati',
    photoUrl: '/images/H.E. Moses Vilakati.jpg',
    description:
      'Commissioner for Agriculture, Rural Development, Blue Economy and Sustainable Environment of the African Union Commission (AUC)',
    statut: 'Invité',
  },

  {
    id: '24',
    key: 'agostinhoKapaia',
    nom: 'Agostinho Kapaia',
    photoUrl: '/images/Agostinho Kapaia.jpg',
    description: 'Chairman of OPAIA Group',
    statut: 'Invité',
  },

  {
    id: '25',
    key: 'rebecaGrynspan',
    nom: 'Rebeca Grynspan',
    photoUrl: '/images/Rebeca Grynspa.jpg',
    description:
      'Candidate for @UN Secretary-General. @UNCTAD Secretary-General on special leave. Former Secretary-General SEGIB. Former Vice President of Costa Rica.',
    statut: 'Invité',
  },

  {
    id: '26',
    key: 'lindaKarimCreevey',
    nom: 'Dr. Linda Karim-Creevey',
    photoUrl: '/images/Dr. Linda Karim-Creevey.jpg',
    description:
      'Liberia Trade Investment and Representative for Asia and Australia',
    statut: 'Invité',
  },
];
