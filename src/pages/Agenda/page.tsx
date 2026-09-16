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
      dealTrack: 'DEAL TRACK — AFRICA–GULF INVESTMENT PIPELINE',
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

const conversionConfigs = {
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

  const [conversionType, setConversionType] =
    useState<ConversionType>(null);

  const [conversionMessage, setConversionMessage] =
    useState('');

  const [conversionData, setConversionData] =
    useState<Record<string, string>>({});

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

  /* ===================================================
     CONVERSION JOURNEY
     =================================================== */

  const openConversion = (type: ConversionType) => {
    setConversionType(type);
    setConversionMessage('');
    setConversionData({});
  };

  const handleConversionSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setConversionMessage(
      'Thank you for your interest in Africa Economic Forum 2026. AEF participation is curated. Our team will review your mandate, priorities and requirements and contact you regarding the appropriate engagement format.'
    );

    setConversionData({});
  };

  /* ===================================================
     INSCRIPTION DELEGATE
     =================================================== */

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

  /* ===================================================
     RENDU JOUR
     =================================================== */

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

      {day.sessions.map((session) => (
        <div
          key={`${day.title}-${session.time}-${session.title}`}
          className="grid gap-5 border-b border-gray-100 pb-7 md:grid-cols-[150px_1fr]"
        >
          <div className="font-bold text-blue-900">
            {session.time}
          </div>

          <div>
            <h4 className="text-xl font-bold text-gray-900">
              {session.title}
            </h4>

            <p className="mt-2 text-sm font-semibold leading-6 text-gray-700">
              {session.description}
            </p>

            {session.format && (
              <p className="mt-4 text-sm leading-6 text-gray-600">
                <span className="font-semibold text-gray-900">
                  Format:
                </span>{' '}
                {session.format}
              </p>
            )}

            {session.purpose && (
              <p className="mt-3 text-sm leading-6 text-gray-600">
                <span className="font-semibold text-gray-900">
                  Purpose:
                </span>{' '}
                {session.purpose}
              </p>
            )}

            {session.questions && (
              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-900">
                  Strategic questions:
                </p>

                <ul className="mt-2 space-y-2">
                  {session.questions.map((question) => (
                    <li
                      key={question}
                      className="text-sm leading-6 text-gray-600"
                    >
                      - {question}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {session.focus && (
              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-900">
                  Focus:
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
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
              <div className="mt-5 rounded-lg bg-teal-50 p-4">
                <span className="font-semibold text-teal-700">
                  {session.dealTrack}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
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
              alt="Africa Economic Forum"
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#about-aef"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              ABOUT AEF
            </a>

            <a
              href="#why-kinshasa"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              WHY KINSHASA
            </a>

            <a
              href="#programme"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              PROGRAMME
            </a>

            <a
              href="#speakers"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              SPEAKERS
            </a>

            <a
              href="#deal-ecosystem"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              DEAL ECOSYSTEM
            </a>

            <a
              href="#partners"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              PARTNERS
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() =>
                setShowRegistrationModal(true)
              }
              className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
            >
              GET YOUR DELEGATE PASS
            </button>

            <Link
              to="/contact"
              className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              BECOME AN AEF PARTNER
            </Link>

            {user ? (
              <button
                onClick={signOut}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-teal-600 hover:text-teal-600"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => setShowSignInModal(true)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:border-teal-600 hover:text-teal-600"
              >
                Sign in
              </button>
            )}
          </div>

          <button
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-50 hover:text-teal-600 md:hidden"
            onClick={() => navigate('/agenda')}
            aria-label="Menu"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
      </header>

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
              10–11 November 2026
            </p>

            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              AFRICA’S NEXT INVESTMENT CORRIDORS ARE BEING BUILT IN KINSHASA.
            </h1>

            <p className="mt-6 text-xl leading-8 text-blue-100">
              AFRICA AND GLOBAL REALIGNMENT:
            </p>

            <p className="mt-2 text-xl font-semibold leading-8 text-white">
              INVESTMENTS, ALLIANCES &amp; STRATEGIC OPPORTUNITIES
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
                GET YOUR DELEGATE PASS
              </button>

              <Link
                to="/contact"
                className="rounded-lg border border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                BECOME AN AEF PARTNER
              </Link>

              <a
                href={agendaPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Download Agenda
              </a>
            </div>

            <p className="mt-5 text-sm font-medium text-blue-100">
              For Governments | Investors | Project Owners | Strategic Partners
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
            02 — THE PREMISE
          </p>

          <h2 className="mt-4 max-w-5xl text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            THE WORLD IS REALIGNING. AFRICA IS NEGOTIATING ITS PLACE.
          </h2>

          <div className="mt-8 max-w-5xl space-y-6 text-lg leading-8 text-gray-600">
            <p>
              The architecture of global economic cooperation is changing.
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
                  {item}
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
                  {item}
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
            03 — WHAT IS AEF?
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            A PLATFORM FOR CAPITAL, PARTNERSHIPS AND STRATEGIC DEAL-MAKING.
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
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-lg font-bold text-blue-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {item.text}
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
            04 — THE AEF DEAL ARCHITECTURE
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            THIS IS NOT A CONFERENCE.
          </h2>

          <h3 className="mt-2 text-2xl font-bold text-blue-900 md:text-4xl">
            IT IS A DEAL-MAKING ARCHITECTURE.
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
            «From access to alignment. From alignment to transactions.»
          </p>
        </div>
      </section>

      {/* ===================================================
          05 — FOUR WAYS TO ENTER AEF
          =================================================== */}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600">
            05 — FOUR WAYS TO ENTER AEF
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            DON’T JUST ATTEND AEF.
          </h2>

          <h3 className="mt-2 text-2xl font-bold text-blue-900 md:text-4xl">
            COME WITH A MANDATE.
          </h3>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">

            {/* COUNTRY */}

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-bold text-teal-600">
                01 — AFRICAN GOVERNMENTS
              </p>

              <h3 className="mt-3 text-2xl font-bold text-gray-900">
                BRING YOUR COUNTRY’S PRIORITIES TO THE TABLE.
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Present your country’s strategic investment priorities directly
                to global investors, development institutions, sovereign funds
                and strategic companies.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                Participation opportunities:
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
                  <li key={item}>• {item}</li>
                ))}
              </ul>

              <button
                onClick={() => openConversion('country')}
                className="mt-7 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                SUBMIT YOUR COUNTRY FOR A ROUNDTABLE
              </button>

              <button
                onClick={() => openConversion('country')}
                className="mt-3 block text-sm font-semibold text-teal-600 hover:text-teal-700"
              >
                Request Country Participation
              </button>
            </div>

            {/* BLOC */}

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-bold text-teal-600">
                02 — FOREIGN COUNTRIES &amp; REGIONAL BLOCS
              </p>

              <h3 className="mt-3 text-2xl font-bold text-gray-900">
                BRING YOUR MARKET. BUILD YOUR AFRICA STRATEGY.
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Governments, regional blocs and international economic
                partners are invited to use AEF to build new economic
                relationships with African decision-makers.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                Engagement opportunities:
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
                  <li key={item}>• {item}</li>
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
                EXPLORE COUNTRY &amp; BLOC PARTICIPATION
              </button>
            </div>

            {/* INVESTORS */}

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-bold text-teal-600">
                03 — INVESTORS
              </p>

              <h3 className="mt-3 text-2xl font-bold text-gray-900">
                BRING CAPITAL. FIND THE RIGHT PROJECTS.
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Access African governments, project sponsors, CEOs and
                institutional partners through curated investment conversations
                designed around actual capital requirements.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                Target:
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
                    {item}
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
                JOIN THE AEF INVESTOR NETWORK
              </button>
            </div>

            {/* PROJECT */}

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <p className="text-sm font-bold text-teal-600">
                04 — PROJECT OWNERS
              </p>

              <h3 className="mt-3 text-2xl font-bold text-gray-900">
                BRING THE PROJECT. MEET THE CAPITAL.
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                AEF provides selected African projects with direct access to
                investors, governments, DFIs, strategic companies and
                technology partners.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                Priority sectors:
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
                    {item}
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
                SUBMIT A PROJECT
              </button>

              <p className="mt-4 text-sm text-gray-500">
                «Project submissions are subject to AEF review and selection.»
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
            06 — SPEAKERS
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            THE PEOPLE SHAPING THE CONVERSATION.
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
            VIEW ALL SPEAKERS
          </Link>

          {intervenantsInvites.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900">
                INVITED LEADERS ONLY
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
            07 — PROGRAMME INTRODUCTION
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            TWO DAYS. ONE ECONOMIC MISSION.
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <p className="text-sm font-bold text-teal-600">
                DAY ONE
              </p>

              <h3 className="mt-2 text-2xl font-bold text-gray-900">
                THE GEOPOLITICS OF CAPITAL
              </h3>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <p className="text-sm font-bold text-teal-600">
                DAY TWO
              </p>

              <h3 className="mt-2 text-2xl font-bold text-gray-900">
                SECTOR DEEP DIVES &amp; TRADE
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
            View Full Programme
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
              DEAL MATCHMAKING
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              AI-powered matchmaking connecting participants according to:
            </p>

            <p className="mt-4 font-bold text-blue-900">
              Sector × Geography × Capital × Project × Partnership
            </p>

            <Link
              to="/meetings"
              className="mt-6 inline-flex rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              BUILD YOUR AEF MATCH PROFILE
            </Link>
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
              INVESTMENT SHOWCASE
            </h3>

            <p className="mt-3 leading-7 text-gray-600">
              Selected projects presented to qualified investors.
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
            10 — SECTOR DEAL TRACKS
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sectorDealTracks.map((sector) => (
              <div
                key={sector.title}
                className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-xl font-bold text-blue-900">
                  {sector.title}
                </h3>

                <p className="mt-2 font-semibold text-gray-900">
                  {sector.subtitle}
                </p>

                <div className="mt-5 space-y-2">
                  {sector.focus.map((item) => (
                    <p
                      key={item}
                      className="text-sm text-gray-600"
                    >
                      • {item}
                    </p>
                  ))}
                </div>

                <div className="mt-6 rounded-lg bg-teal-50 p-4">
                  <p className="text-sm font-bold text-teal-700">
                    DEAL TRACK
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    {sector.deal}
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
            13 — THE FUTURE ECONOMY
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            FIVE INVESTMENT FRONTIERS
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
                  {item}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-4xl leading-7 text-gray-600">
            «What does this mean for African capital, industry and investment?»
          </p>

          <p className="mt-3 text-sm text-gray-500">
            Content investment-focused, not entertainment-focused.
          </p>
        </div>
      </section>

      {/* ===================================================
          14 — CLOSING DEAL RALLY
          =================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            14 — CLOSING DEAL RALLY
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            WHAT MOVED FROM CONVERSATION TO COMMITMENT?
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
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200">
              AFRICA INVESTMENT SCOREBOARD
            </p>

            <p className="mt-3 leading-7 text-blue-100">
              Display only verified AEF outcomes.
            </p>
          </div>

          <p className="mt-8 text-lg font-semibold text-gray-900">
            AEF SCALE-UP / UNICORN AWARD
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

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-8 text-white md:p-12">

            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200">
              15 — THE DEAL ROOM
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              WHERE CAPITAL MEETS THE PROJECT.
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
                      {item}
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

            <Link
              to="/meetings"
              className="mt-8 inline-flex rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
            >
              ENTER THE DEAL ROOM
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================
          16 — COUNTRY-SPECIFIC INVESTMENT ROUNDTABLES
          =================================================== */}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            16 — COUNTRY-SPECIFIC INVESTMENT ROUNDTABLES
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            YOUR COUNTRY. YOUR PRIORITIES. YOUR INVESTOR TABLE.
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
            REQUEST A COUNTRY ROUNDTABLE
          </button>

          <p className="mt-4 text-sm text-gray-500">
            By invitation / application / subject to AEF selection.
          </p>
        </div>
      </section>

      {/* ===================================================
          17 — VIP LUNCHEON
          =================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            17 — VIP LUNCHEON
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
            REQUEST VIP PARTICIPATION
          </button>
        </div>
      </section>

      {/* ===================================================
          18 — COFFEE WITH PRESIDENTS
          =================================================== */}

      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            18 — COFFEE WITH PRESIDENTS
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            ACCESS. DIALOGUE. DECISION-MAKING.
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
            REQUEST CONSIDERATION
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
            19 — WHY KINSHASA
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            WHY KINSHASA. WHY NOW.
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
                  {item}
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
            20 — WHO WILL BE AT THE TABLE?
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
                  {item}
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
            21 — ACCESS VS POSITION
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            A PASS GIVES YOU ACCESS.
          </h2>

          <h3 className="mt-2 text-2xl font-bold text-blue-900 md:text-4xl">
            A PARTNERSHIP GIVES YOUR INSTITUTION A POSITION.
          </h3>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-2xl font-bold text-gray-900">
                DELEGATE / INVESTOR PASS
              </h3>

              <p className="mt-3 font-semibold text-blue-900">
                PARTICIPATE IN THE ECOSYSTEM.
              </p>

              <p className="mt-5 leading-7 text-gray-600">
                Designed for executives, investors, government representatives
                and professionals who want to participate in AEF.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                Access may include:
              </p>

              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                {[
                  'Strategic Sessions',
                  'Investment Discussions',
                  'Deal-Making Environments',
                  'Matchmaking',
                  'Selected Hospitality according to Pass Category',
                ].map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>

              <p className="mt-6 font-semibold text-blue-900">
                «Be in the room. Access the conversations. Build relationships.»
              </p>

              <button
                onClick={() =>
                  setShowRegistrationModal(true)
                }
                className="mt-7 rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
              >
                GET YOUR DELEGATE PASS
              </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-2xl font-bold text-gray-900">
                AEF PARTNERSHIP
              </h3>

              <p className="mt-3 font-semibold text-blue-900">
                POSITION YOUR INSTITUTION WITHIN THE ECOSYSTEM.
              </p>

              <p className="mt-5 leading-7 text-gray-600">
                Designed for companies, financial institutions, governments,
                investment platforms and strategic organisations seeking an
                institutional role within AEF.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                Potential benefits:
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
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-6 font-semibold text-blue-900">
                «Don’t just be in the room. Help shape what happens in it.»
              </p>

              <Link
                to="/contact"
                className="mt-7 inline-flex rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
              >
                BECOME AN AEF PARTNER
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-gray-50 p-6 text-center font-bold text-blue-900">
            PASS → ACCESS
            <span className="mx-3 text-teal-600">|</span>
            PARTNERSHIP → POSITION
            <span className="mx-3 text-teal-600">|</span>
            STRATEGIC PARTNERSHIP → POSITION + ACTIVATION + DEAL ENGAGEMENT
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
            22 — AEF PARTNERSHIPS
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            BUILD YOUR POSITION INSIDE AEF.
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
                {item}
              </span>
            ))}
          </div>

          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            DISCUSS A STRATEGIC PARTNERSHIP
          </Link>
        </div>
      </section>

      {/* ===================================================
          23 — THE OUTCOME
          =================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            23 — THE OUTCOME
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            THE MEASURE OF AEF IS WHAT HAPPENS AFTER THE HANDSHAKE.
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
                  {item}
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
                  <span>{item}</span>

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
            THE NEXT DEAL WILL NOT WAIT FOR THE OLD WORLD TO RETURN.
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-center text-lg leading-8 text-blue-100">
            «The world is reorganising its capital, supply chains,
            partnerships and strategic priorities. Africa has an opportunity
            to shape what comes next.»
          </p>

          <h3 className="mt-12 text-center text-2xl font-bold text-white">
            CHOOSE YOUR MANDATE
          </h3>

          <div className="mt-8 grid gap-4 md:grid-cols-2">

            <button
              onClick={() => openConversion('country')}
              className="rounded-xl bg-white p-6 text-left transition hover:bg-gray-50"
            >
              <span className="font-bold text-blue-900">
                I REPRESENT AN AFRICAN COUNTRY
              </span>

              <span className="mt-2 block text-sm text-gray-600">
                Apply for a Country-Specific Investment Roundtable
              </span>
            </button>

            <button
              onClick={() => openConversion('bloc')}
              className="rounded-xl bg-white p-6 text-left transition hover:bg-gray-50"
            >
              <span className="font-bold text-blue-900">
                I REPRESENT A FOREIGN COUNTRY / BLOC
              </span>

              <span className="mt-2 block text-sm text-gray-600">
                Request VIP / Institutional Participation
              </span>
            </button>

            <button
              onClick={() => openConversion('investor')}
              className="rounded-xl bg-white p-6 text-left transition hover:bg-gray-50"
            >
              <span className="font-bold text-blue-900">
                I AM AN INVESTOR
              </span>

              <span className="mt-2 block text-sm text-gray-600">
                Join the AEF Investor Network
              </span>
            </button>

            <button
              onClick={() => openConversion('project')}
              className="rounded-xl bg-white p-6 text-left transition hover:bg-gray-50"
            >
              <span className="font-bold text-blue-900">
                I HAVE A PROJECT
              </span>

              <span className="mt-2 block text-sm text-gray-600">
                Submit an Investment Opportunity
              </span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/contact"
              className="inline-flex rounded-lg bg-teal-600 px-7 py-3 font-semibold text-white hover:bg-teal-700"
            >
              BECOME AN AEF PARTNER
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
              AFRICA ECONOMIC FORUM
            </p>

            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-gray-600">
              THE GLOBAL PLATFORM FOR AFRICA’S CAPITAL, PARTNERSHIPS AND
              ECONOMIC TRANSFORMATION.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Kinshasa | 10–11 November 2026
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
                Africa Economic Forum
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Investments. Alliances. Strategic Opportunities.
              </p>
            </div>

            <div className="flex flex-wrap gap-5 text-sm text-gray-300">
              <a
                href="#about-aef"
                className="transition-colors hover:text-teal-400"
              >
                ABOUT AEF
              </a>

              <a
                href="#why-kinshasa"
                className="transition-colors hover:text-teal-400"
              >
                WHY KINSHASA
              </a>

              <a
                href="#programme"
                className="transition-colors hover:text-teal-400"
              >
                PROGRAMME
              </a>

              <Link
                to="/intervenants"
                className="transition-colors hover:text-teal-400"
              >
                SPEAKERS
              </Link>

              <a
                href="#deal-ecosystem"
                className="transition-colors hover:text-teal-400"
              >
                DEAL ECOSYSTEM
              </a>

              <a
                href="#partners"
                className="transition-colors hover:text-teal-400"
              >
                PARTNERS
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-gray-400">
            © 2026 Africa Economic Forum. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ===================================================
          CONVERSION JOURNEY MODAL
          =================================================== */}

      {conversionType && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-7">

            <div className="flex items-center justify-between">
              <h2 className="max-w-xl text-2xl font-bold text-gray-900">
                {conversionConfigs[conversionType].title}
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
                        placeholder={field}
                      />
                    </div>
                  )
                )}

                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                >
                  SUBMIT
                </button>
              </form>
            )}

            {conversionMessage && (
              <button
                onClick={() => setConversionType(null)}
                className="mt-6 rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-teal-600 hover:text-teal-600"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}

      {/* ===================================================
          CHAIRMAN MODAL
          =================================================== */}

      {showChairmanModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-7">

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Chairman's Message
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

              <p>
                Across two days, participants will engage in high-level
                discussions, curated meetings, sector investment
                conversations and deal-making sessions.
              </p>

              <p className="font-semibold text-gray-900">
                We look forward to welcoming you to Kinshasa on 10–11
                November 2026.
              </p>
            </div>

            <button
              onClick={() => setShowChairmanModal(false)}
              className="mt-8 rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ===================================================
          PROGRAMME MODAL
          =================================================== */}

      {showProgrammeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">

          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-7">

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Full Programme
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
                Download PDF
              </a>

              <button
                onClick={() =>
                  setShowProgrammeModal(false)
                }
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-teal-600 hover:text-teal-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================
          REGISTRATION MODAL
          =================================================== */}

      {showRegistrationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">

          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-7">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Register for AEF 2026
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  10–11 November 2026 · Kinshasa
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
                  Full name
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
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Email
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
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Organization
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
                  placeholder="Organization / Company"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-900">
                  Category
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
                    Select your category
                  </option>

                  {registrationCategories.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
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

      {/* ===================================================
          SIGN IN MODAL
          =================================================== */}

      {showSignInModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-7">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold text-gray-900">
                Sign in
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
              Please use the account access available on the AEF platform.
            </p>

            <div className="mt-7 flex gap-3">

              <Link
                to="/login"
                onClick={() =>
                  setShowSignInModal(false)
                }
                className="rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Continue
              </Link>

              <button
                onClick={() => {
                  setShowSignInModal(false);
                  setShowCreateAccountModal(true);
                }}
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-teal-600 hover:text-teal-600"
              >
                Create account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================
          CREATE ACCOUNT MODAL
          =================================================== */}

      {showCreateAccountModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-7">

            <div className="flex items-center justify-between">

              <h2 className="text-2xl font-bold text-gray-900">
                Create account
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
              Create your AEF account to access the platform.
            </p>

            <Link
              to="/register"
              onClick={() =>
                setShowCreateAccountModal(false)
              }
              className="mt-7 block rounded-lg bg-blue-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-800"
            >
              Create account
            </Link>
          </div>
        </div>
      )}

    </div>
  );
      }
