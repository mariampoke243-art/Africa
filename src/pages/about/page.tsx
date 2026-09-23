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
];

const scientificCommittee: CommitteeMember[] = [
  {
    name: 'Nathan Lewis',
    role: 'International Economist & Author',
    translationKey: 'nathanLewis',
    image: '/images/nathan-lewis.jpg',
    bio: `Specializing in monetary policy and fiscal systems. Senior Fellow at the Discovery Institute. Contributor to global debates on sound money, sustainable finance, and economic development.`,
  },
  {
    name: 'Amina Touré',
    role: 'Development Practitioner, Researcher & Strategic Communicator',
    translationKey: 'aminaToure',
    image: '/images/Amina Touré.jpg',
    bio: `Amina Touré

Development practitioner, researcher, and strategic communicator with a strong focus on Africa’s political economy and global narratives. Amina holds a Bachelor of Laws and an MSc in International Development & Humanitarian Emergencies from the London School of Economics, and is completing an MPhil in African Studies at the University of Cambridge, specializing in extractive industries, Chinese investment, and state–business relations in the Democratic Republic of Congo (DRC). Her work spans policy research, media strategy, and narrative shaping. She has authored influential analyses on resource governance, value-chain upgrading, and the political economy of strategic minerals. As an independent journalist, she documents the conflict in eastern Congo and the expansion of mining operations in the south, producing field-rooted reporting that centers Congolese perspectives and brings nuance to globally misunderstood issues. Amina brings to the AEF a unique blend of intellectual rigor, communication expertise, and geopolitical insight—crafting narratives that strengthen Africa’s voice, credibility, and influence on the global stage.`,
  },
];

function MemberCard({
  member,
  t,
}: {
  member: CommitteeMember;
  t: (key: string, options?: { defaultValue?: string }) => string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-64 object-cover object-top"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />

      <div className="p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-2">
          {member.name}
        </h4>

        <p className="text-sm text-blue-600 mb-3 font-medium">
          {t(`about.members.${member.translationKey}.role`, {
            defaultValue: member.role,
          })}
        </p>

        <p className="text-gray-600 text-sm leading-relaxed">
          {t(`about.members.${member.translationKey}.bio`, {
            defaultValue: member.bio,
          })}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
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

      {/* ================= HEADER ================= */}
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

        {/* ================= HERO ================= */}
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

        {/* ================= WHAT WE ARE ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <div className="space-y-8">
                <div>

                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    {t('about.whatWeAreTitle')}
                  </h2>

                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {t('about.whatWeAreText1')}
                  </p>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t('about.whatWeAreText2')}
                  </p>

                </div>
              </div>

              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20African%20business%20district%20with%20skyscrapers%20and%20economic%20development%2C%20bustling%20financial%20center%20with%20contemporary%20architecture%2C%20symbol%20of%20African%20economic%20sovereignty%20and%20strategic%20partnerships%2C%20dignified%20cooperation&width=600&height=500&seq=what-we-are&orientation=portrait"
                  alt={t('about.whatWeAreTitle')}
                  className="w-full h-96 object-cover object-top rounded-lg shadow-lg"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">

              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t('about.missionTitle')}
              </h2>

              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
                {t('about.missionSubtitle')}
              </p>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {[
                {
                  icon: 'ri-handshake-line',
                  color: 'blue',
                  title: t('about.winWinTitle'),
                  text: t('about.winWinText'),
                },
                {
                  icon: 'ri-user-star-line',
                  color: 'green',
                  title: t('about.visionaryLeadershipTitle'),
                  text: t('about.visionaryLeadershipText'),
                },
                {
                  icon: 'ri-links-line',
                  color: 'purple',
                  title: t('about.strategicConnectionsTitle'),
                  text: t('about.strategicConnectionsText'),
                },
                {
                  icon: 'ri-megaphone-line',
                  color: 'orange',
                  title: t('about.narrativeElevationTitle'),
                  text: t('about.narrativeElevationText'),
                },
                {
                  icon: 'ri-community-line',
                  color: 'teal',
                  title: t('about.communityEmpowermentTitle'),
                  text: t('about.communityEmpowermentText'),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-8 rounded-lg shadow-md"
                >
                  <div
                    className={`w-16 h-16 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <i
                      className={`${item.icon} text-2xl text-${item.color}-600`}
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-center">
                    {item.text}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ================= VISION ================= */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <h2 className="text-4xl font-bold mb-8">
              {t('about.visionTitle')}
            </h2>

            <p className="text-2xl text-blue-100 max-w-5xl mx-auto leading-relaxed">
              {t('about.visionText')}
            </p>

          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">

              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t('about.coreValuesTitle')}
              </h2>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('about.coreValuesSubtitle')}
              </p>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {[
                {
                  icon: '🌍',
                  title: t('about.sovereigntyTitle'),
                  text: t('about.sovereigntyText'),
                },
                {
                  icon: '🤝',
                  title: t('about.equityTitle'),
                  text: t('about.equityText'),
                },
                {
                  icon: '🔥',
                  title: t('about.transformationalLeadershipTitle'),
                  text: t('about.transformationalLeadershipText'),
                },
                {
                  icon: '📣',
                  title: t('about.narrativeJusticeTitle'),
                  text: t('about.narrativeJusticeText'),
                },
                {
                  icon: '💡',
                  title: t('about.innovationTitle'),
                  text: t('about.innovationText'),
                },
                {
                  icon: '👥',
                  title: t('about.inclusionTitle'),
                  text: t('about.inclusionText'),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-gray-50 p-8 rounded-lg"
                >
                  <div className="flex items-center mb-6">

                    <div className="text-3xl mr-4">
                      {item.icon}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>

                  </div>

                  <p className="text-gray-600">
                    {item.text}
                  </p>

                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ================= IMPACT ================= */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">

              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t('about.impactTitle')}
              </h2>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('about.impactSubtitle')}
              </p>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {[
                ['54', t('about.countriesEngaged')],
                ['1000+', t('about.globalLeadersConnected')],
                ['$50B+', t('about.investmentOpportunities')],
                ['25+', t('about.strategicPartnerships')],
              ].map(([number, label]) => (
                <div key={label} className="text-center">

                  <div className="text-4xl font-bold text-blue-900 mb-2">
                    {number}
                  </div>

                  <div className="text-gray-600">
                    {label}
                  </div>

                </div>
              ))}

            </div>
          </div>
        </section>

        {/* ================= ORGANIZING COMMITTEE ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">

              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {t('about.organizingCommitteeTitle')}
              </h2>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('about.organizingCommitteeSubtitle')}
              </p>

            </div>

            {/* Founder */}
            <div className="mb-20">

              <div className="text-center mb-12">

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  🌟 {t('about.founderTitle')}
                </h3>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('about.founderSubtitle')}
                </p>

              </div>

              <div className="max-w-md mx-auto">

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">

                  <img
                    src="/images/billy-issa.jpg"
                    alt="Dr. Billy Issa"
                    className="w-full h-64 object-cover object-top"
                  />

                  <div className="p-6">

                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Dr. Billy Issa
                    </h4>

                    <p className="text-sm text-blue-600 mb-3 font-medium">
                      {t('about.founderRole')}
                    </p>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t('about.founderBio')}
                    </p>

                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Advisory Board */}
            <div className="mb-20">

              <div className="text-center mb-12">

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  AEF Strategic Advisory Board
                </h3>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('about.advisoryBoardSubtitle')}
                </p>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {advisoryBoard.map((member) => (
                  <MemberCard
                    key={member.name}
                    member={member}
                    t={t}
                  />
                ))}

              </div>
            </div>

            {/* Executive Board */}
            <div className="mb-20">

              <div className="text-center mb-12">

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  AEF Executive Board
                </h3>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('about.executiveBoardSubtitle')}
                </p>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {executiveBoard.map((member) => (
                  <MemberCard
                    key={member.name}
                    member={member}
                    t={t}
                  />
                ))}

              </div>
            </div>

            {/* Scientific Committee */}
            <div>

              <div className="text-center mb-12">

                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Scientific Committee
                </h3>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('about.scientificCommitteeSubtitle')}
                </p>

              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

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

        {/* ================= CTA ================= */}
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

      {/* ================= FOOTER ================= */}
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

                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white"
                  >
                    {t('footer.ourImpact')}
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
                  {isAuthenticated && user ? (
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
