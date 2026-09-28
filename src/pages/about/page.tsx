import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

/* =========================================================
   TYPES
========================================================= */

type CommitteeMember = {
  name: string;
  role: string;
  image: string;
  bio?: string;
  translationKey?: string;
};

/* =========================================================
   COMMITTEE MEMBERS
========================================================= */

const advisoryBoard: CommitteeMember[] = [
  {
    name: "H.E. John Agyekum Kufuor",
    role: "Former President of Ghana (2001–2009)",
    image: "/images/H.E John Agyekum Kufuor.jpg",
    translationKey: "johnAgyekumKufuor",
  },
  {
    name: "H.E. Ameenah Gurib-Fakim",
    role: "Former President of Mauritius (2015–2018)",
    image: "/images/ameenah-gurib-fakim.jpg",
    translationKey: "ameenahGuribFakim",
  },
  {
    name: "H.E. Rosalia Arteaga",
    role: "Former President of Ecuador",
    image: "/images/H.E Rosalia Arteaga.jpg",
    translationKey: "rosaliaArteaga",
  },
  {
    name: "H.E. Ana Helena Chacón",
    role: "Former Vice President of Costa Rica (2014–2018)",
    image: "/images/ana-helena-chacon.jpg",
    translationKey: "anaHelenaChaconEcheverria",
  },
  {
    name: "H.E. Vladimir Norov",
    role: "Former Foreign Minister of Uzbekistan",
    image: "/images/H.E Vladimir Norov.jpg",
    translationKey: "vladimirNorov",
  },
  {
    name: "Hon. Dr. Akwasi Opong-Fosu",
    role: "Advisory Board Member",
    image: "/images/Hon. Akwasi Opong-Fosu.jpg",
    translationKey: "akwasiOpongFosu",
  },
  {
    name: "H.E. Muhammad Azfar Ahsan",
    role: "Advisory Board Member, Africa Economic Forum",
    image: "/images/H.E Muhammad Azfar.jpg",
    translationKey: "muhammadAzfarAhsan",
  },
];

const executiveBoard: CommitteeMember[] = [
  {
    name: "H.E. Abraham Dwuma Odoom",
    role: "Executive Board Member and Chair of Africa Agriculture & Food Forum",
    image: "/images/Hon. Abraham Dwuma Odoom.jpg",
    translationKey: "abrahamDwumaOdoom",
  },
  {
    name: "Dr. Mike Horton",
    role: "Executive Board Member & Chair of Africa Tech Forum",
    image: "/images/Dr. Mike Horton.jpg",
    translationKey: "mikeHorton",
  },
  {
    name: "Zarinah Traci Silas, J.D.",
    role: "Peace Chair and Executive Board Member of AEF",
    image: "/images/Zarinah Traci Silas.jpg",
    translationKey: "zarinahTraciSilas",
  },
  {
    name: "Jacqueline “JaQ” Campbell",
    role: "Board Member and Chair of AEF Investors Alliance | Co-Chair, Africa Women Forum",
    image: "/images/Jacqueline_JaQ_Campbell.jpg",
    translationKey: "jacquelineJaqCampbell",
  },
  {
    name: "Afolake Oyinloye",
    role: "Member and Director of Communications and Media Relations",
    image: "/images/Afolake Oyinloye.jpg",
    translationKey: "afolakeOyinloye",
  },
  {
    name: "Dr. Femi Salami",
    role: "Executive Board Member & Chair of Africa Mining & Minerals Forum",
    image: "/images/Dr. Femi Salami.jpg",
    translationKey: "femiSalami",
  },
];

const scientificCommittee: CommitteeMember[] = [
  {
    name: "Nathan Lewis",
    role: "Scientific Committee Member",
    image: "/images/nathan-lewis.jpg",
    translationKey: "nathanLewis",
  },
  {
    name: "Amina Touré",
    role: "Scientific Committee Member",
    image: "/images/Amina Touré.jpg",
    translationKey: "aminaToure",
  },
];

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-4xl text-center">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-amber-600">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-lg leading-8 text-slate-600">
          {description}
        </p>
      )}
    </div>
  );
}

function MemberCard({
  member,
  t,
}: {
  member: CommitteeMember;
  t: (key: string, fallback?: string) => string;
}) {
  const translatedBio = member.translationKey
    ? t(`about.committee.${member.translationKey}.bio`, "")
    : "";

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/4.5] overflow-hidden bg-slate-100">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h4 className="text-xl font-bold text-slate-900">
          {member.name}
        </h4>

        <p className="mt-2 text-sm font-medium leading-6 text-amber-700">
          {member.role}
        </p>

        {translatedBio && (
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {translatedBio}
          </p>
        )}
      </div>
    </article>
  );
}

function PillarCard({
  number,
  title,
  description,
  points,
}: {
  number: string;
  title: string;
  description: string;
  points: { title: string; text: string }[];
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
          {number}
        </span>

        <div>
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
          <p className="mt-3 leading-7 text-slate-600">{description}</p>
        </div>
      </div>

      <div className="space-y-5 border-t border-slate-100 pt-6">
        {points.map((point) => (
          <div key={point.title}>
            <h4 className="font-bold text-slate-900">{point.title}</h4>
            <p className="mt-1 leading-7 text-slate-600">{point.text}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AboutPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [frameworkOpen, setFrameworkOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Initiatives", href: "/initiatives" },
    { label: "Stakeholders", href: "/stakeholders" },
    { label: "Agenda", href: "/agenda" },
    { label: "Publications", href: "/publications" },
    { label: "Meetings", href: "/meetings" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo.png"
              alt="Africa Economic Forum"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition ${
                  link.href === "/about"
                    ? "text-amber-700"
                    : "text-slate-700 hover:text-amber-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:text-amber-700"
                >
                  Sign In
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
                >
                  Join AEF
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="rounded-lg p-2 text-slate-700 lg:hidden"
            onClick={() => setMobileMenuOpen((value) => !value)}
          >
            <span className="block h-0.5 w-6 bg-current" />
            <span className="mt-1.5 block h-0.5 w-6 bg-current" />
            <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium ${
                    link.href === "/about"
                      ? "text-amber-700"
                      : "text-slate-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 flex gap-3 border-t border-slate-100 pt-4">
                {!user ? (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold"
                    >
                      Sign In
                    </button>

                    <button
                      onClick={() => navigate("/register")}
                      className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white"
                    >
                      Join AEF
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
                  >
                    Dashboard
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* =====================================================
            1. HERO
        ===================================================== */}

        <section className="relative overflow-hidden bg-slate-950">
          <div className="absolute inset-0">
            <img
              src="/images/about-hero.jpg"
              alt=""
              className="h-full w-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-slate-950/70" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 py-28 md:py-36 lg:px-8">
            <div className="max-w-4xl">
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
                Africa Economic Forum
              </p>

              <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                About the Africa Economic Forum
              </h1>

              <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
                A pan-African and global platform for strategic dialogue,
                sovereign cooperation, and long-term economic transformation.
                More than an event, the AEF is a permanent architecture for
                aligning leadership, capital, and policy to shape Africa's role
                in the world economy.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            2. WHAT WE ARE
        ===================================================== */}

        <section className="bg-white px-5 py-20 md:py-28 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionTitle
                eyebrow="About AEF"
                title="What We Are"
                description="A permanent platform for strategic cooperation, sovereign development and high-level economic alignment."
              />

              <div className="text-lg leading-8 text-slate-600">
                <p>
                  The Africa Economic Forum (AEF) is a pan-African and global
                  platform for strategic cooperation, sovereign development,
                  and high-level economic alignment.
                </p>

                <p className="mt-6">
                  It brings together African governments, global investors,
                  institutions, and thought leaders to co-create new models of
                  growth, partnership, and long-term value creation.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl">
              <img
                src="/images/about-what-we-are.jpg"
                alt="Africa Economic Forum"
                className="h-full min-h-[420px] w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            3. OUR HISTORY
        ===================================================== */}

        <section className="bg-slate-50 px-5 py-20 md:py-28 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionTitle
              eyebrow="Our Journey"
              title="Our History"
              description="From an initiative celebrating African leadership to a permanent architecture for economic cooperation."
            />

            <div className="space-y-6">
              <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                  2022 – Origins
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  The Beginning
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  The initiative began in 2022 under the name ICN Global Summit
                  and Award, created to celebrate inspiring leaders and foster
                  dialogue on Africa’s role in the world.
                </p>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                  2022 – First Edition, Kinshasa
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  The First Edition
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  The inaugural edition in Kinshasa honored Dr. Denis Mukwege
                  and Mrs. Julienne Lusenge. Senators, parliamentarians,
                  business leaders and international investors participated in
                  the gathering.
                </p>
              </article>

              {historyOpen && (
                <>
                  <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                    <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                      2023 – Second Edition, Kinshasa
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      Expanding the Reach
                    </h3>

                    <p className="mt-4 leading-8 text-slate-600">
                      The Forum returned to Kinshasa with broader recognition
                      and global reach. Speakers included H.E. Rosalía Arteaga
                      and H.E. Guy Loando, while the edition also celebrated
                      Inoss’B. Hundreds of officials, entrepreneurs and
                      investors participated.
                    </p>
                  </article>

                  <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                    <p className="text-sm font-bold uppercase tracking-wider text-amber-700">
                      2024 and Beyond – Evolution into AEF
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      The Africa Economic Forum
                    </h3>

                    <p className="mt-4 leading-8 text-slate-600">
                      The initiative evolved into the Africa Economic Forum,
                      establishing a global platform bringing together
                      governments, investors and thought leaders to drive
                      investment, shape Africa’s global agenda and build
                      equitable international partnerships.
                    </p>
                  </article>
                </>
              )}
            </div>

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setHistoryOpen((value) => !value)}
                className="rounded-full border-2 border-amber-600 px-7 py-3 font-semibold text-amber-700 transition hover:bg-amber-600 hover:text-white"
              >
                {historyOpen ? "Show Less" : "Read More"}
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            4. INSTITUTIONAL FRAMEWORK
        ===================================================== */}

        <section className="bg-white px-5 py-20 md:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionTitle
              eyebrow="Our Institutional Framework"
              title="Our Institutional Framework"
              description="A framework designed to reshape cooperation, leadership and Africa’s economic sovereignty."
            />

            <div className="space-y-10">
              {/* A */}
              <article className="rounded-3xl bg-slate-50 p-7 md:p-10">
                <span className="text-sm font-bold uppercase tracking-wider text-amber-700">
                  A
                </span>

                <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                  Win-Win, Equitable and Ethical Economic Cooperation
                </h3>

                <h4 className="mt-5 text-xl font-semibold">
                  Rethinking and Reshaping Cooperation Models with Africa
                </h4>

                <p className="mt-4 leading-8 text-slate-600">
                  The AEF advocates cooperation models that move beyond
                  dependency and asymmetry toward economic sovereignty,
                  African-owned strategies and sustainable systems change.
                </p>

                <div className="mt-7">
                  <h5 className="font-bold">Why This Rethink Matters</h5>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-xl bg-white p-5">
                      <p className="font-semibold text-slate-900">
                        Aid dependency
                      </p>
                      <p className="mt-1 text-slate-600">
                        → Economic sovereignty
                      </p>
                    </div>

                    <div className="rounded-xl bg-white p-5">
                      <p className="font-semibold text-slate-900">
                        Foreign-led agendas
                      </p>
                      <p className="mt-1 text-slate-600">
                        → African-owned strategies
                      </p>
                    </div>

                    <div className="rounded-xl bg-white p-5">
                      <p className="font-semibold text-slate-900">
                        Short-term fixes
                      </p>
                      <p className="mt-1 text-slate-600">
                        → Systems change and sustainable growth
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h5 className="font-bold">AEF Contribution</h5>

                  <ol className="mt-4 grid gap-3 md:grid-cols-2">
                    {[
                      "Platform for Policy Dialogue",
                      "Investment Matchmaking",
                      "Narrative Reset",
                      "Geopolitical Rebalancing",
                      "Inclusive Development Models",
                    ].map((item, index) => (
                      <li
                        key={item}
                        className="rounded-xl bg-white p-4 text-slate-700"
                      >
                        <span className="mr-2 font-bold text-amber-700">
                          {index + 1}.
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              </article>

              {/* B */}
              <article className="rounded-3xl bg-slate-50 p-7 md:p-10">
                <span className="text-sm font-bold uppercase tracking-wider text-amber-700">
                  B
                </span>

                <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                  Quality Leadership and Governance in Africa
                </h3>

                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {[
                    "Rethinking Leadership: From Power to Purpose",
                    "Reshaping Governance: Institutions That Serve People",
                    "New Patterns: Leadership Ecosystems & Collaborative Governance",
                    "African Solutions to African Challenges",
                    "Youth & Women as New Pillars of Governance",
                    "Strategic Actions for Change",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-xl bg-white p-5 shadow-sm"
                    >
                      <span className="text-sm font-bold text-amber-700">
                        {index + 1}
                      </span>
                      <p className="mt-2 font-semibold text-slate-900">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              {/* C */}
              <article className="rounded-3xl bg-slate-50 p-7 md:p-10">
                <span className="text-sm font-bold uppercase tracking-wider text-amber-700">
                  C
                </span>

                <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                  Africa’s Economic Sovereignty
                </h3>

                <h4 className="mt-5 text-xl font-semibold">
                  Reclaiming and Reasserting African Sovereignty: Our Fight at
                  the Africa Economic Forum
                </h4>

                <div className="mt-8 space-y-8">
                  <div>
                    <h5 className="text-lg font-bold">
                      1. Economic Sovereignty: An African Market Dominated by
                      African Products
                    </h5>
                    <p className="mt-3 leading-8 text-slate-600">
                      Strengthening local production and value-added industries,
                      accelerating African continental trade and developing
                      strategic policies that enable African economies to
                      capture greater value from their resources.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold">
                      2. Win-Win South-South and Global Cooperation Based on
                      Equality
                    </h5>
                    <p className="mt-3 leading-8 text-slate-600">
                      Building stronger South-South alliances, encouraging
                      technology and knowledge transfer, and promoting fair
                      financing and debt solutions.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold">
                      3. Media Sovereignty: Controlling Our Narrative
                    </h5>
                    <p className="mt-3 leading-8 text-slate-600">
                      Investing in Pan-African media ecosystems, supporting
                      African journalism and strengthening Africa’s ability to
                      define and communicate its own narrative.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold">
                      4. Cultural Sovereignty: Reclaiming Our Heritage
                    </h5>
                    <p className="mt-3 leading-8 text-slate-600">
                      Reclaiming cultural heritage, supporting indigenous
                      languages and strengthening Africa’s creative industries
                      and cultural institutions.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold">
                      5. Scientific Sovereignty: Innovation on Our Terms
                    </h5>
                    <p className="mt-3 leading-8 text-slate-600">
                      Developing African-led research hubs, increasing
                      investment in research and innovation and creating
                      conditions that retain African scientific talent.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold">
                      6. Philosophical Sovereignty: Decolonizing African
                      Thought
                    </h5>
                    <p className="mt-3 leading-8 text-slate-600">
                      Valuing endogenous African knowledge systems, including
                      Ubuntu, Negritude and African feminist thought, while
                      supporting critical thinking and locally relevant
                      education.
                    </p>
                  </div>
                </div>
              </article>

              {frameworkOpen && (
                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7 md:p-10">
                  <h3 className="text-2xl font-bold">
                    A Permanent Architecture for African Sovereignty
                  </h3>

                  <p className="mt-5 leading-8 text-slate-700">
                    The institutional framework of the AEF connects economic
                    cooperation, leadership, governance and sovereignty into a
                    continuous platform for strategic action.
                  </p>

                  <p className="mt-5 leading-8 text-slate-700">
                    The objective is not simply to convene conversations, but
                    to create mechanisms through which African priorities can
                    be translated into partnerships, investments, policies and
                    long-term outcomes.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setFrameworkOpen((value) => !value)}
                className="rounded-full border-2 border-amber-600 px-7 py-3 font-semibold text-amber-700 transition hover:bg-amber-600 hover:text-white"
              >
                {frameworkOpen ? "Show Less" : "Read More"}
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            5. STRATEGIC ROLE
        ===================================================== */}

        <section className="bg-slate-950 px-5 py-20 text-white md:py-28 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <SectionTitle
              eyebrow="Our Strategic Role"
              title="Our Strategic Role"
              description="The AEF is a permanent strategic platform, not a one-off event."
            />

            <div className="space-y-6 text-lg leading-8 text-slate-300">
              <p>
                The Africa Economic Forum aligns African sovereign priorities
                with global capital, policy frameworks and execution capacity
                continuously.
              </p>

              <p>
                Sector-specific forums, high-level deal rooms and year-round
                engagement enable governments, investors and institutions to
                move from dialogue to partnerships, co-investment and policy
                alignment.
              </p>

              <p>
                The AEF serves as a bridge between strategy and execution, with
                Africa setting the agenda and defining the terms of
                cooperation.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            6. OUR VISION
        ===================================================== */}

        <section className="bg-white px-5 py-20 md:py-28 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <SectionTitle eyebrow="Our Vision" title="Our Vision" />

            <div className="mx-auto max-w-4xl rounded-3xl bg-slate-50 p-8 md:p-14">
              <p className="text-2xl font-medium leading-relaxed text-slate-800 md:text-4xl">
                To position Africa as a sovereign economic power, a center of
                innovation, and a global co-leader — shaping the future through
                strategic alliances, dignified cooperation, and purpose-driven
                leadership.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            7. MESSAGE FROM CHAIRMAN
        ===================================================== */}

        <section className="bg-slate-50 px-5 py-20 md:py-28 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
              <img
                src="/images/chairman.jpg"
                alt="Chairman of the Africa Economic Forum"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-600">
                Leadership
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-5xl">
                A Message from the Chairman
              </h2>

              <div className="mt-8 space-y-5 text-lg leading-8 text-slate-600">
                <p>
                  Africa stands at a defining moment in its economic and
                  geopolitical journey. The continent has the resources,
                  talent, markets and ambition to shape its own future.
                </p>

                <p>
                  The Africa Economic Forum exists to help turn that potential
                  into strategic cooperation, investment and long-term value
                  creation.
                </p>

                <p>
                  Our ambition is to create a permanent space where African
                  leadership and global partners can meet on the basis of
                  mutual respect, shared opportunity and measurable outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            8. CONCEPT
        ===================================================== */}

        <section className="bg-white px-5 py-20 md:py-28 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <SectionTitle
              eyebrow="The AEF Model"
              title="The Concept: The Perpetual Forum & The African Table"
              description="A new approach to economic diplomacy: continuous, strategic, and sovereign."
            />

            <p className="text-lg leading-8 text-slate-600">
              The Africa Economic Forum is not a gathering. It is an
              architecture. It operates as a perpetual, year-round platform
              designed to sustain strategic engagement, strengthen
              partnerships and convert dialogue into action.
            </p>

            <div className="mt-12 rounded-3xl bg-slate-950 p-8 text-left text-white md:p-12">
              <h3 className="text-2xl font-bold md:text-3xl">
                Three interconnected pillars define the AEF Model
              </h3>

              <p className="mt-4 leading-8 text-slate-300">
                Together, these pillars create a framework for continuous
                engagement, African agenda-setting and practical execution.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            9. PERPETUAL FORUM
        ===================================================== */}

        <section className="bg-slate-50 px-5 py-20 md:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <PillarCard
              number="01"
              title="The Perpetual Forum"
              description="Unlike episodic summits, the AEF runs a continuous cycle of sector-specific forums, ensuring strategic continuity and measurable outcomes."
              points={[
                {
                  title: "Year-Round Engagement",
                  text: "Sustained dialogue between African governments, global investors, and institutions.",
                },
                {
                  title: "Sector-Driven Precision",
                  text: "From critical minerals to infrastructure, each forum zeroes in on concrete deal structures and investment vehicles.",
                },
                {
                  title: "Africa Sets the Clock",
                  text: "The Forum adapts to African policy cycles, resource extraction timelines, and political priorities—not external agendas.",
                },
              ]}
            />
          </div>
        </section>

        {/* =====================================================
            10. AFRICAN TABLE
        ===================================================== */}

        <section className="bg-white px-5 py-20 md:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <PillarCard
              number="02"
              title="The African Table"
              description="Sovereignty begins with control of the agenda. The African Table means Africa invites, Africa convenes, and Africa defines the terms of cooperation."
              points={[
                {
                  title: "Agenda Sovereignty",
                  text: "Topics reflect African priorities, not external frameworks or geopolitical impositions.",
                },
                {
                  title: "Strategic Matchmaking",
                  text: "Investors are curated based on alignment with long-term African development, not short-term extraction.",
                },
                {
                  title: "Deal-Oriented Diplomacy",
                  text: "Every panel, every roundtable, every closed-door session is structured to move from dialogue to signed commitments.",
                },
              ]}
            />
          </div>
        </section>

        {/* =====================================================
            11. HOST COUNTRY PARTNERSHIP
        ===================================================== */}

        <section className="bg-slate-50 px-5 py-20 md:py-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <PillarCard
              number="03"
              title="Host Country Partnership"
              description="Each sector forum is hosted by an African nation that has committed to leading the agenda in that domain, ensuring the highest level of government engagement and deal-making potential."
              points={[
                {
                  title: "National Champions",
                  text: "The forum host demonstrates sovereign ownership of the sector's strategic vision.",
                },
                {
                  title: "Infrastructure for Execution",
                  text: "Forums integrate national project pipelines, regulatory frameworks, and investment climate reforms.",
                },
                {
                  title: "Permanent Regional Hub",
                  text: "Host nations become nodes of expertise and investment, sustaining sectoral networks beyond the event.",
                },
              ]}
            />
          </div>
        </section>

        {/* =====================================================
            12. ORGANIZING COMMITTEE
        ===================================================== */}

        <section className="bg-white px-5 py-20 md:py-28 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              eyebrow="Leadership"
              title="AEF Organizing Committee"
              description="The leaders, experts and strategic partners supporting the Africa Economic Forum."
            />

            {/* Founder */}
            <div className="mb-16 overflow-hidden rounded-3xl bg-slate-950 text-white">
              <div className="grid items-center lg:grid-cols-2">
                <div className="h-full min-h-[380px]">
                  <img
                    src="/images/founder.jpg"
                    alt="Founder of the Africa Economic Forum"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-8 md:p-12">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
                    Founder
                  </p>

                  <h3 className="mt-3 text-3xl font-bold md:text-4xl">
                    Founder
                  </h3>

                  <p className="mt-6 leading-8 text-slate-300">
                    The Africa Economic Forum was created to provide a
                    permanent platform for strategic dialogue, investment
                    alignment and African-led cooperation.
                  </p>
                </div>
              </div>
            </div>

            {/* Advisory */}
            <div className="mb-16">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Advisory Board
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  Advisory Board
                </h3>
              </div>

              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {advisoryBoard.map((member) => (
                  <MemberCard key={member.name} member={member} t={t} />
                ))}
              </div>
            </div>

            {/* Executive */}
            <div className="mb-16">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Executive Board
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  Executive Board
                </h3>
              </div>

              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {executiveBoard.map((member) => (
                  <MemberCard key={member.name} member={member} t={t} />
                ))}
              </div>
            </div>

            {/* Scientific */}
            <div>
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Scientific Committee
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  Scientific Committee
                </h3>
              </div>

              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {scientificCommittee.map((member) => (
                  <MemberCard key={member.name} member={member} t={t} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            13. CTA
        ===================================================== */}

        <section className="bg-amber-600 px-5 py-20 md:py-24 lg:px-8">
          <div className="mx-auto max-w-5xl text-center text-white">
            <h2 className="text-3xl font-bold md:text-5xl">
              Shape Africa’s Economic Future
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-amber-50">
              Join a platform bringing together leadership, capital, policy and
              strategic partnerships to build Africa’s next chapter.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/contact")}
                className="rounded-full bg-white px-7 py-3.5 font-semibold text-amber-700 transition hover:bg-slate-100"
              >
                Contact AEF
              </button>

              <button
                onClick={() => navigate("/meetings")}
                className="rounded-full border-2 border-white px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-amber-700"
              >
                Explore Meetings
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-slate-950 px-5 py-14 text-slate-300 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block">
                <img
                  src="/images/logo.png"
                  alt="Africa Economic Forum"
                  className="h-14 w-auto brightness-0 invert"
                />
              </Link>

              <p className="mt-5 max-w-md leading-7 text-slate-400">
                A pan-African and global platform for strategic dialogue,
                sovereign cooperation and long-term economic transformation.
              </p>

              <div className="mt-6 flex gap-3">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 transition hover:border-amber-500 hover:text-amber-400"
                >
                  in
                </a>

                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 transition hover:border-amber-500 hover:text-amber-400"
                >
                  f
                </a>

                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 transition hover:border-amber-500 hover:text-amber-400"
                >
                  ig
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white">About</h4>

              <div className="mt-5 flex flex-col gap-3 text-sm">
                <Link
                  to="/about"
                  className="transition hover:text-amber-400"
                >
                  About AEF
                </Link>

                <Link
                  to="/about"
                  className="transition hover:text-amber-400"
                >
                  Our History
                </Link>

                <Link
                  to="/about"
                  className="transition hover:text-amber-400"
                >
                  Institutional Framework
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white">More</h4>

              <div className="mt-5 flex flex-col gap-3 text-sm">
                <Link
                  to="/initiatives"
                  className="transition hover:text-amber-400"
                >
                  Initiatives
                </Link>

                <Link
                  to="/stakeholders"
                  className="transition hover:text-amber-400"
                >
                  Stakeholders
                </Link>

                <Link
                  to="/publications"
                  className="transition hover:text-amber-400"
                >
                  Publications
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white">Engage</h4>

              <div className="mt-5 flex flex-col gap-3 text-sm">
                <Link
                  to="/meetings"
                  className="transition hover:text-amber-400"
                >
                  Meetings
                </Link>

                <Link
                  to="/agenda"
                  className="transition hover:text-amber-400"
                >
                  Agenda
                </Link>

                <Link
                  to="/contact"
                  className="transition hover:text-amber-400"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-800 pt-7">
            <div className="flex flex-col justify-between gap-5 text-sm md:flex-row">
              <p className="text-slate-500">
                © {new Date().getFullYear()} Africa Economic Forum. All rights
                reserved.
              </p>

              <div className="flex gap-5">
                <Link
                  to="/privacy"
                  className="text-slate-500 transition hover:text-white"
                >
                  Privacy Policy
                </Link>

                <Link
                  to="/terms"
                  className="text-slate-500 transition hover:text-white"
                >
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
                  }
