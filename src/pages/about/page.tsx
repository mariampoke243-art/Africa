import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

type CommitteeMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  translationKey: string;
};

/* =========================================================
   COMMITTEE MEMBERS
========================================================= */

const advisoryBoard: CommitteeMember[] = [
  {
    name: 'H.E. John Agyekum Kufuor',
    role: 'Former President of Ghana (2001–2009)',
    translationKey: 'johnAgyekumKufuor',
    image: '/images/H.E John Agyekum Kufuor.jpg',
    bio: `Distinguished statesman and advocate for democratic governance and economic reform in Africa. Widely recognized for leading Ghana's peaceful democratic consolidation and advancing macroeconomic stability, regional integration, and private-sector–led development. Continues to serve on international advisory boards and foundations, promoting good governance, leadership, and sustainable development across Africa and globally.`,
  },
  {
    name: 'H.E. Ameenah Gurib-Fakim',
    role: 'Former President of Mauritius (2015–2018)',
    translationKey: 'ameenahGuribFakim',
    image: '/images/ameenah-gurib-fakim.jpg',
    bio: `Internationally recognized biodiversity scientist and entrepreneur. Advocate for sustainable development, women in science, and innovation ecosystems across Africa. Serves on numerous global boards promoting climate resilience, research, and youth empowerment.`,
  },
  {
    name: 'H.E. Rosalia Arteaga',
    role: 'Former President of Ecuador',
    translationKey: 'rosaliaArteaga',
    image: '/images/H.E Rosalia Arteaga.jpg',
    bio: `Distinguished advocate for education, democracy, and sustainable development. Founder of international initiatives on environmental governance and women's leadership. Prominent voice on Amazon protection and intercultural dialogue.`,
  },
  {
    name: 'H.E. Ana Helena Chacón',
    role: 'Former Vice President of Costa Rica (2014–2018)',
    translationKey: 'anaHelenaChaconEcheverria',
    image: '/images/ana-helena-chacon.jpg',
    bio: `Global advocate for human rights, gender equality, and social inclusion. Diplomat and policy shaper with extensive experience in governance, public policy, and international cooperation.`,
  },
  {
    name: 'H.E. Vladimir Norov',
    role: 'Former Foreign Minister of Uzbekistan',
    translationKey: 'vladimirNorov',
    image: '/images/H.E Vladimir Norov.jpg',
    bio: `Former Secretary-General of the Shanghai Cooperation Organization (2019–2021). Veteran diplomat with decades of experience representing Uzbekistan to the EU, NATO, and key European capitals. Recognized for advancing regional security, connectivity, and multilateral diplomacy.`,
  },
  {
    name: 'Hon. Dr. Akwasi Opong-Fosu',
    role: 'Advisory Board Member',
    translationKey: 'akwasiOpongFosu',
    image: '/images/Hon. Akwasi Opong-Fosu.jpg',
    bio: `Hon. Dr. Akwasi Opong-Fosu is a distinguished Ghanaian politician, governance and public policy expert with over four decades of public service. He spent almost two decades in local government leadership, including as Mayor, and later served as President of the African Union of Local Authorities and UN Special Advisor on Local Authorities. A former Member of Parliament, he held key ministerial portfolios, including Minister of State at the Presidency responsible for Development Authorities. He currently chairs the Ghana Investment Promotion Centre and founded the Africa Global Emergence Centre, a research, policy and advocacy think tank working at the intersection of governance and economic growth through increased trade and investment flows to Africa.`,
  },
  {
    name: 'H.E. Muhammad Azfar Ahsan',
    role: 'Advisory Board Member, Africa Economic Forum',
    translationKey: 'muhammadAzfarAhsan',
    image: '/images/H.E Muhammad Azfar.jpg',
    bio: `Former Minister of State and Chairman of the Board of Investment, Pakistan. International entrepreneur, public policy leader, and founder of Corporate Pakistan Group—a leading platform uniting business, government, and thought leaders. Recognized for driving investment diplomacy and fostering global economic partnerships. A respected voice in emerging market development, he bridges the public and private sectors to promote inclusive growth, innovation, and cross-border collaboration.`,
  },
];

const executiveBoard: CommitteeMember[] = [
  {
    name: 'H.E. Abraham Dwuma Odoom',
    role: 'Executive Board Member and Chair of the Africa Agriculture & Food Forum',
    translationKey: 'abrahamDwumaOdoom',
    image: '/images/Hon. Abraham Dwuma Odoom.jpg',
    bio: `Former Member of Parliament and Deputy Minister of Agriculture, Ghana. Architect of Ghana's agricultural transformation through pro-poor policies. Internationally respected expert on agribusiness, rural development, and food security strategies.`,
  },
  {
    name: 'Dr. Mike Horton',
    role: 'Executive Board Member & Chair of the Africa Tech Forum',
    translationKey: 'mikeHorton',
    image: '/images/Dr. Mike Horton.jpg',
    bio: `Dr. Mike Horton is an award-winning former Federal Chief AI Officer in the United States with two decades of experience advising governments and businesses worldwide in the strategic development, deployment, and governance of human-centered, ethical, and scalable AI, data, and machine learning ecosystems. He is an assistant professor of AI and analytics and Director of the Center for Applied AI Maturity at Northeastern University, and the author of “Hype Immunity: Timeless Lessons for Navigating the AI Revolution.” Dr. Mike is a West Point graduate and holds a Master’s in Business Intelligence from St. Joseph’s University and a Doctorate in Business Administration from Drexel University.`,
  },
  {
    name: 'Zarinah Traci Silas, J.D.',
    role: 'Peace Chair and Executive Board Member of the Africa Economic Forum',
    translationKey: 'zarinahTraciSilas',
    image: '/images/Zarinah Traci Silas.jpg',
    bio: `Zarinah Traci Silas, J.D. is Peace Chair and Executive Board Member of the Africa Economic Forum, a career federal executive holding a lifetime appointment to the United States Senior Executive Service. Over two decades, she has advised Presidents, Cabinet Secretaries, and world leaders on national security and counterterrorism, building DHS’s $120 million USD terrorism prevention program and founding CBP’s first Forced Labor Division, commanding a $3 billion USD portfolio against global trafficking. As a trained international lawyer, she is Co-Founder of Africa Resources Capital Holdings and CEO of Ballard & Silas LLC, driving international trade and diplomacy worldwide.`,
  },
  {
    name: 'Jacqueline “JaQ” Campbell',
    role: 'Board Member and Chair of the AEF Investors Alliance | Co-Chair, Africa Women Forum',
    translationKey: 'jacquelineJaqCampbell',
    image: '/images/Jacqueline_JaQ_Campbell.jpg',
    bio: `Jacqueline “JaQ” Campbell is a wealth management executive, entrepreneur, educator, and U.S.–Africa investment strategist with more than three decades of financial-services experience. She is on a global investment and trade mission to bring capital and careers to the continent of Africa, building bridges between investors, institutions, businesses, and emerging talent. As Founder & CEO of Alexander Legacy Private Wealth, Visiting Faculty at GIMPA, and Chair of the Africa Economic Forum Investors Alliance, her work advances investment, workforce development, and economic opportunity. Enstooled in Ghana as Nana Yaa Asabea, JaQ is committed to transforming relationships into sustainable investment, ownership, and generational prosperity across Africa.`,
  },
  {
    name: 'Afolake Oyinloye',
    role: 'Member and Director of Communications and Media Relations',
    translationKey: 'afolakeOyinloye',
    image: '/images/Afolake Oyinloye.jpg',
    bio: `Afolake Oyinloye is a journalist, moderator, and strategic communications expert specializing in African affairs, investment, and economic development. As an anchor and journalist for Africa Business on Africanews (Euronews Group), she leads high-level conversations with presidents, ministers, CEOs, investors, and development finance leaders on trade, industrialization, critical minerals, AI, climate finance, and the continent's economic transformation. She also advises institutions, NGOs, and philanthropic organizations independently on advocacy, public engagement, and organizational strategy. Fluent in English, French, and Portuguese, Afolake is recognized for moderating global forums and facilitating dialogue at the highest international level.`,
  },
  {
    name: 'Dr. Femi Salami',
    role: 'Executive Board Member & Chair of the Africa Mining & Minerals Forum',
    translationKey: 'femiSalami',
    image: '/images/Dr. Femi Salami.jpg',
    bio: `Dr. Femi Salami (Ph.D., P.E., MAusIMM) is a distinguished mining engineer, academic, and professional with expertise in mining innovation, energy sustainability, critical minerals development, and climate-smart mining. He earned a First-Class Bachelor’s degree in Mining Engineering from the Federal University of Technology Akure, Nigeria and a Ph.D. in Mining Engineering from Missouri University of Science and Technology, USA. Dr. Salami has received over 70 awards and recognitions for scholarly excellence in Mining. He is a licensed mining engineer in the United Kingdom and Nigeria and a Professional Engineer (P.E.) in the United States. He is also a member of several leading professional and scientific organizations.`,
  },
];

const scientificCommittee: CommitteeMember[] = [
  {
    name: 'Nathan Lewis',
    role: 'Scientific Committee member',
    translationKey: 'nathanLewis',
    image: '/images/nathan-lewis.jpg',
    bio: `Specializing in monetary policy and fiscal systems. Senior Fellow at the Discovery Institute. Contributor to global debates on sound money, sustainable finance, and economic development.`,
  },
  {
    name: 'Amina Touré',
    role: 'Scientific Committee member',
    translationKey: 'aminaToure',
    image: '/images/Amina Touré.jpg',
    bio: `Amina Touré

Development practitioner, researcher, and strategic communicator with a strong focus on Africa’s political economy and global narratives. Amina holds a Bachelor of Laws and an MSc in International Development & Humanitarian Emergencies from the London School of Economics, and is completing an MPhil in African Studies at the University of Cambridge, specializing in extractive industries, Chinese investment, and state–business relations in the Democratic Republic of Congo (DRC). Her work spans policy research, media strategy, and narrative shaping. She has authored influential analyses on resource governance, value-chain upgrading, and the political economy of strategic minerals. As an independent journalist, she documents the conflict in eastern Congo and the expansion of mining operations in the south, producing field-rooted reporting that centers Congolese perspectives and brings nuance to globally misunderstood issues. Amina brings to the AEF a unique blend of intellectual rigor, communication expertise, and geopolitical insight—crafting narratives that strengthen Africa’s voice, credibility, and influence on the global stage.`,
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

      <h2 className="text-[2.35rem] font-bold leading-[1.08] tracking-tight text-[#111827] md:text-5xl lg:text-[3.25rem]">
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
    ? t(`about.committee.${member.translationKey}.bio`, '')
    : '';

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(15,23,42,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(15,23,42,0.14)]">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className="p-6 md:p-7">
        <h4 className="text-[1.35rem] font-bold leading-tight text-[#111827]">
          {member.name}
        </h4>

        <p className="mt-3 text-base font-medium leading-6 text-[#2b67df]">
          {member.role}
        </p>

        {translatedBio && (
          <p className="mt-4 text-[15px] leading-7 text-[#5b6472] whitespace-pre-line">
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
        <span
          className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#244394] text-white shadow-sm"
          aria-hidden="true"
        >
          {number === '01' ? (
            <svg
              viewBox="0 0 24 24"
              className="h-11 w-11"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="4" y="5" width="16" height="15" rx="1.5" />
              <path d="M8 3v4M16 3v4M4 9h16M8 13h3M8 16h3" />
            </svg>
          ) : number === '02' ? (
            <svg
              viewBox="0 0 24 24"
              className="h-11 w-11"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="7" r="2.5" />
              <circle cx="6.5" cy="11" r="2" />
              <circle cx="17.5" cy="11" r="2" />
              <path d="M7.5 19c0-3 1.8-5 4.5-5s4.5 2 4.5 5M2.5 19c0-2.2 1.4-3.7 3.5-3.7M21.5 19c0-2.2-1.4-3.7-3.5-3.7" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-11 w-11"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 20V8l8-4 8 4v12M7 20v-7h10v7M9 9h6M12 4v16" />
            </svg>
          )}
        </span>

        <div>
          <h3 className="mt-6 text-[1.9rem] font-bold leading-tight text-[#111827] md:text-[2.15rem]">
            {title}
          </h3>

          <p className="mt-4 text-lg leading-8 text-[#3f4a5a] md:text-xl">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-5 border-t border-slate-200 pt-7 text-left">
        {points.map((point) => (
          <div key={point.title}>
            <h4 className="font-bold text-[#27344a]">{point.title}</h4>

            <p className="mt-1 leading-7 text-[#3f4a5a]">
              {point.text}
            </p>
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [historyOpen, setHistoryOpen] = useState(false);
  const [whatWeAreOpen, setWhatWeAreOpen] = useState(false);
  const [frameworkOpen, setFrameworkOpen] = useState(false);
  const [founderOpen, setFounderOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // Si ton AuthContext expose signOut, cette fonction
      // peut être ajoutée ici comme dans ton code précédent.
      setIsProfileDropdownOpen(false);
      setIsMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleViewProfile = () => {
    navigate('/profile');
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="https://static.readdy.ai/image/849a2f489cee8d6814d30c5afad3a84a/b4bfbdc8f08b91298cef1ff69a069583.png"
                  alt="AEF Logo"
                  className="h-10 w-10 object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {t('header.home')}
              </Link>

              <Link
                to="/about"
                className="text-blue-600 font-medium"
              >
                {t('header.about')}
              </Link>

              <Link
                to="/initiatives"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {t('header.initiatives')}
              </Link>

              <Link
                to="/stakeholders"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {t('header.stakeholders')}
              </Link>

              <Link
                to="/agenda"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {t('header.agenda')}
              </Link>

              <Link
                to="/publications"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {t('header.publications')}
              </Link>

              <Link
                to="/meetings"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {t('header.meetings')}
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {t('header.contact')}
              </Link>
            </nav>

            {/* Auth */}
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
                      t('header.profile')
                    }
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={t('header.profile')}
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
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">

                      <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        <div className="font-medium truncate">
                          {user.user_metadata?.full_name ||
                            t('header.user')}
                        </div>

                        <div className="text-gray-500 truncate">
                          {user.email}
                        </div>
                      </div>

                      <button
                        onClick={handleViewProfile}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t('header.viewProfile')}
                      </button>

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {t('header.signOut')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {t('header.signIn')}
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
                aria-label="Toggle menu"
              >
                <i
                  className={`ri-${
                    isMenuOpen ? 'close' : 'menu'
                  }-line text-xl`}
                />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-4">

                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {t('header.home')}
                </Link>

                <Link
                  to="/about"
                  className="text-blue-600 font-medium"
                >
                  {t('header.about')}
                </Link>

                <Link
                  to="/initiatives"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {t('header.initiatives')}
                </Link>

                <Link
                  to="/stakeholders"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {t('header.stakeholders')}
                </Link>

                <Link
                  to="/agenda"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {t('header.agenda')}
                </Link>

                <Link
                  to="/publications"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {t('header.publications')}
                </Link>

                <Link
                  to="/meetings"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {t('header.meetings')}
                </Link>

                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {t('header.contact')}
                </Link>

                {user ? (
                  <div className="pt-4 border-t border-gray-100">

                    <div className="flex items-center space-x-3 mb-4">
                      {user.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt={t('header.profile')}
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
                          t('header.user')}
                      </span>
                    </div>

                    <button
                      onClick={handleViewProfile}
                      className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium mb-2"
                    >
                      {t('header.viewProfile')}
                    </button>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                    >
                      {t('header.signOut')}
                    </button>

                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      to="/signin"
                      className="block text-gray-700 hover:text-blue-600 font-medium"
                    >
                      {t('header.signIn')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <main>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section
          className="relative py-32 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url('https://readdy.ai/api/search-image?query=African%20leaders%20and%20business%20executives%20in%20a%20modern%20conference%20hall%20discussing%20economic%20development%2C%20professional%20meeting%20with%20diverse%20participants%2C%20contemporary%20architecture%20with%20African%20cultural%20elements%2C%20dignified%20cooperation%20and%20strategic%20partnerships&width=1920&height=800&seq=about-hero&orientation=landscape')`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('about.heroTitle')}
            </h1>

            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              {t('about.heroSubtitle')}
            </p>

          </div>
        </section>

        {/* =====================================================
            WHAT WE ARE
        ===================================================== */}

        <section className="bg-white px-6 py-20 md:px-8 md:py-28 lg:py-32">
          <div className="mx-auto max-w-5xl">

            <SectionTitle title="What We Are" />

            <div className="text-lg leading-8 text-[#5b6472] md:text-xl md:leading-9">

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
                {whatWeAreOpen ? 'Show Less' : 'Read More'}
              </button>
            </div>

          </div>
        </section>

        {/* =====================================================
            OUR HISTORY
        ===================================================== */}

        <section
          id="history"
          className="bg-slate-50 px-6 py-20 md:px-8 md:py-28 lg:py-32"
        >
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
                {historyOpen ? 'Show Less' : 'Read More'}
              </button>
            </div>

          </div>
        </section>

        {/* =====================================================
            OUR INSTITUTIONAL FRAMEWORK
        ===================================================== */}

        <section
          id="institutional-framework"
          className="bg-white px-6 py-20 md:px-8 md:py-28 lg:py-32"
        >
          <div className="mx-auto max-w-6xl">

            <SectionTitle title="Our Institutional Framework" />

            <div className="space-y-10">

              {/* A */}
              <article className="rounded-2xl bg-[#f7f9fc] p-8 md:p-10 lg:p-12">

                <span className="text-sm font-bold uppercase tracking-wider text-[#2b67df]">
                  A
                </span>

                <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                  Win-Win, Equitable and Ethical Economic Cooperation
                </h3>

                <h4 className="mt-5 text-xl font-semibold">
                  Rethinking and Reshaping Cooperation Models with Africa
                </h4>

                <h5 className="mt-6 text-lg font-bold">
                  A Strategic Imperative of the Africa Economic Forum
                </h5>

                <h5 className="mt-6 font-bold">
                  Why This Rethink Matters
                </h5>

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
                    <strong>1. Platform for Policy Dialogue:</strong>{' '}
                    Bringing together heads of state, ministers, CEOs,
                    investors, and thought leaders to co-design policies and
                    frameworks that serve long-term African and global
                    interests.
                  </li>

                  <li>
                    <strong>2. Investment Matchmaking:</strong>{' '}
                    Connecting African opportunities with global capital, with a
                    focus on infrastructure, green energy, tech, health,
                    agriculture, and the creative economy.
                  </li>

                  <li>
                    <strong>3. Narrative Reset:</strong>{' '}
                    Positioning Africa as a solution provider — not a problem
                    to be solved. AEF elevates success stories, champions
                    innovation, and celebrates Africa&apos;s global
                    contributors.
                  </li>

                  <li>
                    <strong>4. Geopolitical Rebalancing:</strong>{' '}
                    In a shifting global order, the AEF asserts Africa&apos;s
                    place at the table — not as a guest, but as a co-architect
                    of the world&apos;s future.
                  </li>

                  <li>
                    <strong>5. Inclusive Development Models:</strong>{' '}
                    Promoting partnerships that empower youth, women,
                    entrepreneurs, and local communities, ensuring that
                    economic growth translates into shared prosperity.
                  </li>

                </ol>

              </article>

              {/* B */}
              {frameworkOpen && (
                <article className="rounded-2xl bg-[#f7f9fc] p-8 md:p-10 lg:p-12">

                  <span className="text-sm font-bold uppercase tracking-wider text-[#2b67df]">
                    B
                  </span>

                  <h3 className="mt-3 text-2xl font-bold md:text-3xl">
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
                          • Strengthening mechanisms for transparency and
                          citizen auditing
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
                          • Launch inter-country dialogue forums on
                          institutional reform
                        </li>

                        <li>
                          • Setup public policy labs led by African youth and
                          intellectuals
                        </li>

                        <li>
                          • Train a new generation of leaders through
                          pan-African governance schools
                        </li>
                      </ul>
                    </div>

                  </div>
                </article>
              )}

              {/* C */}
              {frameworkOpen && (
                <article className="rounded-2xl bg-[#f7f9fc] p-8 md:p-10 lg:p-12">

                  <span className="text-sm font-bold uppercase tracking-wider text-[#2b67df]">
                    C
                  </span>

                  <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                    Africa&apos;s Economic Sovereignty
                  </h3>

                  <h4 className="mt-5 text-xl font-semibold">
                    Reclaiming and Reasserting African Sovereignty: Our Fight
                    at the Africa Economic Forum
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
                        heritage remains on the continent, while more than
                        1,000 languages are endangered (UNESCO).
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
              )}

            </div>

            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={() => setFrameworkOpen((value) => !value)}
                className="min-w-[170px] rounded-xl bg-[#2b67df] px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#244394] hover:shadow-md"
              >
                {frameworkOpen ? 'Show Less' : 'Read More'}
              </button>
            </div>

          </div>
        </section>

        {/* =====================================================
            OUR STRATEGIC ROLE
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
            OUR VISION
        ===================================================== */}

        <section className="bg-[#244394] px-6 py-24 md:px-8 md:py-32 lg:py-36">
          <div className="mx-auto max-w-5xl text-center">

            <h2 className="text-[2.35rem] font-bold leading-tight text-white md:text-5xl lg:text-[3.2rem]">
              Our Vision
            </h2>

            <p className="mx-auto mt-8 max-w-5xl text-xl leading-9 text-white md:text-2xl lg:text-[1.45rem]">
              To position Africa as a Sovereign economic power, a center of
              innovation, and a global co-leader — shaping the future through
              strategic alliances, dignified cooperation, and purpose-driven
              leadership.
            </p>

          </div>
        </section>

        {/* =====================================================
            MESSAGE FROM CHAIRMAN
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
                <p className="font-semibold text-slate-900">
                  — Dr. Billy Issa
                </p>

                <p className="mt-1 text-slate-600">
                  Visionary Founder &amp; Host
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            THE CONCEPT
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
            THE PERPETUAL FORUM
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
                    title: 'Year-Round Engagement',
                    text: 'Sustained dialogue between African governments, global investors, and institutions.',
                  },
                  {
                    title: 'Sector-Driven Precision',
                    text: 'From critical minerals to infrastructure, each forum zeroes in on concrete deal structures and investment vehicles.',
                  },
                  {
                    title: 'Africa Sets the Clock',
                    text: 'The Forum adapts to African policy cycles, resource extraction timelines, and political priorities—not external agendas.',
                  },
                ]}
              />

            </div>

          </div>
        </section>

        {/* =====================================================
            THE AFRICAN TABLE
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
                    title: 'Agenda Sovereignty',
                    text: 'Topics reflect African priorities, not external frameworks or geopolitical impositions.',
                  },
                  {
                    title: 'Strategic Matchmaking',
                    text: 'Investors are curated based on alignment with long-term African development, not short-term extraction.',
                  },
                  {
                    title: 'Deal-Oriented Diplomacy',
                    text: 'Every panel, every roundtable, every closed-door session is structured to move from dialogue to signed commitments.',
                  },
                ]}
              />

            </div>

          </div>
        </section>

        {/* =====================================================
            HOST COUNTRY PARTNERSHIP
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
                    title: 'National Champions',
                    text: "The forum host demonstrates sovereign ownership of the sector's strategic vision.",
                  },
                  {
                    title: 'Infrastructure for Execution',
                    text: 'Forums integrate national project pipelines, regulatory frameworks, and investment climate reforms.',
                  },
                  {
                    title: 'Permanent Regional Hub',
                    text: 'Host nations become nodes of expertise and investment, sustaining sectoral networks beyond the event.',
                  },
                ]}
              />

            </div>

          </div>
        </section>

        {/* =====================================================
            WHY THIS MATTERS
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
            AEF ORGANIZING COMMITTEE
        ===================================================== */}

        <section className="bg-white px-6 py-20 md:px-8 md:py-28 lg:py-32">
          <div className="mx-auto max-w-7xl">

            <SectionTitle
              title="AEF Organizing Committee"
              description="The leaders, experts and strategic partners supporting the Africa Economic Forum."
            />

            {/* =================================================
                FOUNDER
            ================================================= */}

            <div className="mx-auto mb-20 max-w-4xl">

              <div className="text-center mb-10">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2b67df]">
                  THE FOUNDER
                </p>

                <h3 className="mt-3 text-3xl font-bold text-[#111827] md:text-4xl">
                  Dr. Billy Issa
                </h3>

                <p className="mt-2 text-lg italic text-[#2b67df]">
                  Founder, Africa Economic Forum (AEF)
                </p>

              </div>

              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_35px_rgba(15,23,42,0.10)]">

                <img
                  src="/images/billy-issa.jpg"
                  alt="Dr. Billy Issa"
                  className="w-full h-[420px] object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                <div className="p-7 md:p-10">

                  <div className="space-y-6 text-lg leading-8 text-[#5b6472]">

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

                    {founderOpen && (
                      <>
                        <p>
                          A thinker and leader on transformational leadership,
                          diplomacy, and economic development, Dr. Issa has
                          dedicated his career to bridging Africa with the
                          world. His work spans initiatives that foster
                          win-win cooperation, inclusive growth, and
                          sustainable transformation, making the AEF not only
                          an event but a movement shaping Africa&apos;s agenda.
                        </p>

                        <p>
                          Passionate about empowering the next generation, Dr.
                          Issa also champions youth leadership,
                          entrepreneurship, and the integration of Africa into
                          global value chains. His efforts bring together heads
                          of state, ministers, investors, philanthropists, and
                          innovators to mobilize capital and ideas for
                          Africa&apos;s prosperity.
                        </p>

                        <p>
                          Recognized for his ability to convene high-level
                          leaders and inspire collective action, Dr. Issa
                          continues to position the Africa Economic Forum as a
                          global diplomatic and investment platform, where
                          Africa&apos;s voice and vision are amplified on the
                          world stage.
                        </p>
                      </>
                    )}

                  </div>

                  <div className="mt-8 text-center">

                    <button
                      type="button"
                      onClick={() => setFounderOpen((value) => !value)}
                      className="min-w-[170px] rounded-xl bg-[#2b67df] px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-[#244394] hover:shadow-md"
                    >
                      {founderOpen ? 'Show Less' : 'Read More'}
                    </button>

                  </div>

                </div>
              </div>

            </div>

            {/* =================================================
                ADVISORY BOARD
            ================================================= */}

            <div className="mb-20">

              <div className="mb-12 text-center">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2b67df]">
                  Strategic Advisory
                </p>

                <h3 className="mt-3 text-3xl font-bold text-[#111827] md:text-4xl">
                  AEF Strategic Advisory Board
                </h3>

                <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#5b6472]">
                  {t('about.advisoryBoardSubtitle')}
                </p>

              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                {advisoryBoard.map((member) => (
                  <MemberCard
                    key={member.name}
                    member={member}
                    t={t}
                  />
                ))}

              </div>

            </div>

            {/* =================================================
                EXECUTIVE BOARD
            ================================================= */}

            <div className="mb-20">

              <div className="mb-12 text-center">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2b67df]">
                  Executive Leadership
                </p>

                <h3 className="mt-3 text-3xl font-bold text-[#111827] md:text-4xl">
                  AEF Executive Board
                </h3>

                <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#5b6472]">
                  {t('about.executiveBoardSubtitle')}
                </p>

              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                {executiveBoard.map((member) => (
                  <MemberCard
                    key={member.name}
                    member={member}
                    t={t}
                  />
                ))}

              </div>

            </div>

            {/* =================================================
                SCIENTIFIC COMMITTEE
            ================================================= */}

            <div>

              <div className="mb-12 text-center">

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2b67df]">
                  Scientific Committee
                </p>

                <h3 className="mt-3 text-3xl font-bold text-[#111827] md:text-4xl">
                  Scientific Committee
                </h3>

                <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[#5b6472]">
                  {t('about.scientificCommitteeSubtitle')}
                </p>

              </div>

              <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2">

                {scientificCommittee.map((member) => (
                  <MemberCard
                    key={member.name}
                    member={member}
                    t={t}
                  />
                ))}

              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="py-20 bg-blue-900 text-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <h2 className="text-4xl font-bold mb-6">
              {t('about.joinMovementTitle')}
            </h2>

            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
              {t('about.joinMovementText')}
            </p>

            <Link
              to="/join"
              className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {t('about.becomeMember')}
            </Link>

          </div>

        </section>

      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

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
                    to="/about"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.ourMission')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/framework"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.ourFramework')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/history"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.history')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.leadership')}
                  </Link>
                </li>

              </ul>

            </div>

            {/* More */}
            <div>

              <h3 className="font-semibold text-lg mb-6">
                {t('footer.moreFromForum')}
              </h3>

              <ul className="space-y-3">

                <li>
                  <Link
                    to="/initiatives"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.centres')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/meetings"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.meetings')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/stakeholders"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.stakeholders')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/agenda"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.forumStories')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/publications"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.pressReleases')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/gallery"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.gallery')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/publications"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.podcasts')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/publications"
                    className="text-gray-300 hover:text-white"
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
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      {t('footer.logout')}
                    </button>
                  ) : (
                    <Link
                      to="/signin"
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      {t('footer.signIn')}
                    </Link>
                  )}
                </li>

                <li>
                  <Link
                    to="/partners"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.partner')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/join"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.member')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/publications"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.pressSignUp')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/publications"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.newsletters')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white"
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
                    to="/initiatives"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.sustainability')}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/careers"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.careers')}
                  </Link>
                </li>

              </ul>

              <h4 className="font-semibold mb-4">
                {t('footer.languageEditions')}
              </h4>

              <div className="flex space-x-2">

                <button
                  type="button"
                  className="text-gray-300 hover:text-white"
                >
                  PT
                </button>

                <span className="text-gray-500">•</span>

                <button
                  type="button"
                  className="text-gray-300 hover:text-white"
                >
                  EN
                </button>

                <span className="text-gray-500">•</span>

                <button
                  type="button"
                  className="text-gray-300 hover:text-white"
                >
                  ES
                </button>

                <span className="text-gray-500">•</span>

                <button
                  type="button"
                  className="text-gray-300 hover:text-white"
                >
                  FR
                </button>

              </div>

            </div>

          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 pt-8">

            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

              {/* Social */}
              <div className="flex space-x-4">

                <a
                  href="https://www.facebook.com/share/17Jr8NpqZJ/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <i className="ri-facebook-fill text-xl" />
                </a>

                <a
                  href="https://www.linkedin.com/company/the-africa-economic-forum/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <i className="ri-linkedin-fill text-xl" />
                </a>

                <a
                  href="https://www.instagram.com/theafricaeconomicforum?igsh=MWowNmw1NjdueXNkbQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <i className="ri-instagram-fill text-xl" />
                </a>

                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <i className="ri-youtube-fill text-xl" />
                </a>

              </div>

              {/* Copyright */}
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">

                <Link
                  to="/privacy"
                  className="hover:text-white"
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
                  className="hover:text-white"
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
