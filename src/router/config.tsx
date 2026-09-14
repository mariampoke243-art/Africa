import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import MeetingRegistrationForm from '../../components/forms/MeetingRegistrationForm';
import { jsPDF } from "jspdf";

export default function AgendaPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const events = [
    {
      id: 1,
      title: "INDIA-AFRICA INVESTMENT & BUSINESS CORRIDOR ROUNDTABLE",
      subtitle: "Africa Economic Forum - Session Annonce",
      date: "10-11 Novembre 2026",
      location: "Fleuve Congo Hotel, Kinshasa, DRC",
      objective: "Finaliser l'ordre du jour et recruter les sponsors",
      theme: "Africa and Global Realignment : Investment, Alliances & Strategic Opportunities",
      image: "/images/Africa_forum_nov2026.jpg",
      description: "Africa and Global Realignment: Investment, Alliances & Strategic Opportunities",
      participants: "Governments, global capital, strategic industries and project owners.",
      outcomes: "Next generation of investment corridors into and across Africa.",
      submitUrl: "https://readdy.ai/api/form/infrastructure-summit-registration"
    }
  ];

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const selectedEvent = events.find((e) => e.id === selectedEventId) ?? null;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    title: '',
    date: '',
    submitUrl: '',
  });

  const [showChairmanModal, setShowChairmanModal] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setIsProfileDropdownOpen(false);
  };

  const handleViewProfile = () => {
    navigate("/profile");
    setIsProfileDropdownOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  const openEventDetails = (event: any) => setSelectedEventId(event.id);
  const closeEventDetails = () => setSelectedEventId(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleRegister = (event: any, submitUrl: string) => {
    setRegistrationData({
      title: event.title,
      date: event.date,
      submitUrl: submitUrl,
    });
    setIsRegistrationOpen(true);
  };

  const closeRegistration = () => {
    setIsRegistrationOpen(false);
    setRegistrationData({
      title: "",
      date: "",
      submitUrl: "",
    });
  };

  const downloadAgenda = () => {
    const doc = new jsPDF();
    doc.text("THE AFRICA ECONOMIC FORUM 2026", 10, 20);
    doc.text("ANNUAL THEME: Africa and Global Realignments: Investments, Alliances, and Strategic Opportunities", 10, 30);
    const pageHeight = doc.internal.pageSize.height;
    doc.text("www.africaef.com | info@africaef.com", 10, pageHeight - 10);
    doc.save("agenda_aef_2026.pdf");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="https://static.readdy.ai/image/849a2f489cee8d6814d30c5afad3a84a/55c329d4d58fb687f70c222c549f7ec1.png"
                  alt="AEF Logo"
                  className="w-10 h-10 object-contain"
                />
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Home</Link>
              <Link to="/about" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">About</Link>
              <Link to="/initiatives" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Initiatives</Link>
              <Link to="/stakeholders" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Stakeholders</Link>
              <Link to="/agenda" className="text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-600">Agenda</Link>
              <Link to="/publications" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Publications</Link>
              <Link to="/meetings" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Meetings</Link>
              <Link to="/contact" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium">Contact</Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {getInitials(user.user_metadata?.full_name || user.email?.charAt(0) || "U")}
                      </div>
                    )}
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <div className="font-medium">{user.user_metadata?.full_name || "User"}</div>
                        <div className="text-gray-500">{user.email}</div>
                      </div>
                      <button onClick={handleViewProfile} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        View Profile
                      </button>
                      <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/signin" className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap cursor-pointer">
                  Sign In
                </Link>
              )}
            </div>

            <button className="md:hidden p-2 cursor-pointer" onClick={toggleMobileMenu}>
              <i className={`ri-${isMobileMenuOpen ? "close" : "menu"}-line text-2xl`}></i>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              <Link to="/agenda" className="block px-3 py-2 text-base font-medium text-teal-600 bg-teal-50 rounded-md">Agenda</Link>
              <div className="pt-4 pb-2">
                {user ? (
                  <button onClick={handleSignOut} className="block w-full text-left text-gray-700 hover:text-teal-600 font-medium">
                    Sign Out
                  </button>
                ) : (
                  <Link to="/signin" className="w-full bg-blue-900 text-white px-4 py-2 rounded-md block text-center">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url('https://readdy.ai/api/search-image?query=Kinshasa%20Congo%20conference&width=1920&height=800&seq=agenda-hero-2026&orientation=landscape')`,
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">THE AFRICA ECONOMIC FORUM 2026</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            ANNUAL THEME: Africa and Global Realignments: Investments, Alliances, and Strategic Opportunities <br />
            Our Mantra: We Don't Just Talk. We Deal.
          </p>
          <button
            onClick={downloadAgenda}
            className="bg-white text-blue-900 px-8 py-3 rounded-md hover:bg-gray-100 font-medium whitespace-nowrap cursor-pointer"
          >
            Download Full Agenda
          </button>
        </div>
      </section>

      {/* Chairman Message */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">A Message from the Chairman</h2>
          <button
            onClick={() => setShowChairmanModal(true)}
            className="bg-white text-blue-900 px-8 py-3 rounded-md hover:bg-gray-100 font-medium cursor-pointer"
          >
            Read the Full Message
          </button>
        </div>
      </section>

      {/* Chairman Modal */}
      {showChairmanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowChairmanModal(false)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[85vh] overflow-auto shadow-2xl p-8" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-3xl font-bold mb-4 text-blue-900">A Message from the Chairman</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The world is recalibrating. The old paradigms are shifting... This is not just another forum. This is where the future of Africa is designed, deal by deal.
            </p>
            <div className="flex justify-end">
              <button onClick={() => setShowChairmanModal(false)} className="px-6 py-2 bg-blue-900 text-white rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">THE 2026 JOURNEY: A YEAR OF STRATEGIC ACTION</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover object-top" />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {event.date}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <i className="ri-map-pin-line mr-2"></i>
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">{event.description}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => openEventDetails(event)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium text-sm"
                    >
                      Learn More
                    </button>
                    <button
                      onClick={() => handleRegister(event, event.submitUrl)}
                      className="border border-blue-900 text-blue-900 px-4 py-2 rounded-md hover:bg-blue-50 font-medium text-sm"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>© 2026 Africa Economic Forum. All rights reserved.</p>
        </div>
      </footer>

      {/* Meeting Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeEventDetails}>
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{selectedEvent.date} • {selectedEvent.location}</p>
            <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  handleRegister(selectedEvent, selectedEvent.submitUrl);
                  closeEventDetails();
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Registration Form */}
      <MeetingRegistrationForm
        isOpen={isRegistrationOpen}
        onClose={closeRegistration}
        meetingTitle={registrationData.title}
        meetingDate={registrationData.date}
        submitUrl={registrationData.submitUrl}
      />
    </div>
  );
}
