import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-700 text-xl font-bold text-white">
              A
            </div>

            <div>
              <div className="text-lg font-bold text-gray-900">
                Africa
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-500">
                Economic Forum
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-6 lg:flex">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 transition hover:text-teal-700"
            >
              {text('header.home', 'Home')}
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-gray-700 transition hover:text-teal-700"
            >
              {text('header.about', 'About')}
            </Link>

            <Link
              to="/initiatives"
              className="text-sm font-medium text-gray-700 transition hover:text-teal-700"
            >
              {text('header.initiatives', 'Initiatives')}
            </Link>

            <Link
              to="/meetings"
              className="text-sm font-medium text-gray-700 transition hover:text-teal-700"
            >
              {text('header.meetings', 'Meetings')}
            </Link>

            <Link
              to="/agenda"
              className="text-sm font-medium text-gray-700 transition hover:text-teal-700"
            >
              {text('header.agenda', 'Agenda')}
            </Link>

            <Link
              to="/stakeholders"
              className="text-sm font-medium text-gray-700 transition hover:text-teal-700"
            >
              {text('header.stakeholders', 'Stakeholders')}
            </Link>

            <Link
              to="/publications"
              className="text-sm font-medium text-gray-700 transition hover:text-teal-700"
            >
              {text('header.publications', 'Publications')}
            </Link>

            <Link
              to="/contact"
              className="text-sm font-semibold text-teal-700"
            >
              {text('header.contact', 'Contact')}
            </Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => changeLanguage('fr')}
              className={`rounded-md px-2 py-1 text-sm ${
                i18n.language.startsWith('fr')
                  ? 'font-bold text-teal-700'
                  : 'text-gray-500'
              }`}
            >
              FR
            </button>

            <button
              type="button"
              onClick={() => changeLanguage('en')}
              className={`rounded-md px-2 py-1 text-sm ${
                i18n.language.startsWith('en')
                  ? 'font-bold text-teal-700'
                  : 'text-gray-500'
              }`}
            >
              EN
            </button>

            <button
              type="button"
              onClick={() => navigate('/join')}
              className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              {text('header.join', 'Join us')}
            </button>
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-xl lg:hidden"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white px-6 py-5 lg:hidden">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-medium text-gray-700"
              >
                {text('header.home', 'Home')}
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-medium text-gray-700"
              >
                {text('header.about', 'About')}
              </Link>

              <Link
                to="/initiatives"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-medium text-gray-700"
              >
                {text('header.initiatives', 'Initiatives')}
              </Link>

              <Link
                to="/meetings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-medium text-gray-700"
              >
                {text('header.meetings', 'Meetings')}
              </Link>

              <Link
                to="/agenda"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-medium text-gray-700"
              >
                {text('header.agenda', 'Agenda')}
              </Link>

              <Link
                to="/stakeholders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-medium text-gray-700"
              >
                {text('header.stakeholders', 'Stakeholders')}
              </Link>

              <Link
                to="/publications"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-medium text-gray-700"
              >
                {text('header.publications', 'Publications')}
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-semibold text-teal-700"
              >
                {text('header.contact', 'Contact')}
              </Link>

              <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
                <button
                  type="button"
                  onClick={() => changeLanguage('fr')}
                  className="font-medium text-gray-700"
                >
                  FR
                </button>

                <button
                  type="button"
                  onClick={() => changeLanguage('en')}
                  className="font-medium text-gray-700"
                >
                  EN
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate('/join');
                  }}
                  className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
                >
                  {text('header.join', 'Join us')}
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="bg-gray-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-teal-400">
              {text('contactPage.label', 'Get in touch')}
            </p>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              {text('contactPage.title', 'Contact Africa Economic Forum')}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
              {text(
                'contactPage.subtitle',
                'We welcome your questions, ideas, partnerships and opportunities for collaboration across Africa.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-5">
          {/* CONTACT INFORMATION */}
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">
              {text('contactPage.informationLabel', 'Contact information')}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {text('contactPage.informationTitle', 'Let’s start a conversation')}
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              {text(
                'contactPage.informationText',
                'Whether you are an institution, company, investor, partner or member of the African economic community, our team is available to hear from you.'
              )}
            </p>

            <div className="mt-10 space-y-6">
              {/* EMAIL */}
              <div className="rounded-2xl border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xl">
                    ✉
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {text('contactPage.emailTitle', 'Email')}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {text(
                        'contactPage.emailText',
                        'For general enquiries and partnership requests'
                      )}
                    </p>

                    <a
                      href="mailto:contact@africaeconomicforum.com"
                      className="mt-2 inline-block font-medium text-teal-700 hover:text-teal-800"
                    >
                      contact@africaeconomicforum.com
                    </a>
                  </div>
                </div>
              </div>

              {/* LOCATION */}
              <div className="rounded-2xl border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xl">
                    ◉
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {text('contactPage.locationTitle', 'Location')}
                    </h3>

                    <p className="mt-1 leading-6 text-gray-600">
                      {text(
                        'contactPage.locationText',
                        'Africa Economic Forum'
                      )}
                      <br />
                      {text(
                        'contactPage.locationRegion',
                        'Democratic Republic of the Congo'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* RESPONSE */}
              <div className="rounded-2xl border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xl">
                    ◷
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {text('contactPage.responseTitle', 'Response')}
                    </h3>

                    <p className="mt-1 leading-6 text-gray-600">
                      {text(
                        'contactPage.responseText',
                        'Our team will review your message and respond as soon as possible.'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {text('contactPage.formTitle', 'Send us a message')}
              </h2>

              <p className="mt-2 text-gray-600">
                {text(
                  'contactPage.formSubtitle',
                  'Complete the form below and our team will get back to you.'
                )}
              </p>

              {isSubmitted && (
                <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                  {text(
                    'contactPage.success',
                    'Thank you. Your message has been received.'
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      {text('contactPage.firstName', 'First name')}
                    </label>

                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      {text('contactPage.lastName', 'Last name')}
                    </label>

                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      {text('contactPage.email', 'Email')}
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="organization"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      {text('contactPage.organization', 'Organization')}
                    </label>

                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {text('contactPage.subject', 'Subject')}
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    {text('contactPage.message', 'Message')}
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    required
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-teal-700 px-6 py-3.5 font-semibold text-white transition hover:bg-teal-800"
                >
                  {text('contactPage.send', 'Send message')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-700 px-6 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold">
              {text(
                'contactPage.ctaTitle',
                'Be part of Africa’s economic conversation'
              )}
            </h2>

            <p className="mt-3 leading-7 text-teal-50">
              {text(
                'contactPage.ctaText',
                'Discover our meetings, initiatives and opportunities to connect with stakeholders across the continent.'
              )}
            </p>
          </div>

          <Link
            to="/meetings"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-teal-800 transition hover:bg-gray-100"
          >
            {text('contactPage.ctaButton', 'Explore meetings')}
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 px-6 py-12 text-gray-300">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="inline-block">
              <div className="text-xl font-bold text-white">
                Africa
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-500">
                Economic Forum
              </div>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              {text(
                'footer.description',
                'Connecting African stakeholders and supporting economic dialogue and cooperation.'
              )}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {text('footer.explore', 'Explore')}
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link to="/about" className="hover:text-white">
                {text('header.about', 'About')}
              </Link>

              <Link to="/initiatives" className="hover:text-white">
                {text('header.initiatives', 'Initiatives')}
              </Link>

              <Link to="/meetings" className="hover:text-white">
                {text('header.meetings', 'Meetings')}
              </Link>

              <Link to="/agenda" className="hover:text-white">
                {text('header.agenda', 'Agenda')}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {text('footer.resources', 'Resources')}
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link to="/publications" className="hover:text-white">
                {text('header.publications', 'Publications')}
              </Link>

              <Link to="/gallery" className="hover:text-white">
                {text('header.gallery', 'Gallery')}
              </Link>

              <Link to="/partners" className="hover:text-white">
                {text('header.partners', 'Partners')}
              </Link>

              <Link to="/contact" className="text-teal-400">
                {text('header.contact', 'Contact')}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {text('footer.connect', 'Connect')}
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              {text(
                'footer.connectText',
                'For partnerships, enquiries and collaboration opportunities, contact our team.'
              )}
            </p>

            <a
              href="mailto:contact@africaeconomicforum.com"
              className="mt-3 inline-block text-sm text-teal-400 hover:text-teal-300"
            >
              contact@africaeconomicforum.com
            </a>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-gray-800 pt-6 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Africa Economic Forum.{' '}
            {text('footer.rights', 'All rights reserved.')}
          </p>

          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">
              {text('footer.privacy', 'Privacy')}
            </Link>

            <button
              type="button"
              onClick={() => changeLanguage('fr')}
              className="hover:text-white"
            >
              Français
            </button>

            <button
              type="button"
              onClick={() => changeLanguage('en')}
              className="hover:text-white"
            >
              English
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
