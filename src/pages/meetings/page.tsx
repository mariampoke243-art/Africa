import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Forum, forums } from './forumsData';

export default function Meetings() {
  const { user, signOut } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [forumsData, setForumsData] = useState<Forum[]>([]);

  /*
   * IMPORTANT :
   * Les forums sont maintenant chargés depuis forumsData.ts
   * et non plus depuis les traductions i18n.
   */
  useEffect(() => {
    setForumsData(forums);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsProfileDropdownOpen(false);
  };

  const handleViewProfile = () => {
    navigate(`/${i18n.language}/profile`);
    setIsProfileDropdownOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const toggleCard = (cardId: number) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleSignIn = () => {
    setShowSignInModal(true);
    setShowCreateAccount(false);
  };

  const handleSignInSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (email && password) {
      alert('Sign in successful! Welcome back.');
      setShowSignInModal(false);
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
      alert(
        'Account created successfully! Welcome to Africa Economic Forum.'
      );
      setShowSignInModal(false);
      setShowCreateAccount(false);
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

  const renderExpandedContent = (forum: Forum) => {
    return (
      <div className="mt-6 space-y-6">
        {/* Overview */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            Overview
          </h4>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {forum.overview}
          </p>
        </div>

        {/* Objectives */}
        {Array.isArray(forum.objectives) &&
          forum.objectives.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Forum Objectives
              </h4>

              <ul className="space-y-2">
                {forum.objectives.map(
                  (objective: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <span className="text-teal-600 mr-2">
                        •
                      </span>

                      <span className="text-gray-700">
                        {objective}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

        {/* Key Focus Areas */}
        {Array.isArray(forum.keyAreas) &&
          forum.keyAreas.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Key Focus Areas
              </h4>

              <ul className="space-y-2">
                {forum.keyAreas.map(
                  (area: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start"
                    >
                      <span className="text-teal-600 mr-2">
                        •
                      </span>

                      <span className="text-gray-700">
                        {area}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

        {/* Strategic Pillars */}
        {Array.isArray(forum.pillars) &&
          forum.pillars.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Strategic Pillars
              </h4>

              <div className="space-y-4">
                {forum.pillars.map((pillar, index: number) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <h5 className="font-semibold text-gray-900 mb-2">
                      {index + 1}. {pillar.title}
                    </h5>

                    <ul className="space-y-1">
                      {Array.isArray(pillar.items) &&
                        pillar.items.map(
                          (
                            item: string,
                            itemIndex: number
                          ) => (
                            <li
                              key={itemIndex}
                              className="flex items-start"
                            >
                              <span className="text-teal-600 mr-2 text-sm">
                                •
                              </span>

                              <span className="text-gray-700 text-sm">
                                {item}
                              </span>
                            </li>
                          )
                        )}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">

      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center">
              <Link
                to={`/${i18n.language}`}
                className="flex items-center"
              >
                <img
                  src="https://static.readdy.ai/image/433d1257c1dbc1f8bb2f3f1c418f6689/0727857f21d196505f8ef18cfc1cd897.png"
                  alt="Africa Economic Forum"
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">

              <Link
                to={`/${i18n.language}`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.home')}
              </Link>

              <Link
                to={`/${i18n.language}/about`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.about')}
              </Link>

              <Link
                to={`/${i18n.language}/initiatives`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.initiatives')}
              </Link>

              <Link
                to={`/${i18n.language}/stakeholders`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.stakeholders')}
              </Link>

              <Link
                to={`/${i18n.language}/agenda`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.agenda')}
              </Link>

              <Link
                to={`/${i18n.language}/publications`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.publications')}
              </Link>

              <Link
                to={`/${i18n.language}/meetings`}
                className="text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-600"
              >
                {t('header.meetings')}
              </Link>

              <Link
                to={`/${i18n.language}/contact`}
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.contact')}
              </Link>

            </nav>

            {/* Desktop User */}
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
                        {getInitials(
                          user.user_metadata?.full_name ||
                            user.email?.charAt(0) ||
                            'U'
                        )}
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
                <button
                  onClick={handleSignIn}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap cursor-pointer"
                >
                  {t('header.signIn')}
                </button>
              )}

            </div>

            {/* Mobile Button */}
            <button
              className="md:hidden p-2 cursor-pointer"
              onClick={toggleMobileMenu}
            >
              <i
                className={`ri-${
                  isMobileMenuOpen ? 'close' : 'menu'
                }-line text-2xl`}
              ></i>
            </button>

          </div>
        </div>

        {/* =====================================================
            MOBILE MENU
        ===================================================== */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">

            <div className="px-2 pt-2 pb-3 space-y-1">

              <Link
                to={`/${i18n.language}`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.home')}
              </Link>

              <Link
                to={`/${i18n.language}/about`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.about')}
              </Link>

              <Link
                to={`/${i18n.language}/initiatives`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.initiatives')}
              </Link>

              <Link
                to={`/${i18n.language}/stakeholders`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.stakeholders')}
              </Link>

              <Link
                to={`/${i18n.language}/agenda`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.agenda')}
              </Link>

              <Link
                to={`/${i18n.language}/publications`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.publications')}
              </Link>

              <Link
                to={`/${i18n.language}/meetings`}
                className="block px-3 py-2 text-base font-medium text-teal-600 bg-teal-50 rounded-md"
              >
                {t('header.meetings')}
              </Link>

              <Link
                to={`/${i18n.language}/contact`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.contact')}
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
                            {getInitials(
                              user.user_metadata?.full_name ||
                                user.email?.charAt(0) ||
                                'U'
                            )}
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
                  <button
                    onClick={() => {
                      handleSignIn();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer block text-center"
                  >
                    {t('header.signIn')}
                  </button>
                )}

              </div>

            </div>
          </div>
        )}
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url('https://readdy.ai/api/search-image?query=Large%20international%20conference%20hall%20filled%20with%20African%20business%20leaders%20and%20delegates%2C%20professional%20summit%20atmosphere%20with%20modern%20staging%20and%20lighting&width=1920&height=800&seq=meetings-hero&orientation=landscape')`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('meetingsPage.heroTitle')}
          </h1>

          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            {t('meetingsPage.heroSubtitle')}
          </p>

        </div>
      </section>

      {/* =========================================================
          FORUM CARDS
      ========================================================= */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('meetingsPage.sectionTitle')}
            </h2>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('meetingsPage.sectionSubtitle')}
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {forumsData.map((forum) => (
              <div
                key={forum.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >

                {/* Forum Image */}
                <img
                  src={forum.image}
                  alt={forum.title}
                  className="w-full h-64 object-cover object-top"
                />

                <div className="p-6">

                  {/* Forum Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {forum.title}
                  </h3>

                  {/* Forum Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {forum.description}
                  </p>

                  {/* Expanded Content */}
                  {expandedCard === forum.id &&
                    renderExpandedContent(forum)}

                  {/* Read More Button */}
                  <button
                    onClick={() => toggleCard(forum.id)}
                    className="mt-4 bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer flex items-center space-x-2"
                  >
                    <span>
                      {expandedCard === forum.id
                        ? t('meetingsPage.showLess')
                        : t('meetingsPage.readMore')}
                    </span>

                    <i
                      className={`ri-arrow-${
                        expandedCard === forum.id
                          ? 'up'
                          : 'down'
                      }-s-line`}
                    ></i>
                  </button>

                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =========================================================
          CALL TO ACTION
      ========================================================= */}
      <section className="py-20 bg-blue-900 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h2 className="text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>

          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {t('cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">

            <button
              onClick={handleSignIn}
              className="bg-white text-blue-900 px-8 py-4 rounded-md hover:bg-gray-100 font-semibold whitespace-nowrap cursor-pointer"
            >
              {t('cta.register')}
            </button>

            <Link
              to={`/${i18n.language}/contact`}
              className="border-2 border-white text-white px-8 py-4 rounded-md hover:bg-white hover:text-blue-900 font-semibold whitespace-nowrap cursor-pointer flex items-center justify-center"
            >
              {t('cta.contact')}
            </Link>

          </div>

        </div>
      </section>

      {/* =========================================================
          SIGN IN / CREATE ACCOUNT MODAL
      ========================================================= */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-lg max-w-md w-full">

            <div className="p-6">

              <div className="flex justify-between items-center mb-6">

                <h3 className="text-2xl font-bold text-gray-900">
                  {showCreateAccount
                    ? 'Create Account'
                    : 'Sign In'}
                </h3>

                <button
                  onClick={() =>
                    setShowSignInModal(false)
                  }
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>

              </div>

              {!showCreateAccount ? (
                <>
                  {/* Sign In Form */}
                  <form
                    onSubmit={handleSignInSubmit}
                    className="space-y-4"
                  >

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

                        <input
                          type="checkbox"
                          name="remember_me"
                          className="cursor-pointer"
                        />

                        <span className="text-sm text-gray-600">
                          Remember me
                        </span>

                      </label>

                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
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
              ) : (
                <>
                  {/* Create Account Form */}
                  <form
                    onSubmit={handleCreateAccountSubmit}
                    className="space-y-4"
                  >

                    <div className="grid grid-cols-2 gap-4">

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>

                        <input
                          type="text"
                          name="first_name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="First name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>

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
                        Organization
                      </label>

                      <input
                        type="text"
                        name="organization"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Your organization"
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
                        placeholder="Create a password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>

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

              {/* Social Login */}
              {!showCreateAccount && (
                <div className="mt-6">

                  <div className="relative">

                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>

                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>

                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">

                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">

                      <i className="ri-google-fill text-red-500 text-lg"></i>

                      <span className="ml-2">
                        Google
                      </span>

                    </button>

                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">

                      <i className="ri-linkedin-fill text-blue-600 text-lg"></i>

                      <span className="ml-2">
                        LinkedIn
                      </span>

                    </button>

                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <footer className="bg-gray-900 text-white py-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

            {/* About */}
            <div>

              <h3 className="font-semibold text-lg mb-6">
                {t('footer.aboutUs')}
              </h3>

              <ul className="space-y-3">

                <li>
                  <Link
                    to={`/${i18n.language}/about`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.ourMission')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/framework`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.ourFramework')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/history`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.history')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/about`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.leadership')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/about`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.ourImpact')}
                  </Link>
                </li>

              </ul>

            </div>

            {/* More From Forum */}
            <div>

              <h3 className="font-semibold text-lg mb-6">
                {t('footer.moreFromForum')}
              </h3>

              <ul className="space-y-3">

                <li>
                  <Link
                    to={`/${i18n.language}/initiatives`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.centres')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/meetings`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.meetings')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/stakeholders`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.stakeholders')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/agenda`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.forumStories')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/publications`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.pressReleases')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/gallery`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.gallery')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/publications`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.podcasts')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/publications`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.videos')}
                  </Link>
                </li>

              </ul>

            </div>

            {/* Engage */}
            <div>

              <h3 className="font-semibold text-lg mb-6">
                {t('footer.engage')}
              </h3>

              <ul className="space-y-3">

                <li>
                  {user ? (
                    <button
                      onClick={handleSignOut}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer"
                    >
                      {t('footer.logout')}
                    </button>
                  ) : (
                    <button
                      onClick={handleSignIn}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap cursor-pointer"
                    >
                      {t('footer.signIn')}
                    </button>
                  )}
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/partners`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.partner')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/join`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.member')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/contact`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.pressSignUp')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/contact`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.newsletters')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/contact`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.contactUs')}
                  </Link>
                </li>

              </ul>

            </div>

            {/* Quick Links */}
            <div>

              <h3 className="font-semibold text-lg mb-6">
                {t('footer.quickLinks')}
              </h3>

              <ul className="space-y-3 mb-8">

                <li>
                  <Link
                    to={`/${i18n.language}/about`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.sustainability')}
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/${i18n.language}/careers`}
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.careers')}
                  </Link>
                </li>

              </ul>

              {/* Languages */}
              <div>

                <h4 className="font-semibold mb-4">
                  {t('footer.languageEditions')}
                </h4>

                <div className="flex space-x-2">

                  <button
                    onClick={() =>
                      i18n.changeLanguage('pt')
                    }
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    PT
                  </button>

                  <span className="text-gray-500">
                    •
                  </span>

                  <button
                    onClick={() =>
                      i18n.changeLanguage('en')
                    }
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    EN
                  </button>

                  <span className="text-gray-500">
                    •
                  </span>

                  <button
                    onClick={() =>
                      i18n.changeLanguage('es')
                    }
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    ES
                  </button>

                  <span className="text-gray-500">
                    •
                  </span>

                  <button
                    onClick={() =>
                      i18n.changeLanguage('fr')
                    }
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    FR
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 pt-8">

            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

              {/* Social Networks */}
              <div className="flex space-x-4">

                <a
                  href="https://www.facebook.com/share/17Jr8NpqZJ/"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-facebook-fill text-xl"></i>
                </a>

                <a
                  href="https://www.linkedin.com/company/the-africa-economic-forum/"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-linkedin-fill text-xl"></i>
                </a>

                <a
                  href="https://www.instagram.com/theafricaeconomicforum?igsh=MWowNmw1NjdueXNkbQ=="
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-instagram-fill text-xl"></i>
                </a>

                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-youtube-fill text-xl"></i>
                </a>

              </div>

              {/* Copyright */}
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">

                <Link
                  to={`/${i18n.language}/privacy`}
                  className="hover:text-white cursor-pointer"
                >
                  {t('footer.privacy')}
                </Link>

                <p>
                  {t('footer.copyright')}
                </p>

                <a
                  href="https://codesignglobal.com"
                  className="hover:text-white cursor-pointer"
                >
                  Code Design Global
                </a>

              </div>

            </div>
          </div>

        </div>
      </footer>

    </div>
  );
      }
