import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/client';

export default function International() {
  // Original state and handlers for membership form
  const [showMembershipForm, setShowMembershipForm] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    headquarters: '',
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
    focusAreas: [] as string[],
    currentPrograms: '',
    partnershipGoals: '',
    agreeToTerms: false
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFocusAreaChange = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter((a) => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from('international_institution_applications')
      .insert([
        {
          organization_name: formData.organizationName,
          organization_type: formData.organizationType,
          headquarters: formData.headquarters,
          first_name: formData.firstName,
          last_name: formData.lastName,
          position: formData.position,
          email: formData.email,
          phone: formData.phone,
          focus_areas: formData.focusAreas,
          current_programs: formData.currentPrograms || null,
          partnership_goals: formData.partnershipGoals || null,
          agree_to_terms: formData.agreeToTerms,
        },
      ]);

    if (error) {
      console.error('Failed to submit international institution application:', error);
      alert('An error occurred while submitting your application. Please try again.');
      return;
    }

    console.log('International institution membership application:', formData);
    setShowMembershipForm(false);
    // Reset form
    setFormData({
      organizationName: '',
      organizationType: '',
      headquarters: '',
      firstName: '',
      lastName: '',
      position: '',
      email: '',
      phone: '',
      focusAreas: [],
      currentPrograms: '',
      partnershipGoals: '',
      agreeToTerms: false
    });
  };

  // Modified state and handlers for authentication & UI
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Check for logged-in user on component mount
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
        email: email
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

  const handleCreateAccountSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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
        email: email
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
  const engagementList = [
    'Engage directly with African governments and decision-makers',
    'Present institutional priorities, programmes and initiatives',
    "Contribute expertise to Africa's economic and development agenda",
    'Build relationships with investors, corporations and project developers',
    'Identify opportunities for strategic cooperation',
    'Support investment, infrastructure, trade and development initiatives',
    'Participate in high-level policy and economic dialogues',
    'Connect global priorities with African realities',
    'Develop partnerships across countries and sectors',
  ];

  const whoWeEngage = [
    {
      title: 'Multilateral Institutions',
      text: 'United Nations agencies, regional and international organisations, multilateral development institutions and other global platforms.',
      icon: 'ri-global-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Development & Cooperation Institutions',
      text: "Development agencies, bilateral cooperation agencies, international development organisations and institutions supporting Africa's transformation.",
      icon: 'ri-hand-heart-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Regional Institutions',
      text: 'African and international regional organisations working across trade, investment, infrastructure, integration, peace, development and economic cooperation.',
      icon: 'ri-map-2-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'International Policy & Economic Institutions',
      text: 'Institutions shaping global economic policy, trade, investment, technology, sustainability and development frameworks.',
      icon: 'ri-bank-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'International Cooperation Platforms',
      text: 'Global initiatives, alliances and institutional networks seeking deeper engagement with African governments and economic stakeholders.',
      icon: 'ri-share-circle-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
  ];

  const stakeholders = [
    'Heads of State & Government',
    'Ministers & Public Decision-Makers',
    'Investment Promotion Agencies',
    'Sovereign Wealth Funds',
    'Development Finance Institutions',
    'Banks & Investors',
    'Corporate Leaders',
    'Project Developers',
    'Technology & Infrastructure Companies',
    'Academia & Think Tanks',
    'Civil Society',
  ];

  const policyToPartnership = [
    {
      title: 'Policy Dialogue',
      text: "Contribute to conversations shaping Africa's economic future.",
      icon: 'ri-chat-voice-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Institutional Engagement',
      text: 'Meet governments, ministers, agencies and institutional decision-makers.',
      icon: 'ri-government-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Investment & Development',
      text: 'Connect programmes and priorities with investors, financial institutions and project developers.',
      icon: 'ri-funds-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Strategic Cooperation',
      text: 'Identify institutions, governments and companies with complementary objectives.',
      icon: 'ri-handshake-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Knowledge & Intelligence',
      text: "Exchange research, expertise, data and perspectives on Africa's changing economic landscape.",
      icon: 'ri-bar-chart-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Project & Opportunity Pipeline',
      text: 'Explore initiatives requiring institutional, technical, financial or strategic support.',
      icon: 'ri-road-map-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ];

  const meetings = [
    {
      title: 'Open Forums',
      text: 'Public high-level sessions bringing together governments, institutions, investors, companies and experts around major African economic themes.',
      icon: 'ri-slideshow-line',
    },
    {
      title: 'Selected Roundtables',
      text: 'Smaller, curated discussions focused on specific sectors, policy questions or strategic priorities.',
      icon: 'ri-team-line',
    },
    {
      title: 'Closed-Door Institutional Dialogues',
      text: 'Highly selective conversations involving senior institutional representatives and decision-makers.',
      icon: 'ri-lock-line',
    },
    {
      title: 'Government & Institutional Meetings',
      text: 'Targeted engagements connecting international institutions with relevant ministers, government agencies and public-sector leaders.',
      icon: 'ri-government-line',
    },
    {
      title: 'Investment & Development Dialogues',
      text: 'Meetings bringing together institutions, investors, financial institutions and project developers around concrete initiatives.',
      icon: 'ri-funds-line',
    },
  ];

  const meetingColors = [
    { bg: 'bg-blue-100', text: 'text-blue-600' },
    { bg: 'bg-green-100', text: 'text-green-600' },
    { bg: 'bg-purple-100', text: 'text-purple-600' },
    { bg: 'bg-orange-100', text: 'text-orange-600' },
    { bg: 'bg-teal-100', text: 'text-teal-600' },
  ];

  const knowledgeTopics = [
    'Economic transformation',
    'Trade and regional integration',
    'Infrastructure',
    'Energy transition',
    'Critical minerals',
    'Digital transformation',
    'Artificial intelligence',
    'Healthcare',
    'Food security',
    'Climate and sustainability',
    'Investment',
    'Financial inclusion',
    'Industrialisation',
    'Economic diplomacy',
    'Youth and employment',
  ];

  const bridgePairs = [
    'Investment rather than dependency.',
    'Value creation rather than extraction.',
    'Industrialisation rather than raw-material exports.',
    'Technology transfer rather than technology dependence.',
    'Strategic partnerships rather than transactional relationships.',
  ];

  const partnershipItems = [
    'Institutional visibility',
    'Strategic programme collaboration',
    'Knowledge partnerships',
    'Research and content',
    'Thematic forums',
    'Institutional dialogues',
    'Delegation engagement',
    'Strategic introductions',
    'Joint initiatives',
    'Agreed communication and visibility',
  ];

  const dealRoomChain = [
    'Governments',
    'Investors',
    'Financial Institutions',
    'Corporates',
    'Project Developers',
    'Institutions',
  ];

  const diplomacyWords = ['Government.', 'Capital.', 'Business.', 'Institutions.', 'Development.'];

  const joinWords = ['Engage.', 'Contribute.', 'Connect.', 'Build.'];

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
                    AEF International Institutions
                  </h1>
                  <p className="text-2xl font-semibold text-blue-100 leading-snug">
                    Connecting Global Institutions with Africa's Next Chapter
                  </p>
                  <p className="text-xl text-blue-100 leading-relaxed">
                    Africa's economic transformation is no longer a regional conversation.
                  </p>
                  <button
                    onClick={() => setShowMembershipForm(true)}
                    className="bg-white text-blue-900 px-8 py-3 rounded-md hover:bg-gray-100 font-medium whitespace-nowrap cursor-pointer"
                  >
                    Apply for Partnership
                  </button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=International%20organizations%20headquarters%20with%20diverse%20global%20representatives%2C%20modern%20institutional%20building%20with%20flags%20from%20multiple%20countries%2C%20professional%20international%20cooperation%20meeting%20with%20African%20and%20global%20leaders&width=600&height=400&seq=international-hero&orientation=landscape"
                  alt="International Institutions"
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
              It is increasingly shaped by international institutions, multilateral cooperation, development finance, global policy frameworks, investment flows, technology, trade, infrastructure and strategic partnerships.
            </p>
            <p className="text-xl font-semibold text-blue-900 leading-relaxed">
              The Africa Economic Forum (AEF) brings these worlds together.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              From Kinshasa, AEF convenes governments, international institutions, investors, business leaders, financial institutions, development partners and project developers around the decisions, partnerships and opportunities shaping Africa's next growth cycle.
            </p>
          </div>
        </section>

        {/* A Platform for Institutional Engagement */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">A Platform for Institutional Engagement</h2>
            <p className="text-lg text-gray-700 text-center mb-10 leading-relaxed max-w-3xl mx-auto">
              AEF provides international institutions with a high-level platform to engage directly with the African ecosystem — beyond traditional conferences and formal diplomatic channels.
            </p>
            <p className="text-lg font-semibold text-gray-900 text-center mb-6">It is a space to:</p>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {engagementList.map((item) => (
                <div key={item} className="flex items-start space-x-3 bg-gray-50 rounded-lg p-4">
                  <i className="ri-check-line text-xl text-blue-600 flex-shrink-0"></i>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xl font-semibold text-blue-900 text-center leading-relaxed">
              AEF is designed to turn dialogue into institutional connections, partnerships and actionable opportunities.
            </p>
          </div>
        </section>

        {/* Who We Engage */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold tracking-widest text-blue-600 text-center mb-3">WHO WE ENGAGE</p>
            <p className="text-lg text-gray-700 text-center mb-16 leading-relaxed max-w-3xl mx-auto">
              AEF welcomes institutions operating across the global economic, development and cooperation ecosystem.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whoWeEngage.map((item) => (
                <div key={item.title} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 ${item.iconBg} rounded-full flex items-center justify-center mx-auto`}>
                      <i className={`${item.icon} ${item.iconColor} text-2xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why AEF */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold tracking-widest text-blue-600 mb-3">WHY AEF</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Africa's Decision-Making Ecosystem, in One Place</h2>
            <div className="space-y-6 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                International institutions often engage Africa through individual governments, programmes, missions and bilateral relationships.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">AEF adds another layer:</p>
              <p className="text-xl font-semibold text-blue-900 leading-relaxed">
                a multi-stakeholder economic platform where governments, capital and business meet around common priorities.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through AEF, institutions can engage simultaneously with:
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {stakeholders.map((s) => (
                <span key={s} className="bg-blue-50 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">{s}</span>
              ))}
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              This creates an environment for cross-sector and cross-border institutional engagement.
            </p>
          </div>
        </section>

        {/* From Policy to Partnership */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">From Policy to Partnership</h2>
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <p className="text-lg text-gray-700 leading-relaxed">
                The African transformation agenda requires more than policy dialogue.
              </p>
              <p className="text-xl font-semibold text-gray-900">It requires implementation.</p>
              <p className="text-lg text-gray-700 leading-relaxed">
                AEF therefore creates opportunities for international institutions to connect their programmes, expertise and priorities with actors capable of implementing them.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {policyToPartnership.map((item) => (
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

        {/* AEF Meetings & Forums */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold tracking-widest text-blue-600 text-center mb-3">AEF MEETINGS & FORUMS</p>
            <p className="text-lg text-gray-700 text-center mb-16 leading-relaxed max-w-3xl mx-auto">
              International institutions can participate across the AEF meeting architecture according to the relevance and level of each engagement.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {meetings.map((m, i) => (
                <div key={m.title} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 ${meetingColors[i % meetingColors.length].bg} rounded-lg flex items-center justify-center mb-4`}>
                    <i className={`${m.icon} text-xl ${meetingColors[i % meetingColors.length].text}`}></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{m.title}</h3>
                  <p className="text-gray-600 text-sm">{m.text}</p>
                </div>
              ))}
            </div>
            <div className="text-center space-y-2">
              <p className="text-gray-700">Participation is determined by the format, relevance and objectives of each meeting.</p>
              <p className="font-semibold text-blue-900">Membership is not required for every AEF meeting.</p>
            </div>
          </div>
        </section>

        {/* Knowledge & Thought Leadership */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold tracking-widest text-blue-300 mb-3">KNOWLEDGE & THOUGHT LEADERSHIP</p>
            <h2 className="text-3xl font-bold mb-6">International institutions can contribute to the intellectual architecture of AEF.</h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Through research, data, expertise and institutional perspectives, participating organisations can help shape conversations around:
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {knowledgeTopics.map((t) => (
                <span key={t} className="bg-white text-blue-800 px-4 py-2 rounded-lg text-sm font-medium">{t}</span>
              ))}
            </div>
            <p className="text-lg text-blue-100 leading-relaxed">
              AEF provides a platform where institutional knowledge can reach decision-makers, investors and business leaders.
            </p>
          </div>
        </section>

        {/* A Bridge */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">A Bridge Between Global Priorities and African Opportunities</h2>
            <div className="space-y-4 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                The relationship between Africa and the international community is evolving.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Africa is increasingly seeking partnerships built around:
              </p>
            </div>
            <div className="space-y-3 mb-8">
              {bridgePairs.map((p) => (
                <div key={p} className="bg-white rounded-lg shadow-sm p-4">
                  <p className="font-semibold text-gray-900">{p}</p>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-700 mb-2">
              International institutions have an important role to play in this transformation.
            </p>
            <p className="text-xl font-semibold text-blue-900">
              AEF provides a platform for that engagement.
            </p>
          </div>
        </section>

        {/* Participation Pathways */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm font-semibold tracking-widest text-blue-600 text-center mb-3">PARTICIPATION PATHWAYS</p>
            <p className="text-lg text-gray-700 text-center mb-16 leading-relaxed">
              International institutions can engage with AEF through three complementary pathways.
            </p>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8">
                <p className="text-sm font-bold text-blue-600 mb-2">01</p>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Institutional Engagement</h3>
                <p className="text-gray-700">
                  Participate in AEF forums, roundtables, dialogues and institutional meetings according to relevance and invitation.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8">
                <p className="text-sm font-bold text-green-700 mb-2">02</p>
                <h3 className="text-xl font-bold text-gray-900 mb-4">AEF Membership</h3>
                <p className="text-gray-700 mb-4">
                  Relevant institutional representatives may participate through appropriate AEF membership communities, where applicable, gaining access to the wider AEF ecosystem and selected activities.
                </p>
                <p className="text-sm text-gray-600">Membership means:</p>
                <p className="font-semibold text-gray-900">Belonging to the AEF ecosystem.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8">
                <p className="text-sm font-bold text-purple-700 mb-2">03</p>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Strategic Partnership</h3>
                <p className="text-gray-700 mb-4">
                  Institutions may establish a formal partnership with AEF around specific programmes, sectors, initiatives or strategic priorities.
                </p>
                <p className="text-sm text-gray-600 mb-2">Partnership may include:</p>
                <ul className="space-y-1 mb-4">
                  {partnershipItems.map((item) => (
                    <li key={item} className="flex items-start space-x-2 text-sm text-gray-700">
                      <i className="ri-check-line text-purple-600 flex-shrink-0"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600">Partnership means:</p>
                <p className="font-semibold text-gray-900">Building with AEF.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The AEF Deal Room */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold tracking-widest text-blue-300 mb-3">THE AEF DEAL ROOM</p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              International institutions can also engage with the AEF Deal Room where relevant to their mandate.
            </p>
            <p className="text-lg text-gray-300 mb-4">The Deal Room connects selected:</p>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
              {dealRoomChain.map((step, index) => (
                <React.Fragment key={step}>
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">{step}</span>
                  {index < dealRoomChain.length - 1 && <i className="ri-arrow-right-line text-xl text-blue-300"></i>}
                </React.Fragment>
              ))}
            </div>
            <p className="text-gray-300 mb-4">
              around concrete projects, investment opportunities, partnerships and strategic initiatives.
            </p>
            <p className="text-gray-300 leading-relaxed">
              For institutions involved in development, infrastructure, investment facilitation or technical cooperation, this creates an additional layer of engagement beyond the conference floor.
            </p>
          </div>
        </section>

        {/* A Platform for Economic Diplomacy */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">A Platform for Economic Diplomacy</h2>
            <p className="text-lg text-gray-700 mb-4">AEF operates at the intersection of:</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {diplomacyWords.map((w) => (
                <span key={w} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">{w}</span>
              ))}
            </div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              International institutions therefore become part of a broader economic diplomacy ecosystem.
            </p>
            <p className="text-lg text-gray-700 mb-2">The objective is not simply to attend a conference.</p>
            <p className="text-xl font-semibold text-blue-900">
              It is to build relationships that can continue beyond the event.
            </p>
          </div>
        </section>

        {/* Why Kinshasa */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold tracking-widest text-blue-600 mb-3">WHY KINSHASA</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">A Strategic African Base</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Kinshasa provides AEF with a strategic African base.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From the Democratic Republic of Congo — home to critical minerals, significant natural resources, a major population market and strategic regional importance — AEF creates a platform connecting African realities with global capital and international decision-making.
              </p>
              <p className="text-lg text-gray-700">The Forum brings the global conversation into Africa.</p>
              <p className="text-xl font-semibold text-blue-900">
                And brings Africa's opportunities to the global conversation.
              </p>
            </div>
          </div>
        </section>

        {/* Join the AEF Ecosystem */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Join the AEF Ecosystem</h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Whether your institution works in development, trade, infrastructure, investment, technology, health, climate, economic cooperation or international policy, AEF provides a platform to engage with the people and institutions shaping Africa's next chapter.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {joinWords.map((w) => (
                <span key={w} className="text-2xl font-bold">{w}</span>
              ))}
            </div>
            <button
              onClick={() => setShowMembershipForm(true)}
              className="bg-white text-blue-900 px-8 py-3 rounded-md hover:bg-gray-100 font-medium whitespace-nowrap cursor-pointer"
            >
              Apply for Partnership
            </button>
          </div>
        </section>
      </main>

      {/* Membership Form Modal */}
      {showMembershipForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Apply for Partnership</h3>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Type
                    </label>
                    <select
                      name="organizationType"
                      value={formData.organizationType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="un-agency">UN Agency</option>
                      <option value="development-bank">Development Bank</option>
                      <option value="multilateral">Multilateral Organization</option>
                      <option value="bilateral">Bilateral Institution</option>
                      <option value="foundation">Foundation</option>
                      <option value="ngo">International NGO</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Headquarters Location
                  </label>
                  <input
                    type="text"
                    name="headquarters"
                    value={formData.headquarters}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position/Title
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Focus Areas
                  </label>
                  <div className="grid md:grid-cols-2 gap-2">
                    {[
                      'Economic Development',
                      'Infrastructure',
                      'Education',
                      'Healthcare',
                      'Climate Change',
                      'Trade & Investment',
                      'Technology',
                      'Governance'
                    ].map((area) => (
                      <label key={area} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.focusAreas.includes(area)}
                          onChange={() => handleFocusAreaChange(area)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Programs in Africa
                  </label>
                  <textarea
                    name="currentPrograms"
                    value={formData.currentPrograms}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your current programs and initiatives in Africa..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partnership Goals
                  </label>
                  <textarea
                    name="partnershipGoals"
                    value={formData.partnershipGoals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What do you hope to achieve through partnership with AEF?"
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
                    I agree to the terms and conditions of AEF partnership
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
                <li><a href="/publications" className="text-gray-300 hover:text-white cursor-pointer">Subscribe to the press releases</a></li>
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

                <p>© 2026 Africa Economic Forum</p>
                <a href="https://Codesignglobal.com" className="hover:text-white cursor-pointer">Code Design Global</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
