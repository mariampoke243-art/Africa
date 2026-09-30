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
    <div className="mx-auto mb-14 max-w-5xl text-center">
      {eyebrow && (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#2b67df]">
          {eyebrow}
        </p>
      )}

      <h2 className="text-[2rem] font-bold leading-[1.08] tracking-tight text-[#111827] sm:text-[2.2rem] md:text-5xl lg:text-[3.1rem]">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-[#5b6472] md:text-xl">
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
    <article className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(15,23,42,0.14)]">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-6 md:p-7">
        <h4 className="text-[1.35rem] font-bold leading-tight text-[#111827]">{member.name}</h4>

        <p className="mt-3 text-base font-medium leading-6 text-[#2b67df]">
          {member.role}
        </p>

        {translatedBio && (
          <p className="mt-4 text-[15px] leading-7 text-[#5b6472]">
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
    <article className="rounded-2xl border-0 bg-transparent p-8 shadow-none md:p-12">
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#244394] text-white shadow-sm" aria-hidden="true">
          {number === "01" ? (
            <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="4" y="5" width="16" height="15" rx="1.5" />
              <path d="M8 3v4M16 3v4M4 9h16M8 13h3M8 16h3" />
            </svg>
          ) : number === "02" ? (
            <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="7" r="2.5" />
              <circle cx="6.5" cy="11" r="2" />
              <circle cx="17.5" cy="11" r="2" />
              <path d="M7.5 19c0-3 1.8-5 4.5-5s4.5 2 4.5 5M2.5 19c0-2.2 1.4-3.7 3.5-3.7M21.5 19c0-2.2-1.4-3.7-3.5-3.7" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-11 w-11" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 20V8l8-4 8 4v12M7 20v-7h10v7M9 9h6M12 4v16" />
            </svg>
          )}
        </span>

        <div>
          <h3 className="mt-6 text-[1.9rem] font-bold leading-tight text-[#111827] md:text-[2.15rem]">{title}</h3>
          <p className="mt-4 text-lg leading-8 text-[#3f4a5a] md:text-xl">{description}</p>
        </div>
      </div>

      <div className="space-y-5 border-t border-slate-200 pt-7 text-left">
        {points.map((point) => (
          <div key={point.title}>
            <h4 className="font-bold text-[#27344a]">{point.title}</h4>
            <p className="mt-1 leading-7 text-[#3f4a5a]">{point.text}</p>
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
  const [whatWeAreOpen, setWhatWeAreOpen] = useState(false);
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
                    ? "text-[#2b67df]"
                    : "text-slate-700 hover:text-[#2b67df]"
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
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#2b67df]"
                >
                  Sign In
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="rounded-full bg-[#2b67df] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#244394]"
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
                      ? "text-[#2b67df]"
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
                      className="rounded-full bg-[#2b67df] px-4 py-2 text-sm font-semibold text-white"
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

          <div className="relative mx-auto max-w-6xl px-6 py-28 md:px-8 md:py-36 lg:py-40">
            <div className="mx-auto max-w-5xl text-center">
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-white/90">
                Africa Economic Forum
              </p>

              <h1 className="text-[2.55rem] font-bold leading-[1.08] tracking-tight text-white sm:text-[3rem] md:text-6xl lg:text-[4.25rem]">
                About the Africa Economic Forum
              </h1>

              <p className="mx-auto mt-8 max-w-5xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8 md:text-xl lg:text-[1.3rem] lg:leading-9">
                A pan-African and global platform for strategic dialogue,
                sovereign cooperation, and long-term economic transformation.
                More than an event, the AEF is a permanent architecture for
                aligning leadership, capital, and policy to shape Africa&apos;s
                role in the world economy.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            2. WHAT WE ARE
        ===================================================== */}

        <section className="bg-white px-6 py-20 md:px-8 md:py-28 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <SectionTitle title="What We Are" />

            <div className="text-base leading-7 text-[#5b6472] sm:text-lg sm:leading-8 md:text-xl md:leading-9">
              <p>
                The Africa Economic Forum (AEF) is a pan-African and global
                platform for strategic cooperation, sovereign development, and
                high-level economic alignment.
              </p>

              {whatWeAreOpen && (
                <p className="mt-6">
                  It brings together African governments, global investors,
                  institutions, and thought leaders to co-create new models of
                  growth, partnership, and long-term value creation.
                </p>
              )}
            </div>

            <div className="mt-9">
              <button
                type="button"
                onClick={() => setWhatWeAreOpen((value) => !value)}
                className="min-w-[170px] rounded-xl bg-[#2b67df] px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#244394] hover:shadow-md"
              >
                {whatWeAreOpen ? "Show Less" : "Read More"}
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            3. OUR HISTORY
        ===================================================== */}

        <section id="history" className="bg-slate-50 px-6 py-20 md:px-8 md:py-28 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <SectionTitle title="Our History" />

            <div className="space-y-6">
              <article className="rounded-xl border border-slate-200 bg-white p-7 shadow-[0_4px_18px_rgba(15,23,42,0.05)] md:p-9">
                <p className="text-sm font-bold uppercase tracking-wider text-[#2b67df]">
                  2022 — Origins
                </p>

                <p className="mt-4 leading-8 text-slate-600">
                  The Africa Economic Forum began in 2022 under the name ICN
                  Global Summit and Award, created as a platform to celebrate
                  inspiring leaders and foster dialogue on Africa&apos;s role
                  in the world.
                </p>
              </article>

              <article className="rounded-xl border border-slate-200 bg-white p-7 shadow-[0_4px_18px_rgba(15,23,42,0.05)] md:p-9">
                <p className="text-sm font-bold uppercase tracking-wider text-[#2b67df]">
                  2022 — First Edition, Kinshasa
                </p>

                <p className="mt-4 leading-8 text-slate-600">
                  The inaugural edition in Kinshasa honored Dr. Denis Mukwege,
                  Nobel Peace Prize laureate, and Mrs. Julienne Lusenge, Aurora
                  Prize laureate and Time 100 honoree. The Summit convened
                  senators, parliamentarians, business leaders, and
                  international investors.
                </p>
              </article>

              {historyOpen && (
                <>
                  <article className="rounded-xl border border-slate-200 bg-white p-7 shadow-[0_4px_18px_rgba(15,23,42,0.05)] md:p-9">
                    <p className="text-sm font-bold uppercase tracking-wider text-[#2b67df]">
                      2023 — Second Edition, Kinshasa
                    </p>

                    <p className="mt-4 leading-8 text-slate-600">
                      The Forum returned to Kinshasa with broader recognition
                      and global reach. Distinguished speakers included H.E.
                      Rosalia Arteaga, former President of Ecuador, and H.E.
                      Guy Loando, Minister of Territorial and Land Management
                      of the DRC. The edition also celebrated the presence of
                      Innoss&apos;B, renowned superstar and humanitarian,
                      highlighting the Forum&apos;s commitment to cultural
                      influence and social impact. Hundreds of government
                      officials, entrepreneurs, and investors from across
                      Africa and beyond participated.
                    </p>
                  </article>

                  <article className="rounded-xl border border-slate-200 bg-white p-7 shadow-[0_4px_18px_rgba(15,23,42,0.05)] md:p-9">
                    <p className="text-sm font-bold uppercase tracking-wider text-[#2b67df]">
                      2024 and Beyond — Evolution into AEF
                    </p>

                    <p className="mt-4 leading-8 text-slate-600">
                      Building on its early momentum, the initiative rebranded
                      as the Africa Economic Forum (AEF), consolidating its
                      identity as a premier global platform. Today, AEF
                      convenes governments, investors, and thought leaders to
                      drive investment, shape Africa&apos;s global agenda, and
                      build equitable international partnerships.
                    </p>
                  </article>
                </>
              )}
            </div>

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setHistoryOpen((value) => !value)}
                className="min-w-[170px] rounded-xl bg-[#2b67df] px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#244394] hover:shadow-md"
              >
                {historyOpen ? "Show Less" : "Read More"}
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            4. INSTITUTIONAL FRAMEWORK
        ===================================================== */}

        <section id="institutional-framework" className="bg-white px-6 py-20 md:px-8 md:py-28 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionTitle title="Our Institutional Framework" />

            <div className="space-y-10">
              <article className="rounded-2xl bg-[#f7f9fc] p-8 md:p-10 lg:p-12">
                <span className="text-sm font-bold uppercase tracking-wider text-[#2b67df]">
                  A
                </span>

                <h3 className="mt-3 text-xl font-bold sm:text-2xl md:text-3xl">
                  Win-Win, Equitable and Ethical Economic Cooperation
                </h3>

                <h4 className="mt-5 text-lg font-semibold sm:text-xl">
                  Rethinking and Reshaping Cooperation Models with Africa
                </h4>

                <h5 className="mt-6 text-lg font-bold">
                  A Strategic Imperative of the Africa Economic Forum
                </h5>

                <h5 className="mt-6 font-bold">Why This Rethink Matters</h5>

                <p className="mt-4 leading-8 text-slate-600">
                  For decades, cooperation with Africa has often been defined
                  by asymmetries — in power, in perception, and in value
                  creation. The AEF calls for a decisive shift:
                </p>

                <ul className="mt-4 space-y-3 text-slate-600">
                  <li>• From aid dependency to economic sovereignty</li>
                  <li>
                    • From foreign-led agendas to African-owned strategies
                  </li>
                  <li>
                    • From short-term fixes to systems change and sustainable
                    growth
                  </li>
                </ul>

                <h5 className="mt-8 font-bold">
                  The AEF&apos;s Contribution to a New Cooperation Paradigm:
                </h5>

                <ol className="mt-4 space-y-4 text-slate-600">
                  <li>
                    <strong>1. Platform for Policy Dialogue:</strong>{" "}
                    Bringing together heads of state, ministers, CEOs,
                    investors, and thought leaders to co-design policies and
                    frameworks that serve long-term African and global
                    interests.
                  </li>

                  <li>
                    <strong>2. Investment Matchmaking:</strong>{" "}
                    Connecting African opportunities with global capital, with a
                    focus on infrastructure, green energy, tech, health,
                    agriculture, and the creative economy.
                  </li>

                  <li>
                    <strong>3. Narrative Reset:</strong>{" "}
                    Positioning Africa as a solution provider — not a problem
                    to be solved. AEF elevates success stories, champions
                    innovation, and celebrates Africa&apos;s global
                    contributors.
                  </li>

                  <li>
                    <strong>4. Geopolitical Rebalancing:</strong>{" "}
                    In a shifting global order, the AEF asserts Africa&apos;s
                    place at the table — not as a guest, but as a co-architect
                    of the world&apos;s future.
                  </li>

                  <li>
                    <strong>5. Inclusive Development Models:</strong>{" "}
                    Promoting partnerships that empower youth, women,
                    entrepreneurs, and local communities, ensuring that
                    economic growth translates into shared prosperity.
                  </li>
                </ol>
              </article>

              {frameworkOpen && (
              <article className="rounded-2xl bg-[#f7f9fc] p-8 md:p-10 lg:p-12">
                <span className="text-sm font-bold uppercase tracking-wider text-[#2b67df]">
                  B
                </span>

                <h3 className="mt-3 text-xl font-bold sm:text-2xl md:text-3xl">
                  Quality Leadership and Governance in Africa
                </h3>

                <div className="mt-8 space-y-8 text-slate-600">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      1. Rethinking Leadership: From Power to Purpose
                    </h4>

                    <p className="mt-3 leading-8">
                      <strong>Current Challenge:</strong> Leadership is too
                      often centered on the accumulation of personal or
                      clan-based power.
                    </p>

                    <p className="mt-3 leading-8">
                      <strong>New Paradigm:</strong> A transformational
                      leadership rooted in purpose, accountability, ethics,
                      and long-term impact.
                    </p>

                    <p className="mt-3 leading-8">
                      <strong>Examples of models to follow:</strong> Servant
                      leadership, Leadership inspired by African values such
                      as Ubuntu
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      2. Reshaping Governance: Institutions That Serve People
                    </h4>

                    <p className="mt-3 leading-8">
                      <strong>Objective:</strong> Shift from extractive
                      institutions to inclusive and accountable institutions.
                    </p>

                    <p className="mt-3 font-semibold text-slate-900">
                      Key intervention areas:
                    </p>

                    <ul className="mt-3 space-y-2 leading-8">
                      <li>• Participatory constitutional reform</li>
                      <li>• Digitalization of public administration</li>
                      <li>
                        • Strengthening mechanisms for transparency and citizen
                        auditing
                      </li>
                      <li>• Real and effective decentralization</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      3. New Patterns: Leadership Ecosystems &amp;
                      Collaborative Governance
                    </h4>

                    <ul className="mt-3 space-y-2 leading-8">
                      <li>
                        • From verticality to horizontality: Promote the
                        co-creation of public policies with citizens, the
                        diaspora, youth, and local communities
                      </li>
                      <li>
                        • Multi-stakeholder coalitions: Governments +
                        businesses + civil society + traditional institutions
                      </li>
                      <li>
                        • Distributed leadership: Create environments where
                        every citizen becomes an agent of change
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      4. African Solutions to African Challenges
                    </h4>

                    <ul className="mt-3 space-y-2 leading-8">
                      <li>
                        • Integrating African wisdom: Governance inspired by
                        traditional systems (chiefdoms, councils of elders)
                        adapted to contemporary challenges
                      </li>
                      <li>
                        • Revaluing Africa&apos;s cultural and spiritual
                        capital in governance models
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      5. Youth &amp; Women as New Pillars of Governance
                    </h4>

                    <ul className="mt-3 space-y-2 leading-8">
                      <li>
                        • Intergenerational leadership: Build bridges between
                        generations
                      </li>
                      <li>
                        • Access to power for women and youth: Smart quotas,
                        campaign financing, and capacity building
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      6. Strategic Actions for Change
                    </h4>

                    <ul className="mt-3 space-y-2 leading-8">
                      <li>
                        • Establish an African Center for Leadership and
                        Innovative Governance
                      </li>
                      <li>
                        • Launch inter-country dialogue forums on institutional
                        reform
                      </li>
                      <li>
                        • Setup public policy labs led by African youth and
                        intellectuals
                      </li>
                      <li>
                        • Train a new generation of leaders through pan-African
                        governance schools
                      </li>
                    </ul>
                  </div>
                </div>
              </article>

              )}

              {frameworkOpen && (
              <article className="rounded-2xl bg-[#f7f9fc] p-8 md:p-10 lg:p-12">
                <span className="text-sm font-bold uppercase tracking-wider text-[#2b67df]">
                  C
                </span>

                <h3 className="mt-3 text-xl font-bold sm:text-2xl md:text-3xl">
                  Africa&apos;s Economic Sovereignty
                </h3>

                <h4 className="mt-5 text-lg font-semibold sm:text-xl">
                  Reclaiming and Reasserting African Sovereignty: Our Fight at
                  the Africa Economic Forum
                </h4>

                <div className="mt-8 space-y-8 text-slate-600">
                  <div>
                    <h5 className="text-lg font-bold text-slate-900">
                      1. Economic Sovereignty: An African Market Dominated by
                      African Products
                    </h5>

                    <p className="mt-3 leading-8">
                      Intra-African trade remains around 15–18%, compared to
                      approximately 60% in Europe and 40% in Asia (AfDB, 2022).
                      The AEF promotes stronger local production and
                      value-added industries, acceleration of the AfCFTA, and
                      strategic policies that enable African economies to
                      capture greater value from their resources.
                    </p>

                    <ul className="mt-3 space-y-2 leading-8">
                      <li>
                        • Strengthen local production and value-added
                        industries
                      </li>
                      <li>
                        • Accelerate the African Continental Free Trade Area
                      (AfCFTA)
                      </li>
                      <li>
                        • Develop strategic protectionist policies where
                        appropriate to strengthen African industries
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold text-slate-900">
                      2. Win-Win South-South and Global Cooperation Based on
                      Equality
                    </h5>

                    <p className="mt-3 leading-8">
                      The AEF supports stronger South-South alliances,
                      including BRICS+ and ASEAN-Africa cooperation, alongside
                      technology and knowledge transfer and fair financing and
                      debt solutions. Some African nations spend up to 25% of
                      their revenues on debt servicing (UNECA).
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold text-slate-900">
                      3. Media Sovereignty: Controlling Our Narrative
                    </h5>

                    <p className="mt-3 leading-8">
                      More than 75% of Africa&apos;s media content is sourced
                      from Western outlets (Reuters Institute). The AEF
                      supports investment in Pan-African media, stronger
                      safeguards against media monopolies, and the training of
                      African journalists to strengthen Africa&apos;s ability
                      to define and communicate its own narrative.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold text-slate-900">
                      4. Cultural Sovereignty: Reclaiming Our Heritage
                    </h5>

                    <p className="mt-3 leading-8">
                      Cultural sovereignty includes the repatriation of stolen
                      African artifacts, the protection of indigenous
                      languages, and the development of creative industries.
                      Only a small proportion of Africa&apos;s cultural
                      heritage remains on the continent, while more than 1,000
                      languages are endangered (UNESCO).
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold text-slate-900">
                      5. Scientific Sovereignty: Innovation on Our Terms
                    </h5>

                    <p className="mt-3 leading-8">
                      Africa produces less than 1% of global research output
                      and R&amp;D investment remains below 0.5% of GDP in many
                      African countries, compared with 2.5% or more in many
                      developed economies. The AEF promotes African-led
                      research hubs, stronger R&amp;D investment, and measures
                      to reduce brain drain.
                    </p>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold text-slate-900">
                      6. Philosophical Sovereignty: Decolonizing African
                      Thought
                    </h5>

                    <p className="mt-3 leading-8">
                      Philosophical sovereignty means valuing endogenous
                      African knowledge systems and intellectual traditions,
                      including Ubuntu, Negritude, and African feminist
                      thought. It also requires the continued decolonization
                      of curricula and the strengthening of critical thinking.
                    </p>
                  </div>
                </div>
              </article>

            </div>

              )}

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setFrameworkOpen((value) => !value)}
                className="min-w-[170px] rounded-xl bg-[#2b67df] px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#244394] hover:shadow-md"
              >
                {frameworkOpen ? "Show Less" : "Read More"}
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            5. OUR STRATEGIC ROLE
        ===================================================== */}

        <section className="bg-white px-6 py-20 md:px-8 md:py-28 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <SectionTitle title="Our Strategic Role" />

            <div className="space-y-6 text-lg leading-8 text-slate-600">
              <p>
                The Africa Economic Forum is designed as a permanent strategic
                platform — not a one-off event. Its role is to align African
                sovereign priorities with global capital, policy frameworks,
                and execution capacity in a structured and continuous manner.
              </p>

              <p>
                Through sector-specific forums, high-level deal rooms, and
                year-round engagement, the AEF enables governments, investors,
                and institutions to move beyond dialogue into concrete
                partnerships, co-investment structures, and policy alignment.
              </p>

              <p>
                The AEF operates as a bridge between strategy and execution —
                ensuring that political vision, private capital, and
                institutional capacity are brought into the same architecture,
                with Africa setting the agenda and defining the terms of
                cooperation.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            6. OUR VISION
        ===================================================== */}

        <section className="bg-[#244394] px-6 py-24 md:px-8 md:py-32 lg:py-36">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-[2rem] font-bold leading-tight text-white sm:text-[2.25rem] md:text-5xl lg:text-[3.1rem]">
              Our Vision
            </h2>

            <p className="mx-auto mt-8 max-w-5xl text-lg leading-8 text-white sm:text-xl md:text-2xl lg:text-[1.4rem]">
              To position Africa as a Sovereign economic power, a center of
              innovation, and a global co-leader — shaping the future through
              strategic alliances, dignified cooperation, and purpose-driven
              leadership.
            </p>
          </div>
        </section>

        {/* =====================================================
            7. MESSAGE FROM CHAIRMAN
        ===================================================== */}

        <section className="bg-slate-50 px-6 py-20 md:px-8 md:py-28 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-bold text-slate-900 md:text-5xl">
              A Message from the Chairman
            </h2>

            <div className="mt-10 space-y-6 text-lg leading-8 text-slate-600">
              <p>
                The world is recalibrating. The old paradigms are shifting,
                and in this new geopolitical and economic landscape, Africa
                emerges not as a spectator but as a definitive arena of
                opportunity. The Africa Economic Forum is the platform where
                this new reality is forged.
              </p>

              <p>
                We are The African Table. It is Africa that extends the
                invitation, sets the agenda, and defines the terms of a truly
                strategic, win-win cooperation. Our model is deliberate: a
                perpetual, year-long journey across the continent, diving deep
                into each critical sector.
              </p>

              <p>
                In this new era of global realignments, our mission is clear:
                to connect global capital with Africa&apos;s immense
                opportunities, to build alliances that matter, and to unlock
                strategic value through structured cooperation.
              </p>

              <p>
                This is not just another forum. This is where the future of
                Africa is designed — deal by deal. I invite you to join us at
                The African Table.
              </p>

              <div className="pt-4">
                <p className="font-semibold text-slate-900">— Dr. Billy Issa</p>
                <p className="mt-1 text-slate-600">
                  Visionary Founder &amp; Host
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            8. CONCEPT
        ===================================================== */}

        <section className="bg-white px-6 py-20 md:px-8 md:py-28 lg:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
              The Concept: The Perpetual Forum &amp;
              <br />
              The African Table
            </h2>

            <p className="mt-5 text-lg text-slate-600">
              A new approach to economic diplomacy: continuous, strategic, and
              sovereign.
            </p>

            <div className="mt-10 space-y-6 text-left text-lg leading-8 text-slate-600">
              <p>
                The Africa Economic Forum is not a gathering. It is an
                architecture. It operates as a perpetual, year-round platform
                designed to align African sovereign priorities with global
                capital flows, institutional frameworks, and execution
                capacity. This model redefines how Africa positions itself in
                the global economy — not as a destination for donor
                conferences, but as the convening authority setting the terms
                of engagement.
              </p>

              <p className="font-semibold text-slate-900">
                Three interconnected pillars define the AEF Model:
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            9. PERPETUAL FORUM
        ===================================================== */}

        <section className="bg-white px-6 py-8 md:px-8 md:py-12 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-2xl border-b-4 border-[#244394] bg-[#eaf3ff] p-1">
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
          </div>
        </section>

        {/* =====================================================
            10. AFRICAN TABLE
        ===================================================== */}

        <section className="bg-white px-6 py-8 md:px-8 md:py-12 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-2xl border-b-4 border-[#155e59] bg-[#e6faf7] p-1">
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
          </div>
        </section>

        {/* =====================================================
            11. HOST COUNTRY PARTNERSHIP
        ===================================================== */}

        <section className="bg-white px-6 py-8 md:px-8 md:py-12 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-2xl border-b-4 border-[#6d28d9] bg-[#f5edff] p-1">
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
          </div>
        </section>

        {/* =====================================================
            12. WHY THIS MATTERS
        ===================================================== */}

        <section className="bg-white px-6 py-20 md:px-8 md:py-28 lg:py-32">
          <div className="mx-auto max-w-5xl">
            <SectionTitle title="Why This Matters" />

            <div className="space-y-6 text-lg leading-8 text-slate-600">
              <p>
                For decades, Africa has been the subject of conferences
                designed elsewhere. The AEF reverses this dynamic. It
                positions Africa as a global convening power, not a beneficiary
                of external goodwill. It is where African heads of state,
                finance ministers, and sovereign wealth funds align their
                strategies with the world's leading investors, development
                institutions, and industrial actors.
              </p>

              <p>
                The Perpetual Forum ensures continuity. The African Table
                ensures sovereignty. The Host Country Partnership ensures
                execution.
              </p>

              <p>
                This is how Africa designs its future, sector by sector, deal
                by deal.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            13. ORGANIZING COMMITTEE
        ===================================================== */}

        <section className="bg-white px-6 py-20 md:px-8 md:py-28 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              title="AEF Organizing Committee"
              description="The leaders, experts and strategic partners supporting the Africa Economic Forum."
            />

            {/* Founder */}
            <div className="mx-auto mb-16 max-w-4xl overflow-hidden rounded-2xl bg-white shadow-[0_10px_35px_rgba(15,23,42,0.10)]">
              <div className="p-6 md:p-10">
                <div className="mb-8 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2b67df]">Founder</p>
                  <h3 className="mt-3 text-3xl font-bold text-[#111827] md:text-4xl">Dr. Billy Issa</h3>
                  <p className="mt-2 text-lg italic text-[#2b67df]">Visionary Founder &amp; Host</p>
                </div>

                <div className="overflow-hidden rounded-xl">
                  <img
                    src="/images/founder.jpg"
                    alt="Dr. Billy Issa"
                    className="aspect-[4/3] w-full object-cover object-center"
                  />
                </div>

                <div className="pt-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2b67df]">
                    THE FOUNDER
                  </p>

                  <h3 className="mt-3 text-3xl font-bold md:text-4xl">
                    Dr. Billy Issa
                  </h3>

                  <p className="mt-2 text-lg italic text-[#2b67df]">
                    Founder, Africa Economic Forum (AEF)
                  </p>

                  <p className="mt-6 text-lg leading-8 text-[#5b6472]">
                    Visionary leader and architect of the Africa Economic
                    Forum, dedicated to repositioning Africa as a strategic
                    global partner and driving sustainable economic
                    transformation across the continent through innovative
                    partnerships and sovereign development initiatives.
                  </p>

                  <div className="mt-10 space-y-6 text-lg leading-8 text-[#5b6472]">
                    <p>
                      Dr. Billy Issa is the Founder of the Africa Economic
                      Forum (AEF), a premier platform convening governments,
                      investors, thought leaders, and global institutions to
                      shape Africa&apos;s role in the new global order. With a
                      vision to position Africa at the center of international
                      dialogue, Dr. Issa is redefining economic cooperation
                      models through strategic partnerships that advance
                      investments, alliances, and innovation across the
                      continent.
                    </p>

                    <p>
                      A thinker and leader on transformational leadership,
                      diplomacy, and economic development, Dr. Issa has
                      dedicated his career to bridging Africa with the world.
                      His work spans initiatives that foster win-win
                      cooperation, inclusive growth, and sustainable
                      transformation, making the AEF not only an event but a
                      movement shaping Africa&apos;s agenda.
                    </p>

                    <p>
                      Passionate about empowering the next generation, Dr. Issa
                      also champions youth leadership, entrepreneurship, and
                      the integration of Africa into global value chains. His
                      efforts bring together heads of state, ministers,
                      investors, philanthropists, and innovators to mobilize
                      capital and ideas for Africa&apos;s prosperity.
                    </p>

                    <p>
                      Recognized for his ability to convene high-level leaders
                      and inspire collective action, Dr. Issa continues to
                      position the Africa Economic Forum as a global diplomatic
                      and investment platform, where Africa&apos;s voice and
                      vision are amplified on the world stage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Advisory Board */}
            <div className="mb-16">
              <div className="mb-9 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2b67df]">
                  Advisory Board
                </p>

                <h3 className="mt-2 text-2xl font-bold sm:text-3xl">Advisory Board</h3>
              </div>

              <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {advisoryBoard.map((member) => (
                  <MemberCard key={member.name} member={member} t={t} />
                ))}
              </div>
            </div>

            {/* Executive Board */}
            <div className="mb-16">
              <div className="mb-9 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2b67df]">
                  Executive Board
                </p>

                <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Executive Board
                </h3>
              </div>

              <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {executiveBoard.map((member) => (
                  <MemberCard key={member.name} member={member} t={t} />
                ))}
              </div>
            </div>

            {/* Scientific Committee */}
            <div>
              <div className="mb-9 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2b67df]">
                  Scientific Committee
                </p>

                <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                  Scientific Committee
                </h3>
              </div>

              <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {scientificCommittee.map((member) => (
                  <MemberCard key={member.name} member={member} t={t} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            14. CTA
        ===================================================== */}

        <section className="bg-[#244394] px-6 py-20 md:px-8 md:py-24 lg:py-28">
          <div className="mx-auto max-w-5xl text-center text-white">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-5xl">
              Shape Africa&apos;s Economic Future
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-blue-50">
              Join a platform bringing together leadership, capital, policy
              and strategic partnerships to build Africa&apos;s next chapter.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/contact")}
                className="rounded-xl bg-white px-7 py-3.5 font-semibold text-[#244394] transition hover:bg-slate-100"
              >
                Contact AEF
              </button>

              <button
                onClick={() => navigate("/meetings")}
                className="rounded-xl border-2 border-white px-7 py-3.5 font-semibold text-white transition hover:bg-white hover:text-[#244394]"
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 transition hover:border-[#2b67df] hover:text-[#2b67df]"
                >
                  in
                </a>

                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 transition hover:border-[#2b67df] hover:text-[#2b67df]"
                >
                  f
                </a>

                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 transition hover:border-[#2b67df] hover:text-[#2b67df]"
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
                  className="transition hover:text-[#2b67df]"
                >
                  About AEF
                </Link>

                <a
                  href="#history"
                  className="transition hover:text-[#2b67df]"
                >
                  Our History
                </a>

                <a
                  href="#institutional-framework"
                  className="transition hover:text-[#2b67df]"
                >
                  Institutional Framework
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white">More</h4>

              <div className="mt-5 flex flex-col gap-3 text-sm">
                <Link
                  to="/initiatives"
                  className="transition hover:text-[#2b67df]"
                >
                  Initiatives
                </Link>

                <Link
                  to="/stakeholders"
                  className="transition hover:text-[#2b67df]"
                >
                  Stakeholders
                </Link>

                <Link
                  to="/publications"
                  className="transition hover:text-[#2b67df]"
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
                  className="transition hover:text-[#2b67df]"
                >
                  Meetings
                </Link>

                <Link
                  to="/agenda"
                  className="transition hover:text-[#2b67df]"
                >
                  Agenda
                </Link>

                <Link
                  to="/contact"
                  className="transition hover:text-[#2b67df]"
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
