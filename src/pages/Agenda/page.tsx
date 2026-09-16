import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { jsPDF } from 'jspdf';
import { supabase } from '../../supabase/client';

import {
  intervenantsConfirmes,
  dirigeantsInvites,
} from '../../data/intervenantsData';

type Session = {
  time: string;
  title: string;
  description: string;
  track: string;
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
  dayOne: {
    title: string;
    date: string;
    sessions: Session[];
  };
  dayTwo: {
    title: string;
    date: string;
    sessions: Session[];
  };
};

export default function AgendaPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  /* ===================================================
     DONNÉES DU PROGRAMME
     =================================================== */

  const events: AgendaEvent[] = [
    {
      id: 1,
      title: 'AFRICA ECONOMIC FORUM 2026',
      subtitle:
        'Africa and Global Realignment: Investments, Alliances & Strategic Opportunities',
      date: '10–11 Novembre 2026',
      location:
        'Fleuve Congo Hotel, Kinshasa, République Démocratique du Congo',
      objective:
        'Connecter gouvernements, capitaux, projets et partenaires stratégiques.',
      theme:
        'Africa and Global Realignment: Investments, Alliances & Strategic Opportunities',
      image: '/images/Africa_forum_nov2026.jpg',
      description:
        "Deux journées consacrées aux investissements, aux alliances stratégiques, aux projets et aux nouvelles opportunités économiques en Afrique.",
      participants:
        'Governments, global capital, strategic industries and project owners.',
      outcomes:
        'Investment opportunities, strategic partnerships, financing discussions and concrete project pathways.',

      dayOne: {
        title: 'THE GEOPOLITICS OF CAPITAL',
        date: '10 Novembre 2026',

        sessions: [
          {
            time: '08:00 – 09:00',
            title: 'Diplomatic Breakfast',
            description:
              'Ministers × Gulf Investors × CEOs — conversations 1:1 organisées autour des priorités d’investissement.',
            track: 'Deal Matchmaking',
          },
          {
            time: '09:00 – 10:30',
            title: 'Africa in the Geopolitics of Investment',
            description:
              "Comment l’Afrique peut tirer parti des recompositions entre les États-Unis, la Chine et les pays du Golfe.",
            track: 'Africa–Gulf Investment Pipeline',
          },
          {
            time: '10:30 – 12:00',
            title: 'Currency Wars & Financial Sovereignty',
            description:
              'Dollar, Yuan, Or & Digital Assets — risques de change, souveraineté financière et nouvelles formes de financement.',
            track: 'Strategic Financial Partnerships',
          },
          {
            time: '12:00 – 14:00',
            title: 'The VIP Luncheon',
            description:
              'Pays, investisseurs et partenaires stratégiques réunis autour de tables d’investissement soigneusement organisées.',
            track: 'Investment Tables',
          },
          {
            time: '14:00 – 15:30',
            title: 'Technology & Digital Sovereignty',
            description:
              'AI, Fintech, Digital Infrastructure, patient capital and technology partnerships.',
            track: 'Technology Partnerships & Investment',
          },
          {
            time: '15:30 – 17:00',
            title: 'Energy & New Alliances',
            description:
              'Oil, Gas, Green & Nuclear — financement de la transition, sécurité énergétique et industrialisation.',
            track: 'Selected African Energy Projects',
          },
          {
            time: '17:00 – 18:30',
            title: 'The Grand African Deal',
            description:
              'Investment commitments, MoUs, joint ventures, infrastructure partnerships and financing agreements.',
            track: 'AEF Deal Dashboard',
          },
          {
            time: '18:30+',
            title: 'Closed-Door Signings',
            description:
              'Poursuite des négociations et signatures de partenariats sélectionnés.',
            track: 'Private Session',
          },
        ],
      },

      dayTwo: {
        title: 'FROM STRATEGIC CAPITAL TO SECTOR OPPORTUNITIES',
        date: '11 Novembre 2026',

        sessions: [
          {
            time: '08:00 – 09:00',
            title: 'Sector Investment Breakfasts',
            description:
              'Agriculture, Critical Minerals, Health, Infrastructure & Tourism.',
            track: 'Sector Investment',
          },
          {
            time: '09:00 – 10:30',
            title: 'The Intra-African Trade Revolution',
            description:
              'Pan-African Payments, Border Modernisation, Digital Trade, AfCFTA and Market Access.',
            track: 'Africa Trade Gateway',
          },
          {
            time: '10:30 – 12:00',
            title: 'Sector Deal Tracks',
            description:
              'Agriculture & Agri-Tech, Critical Minerals, Health Sovereignty, Infrastructure et Tourism.',
            track: 'Sector Opportunities',
          },
          {
            time: '12:00 – 14:00',
            title: 'Deal-Making Lunches',
            description:
              'Country → Priority → Project → Capital Requirement → Investor → Next Step.',
            track: 'Country Investment Roundtables',
          },
          {
            time: '14:00 – 15:30',
            title: 'Commerce Wars',
            description:
              'US Trade Policy, China, BRI, AfCFTA, market access, trade diversification and strategic autonomy.',
            track: 'Trade & Strategic Autonomy',
          },
          {
            time: '15:30 – 17:00',
            title: 'The Future Economy',
            description:
              'Future Food, Space & Strategic Resources, AI & Health, Next-Generation Infrastructure and Future Tourism.',
            track: 'Five Investment Frontiers',
          },
          {
            time: '17:00 – 18:30',
            title: 'Closing Deal Rally',
            description:
              'Investments, MoUs, JVs, financing, trade partnerships and strategic alliances.',
            track: 'AEF Investment Scoreboard',
          },
        ],
      },
    },
  ];

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  const selectedEvent =
    events.find((event) => event.id === selectedEventId) ?? null;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showChairmanModal, setShowChairmanModal] = useState(false);

  /* ===================================================
     INSCRIPTION SUPABASE
     =================================================== */

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

  /* ===================================================
     AUTH
     =================================================== */

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

  /* ===================================================
     MENU
     =================================================== */

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((previous) => !previous);
  };

  /* ===================================================
     EVENT MODAL
     =================================================== */

  const openEventDetails = (event: AgendaEvent) => {
    setSelectedEventId(event.id);
  };

  const closeEventDetails = () => {
    setSelectedEventId(null);
  };

  /* ===================================================
     REGISTRATION MODAL
     =================================================== */

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

  /* ===================================================
     SUPABASE SUBMIT
     =================================================== */

  const handleSupabaseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registeringEvent) return;

    if (
      !formData.full_name ||
      !formData.email ||
      !formData.organization ||
      !formData.category
    ) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

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
        'Inscription réussie ! Vos données ont été enregistrées.'
      );

      closeRegistrationModal();
    } catch (error: any) {
      console.error(
        "Erreur lors de l'inscription :",
        error?.message
      );

      alert(
        "Une erreur est survenue lors de votre inscription."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ===================================================
     PDF
     =================================================== */

  const downloadAgenda = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    let y = 20;

    const addText = (
      text: string,
      size = 10,
      bold = false
    ) => {
      doc.setFontSize(size);
      doc.setFont('helvetica', bold ? 'bold' : 'normal');

      const lines = doc.splitTextToSize(
        text,
        pageWidth - 30
      );

      if (y + lines.length * 6 > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }

      doc.text(lines, 15, y);
      y += lines.length * 6 + 4;
    };

    addText(
      'THE AFRICA ECONOMIC FORUM 2026',
      18,
      true
    );

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
      'PROGRAMME — JOUR 1',
      14,
      true
    );

    addText(
      'THE GEOPOLITICS OF CAPITAL',
      12,
      true
    );

    events[0].dayOne.sessions.forEach((session) => {
      addText(
        `${session.time} — ${session.title}`,
        10,
        true
      );

      addText(session.description, 9);
      addText(`Deal Track: ${session.track}`, 9);
    });

    y += 5;

    addText(
      'PROGRAMME — JOUR 2',
      14,
      true
    );

    addText(
      'FROM STRATEGIC CAPITAL TO SECTOR OPPORTUNITIES',
      12,
      true
    );

    events[0].dayTwo.sessions.forEach((session) => {
      addText(
        `${session.time} — ${session.title}`,
        10,
        true
      );

      addText(session.description, 9);
      addText(`Deal Track: ${session.track}`, 9);
    });

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'www.africaef.com | info@africaef.com',
      15,
      pageHeight - 10
    );

    doc.save('agenda_aef_2026.pdf');
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ===================================================
          HEADER
          =================================================== */}

      <header className="bg-white shadow-sm sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-20 flex items-center justify-between">

            {/* LOGO */}

            <Link
              to="/"
              className="flex items-center space-x-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  AEF
                </span>
              </div>

              <div className="hidden sm:block">
                <p className="text-blue-900 font-bold text-lg leading-none">
                  AFRICA ECONOMIC
                </p>

                <p className="text-gray-600 text-xs tracking-widest">
                  FORUM 2026
                </p>
              </div>
            </Link>

            {/* DESKTOP NAV */}

            <nav className="hidden lg:flex items-center space-x-7">

              <Link
                to="/"
                className="text-gray-700 hover:text-blue-900 font-medium"
              >
                Accueil
              </Link>

              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-900 font-medium"
              >
                À propos
              </Link>

              <Link
                to="/history"
                className="text-gray-700 hover:text-blue-900 font-medium"
              >
                Histoire
              </Link>

              <Link
                to="/initiatives"
                className="text-gray-700 hover:text-blue-900 font-medium"
              >
                Initiatives
              </Link>

              <Link
                to="/agenda"
                className="text-blue-900 font-bold"
              >
                Programme
              </Link>

              <Link
                to="/intervenants"
                className="text-gray-700 hover:text-blue-900 font-medium"
              >
                Intervenants
              </Link>

              <Link
                to="/partners"
                className="text-gray-700 hover:text-blue-900 font-medium"
              >
                Partenaires
              </Link>

            </nav>

            {/* RIGHT */}

            <div className="flex items-center space-x-3">

              {user ? (
                <div className="relative hidden md:block">

                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(
                        (previous) => !previous
                      )
                    }
                    className="flex items-center space-x-2"
                  >

                    <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-semibold">
                      {getInitials(
                        user.user_metadata?.full_name ||
                          user.email ||
                          'U'
                      )}
                    </div>

                    <i className="ri-arrow-down-s-line text-gray-500" />

                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-xl border border-gray-100 py-2">

                      <button
                        onClick={handleViewProfile}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700"
                      >
                        Mon profil
                      </button>

                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 text-red-600"
                      >
                        Déconnexion
                      </button>

                    </div>
                  )}

                </div>
              ) : (
                <Link
                  to="/join"
                  className="hidden md:inline-flex bg-blue-900 text-white px-5 py-2.5 rounded-md hover:bg-blue-800 font-medium"
                >
                  Participer
                </Link>
              )}

              {/* MOBILE BUTTON */}

              <button
                onClick={toggleMobileMenu}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700"
                aria-label="Menu"
              >
                <i
                  className={
                    isMobileMenuOpen
                      ? 'ri-close-line text-2xl'
                      : 'ri-menu-line text-2xl'
                  }
                />
              </button>

            </div>

          </div>

          {/* MOBILE MENU */}

          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-5">

              <nav className="flex flex-col space-y-1">

                <Link
                  to="/"
                  onClick={toggleMobileMenu}
                  className="px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Accueil
                </Link>

                <Link
                  to="/about"
                  onClick={toggleMobileMenu}
                  className="px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  À propos
                </Link>

                <Link
                  to="/history"
                  onClick={toggleMobileMenu}
                  className="px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Histoire
                </Link>

                <Link
                  to="/initiatives"
                  onClick={toggleMobileMenu}
                  className="px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Initiatives
                </Link>

                <Link
                  to="/agenda"
                  onClick={toggleMobileMenu}
                  className="px-3 py-3 text-blue-900 bg-blue-50 rounded-md font-semibold"
                >
                  Programme
                </Link>

                <Link
                  to="/intervenants"
                  onClick={toggleMobileMenu}
                  className="px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Intervenants
                </Link>

                <Link
                  to="/partners"
                  onClick={toggleMobileMenu}
                  className="px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Partenaires
                </Link>

                {!user && (
                  <Link
                    to="/join"
                    onClick={toggleMobileMenu}
                    className="mt-3 bg-blue-900 text-white text-center px-4 py-3 rounded-md font-medium"
                  >
                    Participer
                  </Link>
                )}

              </nav>

            </div>
          )}

        </div>
      </header>


      {/* ===================================================
          HERO
          =================================================== */}

      <section
        className="relative py-24 md:py-32 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30, 58, 138, 0.82), rgba(30, 58, 138, 0.82)), url('/images/tour-kinshasa.jpg')",
        }}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-4xl text-white">

            <p className="text-teal-300 uppercase tracking-[0.25em] text-sm font-semibold mb-5">
              Africa Economic Forum 2026
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              TWO DAYS.
              <br />
              ONE ECONOMIC MISSION.
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed mb-8">
              Africa and Global Realignment:
              Investments, Alliances & Strategic Opportunities
            </p>

            <div className="flex flex-col sm:flex-row gap-4 text-sm md:text-base">

              <div className="flex items-center">
                <i className="ri-calendar-line mr-2 text-teal-300" />
                10–11 Novembre 2026
              </div>

              <div className="hidden sm:block text-blue-300">
                |
              </div>

              <div className="flex items-center">
                <i className="ri-map-pin-line mr-2 text-teal-300" />
                Fleuve Congo Hotel, Kinshasa
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <button
                onClick={() =>
                  openRegistrationModal(events[0])
                }
                className="bg-white text-blue-900 px-7 py-3.5 rounded-md font-bold hover:bg-gray-100 transition"
              >
                Get Your Delegate Pass
              </button>

              <button
                onClick={downloadAgenda}
                className="border border-white text-white px-7 py-3.5 rounded-md font-semibold hover:bg-white hover:text-blue-900 transition"
              >
                Télécharger le programme
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================
          CHAIRMAN MESSAGE
          =================================================== */}

      <section className="py-16 md:py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">

            <div className="lg:col-span-2">

              <p className="text-teal-600 uppercase tracking-widest text-sm font-semibold mb-3">
                Message du Chairman
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                L’Afrique est au cœur d’un nouvel ordre économique mondial.
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                L’AEF 2026 réunit les décideurs publics, les investisseurs,
                les dirigeants d’entreprises et les porteurs de projets autour
                d’une même mission : transformer les opportunités stratégiques
                en partenariats et en investissements concrets.
              </p>

              <button
                onClick={() =>
                  setShowChairmanModal(true)
                }
                className="text-blue-900 font-semibold inline-flex items-center"
              >
                Lire le message complet
                <i className="ri-arrow-right-line ml-2" />
              </button>

            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">

              <div className="text-4xl text-blue-900 mb-4">
                <i className="ri-double-quotes-l" />
              </div>

              <p className="text-gray-700 leading-relaxed">
                « L’AEF est conçu autour de l’engagement économique,
                des opportunités d’investissement et des partenariats
                stratégiques. »
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================
          CHAIRMAN MODAL
          =================================================== */}

      {showChairmanModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

            <div className="flex justify-between items-center p-6 border-b">

              <h3 className="text-xl font-bold text-gray-900">
                Message du Chairman
              </h3>

              <button
                onClick={() =>
                  setShowChairmanModal(false)
                }
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900"
              >
                <i className="ri-close-line text-xl" />
              </button>

            </div>

            <div className="p-6 md:p-8 space-y-5 text-gray-600 leading-relaxed">

              <p>
                Le monde est en pleine recomposition. Les flux de capitaux,
                les chaînes de valeur, l’énergie, les technologies et les
                alliances stratégiques évoluent rapidement.
              </p>

              <p>
                Dans ce contexte, l’Afrique doit pouvoir dialoguer avec
                davantage d’agilité avec les investisseurs, les gouvernements,
                les institutions financières et les partenaires industriels.
              </p>

              <p>
                Africa Economic Forum 2026 offre un espace où les opportunités
                peuvent rencontrer le capital, les projets peuvent rencontrer
                les partenaires et les gouvernements peuvent présenter leurs
                priorités économiques.
              </p>

              <p className="font-semibold text-gray-900">
                Bienvenue à Kinshasa pour deux journées consacrées au capital,
                aux investissements et aux partenariats stratégiques.
              </p>

            </div>

          </div>

        </div>
      )}


      {/* ===================================================
          PROGRAMME
          =================================================== */}

      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">

            <p className="text-teal-600 uppercase tracking-widest text-sm font-semibold mb-3">
              Programme AEF 2026
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              TWO DAYS. ONE ECONOMIC MISSION.
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Chaque session de l’AEF est conçue autour d’une question
              stratégique, d’une conversation avec les décideurs ou d’une
              opportunité concrète d’investissement et de partenariat.
            </p>

          </div>


          {/* EVENT CARD */}

          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-16"
            >

              <div className="grid grid-cols-1 lg:grid-cols-2">

                <div className="relative min-h-[300px] lg:min-h-[430px]">

                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">

                    <span className="inline-block bg-teal-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded mb-4">
                      AEF 2026
                    </span>

                    <h3 className="text-2xl md:text-3xl font-bold">
                      {event.title}
                    </h3>

                    <p className="mt-3 text-blue-100">
                      {event.date}
                    </p>

                  </div>

                </div>


                <div className="p-6 md:p-10">

                  <p className="text-blue-900 uppercase tracking-widest text-xs font-bold mb-3">
                    {event.subtitle}
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                    {event.theme}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-7">
                    {event.description}
                  </p>

                  <div className="space-y-4 mb-8">

                    <div className="flex gap-3">

                      <i className="ri-map-pin-line text-teal-600 text-xl" />

                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                          Lieu
                        </p>

                        <p className="text-gray-700 mt-1">
                          {event.location}
                        </p>
                      </div>

                    </div>

                    <div className="flex gap-3">

                      <i className="ri-user-star-line text-teal-600 text-xl" />

                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                          Participants
                        </p>

                        <p className="text-gray-700 mt-1">
                          {event.participants}
                        </p>
                      </div>

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-8">

                    <div className="bg-blue-50 p-4 rounded-lg">

                      <p className="text-blue-900 font-bold text-sm">
                        Strategic
                      </p>

                      <p className="text-gray-600 text-xs mt-1">
                        Investment Platform
                      </p>

                    </div>

                    <div className="bg-teal-50 p-4 rounded-lg">

                      <p className="text-teal-700 font-bold text-sm">
                        Capital
                      </p>

                      <p className="text-gray-600 text-xs mt-1">
                        Projects & Partnerships
                      </p>

                    </div>

                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">

                    <button
                      onClick={() =>
                        openEventDetails(event)
                      }
                      className="flex-1 bg-blue-900 text-white px-5 py-3 rounded-md hover:bg-blue-800 font-semibold"
                    >
                      Voir le programme
                    </button>

                    <button
                      onClick={() =>
                        openRegistrationModal(event)
                      }
                      className="flex-1 border border-blue-900 text-blue-900 px-5 py-3 rounded-md hover:bg-blue-50 font-semibold"
                    >
                      S'inscrire
                    </button>

                  </div>

                </div>

              </div>

            </div>
          ))}


          {/* ===================================================
              JOUR 1 + JOUR 2
              =================================================== */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* JOUR 1 */}

            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">

              <div className="bg-blue-900 text-white p-6">

                <p className="text-teal-300 text-sm font-semibold uppercase tracking-wider">
                  10 Novembre 2026
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  THE GEOPOLITICS OF CAPITAL
                </h3>

              </div>

              <div className="p-5 md:p-6">

                {events[0].dayOne.sessions.map(
                  (session, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 last:border-0 py-5"
                    >

                      <div className="flex gap-3 md:gap-4">

                        <div className="w-20 md:w-24 shrink-0">

                          <span className="text-xs md:text-sm font-bold text-teal-600">
                            {session.time}
                          </span>

                        </div>

                        <div className="min-w-0">

                          <h4 className="font-bold text-gray-900 text-sm md:text-base">
                            {session.title}
                          </h4>

                          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                            {session.description}
                          </p>

                          <span className="inline-block mt-3 text-xs font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
                            {session.track}
                          </span>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>


            {/* JOUR 2 */}

            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">

              <div className="bg-blue-900 text-white p-6">

                <p className="text-teal-300 text-sm font-semibold uppercase tracking-wider">
                  11 Novembre 2026
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  FROM STRATEGIC CAPITAL TO SECTOR OPPORTUNITIES
                </h3>

              </div>

              <div className="p-5 md:p-6">

                {events[0].dayTwo.sessions.map(
                  (session, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 last:border-0 py-5"
                    >

                      <div className="flex gap-3 md:gap-4">

                        <div className="w-20 md:w-24 shrink-0">

                          <span className="text-xs md:text-sm font-bold text-teal-600">
                            {session.time}
                          </span>

                        </div>

                        <div className="min-w-0">

                          <h4 className="font-bold text-gray-900 text-sm md:text-base">
                            {session.title}
                          </h4>

                          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                            {session.description}
                          </p>

                          <span className="inline-block mt-3 text-xs font-semibold text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
                            {session.track}
                          </span>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================
          INTERVENANTS
          =================================================== */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-12">

            <div>

              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Intervenants
              </h2>

              <p className="text-gray-600 text-lg">
                Les personnes qui façonnent la conversation
              </p>

            </div>

            <Link
              to="/intervenants"
              className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium flex items-center justify-center space-x-2 whitespace-nowrap"
            >
              <span>
                Voir tous les intervenants
              </span>

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
                  (intervenant) => (
                    <Link
                      key={intervenant.id}
                      to="/intervenants"
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow block group border border-gray-200"
                    >

                      <div className="relative">

                        <img
                          src={intervenant.photoUrl}
                          alt={intervenant.nom}
                          className="w-full h-64 md:h-80 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />

                        <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-2 uppercase tracking-wider">
                          Confirmé
                        </span>

                      </div>

                      <div className="p-4 md:p-6">

                        <h4 className="font-bold text-gray-900 text-base md:text-xl leading-tight">
                          {intervenant.nom}
                        </h4>

                        <p className="text-gray-600 text-sm md:text-base mt-3 leading-relaxed line-clamp-4">
                          {intervenant.titre}
                        </p>

                        {intervenant.institution && (
                          <p className="text-gray-400 text-xs md:text-sm mt-5 uppercase tracking-wider font-medium">
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


          {/* DIRIGEANTS INVITÉS */}

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
                  (intervenant) => (
                    <Link
                      key={intervenant.id}
                      to="/intervenants"
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow block group border border-gray-200"
                    >

                      <div className="relative">

                        <img
                          src={intervenant.photoUrl}
                          alt={intervenant.nom}
                          className="w-full h-64 md:h-80 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />

                        <span className="absolute top-4 left-4 bg-yellow-600 text-white text-xs font-semibold px-3 py-2 uppercase tracking-wider">
                          Invité
                        </span>

                      </div>

                      <div className="p-4 md:p-6">

                        <h4 className="font-bold text-gray-900 text-base md:text-xl leading-tight">
                          {intervenant.nom}
                        </h4>

                        <p className="text-gray-600 text-sm md:text-base mt-3 leading-relaxed line-clamp-4">
                          {intervenant.titre}
                        </p>

                        {intervenant.institution && (
                          <p className="text-gray-400 text-xs md:text-sm mt-5 uppercase tracking-wider font-medium">
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
              className="inline-flex items-center bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium space-x-2"
            >

              <span>
                Découvrir tous les intervenants
              </span>

              <i className="ri-arrow-right-line" />

            </Link>

          </div>

        </div>

      </section>


      {/* ===================================================
          FOOTER
          =================================================== */}

      <footer className="bg-blue-950 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            <div>

              <div className="flex items-center space-x-3 mb-5">

                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-900 font-bold text-sm">
                    AEF
                  </span>
                </div>

                <div>
                  <p className="font-bold">
                    AFRICA ECONOMIC
                  </p>

                  <p className="text-blue-300 text-xs tracking-widest">
                    FORUM 2026
                  </p>
                </div>

              </div>

              <p className="text-blue-200 text-sm leading-relaxed">
                The global platform for Africa's capital,
                partnerships and economic transformation.
              </p>

            </div>


            <div>

              <h4 className="font-bold mb-5">
                Navigation
              </h4>

              <div className="space-y-3 text-sm">

                <Link
                  to="/about"
                  className="block text-blue-200 hover:text-white"
                >
                  À propos
                </Link>

                <Link
                  to="/agenda"
                  className="block text-blue-200 hover:text-white"
                >
                  Programme
                </Link>

                <Link
                  to="/intervenants"
                  className="block text-blue-200 hover:text-white"
                >
                  Intervenants
                </Link>

                <Link
                  to="/partners"
                  className="block text-blue-200 hover:text-white"
                >
                  Partenaires
                </Link>

              </div>

            </div>


            <div>

              <h4 className="font-bold mb-5">
                AEF 2026
              </h4>

              <div className="space-y-3 text-sm text-blue-200">

                <p>
                  10–11 Novembre 2026
                </p>

                <p>
                  Fleuve Congo Hotel
                </p>

                <p>
                  Kinshasa, RDC
                </p>

              </div>

            </div>


            <div>

              <h4 className="font-bold mb-5">
                Contact
              </h4>

              <div className="space-y-3 text-sm text-blue-200">

                <p className="flex items-center">
                  <i className="ri-mail-line mr-2" />
                  info@africaef.com
                </p>

                <p className="flex items-center">
                  <i className="ri-global-line mr-2" />
                  www.africaef.com
                </p>

              </div>

            </div>

          </div>

          <div className="border-t border-blue-800 mt-12 pt-6 text-sm text-blue-300 text-center">
            © 2026 Africa Economic Forum. All rights reserved.
          </div>

        </div>

      </footer>


      {/* ===================================================
          EVENT DETAILS MODAL
          =================================================== */}

      {selectedEvent && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">

          <div className="bg-white rounded-xl max-w-5xl w-full max-h-[92vh] overflow-y-auto">

            {/* MODAL HEADER */}

            <div className="sticky top-0 bg-blue-900 text-white p-5 md:p-6 flex justify-between items-center z-10">

              <div>

                <p className="text-teal-300 text-xs uppercase tracking-widest font-semibold">
                  Programme AEF 2026
                </p>

                <h3 className="text-xl md:text-2xl font-bold mt-1">
                  {selectedEvent.title}
                </h3>

              </div>

              <button
                onClick={closeEventDetails}
                className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full"
              >
                <i className="ri-close-line text-2xl" />
              </button>

            </div>


            <div className="p-5 md:p-8">

              <div className="mb-10">

                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedEvent.theme}
                </h4>

                <p className="text-gray-600 leading-relaxed">
                  {selectedEvent.description}
                </p>

              </div>


              {/* DAY ONE */}

              <div className="mb-12">

                <div className="border-l-4 border-blue-900 pl-4 mb-6">

                  <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider">
                    {selectedEvent.dayOne.date}
                  </p>

                  <h4 className="text-2xl font-bold text-gray-900 mt-1">
                    {selectedEvent.dayOne.title}
                  </h4>

                </div>

                <div className="space-y-4">

                  {selectedEvent.dayOne.sessions.map(
                    (session, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 md:p-5"
                      >

                        <div className="flex flex-col md:flex-row md:gap-6">

                          <div className="md:w-32 shrink-0 mb-2 md:mb-0">

                            <span className="font-bold text-teal-600 text-sm">
                              {session.time}
                            </span>

                          </div>

                          <div>

                            <h5 className="font-bold text-gray-900">
                              {session.title}
                            </h5>

                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                              {session.description}
                            </p>

                            <span className="inline-block mt-3 bg-blue-50 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full">
                              {session.track}
                            </span>

                          </div>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>


              {/* DAY TWO */}

              <div className="mb-10">

                <div className="border-l-4 border-blue-900 pl-4 mb-6">

                  <p className="text-teal-600 text-sm font-semibold uppercase tracking-wider">
                    {selectedEvent.dayTwo.date}
                  </p>

                  <h4 className="text-2xl font-bold text-gray-900 mt-1">
                    {selectedEvent.dayTwo.title}
                  </h4>

                </div>

                <div className="space-y-4">

                  {selectedEvent.dayTwo.sessions.map(
                    (session, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 md:p-5"
                      >

                        <div className="flex flex-col md:flex-row md:gap-6">

                          <div className="md:w-32 shrink-0 mb-2 md:mb-0">

                            <span className="font-bold text-teal-600 text-sm">
                              {session.time}
                            </span>

                          </div>

                          <div>

                            <h5 className="font-bold text-gray-900">
                              {session.title}
                            </h5>

                            <p className="text-gray-600 text-sm leading-relaxed mt-2">
                              {session.description}
                            </p>

                            <span className="inline-block mt-3 bg-blue-50 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full">
                              {session.track}
                            </span>

                          </div>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>


              {/* CTA */}

              <div className="bg-gray-50 rounded-xl p-5 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                  <h4 className="font-bold text-gray-900 text-lg">
                    Rejoignez l'AEF 2026
                  </h4>

                  <p className="text-gray-600 text-sm mt-1">
                    Kinshasa · 10–11 Novembre 2026
                  </p>

                </div>

                <div className="flex flex-col sm:flex-row gap-3">

                  <button
                    onClick={() => {
                      closeEventDetails();
                      openRegistrationModal(
                        selectedEvent
                      );
                    }}
                    className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-semibold"
                  >
                    Get Your Delegate Pass
                  </button>

                  <button
                    onClick={downloadAgenda}
                    className="border border-blue-900 text-blue-900 px-6 py-3 rounded-md hover:bg-blue-50 font-semibold"
                  >
                    PDF
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}


      {/* ===================================================
          REGISTRATION MODAL
          =================================================== */}

      {isRegistrationModalOpen &&
        registeringEvent && (
          <div className="fixed inset-0 z-[110] bg-black/60 flex items-center justify-center p-4">

            <div className="bg-white rounded-xl max-w-lg w-full max-h-[92vh] overflow-y-auto">

              <div className="bg-blue-900 text-white p-6 flex justify-between items-start">

                <div>

                  <p className="text-teal-300 text-xs uppercase tracking-widest font-semibold">
                    AEF 2026
                  </p>

                  <h3 className="text-xl font-bold mt-2">
                    Inscription
                  </h3>

                  <p className="text-blue-200 text-sm mt-1">
                    {registeringEvent.date}
                  </p>

                </div>

                <button
                  onClick={closeRegistrationModal}
                  className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full"
                >
                  <i className="ri-close-line text-2xl" />
                </button>

              </div>


              <form
                onSubmit={handleSupabaseSubmit}
                className="p-6 md:p-8 space-y-5"
              >

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom complet
                  </label>

                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        full_name: e.target.value,
                      })
                    }
                    placeholder="Votre nom complet"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  />

                </div>


                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-mail
                  </label>

                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    placeholder="vous@exemple.com"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  />

                </div>


                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Organisation
                  </label>

                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        organization: e.target.value,
                      })
                    }
                    placeholder="Entreprise / Institution"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  />

                </div>


                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Catégorie
                  </label>

                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
                    required
                  >

                    <option value="">
                      Sélectionnez votre catégorie
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


                <div className="pt-3 flex flex-col sm:flex-row gap-3">

                  <button
                    type="button"
                    onClick={closeRegistrationModal}
                    className="flex-1 border border-gray-300 text-gray-700 px-5 py-3 rounded-md hover:bg-gray-50 font-semibold"
                  >
                    Annuler
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-900 text-white px-5 py-3 rounded-md hover:bg-blue-800 font-semibold disabled:opacity-50"
                  >
                    {loading
                      ? 'Enregistrement...'
                      : 'Confirmer l’inscription'}
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

    </div>
  );
          }
