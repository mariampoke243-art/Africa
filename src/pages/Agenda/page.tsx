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
};

type Day = {
  title: string;
  sessions: Session[];
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

/* ===================================================
   PDF AGENDA EXISTANT
   =================================================== */

const agendaPdfUrl =
  '/images/AEF_2026_Kinshasa_Brochure_FINAL-1.pdf';

/* ===================================================
   DAY ONE
   =================================================== */

const dayOne: Day = {
  title: 'DAY ONE — THE GEOPOLITICS OF CAPITAL',
  sessions: [
    {
      time: '08:00–09:00',
      title: 'DIPLOMATIC BREAKFAST',
      description:
        'Ministers × Gulf Investors × CEOs. Curated 1:1 meetings focused on relationships, investment priorities and strategic opportunities.',
      dealTrack:
        'Deal Matchmaking: Sector × Geography × Capital × Project × Partnership',
    },
    {
      time: '09:00–10:30',
      title: 'AFRICA IN THE GEOPOLITICS OF INVESTMENT',
      description:
        'US–China–Gulf rivalries, investor sentiment, Gulf capital, equity versus debt, technology investment and Africa’s strategic positioning.',
      dealTrack: 'Africa–Gulf Investment Pipeline',
    },
    {
      time: '10:30–12:00',
      title: 'CURRENCY WARS & FINANCIAL SOVEREIGNTY',
      description:
        'Dollar, Yuan, Gold and Digital Assets. Currency risk, financial sovereignty, gold and tangible assets, blockchain and development finance.',
      dealTrack: 'Strategic Financial Partnerships',
    },
    {
      time: '12:00–14:00',
      title: 'THE VIP LUNCHEON',
      description:
        'Countries, capital and strategic partners at the same table. Ten curated investment tables connecting selected projects with qualified investors.',
      dealTrack:
        'Tech Exit Strategies • Infrastructure PPPs • Energy Finance • Critical Minerals • Gulf–Africa Investment • Industrial Partnerships',
    },
    {
      time: '14:00–15:30',
      title: 'TECHNOLOGY & DIGITAL SOVEREIGNTY',
      description:
        'AI, Fintech, Digital Infrastructure, patient capital and technology partnerships.',
      dealTrack: 'Technology Partnerships & Investment',
    },
    {
      time: '15:30–17:00',
      title: 'ENERGY & NEW ALLIANCES',
      description:
        'Oil, Gas, Green and Nuclear energy. Energy security, industrialisation, transition and long-term capital.',
      dealTrack: 'Selected African Energy Projects',
    },
    {
      time: '17:00–18:30',
      title: 'THE GRAND AFRICAN DEAL',
      description:
        'A platform for potential announcements covering investment commitments, MoUs, joint ventures, infrastructure partnerships, financing agreements and strategic alliances.',
      dealTrack:
        'AEF Deal Dashboard: Deals Announced • Capital Mobilised • Projects Advanced • Partnerships Formed',
    },
    {
      time: '18:30+',
      title: 'CLOSED-DOOR SIGNINGS',
      description:
        'Selected negotiations continue beyond the public programme in a private setting.',
    },
  ],
};

/* ===================================================
   DAY TWO
   =================================================== */

const dayTwo: Day = {
  title: 'DAY TWO — FROM STRATEGIC CAPITAL TO SECTOR OPPORTUNITIES',
  sessions: [
    {
      time: '08:00–09:00',
      title: 'SECTOR INVESTMENT BREAKFASTS',
      description:
        'Focused investment discussions covering Agriculture, Critical Minerals, Health, Infrastructure and Tourism.',
      dealTrack:
        'Sector → Priority → Projects → Capital → Partners',
    },
    {
      time: '09:00–10:30',
      title: 'THE INTRA-AFRICAN TRADE REVOLUTION',
      description:
        'Pan-African Payments, Border Modernisation, Digital Trade, AfCFTA and market access.',
      dealTrack: 'Action Track: Africa Trade Gateway',
    },
    {
      time: '10:30–12:00',
      title: 'SECTOR DEAL TRACKS',
      description:
        'Investment opportunities across Agriculture & Agri-Tech, Critical Minerals, Health Sovereignty, Infrastructure and Tourism.',
      dealTrack:
        'Agriculture & Agri-Tech • Critical Minerals • Health Sovereignty • Infrastructure • Tourism',
    },
    {
      time: '12:00–14:00',
      title: 'DEAL-MAKING LUNCHES',
      description:
        'Country, capital, project and investment conversations structured around concrete next steps.',
      dealTrack:
        'Government Priority → Project → Capital Requirement → Investor → Next Step',
    },
    {
      time: '14:00–15:30',
      title: 'COMMERCE WARS',
      description:
        'US Trade Policy, China, Belt and Road Initiative, AfCFTA, market access, trade diversification and strategic autonomy.',
    },
    {
      time: '15:30–17:00',
      title: 'THE FUTURE ECONOMY',
      description:
        'Five frontiers: Future Food, Space & Strategic Resources, AI & Health, Next-Generation Infrastructure and Future Tourism.',
      dealTrack:
        'Innovation → African Capital → Industry → Investment Opportunity',
    },
    {
      time: '17:00–18:30',
      title: 'CLOSING DEAL RALLY',
      description:
        'Investments, MoUs, joint ventures, financing, trade partnerships and strategic alliances. Verified outcomes are presented through the AEF Investment Scoreboard.',
      dealTrack:
        'AEF Scale-Up / Unicorn Award — investment and growth recognition',
    },
  ],
};

/* ===================================================
   CATEGORIES D'INSCRIPTION
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
   APERÇU DES INTERVENANTS
   =================================================== */

const intervenantsApercu = listeIntervenants
  .filter((intervenant) => intervenant.statut === 'Confirmé')
  .slice(0, 4);

/* ===================================================
   PAGE AGENDA
   =================================================== */

export default function AgendaPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] =
    useState(false);
  const [showChairmanModal, setShowChairmanModal] = useState(false);
  const [showProgrammeModal, setShowProgrammeModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] =
    useState(false);

  const [registrationData, setRegistrationData] = useState({
    full_name: '',
    email: '',
    organization: '',
    category: '',
  });

  const [registrationMessage, setRegistrationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ===================================================
     INSCRIPTION
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
     RENDU D'UNE JOURNÉE
     =================================================== */

  const renderDay = (day: Day) => (
    <div className="space-y-4">

      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-xl font-bold text-gray-900">
          {day.title}
        </h3>
      </div>

      {day.sessions.map((session) => (
        <div
          key={`${day.title}-${session.time}-${session.title}`}
          className="grid gap-4 border-b border-gray-100 pb-5 md:grid-cols-[140px_1fr]"
        >

          <div className="font-bold text-blue-900">
            {session.time}
          </div>

          <div>

            <h4 className="text-lg font-bold text-gray-900">
              {session.title}
            </h4>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {session.description}
            </p>

            {session.dealTrack && (
              <div className="mt-3 rounded-lg bg-teal-50 p-3 text-sm">

                <span className="font-semibold text-teal-700">
                  Deal Track:
                </span>{' '}

                <span className="text-gray-600">
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

          {/* LOGO */}

          <Link to="/" className="flex items-center">

            <img
              src="https://static.readdy.ai/image/849a2f489cee8d6814d30c5afad3a84a/55c329d4d58fb687f70c222c549f7ec1.png"
              alt="Africa Economic Forum"
              className="h-12 w-auto"
            />

          </Link>

          {/* MENU DESKTOP */}

          <nav className="hidden items-center gap-6 md:flex">

            <Link
              to="/"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              About
            </Link>

            <Link
              to="/initiatives"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              Initiatives
            </Link>

            <Link
              to="/stakeholders"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              Stakeholders
            </Link>

            <Link
              to="/agenda"
              className="border-b-2 border-teal-600 py-1 text-sm font-semibold text-teal-600"
            >
              Agenda
            </Link>

            <Link
              to="/publications"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              Publications
            </Link>

            <Link
              to="/meetings"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              Meetings
            </Link>

            <Link
              to="/contact"
              className="text-sm text-gray-700 transition-colors hover:text-teal-600"
            >
              Contact
            </Link>

          </nav>

          {/* AUTH DESKTOP */}

          <div className="hidden items-center gap-3 md:flex">

            {user ? (
              <button
                onClick={signOut}
                className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={() => setShowSignInModal(true)}
                className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Sign in
              </button>
            )}

          </div>

          {/* MOBILE MENU */}

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
          HERO
          =================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/images/tour-kinshasa.jpg')",
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
                onClick={() => setShowRegistrationModal(true)}
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

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

          <div className="max-w-5xl">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600">
              02 — THE PREMISE
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              THE WORLD IS REALIGNING. AFRICA IS NEGOTIATING ITS PLACE.
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-8 text-gray-600">

              <p>
                The architecture of global economic cooperation is
                changing.
              </p>

              <p>
                Capital is becoming geopolitical. Energy is becoming
                strategic. Critical minerals are becoming instruments of
                industrial policy. Trade corridors are being redesigned.
                Technology is becoming infrastructure.
              </p>

              <p>
                Governments are competing not simply for trade, but for
                investment, productive capacity, industrial partnerships
                and strategic alliances.
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

          </div>

        </div>
      </section>

      {/* ===================================================
          INTRODUCTION
          =================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
                TWO DAYS. ONE ECONOMIC MISSION.
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                A platform for capital, projects and strategic partnerships.
              </h2>

              <p className="mt-6 leading-8 text-gray-600">
                AEF 2026 brings together Governments, Capital, Projects and
                Strategic Partners around concrete economic opportunities.
                Every session is designed around a strategic question,
                decision-maker conversation or transaction pathway.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <button
                  onClick={() => setShowProgrammeModal(true)}
                  className="rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
                >
                  View Full Programme
                </button>

                <button
                  onClick={() => setShowChairmanModal(true)}
                  className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-teal-600 hover:text-teal-600"
                >
                  Chairman's Message
                </button>

              </div>

            </div>

            <div className="overflow-hidden rounded-2xl shadow-lg">

              <img
                src="/images/Africa_forum_nov2026.jpg"
                alt="Africa Economic Forum 2026"
                className="h-full w-full object-cover"
              />

            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          PROGRAMME
          =================================================== */}

      <section className="bg-gray-50">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="mb-10">

            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
              Programme
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              10–11 November 2026
            </h2>

          </div>

          <div className="space-y-16">

            {renderDay(dayOne)}

            {renderDay(dayTwo)}

          </div>

        </div>
      </section>

      {/* ===================================================
          INTERVENANTS
          =================================================== */}

      <section className="border-t border-gray-100 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
                AEF 2026
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Intervenants
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                Découvrez quelques-unes des personnalités qui prendront
                part aux échanges des 10 et 11 novembre 2026.
              </p>

            </div>

            <Link
              to="/intervenants"
              className="inline-flex w-fit rounded-lg bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              Voir tous les intervenants
            </Link>

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

        </div>
      </section>

      {/* ===================================================
          DEAL ROOM
          =================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-8 text-white md:p-12">

            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200">
              AEF Deal Room
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              From project identification to agreement.
            </h2>

            <div className="mt-10 grid gap-4 md:grid-cols-4">

              {[
                'PROJECT OWNER',
                'AEF SCREENING',
                'INVESTOR MATCHING',
                'CURATED MEETING',
                'TERM / PARTNERSHIP DISCUSSION',
                'DUE DILIGENCE',
                'AGREEMENT',
                'FOLLOW-UP',
              ].map((step, index) => (

                <div
                  key={step}
                  className="rounded-xl border border-white/20 bg-white/5 p-5"
                >

                  <div className="text-sm text-blue-200">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="mt-2 font-semibold">
                    {step}
                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          STRATEGIC PATHWAYS
          =================================================== */}

      <section className="bg-gray-50">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            Strategic Opportunities
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Three Strategic Pathways
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                Investors
              </h3>

              <p className="mt-3 text-gray-600">
                Find Projects
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                Projects
              </h3>

              <p className="mt-3 text-gray-600">
                Find Capital
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

              <h3 className="text-xl font-bold text-gray-900">
                Governments
              </h3>

              <p className="mt-3 text-gray-600">
                Find Strategic Partners
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          COUNTRY ROUNDTABLES
          =================================================== */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
            Deal-Making
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Country-Specific Roundtables
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-gray-600">
            Structured conversations connecting government priorities,
            projects, capital requirements, investors and concrete next
            steps.
          </p>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">

            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold">

              {[
                'COUNTRY',
                'PRIORITY SECTOR',
                'PROJECTS',
                'CAPITAL REQUIREMENT',
                'INVESTORS',
                'NEXT STEP',
              ].map((item, index) => (

                <React.Fragment key={item}>

                  <span className="text-blue-900">
                    {item}
                  </span>

                  {index < 5 && (
                    <span className="font-bold text-teal-600">
                      →
                    </span>
                  )}

                </React.Fragment>

              ))}

            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          WHY KINSHASA
          =================================================== */}

      <section className="bg-gray-50">

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="grid gap-8 md:grid-cols-2">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-600">
                AEF 2026
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Why Kinshasa?
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                Kinshasa provides the setting for strategic conversations
                connecting African markets with global capital,
                investment opportunities and long-term partnerships.
              </p>

            </div>

            <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-8 text-white">

              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-200">
                At the table
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Who will be at the table?
              </h3>

              <p className="mt-4 leading-7 text-blue-100">
                Governments, CEOs, investors, development finance
                institutions, project developers, entrepreneurs,
                experts, diplomats, strategic partners and media.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          CTA FINAL
          =================================================== */}

      <section className="bg-gradient-to-r from-blue-900 to-blue-700">

        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">

          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Join Africa Economic Forum 2026
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Participate in two days of strategic conversations,
            investment opportunities and partnership discussions.
          </p>

          <button
            onClick={() => setShowRegistrationModal(true)}
            className="mt-8 rounded-lg bg-teal-600 px-7 py-3 font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Register for AEF 2026
          </button>

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

              <Link
                to="/about"
                className="transition-colors hover:text-teal-400"
              >
                About
              </Link>

              <Link
                to="/agenda"
                className="transition-colors hover:text-teal-400"
              >
                Agenda
              </Link>

              <Link
                to="/contact"
                className="transition-colors hover:text-teal-400"
              >
                Contact
              </Link>

            </div>

          </div>

          <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-gray-400">
            © 2026 Africa Economic Forum. All rights reserved.
          </div>

        </div>
      </footer>

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
                onClick={() => setShowProgrammeModal(false)}
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
                onClick={() => setShowRegistrationModal(false)}
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

                  {registrationCategories.map((category) => (

                    <option key={category} value={category}>
                      {category}
                    </option>

                  ))}

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
                onClick={() => setShowSignInModal(false)}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>

            </div>

            <p className="mt-5 leading-7 text-gray-600">
              Please use the account access available on the AEF
              platform.
            </p>

            <div className="mt-7 flex gap-3">

              <Link
                to="/login"
                onClick={() => setShowSignInModal(false)}
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
                onClick={() => setShowCreateAccountModal(false)}
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
              onClick={() => setShowCreateAccountModal(false)}
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
