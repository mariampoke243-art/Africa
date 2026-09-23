import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  spotlightArticles,
  spotlightCategories,
  type SpotlightCategoryFilter,
} from '../../data/spotlightData';

export default function SpotlightPage() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [activeCategory, setActiveCategory] =
    useState<SpotlightCategoryFilter>('all');

  // ============================================================
  // ARTICLE SÉLECTIONNÉ
  // ============================================================

  const selectedArticle = id
    ? spotlightArticles.find((article) => article.id === Number(id))
    : null;

  // ============================================================
  // ARTICLES FILTRÉS
  // ============================================================

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'all') {
      return spotlightArticles;
    }

    return spotlightArticles.filter(
      (article) => article.category === activeCategory
    );
  }, [activeCategory]);

  // ============================================================
  // TRADUCTIONS DES ARTICLES
  // ============================================================

  const getArticleTitle = (key: string) =>
    t(`spotlight.articles.${key}.title`);

  const getArticleDescription = (key: string) =>
    t(`spotlight.articles.${key}.description`);

  const getArticleContent = (key: string): string[] => {
    const content = t(`spotlight.articles.${key}.content`, {
      returnObjects: true,
    });

    return Array.isArray(content) ? content : [];
  };

  // ============================================================
  // PAGE ARTICLE INDIVIDUEL
  // ============================================================

  if (selectedArticle) {
    const articleTitle = getArticleTitle(selectedArticle.key);
    const articleContent = getArticleContent(selectedArticle.key);

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
                {t('spotlight.home')}
              </Link>

              <span>/</span>

              <Link
                to="/spotlight"
                className="hover:text-blue-700 transition"
              >
                {t('spotlight.title')}
              </Link>

              <span>/</span>

              <span className="text-gray-900">
                {t(
                  `spotlight.categories.${selectedArticle.category}`
                )}
              </span>

            </div>
          </div>
        </div>

        {/* ARTICLE */}
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

          {/* CATEGORY */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 text-blue-900 font-semibold mb-10">
            {t(
              `spotlight.categories.${selectedArticle.category}`
            )}
          </div>

          {/* TITLE */}
          <h1 className="max-w-5xl text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-10">
            {articleTitle}
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
                {t('spotlight.publicRelationsTeam')}
              </p>

              <p className="text-gray-500">
                {t(selectedArticle.dateKey)}
              </p>

            </div>

          </div>

          {/* IMAGE */}
          <div className="mb-14">

            <img
              src={selectedArticle.image}
              alt={articleTitle}
              className="w-full max-h-[650px] object-cover rounded-2xl shadow-lg"
            />

          </div>

          {/* LONG ARTICLE CONTENT */}
          <div className="max-w-5xl mx-auto">

            {articleContent.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 text-lg md:text-xl leading-9 mb-8"
              >
                {paragraph}
              </p>
            ))}

          </div>

          {/* BACK TO SPOTLIGHT */}
          <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-gray-200">

            <Link
              to="/spotlight"
              className="inline-flex items-center text-blue-900 font-semibold hover:text-blue-700 transition"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              {t('spotlight.backToSpotlight')}
            </Link>

          </div>

        </article>

      </div>
    );
  }

  // ============================================================
  // PAGE SPOTLIGHT
  // ============================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-700 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          <div className="max-w-4xl">

            <p className="text-blue-200 uppercase tracking-wider text-sm font-semibold mb-4">
              {t('spotlight.africaEconomicForum')}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              {t('spotlight.title')}
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-6">
              {t('spotlight.subtitle')}
            </p>

            <p className="text-blue-100 text-lg leading-relaxed max-w-3xl">
              {t('spotlight.description')}
            </p>

          </div>

        </div>

      </section>

      {/* CONTENT */}
      <section className="py-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* FILTERS */}
          <div className="flex flex-wrap gap-3 mb-10">

            {spotlightCategories.map((category) => (

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
                {t(`spotlight.categories.${category}`)}
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
                      alt={getArticleTitle(article.key)}
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
                        {t(
                          `spotlight.categories.${article.category}`
                        )}
                      </span>

                      <span className="text-gray-300">
                        •
                      </span>

                      <span className="text-sm text-gray-500">
                        {t(article.dateKey)}
                      </span>

                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {getArticleTitle(article.key)}
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {getArticleDescription(article.key)}
                    </p>

                    {/* LIEN VERS L'ARTICLE */}
                    <Link
                      to={`/spotlight/${article.id}`}
                      className="inline-flex items-center text-blue-900 font-semibold hover:text-blue-700 transition"
                    >
                      {t('spotlight.readMore')}

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
                {t('spotlight.noArticles')}
              </p>

            </div>
          )}

        </div>

      </section>

    </div>
  );
}
