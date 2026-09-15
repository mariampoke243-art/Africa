import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { aefInitiatives } from '../../data/aefData';
import { forums } from '../meetings/forumsData';
import { spotlightArticles } from '../../data/spotlightData';
import { listeIntervenants } from '../../data/intervenantsData';

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    navigate('/');
  };

  const handleNewsletterSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newsletterEmail.trim()) {
      setNewsletterMessage('Veuillez entrer votre adresse email.');
      return;
    }

    setNewsletterMessage(
      'Merci. Vous êtes maintenant inscrit à notre newsletter.'
    );
    setNewsletterEmail('');
  };

  const intervenantsConfirmes = listeIntervenants
    .filter((intervenant) => intervenant.statut === 'Confirmé')
    .slice(0, 4);

  const dirigeantsInvites = listeIntervenants
    .filter((intervenant) => intervenant.statut === 'Invité')
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-gray-950"
          >
            AEF
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            <Link to="/" className="text-sm text-gray-700 hover:text-black">
              Home
            </Link>

            <Link
              to="/about"
              className="text-sm text-gray-700 hover:text-black"
            >
              About
            </Link>

            <Link
              to="/initiatives"
              className="text-sm text-gray-700 hover:text-black"
            >
              Initiative
            </Link>

            <Link
              to="/stakeholders"
              className="text-sm text-gray-700 hover:text-black"
            >
              Stakeholders
            </Link>

            <Link
              to="/agenda"
              className="text-sm text-gray-700 hover:text-black"
            >
              Agenda
            </Link>

            <Link
              to="/publications"
              className="text-sm text-gray-700 hover:text-black"
            >
              Publications
            </Link>

            <Link
              to="/meetings"
              className="text-sm text-gray-700 hover:text-black"
            >
              Meetings
            </Link>

            <Link
              to="/contact"
              className="text-sm text-gray-700 hover:text-black"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative hidden lg:block" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-800"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </span>

                  <span>Profile</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-48 border border-gray-200 bg-white p-2 shadow-xl">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      Mon profil
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden text-sm font-medium text-gray-800 lg:block"
              >
                Login
              </Link>
            )}

            <button
              type="button"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="block h-0.5 w-6 bg-gray-900" />
              <span className="mt-1.5 block h-0.5 w-6 bg-gray-900" />
              <span className="mt-1.5 block h-0.5 w-6 bg-gray-900" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white px-6 py-5 lg:hidden">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-gray-700"
              >
                Home
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-gray-700"
              >
                About
              </Link>

              <Link
                to="/initiatives"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-gray-700"
              >
                Initiative
              </Link>

              <Link
                to="/stakeholders"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-gray-700"
              >
                Stakeholders
              </Link>

              <Link
                to="/agenda"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-gray-700"
              >
                Agenda
              </Link>

              <Link
                to="/publications"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-gray-700"
              >
                Publications
              </Link>

              <Link
                to="/meetings"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-gray-700"
              >
                Meetings
              </Link>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-gray-700"
              >
                Contact
              </Link>

              <Link
                to="/intervenants"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-[#166534]"
              >
                Intervenants
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="bg-[#f7f7f5] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#166534]">
                Africa Economic Forum 2026 • 10–11 Nov • Kinshasa
              </p>

              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-gray-950 md:text-6xl lg:text-7xl">
                Africa Economic
                <br />
                Forum
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-gray-600">
                Un espace de dialogue stratégique pour connecter les décideurs,
                investisseurs, entreprises et institutions autour des grandes
                transformations économiques de l'Afrique.
              </p>

              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
                >
                  About AEF
                </Link>
              </div>
            </div>

            <div className="overflow-hidden bg-black">
              <video
                src="/videos/aef-video.mp4"
                className="aspect-video w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>
          </div>
        </div>
      </section>

      {/* How we drive impact */}
      <section className="px-6 py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#166534]">
              Our approach
            </p>

            <h2 className="text-4xl font-semibold tracking-tight text-gray-950 md:text-5xl">
              How we drive impact
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              AEF transforme le dialogue économique en opportunités concrètes
              grâce à des initiatives stratégiques, des rencontres ciblées et
              des partenariats à fort impact.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aefInitiatives.map((initiative) => (
              <article
                key={initiative.id}
                className="border border-gray-200 p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 text-3xl">
                  {initiative.icon || '→'}
                </div>

                <h3 className="text-xl font-semibold text-gray-950">
                  {initiative.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                  {initiative.description}
                </p>

                <Link
                  to={initiative.link || '#'}
                  className="mt-6 inline-flex text-sm font-semibold text-[#166534]"
                >
                  Learn more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Meetings */}
      <section className="bg-[#f7f7f5] px-6 py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#166534]">
                Connect
              </p>

              <h2 className="text-4xl font-semibold tracking-tight text-gray-950 md:text-5xl">
                Our Meetings
              </h2>
            </div>

            <Link
              to="/meetings"
              className="text-sm font-semibold text-[#166534]"
            >
              View all meetings →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {forums.slice(0, 3).map((forum) => (
              <article
                key={forum.id}
                className="overflow-hidden border border-gray-200 bg-white"
              >
                {forum.image && (
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={forum.image}
                      alt={forum.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#166534]">
                    {forum.date}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold text-gray-950">
                    {forum.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    {forum.description}
                  </p>

                  <Link
                    to={`/meetings/${forum.id}`}
                    className="mt-6 inline-flex text-sm font-semibold text-gray-900"
                  >
                    Discover meeting →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight */}
      <section className="px-6 py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#166534]">
                Insights
              </p>

              <h2 className="text-4xl font-semibold tracking-tight text-gray-950 md:text-5xl">
                Spotlight
              </h2>
            </div>

            <Link
              to="/spotlight"
              className="text-sm font-semibold text-[#166534]"
            >
              View all stories →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {spotlightArticles.slice(0, 4).map((article) => (
              <article
                key={article.id}
                className="overflow-hidden border border-gray-200 bg-white"
              >
                {article.image && (
                  <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#166534]">
                    {article.category}
                  </p>

                  <h3 className="mt-3 text-lg font-semibold leading-7 text-gray-950">
                    {article.title}
                  </h3>

                  <Link
                    to={`/spotlight/${article.id}`}
                    className="mt-5 inline-flex text-sm font-semibold text-gray-900"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Intervenants */}
      <section className="border-t border-gray-100 bg-white px-6 py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Intro */}
          <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#166534]">
                Africa Economic Forum 2026
              </p>

              <h2 className="text-4xl font-semibold tracking-tight text-gray-950 md:text-5xl lg:text-6xl">
                Intervenants
              </h2>

              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 md:text-base">
                LES PERSONNES QUI FAÇONNENT LA CONVERSATION.
              </p>

              <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
                L'AEF réunit les décideurs et les voix qui façonnent la relation
                de l'Afrique avec le capital mondial, la technologie, l'énergie,
                le commerce et l'investissement stratégique.
              </p>
            </div>

            <Link
              to="/intervenants"
              className="inline-flex w-fit shrink-0 border border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              Voir tous les intervenants →
            </Link>
          </div>

          {/* Confirmed */}
          <div>
            <div className="mb-7 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#166534]">
                  AEF 2026
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-gray-950">
                  Intervenants confirmés
                </h3>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {intervenantsConfirmes.map((intervenant) => (
                <Link
                  key={intervenant.id}
                  to="/intervenants"
                  className="group overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                    <img
                      src={intervenant.photoUrl}
                      alt={intervenant.nom}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-3 top-3">
                      <span className="bg-[#166534] px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white">
                        Confirmé
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="text-lg font-semibold leading-tight text-gray-950">
                      {intervenant.nom}
                    </h4>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {intervenant.titre}
                    </p>

                    {intervenant.institution && (
                      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                        {intervenant.institution}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Invited */}
          {dirigeantsInvites.length > 0 && (
            <div className="mt-16">
              <div className="mb-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a16207]">
                  AEF 2026
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-gray-950">
                  Dirigeants invités
                </h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {dirigeantsInvites.map((intervenant) => (
                  <Link
                    key={intervenant.id}
                    to="/intervenants"
                    className="group flex overflow-hidden border border-gray-200 bg-[#f7f7f5] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative w-32 shrink-0 overflow-hidden bg-gray-100 sm:w-40">
                      <img
                        src={intervenant.photoUrl}
                        alt={intervenant.nom}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-center p-5">
                      <span className="mb-3 w-fit bg-[#a16207] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.13em] text-white">
                        Invité
                      </span>

                      <h4 className="text-lg font-semibold leading-tight text-gray-950">
                        {intervenant.nom}
                      </h4>

                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                        {intervenant.titre}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Mobile / bottom CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/intervenants"
              className="inline-flex border border-gray-900 bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-black"
            >
              Découvrir tous les intervenants
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#166534] px-6 py-16 text-white lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Stay informed
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Subscribe to the AEF newsletter
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/80">
                Receive updates about AEF 2026, speakers, meetings,
                publications and strategic initiatives.
              </p>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                placeholder="Your email address"
                className="min-h-12 flex-1 border border-white/20 bg-white px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />

              <button
                type="submit"
                className="min-h-12 bg-gray-950 px-6 text-sm font-semibold text-white transition hover:bg-black"
              >
                Subscribe
              </button>
            </form>
          </div>

          {newsletterMessage && (
            <p className="mt-5 text-sm text-white/80">
              {newsletterMessage}
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 px-6 py-14 text-white lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold">Africa Economic Forum</h3>

              <p className="mt-4 max-w-xs text-sm leading-7 text-white/60">
                A platform for strategic dialogue, investment and economic
                transformation across Africa.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold">About us</h4>

              <div className="mt-5 flex flex-col gap-3 text-sm text-white/60">
                <Link to="/about" className="hover:text-white">
                  About AEF
                </Link>

                <Link to="/stakeholders" className="hover:text-white">
                  Stakeholders
                </Link>

                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold">More from Forum</h4>

              <div className="mt-5 flex flex-col gap-3 text-sm text-white/60">
                <Link to="/initiatives" className="hover:text-white">
                  Initiatives
                </Link>

                <Link to="/meetings" className="hover:text-white">
                  Meetings
                </Link>

                <Link to="/intervenants" className="hover:text-white">
                  Intervenants
                </Link>

                <Link to="/publications" className="hover:text-white">
                  Publications
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Quick links</h4>

              <div className="mt-5 flex flex-col gap-3 text-sm text-white/60">
                <Link to="/agenda" className="hover:text-white">
                  Agenda
                </Link>

                <Link to="/spotlight" className="hover:text-white">
                  Spotlight
                </Link>

                <Link to="/privacy" className="hover:text-white">
                  Privacy
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-7 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
            <p>
              © 2026 Africa Economic Forum. All rights reserved.
            </p>

            <p>
              Code Design Global
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
