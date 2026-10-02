import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function InitiativesPage() {
  // Original state
  const [activeTab, setActiveTab] = useState('magazine');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modified state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Original functions
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Modified functions
  const handleSignOut = async () => {
    await signOut();
    setIsProfileDropdownOpen(false);
  };

  const handleViewProfile = () => {
    navigate('/profile');
    setIsProfileDropdownOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const magazineSections = [
    {
      title: 'Deep Dives',
      description: 'Trends & challenges in key sectors (mining, energy, trade, etc.)',
      icon: 'ri-search-line'
    },
    {
      title: 'Spotlight',
      description: 'Profiles of African innovators, leaders & nations',
      icon: 'ri-spotlight-line'
    },
    {
      title: 'Sovereignty Watch',
      description: 'Policies, reforms & continental strategies',
      icon: 'ri-shield-line'
    },
    {
      title: 'Pan-African Trade Lens',
      description: 'AfCFTA and intra-African opportunities',
      icon: 'ri-global-line'
    },
    {
      title: 'Global Partnerships',
      description: 'Investment stories with China, UAE, Europe, etc.',
      icon: 'ri-handshake-line'
    },
    {
      title: 'Voices of Change',
      description: 'Youth, women, and grassroots entrepreneurs',
      icon: 'ri-mic-line'
    },
    {
      title: 'Future Africa',
      description: 'Tech, climate, innovation & development',
      icon: 'ri-rocket-line'
    }
  ];

  const programs = [
    {
      title: 'Sovereign Growth Partnerships',
      description: 'With governments to co-develop national branding & investment promotion strategies.',
      icon: 'ri-government-line',
      category: 'Government'
    },
    {
      title: 'Africa Investment & Innovation Fund (AIIF)',
      description: 'Supporting transformative startups and scalable projects across key sectors.',
      icon: 'ri-funds-line',
      category: 'Investment'
    },
    {
      title: 'AEF Labs',
      description: 'Startup incubator for early-stage African ventures.',
      icon: 'ri-flask-line',
      category: 'Incubation'
    },
    {
      title: 'Next Africa Accelerator',
      description: 'For growth-stage ventures & family businesses.',
      icon: 'ri-speed-up-line',
      category: 'Acceleration'
    },
    {
      title: 'Pan-African Economic Missions',
      description: 'Delegations and roadshows across Africa & globally to attract partnerships and capital.',
      icon: 'ri-plane-line',
      category: 'Missions'
    },
    {
      title: 'African Economic Intelligence Hub',
      description: 'A data platform providing fresh analysis, sector dashboards & forecasts.',
      icon: 'ri-database-line',
      category: 'Intelligence'
    },
    {
      title: 'Young Builders Fellowship',
      description: 'Empowering youth in policy, business & innovation.',
      icon: 'ri-user-star-line',
      category: 'Youth'
    },
    {
      title: 'Women Lead Africa Program',
      description: 'Empowering women-led enterprises and voices in the economic discourse.',
      icon: 'ri-women-line',
      category: 'Women'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="https://static.readdy.ai/image/849a2f489cee8d6814d30c5afad3a84a/b4bfbdc8f08b91298cef1ff69a069583.png" 
                  alt="AEF Logo" 
                  className="h-10 w-10 object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                About
              </Link>
              <Link to="/initiatives" className="text-blue-600 font-medium">
                Initiative
              </Link>
              <Link to="/stakeholders" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Stakeholders
              </Link>
              <Link to="/agenda" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Agenda
              </Link>
              <Link to="/publications" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Publications
              </Link>
              <Link to="/meetings" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Meetings
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
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
                        {getInitials(user.user_metadata?.full_name || user.email?.charAt(0) || 'U')}
                      </div>
                    )}
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <div className="font-medium">{user.user_metadata?.full_name || 'User'}</div>
                        <div className="text-gray-500">{user.email}</div>
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
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                  Home
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                  About
                </Link>
                <Link to="/initiatives" className="text-blue-600 font-medium">
                  Initiative
                </Link>
                <Link to="/stakeholders" className="text-gray-700 hover:text-blue-600 font-medium">
                  Stakeholders
                </Link>
                <Link to="/agenda" className="text-gray-700 hover:text-blue-600 font-medium">
                  Agenda
                </Link>
                <Link to="/publications" className="text-gray-700 hover:text-blue-600 font-medium">
                  Publications
                </Link>
                <Link to="/meetings" className="text-gray-700 hover:text-blue-600 font-medium">
                  Meetings
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                  Contact
                </Link>
                
                {user ? (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3 mb-4">
                      {user.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {getInitials(user.user_metadata?.full_name || user.email?.charAt(0) || 'U')}
                        </div>
                      )}
                      <span className="text-gray-700 font-medium">{user.user_metadata?.full_name || 'User'}</span>
                    </div>
                    <button
                      onClick={() => {
                        handleViewProfile();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium mb-2"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-100">
                    <Link to="/signin" className="block text-gray-700 hover:text-blue-600 font-medium">
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-blue-600 text-white py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=African%20business%20leaders%20collaborating%20on%20innovative%20economic%20initiatives%2C%20modern%20conference%20room%20with%20digital%20displays%20showing%20economic%20data%2C%20professional%20atmosphere%20with%20diverse%20African%20entrepreneurs%20working%20together%20on%20strategic%20projects%2C%20warm%20lighting%2C%20contemporary%20African%20business%20setting&width=1200&height=600&seq=initiatives-hero&orientation=landscape')`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Strategic Initiatives</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Driving real transformation beyond dialogue through innovative programs, strategic partnerships, and impactful initiatives that empower Africa's economic sovereignty.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-white rounded-full p-1 shadow-sm">
              <button
                onClick={() => setActiveTab('magazine')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'magazine'
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:text-teal-600'
                }`}
              >
                AEF Magazine
              </button>
              <button
                onClick={() => setActiveTab('programs')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'programs'
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:text-teal-600'
                }`}
              >
                Programs &amp; Projects
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AEF Magazine Section */}
      {activeTab === 'magazine' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">AEF Magazine</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Insight &amp; Influence from Africa to the World. A quarterly publication offering strategic investment and economic intelligence from an African-led perspective, promoting sovereignty and win-win cooperation.
              </p>
            </div>

            {/* Magazine Cover */}
            <div className="flex justify-center mb-16">
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=Professional%20African%20business%20magazine%20cover%20design%20featuring%20economic%20growth%20charts%2C%20African%20continent%20silhouette%2C%20modern%20typography%2C%20sophisticated%20layout%20with%20gold%20and%20teal%20accents%2C%20quarterly%20publication%20design%2C%20business%20intelligence%20theme%2C%20clean%20minimalist%20aesthetic&width=400&height=500&seq=magazine-cover&orientation=portrait"
                  alt="AEF Magazine Cover"
                  className="w-80 h-96 object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  Latest Issue
                </div>
              </div>
            </div>

            {/* Editorial Sections */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {magazineSections.map((section, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                    <i className={`${section.icon} text-teal-600 text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{section.title}</h3>
                  <p className="text-gray-600">{section.description}</p>
                </div>
              ))}
            </div>

            {/* Subscribe CTA */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Subscribe to AEF Magazine</h3>
                <p className="text-lg mb-6 opacity-90">
                  Get quarterly insights delivered to your inbox and stay ahead of Africa's economic transformation.
                </p>
                <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Programs & Projects Section */}
      {activeTab === 'programs' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Programs, Projects &amp; Initiatives</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Driving real transformation beyond dialogue through strategic programs that empower African economic sovereignty and foster sustainable growth.
              </p>
            </div>

            {/* Programs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                      <i className={`${program.icon} text-teal-600 text-xl`}></i>
                    </div>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      {program.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{program.title}</h3>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <button className="text-teal-600 font-medium hover:text-teal-700 transition-colors whitespace-nowrap cursor-pointer">
                    Learn More →
                  </button>
                </div>
              ))}
            </div>

            {/* Incubators & Accelerators Highlight */}
            <div className="mt-16 bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">AEF Incubators &amp; Accelerators</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="ri-flask-line text-blue-600 text-xl"></i>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">AEF Labs</h4>
                  <p className="text-gray-600 mb-4">Startup incubator for early-stage African ventures with innovative solutions.</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="ri-time-line mr-2"></i>
                    6-month program
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <i className="ri-speed-up-line text-green-600 text-xl"></i>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">Next Africa Accelerator</h4>
                  <p className="text-gray-600 mb-4">For growth-stage ventures &amp; family businesses ready to scale across Africa.</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="ri-time-line mr-2"></i>
                    3-month intensive
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Strategic Initiatives</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Partner with us to drive Africa's economic transformation through innovative programs and strategic cooperation.
          </p>
        </div>
      </section>

      {/* Footer Links */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-lg mb-6">About us</h3>
              <ul className="space-y-3">
                <li><a href="/about" className="text-gray-300 hover:text-white cursor-pointer">Our mission</a></li>
                <li><a href="/framework" className="text-gray-300 hover:text-white cursor-pointer">Our Institutional Framework</a></li>
                <li><a href="/history" className="text-gray-300 hover:text-white cursor-pointer">History</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white cursor-pointer">Leadership and governance</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-white cursor-pointer">Our Impact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">More from the Forum</h3>
              <ul className="space-y-3">
                <li><a href="/initiatives" className="text-gray-300 hover:text-white cursor-pointer">Centres</a></li>
                <li><a href="/meetings" className="text-gray-300 hover:text-white cursor-pointer">Meetings</a></li>
                <li><a href="/stakeholders" className="text-gray-300 hover:text-white cursor-pointer">Stakeholders</a></li>
                <li><a href="/agenda" className="text-gray-300 hover:text-white cursor-pointer">Forum Stories</a></li>
                <li><a href="/publications" className="text-gray-300 hover:text-white cursor-pointer">Press releases</a></li>
                <li><a href="/gallery" className="text-gray-300 hover:text-white cursor-pointer">Photo gallery</a></li>
                <li><a href="/publications" className="text-gray-300 hover:text-white cursor-pointer">Podcasts</a></li>
                <li><a href="/publications" className="text-gray-300 hover:text-white cursor-pointer">Videos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">Engage with us</h3>
              <ul className="space-y-3">
                {user ? (
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/signin"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap cursor-pointer inline-block"
                    >
                      Sign in
                    </Link>
                  </li>
                )}
                <li><a href="/partners" className="text-gray-300 hover:text-white cursor-pointer">Partner with us</a></li>
                <li><a href="/join" className="text-gray-300 hover:text-white cursor-pointer">Become a member</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white cursor-pointer">Sign up for our press releases</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white cursor-pointer">Subscribe to our newsletters</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white cursor-pointer">Contact us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">Quick links</h3>
              <ul className="space-y-3 mb-8">
                <li><a href="/about" className="text-gray-300 hover:text-white cursor-pointer">Sustainability at the Forum</a></li>
                <li><a href="/careers" className="text-gray-300 hover:text-white cursor-pointer">Careers</a></li>
              </ul>
              <div>
                <h4 className="font-semibold mb-4">Language editions</h4>
                <div className="flex space-x-2">
                  <a href="/" className="text-gray-300 hover:text-white cursor-pointer">EN</a>
                  <span className="text-gray-500">•</span>
                  <a href="/es" className="text-gray-300 hover:text-white cursor-pointer">ES</a>
                  <span className="text-gray-500">•</span>
                  <a href="/cn" className="text-gray-300 hover:text-white cursor-pointer">中文</a>
                  <span className="text-gray-500">•</span>
                  <a href="/jp" className="text-gray-300 hover:text-white cursor-pointer">日本語</a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/share/17Jr8NpqZJ/" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <i className="ri-facebook-fill text-xl"></i>
                </a>
                <a href="https://www.linkedin.com/company/the-africa-economic-forum/" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <i className="ri-linkedin-fill text-xl"></i>
                </a>
                <a href="https://www.instagram.com/theafricaeconomicforum?igsh=MWowNmw1NjdueXNkbQ==" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <i className="ri-instagram-fill text-xl"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer">
                  <i className="ri-youtube-fill text-xl"></i>
                </a>
              </div>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
                <a href="/privacy" className="hover:text-white cursor-pointer">Privacy Policy &amp; Terms of Service</a>
                
                <p>© 2026 Africa Economic Forum</p>
                <a href="https://codesignglobal.com/" className="hover:text-white cursor-pointer">Code Design Global</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
              }
