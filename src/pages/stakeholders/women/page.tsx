'use client';

import React, { useState, useEffect } from 'react';

const WomenPage: React.FC = () => {
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
    profession: '',
    organization: '',
    experience: '',
    leadershipRoles: '',
    focusAreas: [] as string[],
    mentorshipInterests: [] as string[],
    goals: '',
    challenges: '',
    networkingPreferences: [] as string[],
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

  const focusAreaOptions = [
    'Entrepreneurship & Business',
    'Leadership & Governance',
    'Finance & Investment',
    'Technology & Innovation',
    'Education & Skills Development',
    'Healthcare & Social Services',
    'Environmental Sustainability',
    'Policy & Advocacy',
    'Arts & Culture',
    'Agriculture & Rural Development',
    'Manufacturing & Industry',
    'Nonprofit & Social Enterprise'
  ];

  const mentorshipOptions = [
    'Seeking mentorship',
    'Willing to mentor',
    'Both mentoring and being mentored',
    'Senior leadership guidance',
    'Technical skills training',
    'Business strategy coaching',
    'Career development support',
    'Financial literacy training',
    'Industry-specific knowledge',
    'Public speaking & communication',
    'Board & governance experience',
    'Startup founder support'
  ];

  const networkingOptions = [
    'In-person events',
    'Virtual events & webinars',
    'One-on-one meetings',
    'Small group discussions',
    'Large conferences',
    'Online community forums',
    'Regional meetups',
    'International conferences'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'termsAccepted') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else {
        const arrayField = name as 'focusAreas' | 'mentorshipInterests' | 'networkingPreferences';
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
    console.log('Women Network application submitted:', formData);
    alert('Application submitted successfully! Welcome to the AEF Women Empowerment Network!');
    setIsFormOpen(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      profession: '',
      organization: '',
      experience: '',
      leadershipRoles: '',
      focusAreas: [],
      mentorshipInterests: [],
      goals: '',
      challenges: '',
      networkingPreferences: [],
      availability: '',
      termsAccepted: false,
    });
  };

  // Page content
  const barriers = [
    'Access to capital.',
    'Access to leadership opportunities.',
    'Access to networks.',
    'Access to mentorship.',
  ];

  const engagementAreas = [
    {
      title: 'Leadership & Governance',
      text: "Promoting women's participation in leadership and decision-making across all sectors.",
      icon: 'ri-user-voice-line',
      card: 'bg-gradient-to-br from-pink-50 to-pink-100',
      iconBg: 'bg-pink-500',
    },
    {
      title: 'Entrepreneurship & Business Growth',
      text: 'Supporting women entrepreneurs and business leaders seeking growth, partnerships and market expansion.',
      icon: 'ri-briefcase-line',
      card: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
    },
    {
      title: 'Investment & Access to Capital',
      text: 'Facilitating connections between women leaders, investors and financial institutions.',
      icon: 'ri-funds-line',
      card: 'bg-gradient-to-br from-teal-50 to-teal-100',
      iconBg: 'bg-teal-500',
    },
    {
      title: 'Innovation & Technology',
      text: 'Highlighting women driving innovation across emerging industries and technologies.',
      icon: 'ri-lightbulb-line',
      card: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconBg: 'bg-orange-500',
    },
    {
      title: 'Economic Inclusion',
      text: 'Advancing opportunities that contribute to more inclusive and sustainable growth.',
      icon: 'ri-earth-line',
      card: 'bg-gradient-to-br from-red-50 to-red-100',
      iconBg: 'bg-red-500',
    },
    {
      title: 'Mentorship & Next-Generation Leadership',
      text: 'Connecting established leaders with emerging talent across Africa.',
      icon: 'ri-hearts-line',
      card: 'bg-gradient-to-br from-green-50 to-green-100',
      iconBg: 'bg-green-500',
    },
    {
      title: 'Public Policy & Advocacy',
      text: "Encouraging dialogue on policies that support women's economic participation and leadership.",
      icon: 'ri-megaphone-line',
      card: 'bg-gradient-to-br from-pink-50 to-pink-100',
      iconBg: 'bg-pink-500',
    },
  ];

  const whoShouldJoin = [
    {
      title: 'Women Heads of State & Government Leaders',
      text: 'Women shaping national and regional development agendas.',
      icon: 'ri-vip-crown-line',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
    },
    {
      title: 'Women Ministers & Public Officials',
      text: 'Decision-makers advancing policies that support growth and opportunity.',
      icon: 'ri-government-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Women CEOs & Corporate Executives',
      text: 'Business leaders driving growth, innovation and transformation.',
      icon: 'ri-briefcase-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Women Investors & Financial Leaders',
      text: 'Leaders deploying capital and shaping investment decisions.',
      icon: 'ri-funds-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Women Entrepreneurs',
      text: 'Founders and innovators building the next generation of African enterprises.',
      icon: 'ri-rocket-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Women in Academia & Research',
      text: 'Experts contributing knowledge, ideas and strategic insights.',
      icon: 'ri-book-open-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Women in Civil Society & Development',
      text: 'Leaders advancing social impact and sustainable development.',
      icon: 'ri-hearts-line',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
    },
  ];

  const memberGains = [
    {
      title: 'Access',
      text: 'Direct engagement with influential women leaders, policymakers, investors and executives.',
      icon: 'ri-key-2-line',
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
    },
    {
      title: 'Visibility',
      text: 'A platform to showcase leadership, expertise, initiatives and achievements.',
      icon: 'ri-megaphone-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Influence',
      text: "Participation in conversations shaping Africa's future.",
      icon: 'ri-chat-voice-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Partnerships',
      text: 'Opportunities to build meaningful relationships and collaborations.',
      icon: 'ri-handshake-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Mentorship',
      text: 'Access to a powerful network of accomplished leaders and rising talent.',
      icon: 'ri-user-voice-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Opportunities',
      text: 'Connections to investors, institutions, strategic partners and new markets.',
      icon: 'ri-compass-3-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
  ];

  const membershipBenefits = [
    'Membership in the Africa Women Forum',
    'Official Access to the Africa Economic Forum',
    'Women Leadership Roundtables',
    'Executive Networking Sessions',
    'Access to the AEF Member Directory',
    'Access to the AEF Deal Room',
    'Strategic Partnership Opportunities',
    'Leadership Dinners and Private Receptions',
    'Mentorship and Peer Learning Opportunities',
    'Visibility Across AEF Platforms',
    'Participation in Special Initiatives and Programs',
    'Year-Round Community Engagement',
  ];

  const membershipIncludes = [
    'Africa Economic Forum Delegate Pass',
    'Full Africa Women Forum Membership',
    'Access to Leadership Sessions',
    'Access to Exclusive Networking Events',
    'Access to the AEF Deal Room',
    'Access to the Member Directory',
    'Year-Round Community Engagement',
    'Strategic Partnership Opportunities',
  ];

  const closingLines = [
    'Leadership Has No Gender.',
    'Opportunity Should Have No Limits.',
    'The Future Is Stronger When Women Lead.',
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://readdy.ai/api/search-image?query=Diverse%20group%20of%20professional%20women%20networking%2C%20confident%20female%20leaders%2C%20business%20environment%2C%20women%20empowerment%2C%20female%20leadership%20conference&width=1200&height=400&seq=women-hero&orientation=landscape')`
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-6">Africa Women Forum</h1>
            <p className="text-2xl font-semibold mb-4 leading-snug">
              Where Women Shape Africa's Future
            </p>
            <p className="text-xl mb-8 leading-relaxed">
              Africa's future will not be built by half of its talent. It will be built by all of it.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Apply for Membership
            </button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Across government, business, finance, entrepreneurship, technology, academia and civil society, women are driving innovation, creating jobs, leading institutions and transforming communities.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              They are not simply participants in Africa's growth story.
            </p>
            <p className="text-xl font-semibold text-gray-900 leading-relaxed">
              They are among its architects.
            </p>
            <p className="text-xl font-semibold text-pink-600 leading-relaxed">
              The Africa Women Forum was created to recognize, connect and elevate the women shaping Africa's economic future.
            </p>
          </div>
        </div>
      </section>

      {/* Women Leadership Community */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Women Leadership Community of the Africa Economic Forum</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                The Africa Women Forum is a high-level community of women leaders from government, business, finance, entrepreneurship, academia, technology, media and civil society.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                As a flagship platform of the Africa Economic Forum, it brings together accomplished women from across Africa and around the world to exchange ideas, build partnerships, unlock opportunities and inspire the next generation of leaders.
              </p>
              <p className="text-xl font-semibold text-gray-900 leading-relaxed">
                Because when women lead, economies grow stronger, businesses become more resilient and societies become more inclusive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why the Africa Women Forum */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why the Africa Women Forum?</h2>
            <div className="space-y-6 text-center mb-10">
              <p className="text-lg text-gray-700 leading-relaxed">
                Africa is home to some of the world's most dynamic women leaders.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From boardrooms and government offices to startups, investment funds and social enterprises, women are contributing to economic growth at every level.
              </p>
              <p className="text-lg font-semibold text-gray-900">
                Yet barriers remain.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {barriers.map((item) => (
                <div key={item} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-key-2-line text-xl text-pink-600"></i>
                  </div>
                  <p className="font-semibold text-gray-900">{item}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                The Africa Women Forum exists to help bridge those gaps.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By creating a platform where women can connect with decision-makers, investors, institutions and opportunities that accelerate their impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advancing Women's Leadership */}
      <section className="py-16 bg-pink-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-8">Advancing Women's Leadership in Africa</h2>
            <p className="text-xl text-pink-100 mb-6 leading-relaxed">
              The future of Africa's development depends on the full participation of women in shaping economic, political and social outcomes.
            </p>
            <p className="text-lg text-pink-100 mb-6 leading-relaxed">
              The Africa Women Forum provides a platform for dialogue, collaboration and action.
            </p>
            <p className="text-lg text-pink-100 leading-relaxed">
              A space where leaders can share experiences, develop partnerships and contribute to Africa's transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Areas of Engagement */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Areas of Engagement</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {engagementAreas.map((area) => (
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
      <section className="py-16 bg-pink-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Membership Benefits</h2>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {membershipBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start space-x-3 text-pink-50">
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
                The Africa Women Forum is a curated community of women leaders committed to shaping Africa's future through leadership, innovation and collaboration.
              </p>
              <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                Membership is granted through application and approval.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                To preserve the quality of engagement and ensure meaningful connections among members, participation is intentionally selective.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The goal is to create a trusted platform where women leaders can support one another, build partnerships and create lasting impact.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Membership includes:</h3>
              <ul className="grid md:grid-cols-2 gap-3 mb-6">
                {membershipIncludes.map((item) => (
                  <li key={item} className="flex items-start space-x-3 text-gray-700">
                    <i className="ri-check-line text-xl text-pink-600 flex-shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600">
                Seats are allocated to ensure diversity of sectors, industries and geographic representation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Creates Opportunity */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Leadership Creates Opportunity</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                The next chapter of Africa's growth will be shaped by leaders who bring vision, resilience and innovation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Women are already leading that transformation.
              </p>
              <p className="text-xl font-semibold text-pink-600 leading-relaxed">
                The Africa Women Forum exists to ensure those leaders are connected, empowered and positioned to create even greater impact.
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
            <p className="text-xl text-gray-200 mb-2">Welcome to the Africa Women Forum.</p>
            <p className="text-gray-400">The Women Leadership Community of the Africa Economic Forum.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Apply for Membership</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join a powerful community of women leaders shaping Africa's economic future.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors whitespace-nowrap cursor-pointer"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 font-medium whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={switchToCreateAccount}
                    className="text-pink-600 hover:underline cursor-pointer"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    placeholder="Create a password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 font-medium whitespace-nowrap cursor-pointer"
                >
                  Create Account
                </button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={switchToSignIn}
                    className="text-pink-600 hover:underline cursor-pointer"
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
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Women Network Application</h3>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profession *
                    </label>
                    <input
                      type="text"
                      name="profession"
                      value={formData.profession}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization *
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="e.g., 10+ years"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leadership Roles *
                  </label>
                  <textarea
                    name="leadershipRoles"
                    value={formData.leadershipRoles}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Describe any leadership positions or roles you've held..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Focus Areas (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                    {focusAreaOptions.map((area) => (
                      <label key={area} className="flex items-center">
                        <input
                          type="checkbox"
                          name="focusAreas"
                          value={area}
                          checked={formData.focusAreas.includes(area)}
                          onChange={handleInputChange}
                          className="mr-3 text-pink-600 focus:ring-pink-500"
                        />
                        <span className="text-sm text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Mentorship Interests (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                    {mentorshipOptions.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          name="mentorshipInterests"
                          value={option}
                          checked={formData.mentorshipInterests.includes(option)}
                          onChange={handleInputChange}
                          className="mr-3 text-pink-600 focus:ring-pink-500"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal Goals *
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="What are your personal and professional goals?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Challenges & Support Needed *
                  </label>
                  <textarea
                    name="challenges"
                    value={formData.challenges}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="What challenges are you facing? What support do you need?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Networking Preferences (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {networkingOptions.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          name="networkingPreferences"
                          value={option}
                          checked={formData.networkingPreferences.includes(option)}
                          onChange={handleInputChange}
                          className="mr-3 text-pink-600 focus:ring-pink-500"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability *
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Availability</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Flexible">Flexible</option>
                    <option value="Project-based">Project-based</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="mr-3 text-pink-600 focus:ring-pink-500"
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
                    className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors whitespace-nowrap cursor-pointer"
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

                <p>© 2025 Africa Economic Forum</p>
                <a href="https://codesignglobal.com" className="hover:text-white cursor-pointer">Code Design Global</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WomenPage;
