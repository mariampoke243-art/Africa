import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/client';

export default function Governments() {
  // Original state
  const [showMembershipForm, setShowMembershipForm] = useState(false);
  const [formData, setFormData] = useState({
    country: '',
    ministry: '',
    position: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    diplomaticRank: '',
    areasOfInterest: [] as string[],
    currentInitiatives: '',
    collaborationGoals: '',
    agreeToTerms: false
  });

  // Modified state
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Original handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      areasOfInterest: prev.areasOfInterest.includes(interest)
        ? prev.areasOfInterest.filter(i => i !== interest)
        : [...prev.areasOfInterest, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('government_diplomatic_membership_applications')
      .insert([
        {
          country: formData.country,
          ministry: formData.ministry,
          position: formData.position,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          diplomatic_rank: formData.diplomaticRank,
          areas_of_interest: formData.areasOfInterest,
          current_initiatives: formData.currentInitiatives || null,
          collaboration_goals: formData.collaborationGoals || null,
          agree_to_terms: formData.agreeToTerms,
        },
      ]);

    if (error) {
      console.error('Failed to submit diplomatic membership application:', error);
      alert('An error occurred while submitting your application. Please try again.');
      return;
    }

    console.log('Diplomatic membership application:', formData);
    setShowMembershipForm(false);
    // Reset form
    setFormData({
      country: '',
      ministry: '',
      position: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      diplomaticRank: '',
      areasOfInterest: [],
      currentInitiatives: '',
      collaborationGoals: '',
      agreeToTerms: false
    });
  };

  // Modified handlers
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('aef_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && typeof parsed.name === 'string' && typeof parsed.email === 'string') {
          setUser(parsed);
        }
      }
    } catch (err) {
      console.error('Failed to read user from localStorage:', err);
    }
  }, []);

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

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (email && password) {
      const userName = email.split('@')[0];
      const userData = {
        name: userName.charAt(0).toUpperCase() + userName.slice(1),
        email: email,
      };

      try {
        localStorage.setItem('aef_user', JSON.stringify(userData));
        setUser(userData);
        alert('Sign in successful! Welcome back.');
        setShowSignInModal(false);
      } catch (err) {
        console.error('Failed to store user data:', err);
        alert('An error occurred while signing in. Please try again.');
      }
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
      const userData = {
        name: `${firstName} ${lastName}`,
        email: email,
      };

      try {
        localStorage.setItem('aef_user', JSON.stringify(userData));
        setUser(userData);
        alert('Account created successfully! Welcome to Africa Economic Forum.');
        setShowSignInModal(false);
        setShowCreateAccount(false);
      } catch (err) {
        console.error('Failed to store new account data:', err);
        alert('An error occurred while creating the account. Please try again.');
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Page content
  const whyQuestions = [
    'How do they attract investment?',
    'How do they promote national opportunities?',
    'How do they secure strategic partnerships?',
    'How do they position their countries in an increasingly competitive global environment?',
  ];

  const accessItems = [
    'Access to investors.',
    'Access to business leaders.',
    'Access to decision-makers.',
    'Access to trusted networks.',
  ];

  const engagementAreas = [
    {
      title: 'Investment Promotion',
      text: 'Showcase national priorities, strategic sectors and investment-ready opportunities to a global audience of investors and business leaders.',
      icon: 'ri-funds-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Trade & Market Access',
      text: 'Strengthen commercial relationships and explore new opportunities for bilateral and regional cooperation.',
      icon: 'ri-exchange-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Infrastructure & Industrial Development',
      text: 'Connect with strategic partners capable of supporting transformational infrastructure and industrial projects.',
      icon: 'ri-building-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Energy & Natural Resources',
      text: 'Engage stakeholders shaping the future of energy security, critical minerals and sustainable development.',
      icon: 'ri-flashlight-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Technology & Innovation',
      text: 'Explore partnerships that support digital transformation, innovation ecosystems and emerging technologies.',
      icon: 'ri-cpu-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Regional Integration',
      text: 'Promote greater economic cooperation and connectivity across Africa and beyond.',
      icon: 'ri-global-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Strategic Partnerships',
      text: 'Build long-term relationships that contribute to national development priorities.',
      icon: 'ri-handshake-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
  ];

  const whoShouldJoin = [
    {
      title: 'Heads of State',
      text: 'Leaders seeking to position their nations as destinations for investment, trade and partnership.',
      icon: 'ri-vip-crown-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Prime Ministers & Ministers',
      text: 'Government leaders responsible for economic development, finance, trade, foreign affairs, infrastructure, energy, mining, technology, agriculture and investment promotion.',
      icon: 'ri-government-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Members of Parliament, Senate & Congress',
      text: 'Legislators shaping policies that influence economic growth and international cooperation.',
      icon: 'ri-bank-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Ambassadors & Diplomatic Missions',
      text: 'Representatives responsible for advancing bilateral and multilateral relationships.',
      icon: 'ri-flag-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Government Agencies',
      text: 'Investment promotion agencies, special economic zones, export promotion authorities and national development institutions.',
      icon: 'ri-building-2-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'International Organizations',
      text: 'Institutions supporting cooperation, development and regional integration.',
      icon: 'ri-earth-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ];

  const memberGains = [
    {
      title: 'Access',
      text: 'Direct engagement with investors, CEOs, development finance institutions, sovereign wealth funds and strategic partners.',
      icon: 'ri-key-2-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Visibility',
      text: 'A platform to promote national priorities, reforms and opportunities.',
      icon: 'ri-megaphone-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Influence',
      text: "Participation in high-level discussions shaping Africa's economic future.",
      icon: 'ri-presentation-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Partnerships',
      text: 'Opportunities to develop strategic relationships with governments, institutions and private sector leaders.',
      icon: 'ri-handshake-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Intelligence',
      text: 'Access to insights, trends and perspectives relevant to economic diplomacy and investment attraction.',
      icon: 'ri-file-text-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
  ];

  const membershipBenefits = [
    'Membership in the AEF Diplomatic Club',
    'Official Access to the Africa Economic Forum',
    'Diplomatic Breakfast Sessions',
    'Closed-Door Government Roundtables',
    'Government-Investor Engagement Sessions',
    'Priority Access to Bilateral Meetings',
    'Invitation to Leadership Dinners',
    'Access to the AEF Deal Room',
    'Access to the AEF Member Directory',
    'Year-Round Engagement Opportunities',
    'Strategic Networking Events',
    'Visibility Across AEF Platforms',
    'Participation in High-Level Policy Discussions',
    'Curated Introductions to Strategic Partners',
  ];

  const membershipIncludes = [
    'Flagship Africa Economic Forum Delegate Pass',
    'Full Access to Diplomatic Club Activities',
    'Closed-Door Sessions',
    'Government-Investor Engagement Platforms',
    'Access to the Member Directory',
    'Year-Round Community Engagement',
    'Strategic Networking Opportunities',
    'Priority Participation in AEF Initiatives',
  ];

  const resultsLines = [
    'Success is no longer measured solely by the relationships a nation maintains.',
    'It is increasingly measured by the investments it attracts.',
    'The partnerships it secures.',
    'The opportunities it creates for its people.',
  ];

  const closingLines = [
    'Diplomacy Creates Access.',
    'Access Creates Partnerships.',
    'Partnerships Create Opportunity.',
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
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">Welcome, {user.name}</span>
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
              <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </a>
              <a href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </a>
              <a href="/initiatives" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                Initiatives
              </a>
              <a href="/stakeholders" className="block px-3 py-2 text-base font-medium text-teal-600 bg-teal-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                Stakeholders
              </a>
              <a href="/agenda" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                Agenda
              </a>
              <a href="/publications" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                Publications
              </a>
              <a href="/meetings" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                Meetings
              </a>
              <a href="/contact" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </a>
              <div className="px-3 py-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="text-gray-700">Welcome, {user.name}</div>
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

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                    AEF Diplomatic Club
                  </h1>
                  <p className="text-2xl font-semibold text-blue-100 leading-snug">
                    Where Economic Diplomacy Becomes Opportunity
                  </p>
                  <p className="text-xl text-blue-100 leading-relaxed">
                    The world is entering a new era.
                  </p>
                  <button
                    onClick={() => setShowMembershipForm(true)}
                    className="bg-white text-blue-900 px-8 py-3 rounded-md hover:bg-gray-100 font-medium whitespace-nowrap cursor-pointer"
                  >
                    Apply for Membership
                  </button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=African%20heads%20of%20state%20and%20government%20officials%20in%20formal%20diplomatic%20meeting%2C%20elegant%20conference%20room%20with%20African%20flags%2C%20high-level%20diplomatic%20summit%20with%20diverse%20African%20leaders%20in%20formal%20attire%20discussing%20economic%20cooperation%20and%20policy&width=600&height=400&seq=diplomatic-hero&orientation=landscape"
                  alt="Diplomatic Club"
                  className="w-full h-96 object-cover object-top rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Global alliances are shifting. Supply chains are being reconfigured. Competition for resources, markets, investment and influence is intensifying.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              In this environment, diplomacy is no longer limited to political relations.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              It has become a strategic tool for attracting investment, expanding trade, building partnerships and advancing national priorities.
            </p>
            <p className="text-xl font-semibold text-gray-900 leading-relaxed">
              For Africa, this moment presents a historic opportunity.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              For governments seeking to attract capital, accelerate development and strengthen international cooperation, the ability to engage the right partners has never been more important.
            </p>
            <p className="text-xl font-semibold text-blue-900 leading-relaxed">
              The AEF Diplomatic Club was created for this purpose.
            </p>
          </div>
        </section>

        {/* Government & Diplomacy Community */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              The Government & Diplomacy Community of the Africa Economic Forum
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                The AEF Diplomatic Club is a high-level community of Heads of State, Prime Ministers, Ministers, Parliamentarians, Senators, Congress Members, Ambassadors, Diplomatic Missions, International Organizations and Government Agencies.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                It serves as the diplomatic pillar of the Africa Economic Forum.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                A platform where governments engage directly with investors, business leaders, financial institutions, development partners and strategic stakeholders shaping Africa's future.
              </p>
              <div className="pt-4 space-y-1">
                <p className="text-xl font-semibold text-gray-900">More than a network.</p>
                <p className="text-xl font-semibold text-gray-900">More than a forum.</p>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                A platform designed to transform relationships into partnerships and partnerships into tangible outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* Why the AEF Diplomatic Club */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Why the AEF Diplomatic Club?</h2>
            <p className="text-lg text-gray-700 text-center mb-8 leading-relaxed">
              Governments today face a common challenge.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {whyQuestions.map((q) => (
                <div key={q} className="bg-white rounded-lg p-6 shadow-md flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-question-line text-xl text-blue-600"></i>
                  </div>
                  <p className="font-semibold text-gray-900">{q}</p>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 text-center mb-8 leading-relaxed">
              The answer often begins with access.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {accessItems.map((item) => (
                <div key={item} className="bg-white rounded-lg p-6 shadow-md text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-key-2-line text-xl text-green-600"></i>
                  </div>
                  <p className="font-semibold text-gray-900">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-xl font-semibold text-blue-900 text-center">
              The AEF Diplomatic Club provides that access.
            </p>
          </div>
        </section>

        {/* A New Era of Economic Diplomacy */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8">A New Era of Economic Diplomacy</h2>
            <p className="text-xl text-blue-100 mb-4 leading-relaxed">
              The most successful nations of the coming decade will not simply compete for opportunities.
            </p>
            <p className="text-xl font-semibold mb-8 leading-relaxed">
              They will build the relationships that create them.
            </p>
            <p className="text-lg text-blue-100 leading-relaxed">
              The AEF Diplomatic Club helps governments strengthen their economic diplomacy efforts through meaningful engagement with stakeholders who influence investment, trade and development outcomes.
            </p>
          </div>
        </section>

        {/* Areas of Engagement */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Areas of Engagement</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {engagementAreas.map((area) => (
                <div key={area.title} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className={`w-14 h-14 ${area.iconBg} rounded-full flex items-center justify-center mb-4`}>
                    <i className={`${area.icon} ${area.iconColor} text-2xl`}></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600">{area.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Should Join */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Who Should Join?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whoShouldJoin.map((item) => (
                <div key={item.title} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mx-auto`}>
                      <i className={`${item.icon} ${item.iconColor} text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Members Gain */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">What Members Gain</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memberGains.map((item) => (
                <div key={item.title} className="text-center space-y-4">
                  <div className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mx-auto`}>
                    <i className={`${item.icon} ${item.iconColor} text-2xl`}></i>
                  </div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership Benefits */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Membership Benefits</h2>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {membershipBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start space-x-3">
                  <i className="ri-check-line text-xl text-blue-600 flex-shrink-0"></i>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Membership</h2>
            <div className="space-y-6 mb-12">
              <p className="text-lg text-gray-700 leading-relaxed">
                The AEF Diplomatic Club is a curated community designed to maintain the highest standards of engagement and relevance.
              </p>
              <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                Membership is granted through application and approval.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                To preserve the quality of interactions and ensure meaningful engagement among participants, membership is intentionally selective.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Representation is balanced across regions, governments and institutions to maintain a productive and results-oriented environment.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Membership includes:</h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {membershipIncludes.map((item) => (
                  <li key={item} className="flex items-start space-x-3 text-gray-700">
                    <i className="ri-check-line text-xl text-blue-600 flex-shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* From Representation to Results */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">From Representation to Results</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The role of diplomacy is evolving.
            </p>
            <div className="space-y-3 mb-8">
              {resultsLines.map((line) => (
                <p key={line} className="text-lg text-gray-700 leading-relaxed">{line}</p>
              ))}
            </div>
            <p className="text-xl font-semibold text-blue-900 leading-relaxed">
              The AEF Diplomatic Club exists to help governments achieve those outcomes.
            </p>
          </div>
        </section>

        {/* Africa's Future Will Be Built Through Partnerships */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Africa's Future Will Be Built Through Partnerships</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                The next decade will redefine global investment, trade and geopolitical influence.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Africa will be at the center of that transformation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The governments that engage early, build relationships and position themselves strategically will be best placed to benefit from the opportunities ahead.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Apply for Membership</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join a trusted community of leaders, diplomats and decision-makers shaping the future of economic diplomacy between Africa and the world.
            </p>
            <button
              onClick={() => setShowMembershipForm(true)}
              className="bg-white text-blue-900 px-8 py-3 rounded-md hover:bg-gray-100 font-medium whitespace-nowrap cursor-pointer"
            >
              Apply for Membership
            </button>
          </div>
        </section>

        {/* Closing Banner */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-2 mb-8">
              {closingLines.map((line) => (
                <p key={line} className="text-2xl font-bold">{line}</p>
              ))}
            </div>
            <p className="text-xl text-gray-200 mb-2">Welcome to the AEF Diplomatic Club.</p>
            <p className="text-gray-400">The Government & Diplomacy Community of the Africa Economic Forum.</p>
          </div>
        </section>
      </main>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {showCreateAccount ? 'Create Account' : 'Sign In'}
                </h3>
                <button
                  onClick={() => setShowSignInModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              {/* Sign‑In Form */}
              {!showCreateAccount && (
                <>
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
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" name="remember_me" className="cursor-pointer" />
                        <span className="text-sm text-gray-600">Remember me</span>
                      </label>
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
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
                  <form onSubmit={handleCreateAccountSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="first_name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                      <input
                        type="text"
                        name="organization"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Your organization"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                      <input
                        type="password"
                        name="password"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Create a password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
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
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="newsletter_consent"
                        className="mt-1 cursor-pointer"
                      />
                      <span className="text-sm text-gray-600">
                        I would like to receive updates about Forum activities and events
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

              {/* Social Auth Buttons – shown only for sign‑in */}
              {!showCreateAccount && (
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
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
                <a href="/sitemap" className="hover:text-white cursor-pointer">
                  Sitemap
                </a>
                <p>© 2025 Africa Economic Forum</p>
                <a href="https://readdy.ai/?origin=logo" className="hover:text-white cursor-pointer">Website Builder</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Membership Form Modal */}
      {showMembershipForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Apply for Diplomatic Club Membership</h3>
                <button
                  onClick={() => setShowMembershipForm(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country/Nation</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ministry/Department</label>
                    <input
                      type="text"
                      name="ministry"
                      value={formData.ministry}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Official Position</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Diplomatic Rank</label>
                    <select
                      name="diplomaticRank"
                      value={formData.diplomaticRank}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                      required
                    >
                      <option value="">Select Rank</option>
                      <option value="head-of-state">Head of State</option>
                      <option value="head-of-government">Head of Government</option>
                      <option value="minister">Minister</option>
                      <option value="deputy-minister">Deputy Minister</option>
                      <option value="ambassador">Ambassador</option>
                      <option value="high-commissioner">High Commissioner</option>
                      <option value="consul-general">Consul General</option>
                      <option value="senior-official">Senior Government Official</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
                  <div className="grid md:grid-cols-2 gap-2">
                    {['Trade Policy', 'Investment Promotion', 'Regional Integration', 'Economic Diplomacy', 'Financial Systems', 'Infrastructure Development', 'Technology Transfer', 'Climate Policy'].map((interest) => (
                      <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.areasOfInterest.includes(interest)}
                          onChange={() => handleInterestChange(interest)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Economic Initiatives</label>
                  <textarea
                    name="currentInitiatives"
                    value={formData.currentInitiatives}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your current economic development initiatives..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collaboration Goals</label>
                  <textarea
                    name="collaborationGoals"
                    value={formData.collaborationGoals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What do you hope to achieve through AEF membership?"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <label className="text-sm text-gray-700">
                    I agree to the terms and conditions of AEF Diplomatic Club membership
                  </label>
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
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
          }
