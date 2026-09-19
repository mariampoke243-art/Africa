import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../supabase/client';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { user, signOut } = useAuth();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  // =========================
  // SIGN OUT
  // =========================

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsProfileDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      alert('Unable to sign out. Please try again.');
    }
  };

  // =========================
  // PROFILE
  // =========================

  const handleViewProfile = () => {
    setIsProfileDropdownOpen(false);
    navigate(`/${i18n.language}/profile`);
  };

  const getInitials = () => {
    if (!user) return 'U';

    const metadata = user.user_metadata || {};

    const firstName =
      metadata.first_name ||
      metadata.full_name?.split(' ')[0] ||
      '';

    const lastName =
      metadata.last_name ||
      metadata.full_name?.split(' ').slice(1).join(' ') ||
      '';

    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }

    if (firstName) {
      return firstName.substring(0, 2).toUpperCase();
    }

    return user.email?.substring(0, 2).toUpperCase() || 'U';
  };

  // =========================
  // OPEN SIGN IN
  // =========================

  const handleSignIn = () => {
    setShowCreateAccount(false);
    setShowSignInModal(true);
  };

  // =========================
  // OPEN CREATE ACCOUNT
  // =========================

  const handleOpenCreateAccount = () => {
    setShowSignInModal(false);
    setShowCreateAccount(true);
  };

  // =========================
  // MOBILE MENU
  // =========================

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // =========================
  // CONTACT FORM
  // =========================

  const handleContactSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const name = (formData.get('name') as string)?.trim();
      const lastName = (formData.get('Last name') as string)?.trim();
      const email = (formData.get('Email Address') as string)?.trim();
      const organization =
        (formData.get('Organization') as string)?.trim() || '';
      const phone =
        (formData.get('Phone Number') as string)?.trim() || '';
      const subject =
        (formData.get('Subject') as string)?.trim() || '';
      const message =
        (formData.get('Message') as string)?.trim() || '';

      const newsletter =
        formData.get('Newsletters') !== null;

      if (!name || !lastName || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name,
            'Last name': lastName,
            'Email Address': email,
            Organization: organization,
            'Phone Number': phone,
            Subject: subject,
            Message: message,
            Newsletters: newsletter,
          },
        ]);

      if (error) {
        console.error('Contact form error:', error);
        alert(
          `Unable to send your message: ${error.message}`
        );
        return;
      }

      setFormSubmitted(true);

      e.currentTarget.reset();
    } catch (error: unknown) {
      console.error('Unexpected contact form error:', error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';

      alert(`${errorMessage} Please try again later.`);
    }
  };

  // =========================
  // NEWSLETTER
  // =========================

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const email = (
        formData.get('email') as string
      )?.trim();

      if (!email) {
        alert('Please enter your email address.');
        return;
      }

      const response = await fetch(
        'https://readdy.ai/api/form/d3edvgd2v2m9odki5mlg',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Newsletter subscription failed.');
      }

      alert(
        'Thank you! You have successfully subscribed to our newsletter.'
      );

      e.currentTarget.reset();
    } catch (error) {
      console.error('Newsletter error:', error);
      alert(
        'Unable to subscribe at the moment. Please try again later.'
      );
    }
  };

  // =========================
  // REAL SUPABASE SIGN IN
  // =========================

  const handleSignInSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const email = (
        formData.get('email') as string
      )?.trim();

      const password =
        formData.get('password') as string;

      if (!email || !password) {
        alert('Please fill in all required fields.');
        return;
      }

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        console.error(
          'Supabase sign-in error:',
          error
        );

        const errorMessage =
          error.message.toLowerCase();

        if (
          errorMessage.includes(
            'invalid login credentials'
          )
        ) {
          alert(
            'Invalid email or password. Please try again.'
          );
        } else if (
          errorMessage.includes(
            'email not confirmed'
          )
        ) {
          alert(
            'Please confirm your email address before signing in.'
          );
        } else {
          alert(
            `Sign in failed: ${error.message}`
          );
        }

        return;
      }

      alert(
        'Sign in successful! Welcome back.'
      );

      setShowSignInModal(false);
      setShowCreateAccount(false);
    } catch (error: unknown) {
      console.error(
        'Unexpected sign-in error:',
        error
      );

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';

      alert(
        `${errorMessage} Please try again later.`
      );
    }
  };

  // =========================
  // REAL SUPABASE CREATE ACCOUNT
  // =========================

  const handleCreateAccountSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const email = (
        formData.get('email') as string
      )?.trim();

      const password =
        formData.get('password') as string;

      const confirmPassword =
        formData.get('confirm_password') as string;

      const firstName = (
        formData.get('first_name') as string
      )?.trim();

      const lastName = (
        formData.get('last_name') as string
      )?.trim();

      const organization =
        (
          formData.get('organization') as string
        )?.trim() || '';

      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        alert(
          'Please fill in all required fields.'
        );
        return;
      }

      if (password !== confirmPassword) {
        alert(
          'Passwords do not match. Please try again.'
        );
        return;
      }

      if (password.length < 6) {
        alert(
          'Password must contain at least 6 characters.'
        );
        return;
      }

      const newsletterConsent =
        formData.get('newsletter_consent') !== null;

      const { data, error } =
        await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: `${firstName} ${lastName}`,
              first_name: firstName,
              last_name: lastName,
              organization,
              newsletter_consent:
                newsletterConsent,
            },
          },
        });

      if (error) {
        console.error(
          'Supabase account creation error:',
          error
        );

        if (
          error.message
            .toLowerCase()
            .includes('already registered')
        ) {
          alert(
            'An account with this email already exists. Please sign in instead.'
          );
        } else {
          alert(
            `Account creation failed: ${error.message}`
          );
        }

        return;
      }

      if (data.user) {
        if (data.session) {
          alert(
            'Account created successfully! Welcome to Africa Economic Forum.'
          );
        } else {
          alert(
            'Account created successfully! Please check your email to confirm your account.'
          );
        }

        setShowSignInModal(false);
        setShowCreateAccount(false);
      }
    } catch (error: unknown) {
      console.error(
        'Unexpected account creation error:',
        error
      );

      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';

      alert(
        `${errorMessage} Please try again later.`
      );
    }
  };

  // =========================
  // PAGE
  // =========================

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* =====================================
          HEADER
      ====================================== */}

      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center h-16">

            {/* LOGO */}
            <div className="flex items-center">
              <Link
                to={`/${i18n.language}`}
                className="flex items-center"
                onClick={closeMobileMenu}
              >
                <img
                  src="https://static.readdy.ai/image/433d1257c1dbc1f8bb2f3f1c418f6689/0727857f21d196505f8ef18cfc1cd897.png"
                  alt="Africa Economic Forum"
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden md:flex space-x-8">

              <Link
                to={`/${i18n.language}`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>

              <Link
                to={`/${i18n.language}/about`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </Link>

              <Link
                to={`/${i18n.language}/initiatives`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Initiatives
              </Link>

              <Link
                to={`/${i18n.language}/stakeholders`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Stakeholders
              </Link>

              <Link
                to={`/${i18n.language}/agenda`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Agenda
              </Link>

              <Link
                to={`/${i18n.language}/publications`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Publications
              </Link>

              <Link
                to={`/${i18n.language}/meetings`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Meetings
              </Link>

              <Link
                to={`/${i18n.language}/contact`}
                className="text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-600"
              >
                Contact
              </Link>

            </nav>

            {/* DESKTOP USER */}
            <div className="hidden md:flex items-center space-x-4">

              {user ? (
                <div className="relative">

                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(
                        !isProfileDropdownOpen
                      )
                    }
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title={
                      user.user_metadata?.full_name ||
                      user.email
                    }
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {getInitials()}
                      </div>
                    )}
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">

                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">

                        <div className="font-medium">
                          {user.user_metadata?.full_name ||
                            'User'}
                        </div>

                        <div className="text-gray-500">
                          {user.email}
                        </div>

                      </div>

                      <button
                        onClick={handleViewProfile}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
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
                <button
                  onClick={handleSignIn}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>
              )}

            </div>

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden p-2 cursor-pointer"
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              <i
                className={`ri-${
                  isMobileMenuOpen ? 'close' : 'menu'
                }-line text-2xl`}
              ></i>
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">

            <div className="px-2 pt-2 pb-3 space-y-1">

              <Link
                to={`/${i18n.language}`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={closeMobileMenu}
              >
                Home
              </Link>

              <Link
                to={`/${i18n.language}/about`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={closeMobileMenu}
              >
                About
              </Link>

              <Link
                to={`/${i18n.language}/initiatives`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={closeMobileMenu}
              >
                Initiatives
              </Link>

              <Link
                to={`/${i18n.language}/stakeholders`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={closeMobileMenu}
              >
                Stakeholders
              </Link>

              <Link
                to={`/${i18n.language}/agenda`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={closeMobileMenu}
              >
                Agenda
              </Link>

              <Link
                to={`/${i18n.language}/publications`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={closeMobileMenu}
              >
                Publications
              </Link>

              <Link
                to={`/${i18n.language}/meetings`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={closeMobileMenu}
              >
                Meetings
              </Link>

              <Link
                to={`/${i18n.language}/contact`}
                className="block px-3 py-2 text-base font-medium text-teal-600 bg-teal-50 rounded-md"
                onClick={closeMobileMenu}
              >
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
                            {getInitials()}
                          </span>
                        </div>
                      )}

                      <span className="text-gray-700 font-medium">
                        {user.user_metadata?.full_name ||
                          'User'}
                      </span>

                    </div>

                    <button
                      onClick={() => {
                        handleViewProfile();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium text-center"
                    >
                      My Profile
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
                  <button
                    onClick={() => {
                      handleSignIn();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer block text-center"
                  >
                    Sign In
                  </button>
                )}

              </div>

            </div>
          </div>
        )}
      </header>

      {/* =====================================
          HERO
      ====================================== */}

      <section className="pt-20">

        <div className="relative bg-blue-950 text-white overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-teal-800 opacity-95" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                <i className="ri-mail-line" />
                <span className="text-sm">
                  Get in touch
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Contact the Africa Economic Forum
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-2xl">
                Connect with our team, share your ideas,
                explore partnerships and learn more about
                the Africa Economic Forum.
              </p>

            </div>
          </div>
        </div>

      </section>

      {/* =====================================
          CONTACT CONTENT
      ====================================== */}

      <section className="py-20 lg:py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-5 gap-12">

            {/* LEFT INFO */}
            <div className="lg:col-span-2">

              <div className="sticky top-28">

                <span className="text-blue-900 font-semibold uppercase tracking-wider text-sm">
                  Contact Us
                </span>

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-3 mb-6">
                  Let's build Africa's future together
                </h2>

                <p className="text-gray-600 leading-relaxed mb-10">
                  Whether you are interested in membership,
                  partnerships, investment opportunities,
                  events or collaboration, our team is ready
                  to hear from you.
                </p>

                <div className="space-y-6">

                  <div className="flex gap-4">

                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center flex-shrink-0">
                      <i className="ri-mail-line text-xl" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Email
                      </h3>
                      <p className="text-gray-600 mt-1">
                        info@africaef.com
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-4">

                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center flex-shrink-0">
                      <i className="ri-map-pin-line text-xl" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Location
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Kinshasa, Democratic Republic of Congo
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-4">

                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center flex-shrink-0">
                      <i className="ri-global-line text-xl" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Africa Economic Forum
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Connecting leaders, institutions,
                        investors and changemakers.
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* FORM */}
            <div className="lg:col-span-3">

              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10">

                {formSubmitted ? (
                  <div className="py-12 text-center">

                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <i className="ri-check-line text-3xl" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      Message sent successfully
                    </h2>

                    <p className="text-gray-600 max-w-md mx-auto mb-8">
                      Thank you for contacting the Africa
                      Economic Forum. Our team will get back
                      to you as soon as possible.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setFormSubmitted(false)
                      }
                      className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition font-medium"
                    >
                      Send another message
                    </button>

                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Send us a message
                    </h2>

                    <p className="text-gray-600 mb-8">
                      Fill in the form below and our team
                      will contact you.
                    </p>

                    <form
                      onSubmit={handleContactSubmit}
                      className="space-y-6"
                    >

                      <div className="grid sm:grid-cols-2 gap-5">

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>

                          <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                            placeholder="Your first name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>

                          <input
                            type="text"
                            name="Last name"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                            placeholder="Your last name"
                          />
                        </div>

                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>

                          <input
                            type="email"
                            name="Email Address"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                            placeholder="you@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>

                          <input
                            type="tel"
                            name="Phone Number"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                            placeholder="+243 ..."
                          />
                        </div>

                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organization
                        </label>

                        <input
                          type="text"
                          name="Organization"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                          placeholder="Your organization"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject
                        </label>

                        <input
                          type="text"
                          name="Subject"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                          placeholder="How can we help?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>

                        <textarea
                          name="Message"
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent resize-none"
                          placeholder="Write your message..."
                        />
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer">

                        <input
                          type="checkbox"
                          name="Newsletters"
                          className="mt-1 w-4 h-4"
                        />

                        <span className="text-sm text-gray-600">
                          I would like to receive Africa Economic
                          Forum news, announcements and newsletters.
                        </span>

                      </label>

                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-900 text-white px-8 py-3.5 rounded-lg hover:bg-blue-800 transition font-semibold flex items-center justify-center gap-2"
                      >
                        <span>Send Message</span>
                        <i className="ri-send-plane-line" />
                      </button>

                    </form>
                  </>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          NEWSLETTER
      ====================================== */}

      <section className="bg-gray-50 py-16">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center">
            <i className="ri-mail-send-line text-2xl" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Stay connected
          </h2>

          <p className="text-gray-600 mb-8">
            Subscribe to the Africa Economic Forum newsletter
            for the latest news, events and opportunities.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
          >

            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              className="flex-1 px-5 py-3.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <button
              type="submit"
              className="bg-blue-900 text-white px-7 py-3.5 rounded-lg hover:bg-blue-800 transition font-semibold"
            >
              Subscribe
            </button>

          </form>

        </div>

      </section>

      {/* =====================================
          FOOTER
      ====================================== */}

      <footer className="bg-blue-950 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

            <div>

              <div className="flex items-center gap-3 mb-5">

                <div className="w-11 h-11 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="font-bold">
                    AEF
                  </span>
                </div>

                <div className="font-bold text-lg">
                  Africa Economic Forum
                </div>

              </div>

              <p className="text-blue-200 text-sm leading-relaxed">
                Connecting African leaders, institutions,
                investors and changemakers to shape a
                prosperous and sustainable future.
              </p>

            </div>

            <div>

              <h3 className="font-semibold text-lg mb-5">
                Explore
              </h3>

              <div className="space-y-3 text-sm">

                <Link
                  to="/about"
                  className="block text-blue-200 hover:text-white transition"
                >
                  About
                </Link>

                <Link
                  to="/initiatives"
                  className="block text-blue-200 hover:text-white transition"
                >
                  Initiatives
                </Link>

                <Link
                  to="/meetings"
                  className="block text-blue-200 hover:text-white transition"
                >
                  Meetings
                </Link>

                <Link
                  to="/intervenants"
                  className="block text-blue-200 hover:text-white transition"
                >
                  Intervenants
                </Link>

              </div>

            </div>

            <div>

              <h3 className="font-semibold text-lg mb-5">
                Resources
              </h3>

              <div className="space-y-3 text-sm">

                <Link
                  to="/agenda"
                  className="block text-blue-200 hover:text-white transition"
                >
                  Agenda
                </Link>

                <Link
                  to="/partners"
                  className="block text-blue-200 hover:text-white transition"
                >
                  Partners
                </Link>

                <Link
                  to="/publications"
                  className="block text-blue-200 hover:text-white transition"
                >
                  Publications
                </Link>

                <Link
                  to="/contact"
                  className="block text-blue-200 hover:text-white transition"
                >
                  Contact
                </Link>

              </div>

            </div>

            <div>

              <h3 className="font-semibold text-lg mb-5">
                Join AEF
              </h3>

              <p className="text-blue-200 text-sm leading-relaxed mb-5">
                Become part of a growing community working
                together to advance Africa's economic future.
              </p>

              <Link
                to="/join"
                className="inline-flex items-center gap-2 bg-white text-blue-950 px-5 py-3 rounded-md font-semibold hover:bg-blue-50 transition"
              >
                Become a Member
                <i className="ri-arrow-right-line" />
              </Link>

            </div>

          </div>

          <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-4 text-sm text-blue-300">

            <p>
              © {new Date().getFullYear()} Africa Economic Forum.
              All rights reserved.
            </p>

            <div className="flex gap-5">

              <Link
                to="/privacy"
                className="hover:text-white transition"
              >
                Privacy
              </Link>

              <Link
                to="/terms"
                className="hover:text-white transition"
              >
                Terms
              </Link>

            </div>

          </div
