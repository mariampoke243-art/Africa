import React, { useState, useEffect } from 'react';

export default function SocialEntrepreneurs() {
  // Auth and UI state
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Original page state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    founderName: '',
    email: '',
    phone: '',
    website: '',
    socialMission: '',
    impactArea: '',
    yearsOperating: '',
    teamSize: '',
    fundingStage: '',
    currentPrograms: '',
    collaborationInterests: [] as string[],
    termsAccepted: false,
  });

  const impactAreas = [
    'Education & Skills Development',
    'Healthcare & Wellness',
    'Environmental Sustainability',
    'Poverty Alleviation',
    'Gender Equality',
    'Youth Empowerment',
    'Community Development',
    'Technology for Good',
    'Financial Inclusion',
    'Food Security',
  ];

  const collaborationOptions = [
    'Knowledge Sharing & Best Practices',
    'Joint Program Development',
    'Funding & Investment Opportunities',
    'Capacity Building & Training',
    'Policy Advocacy',
    'Research Collaboration',
    'Mentorship Programs',
    'Network Expansion',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'termsAccepted') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else {
        setFormData(prev => ({
          ...prev,
          collaborationInterests: checked
            ? [...prev.collaborationInterests, value]
            : prev.collaborationInterests.filter(item => item !== value),
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Social Entrepreneurs application submitted:', formData);
    alert('Application submitted successfully! We will contact you soon.');
    setIsFormOpen(false);
    setFormData({
      organizationName: '',
      founderName: '',
      email: '',
      phone: '',
      website: '',
      socialMission: '',
      impactArea: '',
      yearsOperating: '',
      teamSize: '',
      fundingStage: '',
      currentPrograms: '',
      collaborationInterests: [],
      termsAccepted: false,
    });
  };

  // Page content
  const economicChain = [
    'Investment requires trust.',
    'Businesses require secure environments.',
    'Communities require opportunity.',
    'And development requires peace.',
  ];

  const civilSocietyRoles = [
    'They identify emerging risks.',
    'They build trust.',
    'They create local solutions.',
  ];

  const peaceChain = [
    'A stable environment can attract investment.',
    'Investment can create jobs.',
    'Jobs can expand opportunity.',
    'Opportunity can strengthen social stability.',
  ];

  const focusAreas = [
    {
      title: 'Peacebuilding & Conflict Prevention',
      text: 'Supporting dialogue, reconciliation, mediation and locally led approaches to peace.',
      icon: 'ri-shield-check-line',
      card: 'bg-gradient-to-br from-green-50 to-green-100',
      iconBg: 'bg-green-500',
    },
    {
      title: 'Governance & Social Cohesion',
      text: 'Strengthening trust, participation, accountability and cooperation within communities and institutions.',
      icon: 'ri-government-line',
      card: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
    },
    {
      title: 'Inclusive Economic Development',
      text: 'Connecting development initiatives with economic opportunities, entrepreneurship and investment.',
      icon: 'ri-funds-line',
      card: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
    },
    {
      title: 'Community Investment',
      text: 'Highlighting projects and organizations creating measurable social and economic impact at community level.',
      icon: 'ri-community-line',
      card: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconBg: 'bg-orange-500',
    },
    {
      title: 'Humanitarian & Development Partnerships',
      text: 'Creating connections between civil society, governments, development agencies and private-sector partners.',
      icon: 'ri-handshake-line',
      card: 'bg-gradient-to-br from-red-50 to-red-100',
      iconBg: 'bg-red-500',
    },
    {
      title: 'Youth, Women & Community Leadership',
      text: 'Supporting the participation of communities and emerging leaders in peacebuilding and development.',
      icon: 'ri-team-line',
      card: 'bg-gradient-to-br from-teal-50 to-teal-100',
      iconBg: 'bg-teal-500',
    },
    {
      title: 'Sustainable Development',
      text: 'Advancing initiatives that connect social impact, environmental sustainability and long-term economic resilience.',
      icon: 'ri-leaf-line',
      card: 'bg-gradient-to-br from-green-50 to-green-100',
      iconBg: 'bg-green-500',
    },
  ];

  const whoShouldJoin = [
    {
      title: 'Civil Society Leaders',
      text: 'NGO and civil society executives working across Africa.',
      icon: 'ri-user-star-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Peacebuilding Organizations',
      text: 'Institutions focused on mediation, reconciliation, conflict prevention and peacebuilding.',
      icon: 'ri-shield-check-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Foundations & Philanthropic Institutions',
      text: 'Organizations deploying resources toward social and economic development.',
      icon: 'ri-hand-heart-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Development Organizations',
      text: 'Institutions implementing development programs and community initiatives.',
      icon: 'ri-building-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Faith & Community Leaders',
      text: 'Trusted leaders contributing to dialogue, social cohesion and community development.',
      icon: 'ri-community-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Social Entrepreneurs',
      text: "Entrepreneurs developing solutions to Africa's social and economic challenges.",
      icon: 'ri-lightbulb-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Researchers & Practitioners',
      text: 'Experts working on peace, governance, development and inclusive growth.',
      icon: 'ri-book-open-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
  ];

  const memberGains = [
    {
      title: 'Access',
      text: 'Engage directly with government officials, investors, CEOs, development institutions and international partners.',
      icon: 'ri-key-2-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Partnerships',
      text: 'Build relationships with organizations capable of supporting, scaling or financing impactful initiatives.',
      icon: 'ri-handshake-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Visibility',
      text: 'Position your organization, programs and community initiatives before a high-level African and international audience.',
      icon: 'ri-megaphone-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Intelligence',
      text: 'Gain access to discussions and insights on geopolitics, development, investment, governance and emerging risks.',
      icon: 'ri-bar-chart-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Funding Connections',
      text: 'Connect relevant initiatives with philanthropic institutions, development finance organizations, investors and strategic partners.',
      icon: 'ri-funds-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Influence',
      text: "Bring civil society perspectives into conversations shaping Africa's economic and development agenda.",
      icon: 'ri-chat-voice-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Network',
      text: 'Join a cross-sector community connecting civil society with the broader Africa Economic Forum ecosystem.',
      icon: 'ri-team-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
  ];

  const membershipBenefits = [
    'Civil Society Africa Peace Forum Membership',
    'Official Access to the Africa Economic Forum',
    'Peace & Development Roundtables',
    'Closed-Door Civil Society Dialogues',
    'Government & Civil Society Engagement Sessions',
    'Access to the AEF Member Network',
    'Strategic Partnership Opportunities',
    'Access to Selected AEF Deal Room Opportunities',
    'Access to Development & Impact Investment Discussions',
    'Invitations to Leadership Dinners and Private Receptions',
    'Visibility Across AEF Platforms',
    'Participation in Special Peace & Development Initiatives',
    'Curated Introductions to Relevant Institutions and Partners',
    'Year-Round Community Engagement',
  ];

  const membershipIncludes = [
    'Civil Society Africa Peace Forum Membership',
    'Africa Economic Forum Delegate Pass',
    'Peace & Development Leadership Sessions',
    'Closed-Door Civil Society Dialogues',
    'Strategic Networking Opportunities',
    'Access to the AEF Member Network',
    'Selected AEF Deal Room Opportunities',
    'Partnership & Funding Connections',
    'Year-Round Community Engagement',
    'Participation in AEF Special Initiatives',
  ];

  const imperativeLines = [
    'It will require trust.',
    'It will require resilient communities.',
    'It will require institutions capable of working across borders, sectors and generations.',
  ];

  const closingLines = [
    'Where Communities Meet Decision-Makers.',
    'Where Peace Meets Development.',
    'Where Partnerships Become Impact.',
  ];

  // Auth & UI handlers
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
            <button className="md:hidden p-2 cursor-pointer" onClick={toggleMobileMenu}>
              <i className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}></i>
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
        <section
          className="relative min-h-[24rem] bg-cover bg-center bg-no-repeat flex items-center py-16"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://readdy.ai/api/search-image?query=Social%20entrepreneurs%20working%20together%20in%20modern%20collaborative%20workspace%2C%20diverse%20team%20brainstorming%2C%20innovation%20hub%2C%20social%20impact%20projects%2C%20bright%20natural%20lighting%2C%20professional%20business%20environment&width=1200&height=400&seq=5&orientation=landscape')`,
          }}
        >
          <div className="container mx-auto px-6">
            <div className="max-w-3xl text-white">
              <h1 className="text-5xl font-bold mb-6">Civil Society Africa Peace Forum</h1>
              <p className="text-2xl font-semibold mb-4 leading-snug">
                Where Peace Becomes the Foundation for Prosperity
              </p>
              <p className="text-xl mb-8 leading-relaxed">
                Economic transformation cannot happen without stability.
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Apply for Membership
              </button>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="space-y-2 mb-8">
                {economicChain.map((line) => (
                  <p key={line} className="text-lg text-gray-700">{line}</p>
                ))}
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Across Africa, civil society organizations, foundations, community leaders, faith-based organizations, peacebuilders and development practitioners are working every day to strengthen the conditions in which societies can prosper.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Civil Society Africa Peace Forum was created to connect these efforts with the institutions, governments, investors and business leaders shaping Africa's economic future.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Because peace is not separate from development.
                </p>
                <p className="text-2xl font-bold text-green-700">
                  Peace is an economic foundation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Peace & Civil Society Community */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">The Peace & Civil Society Community of the Africa Economic Forum</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Civil Society Africa Peace Forum is the peace and civil society community within the Africa Economic Forum.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  It brings together civil society leaders, NGOs, foundations, peacebuilding organizations, development practitioners, faith leaders, community representatives, social entrepreneurs and institutions working to strengthen peace, inclusion and sustainable development across Africa.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Forum creates a space where civil society can engage directly with governments, investors, businesses, development institutions and international partners.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Not simply to discuss challenges.
                </p>
                <p className="text-xl font-semibold text-gray-900 leading-relaxed">
                  But to connect community realities with capital, policy and action.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why the Civil Society Africa Peace Forum */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Why the Civil Society Africa Peace Forum?</h2>
              <div className="space-y-6 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Africa's development challenges cannot be addressed by governments and markets alone.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Communities understand realities on the ground.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Civil society organizations often work closest to the people affected by conflict, poverty, displacement, inequality and social exclusion.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {civilSocietyRoles.map((role) => (
                  <div key={role} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="ri-check-double-line text-xl text-green-600"></i>
                    </div>
                    <p className="font-semibold text-gray-900">{role}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  And they help ensure that economic transformation reaches beyond institutions and into communities.
                </p>
                <p className="text-xl font-semibold text-green-700 leading-relaxed">
                  The Civil Society Africa Peace Forum provides a platform for these voices to connect with the decision-makers and resources capable of supporting lasting solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* From Peacebuilding to Sustainable Development */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">From Peacebuilding to Sustainable Development</h2>
              <div className="max-w-3xl mx-auto text-center mb-10">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Peace and economic development are deeply connected.
                </p>
                <div className="space-y-2 mb-6">
                  {peaceChain.map((line) => (
                    <p key={line} className="text-lg text-gray-700">{line}</p>
                  ))}
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Forum therefore focuses on the intersection between peace, development, investment and inclusive growth.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {focusAreas.map((area) => (
                  <div key={area.title} className={`${area.card} p-6 rounded-lg`}>
                    <div className={`w-12 h-12 ${area.iconBg} rounded-lg flex items-center justify-center mb-4`}>
                      <i className={`${area.icon} text-xl text-white`}></i>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3">{area.title}</h3>
                    <p className="text-gray-600">{area.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who Should Join */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Who Should Join?</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {whoShouldJoin.map((item) => (
                  <div key={item.title} className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
                    <div className={`w-12 h-12 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <i className={`${item.icon} text-xl ${item.iconColor}`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What Members Gain */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Members Gain</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {memberGains.map((item) => (
                  <div key={item.title} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <i className={`${item.icon} text-xl ${item.iconColor}`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Membership Benefits */}
        <section className="py-16 bg-green-600">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-12">Membership Benefits</h2>

              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {membershipBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-start space-x-3 text-green-50">
                    <i className="ri-check-line text-xl text-white flex-shrink-0"></i>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Membership */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Membership</h2>
              <div className="space-y-6 mb-12">
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Civil Society Africa Peace Forum is a curated community within the Africa Economic Forum.
                </p>
                <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                  Membership is granted through application and approval to ensure that participating organizations and leaders contribute meaningfully to the community.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The objective is not to create another large membership database.
                </p>
                <p className="text-xl font-semibold text-green-700 leading-relaxed">
                  It is to build a trusted working network where civil society leaders can meet the institutions, decision-makers and partners capable of turning ideas into measurable impact.
                </p>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Membership includes:</h3>
                <ul className="grid md:grid-cols-2 gap-3 mb-6">
                  {membershipIncludes.map((item) => (
                    <li key={item} className="flex items-start space-x-3 text-gray-700">
                      <i className="ri-check-line text-xl text-green-600 flex-shrink-0"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-600">
                  Membership is subject to application and approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Peace Is an Economic Imperative */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Peace Is Not Only a Social Priority.</h2>
              <h2 className="text-3xl font-bold text-green-700 mb-8">It Is an Economic Imperative.</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  The next decade will require more than capital and infrastructure.
                </p>
                {imperativeLines.map((line) => (
                  <p key={line} className="text-lg text-gray-700 leading-relaxed">{line}</p>
                ))}
                <p className="text-lg text-gray-700 leading-relaxed">
                  And it will require partnerships between those who make policy, those who deploy capital and those who understand communities from the ground up.
                </p>
                <p className="text-xl font-semibold text-gray-900 leading-relaxed">
                  The Civil Society Africa Peace Forum exists to help build those connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Banner */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="space-y-2 mb-8">
                {closingLines.map((line) => (
                  <p key={line} className="text-2xl font-bold">{line}</p>
                ))}
              </div>
              <p className="text-xl text-gray-200 mb-2">Welcome to the Civil Society Africa Peace Forum.</p>
              <p className="text-gray-400">The Peace & Civil Society Community of the Africa Economic Forum.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-green-600">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Apply for Membership</h2>
              <p className="text-xl text-green-100 mb-8">
                Join a trusted community of civil society leaders, institutions and partners connecting peace with sustainable development across Africa.
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                Apply for Membership
              </button>
            </div>
          </div>
        </section>

        {/* Application Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Social Entrepreneurs Network Application</h3>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Name *
                      </label>
                      <input
                        type="text"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Founder/CEO Name *
                      </label>
                      <input
                        type="text"
                        name="founderName"
                        value={formData.founderName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
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
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website/Social Media
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Social Mission *
                    </label>
                    <textarea
                      name="socialMission"
                      value={formData.socialMission}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Describe your organization's social mission and impact goals..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Impact Area *
                    </label>
                    <select
                      name="impactArea"
                      value={formData.impactArea}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Impact Area</option>
                      {impactAreas.map(area => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years Operating *
                      </label>
                      <select
                        name="yearsOperating"
                        value={formData.yearsOperating}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select</option>
                        <option value="0-1">0-1 years</option>
                        <option value="2-3">2-3 years</option>
                        <option value="4-5">4-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Team Size *
                      </label>
                      <select
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select</option>
                        <option value="1-5">1-5 people</option>
                        <option value="6-15">6-15 people</option>
                        <option value="16-50">16-50 people</option>
                        <option value="51-100">51-100 people</option>
                        <option value="100+">100+ people</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Funding Stage *
                      </label>
                      <select
                        name="fundingStage"
                        value={formData.fundingStage}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select</option>
                        <option value="Pre-seed">Pre-seed</option>
                        <option value="Seed">Seed</option>
                        <option value="Series A">Series A</option>
                        <option value="Series B+">Series B+</option>
                        <option value="Self-funded">Self-funded</option>
                        <option value="Grant-funded">Grant-funded</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Programs/Initiatives *
                    </label>
                    <textarea
                      name="currentPrograms"
                      value={formData.currentPrograms}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Describe your current programs, initiatives, and achievements..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Collaboration Interests (Select all that apply)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {collaborationOptions.map(option => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            name="collaborationInterests"
                            value={option}
                            checked={formData.collaborationInterests.includes(option)}
                            onChange={handleInputChange}
                            className="mr-3 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="mr-3 text-green-600 focus:ring-green-500"
                      required
                    />
                    <label className="text-sm text-gray-700">
                      I agree to the terms and conditions and privacy policy *
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
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
                      <input type="checkbox" name="terms_agreement" required className="mt-1 cursor-pointer" />
                      <span className="text-sm text-gray-600">I agree to the Terms of Service and Privacy Policy</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <input type="checkbox" name="newsletter_consent" className="mt-1 cursor-pointer" />
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
