import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BusinessesPage() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showMembershipForm, setShowMembershipForm] = useState(false);

  const handleSignIn = () => {
    setShowSignInModal(true);
  };

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      if (email && password) {
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

  const handleMembershipSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const companyName = formData.get('company_name') as string;
      const contactName = formData.get('contact_name') as string;
      const email = formData.get('email') as string;
      const phone = formData.get('phone') as string;
      const industry = formData.get('industry') as string;
      const companySize = formData.get('company_size') as string;

      if (companyName && contactName && email && phone && industry && companySize) {
        alert('Membership application submitted successfully! We will contact you within 48 hours.');
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
      icon: 'ri-handshake-line',
      title: 'Strategic Partnerships',
      description: 'Connect with leading African and international businesses for joint ventures and collaborations.'
    },
    {
      icon: 'ri-funds-line',
      title: 'Investment Opportunities',
      description: 'Access exclusive investment deals and funding opportunities across African markets.'
    },
    {
      icon: 'ri-global-line',
      title: 'Market Intelligence',
      description: 'Receive quarterly insights and market analysis to inform your business strategy.'
    },
    {
      icon: 'ri-group-line',
      title: 'Executive Networking',
      description: 'Join exclusive events and roundtables with C-suite executives and industry leaders.'
    },
    {
      icon: 'ri-government-line',
      title: 'Policy Influence',
      description: 'Participate in policy discussions and contribute to economic frameworks.'
    },
    {
      icon: 'ri-trophy-line',
      title: 'Recognition Programs',
      description: 'Showcase your achievements through our awards and recognition initiatives.'
    }
  ];

  const memberCompanies = [
    {
      name: 'Dangote Group',
      industry: 'Conglomerate',
      country: 'Nigeria',
      description: 'Africa\'s largest industrial conglomerate with operations across cement, sugar, and petrochemicals.',
      logo: 'https://readdy.ai/api/search-image?query=Dangote%20Group%20corporate%20logo%2C%20Nigerian%20multinational%20conglomerate%20company%20branding%2C%20professional%20business%20logo%20design&width=120&height=80&seq=dangote-logo&orientation=landscape'
    },
    {
      name: 'Shoprite Holdings',
      industry: 'Retail',
      country: 'South Africa',
      description: 'Leading retail chain across Africa with over 2,800 stores in 15 countries.',
      logo: 'https://readdy.ai/api/search-image?query=Shoprite%20Holdings%20corporate%20logo%2C%20South%20African%20retail%20company%20branding%2C%20supermarket%20chain%20logo%20design&width=120&height=80&seq=shoprite-logo&orientation=landscape'
    },
    {
      name: 'Equity Bank',
      industry: 'Financial Services',
      country: 'Kenya',
      description: 'Pan-African financial services provider serving over 14 million customers.',
      logo: 'https://readdy.ai/api/search-image?query=Equity%20Bank%20corporate%20logo%2C%20Kenyan%20financial%20services%20company%20branding%2C%20banking%20institution%20logo%20design&width=120&height=80&seq=equity-logo&orientation=landscape'
    },
    {
      name: 'MTN Group',
      industry: 'Telecommunications',
      country: 'South Africa',
      description: 'Leading telecommunications operator across Africa and the Middle East.',
      logo: 'https://readdy.ai/api/search-image?query=MTN%20Group%20corporate%20logo%2C%20South%20African%20telecommunications%20company%20branding%2C%20mobile%20network%20operator%20logo&width=120&height=80&seq=mtn-logo&orientation=landscape'
    },
    {
      name: 'Ecobank',
      industry: 'Banking',
      country: 'Togo',
      description: 'Pan-African banking group operating in 33 African countries.',
      logo: 'https://readdy.ai/api/search-image?query=Ecobank%20corporate%20logo%2C%20Togolese%20pan-African%20banking%20group%20branding%2C%20financial%20institution%20logo%20design&width=120&height=80&seq=ecobank-logo&orientation=landscape'
    },
    {
      name: 'Sasol',
      industry: 'Energy & Chemicals',
      country: 'South Africa',
      description: 'Integrated energy and chemical company with operations across Africa.',
      logo: 'https://readdy.ai/api/search-image?query=Sasol%20corporate%20logo%2C%20South%20African%20energy%20and%20chemical%20company%20branding%2C%20industrial%20corporation%20logo&width=120&height=80&seq=sasol-logo&orientation=landscape'
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
              <button
                onClick={handleSignIn}
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap cursor-pointer"
              >
                Sign In
              </button>
            </div>
            <button className="md:hidden p-2 cursor-pointer">
              <i className="ri-menu-line text-2xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url('https://readdy.ai/api/search-image?query=African%20business%20leaders%20in%20modern%20corporate%20boardroom%2C%20diverse%20group%20of%20executives%20in%20professional%20attire%20discussing%20strategy%2C%20contemporary%20office%20setting%20with%20African%20art%20and%20city%20skyline&width=1920&height=800&seq=businesses-hero&orientation=landscape')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-building-line text-3xl text-white"></i>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">Business Stakeholders</h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Leading enterprises, corporates, and entrepreneurs shaping Africa's economic landscape and driving innovation across sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Membership Benefits</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join Africa's most influential business network and unlock exclusive opportunities for growth and collaboration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${benefit.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Companies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Distinguished Members</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join leading African businesses that are driving economic transformation across the continent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memberCompanies.map((company, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="w-16 h-12 object-contain mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                    <p className="text-sm text-gray-500">{company.country}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                    {company.industry}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{company.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Business Network Impact</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">500+</div>
              <div className="text-gray-600">Member Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">$50B+</div>
              <div className="text-gray-600">Combined Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">2M+</div>
              <div className="text-gray-600">Jobs Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-900 mb-2">35</div>
              <div className="text-gray-600">Countries Represented</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Africa's Leading Business Network?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Connect with influential business leaders, access exclusive opportunities, and drive Africa's economic transformation.
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
                <h3 className="text-2xl font-bold text-gray-900">Business Membership Application</h3>
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
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Enter company name"
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
                      placeholder="company@example.com"
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
                      Industry *
                    </label>
                    <select
                      name="industry"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                    >
                      <option value="">Select industry</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="banking">Banking & Finance</option>
                      <option value="construction">Construction</option>
                      <option value="energy">Energy & Mining</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="retail">Retail & Consumer Goods</option>
                      <option value="technology">Technology</option>
                      <option value="telecommunications">Telecommunications</option>
                      <option value="transportation">Transportation & Logistics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Size *
                    </label>
                    <select
                      name="company_size"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                    >
                      <option value="">Select size</option>
                      <option value="startup">Startup (1-10 employees)</option>
                      <option value="small">Small (11-50 employees)</option>
                      <option value="medium">Medium (51-250 employees)</option>
                      <option value="large">Large (251-1000 employees)</option>
                      <option value="enterprise">Enterprise (1000+ employees)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Description
                  </label>
                  <textarea
                    name="company_description"
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Brief description of your company and business activities (max 500 characters)"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Membership Interests
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" name="interest_networking" className="cursor-pointer" />
                      <span className="text-sm text-gray-700">Networking</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" name="interest_investment" className="cursor-pointer" />
                      <span className="text-sm text-gray-700">Investment Opportunities</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" name="interest_partnerships" className="cursor-pointer" />
                      <span className="text-sm text-gray-700">Strategic Partnerships</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" name="interest_policy" className="cursor-pointer" />
                      <span className="text-sm text-gray-700">Policy Influence</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="terms_agreement"
                    required
                    className="mt-1 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the Terms of Service and Privacy Policy, and consent to being contacted regarding membership opportunities.
                  </span>
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
                  Privacy Policy &amp; Terms of Service
                </a>
                
                <p>© 2025 Africa Economic Forum</p>
                <a href="https://codesignglobal.com" className="hover:text-white cursor-pointer">Code Design Global</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
