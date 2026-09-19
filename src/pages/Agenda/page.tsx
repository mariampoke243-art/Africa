import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../supabase/client';
import { listeIntervenants } from '../../data/intervenantsData';
import { LanguageSelector } from '../../components/LanguageSelector';

type Session = {
  time: string;
  title: string;
  description: string;
  dealTrack?: string;
  questions?: string[];
  focus?: string[];
  format?: string;
  purpose?: string;
};

type Day = {
  title: string;
  subtitle?: string;
  sessions: Session[];
};

type ConversionType =
  | 'country'
  | 'bloc'
  | 'investor'
  | 'project'
  | null;

type ConversionConfigItem = {
  title: string;
  fields: string[];
  hasFile?: boolean;
  fileLabel?: string;
};

const event = {
  id: 1,
  title: 'Africa Economic Forum 2026',
  subtitle:
    'Africa and Global Realignment: Investments, Alliances & Strategic Opportunities',
  date: '10–11 November 2026',
  location:
    'Fleuve Congo Hotel, Kinshasa, Democratic Republic of Congo',
};

const agendaPdfUrl =
  '/images/AEF_2026_Kinshasa_Brochure_FINAL-1.pdf';

/* ===================================================
   DAY ONE
   =================================================== */

const dayOne: Day = {
  title: 'DAY ONE',
  subtitle: 'THE GEOPOLITICS OF CAPITAL',
  sessions: [
    {
      time: '08:00 – 09:00',
      title: 'DIPLOMATIC BREAKFAST',
      description:
        'MINISTERS × GULF INVESTORS × CEOs',
      format: 'Curated 1:1 conversations',
      purpose:
        'Identify the relationships and investment priorities that need to happen during the Forum.',
      dealTrack:
        'DEAL MATCHMAKING — Sector × Geography × Capital × Project × Partnership',
    },
    {
      time: '09:00 – 10:30',
      title: 'AFRICA IN THE GEOPOLITICS OF INVESTMENT',
      description:
        'HOW AFRICA CAN LEVERAGE US–CHINA–GULF RIVALRIES FOR CAPITAL FLOWS',
      questions: [
        'Global investor sentiment',
        'Gulf capital',
        'Equity versus debt',
        'Technology investment',
        'Africa’s strategic positioning',
      ],
      dealTrack:
        'DEAL TRACK — AFRICA–GULF INVESTMENT PIPELINE',
    },
    {
      time: '10:30 – 12:00',
      title: 'CURRENCY WARS & FINANCIAL SOVEREIGNTY',
      description:
        'DOLLAR. YUAN. GOLD. DIGITAL ASSETS.',
      questions: [
        'Currency risk',
        'Financial sovereignty',
        'Gold and tangible assets',
        'Blockchain',
        'Development finance',
      ],
      dealTrack:
        'DEAL TRACK — STRATEGIC FINANCIAL PARTNERSHIPS',
    },
    {
      time: '12:00 – 14:00',
      title: 'THE VIP LUNCHEON',
      description:
        'WHERE COUNTRIES, CAPITAL AND STRATEGIC PARTNERS SIT AT THE SAME TABLE.',
      dealTrack:
        '10 curated investment tables',
      focus: [
        'Tech Exit Strategies',
        'Infrastructure PPPs',
        'Energy Finance',
        'Critical Minerals',
        'Gulf–Africa Investment',
        'Industrial Partnerships',
      ],
    },
    {
      time: '14:00 – 15:30',
      title: 'TECHNOLOGY & DIGITAL SOVEREIGNTY',
      description:
        'CAN AFRICA BUILD DIGITAL INFRASTRUCTURE ON ITS OWN TERMS?',
      focus: [
        'AI',
        'Fintech',
        'Digital Infrastructure',
        'Patient Capital',
        'Technology Partnerships',
      ],
      dealTrack:
        'DEAL TRACK — TECHNOLOGY PARTNERSHIPS & INVESTMENT',
    },
    {
      time: '15:30 – 17:00',
      title: 'ENERGY & NEW ALLIANCES',
      description:
        'OIL. GAS. GREEN. NUCLEAR.',
      questions: [
        'Who will finance the energy infrastructure required for Africa’s next economic cycle?',
        'How should Africa balance energy security, industrialisation and transition?',
        'Where is long-term capital required?',
      ],
      dealTrack:
        'DEAL TRACK — SELECTED AFRICAN ENERGY PROJECTS',
    },
    {
      time: '17:00 – 18:30',
      title: 'THE GRAND AFRICAN DEAL',
      description:
        'WHERE STRATEGIC INTENT BECOMES VISIBLE.',
      focus: [
        'Investment Commitments',
        'MoUs',
        'Joint Ventures',
        'Infrastructure Partnerships',
        'Financing Agreements',
        'Strategic Alliances',
      ],
      dealTrack:
        'AEF DEAL DASHBOARD — Deals Announced • Capital Mobilised • Projects Advanced • Partnerships Formed',
    },
    {
      time: '18:30+',
      title: 'CLOSED-DOOR SIGNINGS',
      description:
        'THE DEAL ROOM REMAINS OPEN.',
      purpose:
        'Selected negotiations continue beyond the public programme, with dedicated spaces for final discussions, documentation and signing processes.',
    },
  ],
};

/* ===================================================
   DAY TWO
   =================================================== */

const dayTwo: Day = {
  title: 'DAY TWO',
  subtitle: 'FROM STRATEGIC CAPITAL TO SECTOR OPPORTUNITIES',
  sessions: [
    {
      time: '08:00 – 09:00',
      title: 'SECTOR INVESTMENT BREAKFASTS',
      description:
        'AGRICULTURE • CRITICAL MINERALS • HEALTH • INFRASTRUCTURE • TOURISM',
      dealTrack:
        'Sector → Priority → Projects → Capital → Partners',
    },
    {
      time: '09:00 – 10:30',
      title: 'THE INTRA-AFRICAN TRADE REVOLUTION',
      description:
        'FROM BORDERS TO DIGITAL CORRIDORS.',
      focus: [
        'Pan-African Payments',
        'Border Modernisation',
        'Digital Trade',
        'AfCFTA',
        'Market Access',
      ],
      dealTrack:
        'ACTION TRACK — AFRICA TRADE GATEWAY',
    },
    {
      time: '10:30 – 12:00',
      title: 'SECTOR DEAL TRACKS',
      description:
        'FROM STRATEGIC CAPITAL TO EXECUTABLE SECTOR OPPORTUNITIES.',
      focus: [
        'AGRICULTURE & AGRI-TECH — FEEDING THE NEXT GENERATION OF AFRICAN CONSUMERS',
        'CRITICAL MINERALS — FROM EXTRACTION TO INDUSTRIAL VALUE',
        'HEALTH SOVEREIGNTY — FROM VACCINES TO PHARMA 4.0',
        'INFRASTRUCTURE — BUILDING THE CORRIDORS OF THE NEXT ECONOMIC CYCLE',
        'TOURISM — BUILDING AFRICA’S NEXT DESTINATION ECONOMIES',
      ],
      dealTrack:
        'DEAL TRACKS — Agricultural Investment • Mineral Processing & Industrial Partnerships • Health Manufacturing • PPP & Project Finance • Tourism Investment',
    },
    {
      time: '12:00 – 14:00',
      title: 'DEAL-MAKING LUNCHES',
      description:
        'COUNTRY. CAPITAL. PROJECT. TABLE.',
      dealTrack:
        'Government Priority → Project → Capital Requirement → Investor → Next Step',
    },
    {
      time: '14:00 – 15:30',
      title: 'COMMERCE WARS',
      description:
        'AFRICA BETWEEN COMPETING TRADE BLOCS.',
      focus: [
        'US Trade Policy',
        'China',
        'BRI',
        'AfCFTA',
        'Market Access',
        'Trade Diversification',
        'Strategic Autonomy',
      ],
    },
    {
      time: '15:30 – 17:00',
      title: 'THE FUTURE ECONOMY',
      description:
        'FIVE INVESTMENT FRONTIERS',
      focus: [
        'FUTURE FOOD',
        'SPACE & STRATEGIC RESOURCES',
        'AI & HEALTH',
        'NEXT-GENERATION INFRASTRUCTURE',
        'FUTURE TOURISM',
      ],
    },
    {
      time: '17:00 – 18:30',
      title: 'CLOSING DEAL RALLY',
      description:
        'WHAT MOVED FROM CONVERSATION TO COMMITMENT?',
      focus: [
        'INVESTMENTS',
        'MoUs',
        'JOINT VENTURES',
        'FINANCING',
        'TRADE PARTNERSHIPS',
        'STRATEGIC ALLIANCES',
      ],
      dealTrack:
        'AFRICA INVESTMENT SCOREBOARD — Display only verified AEF outcomes.',
    },
  ],
};

/* ===================================================
   SECTOR DEAL TRACKS
   =================================================== */

const sectorDealTracks = [
  {
    title: 'AGRICULTURE & AGRI-TECH',
    subtitle:
      'FEEDING THE NEXT GENERATION OF AFRICAN CONSUMERS',
    focus: [
      'Food Security',
      'Agri-Processing',
      'Value Chains',
      'Gulf–Africa Investment',
    ],
    deal: 'AGRICULTURAL INVESTMENT',
  },
  {
    title: 'CRITICAL MINERALS',
    subtitle: 'FROM EXTRACTION TO INDUSTRIAL VALUE',
    focus: [
      'Lithium',
      'Rare Earths',
      'Processing',
      'Batteries',
      'Local Value Addition',
      'Joint Ventures',
    ],
    deal: 'MINERAL PROCESSING & INDUSTRIAL PARTNERSHIPS',
  },
  {
    title: 'HEALTH SOVEREIGNTY',
    subtitle: 'FROM VACCINES TO PHARMA 4.0',
    focus: [
      'Manufacturing',
      'mRNA Technology',
      'Medical Logistics',
      'Pharmaceutical Capacity',
    ],
    deal: 'HEALTH MANUFACTURING',
  },
  {
    title: 'INFRASTRUCTURE',
    subtitle:
      'BUILDING THE CORRIDORS OF THE NEXT ECONOMIC CYCLE',
    focus: [
      'Ports',
      'Rail',
      'Power',
      'Logistics',
      'Digital Infrastructure',
    ],
    deal: 'PPP & PROJECT FINANCE',
  },
  {
    title: 'TOURISM',
    subtitle:
      'BUILDING AFRICA’S NEXT DESTINATION ECONOMIES',
    focus: [
      'Hospitality',
      'Destination Infrastructure',
      'Investment',
      'Market Access',
    ],
    deal: 'TOURISM INVESTMENT',
  },
];

/* ===================================================
   REGISTRATION
   =================================================== */

const registrationCategories = [
  'CEO / Business Leader',
  'Investor / Fund',
  'Government / Public Sector',
  'Financial / Development Institution',
  'Project Developer / Entrepreneur',
  'Expert / Thought Leader',
  'Diplomat / International Institution',
  'Corporate Executive',
  'Media',
  'Other',
];

/* ===================================================
   CONFIRMED SPEAKERS
   =================================================== */

const intervenantsApercu = listeIntervenants
  .filter(
    (intervenant) =>
      String(intervenant.statut).toLowerCase() === 'confirmé'
  )
  .slice(0, 4);

const intervenantsInvites = listeIntervenants
  .filter(
    (intervenant) =>
      String(intervenant.statut).toLowerCase() === 'invité'
  )
  .slice(0, 8);

/* ===================================================
   CONVERSION JOURNEYS
   =================================================== */

const conversionConfigs: Record<NonNullable<ConversionType>, ConversionConfigItem> = {
  country: {
    title: 'APPLY FOR A COUNTRY-SPECIFIC INVESTMENT ROUNDTABLE',
    fields: [
      'Country',
      'Institution',
      'Senior Representative',
      'Priority Sectors',
      'Investment Priorities',
      'Projects Requiring Capital',
      'Type of Partners Sought',
      'Estimated Capital Requirements',
      'Preferred Format of Participation',
      'Contact Details',
    ],
  },

  bloc: {
    title: 'REQUEST VIP / INSTITUTIONAL PARTICIPATION',
    fields: [
      'Country / Bloc',
      'Institution',
      'Senior Representative',
      'Strategic Objectives',
      'Priority Sectors',
      'Investment / Trade Interests',
      'African Markets of Interest',
      'Preferred Engagement Format',
      'Delegation Size',
      'Contact Details',
    ],
  },

  investor: {
    title: 'JOIN THE AEF INVESTOR NETWORK',
    fields: [
      'Institution',
      'Investment Mandate',
      'Geography',
      'Sector',
      'Ticket Size',
      'Investment Structure',
      'Capital Available',
      'Preferred Stage',
      'Partnership Interests',
      'Representative',
      'Contact Details',
    ],
    hasFile: true,
    fileLabel: 'Supporting Document / Investor Profile (PDF/Doc)',
  },

  project: {
    title: 'SUBMIT AN INVESTMENT OPPORTUNITY',
    fields: [
      'Project Name',
      'Country',
      'Sector',
      'Project Sponsor',
      'Stage of Development',
      'Capital Required',
      'Debt / Equity / PPP / JV Requirement',
      'Existing Partners',
      'Investment Documents Available',
      'Expected Timeline',
      'Contact Person',
      'Contact Details',
    ],
    hasFile: true,
    fileLabel: 'Project Investment Document (PDF/Doc)',
  },
};

/* ===================================================
   TRANSLATION HELPER
   =================================================== */

const agendaSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

/* ===================================================
   PAGE
   =================================================== */

function AEFMatchProfile({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const ta = (value: string) =>
    t(`agenda.texts.${agendaSlug(value)}`, { defaultValue: value });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState('');
  const [data, setData] = useState<Record<string, any>>({
    capital: [],
    projectsSectors: [],
    capabilities: [],
    markets: [],
    lookingFor: [],
    priorityObjective: '',
    investmentSectors: [],
    geographiesOfInterest: [],
    typicalInvestmentTicket: '',
    investmentStructure: [],
    investmentStage: [],
    preferredCounterparties: [],
    projectName: '',
    projectCountry: '',
    projectSector: '',
    projectStage: '',
    totalProjectValue: '',
    capitalRequired: '',
    capitalStructureSought: [],
    currentFundingPartners: '',
    investorPartnerSought: '',
    expectedTimeline: '',
    govPrioritySectors: [],
    govInvestmentPriorities: '',
    govProjectsRequiringCapital: '',
    govEstimatedCapitalRequirements: '',
    govPartnersSought: [],
    strategicCapabilities: [],
    strategicAfricanMarkets: [],
    strategicSectors: [],
    strategicPartnerships: [],
    whoToMeet: [],
    specificConnections: '',
    availability10: [],
    availability11: [],
    meetingFormat: [],
    dealPriority: '',
    specificCounterparty: '',
    successfulMeeting: '',
    institutionCompany: '',
    countryHeadquarters: '',
    website: '',
    yourName: '',
    titlePosition: '',
    email: '',
    phoneWhatsApp: '',
    consentAccuracy: false,
    consentUse: false,
    consentNoGuarantee: false,
    consentContact: false,
  });

  const updateField = (field: string, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleValue = (field: string, value: string) => {
    setData((prev) => {
      const current = Array.isArray(prev[field]) ? prev[field] : [];
      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter((item: string) => item !== value)
          : [...current, value],
      };
    });
  };

  const optionGroup = (field: string, options: string[]) => (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => (
        <label
          key={option}
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 hover:border-blue-900"
        >
          <input
            type="checkbox"
            checked={(data[field] || []).includes(option)}
            onChange={() => toggleValue(field, option)}
            className="rounded border-gray-300 text-blue-900 focus:ring-blue-900"
          />
          <span className="text-sm text-gray-800">{ta(option)}</span>
        </label>
      ))}
    </div>
  );

  const radioGroup = (field: string, options: string[], name: string) => (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => (
        <label
          key={option}
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 hover:border-blue-900"
        >
          <input
            type="radio"
            name={name}
            value={option}
            checked={data[field] === option}
            onChange={(e) => updateField(field, e.target.value)}
            className="border-gray-300 text-blue-900 focus:ring-blue-900"
          />
          <span className="text-sm text-gray-800">{ta(option)}</span>
        </label>
      ))}
    </div>
  );

  const textField = (field: string, label: string, required = false, placeholder = '') => (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900">
        {ta(label)}{required ? '*' : ''}
      </label>
      <input
        required={required}
        type="text"
        value={data[field] || ''}
        onChange={(e) => updateField(field, e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
      />
    </div>
  );

  const textareaField = (field: string, label: string, required = false, rows = 4) => (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-900">
        {ta(label)}{required ? '*' : ''}
      </label>
      <textarea
        required={required}
        rows={rows}
        value={data[field] || ''}
        onChange={(e) => updateField(field, e.target.value)}
        className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
      />
    </div>
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('aef_match_profiles').insert([{
        role,
        capital: data.capital,
        projects_sectors: data.projectsSectors,
        capabilities: data.capabilities,
        markets: data.markets,
        looking_for: data.lookingFor,
        priority_objective: data.priorityObjective,
        investment_sectors: data.investmentSectors,
        geographies_of_interest: data.geographiesOfInterest,
        typical_investment_ticket: data.typicalInvestmentTicket,
        investment_structure: data.investmentStructure,
        investment_stage: data.investmentStage,
        preferred_counterparties: data.preferredCounterparties,
        project_name: data.projectName,
        project_country: data.projectCountry,
        project_sector: data.projectSector,
        project_stage: data.projectStage,
        total_project_value: data.totalProjectValue,
        capital_required: data.capitalRequired,
        capital_structure_sought: data.capitalStructureSought,
        current_funding_partners: data.currentFundingPartners,
        investor_partner_sought: data.investorPartnerSought,
        expected_timeline: data.expectedTimeline,
        gov_priority_sectors: data.govPrioritySectors,
        gov_investment_priorities: data.govInvestmentPriorities,
        gov_projects_requiring_capital: data.govProjectsRequiringCapital,
        gov_estimated_capital_requirements: data.govEstimatedCapitalRequirements,
        gov_partners_sought: data.govPartnersSought,
        strategic_capabilities: data.strategicCapabilities,
        strategic_african_markets: data.strategicAfricanMarkets,
        strategic_sectors: data.strategicSectors,
        strategic_partnerships: data.strategicPartnerships,
        who_to_meet: data.whoToMeet,
        specific_connections: data.specificConnections,
        availability_10: data.availability10,
        availability_11: data.availability11,
        meeting_format: data.meetingFormat,
        deal_priority: data.dealPriority,
        specific_counterparty: data.specificCounterparty,
        successful_meeting: data.successfulMeeting,
        institution_company: data.institutionCompany,
        country_headquarters: data.countryHeadquarters,
        website: data.website,
        your_name: data.yourName,
        title_position: data.titlePosition,
        email: data.email,
        phone_whatsapp: data.phoneWhatsApp,
        consent_accuracy: data.consentAccuracy,
        consent_use: data.consentUse,
        consent_no_guarantee: data.consentNoGuarantee,
        consent_contact: data.consentContact,
      }]);

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || ta('Unable to submit your AEF Match Profile. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 p-4 overflow-y-auto">
      <div className="relative max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label={ta('Close AEF Match Profile')}
          className="absolute right-5 top-5 z-10 text-3xl font-light text-gray-400 hover:text-gray-800"
        >
          ×
        </button>

        {submitted ? (
          <div className="px-6 py-16 text-center sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-900 text-2xl font-bold text-white">
              ✓
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">{ta('AEF MATCH PROFILE RECEIVED')}</h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
              {ta('Thank you. Your AEF Match Profile has been submitted for qualification and matchmaking review.')}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-lg bg-blue-900 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              {ta('CLOSE')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-10">
            <div className="border-b border-gray-200 pb-6 pr-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-900">{ta('AEF MATCH PROFILE')}</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">{ta('BUILD YOUR AEF MATCH PROFILE')}</h2>
            </div>

            <section className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
              <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.12em] text-blue-900">{ta('STEP 01 — YOUR ROLE')}</h3>
              <p className="mb-4 text-sm font-semibold text-gray-900">{ta('What brings you to AEF?*')}</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  'Government / Public Institution', 'Investor / Capital Provider', 'Project Owner',
                  'CEO / Corporate Executive', 'Strategic Partner', 'DFI / Development Institution',
                  'Family Office', 'Financial Institution', 'Technology Company', 'Entrepreneur', 'Other'
                ].map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                    <input
                      required
                      type="radio"
                      name="aefMatchRole"
                      value={option}
                      checked={role === option}
                      onChange={(e) => setRole(e.target.value)}
                      className="border-gray-300 text-blue-900 focus:ring-blue-900"
                    />
                    <span className="text-sm text-gray-800">{ta(option)}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.12em] text-blue-900">{ta('STEP 02 — WHAT YOU BRING')}</h3>
              <div className="space-y-7">
                <div>
                  <p className="mb-3 text-sm font-semibold text-gray-900">{ta('CAPITAL')}</p>
                  {optionGroup('capital', ['Equity', 'Debt', 'Project Finance', 'Venture Capital', 'Private Equity', 'Blended Finance'])}
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold text-gray-900">{ta('PROJECTS / SECTORS')}</p>
                  {optionGroup('projectsSectors', ['Infrastructure', 'Energy', 'Mining / Critical Minerals', 'Agriculture & Agri-Tech', 'Health', 'Technology & Digital', 'Manufacturing', 'Logistics', 'Tourism', 'Water', 'Other'])}
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold text-gray-900">{ta('CAPABILITIES')}</p>
                  {optionGroup('capabilities', ['Technology', 'EPC', 'Market Access', 'Distribution', 'Industrial Capacity', 'Advisory', 'Financial Services', 'Infrastructure Development', 'Other'])}
                </div>
                <div>
                  <p className="mb-3 text-sm font-semibold text-gray-900">{ta('MARKETS')}</p>
                  {optionGroup('markets', ['Africa', 'Europe', 'Gulf', 'Asia', 'Americas', 'Other'])}
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.12em] text-blue-900">{ta('STEP 03 — WHAT YOU ARE LOOKING FOR')}</h3>
              <p className="mb-3 text-sm font-semibold text-gray-900">{ta('What would you like to find at AEF?')}</p>
              {optionGroup('lookingFor', ['Investment opportunities', 'African projects', 'Government partnerships', 'Co-investors', 'Strategic partners', 'Joint ventures', 'Market entry opportunities', 'Technology partnerships', 'Acquisition opportunities', 'Trade opportunities', 'Financing opportunities', 'Distribution partners', 'Other'])}
              <div className="mt-6">{textareaField('priorityObjective', 'Describe your priority objective in one sentence.', true, 3)}</div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.12em] text-blue-900">{ta('STEP 04 — YOUR INVESTMENT / BUSINESS PARAMETERS')}</h3>

              {role === 'Investor / Capital Provider' && (
                <div className="space-y-6">
                  <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Investment Sectors')}</p>{optionGroup('investmentSectors', ['Infrastructure', 'Energy', 'Mining / Critical Minerals', 'Agriculture & Agri-Tech', 'Health', 'Technology & Digital', 'Manufacturing', 'Logistics', 'Tourism', 'Water', 'Other'])}</div>
                  <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Geographies of Interest')}</p>{optionGroup('geographiesOfInterest', ['Africa', 'Europe', 'Gulf', 'Asia', 'Americas', 'Other'])}</div>
                  <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Typical Investment Ticket')}</p>{radioGroup('typicalInvestmentTicket', ['Under €5M', '€5–25M', '€25–100M', '€100–500M', '€500M–€1B', '€1B+', 'Other'], 'typicalInvestmentTicket')}</div>
                  <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Investment Structure')}</p>{optionGroup('investmentStructure', ['Equity', 'Debt', 'Project Finance', 'PPP', 'Joint Venture', 'Growth Capital', 'Venture Capital', 'Other'])}</div>
                  <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Investment Stage')}</p>{optionGroup('investmentStage', ['Development', 'Construction', 'Growth', 'Expansion', 'Acquisition', 'Refinancing'])}</div>
                  <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Preferred Counterparties')}</p>{optionGroup('preferredCounterparties', ['Governments', 'Project Owners', 'CEOs / Corporates', 'Strategic Partners', 'DFIs', 'Banks', 'Family Offices', 'Other'])}</div>
                </div>
              )}

              {role === 'Project Owner' && (
                <div className="grid gap-5 sm:grid-cols-2">
                  {textField('projectName', 'Project Name', true)}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">{ta('Country*')}</label>
                    <select required value={data.projectCountry} onChange={(e) => updateField('projectCountry', e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-900">
                      <option value="">{ta('Select country')}</option>
                      {['Democratic Republic of Congo', 'Nigeria', 'Kenya', 'South Africa', 'Egypt', 'Ghana', 'Tanzania', 'Zambia', 'Morocco', 'Côte d’Ivoire', 'Senegal', 'Angola', 'Rwanda', 'Uganda', 'Ethiopia', 'Cameroon', 'Other'].map((country) => <option key={country} value={country}>{country}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">{ta('Sector*')}</label>
                    <select required value={data.projectSector} onChange={(e) => updateField('projectSector', e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-900">
                      <option value="">{ta('Select sector')}</option>
                      {['Infrastructure', 'Energy', 'Mining / Critical Minerals', 'Agriculture & Agri-Tech', 'Health', 'Technology & Digital', 'Manufacturing', 'Logistics', 'Tourism', 'Water', 'Other'].map((sector) => <option key={sector} value={sector}>{sector}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2"><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Project Stage*')}</p>{radioGroup('projectStage', ['Concept', 'Feasibility', 'Pre-FEED / FEED', 'Permitting', 'Construction-ready', 'Operational', 'Expansion'], 'projectStage')}</div>
                  {textField('totalProjectValue', 'Total Project Value', true)}
                  {textField('capitalRequired', 'Capital Required', true)}
                  <div className="sm:col-span-2"><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Capital Structure Sought')}</p>{optionGroup('capitalStructureSought', ['Equity', 'Debt', 'Project Finance', 'PPP', 'Joint Venture', 'Strategic Investor', 'Blended Finance', 'Other'])}</div>
                  {textField('currentFundingPartners', 'Current Funding / Partners')}
                  {textField('investorPartnerSought', 'Type of Investor / Partner Sought')}
                  {textField('expectedTimeline', 'Expected Investment / Financing Timeline')}
                </div>
              )}

              {role === 'Government / Public Institution' && (
                <div className="space-y-6">
                  <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Priority Sectors')}</p>{optionGroup('govPrioritySectors', ['Infrastructure', 'Energy', 'Mining / Critical Minerals', 'Agriculture & Agri-Tech', 'Health', 'Technology & Digital', 'Manufacturing', 'Logistics', 'Tourism', 'Water', 'Other'])}</div>
                  {textField('govInvestmentPriorities', 'Investment Priorities')}
                  {textField('govProjectsRequiringCapital', 'Projects Requiring Capital')}
                  {textField('govEstimatedCapitalRequirements', 'Estimated Capital Requirements')}
                  <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Type of Partners Sought')}</p>{optionGroup('govPartnersSought', ['Investors', 'Strategic Companies', 'DFIs', 'Technology Partners', 'Infrastructure Developers', 'Industrial Partners', 'Trade Partners', 'Other'])}</div>
                </div>
              )}

              {role === 'Strategic Partner' && (
                <div className="space-y-6">
                  <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Strategic Capabilities You Bring')}</p>{optionGroup('strategicCapabilities', ['Technology', 'Engineering / EPC', 'Market Access', 'Industrial Capacity', 'Logistics', 'Financial Services', 'Advisory', 'Manufacturing', 'Distribution', 'Other'])}</div>
                  <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('African Markets of Interest')}</p>{optionGroup('strategicAfricanMarkets', ['Central Africa', 'West Africa', 'East Africa', 'North Africa', 'Southern Africa', 'Africa-wide', 'Other'])}</div>
                  <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Sectors of Interest')}</p>{optionGroup('strategicSectors', ['Infrastructure', 'Energy', 'Mining / Critical Minerals', 'Agriculture & Agri-Tech', 'Health', 'Technology & Digital', 'Manufacturing', 'Logistics', 'Tourism', 'Water', 'Other'])}</div>
                  <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Type of Partnerships Sought')}</p>{optionGroup('strategicPartnerships', ['Joint Ventures', 'Technology Partnerships', 'Market Entry', 'Industrial Partnerships', 'Investment', 'PPP', 'Distribution', 'Other'])}</div>
                </div>
              )}

              {!['Investor / Capital Provider', 'Project Owner', 'Government / Public Institution', 'Strategic Partner'].includes(role) && (
                <p className="text-sm leading-6 text-gray-600">{ta('Select your role in Step 01 to display the relevant investment / business parameters.')}</p>
              )}
            </section>

            <section className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.12em] text-blue-900">{ta('STEP 05 — WHO DO YOU WANT TO MEET?')}</h3>
              <p className="mb-3 text-sm font-semibold text-gray-900">{ta('Who would you like to meet at AEF?')}</p>
              {optionGroup('whoToMeet', ['Heads of State / Government Leaders', 'Ministers', 'Sovereign Wealth Funds', 'Institutional Investors', 'Family Offices', 'Private Equity', 'Venture Capital', 'DFIs', 'Banks', 'Project Developers', 'CEOs', 'Technology Companies', 'Strategic Corporates', 'Other Governments', 'Other'])}
              <div className="mt-6">{textField('specificConnections', 'Specific institutions or individuals you would like to connect with')}</div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.12em] text-blue-900">{ta('STEP 06 — YOUR AVAILABILITY')}</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('10 November')}</p>{optionGroup('availability10', ['Morning', 'Lunch', 'Afternoon', 'Evening'])}</div>
                <div><p className="mb-3 text-sm font-semibold text-gray-900">{ta('11 November')}</p>{optionGroup('availability11', ['Morning', 'Lunch', 'Afternoon', 'Evening'])}</div>
              </div>
              <div className="mt-6"><p className="mb-3 text-sm font-semibold text-gray-900">{ta('Preferred meeting format')}</p>{optionGroup('meetingFormat', ['1:1 Meeting', 'Small Roundtable', 'Deal Room', 'VIP Luncheon', 'Leaders Lounge', 'Country Investment Roundtable'])}</div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-blue-900">{ta('STEP 07 — YOUR PRIORITY')}</h3>
              {textareaField('dealPriority', 'What would you like to advance through AEF?', true, 5)}
              {textField('specificCounterparty', 'Is there a specific counterparty you would like AEF to help connect you with?')}
              {textareaField('successfulMeeting', 'What would constitute a successful meeting for you?', true, 5)}
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.12em] text-blue-900">{ta('STEP 08 — CONTACT & CONSENT')}</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                {textField('institutionCompany', 'Institution / Company Name', true)}
                {textField('countryHeadquarters', 'Country / Headquarters', true)}
                {textField('website', 'Website')}
                {textField('yourName', 'Your Name', true)}
                {textField('titlePosition', 'Title / Position', true)}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">{ta('Email*')}</label>
                  <input required type="email" value={data.email || ''} onChange={(e) => updateField('email', e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900" />
                </div>
                {textField('phoneWhatsApp', 'Phone / WhatsApp', true)}
              </div>

              <div className="mt-8 space-y-3 border-t border-gray-200 pt-6">
                <p className="text-sm font-semibold text-gray-900">{ta('Consent')}</p>
                {[
                  ['consentAccuracy', 'I confirm that the information submitted is accurate and that I am authorised to represent the institution identified above.'],
                  ['consentUse', 'I understand that the information submitted may be used by AEF for qualification, matchmaking and relevant introductions.'],
                  ['consentNoGuarantee', 'I understand that submitting this profile does not guarantee a meeting, Deal Room access, investment, financing or transaction.'],
                  ['consentContact', 'I agree that AEF may contact me regarding relevant opportunities and participation.'],
                ].map(([field, label]) => (
                  <label key={field} className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3">
                    <input
                      required
                      type="checkbox"
                      checked={Boolean(data[field])}
                      onChange={(e) => updateField(field, e.target.checked)}
                      className="mt-1 rounded border-gray-300 text-blue-900 focus:ring-blue-900"
                    />
                    <span className="text-sm leading-6 text-gray-700">{ta(label)}</span>
                  </label>
                ))}
              </div>
            </section>

            <div className="flex justify-end border-t border-gray-200 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-blue-900 px-7 py-3.5 text-sm font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? ta('SUBMITTING...') : ta('CREATE MY AEF MATCH PROFILE')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function AgendaPage() {
  const { t } = useTranslation();
  const ta = (value: string) => t(`agenda.texts.${agendaSlug(value)}`, { defaultValue: value });
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [showSignInModal, setShowSignInModal] =
    useState(false);

  const [showCreateAccountModal, setShowCreateAccountModal] =
    useState(false);

  const [showChairmanModal, setShowChairmanModal] =
    useState(false);

  const [showProgrammeModal, setShowProgrammeModal] =
    useState(false);

  const [showMatchProfileModal, setShowMatchProfileModal] =
    useState(false);

  const [showRegistrationModal, setShowRegistrationModal] =
    useState(false);

  const [expandedSessions, setExpandedSessions] =
    useState<Set<string>>(new Set());

  const [conversionType, setConversionType] =
    useState<ConversionType>(null);

  const [conversionMessage, setConversionMessage] =
    useState('');

  const [conversionData, setConversionData] =
    useState<Record<string, string>>({});

  const [conversionFile, setConversionFile] =
    useState<File | null>(null);

  const [isConversionSubmitting, setIsConversionSubmitting] =
    useState(false);

  // Deal Room Form State (Modal / Section View)
  const [showDealRoomModal, setShowDealRoomModal] = useState(false);
  const [dealRoomRole, setDealRoomRole] = useState<string>('');
  const [dealRoomData, setDealRoomData] = useState<Record<string, any>>({
    // Step 2 General
    institutionName: '',
    countryHq: '',
    website: '',
    institutionType: '',
    yourName: '',
    titlePosition: '',
    email: '',
    phoneWhatsApp: '',
    
    // Investor Fields
    investmentSectors: [] as string[],
    geographiesOfInterest: [] as string[],
    investmentStructure: [] as string[],
    typicalInvestmentTicket: '',
    investmentStage: [] as string[],
    investorLookingFor: '',

    // Project Owner Fields
    projectName: '',
    projectCountry: '',
    projectSector: '',
    projectStage: '',
    totalProjectValue: '',
    capitalRequired: '',
    capitalStructureSought: [] as string[],
    currentFundingPartners: '',
    investorPartnerSought: '',
    expectedTimeline: '',
    projectSummary: '',
    investmentDocsAvailable: [] as string[],

    // Government Fields
    govCountry: '',
    govInstitutionMinistry: '',
    govSeniorRep: '',
    govPrioritySectors: [] as string[],
    govInvestmentPriorities: '',
    govProjectsRequiringCapital: '',
    govEstimatedCapitalReq: '',
    govTypePartnersSought: [] as string[],
    govPreferredFormat: [] as string[],

    // Strategic Partner Fields
    stratCapabilities: [] as string[],
    stratAfricanMarkets: '',
    stratSectorsOfInterest: '',
    stratPartnershipsSought: [] as string[],
    stratDescribeOpportunity: '',

    // Step 3 Deal Priority
    dealPriority: '',
    specificCounterparty: '',
    successfulMeetingDef: '',

    // Step 4 Consents
    consentAccuracy: false,
    consentReview: false,
    consentNoGuarantee: false,
    consentContact: false,
  });
  const [dealRoomFile, setDealRoomFile] = useState<File | null>(null);
  const [dealRoomSubmitted, setDealRoomSubmitted] = useState(false);
  const [isDealRoomSubmitting, setIsDealRoomSubmitting] = useState(false);

  const handleDealRoomCheckboxToggle = (field: string, value: string) => {
    setDealRoomData((prev) => {
      const list = prev[field] || [];
      if (list.includes(value)) {
        return { ...prev, [field]: list.filter((item: string) => item !== value) };
      } else {
        return { ...prev, [field]: [...list, value] };
      }
    });
  };

  const handleDealRoomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDealRoomSubmitting(true);
    
    try {
      let documentUrl = null;
      if (dealRoomFile && dealRoomRole === 'Project Owner / Sponsor') {
        const fileExt = dealRoomFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `deal-room-projects/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('aef-submissions')
          .upload(filePath, dealRoomFile);

        if (!uploadError) {
          documentUrl = filePath;
        }
      }

      const { error: dbError } = await supabase.from('aef_deal_room_applications').insert([{
        role: dealRoomRole,
        institution_name: dealRoomData.institutionName,
        country_hq: dealRoomData.countryHq,
        website: dealRoomData.website,
        institution_type: dealRoomData.institutionType,
        your_name: dealRoomData.yourName,
        title_position: dealRoomData.titlePosition,
        email: dealRoomData.email,
        phone_whatsapp: dealRoomData.phoneWhatsApp,
        role_data: dealRoomData,
        document_url: documentUrl,
      }]);

      if (dbError) {
        throw new Error(`Database error: ${dbError.message}`);
      }

      setDealRoomSubmitted(true);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || 'Unable to submit the Deal Room application. Please try again.');
    } finally {
      setIsDealRoomSubmitting(false);
    }
  };

  const [registrationData, setRegistrationData] = useState({
    full_name: '',
    email: '',
    organization: '',
    category: '',
  });

  const [registrationMessage, setRegistrationMessage] =
    useState('');

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const toggleSession = (sessionKey: string) => {
    setExpandedSessions((previous) => {
      const next = new Set(previous);

      if (next.has(sessionKey)) {
        next.delete(sessionKey);
      } else {
        next.add(sessionKey);
      }

      return next;
    });
  };

  const openConversion = (type: ConversionType) => {
    setConversionType(type);
    setConversionMessage('');
    setConversionData({});
    setConversionFile(null);
  };

  const handleConversionSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsConversionSubmitting(true);
    setConversionMessage('');

    try {
      let documentUrl = null;

      if (conversionFile && (conversionType === 'project' || conversionType === 'investor')) {
        const folder = conversionType === 'project' ? 'projects' : 'investors';
        const fileExt = conversionFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('aef-submissions')
          .upload(filePath, conversionFile);

        if (uploadError) {
          throw new Error(`Error uploading file: ${uploadError.message}`);
        }

        documentUrl = filePath;
      }

      let tableName = '';
      let insertPayload: Record<string, any> = {};

      if (conversionType === 'project') {
        tableName = 'aef_project_submissions';
        insertPayload = {
          project_name: conversionData['Project Name'],
          country: conversionData['Country'],
          sector: conversionData['Sector'],
          project_sponsor: conversionData['Project Sponsor'],
          stage_of_development: conversionData['Stage of Development'],
          capital_required: conversionData['Capital Required'],
          debt_equity_ppp_jv_requirement: conversionData['Debt / Equity / PPP / JV Requirement'],
          existing_partners: conversionData['Existing Partners'],
          investment_documents_available: conversionData['Investment Documents Available'],
          expected_timeline: conversionData['Expected Timeline'],
          contact_person: conversionData['Contact Person'],
          contact_details: conversionData['Contact Details'],
          project_document_url: documentUrl,
        };
      } else if (conversionType === 'investor') {
        tableName = 'aef_investor_applications';
        insertPayload = {
          institution: conversionData['Institution'],
          investment_mandate: conversionData['Investment Mandate'],
          geography: conversionData['Geography'],
          sector: conversionData['Sector'],
          ticket_size: conversionData['Ticket Size'],
          investment_structure: conversionData['Investment Structure'],
          capital_available: conversionData['Capital Available'],
          preferred_stage: conversionData['Preferred Stage'],
          partnership_interests: conversionData['Partnership Interests'],
          representative: conversionData['Representative'],
          contact_details: conversionData['Contact Details'],
          supporting_document_url: documentUrl,
        };
      } else if (conversionType === 'country') {
        tableName = 'aef_country_roundtables';
        insertPayload = {
          country: conversionData['Country'],
          institution: conversionData['Institution'],
          senior_representative: conversionData['Senior Representative'],
          priority_sectors: conversionData['Priority Sectors'],
          investment_priorities: conversionData['Investment Priorities'],
          projects_requiring_capital: conversionData['Projects Requiring Capital'],
          type_of_partners_sought: conversionData['Type of Partners Sought'],
          estimated_capital_requirements: conversionData['Estimated Capital Requirements'],
          preferred_format_of_participation: conversionData['Preferred Format of Participation'],
          contact_details: conversionData['Contact Details'],
        };
      } else if (conversionType === 'bloc') {
        tableName = 'aef_institutional_participation';
        insertPayload = {
          country_bloc: conversionData['Country / Bloc'],
          institution: conversionData['Institution'],
          senior_representative: conversionData['Senior Representative'],
          strategic_objectives: conversionData['Strategic Objectives'],
          priority_sectors: conversionData['Priority Sectors'],
          investment_trade_interests: conversionData['Investment / Trade Interests'],
          african_markets_of_interest: conversionData['African Markets of Interest'],
          preferred_engagement_format: conversionData['Preferred Engagement Format'],
          delegation_size: conversionData['Delegation Size'],
          contact_details: conversionData['Contact Details'],
        };
      }

      if (tableName) {
        const { error: dbError } = await supabase.from(tableName).insert([insertPayload]);
        if (dbError) {
          throw new Error(`Database error: ${dbError.message}`);
        }
      }

      setConversionMessage(
        ta('Thank you for your submission. Your information and documents have been successfully recorded. Our team will review your mandate and contact you regarding the appropriate engagement format.')
      );
      setConversionData({});
      setConversionFile(null);
    } catch (err: any) {
      console.error(err);
      setConversionMessage(
        err.message || ta('An unexpected error occurred during submission. Please try again.')
      );
    } finally {
      setIsConversionSubmitting(false);
    }
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setRegistrationMessage('');
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert([
          {
            event_id: event.id,
            full_name: registrationData.full_name,
            email: registrationData.email,
            organization: registrationData.organization,
            category: registrationData.category,
          },
        ]);

      if (error) {
        if (error.code === '23505') {
          setRegistrationMessage(
            ta('This email is already registered for this event.')
          );
        } else {
          setRegistrationMessage(
            ta('Unable to complete your registration. Please try again.')
          );
        }

        return;
      }

      setRegistrationMessage(
        ta('Registration submitted successfully. We look forward to welcoming you to AEF 2026.')
      );

      setRegistrationData({
        full_name: '',
        email: '',
        organization: '',
        category: '',
      });
    } catch {
      setRegistrationMessage(
        ta('An unexpected error occurred. Please try again.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDay = (day: Day) => (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
          {ta(day.title)}
        </p>

        {day.subtitle && (
          <h3 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
            {ta(day.subtitle)}
          </h3>
        )}
      </div>

      {day.sessions.map((session) => {
        const sessionKey =
          `${ta(day.title)}-${session.time}-${ta(session.title)}`;

        const isExpanded =
          expandedSessions.has(sessionKey);

        return (
          <div
            key={sessionKey}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300"
          >
            <div className="grid gap-5 p-5 md:grid-cols-[150px_1fr_auto] md:items-start">
              <div className="font-bold text-blue-900">
                {session.time}
              </div>

              <div>
                <h4 className="text-xl font-bold leading-tight text-gray-900">
                  {ta(session.title)}
                </h4>

                <p className="mt-2 text-sm font-semibold leading-6 text-gray-700">
                  {ta(session.description)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleSession(sessionKey)}
                aria-expanded={isExpanded}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
              >
                {isExpanded
                  ? ta('HIDE DETAILS')
                  : ta('VIEW DETAILS')}

                <span
                  className={`text-base transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                >
                  ↓
                </span>
              </button>
            </div>

            {isExpanded && (
              <div className="border-t border-gray-100 bg-gray-50 px-5 py-6 md:px-7">
                <div className="md:ml-[150px]">
                  {session.format && (
                    <div className="mb-5 rounded-xl border border-gray-200 bg-white p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-600">
                        {ta('Format')}
                      </p>

                      <p className="mt-2 text-sm leading-7 text-gray-600">
                        {ta(session.format)}
                      </p>
                    </div>
                  )}

                  {session.purpose && (
                    <div className="mb-5 rounded-xl border border-gray-200 bg-white p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-600">
                        {ta('Purpose')}
                      </p>

                      <p className="mt-2 text-sm leading-7 text-gray-600">
                        {ta(session.purpose)}
                      </p>
                    </div>
                  )}

                  {session.questions &&
                    session.questions.length > 0 && (
                      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-600">
                          {ta('Strategic Questions')}
                        </p>

                        <ul className="mt-4 space-y-3">
                          {session.questions.map(
                            (question) => (
                              <li
                                key={ta(question)}
                                className="flex gap-3 text-sm leading-6 text-gray-600"
                              >
                                <span className="font-bold text-teal-600">
                                  →
                                </span>

                                <span>
                                  {ta(question)}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  {session.focus &&
                    session.focus.length > 0 && (
                      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-600">
                          {ta('Focus')}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {session.focus.map((item) => (
                            <span
                              key={item}
                              className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700"
                            >
                              {ta(item)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {session.dealTrack && (
                    <div className="rounded-xl border border-teal-100 bg-teal-50 p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-600">
                        {ta('Deal Track')}
                      </p>

                      <p className="mt-2 text-sm font-semibold leading-7 text-teal-800">
                        {ta(session.dealTrack)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ===================================================
          HEADER
          =================================================== */}

      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center"
          >
            <img
              src="https://static.readdy.ai/image/849a2f489cee8d6814d30c5afad3a84a/55c329d4d58fb687f70c222c549f7ec1.png"
              alt={ta('Africa Economic Forum')}
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#about-aef"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              {ta('ABOUT AEF')}
            </a>

            <a
              href="#why-kinshasa"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              {ta('WHY KINSHASA')}
            </a>

            <a
              href="#programme"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              {ta('PROGRAMME')}
            </a>

            <a
              href="#speakers"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              {ta('SPEAKERS')}
            </a>

            <a
              href="#deal-ecosystem"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              {ta('DEAL ECOSYSTEM')}
            </a>

            <a
              href="#partners"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              {ta('PARTNERS')}
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSelector />

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  setShowRegistrationModal(true)
                }
                className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-800"
              >
                {ta('GET YOUR DELEGATE PASS')}
              </button>

              <Link
                to="/contact"
                className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-800"
              >
                {ta('BECOME AN AEF PARTNER')}
              </Link>

              <a
                href={agendaPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 transition-colors hover:bg-gray-100 border border-gray-200"
              >
                {ta('Download Agenda')}
              </a>
            </div>

            {user ? (
              <button
                onClick={signOut}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
              >
                {ta('Sign out')}
              </button>
            ) : (
              <button
                onClick={() => setShowSignInModal(true)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700"
              >
                {ta('Sign in')}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-teal-600"
              onClick={() => setShowMobileMenu((previous) => !previous)}
              aria-label={ta('Menu')}
              aria-expanded={showMobileMenu}
            >
              <span className="text-xl">{showMobileMenu ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="border-t border-gray-100 bg-white md:hidden">
            <nav className="flex flex-col px-4 py-3">
              {[
                ['ABOUT AEF', '#about-aef'],
                ['WHY KINSHASA', '#why-kinshasa'],
                ['PROGRAMME', '#programme'],
                ['SPEAKERS', '#speakers'],
                ['DEAL ECOSYSTEM', '#deal-ecosystem'],
                ['PARTNERS', '#partners'],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setShowMobileMenu(false)}
                  className="border-b border-gray-100 px-3 py-3 text-sm font-semibold text-gray-700 transition-colors hover:text-teal-600"
                >
                  {ta(label)}
                </a>
              ))}

              <button
                type="button"
                onClick={() => {
                  setShowRegistrationModal(true);
                  setShowMobileMenu(false);
                }}
                className="mt-4 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white"
              >
                {ta('GET YOUR DELEGATE PASS')}
              </button>

              <Link
                to="/contact"
                onClick={() => setShowMobileMenu(false)}
                className="mt-3 rounded-lg bg-blue-900 px-5 py-3 text-center text-sm font-semibold text-white"
              >
                {ta('BECOME AN AEF PARTNER')}
              </Link>

              <a
                href={agendaPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowMobileMenu(false)}
                className="mt-3 rounded-lg border border-gray-200 bg-white px-5 py-3 text-center text-sm font-semibold text-blue-900"
              >
                {ta('Download Agenda')}
              </a>

              <div className="mt-4 border-t border-gray-100 px-3 py-4">
                <LanguageSelector />
              </div>

              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    setShowMobileMenu(false);
                  }}
                  className="mt-3 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700"
                >
                  {ta('Sign out')}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setShowSignInModal(true);
                    setShowMobileMenu(false);
                  }}
                  className="mt-3 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700"
                >
                  {ta('Sign in')}
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* The Agenda content below remains driven by the existing AEF copy.
          The shared LanguageSelector changes the active i18n language globally. */}
      {/* ===================================================
          01 — HERO
          =================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('/images/tour-kinshasa.jpg')",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              {ta('10–11 November 2026')}
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              {ta('AFRICA’S NEXT INVESTMENT CORRIDORS ARE BEING BUILT IN KINSHASA.')}
            </h1>

            <p className="mt-6 text-xl leading-8 text-blue-100">
              {ta('AFRICA AND GLOBAL REALIGNMENT:')}
            </p>

            <p className="mt-2 text-xl font-semibold leading-8 text-white">
              {ta('INVESTMENTS, ALLIANCES &amp; STRATEGIC OPPORTUNITIES')}
            </p>

            <p className="mt-5 text-sm leading-6 text-blue-200">
              10–11 November 2026 | Fleuve Congo Hotel | Kinshasa,
              Democratic Republic of Congo
            </p>

            <p className="mt-5 max-w-3xl text-base leading-7 text-blue-100">
              «Two days where governments, global capital, strategic
              industries and project owners come together to build the
              next generation of investment corridors into and across
              Africa.»
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() =>
                  setShowRegistrationModal(true)
                }
                className="rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-700"
              >
                {ta('GET YOUR DELEGATE PASS')}
              </button>

              <Link
                to="/contact"
                className="rounded-lg border border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                {ta('BECOME AN AEF PARTNER')}
              </Link>

              <a
                href={agendaPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                {ta('Download Agenda')}
              </a>
            </div>

            <p className="mt-5 text-sm font-medium text-blue-100">
              {ta('For Governments | Investors | Project Owners | Strategic Partners')}
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          02 — THE PREMISE
          =================================================== */}

      <section
        id="about-aef"
        className="scroll-mt-24 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600">
            {ta('02 — THE PREMISE')}
          </p>

          <h2 className="mt-4 max-w-5xl text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            {ta('THE WORLD IS REALIGNING. AFRICA IS NEGOTIATING ITS PLACE.')}
          </h2>

          <div className="mt-8 max-w-5xl space-y-6 text-lg leading-8 text-gray-600">
            <p>
              {ta('The architecture of global economic cooperation is changing.')}
            </p>

            <p>
              Capital is becoming geopolitical. Energy is becoming strategic.
              Critical minerals are becoming instruments of industrial policy.
              Trade corridors are being redesigned. Technology is becoming
              infrastructure.
            </p>

            <p>
              Governments are competing not simply for trade, but for
              investment, productive capacity, industrial partnerships and
              strategic alliances.
            </p>

            <p>
              AEF exists to help African countries engage this new
              environment from a position of greater strategic agency.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'CAPITAL',
              'ENERGY',
              'CRITICAL MINERALS',
              'TECHNOLOGY',
              'TRADE',
              'INDUSTRIAL CAPACITY',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
              >
                <p className="font-bold text-blue-900">
                  {ta(item)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-bold">
            {[
              'INVESTMENT',
              'PARTNERSHIPS',
              'MARKET ACCESS',
              'VALUE CREATION',
              'INDUSTRIALISATION',
            ].map((item, index) => (
              <React.Fragment key={item}>
                <span className="text-blue-900">
                  {ta(item)}
                </span>

                {index < 4 && (
                  <span className="text-teal-600">
                    →
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          03 — WHAT IS AEF?
          =================================================== */}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600">
            {ta('03 — WHAT IS AEF?')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {ta('A PLATFORM FOR CAPITAL, PARTNERSHIPS AND STRATEGIC DEAL-MAKING.')}
          </h2>

          <p className="mt-6 max-w-5xl text-lg leading-8 text-gray-600">
            AEF brings together governments with mandates, investors with
            capital, project owners with opportunities and strategic partners
            with technology, expertise and market access.
          </p>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-gray-600">
            The objective is not simply to discuss what Africa could become.
            It is to identify what can be built, financed, partnered and
            executed.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'GOVERNMENTS',
                text: 'Bring priorities and mandates.',
              },
              {
                title: 'INVESTORS',
                text: 'Bring capital and investment mandates.',
              },
              {
                title: 'PROJECT OWNERS',
                text: 'Bring bankable opportunities.',
              },
              {
                title: 'STRATEGIC PARTNERS',
                text: 'Bring technology, expertise and market access.',
              },
            ].map((item) => (
              <div
                key={ta(item.title)}
                className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-lg font-bold text-blue-900">
                  {ta(item.title)}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {ta(item.text)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          04 — AEF DEAL ARCHITECTURE
          =================================================== */}

      <section
        id="deal-ecosystem"
        className="scroll-mt-24 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600">
            {ta('04 — THE AEF DEAL ARCHITECTURE')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {ta('THIS IS NOT A CONFERENCE.')}
          </h2>

          <h3 className="mt-2 text-2xl font-bold text-blue-900 md:text-4xl">
            {ta('IT IS A DEAL-MAKING ARCHITECTURE.')}
          </h3>

          <div className="mt-10 space-y-4">
            {[
              [
                '01 — DISCOVER',
                'Diplomatic Breakfast',
                'Identify the relationships and investment priorities that need to happen during the Forum.',
              ],
              [
                '02 — CONNECT',
                'Coffee with Presidents',
                'Bring selected investors and strategic leaders into direct dialogue with Heads of State.',
              ],
              [
                '03 — CONVENE',
                'Strategic Sessions',
                'Define the geopolitical, financial and sector context.',
              ],
              [
                '04 — MATCH',
                'VIP Luncheon',
                'Move from strategic conversation to specific opportunities.',
              ],
              [
                '05 — NEGOTIATE',
                'Leaders Lounge / Deal Room',
                'Put decision-makers, capital and projects into structured conversations.',
              ],
              [
                '06 — COMMIT',
                'MoUs / Investment Commitments / Strategic Partnerships',
                'Create the conditions for concrete economic commitments.',
              ],
              [
                '07 — EXECUTE',
                'Post-Forum Deal Follow-Up',
                'Opportunity → Match → Negotiation → Due Diligence → Agreement → Financial Close → Implementation',
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="grid gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:grid-cols-[180px_240px_1fr]"
              >
                <div className="font-bold text-blue-900">
                  {number}
                </div>

                <div className="font-bold text-gray-900">
                  {title}
                </div>

                <div className="leading-7 text-gray-600">
                  {description}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xl font-semibold text-blue-900">
            {ta('«From access to alignment. From alignment to transactions.»')}
          </p>
        </div>
      </section>

      {/* ===================================================
          05 — FOUR WAYS TO ENTER AEF
          =================================================== */}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600">
            {ta('05 — FOUR WAYS TO ENTER AEF')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {ta('DON’T JUST ATTEND AEF.')}
          </h2>

          <h3 className="mt-2 text-2xl font-bold text-blue-900 md:text-4xl">
            {ta('COME WITH A MANDATE.')}
          </h3>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-bold text-teal-600">
                {ta('01 — AFRICAN GOVERNMENTS')}
              </p>

              <h3 className="mt-3 text-2xl font-bold text-gray-900">
                {ta('BRING YOUR COUNTRY’S PRIORITIES TO THE TABLE.')}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Present your country’s strategic investment priorities directly
                to global investors, development institutions, sovereign funds
                and strategic companies.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                {ta('Participation opportunities:')}
              </p>

              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {[
                  'Country-Specific Investment Roundtables',
                  'Leaders Lounge',
                  'VIP Luncheon',
                  'Deal Rooms',
                  'Strategic Sessions',
                  'Project Showcase',
                ].map((item) => (
                  <li key={item}>• {ta(item)}</li>
                ))}
              </ul>

              <button
                onClick={() => openConversion('country')}
                className="mt-7 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                {ta('SUBMIT YOUR COUNTRY FOR A ROUNDTABLE')}
              </button>

              <button
                onClick={() => openConversion('country')}
                className="mt-3 block text-sm font-semibold text-teal-600 hover:text-teal-700"
              >
                {ta('Request Country Participation')}
              </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-bold text-teal-600">
                {ta('02 — FOREIGN COUNTRIES &amp; REGIONAL BLOCS')}
              </p>

              <h3 className="mt-3 text-2xl font-bold text-gray-900">
                {ta('BRING YOUR MARKET. BUILD YOUR AFRICA STRATEGY.')}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Governments, regional blocs and international economic
                partners are invited to use AEF to build new economic
                relationships with African decision-makers.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                {ta('Engagement opportunities:')}
              </p>

              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {[
                  'VIP Luncheon',
                  'Leaders Lounge',
                  'Diplomatic Breakfast',
                  'Country / Bloc Delegation',
                  'Strategic Sessions',
                  'Investment & Trade Discussions',
                  'Deal Rooms',
                ].map((item) => (
                  <li key={item}>• {ta(item)}</li>
                ))}
              </ul>

              <p className="mt-5 leading-7 text-gray-600">
                «A platform for countries and blocs seeking a deeper economic
                relationship with Africa.»
              </p>

              <button
                onClick={() => openConversion('bloc')}
                className="mt-7 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                {ta('EXPLORE COUNTRY &amp; BLOC PARTICIPATION')}
              </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-bold text-teal-600">
                {ta('03 — INVESTORS')}
              </p>

              <h3 className="mt-3 text-2xl font-bold text-gray-900">
                {ta('BRING CAPITAL. FIND THE RIGHT PROJECTS.')}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Access African governments, project sponsors, CEOs and
                institutional partners through curated investment conversations
                designed around actual capital requirements.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                {ta('Target:')}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  'Sovereign Wealth Funds',
                  'Pension Funds',
                  'Private Equity',
                  'Venture Capital',
                  'Family Offices',
                  'DFIs',
                  'Commercial Banks',
                  'Infrastructure Funds',
                  'Energy Investors',
                  'Strategic Corporate Investors',
                  'Impact Investors',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700"
                  >
                    {ta(item)}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-sm font-semibold text-blue-900">
                Pre-Matched Opportunities → Private Meetings → Due Diligence
                Conversations → Deal Room → Follow-Up
              </p>

              <button
                onClick={() => openConversion('investor')}
                className="mt-7 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                {ta('JOIN THE AEF INVESTOR NETWORK')}
              </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-bold text-teal-600">
                {ta('04 — PROJECT OWNERS')}
              </p>

              <h3 className="mt-3 text-2xl font-bold text-gray-900">
                {ta('BRING THE PROJECT. MEET THE CAPITAL.')}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                AEF provides selected African projects with direct access to
                investors, governments, DFIs, strategic companies and
                technology partners.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                {ta('Priority sectors:')}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  'Infrastructure',
                  'Energy',
                  'Critical Minerals',
                  'Agriculture & Agri-Tech',
                  'Health',
                  'Technology & Digital',
                  'Manufacturing',
                  'Logistics',
                  'Tourism',
                  'Water',
                  'Industrialisation',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700"
                  >
                    {ta(item)}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-sm font-bold text-blue-900">
                PROJECT → CAPITAL REQUIREMENT → STRUCTURE → INVESTOR MATCH →
                DEAL ROOM
              </p>

              <button
                onClick={() => openConversion('project')}
                className="mt-7 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                {ta('SUBMIT A PROJECT')}
              </button>

              <p className="mt-4 text-sm text-gray-500">
                {ta('«Project submissions are subject to AEF review and selection.»')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          06 — SPEAKERS
          =================================================== */}

      <section
        id="speakers"
        className="scroll-mt-24 border-t border-gray-100 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            {ta('06 — SPEAKERS')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {ta('THE PEOPLE SHAPING THE CONVERSATION.')}
          </h2>

          <p className="mt-5 max-w-4xl leading-7 text-gray-600">
            AEF convenes decision-makers and leading voices shaping Africa’s
            relationship with global capital, technology, energy, trade and
            strategic investment.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              'HEADS OF STATE',
              'GOVERNMENT LEADERS',
              'INVESTORS',
              'CEOs',
              'ECONOMIC STRATEGISTS',
              'FINANCIAL LEADERS',
              'INDUSTRY EXPERTS',
            ].map((category) => (
              <span
                key={category}
                className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-bold text-blue-900"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {intervenantsApercu.map((intervenant) => (
              <Link
                key={intervenant.id}
                to="/intervenants"
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                  <img
                    src={intervenant.photoUrl}
                    alt={intervenant.nom}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold leading-tight text-gray-900">
                    {intervenant.nom}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {intervenant.titre}
                  </p>

                  {intervenant.institution && (
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-gray-400">
                      {intervenant.institution}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <Link
            to="/intervenants"
            className="mt-8 inline-flex rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            {ta('VIEW ALL SPEAKERS')}
          </Link>

          {intervenantsInvites.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900">
                {ta('INVITED LEADERS ONLY')}
              </h3>

              <p className="mt-3 text-sm text-gray-500">
                Invited but unconfirmed participants are not represented as
                confirmed speakers.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {intervenantsInvites.map((intervenant) => (
                  <div
                    key={intervenant.id}
                    className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                  >
                    <h4 className="font-bold text-gray-900">
                      {intervenant.nom}
                    </h4>

                    <p className="mt-2 text-sm text-gray-600">
                      {intervenant.titre}
                    </p>

                    {intervenant.institution && (
                      <p className="mt-2 text-xs uppercase text-gray-400">
                        {intervenant.institution}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================================================
          07 — PROGRAMME INTRODUCTION
          =================================================== */}

      <section
        id="programme"
        className="scroll-mt-24 bg-gray-50"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            {ta('07 — PROGRAMME INTRODUCTION')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {ta('TWO DAYS. ONE ECONOMIC MISSION.')}
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <p className="text-sm font-bold text-teal-600">
                {ta('DAY ONE')}
              </p>

              <h3 className="mt-2 text-2xl font-bold text-gray-900">
                {ta('THE GEOPOLITICS OF CAPITAL')}
              </h3>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <p className="text-sm font-bold text-teal-600">
                {ta('DAY TWO')}
              </p>

              <h3 className="mt-2 text-2xl font-bold text-gray-900">
                {ta('SECTOR DEEP DIVES &amp; TRADE')}
              </h3>
            </div>
          </div>

          <p className="mt-8 max-w-4xl text-lg leading-8 text-gray-600">
            «Every session at AEF is designed around a strategic question, a
            decision-maker conversation or a transaction pathway.»
          </p>

          <button
            onClick={() => setShowProgrammeModal(true)}
            className="mt-7 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            {ta('View Full Programme')}
          </button>
        </div>
      </section>

      {/* ===================================================
          08 — DAY ONE
          =================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {renderDay(dayOne)}
        </div>
      </section>

      {/* ===================================================
          DEAL MATCH PROFILE
          =================================================== */}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-7">
            <h3 className="text-2xl font-bold text-gray-900">
              {ta('DEAL MATCHMAKING')}
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              {ta('AI-powered matchmaking connecting participants according to:')}
            </p>

            <p className="mt-4 font-bold text-blue-900">
              {ta('Sector × Geography × Capital × Project × Partnership')}
            </p>

            <button
              type="button"
              onClick={() => setShowMatchProfileModal(true)}
              className="mt-6 inline-flex rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              {ta('BUILD YOUR AEF MATCH PROFILE')}
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================
          VIP INVESTMENT SHOWCASE
          =================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7">
            <h3 className="text-2xl font-bold text-gray-900">
              {ta('INVESTMENT SHOWCASE')}
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              {ta('Selected projects presented to qualified investors.')}
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          09 — DAY TWO
          =================================================== */}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {renderDay(dayTwo)}
        </div>
      </section>

      {/* ===================================================
          SECTOR DEAL TRACKS
          =================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            {ta('10 — SECTOR DEAL TRACKS')}
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sectorDealTracks.map((sector) => (
              <div
                key={ta(sector.title)}
                className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-xl font-bold text-blue-900">
                  {ta(sector.title)}
                </h3>

                <p className="mt-2 font-semibold text-gray-900">
                  {ta(sector.subtitle)}
                </p>

                <div className="mt-5 space-y-2">
                  {sector.focus.map((item) => (
                    <p
                      key={item}
                      className="text-sm text-gray-600"
                    >
                      • {ta(item)}
                    </p>
                  ))}
                </div>

                <div className="mt-6 rounded-lg bg-teal-50 p-4">
                  <p className="text-sm font-bold text-teal-700">
                    {ta('DEAL TRACK')}
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {ta(sector.deal)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          13 — THE FUTURE ECONOMY
          =================================================== */}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            {ta('13 — THE FUTURE ECONOMY')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {ta('FIVE INVESTMENT FRONTIERS')}
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              'FUTURE FOOD',
              'SPACE & STRATEGIC RESOURCES',
              'AI & HEALTH',
              'NEXT-GENERATION INFRASTRUCTURE',
              'FUTURE TOURISM',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <p className="font-bold text-blue-900">
                  {ta(item)}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-4xl leading-7 text-gray-600">
            {ta('«What does this mean for African capital, industry and investment?»')}
          </p>

          <p className="mt-3 text-sm text-gray-500">
            {ta('Content investment-focused, not entertainment-focused.')}
          </p>
        </div>
      </section>

      {/* ===================================================
          14 — CLOSING DEAL RALLY
          =================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            {ta('14 — CLOSING DEAL RALLY')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {ta('WHAT MOVED FROM CONVERSATION TO COMMITMENT?')}
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'INVESTMENTS',
              'MoUs',
              'JOINT VENTURES',
              'FINANCING',
              'TRADE PARTNERSHIPS',
              'STRATEGIC ALLIANCES',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
              >
                <p className="font-bold text-blue-900">
                  {ta(item)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200">
              {ta('AFRICA INVESTMENT SCOREBOARD')}
            </p>

            <p className="mt-3 leading-7 text-blue-100">
              {ta('Display only verified AEF outcomes.')}
            </p>
          </div>

          <p className="mt-8 text-lg font-semibold text-gray-900">
            {ta('AEF SCALE-UP / UNICORN AWARD')}
          </p>

          <p className="mt-2 text-gray-600">
            Position as investment/growth recognition, not conventional awards
            ceremony.
          </p>
        </div>
      </section>

      {/* ===================================================
          15 — THE DEAL ROOM
          =================================================== */}

      <section id="deal-room" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-8 text-white md:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200">
              {ta('15 — THE DEAL ROOM')}
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              {ta('WHERE CAPITAL MEETS THE PROJECT.')}
            </h2>

            <p className="mt-6 max-w-4xl leading-8 text-blue-100">
              «The Deal Room is the operational core of AEF — where qualified
              projects meet investors and strategic partners through structured
              conversations designed to advance opportunities toward investment
              decisions.»
            </p>

            <div className="mt-10 space-y-3">
              {[
                'PROJECT OWNER',
                'AEF SCREENING',
                'INVESTOR MATCHING',
                'CURATED MEETING',
                'TERM / PARTNERSHIP DISCUSSION',
                'DUE DILIGENCE',
                'AGREEMENT',
                'FOLLOW-UP',
              ].map((item, index) => (
                <React.Fragment key={item}>
                  <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                    <span className="mr-3 text-sm text-blue-200">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="font-semibold">
                      {ta(item)}
                    </span>
                  </div>

                  {index < 7 && (
                    <div className="text-center text-teal-300">
                      ↓
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                ['INVESTORS', 'FIND PROJECTS'],
                ['PROJECTS', 'FIND CAPITAL'],
                ['GOVERNMENTS', 'FIND STRATEGIC PARTNERS'],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-xl border border-white/20 bg-white/5 p-5"
                >
                  <p className="font-bold">
                    {title}
                  </p>

                  <p className="mt-2 text-blue-100">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setDealRoomSubmitted(false);
                setShowDealRoomModal(true);
              }}
              className="mt-8 inline-flex rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
            >
              {ta('ENTER THE DEAL ROOM')}
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================
          16 — COUNTRY-SPECIFIC INVESTMENT ROUNDTABLES
          =================================================== */}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            {ta('16 — COUNTRY-SPECIFIC INVESTMENT ROUNDTABLES')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {ta('YOUR COUNTRY. YOUR PRIORITIES. YOUR INVESTOR TABLE.')}
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-600">
            «AEF gives African governments a dedicated environment to put
            their strategic priorities directly in front of the institutions
            and investors capable of advancing them.»
          </p>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-7">
            <p className="font-bold text-blue-900">
              COUNTRY → PRIORITY SECTOR → PROJECTS → CAPITAL REQUIREMENT →
              INVESTORS → NEXT STEP
            </p>
          </div>

          <button
            onClick={() => openConversion('country')}
            className="mt-7 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            {ta('REQUEST A COUNTRY ROUNDTABLE')}
          </button>

          <p className="mt-4 text-sm text-gray-500">
            {ta('By invitation / application / subject to AEF selection.')}
          </p>
        </div>
      </section>

      {/* ===================================================
          17 — VIP LUNCHEON
          =================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            {ta('17 — VIP LUNCHEON')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            WHERE COUNTRIES, BLOCS, INVESTORS AND STRATEGIC PARTNERS SIT AT THE
            SAME TABLE.
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-600">
            «Selected foreign countries, regional blocs, governments,
            investors and corporate leaders participate in curated closed-door
            tables around strategic investment themes.»
          </p>

          <p className="mt-6 font-semibold text-blue-900">
            Economic Diplomacy + Capital + Market Access + Strategic
            Partnerships
          </p>

          <button
            onClick={() => openConversion('bloc')}
            className="mt-7 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            {ta('REQUEST VIP PARTICIPATION')}
          </button>
        </div>
      </section>

      {/* ===================================================
          18 — COFFEE WITH PRESIDENTS
          =================================================== */}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            {ta('18 — COFFEE WITH PRESIDENTS')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {ta('ACCESS. DIALOGUE. DECISION-MAKING.')}
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-600">
            «A limited-format environment designed for direct conversations
            between Heads of State and a carefully selected group of investors
            and strategic leaders.»
          </p>

          <button
            onClick={() => openConversion('bloc')}
            className="mt-7 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            {ta('REQUEST CONSIDERATION')}
          </button>

          <p className="mt-4 text-sm text-gray-500">
            Participation is curated and subject to protocol, availability and
            AEF selection.
          </p>
        </div>
      </section>

      {/* ===================================================
          19 — WHY KINSHASA
          =================================================== */}

      <section
        id="why-kinshasa"
        className="scroll-mt-24 bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            {ta('19 — WHY KINSHASA')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {ta('WHY KINSHASA. WHY NOW.')}
          </h2>

          <p className="mt-6 max-w-4xl leading-8 text-gray-600">
            Present Kinshasa as strategic economic location, not tourism
            destination.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Central African Markets',
              'Critical Minerals',
              'Energy',
              'Agriculture',
              'Infrastructure',
              'Consumer Markets',
              'Regional Connectivity',
              'Industrialisation',
              'African Economic Diplomacy',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
              >
                <p className="font-bold text-blue-900">
                  {ta(item)}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xl font-semibold leading-8 text-blue-900">
            «The world’s capital is looking for Africa’s next opportunities.
            Kinshasa is bringing the decision-makers to the table.»
          </p>
        </div>
      </section>

      {/* ===================================================
          20 — WHO WILL BE AT THE TABLE?
          =================================================== */}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            {ta('20 — WHO WILL BE AT THE TABLE?')}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              'HEADS OF STATE',
              'PRIME MINISTERS',
              'MINISTERS',
              'SOVEREIGN WEALTH FUNDS',
              'DFIs',
              'INSTITUTIONAL INVESTORS',
              'FAMILY OFFICES',
              'GLOBAL CEOs',
              'BANKS',
              'PROJECT DEVELOPERS',
              'TECHNOLOGY COMPANIES',
              'STRATEGIC PARTNERS',
              'DIPLOMATIC MISSIONS',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <p className="font-bold text-blue-900">
                  {ta(item)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          21 — ACCESS VS POSITION
          =================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            {ta('21 — ACCESS VS POSITION')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {ta('A PASS GIVES YOU ACCESS.')}
          </h2>

          <h3 className="mt-2 text-2xl font-bold text-blue-900 md:text-4xl">
            {ta('A PARTNERSHIP GIVES YOUR INSTITUTION A POSITION.')}
          </h3>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-2xl font-bold text-gray-900">
                {ta('DELEGATE / INVESTOR PASS')}
              </h3>

              <p className="mt-3 font-semibold text-blue-900">
                {ta('PARTICIPATE IN THE ECOSYSTEM.')}
              </p>

              <p className="mt-5 leading-7 text-gray-600">
                Designed for executives, investors, government representatives
                and professionals who want to participate in AEF.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                {ta('Access may include:')}
              </p>

              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {[
                  'Strategic Sessions',
                  'Investment Discussions',
                  'Deal-Making Environments',
                  'Matchmaking',
                  'Selected Hospitality according to Pass Category',
                ].map((item) => (
                  <li key={item}>• {ta(item)}</li>
                ))}
              </ul>

              <p className="mt-6 font-semibold text-blue-900">
                {ta('«Be in the room. Access the conversations. Build relationships.»')}
              </p>

              <button
                onClick={() =>
                  setShowRegistrationModal(true)
                }
                className="mt-7 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
              >
                {ta('GET YOUR DELEGATE PASS')}
              </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-2xl font-bold text-gray-900">
                {ta('AEF PARTNERSHIP')}
              </h3>

              <p className="mt-3 font-semibold text-blue-900">
                {ta('POSITION YOUR INSTITUTION WITHIN THE ECOSYSTEM.')}
              </p>

              <p className="mt-5 leading-7 text-gray-600">
                Designed for companies, financial institutions, governments,
                investment platforms and strategic organisations seeking an
                institutional role within AEF.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                {ta('Potential benefits:')}
              </p>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  'Strategic Institutional Positioning',
                  'Sector / Platform Partnership',
                  'Curated Executive Access',
                  'Strategic Roundtables',
                  'Deal Room Engagement',
                  'Project / Investment Opportunities',
                  'Thought Leadership',
                  'Institutional Visibility',
                  'Content & Communications Integration',
                  'VIP Hospitality',
                  'Curated Introductions',
                  'Pre- & Post-Forum Engagement',
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-white px-3 py-2 text-xs text-gray-600"
                  >
                    {ta(item)}
                  </span>
                ))}
              </div>

              <p className="mt-6 font-semibold text-blue-900">
                {ta('«Don’t just be in the room. Help shape what happens in it.»')}
              </p>

              <Link
                to="/contact"
                className="mt-7 inline-flex rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
              >
                {ta('BECOME AN AEF PARTNER')}
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-gray-50 p-6 text-center font-bold text-blue-900">
            {ta('PASS → ACCESS')}
            <span className="mx-3 text-teal-600">|</span>
            {ta('PARTNERSHIP → POSITION')}
            <span className="mx-3 text-teal-600">|</span>
            {ta('STRATEGIC PARTNERSHIP → POSITION + ACTIVATION + DEAL ENGAGEMENT')}
          </div>
        </div>
      </section>

      {/* ===================================================
          22 — AEF PARTNERSHIPS
          =================================================== */}

      <section
        id="partners"
        className="scroll-mt-24 bg-gray-50"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            {ta('22 — AEF PARTNERSHIPS')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {ta('BUILD YOUR POSITION INSIDE AEF.')}
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [
                'STRATEGIC PARTNER',
                '€150,000',
                'Major institutional positioning and ecosystem activation.',
              ],
              [
                'PLATFORM PARTNER',
                '€80,000',
                'Strategic sector or platform activation.',
              ],
              [
                'INVESTMENT PARTNER',
                '€40,000',
                'Targeted investor, project and capital engagement.',
              ],
              [
                'SUPPORTING PARTNER',
                '€20,000',
                'Institutional visibility and participation.',
              ],
              [
                'CONTRIBUTING PARTNER',
                '€10,000',
                'Entry-level institutional partnership.',
              ],
            ].map(([level, price, description]) => (
              <div
                key={level}
                className="rounded-2xl border border-gray-200 bg-white p-7"
              >
                <h3 className="text-lg font-bold text-blue-900">
                  {level}
                </h3>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {price}
                </p>

                <p className="mt-4 leading-7 text-gray-600">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-4xl leading-7 text-gray-600">
            Important: Do not present sponsorship as simply “buying logos”.
            Partnerships can also be structured around strategic mandates.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              'ENERGY',
              'CRITICAL MINERALS',
              'INFRASTRUCTURE',
              'DIGITAL ECONOMY',
              'HEALTH',
              'TRADE & LOGISTICS',
              'INVESTMENT',
              'AFRICA–GULF',
            ].map((item) => (
              <span
                key={item}
                className="rounded-lg bg-white px-4 py-3 text-sm font-bold text-blue-900"
              >
                {ta(item)}
              </span>
            ))}
          </div>

          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            {ta('DISCUSS A STRATEGIC PARTNERSHIP')}
          </Link>
        </div>
      </section>

      {/* ===================================================
          23 — THE OUTCOME
          =================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            {ta('23 — THE OUTCOME')}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            {ta('THE MEASURE OF AEF IS WHAT HAPPENS AFTER THE HANDSHAKE.')}
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              'INVESTMENTS',
              'MoUs',
              'JOINT VENTURES',
              'FINANCING',
              'TRADE PARTNERSHIPS',
              'STRATEGIC ALLIANCES',
              'PROJECT PIPELINES',
              'MARKET ENTRY',
              'INDUSTRIAL PARTNERSHIPS',
              'CAPITAL COMMITMENTS',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
              >
                <p className="font-bold text-blue-900">
                  {ta(item)}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-4xl text-lg leading-8 text-gray-600">
            «AEF is designed to create a visible pipeline from conversation to
            commitment — and from commitment to execution.»
          </p>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-7">
            <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-blue-900">
              {[
                'OPPORTUNITY',
                'MATCH',
                'NEGOTIATION',
                'DUE DILIGENCE',
                'AGREEMENT',
                'FINANCIAL CLOSE',
                'IMPLEMENTATION',
              ].map((item, index) => (
                <React.Fragment key={item}>
                  <span>{ta(item)}</span>

                  {index < 6 && (
                    <span className="text-teal-600">
                      ↓
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Designed to facilitate / Structured to advance / Create the
            conditions for / Support the pathway toward.
          </p>
        </div>
      </section>

      {/* ===================================================
          24 — FINAL CTA
          =================================================== */}

      <section className="bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-white md:text-5xl">
            {ta('THE NEXT DEAL WILL NOT WAIT FOR THE OLD WORLD TO RETURN.')}
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-center text-lg leading-8 text-blue-100">
            «The world is reorganising its capital, supply chains,
            partnerships and strategic priorities. Africa has an opportunity
            to shape what comes next.»
          </p>

          <h3 className="mt-12 text-center text-2xl font-bold text-white">
            {ta('CHOOSE YOUR MANDATE')}
          </h3>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <button
              onClick={() => openConversion('country')}
              className="rounded-xl bg-white p-6 text-left transition hover:bg-gray-50"
            >
              <span className="font-bold text-blue-900">
                {ta('I REPRESENT AN AFRICAN COUNTRY')}
              </span>

              <span className="mt-2 block text-sm text-gray-600">
                {ta('Apply for a Country-Specific Investment Roundtable')}
              </span>
            </button>

            <button
              onClick={() => openConversion('bloc')}
              className="rounded-xl bg-white p-6 text-left transition hover:bg-gray-50"
            >
              <span className="font-bold text-blue-900">
                {ta('I REPRESENT A FOREIGN COUNTRY / BLOC')}
              </span>

              <span className="mt-2 block text-sm text-gray-600">
                {ta('Request VIP / Institutional Participation')}
              </span>
            </button>

            <button
              onClick={() => openConversion('investor')}
              className="rounded-xl bg-white p-6 text-left transition hover:bg-gray-50"
            >
              <span className="font-bold text-blue-900">
                {ta('I AM AN INVESTOR')}
              </span>

              <span className="mt-2 block text-sm text-gray-600">
                {ta('Join the AEF Investor Network')}
              </span>
            </button>

            <button
              onClick={() => openConversion('project')}
              className="rounded-xl bg-white p-6 text-left transition hover:bg-gray-50"
            >
              <span className="font-bold text-blue-900">
                {ta('I HAVE A PROJECT')}
              </span>

              <span className="mt-2 block text-sm text-gray-600">
                {ta('Submit an Investment Opportunity')}
              </span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/contact"
              className="inline-flex rounded-lg bg-teal-600 px-7 py-3 font-semibold text-white hover:bg-teal-700"
            >
              {ta('BECOME AN AEF PARTNER')}
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================
          26 — FINAL BRAND MESSAGE
          =================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-xl font-semibold leading-9 text-gray-900 md:text-2xl">
            «AEF is not somewhere I go to listen to Africa talk about
            opportunity. It is where I go because the governments, capital,
            projects and strategic partners I need are going to be at the same
            table.»
          </p>

          <div className="mt-10">
            <p className="text-2xl font-bold text-blue-900">
              {ta('AFRICA ECONOMIC FORUM')}
            </p>

            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-gray-600">
              THE GLOBAL PLATFORM FOR AFRICA’S CAPITAL, PARTNERSHIPS AND
              ECONOMIC TRANSFORMATION.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              {ta('Kinshasa | 10–11 November 2026')}
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          FOOTER
          =================================================== */}

      <footer className="bg-gray-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div>
              <p className="font-bold">
                {ta('Africa Economic Forum')}
              </p>

              <p className="mt-2 text-sm text-gray-400">
                {ta('Investments. Alliances. Strategic Opportunities.')}
              </p>
            </div>

            <div className="flex flex-wrap gap-5 text-sm text-gray-300">
              <a
                href="#about-aef"
                className="transition-colors hover:text-teal-400"
              >
                {ta('ABOUT AEF')}
              </a>

              <a
                href="#why-kinshasa"
                className="transition-colors hover:text-teal-400"
              >
                {ta('WHY KINSHASA')}
              </a>

              <a
                href="#programme"
                className="transition-colors hover:text-teal-400"
              >
                {ta('PROGRAMME')}
              </a>

              <Link
                to="/intervenants"
                className="transition-colors hover:text-teal-400"
              >
                {ta('SPEAKERS')}
              </Link>

              <a
                href="#deal-ecosystem"
                className="transition-colors hover:text-teal-400"
              >
                {ta('DEAL ECOSYSTEM')}
              </a>

              <a
                href="#partners"
                className="transition-colors hover:text-teal-400"
              >
                {ta('PARTNERS')}
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-gray-400">
            {ta('© 2026 Africa Economic Forum. All rights reserved.')}
          </div>
        </div>
      </footer>

      {/* ===================================================
          AEF MATCH PROFILE MODAL
          =================================================== */}

      {showMatchProfileModal && (
        <AEFMatchProfile onClose={() => setShowMatchProfileModal(false)} />
      )}

      {/* ===================================================
          DEAL ROOM MODAL (AEF DEAL ROOM — ACCESS & MANDATE FORM)
          =================================================== */}

      {showDealRoomModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 overflow-y-auto">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-10 shadow-2xl relative">
            <button
              onClick={() => setShowDealRoomModal(false)}
              className="absolute top-6 right-6 text-3xl font-light text-gray-400 hover:text-gray-700"
            >
              ×
            </button>

            {!dealRoomSubmitted ? (
              <div>
                {/* Headline */}
                <div className="border-b border-gray-100 pb-6 mb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 mb-2">{ta('AEF DEAL ROOM')}</p>
                  <h2 className="text-3xl font-bold text-gray-900">{ta('ENTER THE AEF DEAL ROOM')}</h2>
                  <p className="mt-2 text-lg font-semibold text-blue-900">{ta('Bring a mandate. Meet the counterparties. Advance the opportunity.')}</p>
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {ta('The AEF Deal Room is a curated environment connecting qualified investors, governments, project owners and strategic partners around specific investment, financing and partnership opportunities.')}
                  </p>
                  <p className="mt-3 text-xs italic text-gray-500">
                    {ta('Access is subject to AEF review and selection. Submitting this form does not guarantee a meeting or transaction.')}
                  </p>
                </div>

                <form onSubmit={handleDealRoomSubmit} className="space-y-8">
                  {/* STEP 1 — YOUR ROLE */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                    <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-teal-600 mb-4">{ta('STEP 1 — YOUR ROLE')}</h3>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">{ta('I am applying as:*')}</label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        'Investor / Capital Provider',
                        'Project Owner / Sponsor',
                        'Government / Public Institution',
                        'Strategic Corporate Partner',
                        'Development Finance Institution',
                        'Family Office / Investment Platform',
                        'Other',
                      ].map((roleOption) => (
                        <label key={roleOption} className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3.5 cursor-pointer hover:border-teal-600 transition">
                          <input
                            required
                            type="radio"
                            name="dealRoomRole"
                            value={roleOption}
                            checked={dealRoomRole === roleOption}
                            onChange={(e) => setDealRoomRole(e.target.value)}
                            className="text-teal-600 focus:ring-teal-500"
                          />
                          <span className="text-sm font-medium text-gray-900">{roleOption}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* STEP 2 — YOUR INSTITUTION */}
                  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
                    <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-teal-600">{ta('STEP 2 — YOUR INSTITUTION')}</h3>
                    
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Institution / Company Name*')}</label>
                        <input
                          required
                          type="text"
                          value={dealRoomData.institutionName}
                          onChange={(e) => setDealRoomData({ ...dealRoomData, institutionName: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 text-sm"
                          placeholder={ta('Company name')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Country / Headquarters*')}</label>
                        <input
                          required
                          type="text"
                          value={dealRoomData.countryHq}
                          onChange={(e) => setDealRoomData({ ...dealRoomData, countryHq: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 text-sm"
                          placeholder={ta('Country')}
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Website')}</label>
                        <input
                          type="url"
                          value={dealRoomData.website}
                          onChange={(e) => setDealRoomData({ ...dealRoomData, website: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 text-sm"
                          placeholder={ta('https://...')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Institution Type*')}</label>
                        <select
                          required
                          value={dealRoomData.institutionType}
                          onChange={(e) => setDealRoomData({ ...dealRoomData, institutionType: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-teal-600 text-sm"
                        >
                          <option value="">{ta('Select type')}</option>
                          <option value="Fund / PE / VC">{ta('Fund / PE / VC')}</option>
                          <option value="Corporate">{ta('Corporate')}</option>
                          <option value="Government / Ministry">{ta('Government / Ministry')}</option>
                          <option value="Project Developer">{ta('Project Developer')}</option>
                          <option value="DFI / Bank">{ta('DFI / Bank')}</option>
                          <option value="Family Office">{ta('Family Office')}</option>
                          <option value="Other">{ta('Other')}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Your Name*')}</label>
                        <input
                          required
                          type="text"
                          value={dealRoomData.yourName}
                          onChange={(e) => setDealRoomData({ ...dealRoomData, yourName: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 text-sm"
                          placeholder={ta('Full name')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Title / Position*')}</label>
                        <input
                          required
                          type="text"
                          value={dealRoomData.titlePosition}
                          onChange={(e) => setDealRoomData({ ...dealRoomData, titlePosition: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 text-sm"
                          placeholder={ta('Title')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Email*')}</label>
                        <input
                          required
                          type="email"
                          value={dealRoomData.email}
                          onChange={(e) => setDealRoomData({ ...dealRoomData, email: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 text-sm"
                          placeholder={ta('email@example.com')}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Phone / WhatsApp*')}</label>
                      <input
                        required
                        type="text"
                        value={dealRoomData.phoneWhatsApp}
                        onChange={(e) => setDealRoomData({ ...dealRoomData, phoneWhatsApp: e.target.value })}
                        className="w-full sm:w-1/2 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 text-sm"
                        placeholder={ta('+...')}
                      />
                    </div>
                  </div>

                  {/* CONDITIONAL MANDATE SECTION BASED ON ROLE */}
                  {dealRoomRole.includes('Investor') && (
                    <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-6 space-y-6">
                      <h3 className="text-base font-bold text-teal-900">{ta('YOUR CAPITAL MANDATE (INVESTOR)')}</h3>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">{ta('Investment Sectors*')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {['Infrastructure', 'Energy', 'Critical Minerals', 'Agriculture & Agri-Tech', 'Health', 'Technology & Digital', 'Manufacturing', 'Logistics', 'Tourism', 'Water', 'Other'].map((sec) => (
                            <label key={sec} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2.5 rounded border border-gray-200">
                              <input
                                type="checkbox"
                                checked={dealRoomData.investmentSectors.includes(sec)}
                                onChange={() => handleDealRoomCheckboxToggle('investmentSectors', sec)}
                              />
                              {sec}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">{ta('Geographies of Interest*')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {['Africa-wide', 'Central Africa', 'West Africa', 'East Africa', 'Southern Africa', 'North Africa'].map((geo) => (
                            <label key={geo} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2.5 rounded border border-gray-200">
                              <input
                                type="checkbox"
                                checked={dealRoomData.geographiesOfInterest.includes(geo)}
                                onChange={() => handleDealRoomCheckboxToggle('geographiesOfInterest', geo)}
                              />
                              {geo}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">{ta('Investment Structure*')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['Equity', 'Debt', 'Project Finance', 'PPP', 'Joint Venture', 'Growth Capital', 'Venture Capital', 'Other'].map((struct) => (
                            <label key={struct} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2.5 rounded border border-gray-200">
                              <input
                                type="checkbox"
                                checked={dealRoomData.investmentStructure.includes(struct)}
                                onChange={() => handleDealRoomCheckboxToggle('investmentStructure', struct)}
                              />
                              {struct}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">{ta('Typical Investment Ticket*')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {['Under €5M', '€5–25M', '€25–100M', '€100–500M', '€500M–€1B', '€1B+', 'Other'].map((ticket) => (
                            <label key={ticket} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2.5 rounded border border-gray-200">
                              <input
                                type="radio"
                                name="typicalInvestmentTicket"
                                value={ticket}
                                checked={dealRoomData.typicalInvestmentTicket === ticket}
                                onChange={(e) => setDealRoomData({ ...dealRoomData, typicalInvestmentTicket: e.target.value })}
                              />
                              {ticket}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">{ta('Investment Stage*')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {['Development', 'Construction', 'Growth', 'Expansion', 'Acquisition', 'Refinancing'].map((stg) => (
                            <label key={stg} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2.5 rounded border border-gray-200">
                              <input
                                type="checkbox"
                                checked={dealRoomData.investmentStage.includes(stg)}
                                onChange={() => handleDealRoomCheckboxToggle('investmentStage', stg)}
                              />
                              {stg}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('What are you looking for at AEF?*')}</label>
                        <textarea
                          rows={3}
                          value={dealRoomData.investorLookingFor}
                          onChange={(e) => setDealRoomData({ ...dealRoomData, investorLookingFor: e.target.value })}
                          placeholder={ta('Examples: infrastructure projects, energy assets, mineral-processing opportunities, government-backed projects, etc.')}
                          className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {dealRoomRole.includes('Project Owner') && (
                    <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-6 space-y-6">
                      <h3 className="text-base font-bold text-teal-900">{ta('YOUR INVESTMENT OPPORTUNITY (PROJECT OWNER)')}</h3>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Project Name*')}</label>
                          <input
                            type="text"
                            value={dealRoomData.projectName}
                            onChange={(e) => setDealRoomData({ ...dealRoomData, projectName: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                            placeholder={ta('Project title')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Country*')}</label>
                          <input
                            type="text"
                            value={dealRoomData.projectCountry}
                            onChange={(e) => setDealRoomData({ ...dealRoomData, projectCountry: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                            placeholder={ta('Country location')}
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Sector*')}</label>
                          <input
                            type="text"
                            value={dealRoomData.projectSector}
                            onChange={(e) => setDealRoomData({ ...dealRoomData, projectSector: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                            placeholder={ta('Sector')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Expected investment / financing timeline*')}</label>
                          <input
                            type="text"
                            value={dealRoomData.expectedTimeline}
                            onChange={(e) => setDealRoomData({ ...dealRoomData, expectedTimeline: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                            placeholder={ta('e.g. Q3 2026')}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">{ta('Project Stage*')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['Concept', 'Feasibility', 'Pre-FEED / FEED', 'Permitting', 'Construction-ready', 'Operational', 'Expansion'].map((stg) => (
                            <label key={stg} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2.5 rounded border border-gray-200">
                              <input
                                type="radio"
                                name="projectStage"
                                value={stg}
                                checked={dealRoomData.projectStage === stg}
                                onChange={(e) => setDealRoomData({ ...dealRoomData, projectStage: e.target.value })}
                              />
                              {stg}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Total Project Value*')}</label>
                          <input
                            type="text"
                            value={dealRoomData.totalProjectValue}
                            onChange={(e) => setDealRoomData({ ...dealRoomData, totalProjectValue: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                            placeholder={ta('€...')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Capital Required*')}</label>
                          <input
                            type="text"
                            value={dealRoomData.capitalRequired}
                            onChange={(e) => setDealRoomData({ ...dealRoomData, capitalRequired: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                            placeholder={ta('€...')}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">{ta('Capital Structure Sought*')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['Equity', 'Debt', 'Project Finance', 'PPP', 'Joint Venture', 'Strategic Investor', 'Blended Finance', 'Other'].map((cs) => (
                            <label key={cs} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2.5 rounded border border-gray-200">
                              <input
                                type="checkbox"
                                checked={dealRoomData.capitalStructureSought.includes(cs)}
                                onChange={() => handleDealRoomCheckboxToggle('capitalStructureSought', cs)}
                              />
                              {cs}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Current Funding / Partners')}</label>
                          <textarea
                            rows={2}
                            value={dealRoomData.currentFundingPartners}
                            onChange={(e) => setDealRoomData({ ...dealRoomData, currentFundingPartners: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                            placeholder={ta('Details...')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('What type of investor or partner are you seeking?*')}</label>
                          <textarea
                            rows={2}
                            value={dealRoomData.investorPartnerSought}
                            onChange={(e) => setDealRoomData({ ...dealRoomData, investorPartnerSought: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                            placeholder={ta('Details...')}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Project summary*')}</label>
                        <textarea
                          rows={3}
                          value={dealRoomData.projectSummary}
                          onChange={(e) => setDealRoomData({ ...dealRoomData, projectSummary: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                          placeholder={ta('Describe the project...')}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">{ta('Investment documents available')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {['Executive Summary', 'Information Memorandum', 'Feasibility Study', 'Financial Model', 'Data Room', 'Government / Concession Documentation', 'Other'].map((doc) => (
                            <label key={doc} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2.5 rounded border border-gray-200">
                              <input
                                type="checkbox"
                                checked={dealRoomData.investmentDocsAvailable.includes(doc)}
                                onChange={() => handleDealRoomCheckboxToggle('investmentDocsAvailable', doc)}
                              />
                              {doc}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Upload Project Information (PDF / Doc)')}</label>
                        <input
                          type="file"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setDealRoomFile(e.target.files[0]);
                            }
                          }}
                          className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {dealRoomRole.includes('Government') && (
                    <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-6 space-y-6">
                      <h3 className="text-base font-bold text-teal-900">{ta('YOUR STRATEGIC MANDATE (GOVERNMENT)')}</h3>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Country*')}</label>
                          <input
                            type="text"
                            value={dealRoomData.govCountry}
                            onChange={(e) => setDealRoomData({ ...dealRoomData, govCountry: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Institution / Ministry*')}</label>
                          <input
                            type="text"
                            value={dealRoomData.govInstitutionMinistry}
                            onChange={(e) => setDealRoomData({ ...dealRoomData, govInstitutionMinistry: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Senior Representative*')}</label>
                          <input
                            type="text"
                            value={dealRoomData.govSeniorRep}
                            onChange={(e) => setDealRoomData({ ...dealRoomData, govSeniorRep: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">{ta('Priority Sectors*')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['Energy', 'Infrastructure', 'Critical Minerals', 'Agriculture', 'Manufacturing', 'Health', 'Technology', 'Logistics', 'Tourism', 'Other'].map((sec) => (
                            <label key={sec} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2.5 rounded border border-gray-200">
                              <input
                                type="checkbox"
                                checked={dealRoomData.govPrioritySectors.includes(sec)}
                                onChange={() => handleDealRoomCheckboxToggle('govPrioritySectors', sec)}
                              />
                              {sec}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Investment Priorities*')}</label>
                        <textarea
                          rows={2}
                          value={dealRoomData.govInvestmentPriorities}
                          onChange={(e) => setDealRoomData({ ...dealRoomData, govInvestmentPriorities: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Projects requiring capital')}</label>
                        <textarea
                          rows={2}
                          value={dealRoomData.govProjectsRequiringCapital}
                          onChange={(e) => setDealRoomData({ ...dealRoomData, govProjectsRequiringCapital: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Estimated Capital Requirement (€)')}</label>
                        <input
                          type="text"
                          value={dealRoomData.govEstimatedCapitalReq}
                          onChange={(e) => setDealRoomData({ ...dealRoomData, govEstimatedCapitalReq: e.target.value })}
                          className="w-full sm:w-1/2 rounded-lg border border-gray-300 p-3 text-sm bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">{ta('Type of partners sought')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['Investors', 'Strategic Companies', 'DFIs', 'Technology Partners', 'Infrastructure Developers', 'Industrial Partners', 'Trade Partners', 'Other'].map((ps) => (
                            <label key={ps} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2.5 rounded border border-gray-200">
                              <input
                                type="checkbox"
                                checked={dealRoomData.govTypePartnersSought.includes(ps)}
                                onChange={() => handleDealRoomCheckboxToggle('govTypePartnersSought', ps)}
                              />
                              {ps}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {dealRoomRole.includes('Strategic Corporate Partner') && (
                    <div className="rounded-xl border border-teal-200 bg-teal-50/40 p-6 space-y-6">
                      <h3 className="text-base font-bold text-teal-900">{ta('YOUR PARTNERSHIP MANDATE (STRATEGIC PARTNER)')}</h3>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">{ta('Strategic capabilities you bring*')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {['Technology', 'Engineering / EPC', 'Market Access', 'Industrial Capacity', 'Logistics', 'Financial Services', 'Advisory', 'Manufacturing', 'Distribution', 'Other'].map((cap) => (
                            <label key={cap} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2.5 rounded border border-gray-200">
                              <input
                                type="checkbox"
                                checked={dealRoomData.stratCapabilities.includes(cap)}
                                onChange={() => handleDealRoomCheckboxToggle('stratCapabilities', cap)}
                              />
                              {cap}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('African markets of interest*')}</label>
                          <input
                            type="text"
                            value={dealRoomData.stratAfricanMarkets}
                            onChange={(e) => setDealRoomData({ ...dealRoomData, stratAfricanMarkets: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Sectors of interest*')}</label>
                          <input
                            type="text"
                            value={dealRoomData.stratSectorsOfInterest}
                            onChange={(e) => setDealRoomData({ ...dealRoomData, stratSectorsOfInterest: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">{ta('Type of partnerships sought*')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {['Joint Ventures', 'Technology Partnerships', 'Market Entry', 'Industrial Partnerships', 'Investment', 'PPP', 'Distribution', 'Other'].map((tp) => (
                            <label key={tp} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2.5 rounded border border-gray-200">
                              <input
                                type="checkbox"
                                checked={dealRoomData.stratPartnershipsSought.includes(tp)}
                                onChange={() => handleDealRoomCheckboxToggle('stratPartnershipsSought', tp)}
                              />
                              {tp}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Describe the opportunity or partnership you would like to explore*')}</label>
                        <textarea
                          rows={3}
                          value={dealRoomData.stratDescribeOpportunity}
                          onChange={(e) => setDealRoomData({ ...dealRoomData, stratDescribeOpportunity: e.target.value })}
                          className="w-full rounded-lg border border-gray-300 p-3 text-sm bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 3 — YOUR DEAL PRIORITY */}
                  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
                    <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-teal-600">{ta('STEP 3 — YOUR DEAL PRIORITY')}</h3>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('WHAT WOULD YOU LIKE TO ADVANCE THROUGH THE AEF DEAL ROOM?*')}</label>
                      <textarea
                        required
                        rows={3}
                        value={dealRoomData.dealPriority}
                        onChange={(e) => setDealRoomData({ ...dealRoomData, dealPriority: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                        placeholder={ta('Describe your priority...')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('Is there a specific counterparty you would like AEF to help connect you with?')}</label>
                      <input
                        type="text"
                        value={dealRoomData.specificCounterparty}
                        onChange={(e) => setDealRoomData({ ...dealRoomData, specificCounterparty: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                        placeholder={ta('Optional counterparty name/institution')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-1">{ta('What would constitute a successful meeting for you?')}</label>
                      <textarea
                        rows={2}
                        value={dealRoomData.successfulMeetingDef}
                        onChange={(e) => setDealRoomData({ ...dealRoomData, successfulMeetingDef: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm"
                        placeholder={ta('Define success...')}
                      />
                    </div>
                  </div>

                  {/* STEP 4 — CONFIDENTIALITY & CONSENT */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-teal-600">{ta('STEP 4 — CONFIDENTIALITY &amp; CONSENT')}</h3>
                    
                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
                      <input
                        required
                        type="checkbox"
                        checked={dealRoomData.consentAccuracy}
                        onChange={(e) => setDealRoomData({ ...dealRoomData, consentAccuracy: e.target.checked })}
                        className="mt-1 text-teal-600"
                      />
                      <span>{ta('I confirm that the information submitted is accurate and that I am authorised to represent the institution identified above.*')}</span>
                    </label>

                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
                      <input
                        required
                        type="checkbox"
                        checked={dealRoomData.consentReview}
                        onChange={(e) => setDealRoomData({ ...dealRoomData, consentReview: e.target.checked })}
                        className="mt-1 text-teal-600"
                      />
                      <span>{ta('I understand that AEF may review the information provided for the purpose of qualification and matchmaking.*')}</span>
                    </label>

                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
                      <input
                        required
                        type="checkbox"
                        checked={dealRoomData.consentNoGuarantee}
                        onChange={(e) => setDealRoomData({ ...dealRoomData, consentNoGuarantee: e.target.checked })}
                        className="mt-1 text-teal-600"
                      />
                      <span>{ta('I understand that submission does not guarantee Deal Room access, a meeting, investment, financing or transaction.*')}</span>
                    </label>

                    <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
                      <input
                        required
                        type="checkbox"
                        checked={dealRoomData.consentContact}
                        onChange={(e) => setDealRoomData({ ...dealRoomData, consentContact: e.target.checked })}
                        className="mt-1 text-teal-600"
                      />
                      <span>{ta('I agree that AEF may contact me regarding relevant opportunities and participation.*')}</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isDealRoomSubmitting}
                    className="w-full rounded-lg bg-blue-900 py-4 font-bold text-white hover:bg-blue-800 transition disabled:opacity-50 text-base"
                  >
                    {isDealRoomSubmitting ? ta('SUBMITTING MANDATE...') : ta('SUBMIT DEAL ROOM APPLICATION')}
                  </button>
                </form>
              </div>
            ) : (
              /* AFTER SUBMISSION MESSAGE */
              <div className="py-12 px-6 text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 text-teal-600 text-2xl font-bold mb-2">
                  ✓
                </div>
                <h2 className="text-3xl font-bold text-gray-900">{ta('APPLICATION RECEIVED')}</h2>
                <p className="max-w-xl mx-auto text-base leading-7 text-gray-600">
                  {ta('Thank you for submitting your AEF Deal Room mandate.')}
                </p>
                <p className="max-w-xl mx-auto text-base leading-7 text-gray-600">
                  {ta('Your information will be reviewed by the AEF team to assess qualification, mandate alignment and potential counterparties.')}
                </p>
                <div className="p-4 rounded-xl bg-gray-50 max-w-md mx-auto border border-gray-200">
                  <p className="text-sm font-semibold text-blue-900">{ta('AEF participation is curated.')}</p>
                  <p className="mt-2 text-sm text-gray-600">{ta('Our team will contact you regarding the appropriate Deal Room format and, where relevant, potential meeting opportunities.')}</p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setShowDealRoomModal(false)}
                    className="rounded-lg bg-blue-900 px-8 py-3 font-semibold text-white hover:bg-blue-800 transition"
                  >
                    {ta('Close Window')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {conversionType && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 className="max-w-xl text-2xl font-bold text-gray-900">
                {ta(conversionConfigs[conversionType].title)}
              </h2>

              <button
                onClick={() => setConversionType(null)}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {conversionMessage ? (
              <div className="mt-8 rounded-lg bg-teal-50 p-5 text-sm leading-7 text-teal-800">
                {conversionMessage}
              </div>
            ) : (
              <form
                onSubmit={handleConversionSubmit}
                className="mt-7 space-y-5"
              >
                {conversionConfigs[conversionType].fields.map(
                  (field) => (
                    <div key={field}>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">
                        {field}
                      </label>

                      <input
                        required
                        type="text"
                        value={conversionData[field] || ''}
                        onChange={(e) =>
                          setConversionData({
                            ...conversionData,
                            [field]: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
                        placeholder={ta(field)}
                      />
                    </div>
                  )
                )}

                {conversionConfigs[conversionType].hasFile && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                      {ta(conversionConfigs[conversionType].fileLabel)}
                    </label>
                    <input
                      required
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setConversionFile(e.target.files[0]);
                        }
                      }}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 text-sm bg-gray-50"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Files are securely uploaded to aef-submissions/{conversionType === 'project' ? 'projects' : 'investors'}/
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isConversionSubmitting}
                  className="w-full rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
                >
                  {isConversionSubmitting ? ta('Submitting & Uploading...') : ta('SUBMIT')}
                </button>
              </form>
            )}

            {conversionMessage && (
              <button
                onClick={() => setConversionType(null)}
                className="mt-6 rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-teal-600 hover:text-teal-600"
              >
                {ta('Close')}
              </button>
            )}
          </div>
        </div>
      )}

      {showChairmanModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {ta("Chairman's Message")}
              </h2>

              <button
                onClick={() => setShowChairmanModal(false)}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4 leading-7 text-gray-600">
              <p>
                Africa Economic Forum 2026 convenes leaders around the
                economic and strategic questions shaping Africa's future.
              </p>

              <p>
                The Forum is designed to connect Governments, Capital,
                Projects and Strategic Partners around concrete
                opportunities and long-term partnerships.
              </p>
            </div>

            <button
              onClick={() => setShowChairmanModal(false)}
              className="mt-8 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              {ta('Close')}
            </button>
          </div>
        </div>
      )}

      {showProgrammeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {ta('Full Programme')}
              </h2>

              <button
                onClick={() => setShowProgrammeModal(false)}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="mt-8 space-y-12">
              {renderDay(dayOne)}
              {renderDay(dayTwo)}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={agendaPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                {ta('Download PDF')}
              </a>

              <button
                onClick={() =>
                  setShowProgrammeModal(false)
                }
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-teal-600 hover:text-teal-600"
              >
                {ta('Close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showRegistrationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {ta('Register for AEF 2026')}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {ta('10–11 November 2026 · Kinshasa')}
                </p>
              </div>

              <button
                onClick={() =>
                  setShowRegistrationModal(false)
                }
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleRegister}
              className="mt-7 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  {ta('Full name')}
                </label>

                <input
                  required
                  type="text"
                  value={registrationData.full_name}
                  onChange={(e) =>
                    setRegistrationData({
                      ...registrationData,
                      full_name: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
                  placeholder={ta('Your full name')}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  {ta('Email')}
                </label>

                <input
                  required
                  type="email"
                  value={registrationData.email}
                  onChange={(e) =>
                    setRegistrationData({
                      ...registrationData,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
                  placeholder={ta('you@example.com')}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  {ta('Organization')}
                </label>

                <input
                  required
                  type="text"
                  value={registrationData.organization}
                  onChange={(e) =>
                    setRegistrationData({
                      ...registrationData,
                      organization: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
                  placeholder={ta('Organization / Company')}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  {ta('Category')}
                </label>

                <select
                  required
                  value={registrationData.category}
                  onChange={(e) =>
                    setRegistrationData({
                      ...registrationData,
                      category: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-teal-600"
                >
                  <option value="">
                    {ta('Select your category')}
                  </option>

                  {registrationCategories.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {ta(category)}
                      </option>
                    )
                  )}
                </select>
              </div>

              {registrationMessage && (
                <div className="rounded-lg bg-teal-50 p-4 text-sm text-teal-800">
                  {registrationMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
              >
                {isSubmitting
                  ? 'Submitting...'
                  : 'Submit Registration'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showSignInModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {ta('Sign in')}
              </h2>

              <button
                onClick={() =>
                  setShowSignInModal(false)
                }
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <p className="mt-5 leading-7 text-gray-600">
              {ta('Please use the account access available on the AEF platform.')}
            </p>

            <div className="mt-7 flex gap-3">
              <Link
                to="/login"
                onClick={() =>
                  setShowSignInModal(false)
                }
                className="rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                {ta('Continue')}
              </Link>

              <button
                onClick={() => {
                  setShowSignInModal(false);
                  setShowCreateAccountModal(true);
                }}
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-teal-600 hover:text-teal-600"
              >
                {ta('Create account')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateAccountModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {ta('Create account')}
              </h2>

              <button
                onClick={() =>
                  setShowCreateAccountModal(false)
                }
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <p className="mt-5 leading-7 text-gray-600">
              {ta('Create your AEF account to access the platform.')}
            </p>

            <Link
              to="/register"
              onClick={() =>
                setShowCreateAccountModal(false)
              }
              className="mt-7 block rounded-lg bg-blue-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-800"
            >
              {ta('Create account')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
                }
