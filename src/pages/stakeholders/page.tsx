import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Stakeholders() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignIn = () => {
    setShowSignInModal(true);
    setShowCreateAccount(false);
  };

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    if (email && password) {
      alert('Sign in successful! Welcome back.');
      setShowSignInModal(false);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleCreateAccountSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm_password') as string;
    const firstName = formData.get('first_name') as string;
    const lastName = formData.get('last_name') as string;
    
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
    
    if (email && password && firstName && lastName) {
      alert('Account created successfully! Welcome to Africa Economic Forum.');
      setShowSignInModal(false);
      setShowCreateAccount(false);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const switchToCreateAccount = () => {
    setShowCreateAccount(true);
  };

  const switchToSignIn = () => {
    setShowCreateAccount(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const stakeholderCategories = [
    {
      id: 'businesses',
      title: 'Businesses',
      description: 'Leading enterprises, corporates, and entrepreneurs shaping Africa\'s economic landscape and driving innovation across sectors.',
      image: 'https://readdy.ai/api/search-image?query=African%20business%20leaders%20in%20modern%20corporate%20boardroom%2C%20diverse%20group%20of%20executives%20in%20professional%20attire%20discussing%20strategy%2C%20contemporary%20office%20setting%20with%20African%20art%20and%20city%20skyline&width=600&height=400&seq=businesses&orientation=landscape',
      icon: 'ri-building-line',
      link: '/stakeholders/businesses'
    },
    {
      id: 'investors',
      title: 'Investors – AEF Investors Alliance',
      description: 'Global financiers, family offices, venture capitalists, and strategic investors committed to Africa\'s growth. Members gain access to a curated investment pipeline, private deal rooms, and high-level networking with Africa\'s most promising ventures.',
      image: 'https://readdy.ai/api/search-image?query=International%20investors%20and%20venture%20capitalists%20in%20elegant%20conference%20room%2C%20financial%20charts%20and%20African%20market%20data%20on%20screens%2C%20sophisticated%20investment%20meeting%20atmosphere&width=600&height=400&seq=investors&orientation=landscape',
      icon: 'ri-funds-line',
      link: '/stakeholders/investors'
    },
    {
      id: 'governments',
      title: 'Heads of State, Governments & Diplomats – AEF Diplomatic Club',
      description: 'Senior decision-makers and diplomats shaping policy and partnerships at the continental and global level. Members participate in exclusive roundtables, cross-border collaborations, and strategic dialogues on trade, investment, and development.',
      image: 'https://readdy.ai/api/search-image?query=African%20heads%20of%20state%20and%20diplomats%20in%20formal%20diplomatic%20meeting%2C%20flags%20of%20African%20nations%2C%20prestigious%20government%20building%20interior%20with%20ceremonial%20atmosphere&width=600&height=400&seq=governments&orientation=landscape',
      icon: 'ri-government-line',
      link: '/stakeholders/governments'
    },
    {
      id: 'international',
      title: 'International Institutions',
      description: 'Global organizations and multilateral agencies collaborating with African leaders to implement high-impact initiatives in development, trade, security, and climate action.',
      image: 'https://readdy.ai/api/search-image?query=International%20organization%20representatives%20in%20United%20Nations%20style%20assembly%20hall%2C%20diverse%20delegates%20from%20global%20institutions%2C%20formal%20diplomatic%20setting%20with%20world%20flags&width=600&height=400&seq=international&orientation=landscape',
      icon: 'ri-global-line',
      link: '/stakeholders/international'
    },
    {
      id: 'social',
      title: 'Civil Society Africa Peace Forum',
      description: 'Innovators driving sustainable solutions to Africa\'s most pressing challenges, blending social impact with business acumen.',
      image: 'https://readdy.ai/api/search-image?query=African%20social%20entrepreneurs%20working%20on%20sustainable%20development%20projects%2C%20community%20impact%20initiatives%2C%20innovative%20solutions%20for%20social%20challenges%2C%20inspiring%20grassroots%20leadership&width=600&height=400&seq=social&orientation=landscape',
      icon: 'ri-heart-line',
      link: '/stakeholders/social-entrepreneurs'
    },
    {
      id: 'academia',
      title: 'Academia AEF Think Tank',
      description: 'Thought leaders, researchers, and educational institutions contributing knowledge, research, and strategic insights for Africa\'s development.',
      image: 'https://readdy.ai/api/search-image?query=African%20academic%20researchers%20and%20professors%20in%20modern%20university%20library%2C%20books%20and%20research%20materials%2C%20intellectual%20discussion%20and%20knowledge%20sharing%20atmosphere&width=600&height=400&seq=academia&orientation=landscape',
      icon: 'ri-book-line',
      link: '/stakeholders/academia'
    },
    {
      id: 'youth',
      title: 'Youth',
      description: 'Young leaders, innovators, and change-makers representing Africa\'s future, empowered through mentorship, investment, and capacity-building opportunities.',
      image: 'https://readdy.ai/api/search-image?query=Young%20African%20leaders%20and%20innovators%20in%20dynamic%20startup%20environment%2C%20technology%20and%20entrepreneurship%2C%20vibrant%20youth%20empowerment%20and%20mentorship%20programs&width=600&height=400&seq=youth&orientation=landscape',
      icon: 'ri-user-star-line',
      link: '/stakeholders/youth'
    },
    {
      id: 'women',
      title: 'Women',
      description: 'Trailblazers and leaders advocating gender equality, inclusive economic growth, and the empowerment of women across Africa.',
      image: 'https://readdy.ai/api/search-image?query=Empowered%20African%20women%20leaders%20in%20professional%20conference%20setting%2C%20gender%20equality%20advocacy%2C%20women%20empowerment%20and%20leadership%20development%20programs&width=600&height=400&seq=women&orientation=landscape',
      icon: 'ri-women-line',
      link: '/stakeholders/women'
    },
    {
      id: 'media',
      title: 'Media',
      description: 'Journalists, broadcasters, and digital content creators shaping narratives and informing public discourse across Africa and the globe.',
      image: 'https://readdy.ai/api/search-image?query=African%20journalists%20and%20media%20professionals%20in%20modern%20newsroom%2C%20broadcasting%20equipment%20and%20digital%20content%20creation%2C%20professional%20journalism%20and%20media%20landscape&width=600&height=400&seq=media&orientation=landscape',
      icon: 'ri-broadcast-line',
      link: '/stakeholders/media'
    },
    {
      id: 'artists',
      title: 'Artists & Athletes',
      description: 'Creative and sports icons who inspire, unify, and amplify Africa\'s culture and excellence on the global stage.',
      image: 'https://readdy.ai/api/search-image?query=African%20artists%20and%20athletes%20celebrating%20cultural%20excellence%2C%20creative%20arts%20and%20sports%20achievements%2C%20inspiring%20cultural%20ambassadors%20and%20global%20recognition&width=600&height=400&seq=artists&orientation=landscape',
      icon: 'ri-palette-line',
      link: '/stakeholders/artists-athletes'
    }
  ];

  const filteredCategories = selectedCategory === 'all' 
    ? stakeholderCategories 
    : stakeholderCategories.filter(category => category.id === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="https://static.readdy.ai/image/433d1257c1dbc1f8bb2f3f1c418f6689/0727857f21d196505f8ef18cfc1cd897.png" 
                  alt="Africa Economic Forum" 
                  className="h-10 w-auto" 
                />
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                About
              </Link>
              <Link to="/initiatives" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Initiatives
              </Link>
              <Link to="/stakeholders" className="text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-600">
                Stakeholders
              </Link>
              <Link to="/meetings" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Meetings
              </Link>
              <Link to="/agenda" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Agenda
              </Link>
              <Link to="/publications" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Publications
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </Link>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="relative group">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover cursor-pointer"
                        title={user.name}
                        onClick={() => navigate('/profile')}
                      />
                    ) : (
                      <div 
                        className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center cursor-pointer"
                        title={user.name}
                        onClick={() => navigate('/profile')}
                      >
                        <span className="text-blue-600 text-sm font-medium">
                          {user.firstName?.charAt(0) || user.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                    )}
                    
                    {/* Dropdown menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <button 
                        onClick={() => navigate('/profile')} 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={signOut}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer"
                  >
                    Logout
                  </button>
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
              className="md:hidden p-2 cursor-pointer"
              onClick={toggleMobileMenu}
            >
              <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                Home
              </Link>
              <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                About
              </Link>
              <Link to="/initiatives" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                Initiatives
              </Link>
              <Link to="/stakeholders" className="block px-3 py-2 text-base font-medium text-teal-600 bg-teal-50 rounded-md">
                Stakeholders
              </Link>
              <Link to="/meetings" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                Meetings
              </Link>
              <Link to="/agenda" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                Agenda
              </Link>
              <Link to="/publications" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                Publications
              </Link>
              <Link to="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                Contact
              </Link>
              <div className="px-3 py-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-medium">
                            {user.firstName?.charAt(0) || user.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                      )}
                      <span className="text-gray-700 font-medium">{user.firstName || user.name}</span>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      View Profile
                    </Link>
                    <button 
                      onClick={() => {
                        signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-medium whitespace-nowrap cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/signin"
                    className="w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer block text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
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
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url('https://readdy.ai/api/search-image?query=Diverse%20group%20of%20African%20leaders%2C%20business%20executives%2C%20academics%20and%20civil%20society%20representatives%20in%20formal%20meeting%2C%20international%20conference%20setting%20with%20flags%20and%20modern%20architecture&width=1920&height=800&seq=stakeholders-hero&orientation=landscape')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Stakeholders</h1>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            The Africa Economic Forum (AEF) convenes the minds, leaders, and changemakers shaping Africa's future. 
            Our stakeholders are the engine of transformative investment, innovative policies, and sustainable development, 
            working together to position Africa as the next global frontier.
          </p>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto mt-6">
            AEF is where business, diplomacy, innovation, and culture intersect—a unique platform for collaboration, influence, and impact.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Stakeholders</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connecting Africa's most influential leaders, innovators, and change-makers across diverse sectors and industries.
            </p>
          </div>

          {/* Stakeholder Categories Grid */}
          <div className="space-y-16">
            {stakeholderCategories.map((category, index) => (
              <div key={category.id} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className={`${category.icon} text-2xl text-blue-600`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {category.description}
                  </p>
                  <Link
                    to={category.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Learn More
                    <i className="ri-arrow-right-line ml-2"></i>
                  </Link>
                </div>
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full rounded-lg shadow-md object-cover h-64"
                    onError={(e) => {
                      // fallback local placeholder caso a imagem remota falhe
                      (e.currentTarget as HTMLImageElement).src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
