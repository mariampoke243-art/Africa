import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
} from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { useAuth } from '../../contexts/AuthContext';

import { aefInitiatives } from '../../data/aefData';

import { forums } from '../meetings/forumsData';

import { spotlightArticles } from '../../data/spotlightData';

import HomePopups from '../../components/HomePopups';

import { LanguageSelector } from '../../components/LanguageSelector';


export default function Home() {

  /* =========================================================
     TRANSLATIONS
     ========================================================= */

  const { t, i18n } = useTranslation();


  /* =========================================================
     STATES
     ========================================================= */

  const [showMobileMenu, setShowMobileMenu] =
    useState(false);

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] =
    useState(false);

  const [newsletterEmail, setNewsletterEmail] =
    useState('');

  const [subscribed, setSubscribed] =
    useState(false);


  /* =========================================================
     AUTH
     ========================================================= */

  const {
    user,
    isAuthenticated,
    signOut,
  } = useAuth();


  const navigate = useNavigate();

  const videoRef =
    useRef<HTMLVideoElement | null>(null);


  /* =========================================================
     VIDEO
     ========================================================= */

  useEffect(() => {

    if (videoRef.current) {

      videoRef.current.muted = true;

      videoRef.current.play().catch(() => {});

    }

  }, []);


  /* =========================================================
     AUTH FUNCTIONS
     ========================================================= */

  const handleSignIn = () => {

    navigate('/signin');

  };


  const handleLogout = async () => {

    await signOut();

    setIsProfileDropdownOpen(false);

  };


  const handleViewProfile = () => {

    navigate('/profile');

    setIsProfileDropdownOpen(false);

  };


  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const toggleMobileMenu = () => {

    setShowMobileMenu(!showMobileMenu);

  };


  /* =========================================================
     NEWSLETTER
     ========================================================= */

  const handleNewsletterSubmit = (
    e: FormEvent
  ) => {

    e.preventDefault();

    if (newsletterEmail) {

      setSubscribed(true);

      setNewsletterEmail('');

    }

  };


  /* =========================================================
     USER INITIALS
     ========================================================= */

  const getInitials = (name: string) => {

    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);

  };


  /* =========================================================
     CHANGE LANGUAGE
     ========================================================= */

  const changeLanguage = (language: string) => {

    i18n.changeLanguage(language);

  };


  return (

    <div className="min-h-screen bg-white">

      {/* =====================================================
          HOME POPUPS
          ===================================================== */}

      <HomePopups />


      {/* =====================================================
          HEADER
          ===================================================== */}

      <header className="bg-white shadow-sm sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center h-16">

            {/* =================================================
                LOGO
                ================================================= */}

            <div className="flex items-center">

              <Link
                to="/"
                className="flex items-center space-x-3"
              >

                <img
                  src="https://static.readdy.ai/image/849a2f489cee8d6814d30c5afad3a84a/b4bfbdc8f08b91298cef1ff69a069583.png"
                  alt="Africa Economic Forum"
                  className="w-10 h-10 object-contain"
                />

              </Link>

            </div>


            {/* =================================================
                DESKTOP NAVIGATION
                ================================================= */}

            <nav className="hidden md:flex space-x-8">

              <Link
                to="/"
                className="text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-600"
              >
                {t('header.home')}
              </Link>


              <Link
                to="/about"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.about')}
              </Link>


              <Link
                to="/initiatives"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.initiatives')}
              </Link>


              <Link
                to="/stakeholders"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.stakeholders')}
              </Link>


              <Link
                to="/agenda"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.agenda')}
              </Link>


              <Link
                to="/publications"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.publications')}
              </Link>


              <Link
                to="/meetings"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.meetings')}
              </Link>


              <Link
                to="/contact"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.contact')}
              </Link>

            </nav>


            {/* =================================================
                DESKTOP ACTIONS
                ================================================= */}

            <div className="hidden md:flex items-center space-x-4">

              <LanguageSelector />


              {/* AUTH */}

              {isAuthenticated && user ? (

                <div className="relative">

                  <button
                    type="button"
                    onClick={() =>
                      setIsProfileDropdownOpen(
                        !isProfileDropdownOpen
                      )
                    }
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title={
                      user.user_metadata?.full_name ||
                      user.email ||
                      t('auth.profile')
                    }
                  >

                    {user.user_metadata?.avatar_url ? (

                      <img
                        src={user.user_metadata.avatar_url}
                        alt={t('auth.profile')}
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
                            t('auth.user')}

                        </div>


                        <div className="text-gray-500">

                          {user.email}

                        </div>

                      </div>


                      <button
                        type="button"
                        onClick={handleViewProfile}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t('auth.viewProfile')}
                      </button>


                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t('auth.signOut')}
                      </button>

                    </div>

                  )}

                </div>

              ) : (

                <Link
                  to="/signin"
                  className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap cursor-pointer"
                >
                  {t('header.signIn')}
                </Link>

              )}

            </div>


            {/* =================================================
                MOBILE BUTTON
                ================================================= */}

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="md:hidden p-2 cursor-pointer"
              aria-label="Toggle mobile menu"
            >

              <i
                className={`ri-${
                  showMobileMenu
                    ? 'close'
                    : 'menu'
                }-line text-2xl`}
              />

            </button>

          </div>

        </div>


        {/* ===================================================
            MOBILE MENU
            =================================================== */}

        {showMobileMenu && (

          <div className="md:hidden bg-white border-t border-gray-200">

            <div className="px-4 py-2 space-y-1">

              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-teal-600 bg-teal-50 rounded-md"
                onClick={() =>
                  setShowMobileMenu(false)
                }
              >
                {t('header.home')}
              </Link>


              <Link
                to="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() =>
                  setShowMobileMenu(false)
                }
              >
                {t('header.about')}
              </Link>


              <Link
                to="/initiatives"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() =>
                  setShowMobileMenu(false)
                }
              >
                {t('header.initiatives')}
              </Link>


              <Link
                to="/stakeholders"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() =>
                  setShowMobileMenu(false)
                }
              >
                {t('header.stakeholders')}
              </Link>


              <Link
                to="/agenda"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() =>
                  setShowMobileMenu(false)
                }
              >
                {t('header.agenda')}
              </Link>


              <Link
                to="/publications"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() =>
                  setShowMobileMenu(false)
                }
              >
                {t('header.publications')}
              </Link>


              <Link
                to="/meetings"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() =>
                  setShowMobileMenu(false)
                }
              >
                {t('header.meetings')}
              </Link>


              <Link
                to="/contact"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() =>
                  setShowMobileMenu(false)
                }
              >
                {t('header.contact')}
              </Link>


              {/* LANGUAGE MOBILE */}

              <div className="px-3 py-4 border-t border-gray-100">

                <LanguageSelector />

              </div>


              {/* MOBILE AUTH */}

              <div className="pt-2 pb-2">

                {isAuthenticated && user ? (

                  <div className="space-y-2">

                    <div className="flex items-center space-x-3 px-3 py-2">

                      {user.user_metadata?.avatar_url ? (

                        <img
                          src={user.user_metadata.avatar_url}
                          alt={t('auth.profile')}
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


                      <span className="text-gray-700 font-medium">

                        {user.user_metadata?.full_name ||
                          t('auth.user')}

                      </span>

                    </div>


                    <button
                      type="button"
                      onClick={() => {
                        handleViewProfile();
                        setShowMobileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:text-teal-600 font-medium"
                    >
                      {t('auth.viewProfile')}
                    </button>


                    <button
                      type="button"
                      onClick={() => {
                        handleLogout();
                        setShowMobileMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:text-teal-600 font-medium"
                    >
                      {t('auth.signOut')}
                    </button>

                  </div>

                ) : (

                  <Link
                    to="/signin"
                    className="w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer block text-center"
                    onClick={() =>
                      setShowMobileMenu(false)
                    }
                  >
                    {t('header.signIn')}
                  </Link>

                )}

              </div>

            </div>

          </div>

        )}

      </header>


      {/* =====================================================
          MAIN
          ===================================================== */}

      <main>

        {/* ===================================================
            HERO
            =================================================== */}

        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 lg:py-32">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-2 gap-12 items-center">

              <div className="space-y-8">

                <div className="space-y-6">

                  <p className="text-blue-200 text-lg font-medium">
                    {t('home.heroEyebrow')}
                  </p>


                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    {t('home.heroSubtitle')}
                  </h1>


                  <Link
                    to="/about"
                    className="bg-white text-blue-900 px-8 py-3 rounded-md hover:bg-gray-100 font-medium flex items-center space-x-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>
                      {t('home.moreAboutForum')}
                    </span>

                    <i className="ri-arrow-right-line" />

                  </Link>

                </div>

              </div>


              <div className="relative">

                <video
                  ref={videoRef}
                  className="w-full h-96 rounded-lg shadow-lg object-cover"
                  src="/videos/aef-video.mp4"
                  title="Africa Economic Forum Video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                />

                <div className="absolute inset-0 bg-black/10 rounded-lg pointer-events-none" />

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            HOW WE DRIVE IMPACT
            =================================================== */}

        <section className="py-20 bg-gray-50">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">

              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                {t('home.impactTitle')}
              </h2>


              <div className="flex justify-center space-x-8 mb-12">

                <Link
                  to="/initiatives"
                  className="px-6 py-3 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer bg-blue-900 text-white hover:bg-blue-800"
                >
                  {t('header.initiatives')}
                </Link>


                <Link
                  to="/meetings"
                  className="px-6 py-3 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer text-gray-600 hover:text-blue-900 hover:bg-gray-100"
                >
                  {t('header.meetings')}
                </Link>


                <Link
                  to="/stakeholders"
                  className="px-6 py-3 font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer text-gray-600 hover:text-blue-900 hover:bg-gray-100"
                >
                  {t('header.stakeholders')}
                </Link>

              </div>

            </div>


            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <div className="space-y-8">

                <h2 className="text-4xl font-bold text-gray-900">
                  {t('home.impactTitle')}
                </h2>


                <p className="text-lg text-gray-600 leading-relaxed">
                  {t('home.impactSubtitle')}
                </p>


                <div className="space-y-4">

                  <div className="flex items-start space-x-4">

                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="ri-lightbulb-line text-blue-600" />
                    </div>

                    <div>

                      <h3 className="font-semibold text-gray-900 mb-2">
                        {t('home.strategicDialogue')}
                      </h3>

                      <p className="text-gray-600">
                        {t('home.strategicDialogueDescription')}
                      </p>

                    </div>

                  </div>


                  <div className="flex items-start space-x-4">

                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="ri-handshake-line text-green-600" />
                    </div>

                    <div>

                      <h3 className="font-semibold text-gray-900 mb-2">
                        {t('home.partnershipFacilitation')}
                      </h3>

                      <p className="text-gray-600">
                        {t('home.partnershipFacilitationDescription')}
                      </p>

                    </div>

                  </div>


                  <div className="flex items-start space-x-4">

                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="ri-rocket-line text-purple-600" />
                    </div>

                    <div>

                      <h3 className="font-semibold text-gray-900 mb-2">
                        {t('home.innovationAcceleration')}
                      </h3>

                      <p className="text-gray-600">
                        {t('home.innovationAccelerationDescription')}
                      </p>

                    </div>

                  </div>

                </div>


                <Link
                  to="/initiatives"
                  className="bg-blue-900 text-white px-8 py-3 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer inline-block"
                >
                  {t('home.moreAboutInitiatives')}
                </Link>

              </div>


              <div className="grid grid-cols-2 gap-4">

                <div className="space-y-4">

                  {aefInitiatives?.slice(0, 2).map(
                    (item) => (

                      <div
                        key={item.id}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                      >

                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover object-top"
                        />

                        <div className="p-4">

                          <h4 className="font-semibold text-gray-900">
                            {item.title}
                          </h4>

                        </div>

                      </div>

                    )
                  )}

                </div>


                <div className="space-y-4 mt-8">

                  {aefInitiatives?.slice(2, 4).map(
                    (item) => (

                      <div
                        key={item.id}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                      >

                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover object-top"
                        />

                        <div className="p-4">

                          <h4 className="font-semibold text-gray-900">
                            {item.title}
                          </h4>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            MEETINGS
            =================================================== */}

        <section className="py-16 bg-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-12">

              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('meetingsPage.sectionTitle')}
              </h2>

              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                {t('meetingsPage.sectionSubtitle')}
              </p>

            </div>


            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {forums.map((forum) => (

                <Link
                  key={forum.id}
                  to="/meetings"
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow block"
                >

                  <img
                    src={forum.image}
                    alt={t(`forums.${forum.key}.title`)}
                    className="w-full h-48 object-cover object-top"
                  />


                  <div className="p-6">

                    {t(`forums.${forum.key}.sectoralLabel`, {
                      defaultValue: '',
                    }) && (

                      <p className="text-sm text-teal-600 font-medium mb-2">
                        {t(`forums.${forum.key}.sectoralLabel`)}
                      </p>

                    )}


                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {t(`forums.${forum.key}.title`)}
                    </h3>


                    <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                      {t(`forums.${forum.key}.description`)}
                    </p>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </section>


        {/* ===================================================
            SPOTLIGHT
            =================================================== */}

        <section className="py-20 bg-gray-50">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="flex justify-between items-center mb-12">

              <div>

                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {t('home.spotlightTitle')}
                </h2>

                <p className="text-gray-600 text-lg">
                  {t('home.spotlightSubtitle')}
                </p>

              </div>


              <Link
                to="/spotlight"
                className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium flex items-center space-x-2 whitespace-nowrap cursor-pointer"
              >
                <span>
                  {t('home.viewAllArticles')}
                </span>

                <i className="ri-arrow-right-line" />

              </Link>

            </div>


            <div className="grid lg:grid-cols-3 gap-8">

              {spotlightArticles.length > 0 && (

                <div className="lg:col-span-2">

                  <Link
                    to="/spotlight"
                    className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  >

                    <img
                      src={spotlightArticles[0].image}
                      alt={t(`spotlight.${spotlightArticles[0].key}.title`)}
                      className="w-full h-64 object-cover object-top"
                    />


                    <div className="p-6">

                      <div className="flex items-center space-x-4 mb-4">

                        <span className="text-blue-600 font-medium text-sm">
                          {t(`spotlight.${spotlightArticles[0].key}.category`)}
                        </span>

                        <span className="text-gray-400 text-sm">
                          {spotlightArticles[0].date}
                        </span>

                      </div>


                      <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3">
                        {t(`spotlight.${spotlightArticles[0].key}.title`)}
                      </h3>


                      <p className="text-gray-600 leading-relaxed">
                        {t(`spotlight.${spotlightArticles[0].key}.description`)}
                      </p>

                    </div>

                  </Link>

                </div>

              )}


              <div className="space-y-6">

                {spotlightArticles
                  .slice(1, 5)
                  .map((article) => (

                    <Link
                      key={article.id}
                      to={`/spotlight/${article.id}`}
                      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    >

                      <div className="flex">

                        <div className="relative w-32 h-24 flex-shrink-0">

                          <img
                            src={article.image}
                            alt={t(`spotlight.${article.key}.title`)}
                            className="w-full h-full object-cover object-top"
                          />

                        </div>


                        <div className="p-4 flex-1">

                          <span className="text-blue-600 font-medium text-sm">
                            {t(`spotlight.${article.key}.category`)}
                          </span>


                          <p className="text-gray-400 text-xs mb-1">
                            {article.date}
                          </p>


                          <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-3">
                            {t(`spotlight.${article.key}.title`)}
                          </h4>

                        </div>

                      </div>

                    </Link>

                  ))}

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            NEWSLETTER
            =================================================== */}

        <section className="py-16 bg-blue-900 text-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-3xl mx-auto text-center space-y-6">

              <h2 className="text-3xl font-bold">
                {t('home.newsletterTitle')}
              </h2>


              <p className="text-blue-200 text-lg">
                {t('home.newsletterDescription')}
              </p>


              {subscribed ? (

                <div className="bg-teal-700/50 border border-teal-500 text-teal-100 px-6 py-4 rounded-md">
                  {t('home.subscriptionSuccess')}
                </div>

              ) : (

                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
                >

                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) =>
                      setNewsletterEmail(
                        e.target.value
                      )
                    }
                    placeholder={t('home.newsletterPlaceholder')}
                    className="px-4 py-3 rounded-md text-gray-900 w-full sm:w-80 focus:outline-none"
                    required
                  />


                  <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {t('home.subscribe')}
                  </button>

                </form>

              )}

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
          ===================================================== */}

      <footer className="bg-gray-900 text-white py-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">


            {/* =================================================
                ABOUT
                ================================================= */}

            <div>

              <h3 className="font-semibold text-lg mb-6">
                {t('footer.aboutUs')}
              </h3>


              <ul className="space-y-3">

                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.ourMission')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/framework"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.ourFramework')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/history"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.history')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.leadership')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.ourImpact')}
                  </Link>
                </li>

              </ul>

            </div>


            {/* =================================================
                MORE FROM FORUM
                ================================================= */}

            <div>

              <h3 className="font-semibold text-lg mb-6">
                {t('footer.moreFromForum')}
              </h3>


              <ul className="space-y-3">

                <li>
                  <Link
                    to="/initiatives"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.centres')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/meetings"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.meetings')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/stakeholders"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.stakeholders')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/agenda"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.forumStories')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/publications"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.pressReleases')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/gallery"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.gallery')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/publications"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.podcasts')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/publications"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.videos')}
                  </Link>
                </li>

              </ul>

            </div>


            {/* =================================================
                ENGAGE
                ================================================= */}

            <div>

              <h3 className="font-semibold text-lg mb-6">
                {t('footer.engage')}
              </h3>


              <ul className="space-y-3">

                <li>

                  {user ? (

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer"
                    >
                      {t('footer.logout')}
                    </button>

                  ) : (

                    <Link
                      to="/signin"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap cursor-pointer"
                    >
                      {t('footer.signIn')}
                    </Link>

                  )}

                </li>


                <li>
                  <Link
                    to="/partners"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.partner')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/join"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.member')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.pressSignUp')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.newsletters')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.contactUs')}
                  </Link>
                </li>

              </ul>

            </div>


            {/* =================================================
                QUICK LINKS
                ================================================= */}

            <div>

              <h3 className="font-semibold text-lg mb-6">
                {t('footer.quickLinks')}
              </h3>


              <ul className="space-y-3 mb-8">

                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.sustainability')}
                  </Link>
                </li>


                <li>
                  <Link
                    to="/careers"
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    {t('footer.careers')}
                  </Link>
                </li>

              </ul>


              <div>

                <h4 className="font-semibold mb-4">
                  {t('footer.languageEditions')}
                </h4>


                <div className="flex flex-wrap gap-x-2 gap-y-2">

                  <button
                    type="button"
                    onClick={() => changeLanguage('en')}
                    className="text-gray-300 hover:text-white"
                  >
                    EN
                  </button>

                  <span className="text-gray-500">
                    •
                  </span>

                  <button
                    type="button"
                    onClick={() => changeLanguage('fr')}
                    className="text-gray-300 hover:text-white"
                  >
                    FR
                  </button>

                  <span className="text-gray-500">
                    •
                  </span>

                  <button
                    type="button"
                    onClick={() => changeLanguage('pt')}
                    className="text-gray-300 hover:text-white"
                  >
                    PT
                  </button>

                  <span className="text-gray-500">
                    •
                  </span>

                  <button
                    type="button"
                    onClick={() => changeLanguage('es')}
                    className="text-gray-300 hover:text-white"
                  >
                    ES
                  </button>

                  <span className="text-gray-500">
                    •
                  </span>

                  <button
                    type="button"
                    onClick={() => changeLanguage('zh')}
                    className="text-gray-300 hover:text-white"
                  >
                    中文
                  </button>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              FOOTER BOTTOM
              ================================================= */}

          <div className="border-t border-gray-700 pt-8">

            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">


              {/* SOCIAL */}

              <div className="flex space-x-4">

                <a
                  href="https://www.facebook.com/share/17Jr8NpqZJ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                  aria-label="Facebook"
                >
                  <i className="ri-facebook-fill text-xl" />
                </a>


                <a
                  href="https://www.linkedin.com/company/the-africa-economic-forum/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <i className="ri-linkedin-fill text-xl" />
                </a>


                <a
                  href="https://www.instagram.com/theafricaeconomicforum?igsh=MWowNmw1NjdueXNkbQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                  aria-label="Instagram"
                >
                  <i className="ri-instagram-fill text-xl" />
                </a>


                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                  aria-label="YouTube"
                >
                  <i className="ri-youtube-fill text-xl" />
                </a>

              </div>


              {/* COPYRIGHT */}

              <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">

                <Link
                  to="/privacy"
                  className="hover:text-white cursor-pointer"
                >
                  {t('footer.privacy')}
                </Link>


                <p>
                  {t('footer.copyright')}
                </p>


                <a
                  href="https://codesignglobal.com"
                  target="_blank"
                  rel="noopener noreferrer"
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
