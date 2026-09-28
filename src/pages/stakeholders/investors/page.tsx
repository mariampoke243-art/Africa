'use client';

import { useState, useEffect } from 'react';

export default function InvestorsPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [showMembershipForm, setShowMembershipForm] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('aef_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleSignIn = () => {
    setShowSignInModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('aef_user');
    setUser(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const switchToCreateAccount = () => {
    setShowSignInModal(false);
    setShowCreateAccountModal(true);
  };

  const switchToSignIn = () => {
    setShowCreateAccountModal(false);
    setShowSignInModal(true);
  };

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      if (email && password) {
        const userData = { name: email.split('@')[0], email };
        localStorage.setItem('aef_user', JSON.stringify(userData));
        setUser(userData);
        alert('Login successful! Welcome back.');
        setShowSignInModal(false);
      } else {
        alert('Please fill in all required fields.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleCreateAccountSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      if (name && email && password) {
        const userData = { name, email };
        localStorage.setItem('aef_user', JSON.stringify(userData));
        setUser(userData);
        alert('Account created successfully! Welcome to AEF.');
        setShowCreateAccountModal(false);
      } else {
        alert('Please fill in all required fields.');
      }
    } catch (err) {
      console.error('Account creation error:', err);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleMembershipSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const organizationName = formData.get('organization_name') as string;
      const contactName = formData.get('contact_name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const investorType = formData.get('investor_type') as string;
      const investmentFocus = formData.get('investment_focus') as string;

      if (organizationName && contactName && email && phone && investorType && investmentFocus) {
        alert('Membership application submitted successfully! We will contact you within 48 hours to discuss exclusive opportunities.');
        setShowMembershipForm(false);
      } else {
        alert('Please fill in all required fields.');
      }
    } catch (err) {
      console.error('Membership application error:', err);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const benefits = [
    {
      icon: 'ri-eye-line',
      title: 'Curated Deal Pipeline',
      description: 'Access to pre-screened, high-potential investment opportunities across Africa.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Private Deal Rooms',
      description: 'Exclusive access to confidential investment opportunities and due diligence materials.'
    },
    {
      icon: 'ri-group-line',
      title: 'Investor Networking',
      description: 'Connect with leading global investors, family offices, and institutional funds.'
    },
    {
      icon: 'ri-bar-chart-line',
      title: 'Market Intelligence',
      description: 'Comprehensive market analysis, sector reports, and investment trends across Africa.'
    },
    {
      icon: 'ri-handshake-line',
      title: 'Co-Investment Opportunities',
      description: 'Participate in syndicated deals with other alliance members and strategic partners.'
    },
    {
      icon: 'ri-calendar-line',
      title: 'Exclusive Events',
      description: 'Private investor roundtables, deal showcases, and strategic partnership meetings.'
    }
  ];

  const memberInvestors = [
    {
      name: 'Africa Finance Corporation',
      type: 'Development Finance',
      country: 'Nigeria',
      description: 'Leading pan-African multilateral development finance institution with $9 billion in assets.',
      logo: 'https://readdy.ai/api/search-image?query=Africa%20Finance%20Corporation%20AFC%20logo%2C%20Nigerian%20development%20finance%20institution%20branding%2C%20multilateral%20financial%20organization%20logo&width=120&height=80&seq=afc-logo&orientation=landscape'
    },
    {
      name: 'TLcom Capital',
      type: 'Venture Capital',
      country: 'Kenya/UK',
      description: 'Africa-focused VC firm investing in scalable tech companies across the continent.',
      logo: 'https://readdy.ai/api/search-image?query=TLcom%20Capital%20venture%20capital%20logo%2C%20African%20tech%20investment%20firm%20branding%2C%20VC%20company%20logo%20design&width=120&height=80&seq=tlcom-logo&orientation=landscape'
    },
    {
      name: 'Helios Investment Partners',
      type: 'Private Equity',
      country: 'UK/Nigeria',
      description: 'Premier Africa-focused private equity firm with over $4 billion in assets under management.',
      logo: 'https://readdy.ai/api/search-image?query=Helios%20Investment%20Partners%20private%20equity%20logo%2C%20African%20investment%20firm%20branding%2C%20PE%20company%20logo%20design&width=120&height=80&seq=helios-logo&orientation=landscape'
    },
    {
      name: 'Partech Africa',
      type: 'Venture Capital',
      country: 'Senegal/France',
      description: 'Leading VC fund dedicated to African tech startups with $143 million fund.',
      logo: 'https://readdy.ai/api/search-image?query=Partech%20Africa%20venture%20capital%20logo%2C%20African%20tech%20startup%20investment%20firm%20branding%2C%20VC%20fund%20logo&width=120&height=80&seq=partech-logo&orientation=landscape'
    },
    {
      name: 'Development Bank of Southern Africa',
      type: 'Development Finance',
      country: 'South Africa',
      description: 'Development finance institution focused on infrastructure and economic development.',
      logo: 'https://readdy.ai/api/search-image?query=Development%20Bank%20of%20Southern%20Africa%20DBSA%20logo%2C%20South%20African%20development%20finance%20institution%20branding&width=120&height=80&seq=dbsa-logo&orientation=landscape'
    },
    {
      name: 'Novastar Ventures',
      type: 'Impact Investment',
      country: 'Kenya',
      description: 'Impact investor focused on scalable businesses serving low-income populations in Africa.',
      logo: 'https://readdy.ai/api/search-image?query=Novastar%20Ventures%20impact%20investment%20logo%2C%20Kenyan%20impact%20investor%20branding%2C%20social%20impact%20fund%20logo&width=120&height=80&seq=novastar-logo&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img
                  src="https://static.readdy.ai/image/433d1257c1dbc1f8bb2f3f1c418f6689/0727857f21d196505f8ef18cfc1cd897.png"
                  alt="Africa Economic Forum"
                  className="h-10 w-auto"
                />
              </a>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="/about" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                About
              </a>
              <a href="/initiatives" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Initiatives
              </a>
              <a href="/stakeholders" className="text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-600">
                Stakeholders
              </a>
              <a href="/agenda" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Agenda
              </a>
              <a href="/publications" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Publications
              </a>
              <a href="/meetings" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Meetings
              </a>
              <a href="/contact" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </a>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>
              )}
            </div>
            <button onClick={toggleMobileMenu} className="md:hidden p-2 cursor-pointer">
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url('https://readdy.ai/api/search-image?query=International%20investors%20and%20venture%20capitalists%20in%20elegant%20conference%20room%2C%20financial%20charts%20and%20African%20market%20data%20on%20screens%2C%20sophisticated%20investment%20meeting%20atmosphere&width=1920&height=800&seq=investors-hero&orientation=landscape')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-funds-line text-3xl text-white"></i>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">AEF Investors Alliance</h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Global financiers, family offices, venture capitalists, and strategic investors committed to Africa's growth. 
              Members gain access to a curated investment pipeline, private deal rooms, and high-level networking with Africa's most promising ventures.
            </p>
          </div>
        </div>
      </section>

      {/* Alliance Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Alliance Benefits</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join Africa's premier investor network and unlock exclusive access to the continent's most promising investment opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${benefit.icon} text-2xl text-green-600`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Focus Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Investment Focus Areas</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our alliance members are actively investing across key sectors driving Africa's economic transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="ri-smartphone-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fintech</h3>
              <p className="text-gray-600 text-sm">Digital payments, lending, and financial inclusion solutions</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="ri-leaf-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Agritech</h3>
              <p className="text-gray-600 text-sm">Agricultural technology and food security innovations</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="ri-health-book-line text-2xl text-purple-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Healthtech</h3>
              <p className="text-gray-600 text-sm">Digital health solutions and medical technology</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="ri-graduation-cap-line text-2xl text-orange-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Edtech</h3>
              <p className="text-gray-600 text-sm">Educational technology and skills development platforms</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="ri-flashlight-line text-2xl text-red-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Energy</h3>
              <p className="text-gray-600 text-sm">Renewable energy and clean technology solutions</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="ri-truck-line text-2xl text-indigo-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Logistics</h3>
              <p className="text-gray-600 text-sm">Supply chain and transportation technology</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="ri-building-line text-2xl text-teal-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Estate</h3>
              <p className="text-gray-600 text-sm">Property technology and urban development</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="ri-shopping-cart-line text-2xl text-yellow-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">E-commerce</h3>
              <p className="text-gray-600 text-sm">Online retail and marketplace platforms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Alliance Members */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Distinguished Alliance Members</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join leading investors who are actively shaping Africa's investment landscape and driving economic growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memberInvestors.map((investor, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <img
                    src={investor.logo}
                    alt={`${investor.name} logo`}
                    className="w-16 h-12 object-contain mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{investor.name}</h3>
                    <p className="text-sm text-gray-500">{investor.country}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    {investor.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{investor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Alliance Impact</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$2.5B+</div>
              <div className="text-gray-600">Capital Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-600">Portfolio Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">85+</div>
              <div className="text-gray-600">Alliance Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">25</div>
              <div className="text-gray-600">Countries Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Join the AEF Investors Alliance</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Access exclusive investment opportunities, connect with leading investors, and be part of Africa's economic transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowMembershipForm(true)}
              className="bg-white text-blue-900 px-8 py-3 rounded-md hover:bg-gray-100 font-medium whitespace-nowrap cursor-pointer"
            >
              Apply for Membership
            </button>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-blue-900 font-medium whitespace-nowrap cursor-pointer inline-block"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Sign In</h3>
                <button
                  onClick={() => setShowSignInModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={switchToCreateAccount}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Create one
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Account Modal */}
      {showCreateAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Create Account</h3>
                <button
                  onClick={() => setShowCreateAccountModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleCreateAccountSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Create a password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer"
                >
                  Create Account
                </button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={switchToSignIn}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Membership Application Modal */}
      {showMembershipForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Investors Alliance Application</h3>
                <button
                  onClick={() => setShowMembershipForm(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleMembershipSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      name="organization_name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Fund/Organization name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contact_name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Full name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="contact@fund.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investor Type *
                    </label>
                    <select
                      name="investor_type"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                    >
                      <option value="">Select type</option>
                      <option value="venture_capital">Venture Capital</option>
                      <option value="private_equity">Private Equity</option>
                      <option value="family_office">Family Office</option>
                      <option value="institutional">Institutional Investor</option>
                      <option value="development_finance">Development Finance</option>
                      <option value="impact_investor">Impact Investor</option>
                      <option value="angel_investor">Angel Investor</option>
                      <option value="sovereign_wealth">Sovereign Wealth Fund</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Focus *
                    </label>
                    <select
                      name="investment_focus"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                    >
                      <option value="">Select focus</option>
                      <option value="fintech">Fintech</option>
                      <option value="agritech">Agritech</option>
                      <option value="healthtech">Healthtech</option>
                      <option value="edtech">Edtech</option>
                      <option value="energy">Energy & Clean Tech</option>
                      <option value="logistics">Logistics & Supply Chain</option>
                      <option value="real_estate">Real Estate</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="multi_sector">Multi-Sector</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
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
                <li>
                  {user ? (
                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer">
                      Logout
                    </button>
                  ) : (
                    <button onClick={handleSignIn} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap cursor-pointer">
                      Sign in
                    </button>
                  )}
                </li>
                <li><a href="/partners" className="text-gray-300 hover:text-white cursor-pointer">Become our partner</a></li>
                <li><a href="/join" className="text-gray-300 hover:text-white cursor-pointer">Become a member</a></li>
                <li><a href="/publications" className="text-gray-300 hover:text-white cursor-pointer">Subscribe to our press releases</a></li>
                <li><a href="/publications" className="text-gray-300 hover:text-white cursor-pointer">Subscribe to our newsletters</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white cursor-pointer">Contact us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">Quick links</h3>
              <ul className="space-y-3 mb-8">
                <li><a href="/initiatives" className="text-gray-300 hover:text-white cursor-pointer">Sustainability at the Forum</a></li>
                <li><a href="/careers" className="text-gray-300 hover:text-white cursor-pointer">Careers</a></li>
              </ul>
              <div>
                <h4 className="font-semibold mb-4">Language editions</h4>
                <div className="flex space-x-2">
                  <a href="/" className="text-gray-300 hover:text-white cursor-pointer">PT</a>
                  <span className="text-gray-500">•</span>
                  <a href="/en" className="text-gray-300 hover:text-white cursor-pointer">EN</a>
                  <span className="text-gray-500">•</span>
                  <a href="/es" className="text-gray-300 hover:text-white cursor-pointer">ES</a>
                  <span className="text-gray-500">•</span>
                  <a href="/fr" className="text-gray-300 hover:text-white cursor-pointer">FR</a>
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
                <a href="/privacy" className="hover:text-white cursor-pointer">
                  Privacy Policy & Terms of Service
                </a>
                
                <p>© 2026 Africa Economic Forum</p>
                <a href="https://codesignglobal.com" className="hover:text-white cursor-pointer">Code Design Global</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
