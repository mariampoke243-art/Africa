import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabase/client';

export default function Contact() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setIsProfileDropdownOpen(false);
  };

  const handleViewProfile = () => {
    navigate('/profile');
    setIsProfileDropdownOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSignIn = () => {
    setShowSignInModal(true);
    setShowCreateAccount(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.get('first_name') as string,
            'Last name': formData.get('last_name') as string,
            'Email Address': formData.get('email') as string,
            Organization: (formData.get('organization') as string) || null,
            'Phone Number': (formData.get('phone') as string) || null,
            Subject: formData.get('subject') as string,
            Message: formData.get('message') as string,
            Newsletters: formData.get('newsletter_consent') === 'yes',
          },
        ]);

      if (error) {
        throw error;
      }
      
      setFormSubmitted(true);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Erreur Supabase :', error);
      alert('Message failed to send. Please try again.');
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://readdy.ai/api/form/d3edvgd2v2m9odki5mlg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData as any).toString()
      });
      
      if (response.ok) {
        alert('Successfully subscribed to our newsletter!');
        (e.target as HTMLFormElement).reset();
      } else {
        alert('Subscription failed. Please try again.');
      }
    } catch (error) {
      alert('Subscription failed. Please try again.');
    }
  };

  const switchToCreateAccount = () => {
    setShowCreateAccount(true);
  };

  const switchToSignIn = () => {
    setShowCreateAccount(false);
  };

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      if (email && password) {
        alert('Sign in successful! Welcome back.');
        setShowSignInModal(false);
      } else {
        alert('Please fill in all required fields.');
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleCreateAccountSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
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
        alert('Account created successfully! Welcome to Africa Economic Forum.');
        setShowSignInModal(false);
        setShowCreateAccount(false);
      } else {
        alert('Please fill in all required fields.');
      }
    } catch (err) {
      console.error('Account creation error:', err);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="https://static.readdy.ai/image/433d1257c1dbc1f8bb2f3f1c418f6689/0727857f21d196505f8ef18cfc1cd897.png" 
                  alt="Africa Economic Forum" 
                  className="h-10 w-auto" 
                />
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                About
              </Link>
              <Link to="/initiatives" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Initiatives
              </Link>
              <Link to="/stakeholders" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Stakeholders
              </Link>
              <Link to="/agenda" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Agenda
              </Link>
              <Link to="/publications" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Publications
              </Link>
              <Link to="/meetings" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors">
                Meetings
              </Link>
              <Link to="/contact" className="text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-600">
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title={user.user_metadata?.full_name || user.email}
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {getInitials(user.user_metadata?.full_name || user.email?.charAt(0) || 'U')}
                      </div>
                    )}
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <div className="font-medium">{user.user_metadata?.full_name || 'User'}</div>
                        <div className="text-gray-500">{user.email}</div>
                      </div>
                      <button
                        onClick={handleViewProfile}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/signin"
                  className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </Link>
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

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                Home
              </Link>
              <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                About
              </Link>
              <Link to="/initiatives" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                Initiatives
              </Link>
              <Link to="/stakeholders" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                Stakeholders
              </Link>
              <Link to="/agenda" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                Agenda
              </Link>
              <Link to="/publications" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                Publications
              </Link>
              <Link to="/meetings" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md">
                Meetings
              </Link>
              <Link to="/contact" className="block px-3 py-2 text-base font-medium text-teal-600 bg-teal-50 rounded-md">
                Contact
              </Link>
              <div className="px-3 py-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      {user.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt="Profile"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-medium">
                            {getInitials(user.user_metadata?.full_name || user.email?.charAt(0) || 'U')}
                          </span>
                        </div>
                      )}
                      <span className="text-gray-700 font-medium">{user.user_metadata?.full_name || 'User'}</span>
                    </div>
                    <button 
                      onClick={() => {
                        handleViewProfile();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium text-center"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-medium whitespace-nowrap cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/signin"
                    className="w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer block text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section 
          className="relative py-32 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url('https://readdy.ai/api/search-image?query=Modern%20African%20business%20office%20with%20professional%20staff%20ready%20to%20assist%2C%20customer%20service%20representatives%20in%20contemporary%20workspace%20with%20communication%20technology&width=1920&height=800&seq=contact-hero&orientation=landscape')`
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">Get in touch with our team to learn more about our initiatives, partnerships, or how you can contribute to Africa's economic transformation.</p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">Send us a message</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Whether you're interested in partnership opportunities, have questions about our programs, 
                    or want to contribute to our mission, we'd love to hear from you.
                  </p>
                </div>
                
                {formSubmitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center">
                      <i className="ri-check-circle-fill text-green-600 text-2xl mr-3"></i>
                      <div>
                        <h3 className="text-lg font-semibold text-green-800">Message Sent Successfully!</h3>
                        <p className="text-green-700">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 text-green-600 hover:text-green-800 font-medium cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} id="contact-form" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <input 
                          type="text" 
                          name="first_name" 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <input 
                          type="text" 
                          name="last_name" 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                        <input 
                          type="text" 
                          name="organization" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                      <select 
                        name="subject" 
                        required 
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                      >
                        <option value="">Select a subject</option>
                        <option value="Partnership Inquiry">Partnership Inquiry</option>
                        <option value="Membership Information">Membership Information</option>
                        <option value="Event Registration">Event Registration</option>
                        <option value="Media Inquiry">Media Inquiry</option>
                        <option value="General Question">General Question</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea 
                        name="message" 
                        rows={6}
                        required
                        maxLength={500}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                        placeholder="Please provide details about your inquiry..."
                      ></textarea>
                      <div className="text-xs text-gray-500 mt-1">Maximum 500 characters</div>
                    </div>
                    <div>
                      <label className="flex items-start space-x-3">
                        <input 
                          type="checkbox" 
                          name="newsletter_consent" 
                          value="yes"
                          className="mt-1 cursor-pointer"
                        />
                        <span className="text-sm text-gray-600">
                          I would like to receive updates about Forum activities and events
                        </span>
                      </label>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-map-pin-line text-blue-600 text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Headquarters</h4>
                        <p className="text-gray-600">
                          Africa Economic Forum<br />
                          28, avenue Isiro Kinshasa-Gombe<br />
                          Belgian Embassy Building
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-phone-line text-blue-600 text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                        <p className="text-gray-600">+243 896 656 905</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-mail-line text-blue-600 text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                        <p className="text-gray-600">info@africaef.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="ri-time-line text-blue-600 text-xl"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Office Hours</h4>
                        <p className="text-gray-600">
                          Monday - Friday: 8:00 AM - 6:00 PM (SAST)<br />
                          Saturday: 9:00 AM - 1:00 PM (SAST)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regional Offices */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Regional Offices</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">West Africa Office</h4>
                      <p className="text-gray-600 text-sm">
                        Soon to be announced<br />
                        +243 896 656 905
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">East Africa Office</h4>
                      <p className="text-gray-600 text-sm">
                        Soon to be announced<br />
                        +243 896 656 905
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">North Africa Office</h4>
                      <p className="text-gray-600 text-sm">
                        Soon to be announced<br />
                        +243 896 656 905
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Us</h2>
              <p className="text-lg text-gray-600">Visit our headquarters in 28, avenue Isiro Kinshasa-Gombe Belgian Embassy Building</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.7729!2d28.0473!3d-26.2041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDEyJzE0LjgiUyAyOMKwMDInNTAuMyJF!5e0!3m2!1sen!2sza!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Africa Economic Forum Location"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">Stay Connected</h2>
                <p className="text-xl text-blue-100">
                  Subscribe to our newsletter for the latest updates on African economic development, 
                  upcoming events, and exclusive insights from our experts.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <i className="ri-facebook-fill text-xl"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <i className="ri-twitter-x-fill text-xl"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <i className="ri-linkedin-fill text-xl"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <i className="ri-instagram-fill text-xl"></i>
                  </a>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Newsletter Subscription</h3>
                <form onSubmit={handleNewsletterSubmit} id="newsletter-subscription" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">Email Address *</label>
                    <input 
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-blue-200 text-sm"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">Name</label>
                    <input 
                      type="text"
                      name="name"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-blue-200 text-sm"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-100 mb-2">Interests</label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" name="interests" value="Economic Policy" className="cursor-pointer" />
                        <span className="text-sm text-blue-100">Economic Policy</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" name="interests" value="Technology Innovation" className="cursor-pointer" />
                        <span className="text-sm text-blue-100">Technology Innovation</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" name="interests" value="Sustainable Development" className="cursor-pointer" />
                        <span className="text-sm text-blue-100">Sustainable Development</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" name="interests" value="Events & Meetings" className="cursor-pointer" />
                        <span className="text-sm text-blue-100">Events & Meetings</span>
                      </label>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-white text-blue-900 px-6 py-3 rounded-md hover:bg-gray-100 font-medium whitespace-nowrap cursor-pointer"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
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
                <li><Link to="/about" className="text-gray-300 hover:text-white cursor-pointer">Our mission</Link></li>
                <li><Link to="/framework" className="text-gray-300 hover:text-white cursor-pointer">Our Institutional Framework</Link></li>
                <li><Link to="/history" className="text-gray-300 hover:text-white cursor-pointer">History</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white cursor-pointer">Leadership and governance</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white cursor-pointer">Our Impact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">More from the Forum</h3>
              <ul className="space-y-3">
                <li><Link to="/initiatives" className="text-gray-300 hover:text-white cursor-pointer">Centres</Link></li>
                <li><Link to="/meetings" className="text-gray-300 hover:text-white cursor-pointer">Meetings</Link></li>
                <li><Link to="/stakeholders" className="text-gray-300 hover:text-white cursor-pointer">Stakeholders</Link></li>
                <li><Link to="/agenda" className="text-gray-300 hover:text-white cursor-pointer">Forum Stories</Link></li>
                <li><Link to="/publications" className="text-gray-300 hover:text-white cursor-pointer">Press releases</Link></li>
                <li><Link to="/gallery" className="text-gray-300 hover:text-white cursor-pointer">Photo gallery</Link></li>
                <li><Link to="/publications" className="text-gray-300 hover:text-white cursor-pointer">Podcasts</Link></li>
                <li><Link to="/publications" className="text-gray-300 hover:text-white cursor-pointer">Videos</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">Engage with us</h3>
              <ul className="space-y-3">
                <li>
                  {user ? (
                    <button onClick={signOut} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer">
                      Logout
                    </button>
                  ) : (
                    <Link to="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap cursor-pointer">
                      Sign in
                    </Link>
                  )}
                </li>
                <li><Link to="/partners" className="text-gray-300 hover:text-white cursor-pointer">Partner with us</Link></li>
                <li><Link to="/join" className="text-gray-300 hover:text-white cursor-pointer">Become a member</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white cursor-pointer">Sign up for our press releases</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white cursor-pointer">Subscribe to our newsletters</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white cursor-pointer">Contact us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">Quick links</h3>
              <ul className="space-y-3 mb-8">
                <li><Link to="/about" className="text-gray-300 hover:text-white cursor-pointer">Sustainability at the Forum</Link></li>
                <li><Link to="/careers" className="text-gray-300 hover:text-white cursor-pointer">Careers</Link></li>
              </ul>
              <div>
                <h4 className="font-semibold mb-4">Language editions</h4>
                <div className="flex space-x-2">
                  <Link to="/" className="text-gray-300 hover:text-white cursor-pointer">EN</Link>
                  <span className="text-gray-500">•</span>
                  <Link to="/" className="text-gray-300 hover:text-white cursor-pointer">ES</Link>
                  <span className="text-gray-500">•</span>
                  <Link to="/" className="text-gray-300 hover:text-white cursor-pointer">中文</Link>
                  <span className="text-gray-500">•</span>
                  <Link to="/" className="text-gray-300 hover:text-white cursor-pointer">日本語</Link>
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
                <Link to="/privacy" className="hover:text-white cursor-pointer">Privacy Policy &amp; Terms of Service</Link>
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
