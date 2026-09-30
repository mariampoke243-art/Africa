'use client';

import React, { useState, useEffect } from 'react';

const YouthPage: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    education: '',
    institution: '',
    fieldOfStudy: '',
    interests: [] as string[],
    experience: '',
    goals: '',
    skills: [] as string[],
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

  const educationLevels = [
    'High School',
    'Associate Degree',
    'Bachelor Degree',
    'Master Degree',
    'PhD/Doctoral',
    'Technical/Vocational',
    'Other'
  ];

  const skillOptions = [
    'Communication',
    'Leadership',
    'Problem-Solving',
    'Digital Marketing',
    'Web Development',
    'Data Analysis',
    'Project Management',
    'Entrepreneurship',
    'Social Media',
    'Content Creation',
    'Design',
    'Public Speaking'
  ];

  const interestOptions = [
    'Tech & Innovation',
    'Business & Entrepreneurship',
    'Social Impact',
    'Environmental Sustainability',
    'Education & Skills',
    'Finance & Economics',
    'Leadership Development',
    'Community Service',
    'Creative Arts',
    'Sports & Wellness',
    'Media & Communication',
    'Policy & Advocacy'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'termsAccepted') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else {
        const arrayField = name as 'interests' | 'skills';
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
    console.log('Youth Network application submitted:', formData);
    alert('Application submitted successfully! Welcome to the AEF Youth Network!');
    setIsFormOpen(false);
    setFormData({
      fullName: '',
      age: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      education: '',
      institution: '',
      fieldOfStudy: '',
      interests: [],
      experience: '',
      goals: '',
      skills: [],
      availability: '',
      termsAccepted: false,
    });
  };

  const accessItems = [
    'Access to knowledge.',
    'Access to capital.',
    'Access to mentors.',
    'Access to markets.',
    'Access to technology.',
    'Access to decision-makers.',
  ];

  const focusAreas = [
    {
      title: 'Entrepreneurship & Startups',
      text: 'Connecting young founders with investors, mentors, corporations and strategic partners.',
      icon: 'ri-rocket-line',
      card: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconBg: 'bg-orange-500',
    },
    {
      title: 'Technology & Innovation',
      text: 'Exploring how AI, digital platforms, fintech, biotechnology and emerging technologies can transform African economies.',
      icon: 'ri-cpu-line',
      card: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
    },
    {
      title: 'Skills & Future of Work',
      text: 'Preparing young professionals for industries and opportunities emerging across Africa and globally.',
      icon: 'ri-graduation-cap-line',
      card: 'bg-gradient-to-br from-green-50 to-green-100',
      iconBg: 'bg-green-500',
    },
    {
      title: 'Investment & Access to Capital',
      text: 'Creating pathways between promising young businesses and investors, financial institutions and development partners.',
      icon: 'ri-funds-line',
      card: 'bg-gradient-to-br from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500',
    },
    {
      title: 'Leadership & Public Service',
      text: 'Developing a generation capable of contributing to government, business and society.',
      icon: 'ri-government-line',
      card: 'bg-gradient-to-br from-red-50 to-red-100',
      iconBg: 'bg-red-500',
    },
    {
      title: 'Creativity & Digital Economy',
      text: 'Supporting young creators, designers, developers, filmmakers, musicians and digital entrepreneurs.',
      icon: 'ri-palette-line',
      card: 'bg-gradient-to-br from-teal-50 to-teal-100',
      iconBg: 'bg-teal-500',
    },
    {
      title: 'Regional & Global Opportunities',
      text: 'Connecting young Africans across borders and creating opportunities for collaboration beyond national markets.',
      icon: 'ri-earth-line',
      card: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconBg: 'bg-orange-500',
    },
  ];

  const whoShouldJoin = [
    {
      title: 'Young Entrepreneurs',
      text: 'Founders building companies and solving real-world problems.',
      icon: 'ri-briefcase-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Innovators & Technology Leaders',
      text: 'Young people developing products, technologies and new business models.',
      icon: 'ri-lightbulb-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Young Professionals',
      text: 'Emerging leaders building careers across business, government, finance and international organizations.',
      icon: 'ri-user-star-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Students & Researchers',
      text: 'Students, academics and researchers contributing new ideas and knowledge.',
      icon: 'ri-book-open-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Startup Founders',
      text: 'Entrepreneurs seeking capital, partnerships, visibility and market access.',
      icon: 'ri-rocket-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Young Creatives',
      text: "Artists, designers, filmmakers, musicians, creators and digital entrepreneurs shaping Africa's cultural economy.",
      icon: 'ri-palette-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
    {
      title: 'Emerging Public Leaders',
      text: 'Young people contributing to policy, governance, diplomacy and development.',
      icon: 'ri-government-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
  ];

  const memberGains = [
    {
      title: 'Access',
      text: 'Engage directly with CEOs, investors, government leaders and established African and global decision-makers.',
      icon: 'ri-key-2-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Mentorship',
      text: 'Build relationships with experienced leaders who can provide perspective, guidance and connections.',
      icon: 'ri-user-voice-line',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Opportunity',
      text: 'Discover investment, employment, entrepreneurship, partnership and learning opportunities.',
      icon: 'ri-compass-3-line',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Visibility',
      text: 'Showcase your ideas, company, research, projects or achievements through the AEF ecosystem.',
      icon: 'ri-megaphone-line',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Network',
      text: 'Connect with ambitious young leaders from across Africa and beyond.',
      icon: 'ri-team-line',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Influence',
      text: 'Contribute to conversations about the economic and social issues that will define your generation.',
      icon: 'ri-chat-voice-line',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
    },
  ];

  const membershipBenefits = [
    'Africa Youth Forum Membership',
    'Official Access to the Africa Economic Forum',
    'Youth Leadership Sessions',
    'Entrepreneurship & Innovation Roundtables',
    'Access to the AEF Member Network',
    'Young Founder & Investor Networking',
    'Mentorship Opportunities',
    'Access to Selected AEF Deal Room Opportunities',
    'Access to Youth-Focused Opportunities & Initiatives',
    'Participation in Leadership & Skills Sessions',
    'Visibility Across AEF Platforms',
    'Year-Round Community Engagement',
    'Opportunities to Engage with Senior Decision-Makers',
  ];

  const membershipIncludes = [
    'Africa Youth Forum Membership',
    'Africa Economic Forum Delegate Access',
    'Youth Leadership Sessions',
    'Networking Opportunities',
    'Mentorship Opportunities',
    'Access to the AEF Member Network',
    'Year-Round Community Engagement',
    'Participation in Selected AEF Initiatives',
  ];

  const closingLines = [
    'The decisions being made today will define the Africa you will live and work in tomorrow.',
    "The businesses being built today will create tomorrow's industries.",
    "The technologies being developed today will transform tomorrow's economies.",
    "The leaders emerging today will shape tomorrow's institutions.",
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://readdy.ai/api/search-image?query=Young%20people%20diverse%20leaders%20collaboration%2C%20youth%20empowerment%2C%20bright%20ambitious%20generation%2C%20millennial%20conference%2C%20next%20generation%20leaders&width=1200&height=400&seq=youth-hero&orientation=landscape')`
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-6">Africa Youth Forum</h1>
            <p className="text-2xl font-semibold mb-4 leading-snug">
              Where Africa's Next Generation Meets Opportunity
            </p>
            <p className="text-xl mb-8 leading-relaxed">
              Africa is the world's youngest continent. Africa's youth are not waiting for the future. They are building it now.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors whitespace-nowrap cursor-pointer"
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
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Its future will be shaped by a generation that is already building businesses, creating technologies, transforming industries, producing culture and solving problems in ways that challenge the old models of development.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              The Africa Youth Forum was created to connect that generation to the people, institutions, capital and opportunities that can help turn ambition into impact.
            </p>
          </div>
        </div>
      </section>

      {/* Future Leaders Community */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Future Leaders Community of the Africa Economic Forum</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The Africa Youth Forum is the youth leadership community of the Africa Economic Forum.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              It brings together young entrepreneurs, innovators, founders, professionals, researchers, students, creatives and emerging leaders from Africa and around the world.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The Forum creates a space where the next generation can engage directly with investors, CEOs, governments, policymakers and established leaders.
            </p>
            <p className="text-xl font-semibold text-gray-900 leading-relaxed">
              Because young people should not only be invited to discuss Africa's future. They should have a seat at the table where it is being built.
            </p>
          </div>
        </div>
      </section>

      {/* Why the Africa Youth Forum */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why the Africa Youth Forum?</h2>
            <p className="text-lg text-gray-700 text-center mb-4 leading-relaxed">
              Africa's demographic transformation is creating a generation of young people with enormous potential.
            </p>
            <p className="text-lg font-semibold text-gray-900 text-center mb-10">
              But potential needs access.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {accessItems.map((item) => (
                <div key={item} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-key-2-line text-xl text-orange-600"></i>
                  </div>
                  <p className="font-semibold text-gray-900">{item}</p>
                </div>
              ))}
            </div>

            <p className="text-lg text-gray-700 text-center mb-4 leading-relaxed">
              The Africa Youth Forum brings these connections together.
            </p>
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              It is designed to move young people from participation to opportunity, from ideas to execution and from ambition to leadership.
            </p>
          </div>
        </div>
      </section>

      {/* From Potential to Possibility */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">From Potential to Possibility</h2>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              The Forum focuses on the opportunities and challenges that will define the next generation of African economies.
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
      <section className="py-16 bg-orange-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Membership Benefits</h2>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {membershipBenefits.map((benefit) => (
                <div key={benefit} className="flex items-start space-x-3 text-orange-50">
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
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The Africa Youth Forum is a community for ambitious young people who want to contribute to Africa's transformation and connect with the people and opportunities capable of accelerating their journey.
            </p>
            <p className="text-lg font-semibold text-gray-900 mb-6 leading-relaxed">
              Membership is granted through application and approval.
            </p>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              The Forum is designed to bring together people who are not simply looking for opportunities, but are building them.
            </p>

            <div className="bg-gray-50 p-8 rounded-lg text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Membership includes:</h3>
              <ul className="grid md:grid-cols-2 gap-3 mb-6">
                {membershipIncludes.map((item) => (
                  <li key={item} className="flex items-start space-x-3 text-gray-700">
                    <i className="ri-check-line text-xl text-orange-600 flex-shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600">
                Special student and emerging-leader access may be available subject to eligibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your Generation Will Inherit Africa */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Generation Will Inherit Africa.</h2>
            <p className="text-xl text-gray-700 mb-8">But you don't have to wait to shape it.</p>
            <div className="space-y-4 mb-8">
              {closingLines.map((line) => (
                <p key={line} className="text-lg text-gray-700 leading-relaxed">{line}</p>
              ))}
            </div>
            <p className="text-lg font-semibold text-gray-900 leading-relaxed">
              The Africa Youth Forum exists to give that generation a place in the conversation — and a pathway into the opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Don't Wait for a Seat at the Table.</h2>
            <h2 className="text-3xl font-bold text-orange-600 mb-6">Build the Table.</h2>
            <p className="text-xl text-gray-600 mb-2">Welcome to the Africa Youth Forum.</p>
            <p className="text-lg text-gray-600 mb-8">The Future Leaders Community of the Africa Economic Forum.</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors whitespace-nowrap cursor-pointer"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 font-medium whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={switchToCreateAccount}
                    className="text-orange-600 hover:underline cursor-pointer"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    placeholder="Create a password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 font-medium whitespace-nowrap cursor-pointer"
                >
                  Create Account
                </button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={switchToSignIn}
                    className="text-orange-600 hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Youth Network Application Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Youth Network Application</h3>
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age (16-30) *
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="16"
                      max="30"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Education Level *
                    </label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Education Level</option>
                      {educationLevels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution/School *
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field of Study *
                  </label>
                  <input
                    type="text"
                    name="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Computer Science, Business, Engineering"
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
                          className="mr-3 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Describe your work experience, internships, projects..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personal & Professional Goals *
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="What do you want to achieve? What impact do you want to create?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Key Skills (Select all that apply)
                  </label>
                  <div className="grid md:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                    {skillOptions.map((skill) => (
                      <label key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          name="skills"
                          value={skill}
                          checked={formData.skills.includes(skill)}
                          onChange={handleInputChange}
                          className="mr-3 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability for Network Activities *
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Availability</option>
                    <option value="Full-time student">Full-time student</option>
                    <option value="Working part-time">Working part-time</option>
                    <option value="Working full-time">Working full-time</option>
                    <option value="Flexible">Flexible schedule</option>
                    <option value="Limited availability">Limited availability</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="mr-3 text-orange-600 focus:ring-orange-500"
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
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors whitespace-nowrap cursor-pointer"
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

export default YouthPage;
