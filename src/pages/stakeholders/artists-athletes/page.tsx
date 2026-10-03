'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/client';

const ArtistsAthletesPage: React.FC = () => {
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
    category: '',
    discipline: '',
    experience: '',
    achievements: '',
    socialImpact: '',
    interests: [] as string[],
    collaborationGoals: '',
    availability: '',
    portfolio: '',
    socialMedia: '',
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

  const categories = [
    'Visual Arts',
    'Music',
    'Theater & Performance',
    'Film & Video Production',
    'Dance',
    'Literature',
    'Professional Sports',
    'Emerging Sports',
    'Traditional Arts',
    'Digital/New Media Arts',
    'Fashion Design',
    'Photography'
  ];

  const interestOptions = [
    'Cultural Preservation',
    'Youth Mentorship',
    'Social Impact Initiatives',
    'Economic Empowerment',
    'Education Programs',
    'Community Development',
    'International Collaboration',
    'Technology & Innovation',
    'Environmental Sustainability',
    'Gender Equality',
    'Health & Wellness',
    'Advocacy & Policy'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'termsAccepted') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else {
        setFormData(prev => ({
          ...prev,
          interests: checked
            ? [...prev.interests, value]
            : prev.interests.filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('artists_athletes_applications')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            country: formData.country,
            city: formData.city,
            category: formData.category,
            discipline: formData.discipline,
            experience: formData.experience,
            achievements: formData.achievements,
            social_impact: formData.socialImpact,
            interests: formData.interests,
            collaboration_goals: formData.collaborationGoals,
            availability: formData.availability,
            portfolio: formData.portfolio || null,
            social_media: formData.socialMedia || null,
            terms_accepted: formData.termsAccepted,
          },
        ]);

      if (error) {
        console.error('Artists & Athletes application submission error:', error);
        alert('Unable to submit your application. Please try again later.');
        return;
      }

      alert('Application submitted successfully! Welcome to the AEF Artists & Athletes Network!');
      setIsFormOpen(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        category: '',
        discipline: '',
        experience: '',
        achievements: '',
        socialImpact: '',
        interests: [],
        collaborationGoals: '',
        availability: '',
        portfolio: '',
        socialMedia: '',
        termsAccepted: false,
      });
    } catch (err) {
      console.error('Unexpected Artists & Athletes application error:', err);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  // Page content
  const influenceLines = [
    'Sport fills stadiums.',
    'Music crosses languages.',
    'Film changes perceptions.',
    'Fashion creates markets.',
    'Digital creators build communities.',
  ];

  const industryNeeds = [
    'Capital.',
    'Infrastructure.',
    'Professional management.',
    'Intellectual property protection.',
    'Technology.',
    'Markets.',
    'Partnerships.',
  ];

  const meetingLines = [
    'A space where talent meets capital.',
    'Where creators meet brands.',
    'Where athletes meet investors.',
    'Where culture meets diplomacy.',
    'And where ideas can become businesses.',
  ];

  const sectors = [
    {
      title: 'Sports Business & Investment',
      text: 'Connecting athletes, clubs, federations, investors, sponsors and sports executives around the business of sport.',
      icon: 'ri-trophy-line',
      card: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
    },
    {
      title: 'Music & Entertainment',
      text: 'Creating opportunities across music, live entertainment, production, distribution and global partnerships.',
      icon: 'ri-music-2-line',
      card: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
    },
    {
      title: 'Film & Television',
      text: "Connecting filmmakers, producers, studios, platforms and investors to develop Africa's screen industries.",
      icon: 'ri-movie-2-line',
      card: 'bg-gradient-to-br from-red-50 to-red-100',
      iconBg: 'bg-red-500',
    },
    {
      title: 'Fashion & Design',
      text: 'Supporting African designers, brands and creative entrepreneurs as they expand into regional and international markets.',
      icon: 'ri-t-shirt-line',
      card: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconBg: 'bg-orange-500',
    },
    {
      title: 'Digital Content & Creator Economy',
      text: 'Connecting creators, platforms, brands and technology companies shaping the next generation of African media.',
      icon: 'ri-live-line',
      card: 'bg-gradient-to-br from-teal-50 to-teal-100',
      iconBg: 'bg-teal-500',
    },
    {
      title: 'Cultural Diplomacy',
      text: "Using culture, sport and creativity to strengthen international relationships and Africa's global presence.",
      icon: 'ri-earth-line',
      card: 'bg-gradient-to-br from-green-50 to-green-100',
      iconBg: 'bg-green-500',
    },
    {
      title: 'Tourism & Destination Branding',
      text: 'Connecting creative industries, sports and cultural assets with tourism, investment and national branding.',
      icon: 'ri-map-pin-line',
      card: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
    },
    {
      title: 'Intellectual Property',
      text: 'Promoting stronger commercial opportunities around African creativity, content, brands and intellectual property.',
      icon: 'ri-copyright-line',
      card: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
    },
  ];

  const whoShouldJoin = [
    {
      title: 'Athletes & Sports Leaders',
      text: 'Professional athletes, sports executives, club owners, federations and sports entrepreneurs.',
      icon: 'ri-medal-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Artists & Musicians',
      text: 'Artists, musicians, performers and entertainment professionals.',
      icon: 'ri-mic-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Filmmakers & Producers',
      text: 'Directors, producers, actors, studios and film industry executives.',
      icon: 'ri-clapperboard-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Fashion & Design Leaders',
      text: 'Designers, fashion houses, creative directors and industry entrepreneurs.',
      icon: 'ri-scissors-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Creative Entrepreneurs',
      text: "Founders building businesses across Africa's creative economy.",
      icon: 'ri-lightbulb-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Agents & Managers',
      text: 'Professionals representing and developing talent.',
      icon: 'ri-user-star-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Investors & Brands',
      text: 'Investors, sponsors and corporations seeking opportunities across sports and creative industries.',
      icon: 'ri-funds-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Cultural Institutions',
      text: 'Organizations promoting African culture, heritage and international cultural exchange.',
      icon: 'ri-bank-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
  ];

  const memberGains = [
    {
      title: 'Access',
      text: 'Engage with investors, governments, CEOs, brands, institutions and strategic partners.',
      icon: 'ri-key-2-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Capital',
      text: 'Connect relevant creative and sports ventures with investors, sponsors and financing opportunities.',
      icon: 'ri-funds-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Partnerships',
      text: 'Develop relationships with brands, media companies, technology platforms, institutions and international partners.',
      icon: 'ri-handshake-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Visibility',
      text: 'Position your talent, organization, brand or project within a high-level African and international ecosystem.',
      icon: 'ri-megaphone-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Opportunities',
      text: 'Discover commercial, sponsorship, investment, licensing and collaboration opportunities.',
      icon: 'ri-compass-3-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Market Access',
      text: 'Build relationships that can support expansion across African and international markets.',
      icon: 'ri-store-2-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Influence',
      text: "Participate in conversations shaping the future of Africa's creative economy, sports industry and cultural diplomacy.",
      icon: 'ri-chat-voice-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  const membershipBenefits = [
    'Africa Creative & Sports Forum Membership',
    'Official Access to the Africa Economic Forum',
    'Creative & Sports Leadership Sessions',
    'Sports Business & Investment Roundtables',
    'Creative Economy Roundtables',
    'Access to the AEF Member Network',
    'Access to Selected AEF Deal Room Opportunities',
    'Investor & Brand Matchmaking',
    'Strategic Partnership Opportunities',
    'Invitations to Leadership Dinners & Private Receptions',
    'Opportunities for Sponsorship & Commercial Partnerships',
    'Visibility Across Selected AEF Platforms',
    'Cultural Diplomacy & International Engagement Opportunities',
    'Year-Round Community Engagement',
    'Curated Introductions to Relevant Investors, Brands & Institutions',
  ];

  const membershipIncludes = [
    'Africa Creative & Sports Forum Membership',
    'Africa Economic Forum Delegate Pass',
    'Creative & Sports Leadership Sessions',
    'Investor & Brand Networking',
    'Selected AEF Deal Room Access',
    'Strategic Partnership Opportunities',
    'Member Network Access',
    'Year-Round Community Engagement',
    'Participation in Selected AEF Initiatives',
  ];

  const futureBrands = [
    'The athletes who become global brands.',
    'The artists who build international businesses.',
    'The filmmakers who tell African stories to the world.',
    'The designers who create globally recognized brands.',
    'The entrepreneurs who turn creativity into scalable companies.',
  ];

  const closingLines = [
    'Talent Creates Influence.',
    'Influence Creates Opportunity.',
    'Opportunity Creates Industries.',
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://readdy.ai/api/search-image?query=Artists%20and%20athletes%20collaboration%2C%20creative%20professionals%2C%20performance%20stage%2C%20cultural%20diversity%2C%20arts%20and%20sports%20event&width=1200&height=400&seq=aa-hero&orientation=landscape')`
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-6">Africa Creative & Sports Forum</h1>
            <p className="text-2xl font-semibold mb-4 leading-snug">
              Where Africa's Influence Becomes an Industry
            </p>
            <p className="text-xl mb-8 leading-relaxed">
              Africa does not only produce resources. It produces talent, culture, creativity and influence.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap cursor-pointer"
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
            <div className="space-y-6 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                From athletes competing on the world's biggest stages to artists, musicians, filmmakers, designers and creators reaching global audiences, Africa's cultural influence is expanding far beyond its borders.
              </p>
            </div>
            <div className="space-y-2 mb-8">
              {influenceLines.map((line) => (
                <p key={line} className="text-lg font-semibold text-gray-900">{line}</p>
              ))}
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                And culture increasingly shapes how Africa is understood by the world.
              </p>
              <p className="text-xl font-semibold text-purple-700 leading-relaxed">
                The Africa Creative & Sports Forum was created for the leaders building these industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Creative, Sports & Cultural Leadership Community of the Africa Economic Forum</h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                The Africa Creative & Sports Forum is the creative industries, sports and cultural leadership community within the Africa Economic Forum.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                It brings together athletes, artists, musicians, actors, filmmakers, producers, fashion leaders, sports executives, club owners, federations, entertainment companies, creative entrepreneurs, agents, investors and cultural institutions.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The Forum connects these leaders with governments, investors, corporations, brands and international partners.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Because creativity is no longer only cultural.
              </p>
              <p className="text-2xl font-bold text-purple-700">
                It is economic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why the Forum */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why the Africa Creative & Sports Forum?</h2>
            <div className="space-y-6 text-center mb-10">
              <p className="text-lg text-gray-700 leading-relaxed">
                Africa's creative and sports industries represent significant opportunities for entrepreneurship, employment, investment, tourism and international visibility.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                But talent alone does not build an industry.
              </p>
              <p className="text-lg font-semibold text-gray-900">
                Industries require:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {industryNeeds.map((item) => (
                <div key={item} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-check-double-line text-xl text-purple-600"></i>
                  </div>
                  <p className="font-semibold text-gray-900">{item}</p>
                </div>
              ))}
            </div>

            <p className="text-lg text-gray-700 text-center mb-8 leading-relaxed">
              The Africa Creative & Sports Forum brings the people who control these elements into the same ecosystem.
            </p>
            <div className="space-y-2 text-center">
              {meetingLines.map((line) => (
                <p key={line} className="text-xl font-semibold text-purple-700">{line}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Building Africa's Creative Economy */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Building Africa's Creative Economy</h2>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              The Forum focuses on the sectors transforming Africa's cultural and commercial landscape.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectors.map((sector) => (
                <div key={sector.title} className={`${sector.card} p-6 rounded-lg`}>
                  <div className={`w-12 h-12 ${sector.iconBg} rounded-lg flex items-center justify-center mb-4`}>
                    <i className={`${sector.icon} text-xl text-white`}></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{sector.title}</h3>
                  <p className="text-gray-600">{sector.text}</p>
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whoShouldJoin.map((item) => (
                <div key={item.title} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className={`w-14 h-14 ${item.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${item.icon} text-2xl ${item.iconColor}`}></i>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.text}</p>
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
      <section className="py-16 bg-purple-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Membership Benefits</h2>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {membershipBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start space-x-3 text-purple-50">
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
                The Africa Creative & Sports Forum is a curated community within the Africa Economic Forum.
              </p>
              <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                Membership is granted through application and approval.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The objective is to bring together established and emerging leaders with the credibility, ambition and capacity to contribute to the development of Africa's creative and sports industries.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                This is not simply a community for talent.
              </p>
              <p className="text-xl font-semibold text-purple-700 leading-relaxed">
                It is a platform connecting talent, capital, brands, institutions and markets.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-left">
              <div className="text-center mb-8">
                <p className="text-sm font-semibold tracking-widest text-purple-600 mb-2">ANNUAL MEMBERSHIP</p>
                <p className="text-3xl font-bold text-gray-900">USD [X,XXX]</p>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Membership includes:</h3>
              <ul className="grid md:grid-cols-2 gap-3 mb-6">
                {membershipIncludes.map((item) => (
                  <li key={item} className="flex items-start space-x-3 text-gray-700">
                    <i className="ri-check-line text-xl text-purple-600 flex-shrink-0"></i>
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

      {/* Africa Has the Talent */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Africa Has the Talent.</h2>
            <h2 className="text-3xl font-bold text-purple-700 mb-8">Now the Opportunity Is to Build the Industries Around It.</h2>
            <div className="space-y-6 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                The next generation of African global brands will not come only from finance, technology or natural resources.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                They will also come from music, sport, film, fashion, entertainment, design and digital creativity.
              </p>
            </div>
            <div className="space-y-2 mb-8">
              {futureBrands.map((line) => (
                <p key={line} className="text-lg font-semibold text-gray-900">{line}</p>
              ))}
            </div>
            <p className="text-xl font-semibold text-purple-700 leading-relaxed">
              The Africa Creative & Sports Forum exists to connect these leaders with the capital, partnerships and markets that can accelerate that journey.
            </p>
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
            <p className="text-xl text-gray-200 mb-2">Welcome to the Africa Creative & Sports Forum.</p>
            <p className="text-gray-400">The Creative, Sports & Cultural Leadership Community of the Africa Economic Forum.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Apply for Membership</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join a trusted community of creative, sports and cultural leaders building the industries shaping Africa's global influence.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap cursor-pointer"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-medium whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={switchToCreateAccount}
                    className="text-purple-600 hover:underline cursor-pointer"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="Create a password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 font-medium whitespace-nowrap cursor-pointer"
                >
                  Create Account
                </button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={switchToSignIn}
                    className="text-purple-600 hover:underline cursor-pointer"
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
                <h3 className="text-2xl font-bold text-gray-900">Artists & Athletes Application</h3>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discipline/Specialty *
                  </label>
                  <input
                    type="text"
                    name="discipline"
                    value={formData.discipline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Jazz Music, Figure Skating, Digital Art"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 10+ years"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Achievements *
                  </label>
                  <textarea
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Awards, recognitions, notable performances..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Impact Work *
                  </label>
                  <textarea
                    name="socialImpact"
                    value={formData.socialImpact}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe any social impact or community initiatives..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Areas of Interest (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                    {interestOptions.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          name="interests"
                          value={option}
                          checked={formData.interests.includes(option)}
                          onChange={handleInputChange}
                          className="mr-3 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="What are your collaboration and partnership goals?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio/Website URL
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://yourportfolio.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Media Handles
                  </label>
                  <input
                    type="text"
                    name="socialMedia"
                    value={formData.socialMedia}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="@instagram @twitter @tiktok etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability *
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Availability</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Project-based">Project-based</option>
                    <option value="Event collaboration">Event collaboration</option>
                    <option value="Occasional">Occasional</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="mr-3 text-purple-600 focus:ring-purple-500"
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
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap cursor-pointer"
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

export default ArtistsAthletesPage;
