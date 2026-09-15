import React from 'react';
import { Link } from 'react-router-dom';
import { listeIntervenants } from '../../data/intervenantsData';

export default function IntervenantsPage() {
  const intervenantsConfirmes = listeIntervenants.filter(
    (intervenant) => intervenant.statut === 'Confirmé'
  );

  const dirigeantsInvites = listeIntervenants.filter(
    (intervenant) => intervenant.statut === 'Invité'
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#f7f7f5] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#166534]">
              Africa Economic Forum 2026
            </p>

            <h1 className="text-5xl font-semibold tracking-tight text-gray-950 md:text-6xl lg:text-7xl">
              Intervenants
            </h1>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-gray-600 md:text-base">
              LES PERSONNES QUI FAÇONNENT LA CONVERSATION.
            </p>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              « L'AEF réunit les décideurs et les voix qui façonnent la
              relation de l'Afrique avec le capital mondial, la technologie,
              l'énergie, le commerce et l'investissement stratégique. »
            </p>

            <p className="mt-6 max-w-3xl text-base leading-7 text-gray-500">
              Catégories : chefs d'État, dirigeants gouvernementaux,
              investisseurs, PDG, stratèges économiques, dirigeants financiers
              et experts sectoriels.
            </p>
          </div>
        </div>
      </section>

      {/* Confirmed speakers */}
      <section className="px-6 py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#166534]">
                AEF 2026
              </p>

              <h2 className="text-3xl font-semibold tracking-tight text-gray-950 md:text-4xl">
                Intervenants confirmés
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-gray-500">
              Découvrez les dirigeants et experts qui participeront aux
              conversations stratégiques de l'édition 2026.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {intervenantsConfirmes.map((intervenant) => (
              <article
                key={intervenant.id}
                className="group overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <img
                    src={intervenant.photoUrl}
                    alt={intervenant.nom}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4">
                    <span className="inline-flex bg-[#166534] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                      Confirmé
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold leading-tight text-gray-950">
                    {intervenant.nom}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {intervenant.titre}
                  </p>

                  {intervenant.institution && (
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                      {intervenant.institution}
                    </p>
                  )}

                  {intervenant.domaineStrategique && (
                    <p className="mt-2 text-xs text-[#166534]">
                      {intervenant.domaineStrategique}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Invited leaders */}
      <section className="border-t border-gray-100 bg-[#f7f7f5] px-6 py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#a16207]">
              AEF 2026
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-gray-950 md:text-4xl">
              Dirigeants invités
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-gray-500">
              Une sélection de personnalités invitées à prendre part aux
              échanges de l'Africa Economic Forum.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {dirigeantsInvites.map((intervenant) => (
              <article
                key={intervenant.id}
                className="group overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <img
                    src={intervenant.photoUrl}
                    alt={intervenant.nom}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4">
                    <span className="inline-flex bg-[#a16207] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                      Invité
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold leading-tight text-gray-950">
                    {intervenant.nom}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {intervenant.titre}
                  </p>

                  {intervenant.institution && (
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                      {intervenant.institution}
                    </p>
                  )}

                  {intervenant.domaineStrategique && (
                    <p className="mt-2 text-xs text-[#a16207]">
                      {intervenant.domaineStrategique}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
