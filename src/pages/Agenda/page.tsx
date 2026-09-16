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
        'Africa's strategic positioning',
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
        'Who will finance the energy infrastructure required for Africa's next economic cycle?',
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
        'TOURISM — BUILDING AFRICA'S NEXT DESTINATION ECONOMIES',
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
   PAGE
   =================================================== */

export default function AgendaPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [showSignInModal, setShowSignInModal] =
    useState(false);

  const [showChairmanModal, setShowChairmanModal] =
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

  const [expandedDay, setExpandedDay] = useState<'day1' | 'day2' | null>(null);

  /* ===================================================
     TOGGLE SESSION
     =================================================== */

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
     REGISTRATION
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
     RENDU SESSION
     =================================================== */

  const renderSession = (session: Session, dayTitle: string) => {
    const sessionKey =
      `${dayTitle}-${session.time}-${session.title}`;

    const isExpanded =
      expandedSessions.has(sessionKey);

    return (
      <div
        key={sessionKey}
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300"
      >
        {/* PARTIE PRINCIPALE — TOUJOURS VISIBLE */}
        <div className="grid gap-5 p-5 md:grid-cols-[150px_1fr_auto] md:items-start">
          {/* HEURE */}
          <div className="font-bold text-blue-900">
            {session.time}
          </div>

          {/* TITRE + DESCRIPTION */}
          <div>
            <h4 className="text-xl font-bold leading-tight text-gray-900">
              {session.title}
            </h4>

            <p className="mt-2 text-sm font-semibold leading-6 text-gray-700">
              {session.description}
            </p>
          </div>

          {/* BOUTON */}
          <button
            type="button"
            onClick={() => toggleSession(sessionKey)}
            aria-expanded={isExpanded}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50"
          >
            {isExpanded
              ? 'HIDE'
              : 'VIEW'}

            <span
              className={`text-base transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            >
              ↓
            </span>
          </button>
        </div>

        {/* CONTENU DÉTAILLÉ — REPLIABLE */}
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
  };

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
              href="#programme"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              PROGRAMME
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
          HERO SECTION
          =================================================== */}

      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/tour-kinshasa.jpg')",
          }}
        />

        {/* Overlay bleu foncé */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 to-blue-800/75" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-40">
          <div className="max-w-5xl">

            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              AFRICA'S NEXT INVESTMENT CORRIDORS ARE BEING BUILT IN KINSHASA.
            </h1>

            <p className="mt-8 text-lg font-semibold leading-8 text-blue-100">
              AFRICA AND GLOBAL REALIGNMENT:
            </p>

            <p className="mt-2 text-xl font-bold leading-8 text-white">
              INVESTMENTS, ALLIANCES &amp; STRATEGIC OPPORTUNITIES
            </p>

            <p className="mt-6 text-sm leading-6 text-blue-200">
              10–11 November 2026 | Fleuve Congo Hotel | Kinshasa,
              Democratic Republic of Congo
            </p>

            <p className="mt-6 max-w-3xl text-base leading-7 text-blue-100">
              «Two days where governments, global capital, strategic
              industries and project owners come together to build the
              next generation of investment corridors into and across
              Africa.»
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
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
                className="rounded-lg border-2 border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                BECOME AN AEF PARTNER
              </Link>

              <a
                href={agendaPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border-2 border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Download Agenda
              </a>
            </div>

            <p className="mt-6 text-sm font-medium text-blue-100">
              For Governments | Investors | Project Owners | Strategic Partners
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================
          CHAIRMAN MESSAGE SECTION
          =================================================== */}

      <section className="bg-gradient-to-r from-blue-900 via-blue-700 to-teal-600">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              A Message from the Chairman
            </h2>

            <p className="mt-4 text-lg leading-8 text-blue-100">
              Discover the vision and strategic direction shaping The Africa Economic Forum 2026
            </p>

            <button
              onClick={() => setShowChairmanModal(true)}
              className="mt-8 rounded-lg bg-white px-8 py-3 font-semibold text-blue-900 transition-colors hover:bg-gray-100"
            >
              Read the Full Message
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================
          PROGRAMME SECTION
          =================================================== */}

      <section id="programme" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            PROGRAMME
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-5xl">
            TWO DAYS. ONE ECONOMIC MISSION.
          </h2>

          <div className="mt-10 space-y-6">

            {/* DAY ONE CARD */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <button
                onClick={() =>
                  setExpandedDay(
                    expandedDay === 'day1' ? null : 'day1'
                  )
                }
                className="w-full px-7 py-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-teal-600 uppercase">
                      DAY ONE
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      THE GEOPOLITICS OF CAPITAL
                    </h3>
                  </div>

                  <span
                    className={`text-2xl text-teal-600 transition-transform duration-300 ${
                      expandedDay === 'day1' ? 'rotate-180' : ''
                    }`}
                  >
                    ↓
                  </span>
                </div>
              </button>

              {expandedDay === 'day1' && (
                <div className="border-t border-gray-100 bg-gray-50 px-7 py-8">
                  <div className="space-y-6">
                    {dayOne.sessions.map((session) =>
                      renderSession(session, dayOne.title)
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* DAY TWO CARD */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <button
                onClick={() =>
                  setExpandedDay(
                    expandedDay === 'day2' ? null : 'day2'
                  )
                }
                className="w-full px-7 py-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-teal-600 uppercase">
                      DAY TWO
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900">
                      FROM STRATEGIC CAPITAL TO SECTOR OPPORTUNITIES
                    </h3>
                  </div>

                  <span
                    className={`text-2xl text-teal-600 transition-transform duration-300 ${
                      expandedDay === 'day2' ? 'rotate-180' : ''
                    }`}
                  >
                    ↓
                  </span>
                </div>
              </button>

              {expandedDay === 'day2' && (
                <div className="border-t border-gray-100 bg-gray-50 px-7 py-8">
                  <div className="space-y-6">
                    {dayTwo.sessions.map((session) =>
                      renderSession(session, dayTwo.title)
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

          <div className="mt-8 flex gap-3">
            <a
              href={agendaPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-blue-900 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Download Full Agenda (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* ===================================================
          FINAL CTA
          =================================================== */}

      <section className="bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <h2 className="text-center text-3xl font-bold text-white md:text-5xl">
            CHOOSE YOUR MANDATE
          </h2>

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
          FOOTER
          =================================================== */}

      <footer className="bg-gray-900 py-12 text-white">
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
                href="#programme"
                className="transition-colors hover:text-teal-400"
              >
                PROGRAMME
              </a>

              <Link
                to="/contact"
                className="transition-colors hover:text-teal-400"
              >
                CONTACT
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-gray-400">
            © 2026 Africa Economic Forum. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ===================================================
          MODALS (Conversion, Chairman, Registration, SignIn)
          =================================================== */}

      {/* CONVERSION MODAL */}
      {conversionType && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 className="max-w-xl text-2xl font-bold text-gray-900">
                {conversionType === 'country' && 'APPLY FOR A COUNTRY-SPECIFIC INVESTMENT ROUNDTABLE'}
                {conversionType === 'bloc' && 'REQUEST VIP / INSTITUTIONAL PARTICIPATION'}
                {conversionType === 'investor' && 'JOIN THE AEF INVESTOR NETWORK'}
                {conversionType === 'project' && 'SUBMIT AN INVESTMENT OPPORTUNITY'}
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
                {conversionType && (
                  <>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">
                        Organization / Country
                      </label>
                      <input
                        required
                        type="text"
                        value={conversionData['organization'] || ''}
                        onChange={(e) =>
                          setConversionData({
                            ...conversionData,
                            organization: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        value={conversionData['name'] || ''}
                        onChange={(e) =>
                          setConversionData({
                            ...conversionData,
                            name: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        value={conversionData['email'] || ''}
                        onChange={(e) =>
                          setConversionData({
                            ...conversionData,
                            email: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={conversionData['message'] || ''}
                        onChange={(e) =>
                          setConversionData({
                            ...conversionData,
                            message: e.target.value,
                          })
                        }
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-teal-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                    >
                      SUBMIT
                    </button>
                  </>
                )}
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

      {/* CHAIRMAN MODAL */}
      {showChairmanModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                The Vision Behind The Africa Economic Forum 2026
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
                The world is recalibrating. The old paradigms are shifting, and in this new
                geopolitical and economic landscape, Africa emerges not as a spectator
                but as the definitive arena of opportunity. The Africa Economic Forum is
                the platform where this new reality is forged.
              </p>

              <p>
                We are <strong>The African Table.</strong> It is Africa that extends the invitation, sets the
                agenda, and defines the terms of a truly strategic, win-win cooperation.
              </p>

              <p>
                Our model is deliberate: a perpetual, year-long journey across the
                continent, diving deep into each critical sector. We move from high-level
                consensus to granular deal-making, ensuring that every conversation is
                purpose-driven and outcome-oriented.
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

      {/* REGISTRATION MODAL */}
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
                  <option value="">Select your category</option>
                  <option>CEO / Business Leader</option>
                  <option>Investor / Fund</option>
                  <option>Government / Public Sector</option>
                  <option>Project Developer</option>
                  <option>Other</option>
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

      {/* SIGN IN MODAL */}
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

            <Link
              to="/login"
              onClick={() =>
                setShowSignInModal(false)
              }
              className="mt-7 block rounded-lg bg-blue-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-800"
            >
              Continue to Login
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
