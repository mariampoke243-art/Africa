// src/data/spotlightData.ts

export interface SpotlightArticle {
  id: number;
  key: string;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  content: string[];
}

export const spotlightArticles: SpotlightArticle[] = [
  {
    id: 1,
    key: 'afdbWomenForum',
    title:
      'African Development Bank Becomes Technical Partner of the Africa Women Forum',
    category: 'Institutional Partnership',
    date: 'January 31, 2026',
    image: '/images/africa-women.jpg',
    description:
      'The Africa Economic Forum is honored to announce that the African Development Bank (AfDB) has formally joined the Africa Women Forum (AWF) as an official technical partner.',
    content: [
      'The Africa Economic Forum is honored to announce that the African Development Bank (AfDB) has formally joined the Africa Women Forum (AWF) as an official technical partner.',

      'This partnership represents a significant institutional milestone for the Africa Women Forum and reinforces its positioning as a premier continental platform for women\'s economic leadership, policy engagement, and investment-driven transformation.',

      'The African Development Bank, as Africa\'s leading multilateral development finance institution, brings unparalleled technical expertise, policy knowledge, and sectoral depth across infrastructure, financial systems, private sector development, governance, and sustainable growth. Its engagement with the Africa Women Forum strengthens AWF\'s capacity to translate high-level dialogue into credible, scalable, and policy-aligned outcomes.',

      'This collaboration reflects a shared strategic vision: placing African women at the center of economic architecture, not as peripheral participants, but as architects of Africa\'s development strategies, capital deployment, and governance reforms. The partnership reinforces the principle that women\'s leadership is not a social add-on to development — it is a structural pillar of economic sovereignty, institutional resilience, and long-term growth.',

      'Through this technical partnership, the Africa Women Forum will integrate AfDB\'s analytical frameworks, policy instruments, and development experience into its programming, ensuring that AWF initiatives are grounded in rigorous economic analysis and aligned with continental and national priorities. This elevates the Forum from a convening space into a platform of execution, policy coherence, and institutional credibility.',

      'For the Africa Economic Forum, this partnership sends a strong signal to governments, investors, and global institutions: the Africa Women Forum is not symbolic. It is a serious platform where gender, capital, policy, and sovereign development intersect to produce measurable outcomes.',

      'The Africa Economic Forum views this partnership as a cornerstone in building a continental ecosystem where women\'s leadership is structurally embedded in Africa\'s economic future.',
    ],
  },

  {
    id: 2,
    key: 'africanTable',
    title:
      "The African Table: How AEF Is Rebuilding Africa's Seat in Global Economic Decision-Making",
    category: 'Strategic Leadership',
    date: 'January 30, 2026',
    image: '/images/african-table.jpg',
    description:
      'The Africa Economic Forum was founded on a strategic conviction: Africa must not only participate in global economic conversations, Africa must host them, shape them, and define their terms.',
    content: [
      'The Africa Economic Forum was founded on a strategic conviction: Africa must not only participate in global economic conversations, Africa must host them, shape them, and define their terms.',

      "This conviction is embodied in AEF's core strategic architecture: The African Table.",

      'The African Table is more than a symbolic concept. It is a structural redesign of how Africa engages with global capital, institutions, and governments. It represents a shift from externally framed engagement toward Africa-centered agenda-setting, where priorities, frameworks, and cooperation models are defined from African strategic interests and sovereign development goals.',

      'At the African Table, Africa is not a guest. Africa is the host.',

      'By curating the space, setting the agenda, and defining the terms of engagement, Africa reclaims agency over how partnerships are structured, how priorities are ranked, and how cooperation translates into execution.',

      'The African Table moves beyond episodic conferences and transactional meetings. It establishes a perpetual architecture of engagement, where Africa leads continuous dialogue across governments, investors, institutions, and global partners throughout the year.',

      "This model transforms Africa's role from reactive to architectural. Instead of responding to externally designed frameworks, Africa becomes a co-author of global economic arrangements, shaping how cooperation, investment, and policy alignment are structured.",

      'Through the African Table, AEF positions Africa not as a market to be evaluated, but as a strategic co-leader shaping the future of global economic cooperation.',

      'This is a fundamental repositioning, from participation to authorship, from inclusion to leadership, from attendance to architecture.',
    ],
  },

  {
    id: 3,
    key: 'dealRooms',
    title:
      "From Access to Alignment: Why AEF's Deal Rooms Matter More Than Networking",
    category: 'Investment & Deal Rooms',
    date: 'January 29, 2026',
    image: '/images/access-to-alignment.png',
    description:
      'In many global forums, engagement between investors and governments remains largely social. Panels, receptions, and informal meetings dominate the interaction, creating visibility but often leaving execution risks unresolved.',
    content: [
      'In many global forums, engagement between investors and governments remains largely social. Panels, receptions, and informal meetings dominate the interaction, creating visibility but often leaving execution risks unresolved.',

      'The Africa Economic Forum was designed to move beyond this model.',

      'At AEF, Deal Rooms are not pitch sessions — they are structured execution environments.',

      'AEF Deal Rooms are purpose-built negotiation spaces where governments, investors, and project sponsors engage directly on the conditions required for projects to move forward. This includes regulatory clarity, policy alignment, political commitment, institutional coordination, and execution pathways.',

      'For serious investors, the greatest risks are rarely technical. They are institutional: uncertainty around policy direction, regulatory stability, political priorities, and administrative bottlenecks.',

      'AEF Deal Rooms allow investors to test assumptions directly with decision-makers. Rather than guessing how policies will evolve, investors can validate political support, clarify regulatory frameworks, and assess execution readiness before deploying capital.',

      'This transforms government engagement from protocol to performance.',

      'Deal Rooms allow capital to understand how governments think, what they prioritize, and where policy support will be strongest. This creates a rare form of clarity in emerging markets: a clearer investment map shaped through direct institutional alignment.',

      'At AEF, capital does not meet governments socially. Capital meets governments structurally.',

      'This alignment reduces uncertainty, strengthens investor confidence, and accelerates the transition from interest to execution. It is not networking. It is risk management and execution architecture.',
    ],
  },

  {
    id: 4,
    key: 'multiSectorContinuity',
    title:
      'Why Multi-Sector Does Not Mean Fragmented: How AEF Creates Continuity for Investors and Governments',
    category: 'Institutional Continuity',
    date: 'January 28, 2026',
    image: '/images/multi-sector-continuity.png',
    description:
      "At first glance, AEF's multi-sector structure can appear fragmented. Each forum focuses on a different thematic area. However, this interpretation misunderstands how serious capital and sovereign partners operate.",
    content: [
      "At first glance, AEF's multi-sector structure can appear fragmented. Each forum focuses on a different thematic area. However, this interpretation misunderstands how serious capital and sovereign partners operate.",

      'Continuity at AEF is not sector-based. It is relationship-based, policy-based, and pipeline-based.',

      'Investors do not build strategies around conferences. They build strategies around governments, institutional relationships, and long-term capital mandates.',

      'AEF ensures continuity by maintaining the same core government counterparts across multiple forums: finance ministries, investment agencies, regulators, presidential offices, and key public institutions. Even as sector themes rotate, the institutional relationships remain constant.',

      'This allows trust to accumulate, political intelligence to deepen, and institutional memory to form.',

      'From an investor perspective, this is far more valuable than remaining within a single sector. Capital mandates — such as infrastructure, energy transition, healthcare systems, food systems, and digital infrastructure — naturally span multiple sectors. AEF\'s architecture allows investors to pursue the same capital thesis across different thematic forums with the same sovereign partners.',

      'In addition, projects do not mature in a single meeting. They evolve over time. A project may be introduced at one forum, refined through policy dialogue, and return later in Deal Rooms for execution alignment and closure.',

      'AEF thus becomes a project maturation pipeline, not a one-time pitching environment.',

      'This creates a rare institutional advantage: continuity through relationships, policies, and execution logic, rather than through thematic repetition.',

      'AEF continuity is institutional, not thematic. This is precisely what long-term capital and sovereign partners value most.',
    ],
  },

  {
    id: 5,
    key: 'africaWomenForum2026',
    title:
      "Africa Women Forum 2026: Women as Architects of Africa's Sovereign Economic Future",
    category: 'Africa Women Forum',
    date: 'January 27, 2026',
    image: '/images/africa-women-forum.jpg',
    description:
      "The Africa Women Forum (AWF) stands as one of the flagship platforms of the Africa Economic Forum, designed to position women at the center of Africa's economic, political, and strategic transformation.",
    content: [
      "The Africa Women Forum (AWF) stands as one of the flagship platforms of the Africa Economic Forum, designed to position women at the center of Africa's economic, political, and strategic transformation.",

      "AWF 2026 will convene women leaders, heads of state, policymakers, investors, entrepreneurs, and global institutions to shape concrete strategies for women's leadership in governance, finance, entrepreneurship, and sovereign development.",

      'The Forum will bring together high-level voices including former President of the Republic of Mauritius, Ameenah Gurib-Fakim, and former Vice President of Costa Rica, Ana Helena Chacón Echeverría, alongside senior African government officials, multilateral institutions, and global investors.',

      'With the African Development Bank joining as a technical partner, AWF is positioned as a serious continental platform where women\'s leadership intersects directly with investment strategies, policy frameworks, and institutional reform.',

      'The Africa Economic Forum views AWF as a strategic pillar of Africa\'s future. It is a platform where women are not only represented, but where they actively design systems, institutions, and capital flows that shape Africa\'s sovereignty and long-term competitiveness.',

      "AWF is a central engine of Africa's economic architecture.",

      "Through AWF, the Africa Economic Forum reinforces a simple truth: Africa's future will be built by women who lead, govern, invest, and architect transformation at scale.",
    ],
  },
];
