import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { aefInitiatives } from '../../data/aefData';
import { spotlightArticles } from '../../data/spotlightData';
import { forums } from '../meetings/forumsData';

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentInitiative, setCurrentInitiative] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const initiativeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  useEffect(() => {
    if (isPaused) return;

    initiativeIntervalRef.current = setInterval(() => {
      setCurrentInitiative((prev) => (prev + 1) % aefInitiatives.length);
    }, 5000);

    return () => {
      if (initiativeIntervalRef.current) {
        clearInterval(initiativeIntervalRef.current);
      }
    };
  }, [isPaused]);

  const nextInitiative = () => {
    setCurrentInitiative(
      (prev) => (prev + 1) % aefInitiatives.length
    );
  };

  const previousInitiative = () => {
    setCurrentInitiative(
      (prev) =>
        (prev - 1 + aefInitiatives.length) % aefInitiatives.length
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative min-h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Africa Economic Forum"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl text-white">
            <p className="text-blue-200 uppercase tracking-widest text-sm font-semibold mb-5">
              Africa Economic Forum
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Empowering Africa&apos;s Economic Future
            </h1>

            <p className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-8">
              A premier platform convening leaders, governments, investors,
              and thinkers to shape Africa&apos;s role in the new global order.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/about"
                className="bg-blue-900 hover:bg-blue-800 text-white px-7 py-3 rounded-md font-semibold transition"
              >
                Discover AEF
              </Link>

              <Link
                to="/join"
                className="bg-white hover:bg-gray-100 text-blue-900 px-7 py-3 rounded-md font-semibold transition"
              >
                Join the Forum
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DISCOVER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-5">
              How We Drive Impact
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              Through strategic initiatives, partnerships, and platforms, we
              create tangible pathways for Africa&apos;s economic transformation
              and global leadership.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-blue-900 text-white rounded-lg flex items-center justify-center mb-5">
                <i className="ri-discuss-line text-xl"></i>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Strategic Dialogue Platforms
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Creating spaces for meaningful conversations between African
                leaders and global partners.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-blue-900 text-white rounded-lg flex items-center justify-center mb-5">
                <i className="ri-links-line text-xl"></i>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Partnership Facilitation
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Connecting African opportunities with global capital,
                technology, and expertise.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-blue-900 text-white rounded-lg flex items-center justify-center mb-5">
                <i className="ri-lightbulb-line text-xl"></i>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Innovation Acceleration
              </h3>

              <p className="text-gray-600 leading-relaxed">
                Supporting breakthrough solutions that address Africa&apos;s
                most pressing challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INITIATIVES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Strategic Initiatives
              </h2>

              <p className="text-gray-600 text-lg">
                Platforms designed to accelerate Africa&apos;s economic
                transformation.
              </p>
            </div>

            <Link
              to="/initiatives"
              className="text-blue-900 font-semibold inline-flex items-center"
            >
              View All Initiatives
              <i className="ri-arrow-right-line ml-2"></i>
            </Link>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {aefInitiatives.length > 0 && (
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="grid lg:grid-cols-2">
                  <div className="h-72 lg:h-[420px]">
                    <img
                      src={aefInitiatives[currentInitiative].image}
                      alt={aefInitiatives[currentInitiative].title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <p className="text-blue-600 font-semibold text-sm mb-3">
                      Strategic Initiative
                    </p>

                    <h3 className="text-3xl font-bold text-gray-900 mb-5">
                      {aefInitiatives[currentInitiative].title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-7">
                      {aefInitiatives[currentInitiative].description}
                    </p>

                    <Link
                      to="/initiatives"
                      className="inline-flex items-center text-blue-900 font-semibold"
                    >
                      Learn More
                      <i className="ri-arrow-right-line ml-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {aefInitiatives.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={previousInitiative}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100"
                  aria-label="Previous initiative"
                >
                  <i className="ri-arrow-left-line"></i>
                </button>

                <button
                  type="button"
                  onClick={nextInitiative}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100"
                  aria-label="Next initiative"
                >
                  <i className="ri-arrow-right-line"></i>
                </button>
              </>
            )}
          </div>

          {aefInitiatives.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {aefInitiatives.map((initiative, index) => (
                <button
                  key={initiative.id ?? index}
                  type="button"
                  onClick={() => setCurrentInitiative(index)}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    index === currentInitiative
                      ? 'bg-blue-900'
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to initiative ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MEETINGS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Meetings
              </h2>

              <p className="text-gray-600 text-lg">
                Explore our key meetings addressing Africa&apos;s most
                pressing economic challenges.
              </p>
            </div>

            <Link
              to="/meetings"
              className="text-blue-900 font-semibold inline-flex items-center"
            >
              View All Meetings
              <i className="ri-arrow-right-line ml-2"></i>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {forums.map((forum) => (
              <Link
                key={forum.id}
                to="/meetings"
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="h-52 overflow-hidden bg-gray-100">
                  <img
                    src={forum.image}
                    alt={forum.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {forum.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {forum.description}
                  </p>

                  <div className="mt-5 text-blue-900 font-semibold inline-flex items-center">
                    Read More
                    <i className="ri-arrow-right-line ml-2"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SPOTLIGHT */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Spotlight
              </h2>

              <p className="text-gray-600 text-lg">
                AEF Strategic Announcements &amp; Institutional Milestones
              </p>
            </div>

            <Link
              to="/spotlight"
              className="bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium inline-flex items-center space-x-2 whitespace-nowrap"
            >
              <span>View All Articles</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {spotlightArticles.length > 0 && (
              <div className="lg:col-span-2">
                <Link
                  to="/spotlight"
                  className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-64 md:h-80 overflow-hidden bg-gray-100">
                    <img
                      src={spotlightArticles[0].image}
                      alt={spotlightArticles[0].title}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-blue-600 font-medium text-sm">
                        {spotlightArticles[0].category}
                      </span>

                      <span className="text-gray-300">•</span>

                      <span className="text-gray-500 text-sm">
                        {spotlightArticles[0].date}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
                      {spotlightArticles[0].title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {spotlightArticles[0].description}
                    </p>

                    <div className="mt-5 text-blue-900 font-semibold inline-flex items-center">
                      Read More
                      <i className="ri-arrow-right-line ml-2"></i>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            <div className="space-y-6">
              {spotlightArticles.slice(1, 5).map((article) => (
                <Link
                  key={article.id}
                  to="/spotlight"
                  className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex">
                    <div className="relative w-32 h-28 flex-shrink-0 bg-gray-100 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-4 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-blue-600 font-medium text-xs">
                          {article.category}
                        </span>

                        <span className="text-gray-300 text-xs">•</span>

                        <span className="text-gray-500 text-xs">
                          {article.date}
                        </span>
                      </div>

                      <h4 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-3">
                        {article.title}
                      </h4>

                      <div className="mt-2 text-blue-900 text-xs font-semibold">
                        Read More
                        <i className="ri-arrow-right-line ml-1"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-blue-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Stay Connected with Africa Economic Forum
          </h2>

          <p className="text-blue-100 text-lg mb-8">
            Receive strategic insights, announcements, events, and
            opportunities directly in your inbox.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-md text-gray-900 outline-none"
            />

            <button
              type="submit"
              className="bg-white text-blue-900 px-7 py-3 rounded-md font-semibold hover:bg-gray-100"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Shape Africa&apos;s Economic Future
              </h2>

              <p className="text-gray-300 leading-relaxed">
                Join a growing network of leaders, institutions, investors,
                governments, and innovators working together to build
                Africa&apos;s next economic chapter.
              </p>
            </div>

            <div className="flex flex-wrap md:justify-end gap-4">
              <Link
                to="/join"
                className="bg-blue-900 hover:bg-blue-800 text-white px-7 py-3 rounded-md font-semibold"
              >
                Become a Member
              </Link>

              <Link
                to="/contact"
                className="border border-white/30 hover:bg-white/10 text-white px-7 py-3 rounded-md font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
                          }
