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

const days: Day[] = [
  {
    title: 'DAY ONE — THE GEOPOLITICS OF CAPITAL',
    subtitle:
      'Global capital, strategic alliances and Africa’s position in the new investment order.',
    sessions: [
      {
        time: '08:00–09:00',
        title: 'DIPLOMATIC BREAKFAST — MINISTERS × GULF INVESTORS × CEOs',
        description:
          'A curated opening bringing government priorities, capital and corporate leadership into the same room.',
        format: 'Curated 1:1 conversations',
        purpose:
          'Identify relationships, investment priorities and strategic opportunities.',
        dealTrack:
          'DEAL MATCHMAKING — Sector × Geography × Capital × Project × Partnership',
      },
      {
        time: '09:00–10:30',
        title:
          'AFRICA IN THE GEOPOLITICS OF INVESTMENT — HOW AFRICA CAN LEVERAGE US–CHINA–GULF RIVALRIES FOR CAPITAL FLOWS',
        description:
          'A strategic examination of the forces reshaping investment flows into Africa.',
        questions: [
          'Global investor sentiment',
          'Gulf capital',
          'Equity versus debt',
          'Technology investment',
          'Africa’s strategic positioning',
        ],
        dealTrack: 'AFRICA–GULF INVESTMENT PIPELINE',
      },
      {
        time: '10:30–12:00',
        title:
          'CURRENCY WARS & FINANCIAL SOVEREIGNTY — DOLLAR. YUAN. GOLD. DIGITAL ASSETS.',
        description:
          'Exploring currency risk, financial sovereignty and new instruments of strategic capital.',
        questions: [
          'Currency risk',
          'Financial sovereignty',
          'Gold and tangible assets',
          'Blockchain',
          'Development finance',
        ],
        dealTrack: 'STRATEGIC FINANCIAL PARTNERSHIPS',
      },
      {
        time: '12:00–14:00',
        title:
          'THE VIP LUNCHEON — WHERE COUNTRIES, CAPITAL AND STRATEGIC PARTNERS SIT AT THE SAME TABLE.',
        description:
          'A highly curated investment environment connecting decision-makers around priority opportunities.',
        dealTrack: '10 CURATED INVESTMENT TABLES',
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
        time: '14:00–15:30',
        title:
          'TECHNOLOGY & DIGITAL SOVEREIGNTY — CAN AFRICA BUILD DIGITAL INFRASTRUCTURE ON ITS OWN TERMS?',
        description:
          'Technology as infrastructure, capital strategy and a pillar of economic sovereignty.',
        focus: [
          'AI',
          'Fintech',
          'Digital Infrastructure',
          'Patient Capital',
          'Technology Partnerships',
        ],
        dealTrack: 'TECHNOLOGY PARTNERSHIPS & INVESTMENT',
      },
      {
        time: '15:30–17:00',
        title: 'ENERGY & NEW ALLIANCES — OIL. GAS. GREEN. NUCLEAR.',
        description:
          'Africa’s energy transition examined through the lens of financing, security and industrialisation.',
        questions: [
          'How to finance energy infrastructure',
          'Energy security',
          'Industrialisation',
          'Energy transition',
          'Long-term capital',
        ],
        dealTrack: 'SELECTED AFRICAN ENERGY PROJECTS',
      },
      {
        time: '17:00–18:30',
        title:
          'THE GRAND AFRICAN DEAL — WHERE STRATEGIC INTENT BECOMES VISIBLE.',
        description:
          'The moment where strategic discussions move toward visible commitments and partnerships.',
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
        title: 'CLOSED-DOOR SIGNINGS — THE DEAL ROOM REMAINS OPEN.',
        description:
          'Selected negotiations and strategic discussions continue beyond the public programme.',
        purpose:
          'Continue selected negotiations in a private environment.',
      },
    ],
  },
  {
    title: 'DAY TWO — FROM STRATEGIC CAPITAL TO SECTOR OPPORTUNITIES',
    subtitle:
      'Moving from geopolitical positioning to concrete sector opportunities and executable projects.',
    sessions: [
      {
        time: '08:00–09:00',
        title:
          'SECTOR INVESTMENT BREAKFASTS — AGRICULTURE • CRITICAL MINERALS • HEALTH • INFRASTRUCTURE • TOURISM',
        description:
          'Focused sector tables connecting priorities, projects, investors and strategic partners.',
        dealTrack:
          'Sector → Priority → Projects → Capital → Partners',
      },
      {
        time: '09:00–10:30',
        title:
          'THE INTRA-AFRICAN TRADE REVOLUTION — FROM BORDERS TO DIGITAL CORRIDORS.',
        description:
          'The infrastructure, financial and digital systems required to accelerate intra-African commerce.',
        focus: [
          'Pan-African Payments',
          'Border Modernisation',
          'Digital Trade',
          'AfCFTA',
          'Market Access',
        ],
        dealTrack: 'AFRICA TRADE GATEWAY',
      },
      {
        time: '10:30–12:00',
        title:
          'SECTOR DEAL TRACKS — FROM STRATEGIC CAPITAL TO EXECUTABLE SECTOR OPPORTUNITIES.',
        description:
          'Dedicated investment tracks focused on priority sectors and executable opportunities.',
        focus: [
          'Agriculture & Agri-Tech',
          'Critical Minerals',
          'Health Sovereignty',
          'Infrastructure',
          'Tourism',
        ],
        dealTrack:
          'Sector → Project → Capital → Partner → Execution',
      },
      {
        time: '12:00–14:00',
        title:
          'DEAL-MAKING LUNCHES — COUNTRY. CAPITAL. PROJECT. TABLE.',
        description:
          'Structured investment tables designed to move opportunities toward actionable next steps.',
        dealTrack:
          'Government Priority → Project → Capital Requirement → Investor → Next Step',
      },
      {
        time: '14:00–15:30',
        title:
          'COMMERCE WARS — AFRICA BETWEEN COMPETING TRADE BLOCS.',
        description:
          'Examining trade realignment, market access and Africa’s strategic autonomy.',
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
        time: '15:30–17:00',
        title: 'THE FUTURE ECONOMY — FIVE INVESTMENT FRONTIERS',
        description:
          'Five emerging areas where strategic capital can shape Africa’s next economic cycle.',
        focus: [
          'FUTURE FOOD',
          'SPACE & STRATEGIC RESOURCES',
          'AI & HEALTH',
          'NEXT-GENERATION INFRASTRUCTURE',
          'FUTURE TOURISM',
        ],
      },
      {
        time: '17:00–18:30',
        title:
          'CLOSING DEAL RALLY — WHAT MOVED FROM CONVERSATION TO COMMITMENT?',
        description:
          'A closing review of investment activity and verified outcomes emerging from the Forum.',
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
  },
];

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

const conversionConfigs = {
  country: {
    title: 'BRING A COUNTRY OPPORTUNITY',
    description:
      'Present a priority investment opportunity from a government or public institution.',
    fields: ['Country', 'Ministry / Institution', 'Priority Sector', 'Project / Opportunity'],
  },
  bloc: {
    title: 'REPRESENT A STRATEGIC BLOC',
    description:
      'Connect a strategic regional or international bloc with African opportunities.',
    fields: ['Organisation', 'Region / Bloc', 'Strategic Interest', 'Partnership Opportunity'],
  },
  investor: {
    title: 'BRING CAPITAL',
    description:
      'Connect your investment mandate with qualified African opportunities.',
    fields: ['Investment Firm', 'Investment Focus', 'Ticket Size', 'Target Sectors'],
  },
  project: {
    title: 'BRING A PROJECT',
    description:
      'Submit a project requiring strategic capital, partners or execution support.',
    fields: ['Project Name', 'Country', 'Sector', 'Capital Requirement'],
  },
};

export default function AgendaPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] =
    useState(false);
  const [showChairmanModal, setShowChairmanModal] = useState(false);
  const [showProgrammeModal, setShowProgrammeModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] =
    useState(false);

  const [expandedSessions, setExpandedSessions] = useState<
    Set<string>
  >(new Set());

  const [conversionType, setConversionType] =
    useState<ConversionType>(null);

  const [conversionMessage, setConversionMessage] = useState('');

  const [conversionData, setConversionData] = useState<
    Record<string, string>
  >({});

  const [registrationData, setRegistrationData] = useState({
    full_name: '',
    email: '',
    organization: '',
    category: '',
  });

  const [registrationMessage, setRegistrationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  };

  const handleConversionSubmit = (
    eventSubmit: React.FormEvent<HTMLFormElement>
  ) => {
    eventSubmit.preventDefault();

    setConversionMessage(
      'Thank you. Your strategic opportunity has been recorded for AEF engagement.'
    );
  };

  const handleRegister = async (
    eventSubmit: React.FormEvent<HTMLFormElement>
  ) => {
    eventSubmit.preventDefault();

    if (
      !registrationData.full_name ||
      !registrationData.email ||
      !registrationData.organization ||
      !registrationData.category
    ) {
      setRegistrationMessage(
        'Please complete all required fields.'
      );
      return;
    }

    setIsSubmitting(true);
    setRegistrationMessage('');

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
            'This email address is already registered for the event.'
          );
        } else {
          setRegistrationMessage(
            'Registration could not be completed. Please try again.'
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

  const intervenantsApercu = listeIntervenants
    .filter(
      (speaker: any) =>
        String(speaker.statut || '').toLowerCase() === 'confirmé'
    )
    .slice(0, 4);

  const intervenantsInvites = listeIntervenants
    .filter(
      (speaker: any) =>
        String(speaker.statut || '').toLowerCase() === 'invité'
    )
    .slice(0, 8);

  const renderDay = (day: Day) => {
    return (
      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600">
            AEF 2026 PROGRAMME
          </p>

          <h3 className="mt-3 text-2xl font-bold text-gray-900 md:text-3xl">
            {day.title}
          </h3>

          {day.subtitle && (
            <p className="mt-3 max-w-3xl text-gray-600">
              {day.subtitle}
            </p>
          )}
        </div>

        {day.sessions.map((session) => {
          const sessionKey = `${day.title}-${session.time}-${session.title}`;
          const isExpanded = expandedSessions.has(sessionKey);

          return (
            <div
              key={sessionKey}
              className="overflow-hidden border border-gray-200 bg-white transition-shadow hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => toggleSession(sessionKey)}
                className="w-full text-left"
              >
                <div className="grid gap-5 p-5 md:grid-cols-[150px_1fr_auto] md:items-center md:p-7">

                  <div>
                    <span className="text-sm font-bold tracking-wide text-teal-600">
                      {session.time}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold leading-snug text-gray-900">
                      {session.title}
                    </h4>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {session.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                    <span>
                      {isExpanded
                        ? 'HIDE DETAILS'
                        : 'VIEW DETAILS'}
                    </span>

                    <svg
                      className={`h-5 w-5 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50 px-5 py-6 md:px-7">

                  <div className="grid gap-6 md:grid-cols-2">

                    {session.format && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                          Format
                        </p>
                        <p className="mt-2 text-sm leading-6 text-gray-800">
                          {session.format}
                        </p>
                      </div>
                    )}

                    {session.purpose && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                          Purpose
                        </p>
                        <p className="mt-2 text-sm leading-6 text-gray-800">
                          {session.purpose}
                        </p>
                      </div>
                    )}

                    {session.questions &&
                      session.questions.length > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                            Strategic Questions
                          </p>

                          <ul className="mt-3 space-y-2">
                            {session.questions.map((question) => (
                              <li
                                key={question}
                                className="flex gap-2 text-sm text-gray-800"
                              >
                                <span className="text-teal-600">
                                  →
                                </span>
                                {question}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    {session.focus &&
                      session.focus.length > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                            Focus
                          </p>

                          <ul className="mt-3 space-y-2">
                            {session.focus.map((item) => (
                              <li
                                key={item}
                                className="flex gap-2 text-sm text-gray-800"
                              >
                                <span className="text-teal-600">
                                  →
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                  </div>

                  {session.dealTrack && (
                    <div className="mt-6 border-l-4 border-teal-600 bg-white p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-600">
                        Deal Track
                      </p>

                      <p className="mt-2 text-sm font-semibold leading-6 text-gray-900">
                        {session.dealTrack}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* =========================================================
          HEADER / MAIN NAVIGATION
      ========================================================= */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex h-20 items-center justify-between">

            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663871965391/2w4JXG2uJYw8u5dL3m6J3B/aef-logo_8c9c8e6d.png"
                alt="Africa Economic Forum"
                className="h-12 w-auto"
              />
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden items-center gap-5 xl:flex">

              <Link
                to="/"
                className="text-xs font-medium text-gray-700 transition-colors hover:text-teal-600"
              >
                HOME
              </Link>

              <Link
                to="/about"
                className="text-xs font-medium text-gray-700 transition-colors hover:text-teal-600"
              >
                ABOUT AEF
              </Link>

              <Link
                to="/initiatives"
                className="text-xs font-medium text-gray-700 transition-colors hover:text-teal-600"
              >
                INITIATIVES
              </Link>

              <Link
                to="/stakeholders"
                className="text-xs font-medium text-gray-700 transition-colors hover:text-teal-600"
              >
                STAKEHOLDERS
              </Link>

              <Link
                to="/agenda"
                className="text-xs font-bold text-teal-600"
              >
                AGENDA
              </Link>

              <Link
                to="/publications"
                className="text-xs font-medium text-gray-700 transition-colors hover:text-teal-600"
              >
                PUBLICATIONS
              </Link>

              <Link
                to="/meetings"
                className="text-xs font-medium text-gray-700 transition-colors hover:text-teal-600"
              >
                MEETINGS
              </Link>

              <Link
                to="/contact"
                className="text-xs font-medium text-gray-700 transition-colors hover:text-teal-600"
              >
                CONTACT
              </Link>

              <Link
                to="/partners"
                className="text-xs font-medium text-gray-700 transition-colors hover:text-teal-600"
              >
                PARTNERS
              </Link>

            </nav>

            {/* DESKTOP ACTIONS */}
            <div className="hidden items-center gap-3 xl:flex">

              <button
                type="button"
                onClick={() => setShowRegistrationModal(true)}
                className="rounded-md bg-teal-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-teal-700"
              >
                GET YOUR DELEGATE PASS
              </button>

              {user ? (
                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    navigate('/');
                  }}
                  className="text-xs font-semibold text-gray-700 hover:text-teal-600"
                >
                  SIGN OUT
                </button>
              ) : (
                <Link
                  to="/signin"
                  className="text-xs font-semibold text-gray-700 hover:text-teal-600"
                >
                  SIGN IN
                </Link>
              )}

            </div>

            {/* MOBILE BUTTON */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((previous) => !previous)
              }
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 xl:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>

          </div>

          {/* =====================================================
              MOBILE NAVIGATION
          ===================================================== */}
          {mobileMenuOpen && (
            <div className="border-t border-gray-200 py-4 xl:hidden">

              <nav className="flex flex-col">

                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 px-2 py-3 text-sm font-medium text-gray-700 hover:text-teal-600"
                >
                  HOME
                </Link>

                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 px-2 py-3 text-sm font-medium text-gray-700 hover:text-teal-600"
                >
                  ABOUT AEF
                </Link>

                <Link
                  to="/initiatives"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 px-2 py-3 text-sm font-medium text-gray-700 hover:text-teal-600"
                >
                  INITIATIVES
                </Link>

                <Link
                  to="/stakeholders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 px-2 py-3 text-sm font-medium text-gray-700 hover:text-teal-600"
                >
                  STAKEHOLDERS
                </Link>

                <Link
                  to="/agenda"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 px-2 py-3 text-sm font-bold text-teal-600"
                >
                  AGENDA
                </Link>

                <Link
                  to="/publications"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 px-2 py-3 text-sm font-medium text-gray-700 hover:text-teal-600"
                >
                  PUBLICATIONS
                </Link>

                <Link
                  to="/meetings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 px-2 py-3 text-sm font-medium text-gray-700 hover:text-teal-600"
                >
                  MEETINGS
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 px-2 py-3 text-sm font-medium text-gray-700 hover:text-teal-600"
                >
                  CONTACT
                </Link>

                <Link
                  to="/partners"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border-b border-gray-100 px-2 py-3 text-sm font-medium text-gray-700 hover:text-teal-600"
                >
                  PARTNERS
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowRegistrationModal(true);
                  }}
                  className="mt-4 rounded-md bg-teal-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-teal-700"
                >
                  GET YOUR DELEGATE PASS
                </button>

                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-3 rounded-md border border-gray-300 px-4 py-3 text-center text-sm font-bold text-gray-800 hover:border-teal-600 hover:text-teal-600"
                >
                  BECOME AN AEF PARTNER
                </Link>

                {user ? (
                  <button
                    type="button"
                    onClick={async () => {
                      await signOut();
                      setMobileMenuOpen(false);
                      navigate('/');
                    }}
                    className="mt-3 px-2 py-3 text-left text-sm font-semibold text-gray-700 hover:text-teal-600"
                  >
                    SIGN OUT
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-3 px-2 py-3 text-sm font-semibold text-gray-700 hover:text-teal-600"
                  >
                    SIGN IN
                  </Link>
                )}

              </nav>

            </div>
          )}

        </div>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('/images/tour-kinshasa.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-blue-950/30" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">

          <div className="max-w-5xl">

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
              Two days where governments, global capital, strategic
              industries and project owners come together to build
              the next generation of investment corridors into and
              across Africa.
            </p>

            {/* HERO BUTTONS */}
            <div className="mt-8 flex flex-wrap items-center gap-4">

              <button
                type="button"
                onClick={() => setShowRegistrationModal(true)}
                className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 shadow-sm transition-colors hover:bg-gray-100"
              >
                GET YOUR DELEGATE PASS
              </button>

              <Link
                to="/contact"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-900 shadow-sm transition-colors hover:bg-gray-100"
              >
                BECOME AN AEF PARTNER
              </Link>

              <a
                href={agendaPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
              >
                DOWNLOAD AGENDA
              </a>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          THE PREMISE
      ========================================================= */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="max-w-4xl">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              02 — THE PREMISE
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Africa is entering a new investment cycle.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Capital is being repositioned. Strategic alliances are
              changing. Supply chains are being redesigned. New
              investment corridors are emerging.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              AEF creates the environment where governments, capital,
              projects and strategic partners can meet around concrete
              opportunities.
            </p>

          </div>

        </div>
      </section>

      {/* =========================================================
          WHAT IS AEF
      ========================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
                03 — WHAT IS AEF?
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Where Governments + Capital + Projects + Strategic Partners Meet.
              </h2>
            </div>

            <div className="text-lg leading-8 text-gray-600">
              <p>
                AEF is where governments bring opportunities, investors
                bring capital, international partners bring markets and
                expertise, and projects meet the people who can finance
                and execute them.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                AEF is built around deal engagement, not speaking
                engagement.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          DEAL ARCHITECTURE
      ========================================================= */}
      <section className="bg-gray-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-400">
            04 — THE AEF DEAL ARCHITECTURE
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-bold md:text-5xl">
            From strategic intent to executable opportunity.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-4">

            {[
              ['01', 'GOVERNMENTS', 'Priority opportunities'],
              ['02', 'CAPITAL', 'Investment mandates'],
              ['03', 'PROJECTS', 'Executable opportunities'],
              ['04', 'PARTNERS', 'Markets, expertise & execution'],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="border border-white/20 p-6"
              >
                <span className="text-sm font-bold text-teal-400">
                  {number}
                </span>

                <h3 className="mt-5 text-xl font-bold">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-300">
                  {description}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =========================================================
          FOUR WAYS TO ENTER AEF
      ========================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              05 — FOUR WAYS TO ENTER AEF
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Bring the opportunity. Bring the capital. Build the connection.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                key: 'country' as ConversionType,
                title: 'BRING A COUNTRY',
                text: 'Present government priorities and investment opportunities.',
              },
              {
                key: 'bloc' as ConversionType,
                title: 'REPRESENT A BLOC',
                text: 'Connect strategic regions and international institutions.',
              },
              {
                key: 'investor' as ConversionType,
                title: 'BRING CAPITAL',
                text: 'Connect investment mandates with qualified opportunities.',
              },
              {
                key: 'project' as ConversionType,
                title: 'BRING A PROJECT',
                text: 'Put an executable project in front of strategic capital.',
              },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => openConversion(item.key)}
                className="group border border-gray-200 bg-white p-7 text-left transition-all hover:border-teal-600 hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {item.text}
                </p>

                <p className="mt-6 text-sm font-bold text-teal-600">
                  ENTER AEF →
                </p>
              </button>
            ))}

          </div>

        </div>
      </section>

      {/* =========================================================
          SPEAKERS
      ========================================================= */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
                06 — SPEAKERS
              </p>

              <h2 className="mt-4 text-3xl font-bold md:text-5xl">
                Decision-makers at the table.
              </h2>
            </div>

            <Link
              to="/intervenants"
              className="font-semibold text-teal-600 hover:text-teal-700"
            >
              VIEW ALL SPEAKERS →
            </Link>

          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {intervenantsApercu.map(
              (speaker: any, index: number) => (
                <div
                  key={speaker.id || index}
                  className="overflow-hidden bg-white shadow-sm"
                >
                  <div className="aspect-[4/5] bg-gray-200">
                    {speaker.photo ||
                    speaker.image ||
                    speaker.photoUrl ? (
                      <img
                        src={
                          speaker.photo ||
                          speaker.image ||
                          speaker.photoUrl
                        }
                        alt={
                          speaker.nom ||
                          speaker.name ||
                          'AEF Speaker'
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        AEF
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-gray-900">
                      {speaker.nom ||
                        speaker.name ||
                        'AEF Speaker'}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {speaker.fonction ||
                        speaker.role ||
                        speaker.title ||
                        ''}
                    </p>
                  </div>
                </div>
              )
            )}

          </div>

          {intervenantsInvites.length > 0 && (
            <div className="mt-16">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
                INVITED
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {intervenantsInvites.map(
                  (speaker: any, index: number) => (
                    <div
                      key={speaker.id || index}
                      className="border border-gray-200 bg-white px-4 py-3 text-sm"
                    >
                      {speaker.nom ||
                        speaker.name ||
                        'Invited Speaker'}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* =========================================================
          PROGRAMME INTRODUCTION
      ========================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
                07 — PROGRAMME
              </p>

              <h2 className="mt-4 text-3xl font-bold md:text-5xl">
                Two days. One objective: move from conversation to commitment.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Explore the programme below. Each session can be
                expanded to reveal its strategic focus and deal track.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowProgrammeModal(true)}
              className="shrink-0 rounded-md border border-gray-300 px-5 py-3 text-sm font-bold text-gray-900 hover:border-teal-600 hover:text-teal-600"
            >
              VIEW PROGRAMME OVERVIEW
            </button>

          </div>

        </div>
      </section>

      {/* =========================================================
          DAY ONE
      ========================================================= */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {renderDay(days[0])}
        </div>
      </section>

      {/* =========================================================
          DEAL MATCHMAKING
      ========================================================= */}
      <section className="bg-blue-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
            DEAL MATCHMAKING
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-bold md:text-5xl">
            Sector × Geography × Capital × Project × Partnership
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            AEF creates structured pathways for investors, governments,
            project owners and strategic partners to identify concrete
            opportunities.
          </p>

        </div>
      </section>

      {/* =========================================================
          INVESTMENT SHOWCASE
      ========================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            INVESTMENT SHOWCASE
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Opportunities ready for strategic engagement.
          </h2>

        </div>
      </section>

      {/* =========================================================
          DAY TWO
      ========================================================= */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {renderDay(days[1])}
        </div>
      </section>

      {/* =========================================================
          SECTOR DEAL TRACKS
      ========================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            SECTOR DEAL TRACKS
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-bold md:text-5xl">
            Five strategic sectors. One investment ecosystem.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">

            {[
              ['AGRICULTURE & AGRI-TECH', 'Food security, technology and productive investment.'],
              ['CRITICAL MINERALS', 'Resources, processing and strategic industrial partnerships.'],
              ['HEALTH SOVEREIGNTY', 'Healthcare infrastructure, technology and investment.'],
              ['INFRASTRUCTURE', 'PPP, connectivity, logistics and long-term capital.'],
              ['TOURISM', 'Destination development, hospitality and strategic investment.'],
            ].map(([title, description]) => (
              <div
                key={title}
                className="border border-gray-200 p-6"
              >
                <h3 className="font-bold text-gray-900">
                  {title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {description}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =========================================================
          FUTURE ECONOMY
      ========================================================= */}
      <section className="bg-gray-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-400">
            THE FUTURE ECONOMY
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-bold md:text-5xl">
            Five investment frontiers shaping Africa’s next economy.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-5">

            {[
              'FUTURE FOOD',
              'SPACE & STRATEGIC RESOURCES',
              'AI & HEALTH',
              'NEXT-GENERATION INFRASTRUCTURE',
              'FUTURE TOURISM',
            ].map((item, index) => (
              <div
                key={item}
                className="border border-white/20 p-6"
              >
                <span className="text-sm font-bold text-teal-400">
                  0{index + 1}
                </span>

                <h3 className="mt-8 font-bold">
                  {item}
                </h3>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =========================================================
          CLOSING DEAL RALLY
      ========================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="max-w-4xl">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              CLOSING DEAL RALLY
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              What moved from conversation to commitment?
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              The closing session focuses on verified investments,
              MoUs, joint ventures, financing agreements, trade
              partnerships and strategic alliances.
            </p>

          </div>

        </div>
      </section>

      {/* =========================================================
          THE DEAL ROOM
      ========================================================= */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            THE DEAL ROOM
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            The conversations continue beyond the stage.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Selected government representatives, investors, project
            owners and strategic partners can continue discussions
            through closed-door meetings.
          </p>

        </div>
      </section>

      {/* =========================================================
          COUNTRY ROUNDTABLES
      ========================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            COUNTRY-SPECIFIC INVESTMENT ROUNDTABLES
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Government priorities meet strategic capital.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Curated country-level conversations designed around
            specific investment priorities and executable opportunities.
          </p>

        </div>
      </section>

      {/* =========================================================
          VIP LUNCHEON
      ========================================================= */}
      <section className="bg-blue-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
            VIP LUNCHEON
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-bold md:text-5xl">
            Where countries, capital and strategic partners sit at the same table.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-6">

            {[
              'Tech Exit Strategies',
              'Infrastructure PPPs',
              'Energy Finance',
              'Critical Minerals',
              'Gulf–Africa Investment',
              'Industrial Partnerships',
            ].map((item) => (
              <div
                key={item}
                className="border border-white/20 p-5 text-sm font-semibold"
              >
                {item}
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =========================================================
          COFFEE WITH PRESIDENTS
      ========================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="max-w-4xl">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
              COFFEE WITH PRESIDENTS
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Direct access to leadership.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              A curated setting for strategic conversations between
              national leadership, investors and international partners.
            </p>

          </div>

        </div>
      </section>

      {/* =========================================================
          WHY KINSHASA
      ========================================================= */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            WHY KINSHASA
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-bold md:text-5xl">
            A strategic meeting point for Africa’s next investment corridors.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Kinshasa provides a platform for governments, investors,
            strategic industries and project owners to engage around
            Africa’s evolving economic and investment landscape.
          </p>

        </div>
      </section>

      {/* =========================================================
          WHO WILL BE AT THE TABLE
      ========================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            WHO WILL BE AT THE TABLE?
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            {registrationCategories.slice(0, 8).map((category) => (
              <div
                key={category}
                className="border border-gray-200 p-5"
              >
                <p className="font-semibold text-gray-900">
                  {category}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =========================================================
          ACCESS VS POSITION
      ========================================================= */}
      <section className="bg-gray-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="max-w-4xl">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-400">
              ACCESS VS POSITION
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              AEF is designed around access, relevance and deal engagement.
            </h2>

          </div>

        </div>
      </section>

      {/* =========================================================
          PARTNERSHIPS
      ========================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            AEF PARTNERSHIPS
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-5xl">
            Build the ecosystem around the opportunity.
          </h2>

          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-md bg-teal-600 px-6 py-3 font-bold text-white hover:bg-teal-700"
          >
            BECOME AN AEF PARTNER
          </Link>

        </div>
      </section>

      {/* =========================================================
          OUTCOME
      ========================================================= */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">
            THE OUTCOME
          </p>

          <h2 className="mt-4 max-w-4xl text-3xl font-bold md:text-5xl">
            We Don't Just Talk. We Deal.
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            AEF measures engagement through verified opportunities,
            investment conversations, strategic partnerships and
            projects advanced toward execution.
          </p>

        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-teal-600 py-20 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">

          <h2 className="text-3xl font-bold md:text-5xl">
            ENTER THE AFRICA ECONOMIC FORUM 2026
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-teal-50">
            Join the governments, investors, project owners and
            strategic partners building Africa’s next investment corridors.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <button
              type="button"
              onClick={() => setShowRegistrationModal(true)}
              className="rounded-lg bg-white px-6 py-3 font-bold text-teal-700 hover:bg-gray-100"
            >
              GET YOUR DELEGATE PASS
            </button>

            <Link
              to="/contact"
              className="rounded-lg border border-white px-6 py-3 font-bold text-white hover:bg-white hover:text-teal-700"
            >
              BECOME AN AEF PARTNER
            </Link>

          </div>

        </div>
      </section>

      {/* =========================================================
          FINAL BRAND MESSAGE
      ========================================================= */}
      <section className="bg-gray-950 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          <p className="text-2xl font-bold md:text-4xl">
            AFRICA ECONOMIC FORUM
          </p>

          <p className="mt-4 text-sm uppercase tracking-[0.25em] text-gray-400">
            We Don't Just Talk. We Deal.
          </p>

        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="bg-black py-12 text-gray-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-10 md:grid-cols-3">

            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663871965391/2w4JXG2uJYw8u5dL3m6J3B/aef-logo_8c9c8e6d.png"
                alt="Africa Economic Forum"
                className="h-12 w-auto brightness-0 invert"
              />

              <p className="mt-5 max-w-sm text-sm leading-6">
                Africa’s platform for governments, capital, projects
                and strategic partnerships.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-white">
                NAVIGATION
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

                <Link to="/" className="hover:text-white">
                  Home
                </Link>

                <Link to="/about" className="hover:text-white">
                  About AEF
                </Link>

                <Link to="/initiatives" className="hover:text-white">
                  Initiatives
                </Link>

                <Link to="/stakeholders" className="hover:text-white">
                  Stakeholders
                </Link>

                <Link to="/agenda" className="hover:text-white">
                  Agenda
                </Link>

                <Link to="/publications" className="hover:text-white">
                  Publications
                </Link>

                <Link to="/meetings" className="hover:text-white">
                  Meetings
                </Link>

                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>

              </div>
            </div>

            <div>
              <h3 className="font-bold text-white">
                AEF 2026
              </h3>

              <p className="mt-4 text-sm leading-6">
                10–11 November 2026
                <br />
                Fleuve Congo Hotel
                <br />
                Kinshasa, Democratic Republic of Congo
              </p>
            </div>

          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs">
            © {new Date().getFullYear()} Africa Economic Forum. All rights reserved.
          </div>

        </div>
      </footer>

      {/* =========================================================
          CONVERSION MODAL
      ========================================================= */}
      {conversionType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-7 md:p-10">

            <div className="flex items-start justify-between gap-5">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
                  AEF DEAL ECOSYSTEM
                </p>

                <h2 className="mt-3 text-2xl font-bold text-gray-900">
                  {conversionConfigs[conversionType].title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {conversionConfigs[conversionType].description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setConversionType(null)}
                className="text-2xl text-gray-400 hover:text-gray-900"
              >
                ×
              </button>

            </div>

            {!conversionMessage ? (
              <form
                onSubmit={handleConversionSubmit}
                className="mt-8 space-y-5"
              >
                {conversionConfigs[conversionType].fields.map(
                  (field) => {
                    const key = field.toLowerCase();

                    return (
                      <div key={field}>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          {field}
                        </label>

                        <input
                          type="text"
                          required
                          value={conversionData[key] || ''}
                          onChange={(eventInput) =>
                            setConversionData({
                              ...conversionData,
                              [key]: eventInput.target.value,
                            })
                          }
                          className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
                        />
                      </div>
                    );
                  }
                )}

                <button
                  type="submit"
                  className="w-full bg-teal-600 px-5 py-3 font-bold text-white hover:bg-teal-700"
                >
                  SUBMIT OPPORTUNITY
                </button>
              </form>
            ) : (
              <div className="mt-8 bg-gray-50 p-6">
                <p className="font-semibold text-gray-900">
                  {conversionMessage}
                </p>

                <button
                  type="button"
                  onClick={() => setConversionType(null)}
                  className="mt-5 bg-gray-900 px-5 py-3 text-sm font-bold text-white"
                >
                  CLOSE
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* =========================================================
          PROGRAMME MODAL
      ========================================================= */}
      {showProgrammeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">

          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-white p-7 md:p-10">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
                  AEF 2026
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Programme Overview
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowProgrammeModal(false)}
                className="text-2xl text-gray-400 hover:text-gray-900"
              >
                ×
              </button>
            </div>

            <div className="mt-8 space-y-4">
              {days.map((day) => (
                <div
                  key={day.title}
                  className="border border-gray-200 p-6"
                >
                  <h3 className="font-bold text-gray-900">
                    {day.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600">
                    {day.subtitle}
                  </p>

                  <p className="mt-4 text-sm font-semibold text-teal-600">
                    {day.sessions.length} sessions
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* =========================================================
          REGISTRATION MODAL
      ========================================================= */}
      {showRegistrationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-7 md:p-10">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
                  AEF 2026
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Get Your Delegate Pass
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Register your interest for Africa Economic Forum 2026.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowRegistrationModal(false);
                  setRegistrationMessage('');
                }}
                className="text-2xl text-gray-400 hover:text-gray-900"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleRegister}
              className="mt-8 space-y-5"
            >

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full Name *
                </label>

                <input
                  type="text"
                  required
                  value={registrationData.full_name}
                  onChange={(eventInput) =>
                    setRegistrationData({
                      ...registrationData,
                      full_name: eventInput.target.value,
                    })
                  }
                  className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Email *
                </label>

                <input
                  type="email"
                  required
                  value={registrationData.email}
                  onChange={(eventInput) =>
                    setRegistrationData({
                      ...registrationData,
                      email: eventInput.target.value,
                    })
                  }
                  className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Organization *
                </label>

                <input
                  type="text"
                  required
                  value={registrationData.organization}
                  onChange={(eventInput) =>
                    setRegistrationData({
                      ...registrationData,
                      organization: eventInput.target.value,
                    })
                  }
                  className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Category *
                </label>

                <select
                  required
                  value={registrationData.category}
                  onChange={(eventInput) =>
                    setRegistrationData({
                      ...registrationData,
                      category: eventInput.target.value,
                    })
                  }
                  className="w-full border border-gray-300 bg-white px-4 py-3 outline-none focus:border-teal-600"
                >
                  <option value="">
                    Select your category
                  </option>

                  {registrationCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {registrationMessage && (
                <div className="bg-gray-50 p-4 text-sm font-medium text-gray-800">
                  {registrationMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 px-5 py-3 font-bold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? 'SUBMITTING...'
                  : 'SUBMIT REGISTRATION'}
              </button>

            </form>

          </div>
        </div>
      )}

      {/* =========================================================
          CHAIRMAN MODAL
      ========================================================= */}
      {showChairmanModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">

          <div className="w-full max-w-3xl bg-white p-8 md:p-10">

            <div className="flex justify-between gap-5">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
                  A MESSAGE FROM THE CHAIRMAN
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  A Message of Chairman
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowChairmanModal(false)}
                className="text-2xl text-gray-400 hover:text-gray-900"
              >
                ×
              </button>

            </div>

            <div className="mt-8 text-base leading-8 text-gray-600">
              <p>
                Africa stands at a defining moment in the transformation
                of global investment, trade and strategic partnerships.
              </p>

              <p className="mt-5">
                The Africa Economic Forum creates a platform where
                governments, capital, projects and strategic partners
                can engage around the opportunities that will shape
                the continent’s next economic cycle.
              </p>

              <p className="mt-5 font-semibold text-gray-900">
                We Don't Just Talk. We Deal.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
