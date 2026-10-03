'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/client';

export default function BusinessesPage() {
  // ✅ State variables
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showMembershipForm, setShowMembershipForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('aef_user');

      if (savedUser) {
        const parsed = JSON.parse(savedUser);

        if (
          parsed &&
          typeof parsed.name === 'string' &&
          typeof parsed.email === 'string'
        ) {
          setUser(parsed);
        }
      }
    } catch (err) {
      console.error('Failed to read user from localStorage:', err);
    }
  }, []);

  // ✅ Handlers
  const handleSignIn = () => {
    setShowSignInModal(true);
    setShowCreateAccount(false);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('aef_user');
    } catch (err) {
      console.error('Failed to remove user from localStorage:', err);
    }

    setUser(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignInSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      if (email && password) {
        const userName = email.split('@')[0];

        const userData = {
          name:
            userName.charAt(0).toUpperCase() +
            userName.slice(1),
          email: email,
        };

        try {
          localStorage.setItem(
            'aef_user',
            JSON.stringify(userData)
          );

          setUser(userData);

          alert('Sign in successful! Welcome back.');

          setShowSignInModal(false);
        } catch (err) {
          console.error(
            'Failed to store user data:',
            err
          );

          alert(
            'An error occurred while signing in. Please try again.'
          );
        }
      } else {
        alert('Please fill in all required fields.');
      }
    } catch (err) {
      console.error('Login error:', err);

      alert(
        'An unexpected error occurred. Please try again later.'
      );
    }
  };

  const handleCreateAccountSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get(
      'confirm_password'
    ) as string;
    const firstName = formData.get('first_name') as string;
    const lastName = formData.get('last_name') as string;

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    if (
      email &&
      password &&
      firstName &&
      lastName
    ) {
      const userData = {
        name: `${firstName} ${lastName}`,
        email: email,
      };

      try {
        localStorage.setItem(
          'aef_user',
          JSON.stringify(userData)
        );

        setUser(userData);

        alert(
          'Account created successfully! Welcome to Africa Economic Forum.'
        );

        setShowSignInModal(false);
        setShowCreateAccount(false);
      } catch (err) {
        console.error(
          'Failed to store new account data:',
          err
        );

        alert(
          'An error occurred while creating the account. Please try again.'
        );
      }
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

  // =========================================================
  // ✅ BUSINESS MEMBERSHIP → SUPABASE
  // =========================================================
  const handleMembershipSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const companyName =
        (formData.get('company_name') as string)?.trim();

      const contactName =
        (formData.get('contact_name') as string)?.trim();

      const email =
        (formData.get('email') as string)?.trim();

      const phone =
        (formData.get('phone') as string)?.trim();

      const industry =
        (formData.get('industry') as string)?.trim();

      const companySize =
        (formData.get('company_size') as string)?.trim();

      const companyDescription =
        (formData.get('company_description') as string)?.trim() || null;

      const interestNetworking =
        formData.get('interest_networking') === 'on';

      const interestInvestment =
        formData.get('interest_investment') === 'on';

      const interestPartnerships =
        formData.get('interest_partnerships') === 'on';

      const interestPolicy =
        formData.get('interest_policy') === 'on';

      const termsAgreement =
        formData.get('terms_agreement') === 'on';

      // Vérification des champs obligatoires
      if (
        !companyName ||
        !contactName ||
        !email ||
        !phone ||
        !industry ||
        !companySize
      ) {
        alert('Please fill in all required fields.');
        return;
      }

      // Vérification des conditions
      if (!termsAgreement) {
        alert(
          'Please agree to the Terms of Service and Privacy Policy.'
        );
        return;
      }

      // =====================================================
      // INSERTION DANS SUPABASE
      // =====================================================
      const { error } = await supabase
        .from('business_membership_applications')
        .insert([
          {
            company_name: companyName,
            contact_name: contactName,
            email: email,
            phone: phone,
            industry: industry,
            company_size: companySize,
            company_description: companyDescription,
            interest_networking: interestNetworking,
            interest_investment: interestInvestment,
            interest_partnerships: interestPartnerships,
            interest_policy: interestPolicy,
            terms_agreement: termsAgreement,
          },
        ]);

      if (error) {
        console.error(
          'Error submitting Business Council application:',
          error
        );

        alert(
          'An error occurred while submitting your application. Please try again.'
        );

        return;
      }

      // Succès
      alert(
        'Membership application submitted successfully! We will contact you within 48 hours.'
      );

      setShowMembershipForm(false);
    } catch (err) {
      console.error(
        'Membership application error:',
        err
      );

      alert(
        'An unexpected error occurred. Please try again later.'
      );
    }
  };

  // Page content
  const buildersLines = [
    'They develop industries.',
    'Create jobs.',
    'Build infrastructure.',
    'Expand trade.',
    'Drive innovation.',
  ];

  const accessItems = [
    'Access to decision-makers.',
    'Access to capital.',
    'Access to markets.',
    'Access to partnerships.',
  ];

  const engagementAreas = [
    {
      title: 'Market Expansion',
      text: 'Explore opportunities to enter new markets, establish partnerships and strengthen regional presence.',
      icon: 'ri-global-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Infrastructure & Industrialization',
      text: 'Engage in conversations shaping the future of infrastructure, manufacturing and industrial development across Africa.',
      icon: 'ri-building-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Investment & Capital Access',
      text: 'Connect with investors, development finance institutions, sovereign funds and financial partners.',
      icon: 'ri-funds-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Trade & Commerce',
      text: 'Strengthen commercial relationships and identify opportunities within Africa and international markets.',
      icon: 'ri-exchange-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Technology & Innovation',
      text: 'Discover emerging trends, partnerships and technologies transforming industries.',
      icon: 'ri-lightbulb-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Public-Private Partnerships',
      text: 'Build relationships with governments and institutions seeking private sector participation.',
      icon: 'ri-handshake-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Leadership & Corporate Strategy',
      text: "Exchange insights with some of Africa's most influential business leaders and decision-makers.",
      icon: 'ri-presentation-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
  ];

  const whoShouldJoin = [
    {
      title: 'CEOs & Chairpersons',
      text: 'Leaders driving corporate growth and expansion.',
      icon: 'ri-vip-crown-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Founders & Entrepreneurs',
      text: 'Visionaries building the next generation of African businesses.',
      icon: 'ri-rocket-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Corporate Executives',
      text: 'Senior leaders responsible for strategy, operations, investment and growth.',
      icon: 'ri-briefcase-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Industrial Leaders',
      text: 'Executives operating across manufacturing, infrastructure, energy, mining and logistics.',
      icon: 'ri-store-2-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Multinational Corporations',
      text: 'Global companies seeking opportunities and partnerships across Africa.',
      icon: 'ri-earth-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Chambers of Commerce & Business Associations',
      text: 'Organizations supporting private sector development and regional cooperation.',
      icon: 'ri-team-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ];

  const memberGains = [
    {
      title: 'Access',
      text: 'Direct engagement with governments, investors, financial institutions and strategic partners.',
      icon: 'ri-key-2-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Visibility',
      text: 'A platform to showcase your company, projects, capabilities and growth ambitions.',
      icon: 'ri-megaphone-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Influence',
      text: "Participation in conversations shaping Africa's economic and business environment.",
      icon: 'ri-chat-voice-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Partnerships',
      text: 'Opportunities to build relationships that lead to joint ventures, commercial agreements and strategic collaborations.',
      icon: 'ri-handshake-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Intelligence',
      text: 'Access to insights, trends and opportunities relevant to business growth across Africa.',
      icon: 'ri-bar-chart-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
  ];

  const membershipBenefits = [
    'Membership in the AEF Business Council',
    'Official Access to the Africa Economic Forum',
    'CEO & Executive Leadership Sessions',
    'Private Business Roundtables',
    'Access to the AEF Deal Room',
    'Access to the Annual AEF Deal Book',
    'Business-to-Government Engagement Opportunities',
    'Business-to-Investor Matchmaking',
    'Strategic Networking Events',
    'Leadership Dinners and Private Receptions',
    'Access to the AEF Member Directory',
    'Year-Round Community Engagement',
    'Visibility Across AEF Platforms',
    'Participation in Sector-Specific Discussions',
  ];

  const membershipIncludes = [
    'Africa Economic Forum Delegate Pass',
    'Full Business Council Membership',
    'Access to Executive Sessions',
    'Access to Closed-Door Discussions',
    'Access to the AEF Deal Room',
    'Access to the AEF Deal Book',
    'Year-Round Community Engagement',
    'Member Directory Access',
    'Strategic Networking Opportunities',
  ];

  const closingLines = [
    'Growth Requires Vision.',
    'Growth Requires Partnerships.',
    'Growth Requires Leadership.',
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
              <a
                href="/"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </a>

              <a
                href="/about"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </a>

              <a
                href="/initiatives"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Initiatives
              </a>

              <a
                href="/stakeholders"
                className="text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-600"
              >
                Stakeholders
              </a>

              <a
                href="/agenda"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Agenda
              </a>

              <a
                href="/publications"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Publications
              </a>

              <a
                href="/meetings"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Meetings
              </a>

              <a
                href="/contact"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">
                    Welcome, {user.name}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>
              )}
            </div>

            <button
              className="md:hidden p-2 cursor-pointer"
              onClick={toggleMobileMenu}
            >
              <i
                className={`ri-${
                  isMobileMenuOpen ? 'close' : 'menu'
                }-line text-2xl`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">

              <a
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>

              <a
                href="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>

              <a
                href="/initiatives"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Initiatives
              </a>

              <a
                href="/stakeholders"
                className="block px-3 py-2 text-base font-medium text-teal-600 bg-teal-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Stakeholders
              </a>

              <a
                href="/agenda"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Agenda
              </a>

              <a
                href="/publications"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Publications
              </a>

              <a
                href="/meetings"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Meetings
              </a>

              <a
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>

              <div className="px-3 py-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="text-gray-700">
                      Welcome, {user.name}
                    </div>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleSignIn();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap cursor-pointer"
                  >
                    Sign In
                  </button>
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
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url('https://readdy.ai/api/search-image?query=African%20business%20leaders%20in%20modern%20corporate%20boardroom%2C%20diverse%20group%20of%20executives%20in%20professional%20attire%20discussing%20strategy%2C%20contemporary%20office%20setting%20with%20African%20art%20and%20city%20skyline&width=1920&height=800&seq=businesses-hero&orientation=landscape')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white">

            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              AEF Business Council
            </h1>

            <h2 className="text-2xl lg:text-3xl font-semibold mb-8 text-blue-100">
              Where Africa's Builders Meet
            </h2>

            <p className="text-lg text-blue-100 max-w-4xl mb-8 leading-relaxed">
              But businesses build economies.
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="space-y-2 mb-8">
            <p className="text-lg text-gray-700">
              Governments create policies.
            </p>

            <p className="text-lg text-gray-700">
              Investors provide capital.
            </p>

            <p className="text-2xl font-bold text-blue-900">
              But businesses build economies.
            </p>
          </div>

          <div className="space-y-2 mb-8">
            {buildersLines.map((line) => (
              <p
                key={line}
                className="text-lg text-gray-700"
              >
                {line}
              </p>
            ))}
          </div>

          <p className="text-xl font-semibold text-gray-900 mb-8">
            And transform opportunity into growth.
          </p>

          <div className="space-y-6">

            <p className="text-lg text-gray-700 leading-relaxed">
              As Africa enters a new era of industrialization,
              urbanization, digital transformation and regional
              integration, the role of business leadership has
              never been more important.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              The companies that build relationships today will
              be the companies that shape Africa's future tomorrow.
            </p>

            <p className="text-xl font-semibold text-blue-900">
              The AEF Business Council was created for those leaders.
            </p>

          </div>
        </div>
      </section>

      {/* Corporate Leadership Community */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            The Corporate Leadership Community of the Africa Economic Forum
          </h2>

          <div className="space-y-6">

            <p className="text-lg text-gray-700 leading-relaxed">
              The AEF Business Council is a high-level community of
              CEOs, Chairpersons, Founders, Managing Directors,
              Corporate Executives, Industrial Leaders, Entrepreneurs
              and Business Owners committed to advancing business,
              investment and economic growth across Africa.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              As the corporate pillar of the Africa Economic Forum,
              the Council provides a platform where business leaders
              engage directly with governments, investors, financial
              institutions, development partners and strategic stakeholders.
            </p>

            <p className="text-xl font-semibold text-gray-900">
              Because growth happens when the right people sit around
              the same table.
            </p>

          </div>
        </div>
      </section>

      {/* Why the AEF Business Council */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Why the AEF Business Council?
          </h2>

          <div className="space-y-6 text-center mb-10">

            <p className="text-lg text-gray-700 leading-relaxed">
              Africa is home to one of the world's most significant
              growth opportunities.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              From infrastructure and manufacturing to energy, mining,
              technology, healthcare, agriculture, tourism and logistics,
              opportunities exist across every major sector.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              Yet opportunity alone is not enough.
            </p>

            <p className="text-xl font-semibold text-gray-900">
              Success depends on access.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            {accessItems.map((item) => (
              <div
                key={item}
                className="bg-gray-50 rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-key-2-line text-xl text-blue-600"></i>
                </div>

                <p className="font-semibold text-gray-900">
                  {item}
                </p>
              </div>
            ))}

          </div>

          <p className="text-xl font-semibold text-blue-900 text-center">
            The AEF Business Council exists to create that access.
          </p>

        </div>
      </section>

      {/* Building Africa's Next Growth Chapter */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-4xl font-bold mb-8">
            Building Africa's Next Growth Chapter
          </h2>

          <p className="text-xl text-blue-100 mb-6 leading-relaxed">
            The future of Africa will be shaped by businesses willing
            to invest, innovate and expand.
          </p>

          <p className="text-lg text-blue-100 leading-relaxed">
            The Council provides a platform for companies to connect
            with the people and institutions capable of accelerating
            their growth ambitions.
          </p>

        </div>
      </section>

      {/* Areas of Engagement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Areas of Engagement
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {engagementAreas.map((area) => (
              <div
                key={area.title}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-14 h-14 ${area.iconBg} rounded-full flex items-center justify-center mb-4`}
                >
                  <i
                    className={`${area.icon} ${area.iconColor} text-2xl`}
                  ></i>
                </div>

                <h3 className="font-semibold text-gray-900 mb-3">
                  {area.title}
                </h3>

                <p className="text-gray-600">
                  {area.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Who Should Join */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Who Should Join?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {whoShouldJoin.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center space-y-4"
              >
                <div
                  className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mx-auto`}
                >
                  <i
                    className={`${item.icon} ${item.iconColor} text-2xl`}
                  ></i>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-600">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* What Members Gain */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            What Members Gain
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {memberGains.map((item) => (
              <div
                key={item.title}
                className="text-center space-y-4"
              >
                <div
                  className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mx-auto`}
                >
                  <i
                    className={`${item.icon} ${item.iconColor} text-2xl`}
                  ></i>
                </div>

                <h3 className="font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  {item.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Membership Benefits
          </h2>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">

            {membershipBenefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-start space-x-3"
              >
                <i className="ri-check-line text-xl text-blue-600 flex-shrink-0"></i>

                <span className="text-gray-700">
                  {benefit}
                </span>
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

          <div className="space-y-6 mb-12">

            <p className="text-lg text-gray-700 leading-relaxed">
              The AEF Business Council is a curated community of
              corporate leaders committed to shaping Africa's economic future.
            </p>

            <p className="text-lg font-semibold text-gray-900 leading-relaxed">
              Membership is granted through application and approval.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              To preserve the quality of engagement and maintain
              meaningful access among members, participation is intentionally selective.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              The objective is simple:
            </p>

            <p className="text-xl font-semibold text-blue-900 leading-relaxed">
              To create an environment where business leaders can build
              relationships, identify opportunities and accelerate growth.
            </p>

          </div>

          <div className="bg-gray-50 rounded-lg p-8 text-left">

            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Membership includes:
            </h3>

            <ul className="grid md:grid-cols-2 gap-3 mb-6">

              {membershipIncludes.map((item) => (
                <li
                  key={item}
                  className="flex items-start space-x-3 text-gray-700"
                >
                  <i className="ri-check-line text-xl text-blue-600 flex-shrink-0"></i>

                  <span>{item}</span>
                </li>
              ))}

            </ul>

            <p className="text-sm text-gray-600">
              Seats are allocated to maintain a balanced representation
              of sectors, industries and regions.
            </p>

          </div>
        </div>
      </section>

      {/* Next Business Opportunities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Africa's Next Business Opportunities Are Being Created Today
          </h2>

          <div className="space-y-6">

            <p className="text-lg text-gray-700 leading-relaxed">
              The next decade will produce new markets, industries,
              technologies and partnerships across Africa.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              The companies that position themselves early will be
              best placed to capture the opportunities ahead.
            </p>

            <p className="text-xl font-semibold text-blue-900 leading-relaxed">
              The AEF Business Council exists to help make those
              connections possible.
            </p>

          </div>
        </div>
      </section>

      {/* Closing Banner */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="space-y-2 mb-8">

            {closingLines.map((line) => (
              <p
                key={line}
                className="text-2xl font-bold"
              >
                {line}
              </p>
            ))}

          </div>

          <p className="text-xl text-gray-200 mb-2">
            Welcome to the AEF Business Council.
          </p>

          <p className="text-gray-400">
            The Corporate Leadership Community of the Africa Economic Forum.
          </p>

        </div>
      </section>

      {/* Apply for Membership */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-4xl font-bold mb-6">
            Apply for Membership
          </h2>

          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join a trusted community of CEOs, entrepreneurs and business
            leaders shaping the future of business in Africa.
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
                  {showCreateAccount
                    ? 'Create Account'
                    : 'Sign In'}
                </h3>

                <button
                  onClick={() => setShowSignInModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>

              </div>

              {/* Sign-In Form */}
              {!showCreateAccount && (
                <>
                  <form
                    onSubmit={handleSignInSubmit}
                    className="space-y-4"
                  >

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

                    <div className="flex items-center justify-between">

                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="remember_me"
                          className="cursor-pointer"
                        />

                        <span className="text-sm text-gray-600">
                          Remember me
                        </span>
                      </label>

                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        Forgot password?
                      </button>

                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer"
                    >
                      Sign In
                    </button>

                  </form>

                  <div className="mt-6 text-center">

                    <p className="text-sm text-gray-600">
                      Don't have an account?

                      <button
                        onClick={switchToCreateAccount}
                        className="text-blue-600 hover:text-blue-800 font-medium ml-1 cursor-pointer"
                      >
                        Create Account
                      </button>
                    </p>

                  </div>
                </>
              )}

              {/* Create Account Form */}
              {showCreateAccount && (
                <>
                  <form
                    onSubmit={handleCreateAccountSubmit}
                    className="space-y-4"
                  >

                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>

                        <input
                          type="text"
                          name="first_name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="First name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>

                        <input
                          type="text"
                          name="last_name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Last name"
                        />
                      </div>

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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>

                      <input
                        type="password"
                        name="confirm_password"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Confirm your password"
                      />
                    </div>

                    <div className="flex items-start space-x-3">

                      <input
                        type="checkbox"
                        name="terms_agreement"
                        required
                        className="mt-1 cursor-pointer"
                      />

                      <span className="text-sm text-gray-600">
                        I agree to the Terms of Service and Privacy Policy
                      </span>

                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer"
                    >
                      Create Account
                    </button>

                  </form>

                  <div className="mt-6 text-center">

                    <p className="text-sm text-gray-600">
                      Already have an account?

                      <button
                        onClick={switchToSignIn}
                        className="text-blue-600 hover:text-blue-800 font-medium ml-1 cursor-pointer"
                      >
                        Sign In
                      </button>
                    </p>

                  </div>
                </>
              )}

              {/* Social Auth Buttons */}
              {!showCreateAccount && (
                <div className="mt-6">

                  <div className="relative">

                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>

                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>

                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">

                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                      <i className="ri-google-fill text-red-500 text-lg"></i>
                      <span className="ml-2">Google</span>
                    </button>

                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                      <i className="ri-linkedin-fill text-blue-600 text-lg"></i>
                      <span className="ml-2">LinkedIn</span>
                    </button>

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Membership Application Modal */}
      {showMembershipForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">

            <div className="p-6">

              <div className="flex justify-between items-center mb-6">

                <h3 className="text-2xl font-bold text-gray-900">
                  Business Partnership Application
                </h3>

                <button
                  onClick={() => setShowMembershipForm(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>

              </div>

              <form
                onSubmit={handleMembershipSubmit}
                className="space-y-6"
              >

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
                      <option value="">
                        Select industry
                      </option>

                      <option value="agriculture">
                        Agriculture
                      </option>

                      <option value="banking">
                        Banking & Finance
                      </option>

                      <option value="construction">
                        Construction
                      </option>

                      <option value="energy">
                        Energy & Mining
                      </option>

                      <option value="healthcare">
                        Healthcare
                      </option>

                      <option value="manufacturing">
                        Manufacturing
                      </option>

                      <option value="retail">
                        Retail & Consumer Goods
                      </option>

                      <option value="technology">
                        Technology
                      </option>

                      <option value="telecommunications">
                        Telecommunications
                      </option>

                      <option value="transportation">
                        Transportation & Logistics
                      </option>

                      <option value="other">
                        Other
                      </option>
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
                      <option value="">
                        Select size
                      </option>

                      <option value="startup">
                        Startup (1-10 employees)
                      </option>

                      <option value="small">
                        Small (11-50 employees)
                      </option>

                      <option value="medium">
                        Medium (51-250 employees)
                      </option>

                      <option value="large">
                        Large (251-1000 employees)
                      </option>

                      <option value="enterprise">
                        Enterprise (1000+ employees)
                      </option>
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
                      <input
                        type="checkbox"
                        name="interest_networking"
                        className="cursor-pointer"
                      />

                      <span className="text-sm text-gray-700">
                        Networking
                      </span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="interest_investment"
                        className="cursor-pointer"
                      />

                      <span className="text-sm text-gray-700">
                        Investment Opportunities
                      </span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="interest_partnerships"
                        className="cursor-pointer"
                      />

                      <span className="text-sm text-gray-700">
                        Strategic Partnerships
                      </span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="interest_policy"
                        className="cursor-pointer"
                      />

                      <span className="text-sm text-gray-700">
                        Policy Influence
                      </span>
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
                    I agree to the Terms of Service and Privacy Policy,
                    and consent to being contacted regarding membership opportunities.
                  </span>

                </div>

                <div className="flex justify-end space-x-4">

                  <button
                    type="button"
                    onClick={() => setShowMembershipForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 cursor-pointer"
                  >
                    Submit Application
                  </button>

                </div>

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
              <h3 className="font-semibold text-lg mb-6">
                About us
              </h3>

              <ul className="space-y-3">

                <li>
                  <a
                    href="/about"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Our mission
                  </a>
                </li>

                <li>
                  <a
                    href="/framework"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Our Institutional Framework
                  </a>
                </li>

                <li>
                  <a
                    href="/history"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    History
                  </a>
                </li>

                <li>
                  <a
                    href="/about"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Leadership and governance
                  </a>
                </li>

                <li>
                  <a
                    href="/about"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Our Impact
                  </a>
                </li>

              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">
                More from the Forum
              </h3>

              <ul className="space-y-3">

                <li>
                  <a
                    href="/initiatives"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Centres
                  </a>
                </li>

                <li>
                  <a
                    href="/meetings"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Meetings
                  </a>
                </li>

                <li>
                  <a
                    href="/stakeholders"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Stakeholders
                  </a>
                </li>

                <li>
                  <a
                    href="/agenda"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Forum Stories
                  </a>
                </li>

                <li>
                  <a
                    href="/publications"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Press releases
                  </a>
                </li>

                <li>
                  <a
                    href="/gallery"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Photo gallery
                  </a>
                </li>

                <li>
                  <a
                    href="/publications"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Podcasts
                  </a>
                </li>

                <li>
                  <a
                    href="/publications"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Videos
                  </a>
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
                    <button
                      onClick={handleSignIn}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap cursor-pointer"
                    >
                      Sign in
                    </button>
                  )}
                </li>

                <li>
                  <a
                    href="/partners"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Become our partner
                  </a>
                </li>

                <li>
                  <a
                    href="/join"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Become a member
                  </a>
                </li>

                <li>
                  <a
                    href="/publications"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Subscribe to our press releases
                  </a>
                </li>

                <li>
                  <a
                    href="/publications"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Subscribe to our newsletters
                  </a>
                </li>

                <li>
                  <a
                    href="/contact"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Contact us
                  </a>
                </li>

              </ul>
            </div>

            <div>

              <h3 className="font-semibold text-lg mb-6">
                Quick links
              </h3>

              <ul className="space-y-3 mb-8">

                <li>
                  <a
                    href="/initiatives"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Sustainability at the Forum
                  </a>
                </li>

                <li>
                  <a
                    href="/careers"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    Careers
                  </a>
                </li>

              </ul>

              <div>

                <h4 className="font-semibold mb-4">
                  Language editions
                </h4>

                <div className="flex space-x-2">

                  <a
                    href="/"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    PT
                  </a>

                  <span className="text-gray-500">
                    •
                  </span>

                  <a
                    href="/en"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    EN
                  </a>

                  <span className="text-gray-500">
                    •
                  </span>

                  <a
                    href="/es"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    ES
                  </a>

                  <span className="text-gray-500">
                    •
                  </span>

                  <a
                    href="/fr"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    FR
                  </a>

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

                <a
                  href="/privacy"
                  className="hover:text-white cursor-pointer"
                >
                  Privacy Policy &amp; Terms of Service
                </a>

                <a
                  href="/sitemap"
                  className="hover:text-white cursor-pointer"
                >
                  Sitemap
                </a>

                <p>
                  © 2026 Africa Economic Forum
                </p>

                <a
                  href="https://readdy.ai/?origin=logo"
                  className="hover:text-white cursor-pointer"
                >
                  Website Builder
                </a>

              </div>

            </div>
          </div>

        </div>
      </footer>

    </div>
  );
        }
