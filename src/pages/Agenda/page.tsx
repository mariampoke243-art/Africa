import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { jsPDF } from 'jspdf';
import { supabase } from '../../supabase/client';

import {
  intervenantsConfirmes,
  dirigeantsInvites,
} from '../../data/intervenantsData';

type AgendaSession = {
  time: string;
  title: string;
  subtitle?: string;
  description?: string;
  dealTrack?: string;
};

type AgendaDay = {
  title: string;
  sessions: AgendaSession[];
};

type AgendaEvent = {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  objective: string;
  theme: string;
  image: string;
  description: string;
  participants: string;
  outcomes: string;
  dayOne: AgendaDay;
  dayTwo: AgendaDay;
};

export default function AgendaPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  /* =====================================================
     ÉVÉNEMENT AEF 2026 + PROGRAMME COMPLET
  ===================================================== */

  const events: AgendaEvent[] = [
    {
      id: 1,
      title: 'AFRICA ECONOMIC FORUM 2026',
      subtitle:
        'The Global Platform for Africa’s Capital, Partnerships and Economic Transformation',
      date: '10–11 Novembre 2026',
      location: 'Fleuve Congo Hotel, Kinshasa, Democratic Republic of Congo',
      objective:
        'Réunir gouvernements, investisseurs, porteurs de projets et partenaires stratégiques autour d’opportunités concrètes.',
      theme:
        'Africa and Global Realignment: Investments, Alliances & Strategic Opportunities',
      image: '/images/Africa_forum_nov2026.jpg',
      description:
        'Deux jours où les gouvernements, les capitaux internationaux, les industries stratégiques et les porteurs de projets se réunissent pour construire la prochaine génération de corridors d’investissement en Afrique.',
      participants:
        'Governments, global capital, strategic industries and project owners.',
      outcomes:
        'Investment opportunities, partnerships, project pipelines, strategic alliances and pathways toward execution.',

      dayOne: {
        title: 'THE GEOPOLITICS OF CAPITAL',
        sessions: [
          {
            time: '08:00 – 09:00',
            title: 'DIPLOMATIC BREAKFAST',
            subtitle: 'MINISTERS × GULF INVESTORS × CEOs',
            description:
              'Conversations 1:1 soigneusement sélectionnées pour identifier les relations et priorités d’investissement à développer pendant le Forum.',
            dealTrack:
              'DEAL MATCHMAKING — Sector × Geography × Capital × Project × Partnership',
          },
          {
            time: '09:00 – 10:30',
            title: 'AFRICA IN THE GEOPOLITICS OF INVESTMENT',
            subtitle:
              'HOW AFRICA CAN LEVERAGE US–CHINA–GULF RIVALRIES FOR CAPITAL FLOWS',
            description:
              'Sentiment des investisseurs, capitaux du Golfe, equity versus debt, investissements technologiques et positionnement stratégique de l’Afrique.',
            dealTrack: 'AFRICA–GULF INVESTMENT PIPELINE',
          },
          {
            time: '10:30 – 12:00',
            title: 'CURRENCY WARS & FINANCIAL SOVEREIGNTY',
            subtitle: 'DOLLAR. YUAN. GOLD. DIGITAL ASSETS.',
            description:
              'Currency risk, souveraineté financière, or et actifs tangibles, blockchain et financement du développement.',
            dealTrack: 'STRATEGIC FINANCIAL PARTNERSHIPS',
          },
          {
            time: '12:00 – 14:00',
            title: 'THE VIP LUNCHEON',
            subtitle:
              'WHERE COUNTRIES, CAPITAL AND STRATEGIC PARTNERS SIT AT THE SAME TABLE',
            description:
              'Déjeuner d’investissement avec des tables thématiques autour de la technologie, des PPP, de l’énergie, des minerais critiques, du financement et des partenariats industriels.',
            dealTrack:
              'INVESTMENT SHOWCASE — Selected projects presented to qualified investors',
          },
          {
            time: '14:00 – 15:30',
            title: 'TECHNOLOGY & DIGITAL SOVEREIGNTY',
            subtitle:
              'CAN AFRICA BUILD DIGITAL INFRASTRUCTURE ON ITS OWN TERMS?',
            description:
              'AI, Fintech, infrastructures digitales, patient capital et partenariats technologiques.',
            dealTrack: 'TECHNOLOGY PARTNERSHIPS & INVESTMENT',
          },
          {
            time: '15:30 – 17:00',
            title: 'ENERGY & NEW ALLIANCES',
            subtitle: 'OIL. GAS. GREEN. NUCLEAR.',
            description:
              'Qui financera les infrastructures énergétiques nécessaires au prochain cycle économique africain ? Énergie, industrialisation, transition et capital à long terme.',
            dealTrack: 'SELECTED AFRICAN ENERGY PROJECTS',
          },
          {
            time: '17:00 – 18:30',
            title: 'THE GRAND AFRICAN DEAL',
            subtitle: 'WHERE STRATEGIC INTENT BECOMES VISIBLE',
            description:
              'Annonces potentielles : investissements, MoUs, joint ventures, partenariats d’infrastructure, accords de financement et alliances stratégiques.',
            dealTrack:
              'AEF DEAL DASHBOARD — Deals Announced • Capital Mobilised • Projects Advanced • Partnerships Formed',
          },
          {
            time: '18:30+',
            title: 'CLOSED-DOOR SIGNINGS',
            subtitle: 'THE DEAL ROOM REMAINS OPEN',
            description:
              'Les négociations sélectionnées se poursuivent dans des espaces dédiés pour les discussions finales, la documentation et les signatures.',
          },
        ],
      },

      dayTwo: {
        title: 'FROM STRATEGIC CAPITAL TO SECTOR OPPORTUNITIES',
        sessions: [
          {
            time: '08:00 – 09:00',
            title: 'SECTOR INVESTMENT BREAKFASTS',
            subtitle:
              'AGRICULTURE • CRITICAL MINERALS • HEALTH • INFRASTRUCTURE • TOURISM',
            description:
              'Rencontres sectorielles autour du cadre : Sector → Priority → Projects → Capital → Partners.',
          },
          {
            time: '09:00 – 10:30',
            title: 'THE INTRA-AFRICAN TRADE REVOLUTION',
            subtitle: 'FROM BORDERS TO DIGITAL CORRIDORS',
            description:
              'Pan-African Payments, Border Modernisation, Digital Trade, AfCFTA et Market Access.',
            dealTrack: 'ACTION TRACK — AFRICA TRADE GATEWAY',
          },
          {
            time: '10:30 – 12:00',
            title: 'SECTOR DEAL TRACKS',
            subtitle: 'FROM STRATEGIC CAPITAL TO EXECUTABLE OPPORTUNITIES',
            description:
              'Agriculture & Agri-Tech, Critical Minerals, Health Sovereignty, Infrastructure et Tourism.',
            dealTrack:
              'Agricultural Investment • Mineral Processing & Industrial Partnerships • Health Manufacturing • PPP & Project Finance • Tourism Investment',
          },
          {
            time: '12:00 – 14:00',
            title: 'DEAL-MAKING LUNCHES',
            subtitle: 'COUNTRY. CAPITAL. PROJECT. TABLE.',
            description:
              'Government Priority → Project → Capital Requirement → Investor → Next Step.',
            dealTrack:
              'STARTUP INVESTMENT SHOWCASE — Selected companies presented to qualified investors',
          },
          {
            time: '14:00 – 15:30',
            title: 'COMMERCE WARS',
            subtitle: 'AFRICA BETWEEN COMPETING TRADE BLOCS',
            description:
              'US Trade Policy, China, BRI, AfCFTA, Market Access, Trade Diversification et Strategic Autonomy.',
          },
          {
            time: '15:30 – 17:00',
            title: 'THE FUTURE ECONOMY',
            subtitle: 'FIVE INVESTMENT FRONTIERS',
            description:
              'Future Food • Space & Strategic Resources • AI & Health • Next-Generation Infrastructure • Future Tourism.',
            dealTrack:
              'Chaque innovation doit répondre à une question : que signifie-t-elle pour le capital, l’industrie et l’investissement africains ?',
          },
          {
            time: '17:00 – 18:30',
            title: 'CLOSING DEAL RALLY',
            subtitle: 'WHAT MOVED FROM CONVERSATION TO COMMITMENT?',
            description:
              'Investments, MoUs, Joint Ventures, Financing, Trade Partnerships et Strategic Alliances.',
            dealTrack:
              'AFRICA INVESTMENT SCOREBOARD • AEF SCALE-UP / UNICORN AWARD',
          },
        ],
      },
    },
  ];

  const [selectedEventId, setSelectedEventId] = useState<number | null>(
    null
  );

  const selectedEvent =
    events.find((event) => event.id === selectedEventId) ?? null;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showChairmanModal, setShowChairmanModal] = useState(false);

  /* =====================================================
     INSCRIPTION SUPABASE
  ===================================================== */

  const [isRegistrationModalOpen, setIsRegistrationModalOpen] =
    useState(false);

  const [registeringEvent, setRegisteringEvent] = useState<{
    id: number;
    title: string;
    date: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    organization: '',
    category: '',
  });

  const [loading, setLoading] = useState(false);

  /* =====================================================
     AUTH
  ===================================================== */

  const handleSignOut = async () => {
    await signOut();
    setIsProfileDropdownOpen(false);
  };

  const handleViewProfile = () => {
    navigate('/profile');
    setIsProfileDropdownOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  /* =====================================================
     MODALES
  ===================================================== */

  const openEventDetails = (event: AgendaEvent) => {
    setSelectedEventId(event.id);
  };

  const closeEventDetails = () => {
    setSelectedEventId(null);
  };

  const openRegistrationModal = (event: AgendaEvent) => {
    setRegisteringEvent({
      id: event.id,
      title: event.title,
      date: event.date,
    });

    setIsRegistrationModalOpen(true);
  };

  const closeRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
    setRegisteringEvent(null);

    setFormData({
      full_name: '',
      email: '',
      organization: '',
      category: '',
    });
  };

  /* =====================================================
     INSCRIPTION SUPABASE
  ===================================================== */

  const handleSupabaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registeringEvent) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('event_registrations')
        .insert([
          {
            event_id: registeringEvent.id,
            full_name: formData.full_name,
            email: formData.email,
            organization: formData.organization,
            category: formData.category,
          },
        ]);

      if (error) {
        if (error.code === '23505') {
          alert(
            'Cet e-mail est déjà enregistré pour cet événement !'
          );
        } else {
          throw error;
        }

        return;
      }

      alert(
        'Inscription réussie ! Vos données ont été enregistrées dans Supabase.'
      );

      closeRegistrationModal();
    } catch (error: any) {
      console.error(
        'Erreur lors de l’inscription :',
        error.message
      );

      alert(
        'Une erreur est survenue lors de votre inscription.'
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     PDF
  ===================================================== */

  const downloadAgenda = () => {
    const doc = new jsPDF();

    let y = 20;

    const addText = (
      text: string,
      size = 11,
      bold = false,
      spacing = 7
    ) => {
      if (y > 275) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(size);
      doc.setFont('helvetica', bold ? 'bold' : 'normal');

      const lines = doc.splitTextToSize(text, 185);

      doc.text(lines, 10, y);

      y += lines.length * spacing;
    };

    addText('THE AFRICA ECONOMIC FORUM 2026', 18, true, 9);

    addText(
      'Africa and Global Realignment: Investments, Alliances & Strategic Opportunities',
      11,
      true
    );

    addText(
      '10–11 Novembre 2026 | Fleuve Congo Hotel | Kinshasa, Democratic Republic of Congo',
      10
    );

    y += 5;

    addText(
      'TWO DAYS. ONE ECONOMIC MISSION.',
      14,
      true
    );

    y += 5;

    addText('DAY ONE — THE GEOPOLITICS OF CAPITAL', 14, true);

    events[0].dayOne.sessions.forEach((session) => {
      addText(`${session.time} — ${session.title}`, 11, true);
      if (session.subtitle) {
        addText(session.subtitle, 9, true);
      }
      if (session.description) {
        addText(session.description, 9);
      }
      if (session.dealTrack) {
        addText(`Deal Track: ${session.dealTrack}`, 9, true);
      }
      y += 3;
    });

    y += 5;

    addText(
      'DAY TWO — FROM STRATEGIC CAPITAL TO SECTOR OPPORTUNITIES',
      14,
      true
    );

    events[0].dayTwo.sessions.forEach((session) => {
      addText(`${session.time} — ${session.title}`, 11, true);
      if (session.subtitle) {
        addText(session.subtitle, 9, true);
      }
      if (session.description) {
        addText(session.description, 9);
      }
      if (session.dealTrack) {
        addText(`Deal Track: ${session.dealTrack}`, 9, true);
      }
      y += 3;
    });

    if (y > 260) {
      doc.addPage();
    }

    const pageHeight = doc.internal.pageSize.height;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');

    doc.text(
      'www.africaef.com | info@africaef.com',
      10,
      pageHeight - 10
    );

    doc.save('agenda_aef_2026.pdf');
  };

  return (
    <div className="min-h-screen bg-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center h-16">

            <Link to="/" className="flex items-center space-x-3">
              <img
                src="https://static.readdy.ai/image/849a2f489cee8d6814d30c5afad3a84a/55c329d4d58fb687f70c222c549f7ec1.png"
                alt="AEF Logo"
                className="w-10 h-10 object-contain"
              />
            </Link>

            <nav className="hidden md:flex space-x-6 lg:space-x-8">

              <Link
                to="/"
                className="text-gray-700 hover:text-teal-600 px-2 py-2 text-sm font-medium"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-gray-700 hover:text-teal-600 px-2 py-2 text-sm font-medium"
              >
                About
              </Link>

              <Link
                to="/initiatives"
                className="text-gray-700 hover:text-teal-600 px-2 py-2 text-sm font-medium"
              >
                Initiatives
              </Link>

              <Link
                to="/stakeholders"
                className="text-gray-700 hover:text-teal-600 px-2 py-2 text-sm font-medium"
              >
                Stakeholders
              </Link>

              <Link
                to="/agenda"
                className="text-teal-600 px-2 py-2 text-sm font-medium border-b-2 border-teal-600"
              >
                Agenda
              </Link>

              <Link
                to="/publications"
                className="text-gray-700 hover:text-teal-600 px-2 py-2 text-sm font-medium"
              >
                Publications
              </Link>

              <Link
                to="/meetings"
                className="text-gray-700 hover:text-teal-600 px-2 py-2 text-sm font-medium"
              >
                Meetings
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 hover:text-teal-600 px-2 py-2 text-sm font-medium"
              >
                Contact
              </Link>

            </nav>

            {/* Profile */}

            <div className="hidden md:flex items-center space-x-4">

              {user ? (
                <div className="relative">

                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(
                        !isProfileDropdownOpen
                      )
                    }
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {getInitials(
                          user.user_metadata?.full_name ||
                            user.email?.charAt(0) ||
                            'U'
                        )}
                      </div>
                    )}
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">

                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <div className="font-medium">
                          {user.user_metadata?.full_name ||
                            'User'}
                        </div>

                        <div className="text-gray-500 truncate">
                          {user.email}
                        </div>
                      </div>

                      <button
                        onClick={handleViewProfile}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Profile
                      </button>

                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>

                    </div>
                  )}

                </div>
              ) : (
                <Link
                  to="/signin"
                  className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap"
                >
                  Sign In
                </Link>
              )}

            </div>

            {/* Mobile menu button */}

            <button
              className="md:hidden p-2"
              onClick={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
            >
              <i
                className={`ri-${
                  isMobileMenuOpen ? 'close' : 'menu'
                }-line text-2xl`}
              />
            </button>

          </div>
        </div>

        {/* Mobile menu */}

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">

            <div className="px-4 py-3 space-y-1">

              <Link
                to="/"
                className="block px-3 py-2 text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>

              <Link
                to="/initiatives"
                className="block px-3 py-2 text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Initiatives
              </Link>

              <Link
                to="/stakeholders"
                className="block px-3 py-2 text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Stakeholders
              </Link>

              <Link
                to="/agenda"
                className="block px-3 py-2 text-teal-600 bg-teal-50 rounded-md font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Agenda
              </Link>

              <Link
                to="/publications"
                className="block px-3 py-2 text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Publications
              </Link>

              <Link
                to="/meetings"
                className="block px-3 py-2 text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Meetings
              </Link>

              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-3 border-t border-gray-100">

                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 text-gray-700"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/signin"
                    className="w-full bg-blue-900 text-white px-4 py-2 rounded-md block text-center"
                  >
                    Sign In
                  </Link>
                )}

              </div>

            </div>

          </div>
        )}

      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="relative py-24 md:py-32 bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(30,58,138,0.82),
              rgba(30,58,138,0.82)
            ),
            url('/images/tour-kinshasa.jpg')
          `,
        }}
      >

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">

          <p className="text-teal-300 font-semibold tracking-[0.25em] text-sm mb-4">
            AFRICA ECONOMIC FORUM 2026
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            AFRICA’S NEXT INVESTMENT CORRIDORS
            <br className="hidden md:block" />
            ARE BEING BUILT IN KINSHASA.
          </h1>

          <p className="text-lg md:text-xl mb-4 max-w-4xl mx-auto leading-relaxed">
            Africa and Global Realignment:
            Investments, Alliances & Strategic Opportunities
          </p>

          <p className="text-sm md:text-base mb-8 text-gray-200">
            10–11 November 2026 | Fleuve Congo Hotel |
            Kinshasa, Democratic Republic of Congo
          </p>

          <p className="max-w-3xl mx-auto text-gray-200 mb-8 leading-relaxed">
            Two days where governments, global capital,
            strategic industries and project owners come
            together to build the next generation of
            investment corridors into and across Africa.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <button
              onClick={downloadAgenda}
              className="bg-white text-blue-900 px-7 py-3 rounded-md hover:bg-gray-100 font-semibold"
            >
              Download Full Agenda
            </button>

            <button
              onClick={() =>
                openRegistrationModal(events[0])
              }
              className="bg-teal-500 text-white px-7 py-3 rounded-md hover:bg-teal-600 font-semibold"
            >
              Get Your Delegate Pass
            </button>

          </div>

          <p className="mt-6 text-xs md:text-sm text-gray-300">
            For Governments | Investors | Project Owners |
            Strategic Partners
          </p>

        </div>
      </section>

      {/* =====================================================
          PREMISE
      ===================================================== */}

      <section className="py-16 md:py-20 bg-white">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <p className="text-teal-600 font-semibold tracking-widest text-sm mb-4">
            THE PREMISE
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            THE WORLD IS REALIGNING.
            <br />
            AFRICA IS NEGOTIATING ITS PLACE.
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            The architecture of global economic cooperation is
            changing. Capital is becoming geopolitical. Energy is
            becoming strategic. Critical minerals are becoming
            instruments of industrial policy. Trade corridors are
            being redesigned. Technology is becoming infrastructure.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-10">

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
                className="border border-gray-200 rounded-lg p-4 text-xs md:text-sm font-semibold text-gray-700"
              >
                {item}
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          CHAIRMAN
      ===================================================== */}

      <section className="py-14 bg-gradient-to-r from-blue-900 to-teal-700 text-white">

        <div className="max-w-5xl mx-auto px-4 text-center">

          <p className="text-teal-200 text-sm uppercase tracking-widest mb-3">
            Leadership
          </p>

          <h2 className="text-3xl font-bold mb-5">
            A Message from the Chairman
          </h2>

          <button
            onClick={() => setShowChairmanModal(true)}
            className="bg-white text-blue-900 px-7 py-3 rounded-md hover:bg-gray-100 font-semibold"
          >
            Read the Full Message
          </button>

        </div>
      </section>

      {/* =====================================================
          EVENT / PROGRAMME INTRO
      ===================================================== */}

      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">

            <p className="text-teal-600 font-semibold tracking-widest text-sm mb-3">
              PROGRAMME
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              TWO DAYS. ONE ECONOMIC MISSION.
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto mt-5">
              Every session at AEF is designed around a
              strategic question, a decision-maker conversation
              or a transaction pathway.
            </p>

          </div>

          {/* EVENT CARD */}

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-2">

              <div className="relative min-h-[300px]">

                <img
                  src={events[0].image}
                  alt={events[0].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-blue-900/40" />

                <div className="absolute top-5 left-5 bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-semibold">
                  10–11 NOVEMBRE 2026
                </div>

              </div>

              <div className="p-7 md:p-10">

                <p className="text-teal-600 font-semibold text-sm mb-2">
                  AFRICA ECONOMIC FORUM 2026
                </p>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {events[0].title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-5">
                  {events[0].description}
                </p>

                <div className="flex items-start gap-3 mb-4">
                  <i className="ri-map-pin-line text-teal-600 text-xl mt-0.5" />

                  <span className="text-gray-700 text-sm">
                    {events[0].location}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">

                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Participants
                    </p>
                    <p className="text-sm text-gray-700">
                      Governments, global capital, strategic
                      industries and project owners.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Focus
                    </p>
                    <p className="text-sm text-gray-700">
                      Capital, partnerships, projects and
                      strategic opportunities.
                    </p>
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row gap-3">

                  <button
                    onClick={() =>
                      openEventDetails(events[0])
                    }
                    className="flex-1 bg-blue-900 text-white px-5 py-3 rounded-md hover:bg-blue-800 font-semibold"
                  >
                    Voir le programme
                  </button>

                  <button
                    onClick={() =>
                      openRegistrationModal(events[0])
                    }
                    className="flex-1 border border-blue-900 text-blue-900 px-5 py-3 rounded-md hover:bg-blue-50 font-semibold"
                  >
                    Get Your Delegate Pass
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          PROGRAMME VISIBLE
      ===================================================== */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">

            <p className="text-teal-600 font-semibold tracking-widest text-sm mb-3">
              10–11 NOVEMBER 2026
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              PROGRAMME AEF 2026
            </h2>

            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Un programme construit autour du capital,
              des investissements, des projets et des
              partenariats stratégiques.
            </p>

          </div>

          {/* DAY ONE */}

          <div className="mb-16">

            <div className="bg-blue-900 text-white rounded-t-xl p-6 md:p-8">

              <p className="text-teal-300 text-sm font-semibold tracking-widest mb-2">
                DAY ONE
              </p>

              <h3 className="text-2xl md:text-3xl font-bold">
                {events[0].dayOne.title}
              </h3>

            </div>

            <div className="border border-gray-200 border-t-0 rounded-b-xl">

              {events[0].dayOne.sessions.map(
                (session, index) => (
                  <div
                    key={index}
                    className="p-6 md:p-7 border-b border-gray-200 last:border-b-0"
                  >

                    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4">

                      <div>
                        <span className="inline-block bg-gray-100 text-blue-900 font-bold text-sm px-3 py-2 rounded-md">
                          {session.time}
                        </span>
                      </div>

                      <div>

                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {session.title}
                        </h4>

                        {session.subtitle && (
                          <p className="text-teal-600 font-semibold text-sm mb-3">
                            {session.subtitle}
                          </p>
                        )}

                        {session.description && (
                          <p className="text-gray-600 leading-relaxed">
                            {session.description}
                          </p>
                        )}

                        {session.dealTrack && (
                          <div className="mt-4 bg-teal-50 border-l-4 border-teal-500 p-4">
                            <p className="text-xs text-teal-700 font-bold uppercase tracking-wider mb-1">
                              Deal Track
                            </p>
                            <p className="text-sm text-gray-700">
                              {session.dealTrack}
                            </p>
                          </div>
                        )}

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          {/* DAY TWO */}

          <div>

            <div className="bg-teal-700 text-white rounded-t-xl p-6 md:p-8">

              <p className="text-teal-100 text-sm font-semibold tracking-widest mb-2">
                DAY TWO
              </p>

              <h3 className="text-2xl md:text-3xl font-bold">
                {events[0].dayTwo.title}
              </h3>

            </div>

            <div className="border border-gray-200 border-t-0 rounded-b-xl">

              {events[0].dayTwo.sessions.map(
                (session, index) => (
                  <div
                    key={index}
                    className="p-6 md:p-7 border-b border-gray-200 last:border-b-0"
                  >

                    <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4">

                      <div>
                        <span className="inline-block bg-gray-100 text-teal-700 font-bold text-sm px-3 py-2 rounded-md">
                          {session.time}
                        </span>
                      </div>

                      <div>

                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {session.title}
                        </h4>

                        {session.subtitle && (
                          <p className="text-teal-600 font-semibold text-sm mb-3">
                            {session.subtitle}
                          </p>
                        )}

                        {session.description && (
                          <p className="text-gray-600 leading-relaxed">
                            {session.description}
                          </p>
                        )}

                        {session.dealTrack && (
                          <div className="mt-4 bg-teal-50 border-l-4 border-teal-500 p-4">
                            <p className="text-xs text-teal-700 font-bold uppercase tracking-wider mb-1">
                              Deal Track
                            </p>

                            <p className="text-sm text-gray-700">
                              {session.dealTrack}
                            </p>
                          </div>
                        )}

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          DEAL ROOM SIMPLE
      ===================================================== */}

      <section className="py-20 bg-gray-50">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <p className="text-teal-600 font-semibold tracking-widest text-sm mb-3">
            AEF DEAL ROOM
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
            WHERE CAPITAL MEETS THE PROJECT.
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
            The Deal Room is the operational core of AEF,
            where qualified projects meet investors and
            strategic partners through structured conversations.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">

            {[
              'PROJECT OWNER',
              'AEF SCREENING',
              'INVESTOR MATCHING',
              'CURATED MEETING',
              'TERM DISCUSSION',
              'DUE DILIGENCE',
              'AGREEMENT',
              'FOLLOW-UP',
            ].map((step, index) => (
              <div
                key={step}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="text-teal-600 font-bold text-sm mb-2">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <p className="text-xs font-semibold text-gray-700">
                  {step}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          INTERVENANTS
      ===================================================== */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-12">

            <div>

              <p className="text-teal-600 font-semibold tracking-widest text-sm mb-3">
                AEF 2026
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Intervenants
              </h2>

              <p className="text-gray-600 text-lg">
                Les personnes qui façonnent la conversation
              </p>

            </div>

            <Link
              to="/intervenants"
              className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Voir tous les intervenants</span>
              <i className="ri-arrow-right-line" />
            </Link>

          </div>

          {/* CONFIRMÉS */}

          {intervenantsConfirmes.length > 0 && (
            <div className="mb-16">

              <div className="flex items-center justify-between mb-8">

                <h3 className="text-2xl font-bold text-gray-900">
                  Intervenants confirmés
                </h3>

                <span className="text-sm text-teal-600 font-medium">
                  AEF 2026
                </span>

              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-8">

                {intervenantsConfirmes.map(
                  (intervenant: any) => (
                    <Link
                      key={intervenant.id}
                      to="/intervenants"
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow block group border border-gray-200"
                    >

                      <div className="relative">

                        <img
                          src={intervenant.photoUrl}
                          alt={intervenant.nom}
                          className="w-full h-56 md:h-80 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />

                        <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-green-600 text-white text-[10px] md:text-xs font-semibold px-2 md:px-3 py-2 uppercase tracking-wider">
                          Confirmé
                        </span>

                      </div>

                      <div className="p-4 md:p-6">

                        <h4 className="font-bold text-gray-900 text-base md:text-xl leading-tight">
                          {intervenant.nom}
                        </h4>

                        <p className="text-gray-600 text-xs md:text-base mt-3 leading-relaxed line-clamp-4">
                          {intervenant.titre}
                        </p>

                        {intervenant.institution && (
                          <p className="text-gray-400 text-[10px] md:text-sm mt-4 uppercase tracking-wider font-medium">
                            {intervenant.institution}
                          </p>
                        )}

                        {intervenant.domaineStrategique && (
                          <p className="text-teal-600 text-xs md:text-sm mt-2 font-medium">
                            {intervenant.domaineStrategique}
                          </p>
                        )}

                      </div>

                    </Link>
                  )
                )}

              </div>

            </div>
          )}

          {/* INVITÉS */}

          {dirigeantsInvites.length > 0 && (
            <div>

              <div className="flex items-center justify-between mb-8">

                <h3 className="text-2xl font-bold text-gray-900">
                  Dirigeants invités
                </h3>

                <span className="text-sm text-yellow-700 font-medium">
                  AEF 2026
                </span>

              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-8">

                {dirigeantsInvites.map(
                  (intervenant: any) => (
                    <Link
                      key={intervenant.id}
                      to="/intervenants"
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow block group border border-gray-200"
                    >

                      <div className="relative">

                        <img
                          src={intervenant.photoUrl}
                          alt={intervenant.nom}
                          className="w-full h-56 md:h-80 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />

                        <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-yellow-600 text-white text-[10px] md:text-xs font-semibold px-2 md:px-3 py-2 uppercase tracking-wider">
                          Invité
                        </span>

                      </div>

                      <div className="p-4 md:p-6">

                        <h4 className="font-bold text-gray-900 text-base md:text-xl leading-tight">
                          {intervenant.nom}
                        </h4>

                        <p className="text-gray-600 text-xs md:text-base mt-3 leading-relaxed line-clamp-4">
                          {intervenant.titre}
                        </p>

                        {intervenant.institution && (
                          <p className="text-gray-400 text-[10px] md:text-sm mt-4 uppercase tracking-wider font-medium">
                            {intervenant.institution}
                          </p>
                        )}

                        {intervenant.domaineStrategique && (
                          <p className="text-teal-600 text-xs md:text-sm mt-2 font-medium">
                            {intervenant.domaineStrategique}
                          </p>
                        )}

                      </div>

                    </Link>
                  )
                )}

              </div>

            </div>
          )}

          <div className="text-center mt-10">

            <Link
              to="/intervenants"
              className="inline-flex items-center bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium gap-2"
            >
              <span>Découvrir tous les intervenants</span>
              <i className="ri-arrow-right-line" />
            </Link>

          </div>

        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-gray-900 text-white py-14">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div>

              <img
                src="https://static.readdy.ai/image/849a2f489cee8d6814d30c5afad3a84a/55c329d4d58fb687f70c222c549f7ec1.png"
                alt="AEF Logo"
                className="w-12 h-12 object-contain mb-4"
              />

              <p className="text-gray-400 text-sm leading-relaxed">
                The global platform for Africa’s capital,
                partnerships and economic transformation.
              </p>

            </div>

            <div>

              <h3 className="font-semibold mb-4">
                Africa Economic Forum 2026
              </h3>

              <p className="text-gray-400 text-sm">
                10–11 November 2026
              </p>

              <p className="text-gray-400 text-sm mt-1">
                Fleuve Congo Hotel
              </p>

              <p className="text-gray-400 text-sm mt-1">
                Kinshasa, Democratic Republic of Congo
              </p>

            </div>

            <div>

              <h3 className="font-semibold mb-4">
                Contact
              </h3>

              <p className="text-gray-400 text-sm">
                info@africaef.com
              </p>

              <p className="text-gray-400 text-sm mt-1">
                www.africaef.com
              </p>

            </div>

          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
            © 2026 Africa Economic Forum. All rights reserved.
          </div>

        </div>

      </footer>

      {/* =====================================================
          CHAIRMAN MODAL
      ===================================================== */}

      {showChairmanModal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowChairmanModal(false)}
        >

          <div
            className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] overflow-auto shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex justify-between items-start gap-5 mb-6">

              <h3 className="text-2xl md:text-3xl font-bold text-blue-900">
                A Message from the Chairman
              </h3>

              <button
                onClick={() => setShowChairmanModal(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <i className="ri-close-line text-2xl" />
              </button>

            </div>

            <p className="text-gray-700 leading-relaxed mb-5">
              The world is recalibrating. The old paradigms
              are shifting. Capital, technology, energy,
              trade and strategic partnerships are being
              reorganised.
            </p>

            <p className="text-gray-700 leading-relaxed mb-5">
              Africa must engage this changing environment
              with greater strategic agency and with the
              ability to connect its priorities to capital,
              expertise, technology and markets.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Africa Economic Forum is designed around that
              objective: creating the conditions for governments,
              investors, project owners and strategic partners
              to move from access to alignment and from
              alignment toward transactions.
            </p>

            <div className="flex justify-end mt-8">

              <button
                onClick={() => setShowChairmanModal(false)}
                className="px-6 py-2.5 bg-blue-900 text-white rounded-md"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          PROGRAMME MODAL
      ===================================================== */}

      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4"
          onClick={closeEventDetails}
        >

          <div
            className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="sticky top-0 bg-white border-b border-gray-200 p-5 md:p-6 z-10">

              <div className="flex justify-between items-start gap-4">

                <div>

                  <p className="text-teal-600 text-xs font-semibold tracking-widest mb-1">
                    AFRICA ECONOMIC FORUM 2026
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Programme complet
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {selectedEvent.date} •{' '}
                    {selectedEvent.location}
                  </p>

                </div>

                <button
                  onClick={closeEventDetails}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <i className="ri-close-line text-2xl" />
                </button>

              </div>

            </div>

            <div className="p-5 md:p-8">

              <div className="bg-blue-50 rounded-lg p-5 mb-8">

                <h4 className="font-bold text-blue-900 mb-2">
                  Africa and Global Realignment
                </h4>

                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {selectedEvent.theme}
                </p>

              </div>

              {/* Day One */}

              <div className="mb-10">

                <div className="bg-blue-900 text-white rounded-lg p-5 mb-4">

                  <p className="text-teal-300 text-xs font-semibold tracking-widest">
                    DAY ONE
                  </p>

                  <h4 className="text-xl md:text-2xl font-bold mt-1">
                    {selectedEvent.dayOne.title}
                  </h4>

                </div>

                <div className="space-y-4">

                  {selectedEvent.dayOne.sessions.map(
                    (session, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-5"
                      >

                        <div className="flex flex-col md:flex-row gap-4">

                          <div className="md:w-32 flex-shrink-0">

                            <span className="inline-block bg-gray-100 text-blue-900 rounded-md px-3 py-2 text-sm font-bold">
                              {session.time}
                            </span>

                          </div>

                          <div>

                            <h5 className="font-bold text-gray-900">
                              {session.title}
                            </h5>

                            {session.subtitle && (
                              <p className="text-teal-600 text-xs font-semibold mt-1">
                                {session.subtitle}
                              </p>
                            )}

                            {session.description && (
                              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                                {session.description}
                              </p>
                            )}

                            {session.dealTrack && (
                              <p className="text-gray-700 text-xs mt-3 bg-teal-50 p-3 rounded">
                                <strong>Deal Track:</strong>{' '}
                                {session.dealTrack}
                              </p>
                            )}

                          </div>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* Day Two */}

              <div>

                <div className="bg-teal-700 text-white rounded-lg p-5 mb-4">

                  <p className="text-teal-100 text-xs font-semibold tracking-widest">
                    DAY TWO
                  </p>

                  <h4 className="text-xl md:text-2xl font-bold mt-1">
                    {selectedEvent.dayTwo.title}
                  </h4>

                </div>

                <div className="space-y-4">

                  {selectedEvent.dayTwo.sessions.map(
                    (session, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-5"
                      >

                        <div className="flex flex-col md:flex-row gap-4">

                          <div className="md:w-32 flex-shrink-0">

                            <span className="inline-block bg-gray-100 text-teal-700 rounded-md px-3 py-2 text-sm font-bold">
                              {session.time}
                            </span>

                          </div>

                          <div>

                            <h5 className="font-bold text-gray-900">
                              {session.title}
                            </h5>

                            {session.subtitle && (
                              <p className="text-teal-600 text-xs font-semibold mt-1">
                                {session.subtitle}
                              </p>
                            )}

                            {session.description && (
                              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                                {session.description}
                              </p>
                            )}

                            {session.dealTrack && (
                              <p className="text-gray-700 text-xs mt-3 bg-teal-50 p-3 rounded">
                                <strong>Deal Track:</strong>{' '}
                                {session.dealTrack}
                              </p>
                            )}

                          </div>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* CTA */}

              <div className="mt-10 bg-gray-900 rounded-xl p-6 md:p-8 text-white">

                <h4 className="text-xl font-bold mb-3">
                  AEF Deal Room
                </h4>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Where capital meets the project. Les
                  opportunités sont structurées autour du
                  matching, de la négociation, de la due
                  diligence et du suivi.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">

                  <button
                    onClick={() => {
                      closeEventDetails();
                      openRegistrationModal(selectedEvent);
                    }}
                    className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 font-semibold"
                  >
                    Get Your Delegate Pass
                  </button>

                  <button
                    onClick={downloadAgenda}
                    className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-gray-900 font-semibold"
                  >
                    Download Agenda
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          REGISTRATION MODAL
      ===================================================== */}

      {isRegistrationModalOpen && registeringEvent && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4"
          onClick={closeRegistrationModal}
        >

          <div
            className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-auto p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex justify-between items-start mb-5">

              <div>

                <p className="text-teal-600 text-xs font-semibold tracking-widest mb-1">
                  AEF 2026
                </p>

                <h3 className="text-xl font-bold text-gray-900">
                  Inscription à l'événement
                </h3>

              </div>

              <button
                onClick={closeRegistrationModal}
                className="text-gray-400 hover:text-gray-700"
              >
                <i className="ri-close-line text-2xl" />
              </button>

            </div>

            <p className="text-sm text-gray-600 mb-6">

              <strong className="text-gray-900">
                {registeringEvent.title}
              </strong>

              <br />

              {registeringEvent.date}

            </p>

            <form
              onSubmit={handleSupabaseSubmit}
              className="space-y-4"
            >

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet
                </label>

                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      full_name: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Ex: Jean Dupont"
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse email
                </label>

                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="jean.dupont@exemple.com"
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organisation / Entreprise
                </label>

                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organization: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Ex: Ministère / Société"
                />

              </div>

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie / Fonction
                </label>

                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >

                  <option value="">
                    Sélectionnez une catégorie
                  </option>

                  <option value="CEO / Business Leader">
                    CEO / Business Leader
                  </option>

                  <option value="Investor / Fund">
                    Investor / Fund
                  </option>

                  <option value="Government / Public Sector">
                    Government / Public Sector
                  </option>

                  <option value="Financial / Development Institution">
                    Financial / Development Institution
                  </option>

                  <option value="Project Developer / Entrepreneur">
                    Project Developer / Entrepreneur
                  </option>

                  <option value="Expert / Thought Leader">
                    Expert / Thought Leader
                  </option>

                  <option value="Diplomat / International Institution">
                    Diplomat / International Institution
                  </option>

                  <option value="Corporate Executive">
                    Corporate Executive
                  </option>

                  <option value="Media">
                    Media
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={closeRegistrationModal}
                  className="px-5 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-blue-900 text-white rounded-md text-sm hover:bg-blue-800 disabled:opacity-50"
                >
                  {loading
                    ? 'Enregistrement...'
                    : "Confirmer l'inscription"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
      }
