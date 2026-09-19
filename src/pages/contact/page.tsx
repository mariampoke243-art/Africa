import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const text = (key: string, fallback: string) =>
    i18n.exists(key) ? t(key) : fallback;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    event.currentTarget.reset();
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

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

  const handleSignIn = () => {
    navigate(`/${i18n.language}/signin`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* HEADER */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* LOGO */}
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

            {/* DESKTOP MENU */}
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
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('header.meetings')}
              </Link>

              <Link
                to={`/${i18n.language}/contact`}
                className="text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-600"
              >
                {t('header.contact')}
              </Link>

            </nav>

            {/* DESKTOP AUTH */}
            <div className="hidden md:flex items-center space-x-4">

              {user ? (
                <div className="relative">

                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title={
                      user.user_metadata?.full_name ||
                      user.email ||
                      'Profile'
                    }
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white text-sm font-medium">
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
                        onClick={handleViewProfile}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t('auth.viewProfile')}
                      </button>

                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t('auth.signOut')}
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
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.home')}
              </Link>

              <Link
                to={`/${i18n.language}/about`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.about')}
              </Link>

              <Link
                to={`/${i18n.language}/initiatives`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.initiatives')}
              </Link>

              <Link
                to={`/${i18n.language}/stakeholders`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.stakeholders')}
              </Link>

              <Link
                to={`/${i18n.language}/agenda`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.agenda')}
              </Link>

              <Link
                to={`/${i18n.language}/publications`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.publications')}
              </Link>

              <Link
                to={`/${i18n.language}/meetings`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
              >
                {t('header.meetings')}
              </Link>

              <Link
                to={`/${i18n.language}/contact`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-teal-600 bg-teal-50 rounded-md"
              >
                {t('header.contact')}
              </Link>

              {/* MOBILE AUTH */}
              <div className="pt-2 border-t border-gray-200 mt-2">

                {user ? (
                  <>

                    <div className="px-3 py-2">
                      <div className="font-medium text-gray-800">
                        {user.user_metadata?.full_name ||
                          t('auth.user')}
                      </div>

                      <div className="text-sm text-gray-500">
                        {user.email}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handleViewProfile();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      {t('auth.viewProfile')}
                    </button>

                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                    >
                      {t('auth.signOut')}
                    </button>

                  </>
                ) : (
                  <button
                    onClick={() => {
                      handleSignIn();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-blue-900 hover:bg-gray-50 rounded-md"
                  >
                    {t('header.signIn')}
                  </button>
                )}

              </div>

            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="bg-blue-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-teal-400">
            {text('contact.eyebrow', 'Contact')}
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            {text(
              'contact.title',
              'Let’s build Africa’s economic future together.'
            )}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            {text(
              'contact.description',
              'Connect with the Africa Economic Forum team for partnerships, participation, media enquiries, or general information.'
            )}
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">

            {/* CONTACT INFORMATION */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {text('contact.infoTitle', 'Get in touch')}
              </h2>

              <p className="mt-4 text-lg leading-8 text-gray-600">
                {text(
                  'contact.infoDescription',
                  'Our team is available to answer your questions and explore opportunities for collaboration.'
                )}
              </p>

              <div className="mt-8 space-y-5">

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <i className="ri-mail-line text-xl"></i>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {text('contact.emailTitle', 'Email')}
                      </h3>

                      <p className="mt-1 text-gray-600">
                        contact@africaef.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <i className="ri-map-pin-line text-xl"></i>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {text('contact.locationTitle', 'Location')}
                      </h3>

                      <p className="mt-1 text-gray-600">
                        Africa Economic Forum
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                      <i className="ri-time-line text-xl"></i>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {text('contact.hoursTitle', 'Office hours')}
                      </h3>

                      <p className="mt-1 text-gray-600">
                        {text(
                          'contact.hours',
                          'Monday – Friday, 9:00 – 17:00'
                        )}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

              {isSubmitted ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                    <i className="ri-check-line text-3xl"></i>
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-gray-900">
                    {text(
                      'contact.successTitle',
                      'Message sent successfully'
                    )}
                  </h2>

                  <p className="mt-3 max-w-md text-gray-600">
                    {text(
                      'contact.successDescription',
                      'Thank you for contacting us. Our team will get back to you shortly.'
                    )}
                  </p>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 rounded-md bg-blue-900 px-6 py-3 font-medium text-white hover:bg-blue-800"
                  >
                    {text('contact.sendAnother', 'Send another message')}
                  </button>

                </div>
              ) : (
                <form onSubmit={handleSubmit}>

                  <h2 className="text-2xl font-bold text-gray-900">
                    {text('contact.formTitle', 'Send us a message')}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {text(
                      'contact.formDescription',
                      'Fill in the form below and our team will contact you.'
                    )}
                  </p>

                  <div className="mt-8 grid gap-6 md:grid-cols-2">

                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        {text('contact.name', 'Name')}
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        {text('contact.email', 'Email')}
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                      />
                    </div>

                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      {text('contact.subject', 'Subject')}
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      {text('contact.message', 'Message')}
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-900 px-6 py-3 font-medium text-white hover:bg-blue-800"
                  >
                    {text('contact.send', 'Send message')}
                  </button>

                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-600 px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl text-center">

          <h2 className="text-3xl font-bold md:text-4xl">
            {text(
              'contact.ctaTitle',
              'Be part of Africa’s economic transformation.'
            )}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-teal-50">
            {text(
              'contact.ctaDescription',
              'Join the Africa Economic Forum community and connect with leaders, investors, institutions and partners across the continent.'
            )}
          </p>

          <Link
            to={`/${i18n.language}/join`}
            className="mt-8 inline-flex items-center rounded-md bg-white px-6 py-3 font-semibold text-teal-700 hover:bg-gray-100"
          >
            {text('contact.ctaButton', 'Join us')}
          </Link>

        </div>
      </section>

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

                  <span className="text-gray-500">
                    •
                  </span>

                  <button
                    onClick={() =>
                      i18n.changeLanguage('zh')
                    }
                    className="text-gray-300 hover:text-white cursor-pointer"
                  >
                    ZH
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 pt-8">

            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6">

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
