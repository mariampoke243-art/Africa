import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { aefInitiatives } from '../../data/aefData';
import { forums } from '../meetings/forumsData';

export default function Home() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleLogout = async () => {
    signOut();
    setIsProfileDropdownOpen(false);
  };

  const handleViewProfile = () => {
    navigate('/profile');
    setIsProfileDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="https://static.readdy.ai/image/849a2f489cee8d6814d30c5afad3a84a/b4bfbdc8f08b91298cef1ff69a069583.png"
                  alt="Africa Economic Forum"
                  className="w-10 h-10 object-contain"
                />
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-600"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </Link>

              <Link
                to="/initiatives"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Initiative
              </Link>

              <Link
                to="/stakeholders"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Stakeholders
              </Link>

              <Link
                to="/agenda"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Agenda
              </Link>

              <Link
                to="/publications"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Publications
              </Link>

              <Link
                to="/meetings"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Meetings
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title={user.user_metadata?.full_name || user.email}
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
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <div className="font-medium">
                          {user.user_metadata?.full_name || 'User'}
                        </div>
                        <div className="text-gray-500">{user.email}</div>
                      </div>

                      <button
                        onClick={handleViewProfile}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Profile
                      </button>

                      <button
                        onClick={handleLogout}
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
                  className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </Link>
              )}
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 cursor-pointer"
            >
              <i
                className={`ri-${
                  showMobileMenu ? 'close' : 'menu'
                }-line text-2xl`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-teal-600 bg-teal-50 rounded-md"
                onClick={() => setShowMobileMenu(false)}
              >
                Home
              </Link>

              <Link
                to="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                About
              </Link>

              <Link
                to="/initiatives"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Initiative
              </Link>

              <Link
                to="/stakeholders"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Stakeholders
              </Link>

              <Link
                to="/agenda"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Agenda
              </Link>

              <Link
                to="/publications"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Publications
              </Link>

              <Link
                to="/meetings"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Meetings
              </Link>

              <Link
                to="/contact"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setShowMobileMenu(false)}
              >
                Contact
              </Link>

              <div className="pt-4 pb-2">
                {isAuthenticated && user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2">
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

                      <span className="text-gray-700 font-medium">
                        {user.user_metadata?.full_name || 'User'}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        handleViewProfile();
                        setShowMobileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:text-teal-600 font-medium"
                    >
                      View Profile
                    </button>

                    <button
                      onClick={() => {
                        handleLogout();
                        setShowMobileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:text-teal-600 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/signin"
                    className="w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer block text-center"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <p className="text-blue-200 text-lg font-medium">
                    Africa Economic Forum 2026 • 10–11 Nov • Kinshasa
                  </p>

                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    A premier platform convening leaders, governments,
                    investors, and thinkers to shape Africa’s role in the new
                    global order
                  </h1>

                  <Link
                    to="/about"
                    className="bg-white text-blue-900 px-8 py-3 rounded-md hover:bg-gray-100 font-medium flex items-center space-x-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>More about the Forum</span>
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <video
                  ref={videoRef}
                  className="w-full h-96 rounded-lg shadow-lg object-cover"
                  src="/videos/aef-video.mp4"
                  title="Africa Economic Forum Video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                />

                <div className="absolute inset-0 bg-black/10 rounded-lg pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* How we drive impact */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                How we drive impact
              </h2>

              <div className="flex justify-center space-x-8 mb-12">
                <a
                  href="/initiatives"
                  className="px-6 py-3 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer bg-blue-900 text-white hover:bg-blue-800"
                >
                  Initiatives
                </a>

                <a
                  href="/meetings"
                  className="px-6 py-3 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer text-gray-600 hover:text-blue-900 hover:bg-gray-100"
                >
                  Meetings
                </a>

                <a
                  href="/stakeholders"
                  className="px-6 py-3 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer text-gray-600 hover:text-blue-900 hover:bg-gray-100"
                >
                  Stakeholders
                </a>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-gray-900">
                  How We Drive Impact
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Through strategic initiatives, partnerships, and platforms,
                  we create tangible pathways for Africa's economic
                  transformation and global leadership.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="ri-lightbulb-line text-blue-600"></i>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Strategic Dialogue Platforms
                      </h3>
                      <p className="text-gray-600">
                        Creating spaces for meaningful conversations between
                        African leaders and global partners.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="ri-handshake-line text-green-600"></i>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Partnership Facilitation
                      </h3>
                      <p className="text-gray-600">
                        Connecting African opportunities with global capital,
                        technology, and expertise.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="ri-rocket-line text-purple-600"></i>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Innovation Acceleration
                      </h3>
                      <p className="text-gray-600">
                        Supporting breakthrough solutions that address Africa's
                        most pressing challenges.
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="/initiatives"
                  className="bg-blue-900 text-white px-8 py-3 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer inline-block"
                >
                  <span>More about our Initiatives</span>
                </a>
              </div>

              {/* Right column content */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {aefInitiatives?.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover object-top"
                      />

                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mt-8">
                  {aefInitiatives?.slice(2, 4).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover object-top"
                      />

                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Meetings - même source que la page Meetings */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                See our Different Meetings
              </h2>

              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Explore our key meetings addressing Africa's most pressing
                economic challenges
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {forums.map((forum) => (
                <Link
                  key={forum.id}
                  to="/meetings"
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow block"
                >
                  <img
                    src={forum.image}
                    alt={forum.title}
                    className="w-full h-48 object-cover object-top"
                  />

                  <div className="p-6">
                    {forum.sectoralLabel && (
                      <p className="text-sm text-teal-600 font-medium mb-2">
                        {forum.sectoralLabel}
                      </p>
                    )}

                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {forum.title}
                    </h3>

                    <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                      {forum.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Spotlight */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Spotlight
                </h2>
                <p className="text-gray-600 text-lg">
                  Invest in Africa. Country by Country.
                </p>
              </div>

              <button className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium flex items-center space-x-2 whitespace-nowrap cursor-pointer">
                <span>More Stories</span>
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img
                      src="https://readdy.ai/api/search-image?query=Kinshasa%20panoramic%20view%20modern%20cityscape%20Congo%20river%20economic%20center%20dusk&width=800&height=500&seq=spotlight-main&orientation=landscape"
                      alt="Kinshasa 2026 : Carrefour des opportunités économiques et de la transformation en Afrique centrale"
                      className="w-full h-64 object-cover object-top"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-blue-600 font-medium text-sm">
                        Global Cooperation / African Growth
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      Kinshasa 2026 : Carrefour des opportunités économiques et
                      de la transformation en Afrique centrale.
                    </h3>
                  </div>
                </article>
              </div>

              <div className="space-y-6">
                <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <img
                        src="https://readdy.ai/api/search-image?query=Critical%20minerals%20mining%20cobalt%20copper%20Democratic%20Republic%20of%20Congo%20industrial%20site&width=300&height=200&seq=spotlight-1&orientation=landscape"
                        alt="Transition énergétique et chaînes de valeur des minerais stratégiques en RDC"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="p-4 flex-1">
                      <div className="mb-2">
                        <span className="text-blue-600 font-medium text-sm">
                          Transition Énergétique
                        </span>
                      </div>

                      <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-3">
                        Transition énergétique et chaînes de valeur des
                        minerais stratégiques en RDC.
                      </h4>
                    </div>
                  </div>
                </article>

                <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <img
                        src="https://readdy.ai/api/search-image?query=African%20tech%20startup%20digital%20innovation%20Kinshasa%20developers%20working%20on%20laptops&width=300&height=200&seq=spotlight-2&orientation=landscape"
                        alt="L'écosystème tech et l'essor des solutions numériques en République Démocratique du Congo"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="p-4 flex-1">
                      <div className="mb-2">
                        <span className="text-blue-600 font-medium text-sm">
                          Écosystème Tech
                        </span>
                      </div>

                      <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-3">
                        L'écosystème tech et l'essor des solutions numériques
                        en République Démocratique du Congo.
                      </h4>
                    </div>
                  </div>
                </article>

                <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <img
                        src="https://readdy.ai/api/search-image?query=Modern%20urban%20infrastructure%20public%20market%20renovation%20Kinshasa%20architecture&width=300&height=200&seq=spotlight-3&orientation=landscape"
                        alt="Modernisation des infrastructures urbaines et des marchés de Kinshasa"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="p-4 flex-1">
                      <div className="mb-2">
                        <span className="text-blue-600 font-medium text-sm">
                          Infrastructures
                        </span>
                      </div>

                      <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-3">
                        Modernisation des infrastructures urbaines et des
                        marchés de Kinshasa.
                      </h4>
                    </div>
                  </div>
                </article>

                <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <img
                        src="https://readdy.ai/api/search-image?query=Business%20meeting%20investors%20Kinshasa%20corporate%20partnership%20conference&width=300&height=200&seq=spotlight-4&orientation=landscape"
                        alt="Investir en RDC : Climat des affaires et partenariats stratégiques pour 2026"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="p-4 flex-1">
                      <div className="mb-2">
                        <span className="text-blue-600 font-medium text-sm">
                          Climat des Affaires
                        </span>
                      </div>

                      <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-3">
                        Investir en RDC : Climat des affaires et partenariats
                        stratégiques pour 2026.
                      </h4>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Discover */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Discover
                </h2>
                <p className="text-gray-600 text-lg">
                  Find stories through a selection of our key strategic topics
                </p>
              </div>

              <button className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium flex items-center space-x-2 whitespace-nowrap cursor-pointer">
                <span>More topics</span>
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>

            <div className="space-y-16">
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Resilience, Peace and Security
                  </h3>

                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-2 cursor-pointer">
                    <span>View more</span>
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                      <img
                        src="https://assets.weforum.org/article/image/Z6_Ad4qkPfdLI33a7PykS9BrrIcL916mG5SSEeOOksU.jpg"
                        alt="Why women must be involved in building flood resilience"
                        className="w-full h-48 object-cover object-top"
                      />

                      <div className="p-6">
                        <div className="mb-2">
                          <span className="text-blue-600 font-medium text-sm">
                            Articles
                          </span>
                        </div>

                        <h4 className="font-semibold text-gray-900 leading-tight">
                          Why women must be involved in building flood
                          resilience
                        </h4>
                      </div>
                    </article>
                  </div>

                  <div className="lg:col-span-2 space-y-4">
                    <article className="border-b border-gray-200 pb-4 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <div className="mb-1">
                            <span className="text-blue-600 font-medium text-sm">
                              Reports
                            </span>
                          </div>

                          <h5 className="font-medium text-gray-900 leading-tight hover:text-blue-600">
                            Building Economic Resilience to the Health Impacts
                            of Climate Change
                          </h5>
                        </div>
                      </div>
                    </article>

                    <article className="border-b border-gray-200 pb-4 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <div className="mb-1">
                            <span className="text-blue-600 font-medium text-sm">
                              Articles
                            </span>
                          </div>

                          <h5 className="font-medium text-gray-900 leading-tight hover:text-blue-600">
                            Why we must rethink ...
                          </h5>
                        </div>
                      </div>
                    </article>

                    <article className="border-b border-gray-200 pb-4 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <div className="mb-1">
                            <span className="text-blue-600 font-medium text-sm">
                              Articles
                            </span>
                          </div>

                          <h5 className="font-medium text-gray-900 leading-tight hover:text-blue-600">
                            Why is the International Day of Peace ...
                          </h5>
                        </div>
                      </div>
                    </article>

                    <article className="border-b border-gray-200 pb-4 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1">
                          <div className="mb-1">
                            <span className="text-blue-600 font-medium text-sm">
                              Articles
                            </span>
                          </div>

                          <h5 className="font-semibold text-gray-900 leading-tight hover:text-blue-600">
                            Japan's peace initiatives preserving the past for
                            the future
                          </h5>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">
                Subscribe to our Newsletters
              </h2>

              <p className="text-blue-200 text-lg">
                Stay updated with the latest insights, reports, and
                announcements from the Africa Economic Forum.
              </p>

              {subscribed ? (
                <div className="bg-teal-700/50 border border-teal-500 text-teal-100 px-6 py-4 rounded-md">
                  Thank you for subscribing to our newsletters!
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
                >
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="px-4 py-3 rounded-md text-gray-900 w-full sm:w-80 focus:outline-none"
                    required
                  />

                  <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-lg mb-6">About us</h3>

              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Our mission
                  </Link>
                </li>

                <li>
                  <Link
                    to="/framework"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Our Institutional Framework
                  </Link>
                </li>

                <li>
                  <Link
                    to="/history"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    History
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Leadership and governance
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Our Impact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">
                More from the Forum
              </h3>

              <ul className="space-y-3">
                <li>
                  <Link
                    to="/initiatives"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Centres
                  </Link>
                </li>

                <li>
                  <Link
                    to="/meetings"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Meetings
                  </Link>
                </li>

                <li>
                  <Link
                    to="/stakeholders"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Stakeholders
                  </Link>
                </li>

                <li>
                  <Link
                    to="/agenda"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Forum Stories
                  </Link>
                </li>

                <li>
                  <Link
                    to="/publications"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Press releases
                  </Link>
                </li>

                <li>
                  <Link
                    to="/gallery"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Photo gallery
                  </Link>
                </li>

                <li>
                  <Link
                    to="/publications"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Podcasts
                  </Link>
                </li>

                <li>
                  <Link
                    to="/publications"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Videos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">
                Engage with us
              </h3>

              <ul className="space-y-3">
                <li>
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/signin"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap cursor-pointer"
                    >
                      Sign in
                    </Link>
                  )}
                </li>

                <li>
                  <Link
                    to="/partners"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Partner with us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/join"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Become a member
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Sign up for our press releases
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Subscribe to our newsletters
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">Quick links</h3>

              <ul className="space-y-3 mb-8">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Sustainability at the Forum
                  </Link>
                </li>

                <li>
                  <Link
                    to="/careers"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Careers
                  </Link>
                </li>
              </ul>

              <div>
                <h4 className="font-semibold mb-4">
                  Language editions
                </h4>

                <div className="flex space-x-2">
                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    EN
                  </Link>

                  <span className="text-gray-500">•</span>

                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    ES
                  </Link>

                  <span className="text-gray-500">•</span>

                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    中文
                  </Link>

                  <span className="text-gray-500">•</span>

                  <Link
                    to="/"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    日本語
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/17Jr8NpqZJ/"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-facebook-fill text-xl"></i>
                </a>

                <a
                  href="https://www.linkedin.com/company/the-africa-economic-forum/"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-linkedin-fill text-xl"></i>
                </a>

                <a
                  href="https://www.instagram.com/theafricaeconomicforum?igsh=MWowNmw1NjdueXNkbQ=="
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-instagram-fill text-xl"></i>
                </a>

                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-youtube-fill text-xl"></i>
                </a>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
                <Link
                  to="/privacy"
                  className="hover:text-white cursor-pointer"
                >
                  Privacy Policy &amp; Terms of Service
                </Link>

                <p>© 2026 Africa Economic Forum</p>

                <a
                  href="https://codesignglobal.com"
                  className="hover:text-white cursor-pointer"
                >
                  Code Design Global
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
                  }
