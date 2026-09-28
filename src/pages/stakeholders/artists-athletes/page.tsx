'use client';

import React, { useState, useEffect } from 'react';

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
    console.log('Artists & Athletes Network application submitted:', formData);
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
  };

  const featuredMembers = [
    {
      name: 'Kwesi Mensah',
      title: 'Contemporary Artist',
      discipline: 'Visual Arts',
      achievement: 'International Exhibition Winner',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20artist%2C%20confident%20expression%2C%20art%20studio%20background%2C%20creative%20professional%2C%20African%20artist%20portrait&width=300&height=300&seq=aa1&orientation=squarish',
    },
    {
      name: 'Amara Okonkwo',
      title: 'Professional Footballer',
      discipline: 'Sports',
      achievement: 'National Team Captain',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20athlete%2C%20confident%20smile%2C%20sports%20setting%2C%20African%20sportswoman%2C%20team%20captain%20portrait&width=300&height=300&seq=aa2&orientation=squarish',
    },
    {
      name: 'Jamal Ahmed',
      title: 'Hip-Hop Producer',
      discipline: 'Music',
      achievement: 'Grammy-Nominated Artist',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20music%20producer%2C%20confident%20expression%2C%20recording%20studio%20background%2C%20African%20musician%20artist&width=300&height=300&seq=aa3&orientation=squarish',
    },
    {
      name: 'Zara Konaté',
      title: 'Contemporary Dancer',
      discipline: 'Dance',
      achievement: 'International Dance Festival Winner',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20dancer%2C%20confident%20expression%2C%20dance%20studio%20background%2C%20contemporary%20dancer%20African%20woman&width=300&height=300&seq=aa4&orientation=squarish',
    },
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
        className="relative h-96 bg-cover bg-center bg-no-repeat flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://readdy.ai/api/search-image?query=Artists%20and%20athletes%20collaboration%2C%20creative%20professionals%2C%20performance%20stage%2C%20cultural%20diversity%2C%20arts%20and%20sports%20event&width=1200&height=400&seq=aa-hero&orientation=landscape')`
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-6">Artists & Athletes Network</h1>
            <p className="text-xl mb-8 leading-relaxed">
              Bringing together creative talents and sports champions to amplify their voice, expand their impact, and create meaningful partnerships for social and economic change.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Join Our Network
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Empowering Creative and Athletic Excellence</h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              The AEF Artists & Athletes Network celebrates and amplifies the voices of artists, performers, and athletes who are creating cultural impact 
              and driving social change. We provide platforms, partnerships, and opportunities to expand their reach and influence globally.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-creativity-line text-2xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Creative Expression</h3>
                <p className="text-gray-600">
                  Celebrate and amplify diverse artistic voices and athletic excellence.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-global-line text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Platform</h3>
                <p className="text-gray-600">
                  Reach international audiences and expand your global influence.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-lightbulb-line text-2xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Social Impact</h3>
                <p className="text-gray-600">
                  Drive meaningful change through your art and athletic achievements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs & Initiatives */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Programs & Initiatives</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-stage-line text-xl text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Performance Showcase</h3>
                <p className="text-gray-600 mb-4">International stages and platforms to showcase your talent.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Festival participation</li>
                  <li>• Concert tours</li>
                  <li>• Exhibition opportunities</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-briefcase-line text-xl text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Sponsorship & Partnerships</h3>
                <p className="text-gray-600 mb-4">Connect with sponsors, brands, and strategic partners.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Sponsorship opportunities</li>
                  <li>• Brand partnerships</li>
                  <li>• Endorsement deals</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-team-line text-xl text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Collaborative Projects</h3>
                <p className="text-gray-600 mb-4">Create impactful projects with fellow artists and athletes.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Joint ventures</li>
                  <li>• Cross-genre projects</li>
                  <li>• Community initiatives</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-hearts-line text-xl text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Social Impact Programs</h3>
                <p className="text-gray-600 mb-4">Use your platform for positive social and environmental change.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Advocacy campaigns</li>
                  <li>• Community outreach</li>
                  <li>• Cause marketing</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-graduation-cap-line text-xl text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Mentorship & Training</h3>
                <p className="text-gray-600 mb-4">Develop skills and get guidance from industry experts.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Masterclasses</li>
                  <li>• One-on-one coaching</li>
                  <li>• Skill development</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-money-dollar-circle-line text-xl text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Monetization Support</h3>
                <p className="text-gray-600 mb-4">Build sustainable income from your creative and athletic work.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Revenue strategies</li>
                  <li>• Licensing support</li>
                  <li>• Business consulting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Members */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Members</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{member.title}</p>
                    <p className="text-sm text-purple-600 mb-3">{member.discipline}</p>
                    <div className="flex items-center text-sm text-green-600">
                      <i className="ri-award-line mr-2"></i>
                      {member.achievement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Focus Areas */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Impact Focus Areas</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-earth-line text-2xl text-purple-600"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Environmental Sustainability</h3>
                <p className="text-sm text-gray-600">Using art and athletics to advocate for climate action and environmental conservation.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-team-line text-2xl text-blue-600"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Social Inclusion</h3>
                <p className="text-sm text-gray-600">Promoting diversity, equality, and social inclusion through creative expression.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-graduation-cap-line text-2xl text-green-600"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Youth Empowerment</h3>
                <p className="text-sm text-gray-600">Mentoring and inspiring young talent to reach their potential.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-hearts-line text-2xl text-orange-600"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Health & Wellness</h3>
                <p className="text-sm text-gray-600">Promoting physical and mental well-being through sports and creative arts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-purple-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Network Impact</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-purple-100 mb-2">1200+</div>
                <p className="text-purple-100">Network Members</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-100 mb-2">95+</div>
                <p className="text-purple-100">Countries Represented</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-100 mb-2">300+</div>
                <p className="text-purple-100">Projects Supported</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-100 mb-2">2M+</div>
                <p className="text-purple-100">Lives Impacted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join the Network</h2>
            <p className="text-xl text-gray-600 mb-8">
              Connect with fellow creative talents and athletes, amplify your voice, and create lasting impact on the world stage.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Join Our Network
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

export default ArtistsAthletesPage;
