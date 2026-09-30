'use client';

import React, { useState, useEffect } from 'react';

const MediaPage: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    mediaOrganization: '',
    position: '',
    mediaType: '',
    specialization: [] as string[],
    experience: '',
    portfolio: '',
    coverage: '',
    interests: [] as string[],
    collaborationGoals: '',
    availability: '',
    termsAccepted: false,
  });

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

  const mediaTypes = [
    'Television',
    'Radio',
    'Print Media',
    'Digital Media',
    'Online Publications',
    'Podcasting',
    'Documentary',
    'Photography',
    'Video Production',
    'Social Media',
    'Freelance Journalism',
    'News Agency',
  ];

  const specializationOptions = [
    'Economic Reporting',
    'Political Journalism',
    'Environmental Coverage',
    'Technology & Innovation',
    'Social Issues',
    'International Affairs',
    'Business & Finance',
    'Health & Science',
    'Education',
    'Culture & Arts',
    'Sports',
    'Investigative Journalism',
  ];

  const interestOptions = [
    'Economic Development Stories',
    'Policy Analysis & Commentary',
    'Sustainability Reporting',
    'Innovation & Technology',
    'Social Impact Stories',
    'International Cooperation',
    'Business Leadership Profiles',
    'Educational Initiatives',
    'Cultural Exchange Programs',
    'Youth Empowerment',
    'Women Leadership',
    'Climate Action',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'termsAccepted') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else {
        const arrayField = name as 'specialization' | 'interests';
        setFormData(prev => ({
          ...prev,
          [arrayField]: checked
            ? [...prev[arrayField], value]
            : prev[arrayField].filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Media Partnership application submitted:', formData);
    alert('Application submitted successfully! Welcome to the AEF Media Partnership Network!');
    setIsFormOpen(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      mediaOrganization: '',
      position: '',
      mediaType: '',
      specialization: [],
      experience: '',
      portfolio: '',
      coverage: '',
      interests: [],
      collaborationGoals: '',
      availability: '',
      termsAccepted: false,
    });
  };

  // Page content
  const changeLines = [
    'Its economies are expanding.',
    'Its markets are evolving.',
    'Its industries are attracting global capital.',
    'Its cities are transforming.',
    'And its role in the global economy is becoming increasingly significant.',
  ];

  const whyLines = [
    'Investors need reliable information.',
    'Governments need to communicate national priorities.',
    'Businesses need to explain their markets and ambitions.',
    'Institutions need their work understood.',
  ];

  const focusAreas = [
    {
      title: 'Economic Journalism',
      text: 'Access conversations and perspectives on investment, trade, business, finance and economic transformation.',
      icon: 'ri-line-chart-line',
      card: 'bg-gradient-to-br from-red-50 to-red-100',
      iconBg: 'bg-red-500',
    },
    {
      title: 'Investment & Business Reporting',
      text: "Connect with investors, CEOs, entrepreneurs and project developers shaping Africa's markets.",
      icon: 'ri-funds-line',
      card: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
    },
    {
      title: 'Strategic Communications',
      text: 'Explore how governments, institutions and companies communicate their priorities and engage global audiences.',
      icon: 'ri-chat-voice-line',
      card: 'bg-gradient-to-br from-green-50 to-green-100',
      iconBg: 'bg-green-500',
    },
    {
      title: "Africa's Global Positioning",
      text: "Contribute to a more informed understanding of Africa's role in global investment, trade and geopolitics.",
      icon: 'ri-earth-line',
      card: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
    },
    {
      title: 'Digital Media & Storytelling',
      text: 'Connect traditional media with digital platforms, creators and emerging forms of economic storytelling.',
      icon: 'ri-live-line',
      card: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconBg: 'bg-orange-500',
    },
    {
      title: 'Public Affairs & Thought Leadership',
      text: 'Engage with leaders and institutions shaping public policy, business and development.',
      icon: 'ri-government-line',
      card: 'bg-gradient-to-br from-teal-50 to-teal-100',
      iconBg: 'bg-teal-500',
    },
    {
      title: 'Media Partnerships',
      text: 'Develop relationships that create opportunities for interviews, editorial collaborations, special reports and strategic media initiatives.',
      icon: 'ri-handshake-line',
      card: 'bg-gradient-to-br from-red-50 to-red-100',
      iconBg: 'bg-red-500',
    },
  ];

  const whoShouldJoin = [
    {
      title: 'Journalists & Correspondents',
      text: 'Professionals covering business, economics, politics, investment, diplomacy and development.',
      icon: 'ri-news-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Editors & Publishers',
      text: 'Leaders responsible for shaping editorial agendas and media platforms.',
      icon: 'ri-article-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Broadcasting Executives',
      text: 'Television, radio and multimedia professionals covering Africa and global affairs.',
      icon: 'ri-broadcast-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Business & Financial Media',
      text: 'Publications and platforms specializing in markets, investment, finance and corporate affairs.',
      icon: 'ri-bar-chart-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Digital Media Leaders',
      text: 'Founders and executives building Africa-focused digital media platforms.',
      icon: 'ri-computer-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Content Creators',
      text: "Creators producing high-quality content on business, economics, leadership and Africa's global role.",
      icon: 'ri-video-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Strategic Communications Professionals',
      text: 'Experts working across public affairs, corporate communications, reputation and stakeholder engagement.',
      icon: 'ri-megaphone-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ];

  const memberGains = [
    {
      title: 'Access',
      text: 'Direct access to CEOs, investors, government officials, diplomats, entrepreneurs and institutional leaders.',
      icon: 'ri-key-2-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Information',
      text: 'Engage with the people directly involved in major investment, policy and development initiatives.',
      icon: 'ri-information-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Stories',
      text: 'Discover emerging business opportunities, investment themes, innovations and African success stories.',
      icon: 'ri-lightbulb-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Visibility',
      text: 'Position your media platform within a high-level ecosystem of African and international decision-makers.',
      icon: 'ri-eye-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Relationships',
      text: 'Build direct relationships with sources, institutions, companies and potential media partners.',
      icon: 'ri-user-voice-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Opportunities',
      text: 'Access interviews, briefings, media engagements, special initiatives and strategic communications opportunities.',
      icon: 'ri-compass-3-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Network',
      text: "Become part of a cross-sector ecosystem connecting media with the people shaping Africa's economic future.",
      icon: 'ri-team-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ];

  const membershipBenefits = [
    'AEF Media Network Membership',
    'Official Access to the Africa Economic Forum',
    'Media Accreditation & Priority Access',
    'Press & Media Briefings',
    'CEO & Government Leader Interviews',
    'Closed-Door Media Sessions',
    'Access to Selected AEF Roundtables',
    'Access to the AEF Member Network',
    'Media Networking & Editorial Meetings',
    'Strategic Media Partnership Opportunities',
    'Access to AEF Reports & Economic Intelligence',
    'Opportunities for Special Features & Interviews',
    'Visibility Across Selected AEF Platforms',
    'Year-Round Media Engagement',
    'Curated Introductions to Key Stakeholders',
  ];

  const membershipIncludes = [
    'AEF Media Network Membership',
    'Africa Economic Forum Media Access',
    'Priority Media & Press Opportunities',
    'Executive Interview Opportunities',
    'Media Briefings',
    'Access to Selected AEF Sessions',
    'AEF Member Network Access',
    'Strategic Media Networking',
    'Partnership Opportunities',
    'Year-Round Community Engagement',
  ];

  const closingLines = [
    'Stories Shape Perception.',
    'Perception Shapes Engagement.',
    'Engagement Shapes Opportunity.',
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
              <a href="/" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">Home</a>
              <a href="/about" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
              <a href="/initiatives" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">Initiatives</a>
              <a href="/stakeholders" className="text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-600">Stakeholders</a>
              <a href="/agenda" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">Agenda</a>
              <a href="/publications" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">Publications</a>
              <a href="/meetings" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">Meetings</a>
              <a href="/contact" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
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
        className="relative min-h-[24rem] bg-cover bg-center bg-no-repeat flex items-center py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://readdy.ai/api/search-image?query=Modern%20media%20newsroom%2C%20journalists%20working%2C%20broadcast%20equipment%2C%20professional%20news%20environment%2C%20media%20production%2C%20journalism%20and%20communication&width=1200&height=400&seq=25&orientation=landscape')`
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-6">AEF Media Network</h1>
            <p className="text-2xl font-semibold mb-4 leading-snug">
              Where Africa's Story Meets Global Influence
            </p>
            <p className="text-xl mb-8 leading-relaxed">
              Africa is changing.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
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
              {changeLines.map((line) => (
                <p key={line} className="text-lg text-gray-700">{line}</p>
              ))}
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                But economic transformation is not only about what happens.
              </p>
              <p className="text-xl font-semibold text-gray-900 leading-relaxed">
                It is also about how the world sees what happens.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The stories that are told about Africa influence perceptions, investment decisions, political relationships, consumer confidence and international partnerships.
              </p>
              <p className="text-xl font-semibold text-red-600 leading-relaxed">
                The AEF Media Network was created for the people who shape those narratives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Media & Strategic Communications Community */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Media & Strategic Communications Community of the Africa Economic Forum</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                The AEF Media Network is the media and strategic communications community within the Africa Economic Forum.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                It brings together journalists, editors, publishers, broadcasters, media executives, business publications, digital platforms, content creators, strategic communications professionals and thought leaders covering Africa and the global economy.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The Network connects media professionals directly with the governments, investors, CEOs, institutions and innovators shaping Africa's next chapter.
              </p>
              <p className="text-xl font-semibold text-gray-900 leading-relaxed">
                Because access creates better journalism. And better journalism creates better understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why the AEF Media Network */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why the AEF Media Network?</h2>
            <p className="text-lg text-gray-700 text-center mb-8 leading-relaxed">
              Africa's economic story is increasingly global.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {whyLines.map((line) => (
                <div key={line} className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-check-double-line text-xl text-red-600"></i>
                  </div>
                  <p className="font-semibold text-gray-900">{line}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6 text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                And international audiences need deeper perspectives on a continent too often reduced to headlines.
              </p>
              <p className="text-xl font-semibold text-red-600 leading-relaxed">
                The AEF Media Network creates a trusted environment where media professionals can access the people, information and conversations behind Africa's most important economic developments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shaping the Narrative */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Shaping the Narrative Around Africa's Transformation</h2>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              The Network focuses on the intersection of media, economics, investment, diplomacy and strategic communication.
            </p>

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
      <section className="py-16 bg-red-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Membership Benefits</h2>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {membershipBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start space-x-3 text-red-50">
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
                The AEF Media Network is a curated professional community within the Africa Economic Forum.
              </p>
              <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                Membership is granted through application and approval.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The objective is to bring together credible media professionals and platforms capable of contributing to meaningful conversations about Africa's economy, investment landscape and global position.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                This is not simply a media accreditation list.
              </p>
              <p className="text-xl font-semibold text-red-600 leading-relaxed">
                It is a year-round network connecting media with access, information and relationships.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Membership includes:</h3>
              <ul className="grid md:grid-cols-2 gap-3 mb-6">
                {membershipIncludes.map((item) => (
                  <li key={item} className="flex items-start space-x-3 text-gray-700">
                    <i className="ri-check-line text-xl text-red-600 flex-shrink-0"></i>
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

      {/* The World Is Watching Africa */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The World Is Watching Africa.</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                The question is not only what Africa will become.
              </p>
              <p className="text-xl font-semibold text-gray-900 leading-relaxed">
                It is also who will tell the story.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The next decade will produce new industries, new markets, new leaders and new global partnerships.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The AEF Media Network brings together the professionals who document, explain and amplify those developments.
              </p>
              <p className="text-xl font-semibold text-red-600 leading-relaxed">
                Because the way Africa is understood can influence how Africa is engaged.
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
            <p className="text-xl text-gray-200 mb-2">Welcome to the AEF Media Network.</p>
            <p className="text-gray-400">The Media & Strategic Communications Community of the Africa Economic Forum.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Apply for Membership</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join a trusted community of media professionals and communicators shaping how the world understands Africa's economic future.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Apply for Membership
            </button>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 font-medium whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={switchToCreateAccount}
                    className="text-red-600 hover:underline cursor-pointer"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    placeholder="Create a password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 font-medium whitespace-nowrap cursor-pointer"
                >
                  Create Account
                </button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={switchToSignIn}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Media Partnership Application</h3>
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
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position/Title *
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Media Organization *
                    </label>
                    <input
                      type="text"
                      name="mediaOrganization"
                      value={formData.mediaOrganization}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Media Type *
                    </label>
                    <select
                      name="mediaType"
                      value={formData.mediaType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Media Type</option>
                      {mediaTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Specialization Areas (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                    {specializationOptions.map((area) => (
                      <label key={area} className="flex items-center">
                        <input
                          type="checkbox"
                          name="specialization"
                          value={area}
                          checked={formData.specialization.includes(area)}
                          onChange={handleInputChange}
                          className="mr-3 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Experience *
                  </label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Describe your journalism experience, notable work, and achievements..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio/Work Samples
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Link to your portfolio, website, or notable work samples"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coverage Areas & Audience *
                  </label>
                  <textarea
                    name="coverage"
                    value={formData.coverage}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Describe your coverage areas, target audience, and reach..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Content Interests (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                    {interestOptions.map((interest) => (
                      <label key={interest} className="flex items-center">
                        <input
                          type="checkbox"
                          name="interests"
                          value={interest}
                          checked={formData.interests.includes(interest)}
                          onChange={handleInputChange}
                          className="mr-3 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collaboration Goals *
                  </label>
                  <textarea
                    name="collaborationGoals"
                    value={formData.collaborationGoals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="What do you hope to achieve through partnership with AEF?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability for Collaboration *
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Availability</option>
                    <option value="Full-time collaboration">Full-time collaboration</option>
                    <option value="Regular contributor">Regular contributor</option>
                    <option value="Project-based">Project-based</option>
                    <option value="Event coverage">Event coverage</option>
                    <option value="Occasional contributor">Occasional contributor</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="mr-3 text-red-600 focus:ring-red-500"
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
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
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
};

export default MediaPage;
