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

  const youthLeaders = [
    {
      name: 'Kofi Mensah',
      age: 24,
      title: 'Tech Entrepreneur',
      achievement: 'Founded EdTech Startup',
      image: 'https://readdy.ai/api/search-image?query=Professional%20young%20African%20male%20entrepreneur%2C%20confident%20expression%2C%20tech%20startup%20environment%2C%20millennial%20business%20leader%2C%20modern%20office&width=300&height=300&seq=yl1&orientation=squarish',
    },
    {
      name: 'Amara Diop',
      age: 22,
      title: 'Climate Activist',
      achievement: 'Environmental Advocate',
      image: 'https://readdy.ai/api/search-image?query=Professional%20young%20African%20female%20activist%2C%20confident%20smile%2C%20environmental%20climate%20advocate%2C%20sustainability%20movement&width=300&height=300&seq=yl2&orientation=squarish',
    },
    {
      name: 'Jamal Hassan',
      age: 25,
      title: 'Social Impact Leader',
      achievement: 'Community Development Leader',
      image: 'https://readdy.ai/api/search-image?query=Professional%20young%20man%20African%20social%20impact%20leader%2C%20confident%20expression%2C%20community%20development%20environment%2C%20youth%20empowerment&width=300&height=300&seq=yl3&orientation=squarish',
    },
    {
      name: 'Zara Okafor',
      age: 23,
      title: 'Digital Innovator',
      achievement: 'App Developer & Innovator',
      image: 'https://readdy.ai/api/search-image?query=Professional%20young%20African%20female%20app%20developer%2C%20confident%20smile%2C%20tech%20innovation%20environment%2C%20digital%20solutions%20creator&width=300&height=300&seq=yl4&orientation=squarish',
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://readdy.ai/api/search-image?query=Young%20people%20diverse%20leaders%20collaboration%2C%20youth%20empowerment%2C%20bright%20ambitious%20generation%2C%20millennial%20conference%2C%20next%20generation%20leaders&width=1200&height=400&seq=youth-hero&orientation=landscape')`
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl font-bold mb-6">AEF Youth Network</h1>
            <p className="text-xl mb-8 leading-relaxed">
              Empower the next generation of leaders, innovators, and changemakers. Connect with ambitious young people transforming Africa and the world.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Join the Movement
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Empowering Youth Leadership</h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
              The AEF Youth Network is dedicated to empowering young people with the knowledge, skills, and connections they need to become leaders and change-makers. 
              We provide mentorship, opportunities, and a community of support to help young people build successful careers and create positive impact.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-lightbulb-line text-2xl text-orange-600"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-gray-600">
                  Create and innovate solutions that address Africa's most pressing challenges.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-team-line text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-gray-600">
                  Build meaningful connections with peers who share your vision and values.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-graduation-cap-line text-2xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">Growth</h3>
                <p className="text-gray-600">
                  Develop skills and knowledge to advance your career and leadership journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs & Opportunities */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Programs & Opportunities</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-briefcase-line text-xl text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Internship & Job Placement</h3>
                <p className="text-gray-600 mb-4">Access to exclusive internships and career opportunities with leading organizations.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Job board access</li>
                  <li>• Internship placements</li>
                  <li>• Career development</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-graduation-cap-line text-xl text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Skill Development</h3>
                <p className="text-gray-600 mb-4">Build in-demand skills through workshops and training programs.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Online courses</li>
                  <li>• Workshops</li>
                  <li>• Certifications</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-user-voice-line text-xl text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Mentorship</h3>
                <p className="text-gray-600 mb-4">Get guidance from successful mentors and industry leaders.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• One-on-one mentoring</li>
                  <li>• Expert guidance</li>
                  <li>• Career coaching</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-lightbulb-line text-xl text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Startup Support</h3>
                <p className="text-gray-600 mb-4">Guidance and resources for young entrepreneurs launching ventures.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Business mentoring</li>
                  <li>• Funding access</li>
                  <li>• Pitch opportunities</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-hearts-line text-xl text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Social Impact Projects</h3>
                <p className="text-gray-600 mb-4">Collaborate on projects creating positive community and environmental change.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Impact projects</li>
                  <li>• Volunteering</li>
                  <li>• Social enterprises</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-calendar-event-line text-xl text-white"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Networking Events</h3>
                <p className="text-gray-600 mb-4">Meet fellow youth leaders and professionals at exclusive events.</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Youth summits</li>
                  <li>• Conferences</li>
                  <li>• Meetups</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Youth Leaders */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Youth Leaders</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {youthLeaders.map((leader, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-1">{leader.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">Age {leader.age}</p>
                    <p className="text-sm text-gray-600 mb-2">{leader.title}</p>
                    <div className="flex items-center text-sm text-orange-600">
                      <i className="ri-star-line mr-2"></i>
                      {leader.achievement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Network Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Network Benefits</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-team-line text-xl text-orange-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Global Network</h3>
                  <p className="text-gray-600">Connect with ambitious youth leaders from around the world.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-graduation-cap-line text-xl text-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Learning Resources</h3>
                  <p className="text-gray-600">Access exclusive courses, workshops, and educational content.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-briefcase-line text-xl text-green-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Career Opportunities</h3>
                  <p className="text-gray-600">Discover internships, jobs, and professional development opportunities.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-lightbulb-line text-xl text-purple-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Innovation Hub</h3>
                  <p className="text-gray-600">Collaborate on innovative projects and startup ideas.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-megaphone-line text-xl text-red-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Amplify Your Voice</h3>
                  <p className="text-gray-600">Share your ideas and be heard by a global audience.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-check-line text-xl text-teal-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Exclusive Access</h3>
                  <p className="text-gray-600">Get priority access to events, resources, and opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-orange-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Network Impact</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold text-orange-100 mb-2">2500+</div>
                <p className="text-orange-100">Youth Members</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-100 mb-2">85+</div>
                <p className="text-orange-100">Countries Represented</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-100 mb-2">150+</div>
                <p className="text-orange-100">Partner Organizations</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-100 mb-2">500K+</div>
                <p className="text-orange-100">Lives Impacted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Join the Youth Movement</h2>
            <p className="text-xl text-gray-600 mb-8">
              Take your place among Africa's most ambitious and innovative young leaders. Together, we're building a future of opportunity and impact.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Join Youth Network
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

export default YouthPage;
