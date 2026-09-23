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
    description:
      'Ghanaian politician and former Member of Parliament for Twifo Atti-Morkwa, with experience in agricultural policy and development.',
    statut: 'Confirmé',
  },

  {
    id: '2',
    key: 'hildaSukaMafudze',
    nom: 'H.E Hilda Suka Mafudze',
    photoUrl: '/images/OfficeH.E Hilda Suka Mafudze.jpg',
    description:
      'Zimbabwean diplomat and senior African Union representative with experience in diplomacy, regional cooperation, trade, investment and development.',
    statut: 'Confirmé',
  },

  {
    id: '3',
    key: 'dominiqueMigisha',
    nom: 'H.E Dominique Migisha',
    photoUrl: '/images/H.E Dominique Migisha.jpg',
    description:
      'Digital development specialist focused on digital transformation and modernization of public-sector services in the Democratic Republic of Congo.',
    statut: 'Confirmé',
  },

  {
    id: '4',
    key: 'rashedMohamedKarkain',
    nom: 'Dr. Rashed Mohamed Karkain',
    photoUrl: '/images/Dr. Rashed Mohamed Karkain.jpg',
    description:
      'Emirati innovator, researcher and author specializing in sustainable development, circular economy, environmental leadership and sustainability.',
    statut: 'Confirmé',
  },

  {
    id: '5',
    key: 'abdullahBelhaifAlNuaimi',
    nom: 'H.E Abdullah Belhaif Al Nuaimi',
    photoUrl: '/images/H.E Abdullah Belhaif Al Nuaimi.jpg',
    description:
      'Emirati engineer, statesman and sustainability specialist with extensive experience in infrastructure, environmental policy and climate action.',
    statut: 'Confirmé',
  },

  {
    id: '6',
    key: 'abdullahiKassim',
    nom: 'Engr Abdullahi KassimEngr',
    photoUrl: '/images/Engr Abdullahi KassimEngr.jpg',
    description:
      'Energy and engineering executive with extensive experience in power generation, energy infrastructure and engineering leadership.',
    statut: 'Confirmé',
  },

  {
    id: '7',
    key: 'anaHelenaChaconEcheverria',
    nom: 'H.E Ana-Helena Chacón Echeverría',
    photoUrl: '/images/ana-helena-chacon.jpg',
    description:
      'Costa Rican diplomat and public leader, former Vice President of Costa Rica and advocate for human rights, social inclusion and international cooperation.',
    statut: 'Confirmé',
  },

  {
    id: '8',
    key: 'rosaliaArteaga',
    nom: 'H.E Rosalia Arteaga',
    photoUrl: '/images/H.E Rosalia Arteaga.jpg',
    description:
      'Former President and Vice President of Ecuador, educator, lawyer, writer and advocate for education, culture and sustainable development.',
    statut: 'Confirmé',
  },

  {
    id: '9',
    key: 'johnAgyekumKufuor',
    nom: 'H.E John Agyekum Kufuor',
    photoUrl: '/images/H.E John Agyekum Kufuor.jpg',
    description:
      'Former President of Ghana, lawyer and statesman with extensive experience in public service and African development.',
    statut: 'Confirmé',
  },

  {
    id: '12',
    key: 'eleonoreCaroit',
    nom: 'Éléonore Caroit',
    photoUrl: '/images/Éléonore Caroit.jpg',
    description:
      'French-Dominican lawyer and public official with experience in international law, international partnerships, Francophonie and relations with French citizens abroad.',
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
    photoUrl: '/images/Dr. Mike Horton.jpg',
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
  // NOUVEAUX CONFIRMÉS
  // =========================

  {
    id: '27',
    key: 'yassinAlSuroor',
    nom: 'Yassin Al Suroor',
    photoUrl: '/images/Yassin Al Suroor.jpg',
    description: "Founder & CEO of A'amal Group",
    statut: 'Confirmé',
  },

  {
    id: '28',
    key: 'cheikhAhmedHAlGhareeb',
    nom: 'HE Sheikh Ahmed H. Al Ghareeb',
    photoUrl: '/images/LE Cheikh Ahmed H al ghareeb.jpg',
    description:
      'CEO Middle East - CICERES MONACO\nChairman Middle East - MARIA GROUP INTERNATIONAL',
    statut: 'Confirmé',
  },

  {
    id: '29',
    key: 'thanveerUmmerHaji',
    nom: 'Thanveer Ummer Haji',
    photoUrl: '/images/Thanveer Ummer Haji.jpg',
    description:
      'Board Director - CICERES MONACO\nCEO - MARIA GROUP INTERNATIONAL',
    statut: 'Confirmé',
  },

  {
    id: '30',
    key: 'njAyuk',
    nom: 'NJ Ayuk',
    photoUrl: '/images/NJ Ayuk.jpg',
    description:
      'Executive Chairman, African Energy Chamber',
    statut: 'Confirmé',
  },

  {
    id: '31',
    key: 'rtnManpreetSingh',
    nom: 'Rtn Manpreet Singh',
    photoUrl: '/images/Rtn Manpreet Singh.jpg',
    description:
      'President, Indian Chamber of International Business',
    statut: 'Confirmé',
  },

  {
    id: '32',
    key: 'lethaboBosoga',
    nom: 'Lethabo Bosoga',
    photoUrl: '/images/Lethabo Bosoga.jpg',
    description:
      'Partenaire Associé dans la Banque et les Finances, Procureur Motsoeneng Bill',
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
    statut: 'Confirmé',
  },
];
