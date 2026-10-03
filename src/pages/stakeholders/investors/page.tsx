'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/client';

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

      if (
        organizationName &&
        contactName &&
        email &&
        phone &&
        investorType &&
        investmentFocus
      ) {
        const { error } = await supabase
          .from('investors_alliance_applications')
          .insert([
            {
              organization_name: organizationName,
              contact_name: contactName,
              email: email,
              phone: phone,
              investor_type: investorType,
              investment_focus: investmentFocus,
            },
          ]);

        if (error) {
          console.error('Failed to submit Investors Alliance application:', error);
          alert('An error occurred while submitting your application. Please try again.');
          return;
        }

        alert(
          'Membership application submitted successfully! We will contact you within 48 hours to discuss exclusive opportunities.'
        );

        setShowMembershipForm(false);
      } else {
        alert('Please fill in all required fields.');
      }
    } catch (err) {
      console.error('Membership application error:', err);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const whyAfricaCards = [
    {
      icon: 'ri-team-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: "The World's Youngest Workforce",
      paragraphs: [
        "Africa's population is expected to exceed 2.5 billion people by 2050.",
        'With the youngest population globally, the continent is becoming one of the largest sources of talent, innovation, entrepreneurship and consumer demand.',
        'For investors, this represents one of the most compelling long-term growth stories of the century.',
      ],
    },
    {
      icon: 'ri-battery-charge-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      title: 'The Resources Driving the Global Economy',
      paragraphs: [
        'Africa holds a significant share of the minerals required for batteries, electric vehicles, renewable energy systems, semiconductors and advanced technologies.',
        "As governments and industries compete to secure critical supply chains, Africa's strategic importance continues to grow.",
      ],
    },
    {
      icon: 'ri-building-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'A Trillion-Dollar Infrastructure Opportunity',
      paragraphs: [
        'Energy systems, transport corridors, ports, airports, logistics networks, housing, water systems and digital connectivity require substantial investment across the continent.',
        'The scale of opportunity is among the largest anywhere in the world.',
      ],
    },
  ];

  const sectors = [
    'Energy',
    'Critical Minerals',
    'Infrastructure',
    'Technology & Artificial Intelligence',
    'Healthcare',
    'Agribusiness',
    'Tourism',
    'Financial Services',
    'Manufacturing',
    'Logistics & Transportation',
    'Real Estate',
    'Climate & Sustainability',
  ];

  const memberGains = [
    {
      icon: 'ri-key-2-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Access',
      description: 'Direct engagement with policymakers, investors, project developers, government leaders and business executives.',
    },
    {
      icon: 'ri-bar-chart-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      title: 'Intelligence',
      description: 'Exclusive insights into market developments, investment trends, geopolitical shifts and emerging opportunities.',
    },
    {
      icon: 'ri-group-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'Relationships',
      description: 'Curated introductions and private networking opportunities that accelerate decision-making and partnership creation.',
    },
    {
      icon: 'ri-shield-check-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      title: 'Opportunities',
      description: 'Access to investment-ready projects, strategic partnerships, co-investment opportunities and the AEF Deal Room ecosystem.',
    },
    {
      icon: 'ri-presentation-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      title: 'Influence',
      description: "A seat at the table where conversations about Africa's economic future are being shaped.",
    },
  ];

  const membershipIncludes = [
    'Official AEF Investors Alliance Membership',
    'Flagship Africa Economic Forum Delegate & Investor Pass',
    'Full Access to the AEF Deal Room',
    'Access to the Annual AEF Deal Book',
    'Invitation to Closed-Door Investor Sessions',
    'Private Investor Networking Events',
    'Year-Round Investment Pipeline Access',
    'Curated Introductions and Investor Matchmaking',
    'Access to the Members Directory',
    'Exclusive Market Intelligence Briefings',
    'Priority Access to Investment Missions',
    'Priority Access to Investor Roundtables',
    'Opportunities to Engage with Governments and Project Sponsors',
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

            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              AEF Investors Alliance
            </h1>

            <p className="text-2xl font-semibold text-blue-100 mb-6">
              The Gateway for Investing in Africa
            </p>

            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Africa is not the future. Africa is now.
            </p>

            <button
              onClick={() => setShowMembershipForm(true)}
              className="bg-white text-blue-900 px-8 py-3 rounded-md hover:bg-gray-100 font-medium whitespace-nowrap cursor-pointer"
            >
              Apply for Membership
            </button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            The global race for resources, markets, talent and growth is accelerating. While mature economies face slowing demographics and constrained growth, Africa is emerging as one of the world's most significant investment frontiers.
          </p>

          <p className="text-2xl font-bold text-blue-900">
            By 2050, one in four people on Earth will be African.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            The continent possesses the critical minerals powering the global energy transition, some of the world's fastest-growing cities, expanding digital economies, vast agricultural potential, and unprecedented infrastructure opportunities.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            From copper and cobalt in the Democratic Republic of Congo to lithium across Southern Africa, from renewable energy and digital infrastructure to healthcare, tourism, logistics, manufacturing and artificial intelligence, Africa is entering a defining decade.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            The question is no longer whether Africa matters.
          </p>

          <p className="text-xl font-semibold text-gray-900 leading-relaxed">
            The question is who will be positioned to participate in its rise.
          </p>
        </div>
      </section>

      {/* Where Conversations Are Shaped */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Where Conversations About Investing in Africa Are Shaped
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              The AEF Investors Alliance is a high-level community of investors, family offices, sovereign wealth funds, development finance institutions, private equity firms, venture capital leaders, multinational corporations and strategic partners committed to unlocking opportunities across Africa.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              More than a network, it is a platform where capital meets opportunity, where relationships become partnerships, and where conversations lead to action.
            </p>

            <p className="text-xl font-semibold text-gray-900 leading-relaxed">
              Because in Africa, access often determines who sees an opportunity—and who secures it.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              The Alliance was created for decision-makers who understand that investment success requires more than information.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              It requires trusted relationships, strategic intelligence and direct access.
            </p>
          </div>
        </div>
      </section>

      {/* Why Africa? Why Now? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Why Africa? Why Now?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyAfricaCards.map((card) => (
              <div
                key={card.title}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center mb-4`}
                >
                  <i className={`${card.icon} text-2xl ${card.iconColor}`}></i>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {card.title}
                </h3>

                <div className="space-y-3">
                  {card.paragraphs.map((p) => (
                    <p key={p} className="text-gray-600">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-line-chart-line text-2xl text-orange-600"></i>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                The Rise of African Markets
              </h3>

              <p className="text-gray-600 mb-4">
                Rapid urbanization, digital adoption, financial inclusion and a growing middle class are transforming sectors such as:
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {sectors.map((sector) => (
                  <span
                    key={sector}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {sector}
                  </span>
                ))}
              </div>

              <p className="text-gray-600">
                The next generation of global growth stories will increasingly be found in Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Members Gain */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              What Members Gain
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memberGains.map((gain) => (
              <div
                key={gain.title}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${gain.iconBg} rounded-lg flex items-center justify-center mb-4`}
                >
                  <i className={`${gain.icon} text-2xl ${gain.iconColor}`}></i>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {gain.title}
                </h3>

                <p className="text-gray-600">
                  {gain.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Membership
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              The AEF Investors Alliance is a curated community of investors, institutions and strategic leaders committed to shaping Africa's next growth chapter.
            </p>

            <p className="text-lg font-semibold text-gray-900 leading-relaxed">
              Membership is not open enrollment.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Applications are reviewed to ensure the Alliance remains a high-value environment where capital, expertise and opportunities can be exchanged efficiently, professionally and confidentially.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Includes */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">
            Membership Includes
          </h2>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {membershipIncludes.map((item) => (
              <div key={item} className="flex items-start space-x-3">
                <i className="ri-check-line text-xl text-green-300 flex-shrink-0"></i>
                <span className="text-blue-50">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership by Application and Approval */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Membership by Application and Approval
          </h2>

          <div className="space-y-6">
            <p className="text-lg font-semibold text-gray-900 leading-relaxed">
              Membership is granted through application and approval.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              To preserve the quality of engagement and maintain meaningful access among members, participation is intentionally limited.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Seats are allocated by region and sector to ensure the Alliance remains a working room for investors and decision-makers rather than a conference audience.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              The objective is simple:
            </p>

            <p className="text-xl font-semibold text-blue-900 leading-relaxed">
              To create an environment where conversations become partnerships, partnerships become investments, and investments create impact.
            </p>
          </div>
        </div>
      </section>

      {/* A Seat at the Table */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            A Seat at the Table Where Africa's Investment Future Is Being Shaped
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              The next decade will redefine global capital flows, supply chains, energy systems and growth markets.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Africa will be central to that transformation.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              The investors who build relationships today will be better positioned to identify opportunities tomorrow.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              The question is not whether opportunities will emerge.
            </p>

            <p className="text-xl font-semibold text-gray-900 leading-relaxed">
              The question is whether you will be positioned to access them.
            </p>
          </div>
        </div>
      </section>

      {/* Apply for Membership */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Apply for Membership
          </h2>

          <p className="text-xl text-blue-100 mb-4 max-w-3xl mx-auto">
            Join a trusted community of investors, institutions and business leaders shaping the future of investment in Africa.
          </p>

          <p className="text-blue-200 mb-8">
            Membership is subject to application and approval.
          </p>

          <button
            onClick={() => setShowMembershipForm(true)}
            className="bg-white text-blue-900 px-8 py-3 rounded-md hover:bg-gray-100 font-medium whitespace-nowrap cursor-pointer"
          >
            Apply for Membership
          </button>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-2 mb-6">
            <p className="text-2xl font-bold">
              Capital follows opportunity.
            </p>

            <p className="text-2xl font-bold">
              Opportunity follows access.
            </p>
          </div>

          <p className="text-lg text-gray-300 mb-8">
            Join the AEF Investors Alliance and connect with the people, projects and partnerships shaping Africa's next decade.
          </p>

          <button
            onClick={() => setShowMembershipForm(true)}
            className="bg-white text-blue-900 px-8 py-3 rounded-md hover:bg-gray-100 font-medium whitespace-nowrap cursor-pointer"
          >
            Apply for Membership
          </button>
        </div>
      </section>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Sign In
                </h3>

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
                <h3 className="text-2xl font-bold text-gray-900">
                  Create Account
                </h3>

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
                <h3 className="text-2xl font-bold text-gray-900">
                  Investors Alliance Application
                </h3>

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
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={handleSignIn}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap cursor-pointer"
                    >
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

              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
                <a href="/privacy" className="hover:text-white cursor-pointer">
                  Privacy Policy & Terms of Service
                </a>

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
