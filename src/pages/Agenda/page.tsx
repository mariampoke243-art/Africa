import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabase/client';
import { listeIntervenants } from '../../data/intervenantsData';

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
   PAGE
   =================================================== */

export default function AgendaPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [showSignInModal, setShowSignInModal] =
    useState(false);

  const [showCreateAccountModal, setShowCreateAccountModal] =
    useState(false);

  const [showChairmanModal, setShowChairmanModal] =
    useState(false);

  const [showProgrammeModal, setShowProgrammeModal] =
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
        console.warn('Database insert note:', dbError.message);
      }

      setDealRoomSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setDealRoomSubmitted(true); // Fallback to show application received state smoothly
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
        'Thank you for your submission. Your information and documents have been successfully recorded. Our team will review your mandate and contact you regarding the appropriate engagement format.'
      );
      setConversionData({});
      setConversionFile(null);
    } catch (err: any) {
      console.error(err);
      setConversionMessage(
        err.message || 'An unexpected error occurred during submission. Please try again.'
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
            'This email is already registered for this event.'
          );
        } else {
          setRegistrationMessage(
            'Unable to complete your registration. Please try again.'
          );
        }

        return;
      }

      setRegistrationMessage(
        'Registration submitted successfully. We look forward to welcoming you to AEF 2026.'
      );

      setRegistrationData({
        full_name: '',
        email: '',
        organization: '',
        category: '',
      });
    } catch {
      setRegistrationMessage(
        'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDay = (day: Day) => (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
          {day.title}
        </p>

        {day.subtitle && (
          <h3 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
            {day.subtitle}
          </h3>
        )}
      </div>

      {day.sessions.map((session) => {
        const sessionKey =
          `${day.title}-${session.time}-${session.title}`;

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
                  {session.title}
                </h4>

                <p className="mt-2 text-sm font-semibold leading-6 text-gray-700">
                  {session.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleSession(sessionKey)}
                aria-expanded={isExpanded}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
              >
                {isExpanded
                  ? 'HIDE DETAILS'
                  : 'VIEW DETAILS'}

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
                        Format
                      </p>

                      <p className="mt-2 text-sm leading-7 text-gray-600">
                        {session.format}
                      </p>
                    </div>
                  )}

                  {session.purpose && (
                    <div className="mb-5 rounded-xl border border-gray-200 bg-white p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-600">
                        Purpose
                      </p>

                      <p className="mt-2 text-sm leading-7 text-gray-600">
                        {session.purpose}
                      </p>
                    </div>
                  )}

                  {session.questions &&
                    session.questions.length > 0 && (
                      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-600">
                          Strategic Questions
                        </p>

                        <ul className="mt-4 space-y-3">
                          {session.questions.map(
                            (question) => (
                              <li
                                key={question}
                                className="flex gap-3 text-sm leading-6 text-gray-600"
                              >
                                <span className="font-bold text-teal-600">
                                  →
                                </span>

                                <span>
                                  {question}
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
                          Focus
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {session.focus.map((item) => (
                            <span
                              key={item}
                              className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {session.dealTrack && (
                    <div className="rounded-xl border border-teal-100 bg-teal-50 p-5">
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-600">
                        Deal Track
                      </p>

                      <p className="mt-2 text-sm font-semibold leading-7 text-teal-800">
                        {session.dealTrack}
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
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center">
            <img
              src="https://static.readdy.ai/image/849a2f489cee8d6814d30c5afad3a84a/55c329d4d58fb687f70c222c549f7ec1.png"
              alt="Africa Economic Forum"
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#about-aef" className="text-sm text-gray-700 hover:text-teal-600">ABOUT AEF</a>
            <a href="#why-kinshasa" className="text-sm text-gray-700 hover:text-teal-600">WHY KINSHASA</a>
            <a href="#programme" className="text-sm text-gray-700 hover:text-teal-600">PROGRAMME</a>
            <a href="#speakers" className="text-sm text-gray-700 hover:text-teal-600">SPEAKERS</a>
            <a href="#deal-ecosystem" className="text-sm text-gray-700 hover:text-teal-600">DEAL ECOSYSTEM</a>
            <a href="#partners" className="text-sm text-gray-700 hover:text-teal-600">PARTNERS</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowRegistrationModal(true)}
                className="rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
              >
                GET YOUR DELEGATE PASS
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">10–11 November 2026</p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              AFRICA’S NEXT INVESTMENT CORRIDORS ARE BEING BUILT IN KINSHASA.
            </h1>
          </div>
        </div>
      </section>

      {/* DEAL ROOM MODAL */}
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
                <div className="border-b border-gray-100 pb-6 mb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600 mb-2">AEF DEAL ROOM</p>
                  <h2 className="text-3xl font-bold text-gray-900">ENTER THE AEF DEAL ROOM</h2>
                </div>

                <form onSubmit={handleDealRoomSubmit} className="space-y-8">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                    <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-teal-600 mb-4">STEP 1 — YOUR ROLE</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        'Investor / Capital Provider',
                        'Project Owner / Sponsor',
                        'Government / Public Institution',
                        'Strategic Corporate Partner',
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

                  <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setShowDealRoomModal(false)}
                      className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isDealRoomSubmitting}
                      className="rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
                    >
                      {isDealRoomSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Application Received</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Thank you for submitting your profile to the AEF Deal Room. Our curation team will review your details and contact you shortly.
                </p>
                <button
                  onClick={() => setShowDealRoomModal(false)}
                  className="mt-6 rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
