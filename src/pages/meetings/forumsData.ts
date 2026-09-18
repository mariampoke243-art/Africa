// src/pages/Meetings/forumsData.ts

export interface ForumPillar {
  title: string;
  items: string[];
}

export interface Forum {
  id: number;
  key: string;
  image: string;
  title: string;
  description: string;
  overview: string;
  objectives: string[];
  keyAreas: string[];
  pillars: ForumPillar[];
}

export const forums: Forum[] = [
  {
    id: 3,
    key: 'africaPeaceForum',
    image: '/images/peaceforum.jpg',

    title: 'Africa Peace Forum',

    description:
      'A platform dedicated to dialogue, peacebuilding, stability and cooperation across Africa.',

    overview:
      'The Africa Peace Forum brings together leaders, institutions, experts and stakeholders to discuss practical approaches to strengthening peace, stability and cooperation across the continent.',

    objectives: [
      'Promote dialogue and cooperation between African stakeholders.',
      'Support peacebuilding and conflict prevention initiatives.',
      'Encourage regional and continental approaches to peace and stability.',
      'Strengthen partnerships between governments, institutions, civil society and the private sector.',
    ],

    keyAreas: [
      'Peacebuilding and conflict prevention',
      'Regional cooperation',
      'Governance and institutional development',
      'Youth and community engagement',
      'Inclusive economic development',
    ],

    pillars: [
      {
        title: 'Peace and Stability',
        items: [
          'Conflict prevention and resolution',
          'Peacebuilding initiatives',
          'Regional security cooperation',
        ],
      },
      {
        title: 'Dialogue and Cooperation',
        items: [
          'Multi-stakeholder dialogue',
          'Regional partnerships',
          'Knowledge and experience sharing',
        ],
      },
      {
        title: 'Inclusive Development',
        items: [
          'Youth participation',
          'Community resilience',
          'Economic opportunities for vulnerable communities',
        ],
      },
    ],
  },

  {
    id: 2,
    key: 'africaAgricultureFoodForum',
    image: '/images/africafood.jpg',

    title: 'Africa Agriculture & Food Forum',

    description:
      'A platform focused on agriculture, food security, agribusiness and sustainable food systems in Africa.',

    overview:
      'The Africa Agriculture & Food Forum brings together policymakers, investors, farmers, businesses, researchers and development partners to address the transformation of African agriculture and food systems.',

    objectives: [
      'Strengthen food security and agricultural resilience.',
      'Promote investment in African agriculture and agribusiness.',
      'Support innovation and technology across food systems.',
      'Improve market access and regional agricultural trade.',
      'Encourage sustainable and climate-resilient agricultural practices.',
    ],

    keyAreas: [
      'Food security',
      'Agribusiness and investment',
      'Agricultural technology and innovation',
      'Sustainable agriculture',
      'Regional food trade and markets',
    ],

    pillars: [
      {
        title: 'Food Security and Resilience',
        items: [
          'Food production and availability',
          'Climate resilience',
          'Sustainable food systems',
        ],
      },
      {
        title: 'Agribusiness and Investment',
        items: [
          'Agricultural investment',
          'Value-chain development',
          'Access to finance',
        ],
      },
      {
        title: 'Innovation and Technology',
        items: [
          'AgriTech solutions',
          'Digital agriculture',
          'Research and innovation',
        ],
      },
      {
        title: 'Markets and Trade',
        items: [
          'Regional agricultural trade',
          'Market access',
          'Value addition and processing',
        ],
      },
    ],
  },

  {
    id: 4,
    key: 'africaEnergyInfrastructureForum',
    image: '/images/africaenergi.jpg',

    title: 'Africa Energy & Infrastructure Forum',

    description:
      'Mobilizing capital and expertise to build world-class infrastructure that connects Africa and drives economic growth.',

    overview:
      "The Infrastructure Investment Forum is designed to address Africa's massive infrastructure deficit, which is estimated to require over $130 billion annually. This forum brings together governments, development finance institutions, private investors, and infrastructure companies to unlock the capital needed for transformational projects across the continent. The forum focuses on transportation networks, energy systems, telecommunications infrastructure, and urban development projects that will connect African markets, reduce trade costs, and improve quality of life for millions of people.",

    objectives: [
      'Mobilize capital for transformational infrastructure projects.',
      'Strengthen transportation and regional connectivity.',
      'Accelerate renewable energy, grid modernization, and rural electrification.',
      'Expand digital infrastructure across African markets.',
      'Support sustainable water, sanitation, and urban infrastructure development.',
    ],

    keyAreas: [
      'Transportation infrastructure including highways, railways, ports, and airports to enhance regional connectivity',
      'Energy infrastructure development focusing on renewable energy, grid modernization, and rural electrification',
      'Digital infrastructure expansion including fiber optic networks, data centers, and telecommunications systems',
      'Water and sanitation infrastructure to support urban growth and improve public health outcomes',
      'Public-private partnership models that leverage both public resources and private sector efficiency',
    ],

    pillars: [
      {
        title: 'Transportation Infrastructure',
        items: [
          'Highways and road networks',
          'Railways and regional connectivity',
          'Ports and airports',
        ],
      },
      {
        title: 'Energy Infrastructure',
        items: [
          'Renewable energy development',
          'Grid modernization',
          'Rural electrification',
        ],
      },
      {
        title: 'Digital Infrastructure',
        items: [
          'Fiber optic networks',
          'Data centers',
          'Telecommunications systems',
        ],
      },
      {
        title: 'Water and Urban Infrastructure',
        items: [
          'Water infrastructure',
          'Sanitation systems',
          'Sustainable urban development',
        ],
      },
      {
        title: 'Public-Private Partnerships',
        items: [
          'Infrastructure financing models',
          'Public-private partnerships',
          'Private sector participation',
        ],
      },
    ],
  },

  {
    id: 5,
    key: 'africaMiningMineralsForum',
    image: '/images/miningafrica.jpg',

    title: 'Africa Mining & Minerals Forum (AMMF)',

    description:
      'Moving Africa from mere mineral extraction to value-chain dominance through local beneficiation and ESG-compliant mining.',

    overview:
      "Africa's minerals are the bedrock of the global energy transition. This forum is dedicated to moving the continent from mere extraction to value-chain dominance. We focus on local beneficiation, ESG-compliant mining, and financing mineral processing plants. The forum directly connects African Mining Ministers with battery manufacturers, EV automakers, and green-tech investors to negotiate deals that retain value and jobs on the continent.",

    objectives: [
      'Promote local beneficiation and value-chain development for critical minerals.',
      'Encourage ESG-compliant and environmentally responsible mining practices.',
      'Develop mine-to-manufacture partnerships with global manufacturers.',
      'Facilitate critical minerals supply contracts for the energy transition.',
      'Strengthen strategic partnerships between African mining ministries and global technology companies.',
    ],

    keyAreas: [
      'Local beneficiation and value chain development for critical minerals',
      'ESG-compliant mining practices and green mining agreements',
      'Mine-to-manufacture joint ventures with global manufacturers',
      'Critical minerals supply contracts for the energy transition',
      'Strategic partnerships between African mining ministries and global tech companies',
    ],

    pillars: [
      {
        title: 'Local Beneficiation',
        items: [
          'Critical minerals value chains',
          'Mineral processing',
          'Local industrial development',
        ],
      },
      {
        title: 'ESG and Sustainable Mining',
        items: [
          'ESG-compliant mining practices',
          'Green mining agreements',
          'Responsible resource development',
        ],
      },
      {
        title: 'Mine-to-Manufacture Partnerships',
        items: [
          'Joint ventures with global manufacturers',
          'Battery manufacturing partnerships',
          'Electric vehicle supply chains',
        ],
      },
      {
        title: 'Critical Minerals and Energy Transition',
        items: [
          'Critical minerals supply contracts',
          'Green technology investment',
          'Strategic minerals partnerships',
        ],
      },
    ],
  },

  {
    id: 6,
    key: 'africaDigitalEconomyTechForum',
    image: '/images/africatechforum.jpg',

    title: 'Africa Digital Economy & Tech Forum (ADETF)',

    description:
      "Igniting Africa's digital economy through innovation, venture capital, and strategic technology partnerships.",

    overview:
      "Africa's tech revolution is reshaping its economic destiny. This forum is a dynamic, high-energy showcase of innovation, from FinTech and EdTech to HealthTech and CleanTech. It is designed as a massive platform for startups to pitch to global VCs, for corporates to find tech solutions, and for governments to articulate their digital economy strategies. The forum promotes digital sovereignty and local capacity building for long-term growth.",

    objectives: [
      'Accelerate innovation across Africa’s digital economy.',
      'Connect African startups with global venture capital and strategic investors.',
      'Promote technology solutions in finance, healthcare, education, agriculture, and climate action.',
      'Support digital sovereignty and local technology capacity.',
      'Strengthen partnerships between governments, corporations, startups, and technology investors.',
    ],

    keyAreas: [
      'FinTech innovation: payments, lending, and blockchain solutions',
      'HealthTech and EdTech: solving human capital challenges at scale',
      'ClimateTech: AI for agriculture, green energy, and ESG data',
      'Venture capital funding and tech startup ecosystem development',
      'Digital sovereignty and platform building for African markets',
    ],

    pillars: [
      {
        title: 'FinTech Innovation',
        items: [
          'Digital payments',
          'Digital lending',
          'Blockchain solutions',
        ],
      },
      {
        title: 'HealthTech and EdTech',
        items: [
          'Digital healthcare solutions',
          'Education technology',
          'Human capital development',
        ],
      },
      {
        title: 'ClimateTech',
        items: [
          'AI for agriculture',
          'Green energy technology',
          'ESG data solutions',
        ],
      },
      {
        title: 'Venture Capital and Startups',
        items: [
          'Venture capital funding',
          'Startup ecosystem development',
          'Global investor connections',
        ],
      },
      {
        title: 'Digital Sovereignty',
        items: [
          'African digital platforms',
          'Local technology capacity',
          'Digital infrastructure and sovereignty',
        ],
      },
    ],
  },

  {
    id: 7,
    key: 'africaWealthForum',
    image: '/images/africawelth.jpg',

    title: 'Africa Wealth Forum (AWF)',

    description:
      'Mobilizing African and global wealth for long-term investment, sovereign growth, and strategic capital alignment.',

    overview:
      "The Africa Wealth Forum (AWF) is the flagship platform of the Africa Economic Forum dedicated to mobilizing, structuring, and aligning African and global wealth toward long-term, strategic, and sovereign development. Organized under the aegis of the Africa Economic Forum, the AWF brings together family offices, institutional investors, sovereign wealth actors, private banks, asset managers, and strategic capital partners to reposition African wealth as a driver of continental transformation. The Forum is designed as a permanent platform for dialogue, deal-making, and strategic alignment — ensuring that African and diaspora capital plays a central role in financing Africa’s future priorities.",

    objectives: [
      'Mobilize African and diaspora private wealth.',
      'Align long-term capital with sovereign development priorities.',
      'Structure cross-border investment platforms.',
      'Deploy wealth into strategic sectors including infrastructure, energy, health, technology, and agribusiness.',
      'Develop intergenerational wealth strategy and legacy investment frameworks.',
    ],

    keyAreas: [
      'Mobilization of African and diaspora private wealth',
      'Alignment of long-term capital with sovereign development priorities',
      'Structuring of cross-border investment platforms',
      'Wealth deployment into strategic sectors (infrastructure, energy, health, tech, agribusiness)',
      'Intergenerational wealth strategy and legacy investment frameworks',
    ],

    pillars: [
      {
        title: 'African and Diaspora Wealth',
        items: [
          'Family offices and ultra-high-net-worth individuals',
          'Diaspora investment platforms',
          'Mobilization of private wealth',
        ],
      },
      {
        title: 'Institutional and Strategic Capital',
        items: [
          'Institutional investors and asset managers',
          'Sovereign wealth and strategic capital vehicles',
          'Private banks and wealth managers',
        ],
      },
      {
        title: 'Strategic Investment',
        items: [
          'Infrastructure investment',
          'Energy and healthcare investment',
          'Technology and agribusiness investment',
        ],
      },
      {
        title: 'Purpose',
        items: [
          'Position wealth as a strategic instrument for sovereignty',
          'Strengthen economic resilience',
          'Support long-term continental prosperity',
          'Make African wealth a central pillar of Africa’s economic future',
        ],
      },
    ],
  },

  {
    id: 8,
    key: 'africaHealthForum',
    image: '/images/africahealth.jpg',

    title: 'Africa Health Forum',

    description:
      'Building Resilient Health Systems and investing in human capital.',

    overview:
      "A healthy population is the core of economic productivity and sovereignty. This forum addresses Africa's healthcare infrastructure gap and its burgeoning pharmaceutical market. It brings together hospital groups, pharma manufacturers, medical tech companies, and impact investors to forge partnerships for building diagnostic centers, local vaccine production, and deploying scalable health-tech solutions.",

    objectives: [
      'Strengthen resilient health systems across Africa.',
      'Mobilize investment in healthcare infrastructure and human capital.',
      'Support local pharmaceutical and vaccine manufacturing capacity.',
      'Expand access to telehealth, AI, and scalable health technologies.',
      'Develop partnerships between healthcare providers, manufacturers, technology companies, and investors.',
    ],

    keyAreas: [
      'The Hospital of the Future – PPPs for Tertiary Care and Diagnostic Centers',
      'Pharma & Vaccines – Building Local Manufacturing Capacity',
      'Telehealth and AI – Democratizing Access to Quality Care',
      'Health Sovereignty and Local Vaccine Production',
      'Health Infrastructure Investment',
    ],

    pillars: [
      {
        title: 'Healthcare Infrastructure',
        items: [
          'The Hospital of the Future',
          'Tertiary care facilities',
          'Diagnostic centers',
        ],
      },
      {
        title: 'Pharmaceuticals and Vaccines',
        items: [
          'Local pharmaceutical manufacturing',
          'Vaccine production capacity',
          'Pharmaceutical partnerships',
        ],
      },
      {
        title: 'Telehealth and AI',
        items: [
          'Telehealth solutions',
          'Artificial intelligence in healthcare',
          'Scalable digital health technologies',
        ],
      },
      {
        title: 'Health Sovereignty',
        items: [
          'Local vaccine production',
          'Healthcare resilience',
          'Strategic health partnerships',
        ],
      },
    ],
  },

  {
    id: 9,
    key: 'africaEconomicForumCooperationSummit',
    image: '/images/annual.jpg',

    title: 'Africa Economic Forum Cooperation Summit',

    description:
      'The strategic launchpad for the year, integrating macroeconomic strategy with the core pillars of sovereignty.',

    overview:
      'The Cooperation Summit is the strategic launchpad for the year, where we convene at the diplomatic heart of Africa. It integrates macroeconomic strategy with the core pillars of sovereignty—fiscal policy, security, energy independence, and food security. The focus is on defining the "rules of the game" for the year ahead: how African nations leverage their assets to negotiate from a position of strength in a realigning world.',

    objectives: [
      'Define strategic priorities for the year ahead.',
      'Integrate macroeconomic strategy with key areas of sovereignty.',
      'Strengthen bilateral and regional cooperation.',
      'Develop strategic approaches to sovereign wealth and investment.',
      'Examine Africa’s role in the geopolitics of investment.',
    ],

    keyAreas: [
      'The Addis Ababa Consensus (a strategic framework for investment & sovereignty)',
      'Bilateral Cooperation Agreements',
      'Sovereign Wealth Fund Strategies',
      'Regional Security Pacts',
      'Africa in the Geopolitics of Investment',
    ],

    pillars: [
      {
        title: 'Macroeconomic Strategy',
        items: [
          'Fiscal policy',
          'Investment strategy',
          'Sovereign economic planning',
        ],
      },
      {
        title: 'Sovereignty and Security',
        items: [
          'Regional security cooperation',
          'Security partnerships',
          'Strategic sovereignty',
        ],
      },
      {
        title: 'Energy and Food Security',
        items: [
          'Energy independence',
          'Food security',
          'Strategic resource management',
        ],
      },
      {
        title: 'Cooperation and Investment',
        items: [
          'The Addis Ababa Consensus',
          'Bilateral cooperation agreements',
          'Sovereign wealth fund strategies',
          'Africa in the geopolitics of investment',
        ],
      },
    ],
  },
];
