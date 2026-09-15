import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { spotlightArticles } from '../../data/spotlightData';

const categories = [
  'All',
  ...Array.from(
    new Set(spotlightArticles.map((article) => article.category))
  ),
];

export default function SpotlightPage() {
  const { id } = useParams();

  const [activeCategory, setActiveCategory] = useState('All');

  // Article sélectionné
  const selectedArticle = id
    ? spotlightArticles.find((article) => article.id === Number(id))
    : null;

  // Liste filtrée
  // IMPORTANT : le Hook doit être appelé avant le return conditionnel
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') {
      return spotlightArticles;
    }

    return spotlightArticles.filter(
      (article) => article.category === activeCategory
    );
  }, [activeCategory]);

  // ============================================================
  // PAGE ARTICLE INDIVIDUEL
  // ============================================================
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-white">

        {/* BREADCRUMB */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-wrap items-center gap-2 text-gray-500">

              <Link
                to="/"
                className="hover:text-blue-700 transition"
              >
                Home
              </Link>

              <span>/</span>

              <Link
                to="/spotlight"
                className="hover:text-blue-700 transition"
              >
                Spotlight
              </Link>

              <span>/</span>

              <span className="text-gray-900">
                {selectedArticle.category}
              </span>

            </div>
          </div>
        </div>

        {/* ARTICLE */}
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* CATEGORY */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 text-blue-900 font-semibold mb-10">
            {selectedArticle.category}
          </div>

          {/* TITLE */}
          <h1 className="max-w-5xl text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-10">
            {selectedArticle.title}
          </h1>

          {/* AUTHOR / DATE */}
          <div className="flex items-center gap-4 border-b border-gray-200 pb-8 mb-12">

            <div className="w-14 h-14 rounded-full overflow-hidden bg-blue-950 flex items-center justify-center flex-shrink-0">
              <img
                src="/images/logo.png"
                alt="Africa Economic Forum"
                className="w-full h-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                Africa Economic Forum Public Relations Team
              </p>

              <p className="text-gray-500">
                {selectedArticle.date}
              </p>
            </div>

          </div>

          {/* IMAGE */}
          <div className="mb-14">
            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full max-h-[650px] object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* LONG ARTICLE CONTENT */}
          <div className="max-w-5xl mx-auto">

            {selectedArticle.content &&
              selectedArticle.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-700 text-lg md:text-xl leading-9 mb-8"
                >
                  {paragraph}
                </p>
              ))}

            {/* Si aucun long contenu n'existe */}
            {!selectedArticle.content && (
              <p className="text-gray-700 text-lg md:text-xl leading-9">
                {selectedArticle.description}
              </p>
            )}

          </div>

          {/* BACK TO SPOTLIGHT */}
          <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-gray-200">

            <Link
              to="/spotlight"
              className="inline-flex items-center text-blue-900 font-semibold hover:text-blue-700 transition"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Spotlight
            </Link>

          </div>

        </article>
      </div>
    );
  }

  // ============================================================
  // PAGE SPOTLIGHT / ALL
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          <div className="max-w-4xl">

            <p className="text-blue-200 uppercase tracking-wider text-sm font-semibold mb-4">
              Africa Economic Forum
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Spotlight
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-6">
              AEF Strategic Announcements & Institutional Milestones
            </p>

            <p className="text-blue-100 text-lg leading-relaxed max-w-3xl">
              Spotlight is the official platform for Africa Economic Forum's
              major partnerships, flagship initiatives, institutional
              announcements, and strategic thought leadership shaping Africa's
              role in global realignments.
            </p>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="py-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3 mb-10">

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                  activeCategory === category
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}

          </div>

          {/* ARTICLES */}
          <div className="space-y-8">

            {filteredArticles.map((article) => (

              <article
                key={article.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >

                <div className="grid md:grid-cols-3">

                  {/* IMAGE */}
                  <div className="h-64 md:h-full min-h-[260px] bg-gray-100">

                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />

                  </div>

                  {/* CONTENT */}
                  <div className="md:col-span-2 p-6 md:p-8">

                    <div className="flex flex-wrap items-center gap-3 mb-4">

                      <span className="text-sm font-semibold text-teal-600">
                        {article.category}
                      </span>

                      <span className="text-gray-300">
                        •
                      </span>

                      <span className="text-sm text-gray-500">
                        {article.date}
                      </span>

                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {article.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {article.description}
                    </p>

                    {/* LIEN VERS L'ARTICLE */}
                    <Link
                      to={`/spotlight/${article.id}`}
                      className="inline-flex items-center text-blue-900 font-semibold hover:text-blue-700 transition"
                    >
                      Read More
                      <i className="ri-arrow-right-line ml-2"></i>
                    </Link>

                  </div>

                </div>

              </article>

            ))}

          </div>

          {/* NO RESULTS */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">
                No Spotlight articles found.
              </p>
            </div>
          )}

        </div>

      </section>

    </div>
  );
                    }
