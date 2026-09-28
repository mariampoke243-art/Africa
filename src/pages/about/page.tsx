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
    bio: `Development practitioner, researcher, and strategic communicator with a strong focus on Africa’s political economy and global narratives. Amina holds a Bachelor of Laws and an MSc in International Development & Humanitarian Emergencies from the London School of Economics, and is completing an MPhil in African Studies at the University of Cambridge, specializing in extractive industries, Chinese investment, and state–business relations in the Democratic Republic of Congo (DRC). Her work spans policy research, media strategy, and narrative shaping. She has authored influential analyses on resource governance, value-chain upgrading, and the political economy of strategic minerals. As an independent journalist, she documents the conflict in eastern Congo and the expansion of mining operations in the south, producing field-rooted reporting that centers Congolese perspectives and brings nuance to globally misunderstood issues. Amina brings to the AEF a unique blend of intellectual rigor, communication expertise, and geopolitical insight—crafting narratives that strengthen Africa’s voice, credibility, and influence on the global stage.`,
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
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

        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
          {t(`about.members.${member.translationKey}.bio`, {
            defaultValue: member.bio,
          })}
        </p>
      </div>
    </div>
  );
}

function FrameworkCard({
  number,
  title,
  children,
}: {
  number?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-start gap-4">
        {number && (
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold">
            {number}
          </div>
        )}

        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900 mb-4">
            {title}
          </h4>

          <div className="text-gray-600 leading-relaxed">
            {children}
          </div>
        </div>
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

      {/* =========================================================
          HEADER
      ========================================================= */}
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

        {/* =========================================================
            HERO
        ========================================================= */}
        <section
          className="relative py-32 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.82), rgba(30, 58, 138, 0.82)), url('https://readdy.ai/api/search-image?query=African%20leaders%20and%20business%20executives%20in%20a%20modern%20conference%20hall%20discussing%20economic%20development%2C%20professional%20meeting%20with%20diverse%20participants%2C%20contemporary%20architecture%20with%20African%20cultural%20elements%2C%20dignified%20cooperation%20and%20strategic%20partnerships&width=1920&height=800&seq=about-hero&orientation=landscape')`,
          }}
        >

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              About the Africa Economic Forum
            </h1>

            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              A pan-African and global platform for strategic dialogue,
              sovereign cooperation, and long-term economic transformation.
              More than an event, the AEF is a permanent architecture for
              aligning leadership, capital, and policy to shape Africa's role
              in the world economy.
            </p>

          </div>

        </section>

        {/* =========================================================
            WHAT WE ARE
        ========================================================= */}
        <section className="py-20 bg-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <div>

                <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                  Africa Economic Forum
                </span>

                <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-6">
                  What We Are
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed">
                  The Africa Economic Forum (AEF) is a pan-African and global
                  platform for strategic cooperation, sovereign development,
                  and high-level economic alignment. It brings together
                  African governments, global investors, institutions, and
                  thought leaders to co-create new models of growth,
                  partnership, and long-term value creation.
                </p>

              </div>

              <div className="relative">

                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20African%20business%20district%20with%20skyscrapers%20and%20economic%20development%2C%20bustling%20financial%20center%20with%20contemporary%20architecture%2C%20symbol%20of%20African%20economic%20sovereignty%20and%20strategic%20partnerships%2C%20dignified%20cooperation&width=600&height=500&seq=what-we-are&orientation=portrait"
                  alt="Africa Economic Forum"
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />

              </div>

            </div>

          </div>

        </section>

        {/* =========================================================
            OUR HISTORY
        ========================================================= */}
        <section className="py-20 bg-gray-50">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">

              <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                Our Journey
              </span>

              <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-6">
                Our History
              </h2>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From its origins as a platform for leadership recognition to
                its evolution into a permanent pan-African and global
                economic platform.
              </p>

            </div>

            <div className="max-w-5xl mx-auto">

              <div className="relative border-l-2 border-blue-200 ml-4 md:ml-8 space-y-12">

                {/* 2022 Origins */}
                <div className="relative pl-8 md:pl-12">

                  <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow" />

                  <span className="text-blue-600 font-bold text-lg">
                    2022 – Origins
                  </span>

                  <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">
                    The Beginning
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    The initiative began in 2022 under the name ICN Global
                    Summit and Award, created as a platform to celebrate
                    inspiring leaders and foster dialogue on Africa’s role
                    in the world.
                  </p>

                </div>

                {/* First Edition */}
                <div className="relative pl-8 md:pl-12">

                  <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow" />

                  <span className="text-blue-600 font-bold text-lg">
                    2022 – First Edition, Kinshasa
                  </span>

                  <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">
                    Building a Pan-African Platform
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    The inaugural edition took place in Kinshasa and honored
                    Dr. Denis Mukwege, Nobel Peace Prize laureate, and
                    Mrs. Julienne Lusenge, Aurora Prize laureate and Time 100
                    honoree. The summit convened senators, parliamentarians,
                    business leaders, and international investors.
                  </p>

                </div>

                {/* Second Edition */}
                <div className="relative pl-8 md:pl-12">

                  <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow" />

                  <span className="text-blue-600 font-bold text-lg">
                    2023 – Second Edition, Kinshasa
                  </span>

                  <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">
                    Expanding Global Recognition
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    The initiative returned to Kinshasa with broader
                    recognition and global reach. Speakers included
                    H.E. Rosalía Arteaga, former President of Ecuador, and
                    H.E. Guy Loando, Minister of Territorial and Land
                    Management of the Democratic Republic of Congo. The
                    summit also celebrated Inoss’B, renowned superstar and
                    humanitarian. Hundreds of government officials,
                    entrepreneurs, and investors from Africa and beyond
                    participated.
                  </p>

                </div>

                {/* 2024 and Beyond */}
                <div className="relative pl-8 md:pl-12">

                  <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow" />

                  <span className="text-blue-600 font-bold text-lg">
                    2024 and Beyond – Evolution into AEF
                  </span>

                  <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">
                    The Africa Economic Forum
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    The initiative was rebranded as the Africa Economic Forum
                    (AEF), consolidating its identity as a global platform.
                    AEF convenes governments, investors, and thought leaders
                    to drive investment, shape Africa’s global agenda, and
                    build equitable international partnerships.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================================
            INSTITUTIONAL FRAMEWORK
        ========================================================= */}
        <section className="py-24 bg-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-20">

              <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                Our Framework
              </span>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-3 mb-6">
                Our Institutional Framework
              </h2>

              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                The Africa Economic Forum brings together strategic
                cooperation, quality leadership, governance, and economic
                sovereignty within a long-term institutional architecture.
              </p>

            </div>

            {/* =====================================================
                A. WIN-WIN COOPERATION
            ===================================================== */}
            <div className="mb-24">

              <div className="mb-12">

                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold mb-4">
                  A
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Win-Win, Equitable and Ethical Economic Cooperation
                </h3>

                <h4 className="text-xl text-blue-700 font-semibold mb-6">
                  Rethinking and Reshaping Cooperation Models with Africa
                </h4>

                <p className="text-lg text-gray-600 leading-relaxed max-w-5xl">
                  Cooperation with Africa has often been defined by
                  asymmetries in power, perception, and value creation.
                  The AEF advocates a shift from traditional dependency
                  models toward partnerships that create shared value,
                  strengthen African ownership, and support long-term
                  transformation.
                </p>

              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-10">

                <FrameworkCard title="Why This Rethink Matters">

                  <p className="mb-5">
                    A new cooperation model requires a fundamental shift:
                  </p>

                  <ul className="space-y-3">

                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold">→</span>
                      <span>
                        <strong>Aid dependency</strong> → economic sovereignty
                      </span>
                    </li>

                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold">→</span>
                      <span>
                        <strong>Foreign-led agendas</strong> → African-owned
                        strategies
                      </span>
                    </li>

                    <li className="flex gap-3">
                      <span className="text-blue-600 font-bold">→</span>
                      <span>
                        <strong>Short-term fixes</strong> → systems change and
                        sustainable growth
                      </span>
                    </li>

                  </ul>

                </FrameworkCard>

                <FrameworkCard title="The AEF Contribution">

                  <p>
                    The AEF provides an architecture through which African
                    and global stakeholders can develop practical
                    partnerships, investment opportunities, policy dialogue,
                    and long-term cooperation.
                  </p>

                </FrameworkCard>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                <FrameworkCard
                  number="1"
                  title="Platform for Policy Dialogue"
                >
                  <p>
                    Heads of state, ministers, CEOs, investors, and thought
                    leaders co-design policies and frameworks serving
                    long-term African and global interests.
                  </p>
                </FrameworkCard>

                <FrameworkCard
                  number="2"
                  title="Investment Matchmaking"
                >
                  <p>
                    Connecting African opportunities with global capital,
                    with a focus on infrastructure, green energy, technology,
                    health, agriculture, and the creative economy.
                  </p>
                </FrameworkCard>

                <FrameworkCard
                  number="3"
                  title="Narrative Reset"
                >
                  <p>
                    Positioning Africa as a solution provider rather than
                    simply a problem to be solved; elevating success stories,
                    championing innovation, and celebrating global
                    contributors.
                  </p>
                </FrameworkCard>

                <FrameworkCard
                  number="4"
                  title="Geopolitical Rebalancing"
                >
                  <p>
                    Supporting Africa’s participation at the table as a
                    co-architect of the world’s future.
                  </p>
                </FrameworkCard>

                <FrameworkCard
                  number="5"
                  title="Inclusive Development Models"
                >
                  <p>
                    Partnerships that empower youth, women, entrepreneurs,
                    and local communities so that economic growth translates
                    into shared prosperity.
                  </p>
                </FrameworkCard>

              </div>

            </div>

            {/* =====================================================
                B. LEADERSHIP AND GOVERNANCE
            ===================================================== */}
            <div className="mb-24">

              <div className="mb-12">

                <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 text-green-700 font-semibold mb-4">
                  B
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Quality Leadership and Governance in Africa
                </h3>

              </div>

              <div className="space-y-8">

                <FrameworkCard
                  number="1"
                  title="Rethinking Leadership: From Power to Purpose"
                >
                  <p className="mb-4">
                    The current challenge is that leadership can become
                    centered on the accumulation of personal or
                    clan-based power.
                  </p>

                  <p className="mb-4">
                    A new paradigm calls for transformational leadership
                    rooted in purpose, accountability, ethics, and
                    long-term impact.
                  </p>

                  <p>
                    This includes approaches such as servant leadership and
                    leadership inspired by African values such as Ubuntu.
                  </p>
                </FrameworkCard>

                <FrameworkCard
                  number="2"
                  title="Reshaping Governance: Institutions That Serve People"
                >
                  <p className="mb-4">
                    The objective is to shift from extractive institutions
                    toward inclusive and accountable institutions.
                  </p>

                  <ul className="list-disc pl-6 space-y-2">

                    <li>Participatory constitutional reform</li>

                    <li>
                      Digitalization of public administration
                    </li>

                    <li>
                      Stronger transparency and citizen auditing mechanisms
                    </li>

                    <li>
                      Real and effective decentralization
                    </li>

                  </ul>
                </FrameworkCard>

                <FrameworkCard
                  number="3"
                  title="New Patterns: Leadership Ecosystems & Collaborative Governance"
                >
                  <ul className="list-disc pl-6 space-y-3">

                    <li>
                      Moving from verticality toward horizontality through
                      co-creation of public policies with citizens, diaspora,
                      youth, and local communities.
                    </li>

                    <li>
                      Developing multi-stakeholder coalitions involving
                      governments, business, civil society, and traditional
                      institutions.
                    </li>

                    <li>
                      Promoting distributed leadership environments where
                      every citizen can become an agent of change.
                    </li>

                  </ul>
                </FrameworkCard>

                <FrameworkCard
                  number="4"
                  title="African Solutions to African Challenges"
                >
                  <ul className="list-disc pl-6 space-y-3">

                    <li>
                      Integrating African wisdom and governance traditions,
                      including systems inspired by chiefdoms and councils
                      of elders, adapted to contemporary challenges.
                    </li>

                    <li>
                      Revaluing Africa’s cultural and spiritual capital in
                      governance models.
                    </li>

                  </ul>
                </FrameworkCard>

                <FrameworkCard
                  number="5"
                  title="Youth & Women as New Pillars of Governance"
                >
                  <ul className="list-disc pl-6 space-y-3">

                    <li>
                      Promoting intergenerational leadership.
                    </li>

                    <li>
                      Expanding access to political and institutional power
                      for women and youth through measures such as smart
                      quotas, campaign financing, and capacity building.
                    </li>

                  </ul>
                </FrameworkCard>

                <FrameworkCard
                  number="6"
                  title="Strategic Actions for Change"
                >
                  <ul className="list-disc pl-6 space-y-3">

                    <li>
                      Establish an African Center for Leadership and
                      Innovative Governance.
                    </li>

                    <li>
                      Launch inter-country dialogue forums on institutional
                      reform.
                    </li>

                    <li>
                      Set up public policy labs led by African youth and
                      intellectuals.
                    </li>

                    <li>
                      Train a new generation of leaders through pan-African
                      governance schools.
                    </li>

                  </ul>
                </FrameworkCard>

              </div>

            </div>

            {/* =====================================================
                C. ECONOMIC SOVEREIGNTY
            ===================================================== */}
            <div>

              <div className="mb-12">

                <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-50 text-orange-700 font-semibold mb-4">
                  C
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Africa’s Economic Sovereignty
                </h3>

                <h4 className="text-xl text-blue-700 font-semibold mb-6">
                  Reclaiming and Reasserting African Sovereignty:
                  Our Fight at the Africa Economic Forum
                </h4>

                <p className="text-lg text-gray-600 leading-relaxed max-w-5xl">
                  The Africa Economic Forum positions itself as a platform
                  for advancing a collective mission around the
                  reappropriation and reconquest of African sovereignty
                  across economic, media, cultural, scientific, and
                  philosophical dimensions. This is presented as a practical
                  pathway toward greater emancipation and prosperity.
                </p>

              </div>

              <div className="space-y-8">

                {/* Economic Sovereignty */}
                <FrameworkCard
                  number="1"
                  title="Economic Sovereignty: An African Market Dominated by African Products"
                >
                  <p className="mb-5">
                    Africa remains significantly dependent on imported
                    products. The legacy page cited intra-African trade as
                    representing approximately 15–18% of total trade,
                    compared with higher levels in Europe and Asia.
                  </p>

                  <p className="font-semibold text-gray-900 mb-3">
                    Proposed directions:
                  </p>

                  <ul className="list-disc pl-6 space-y-3">

                    <li>
                      Strengthen local production and value-added industries.
                    </li>

                    <li>
                      Accelerate implementation of the AfCFTA and expand
                      intra-African trade.
                    </li>

                    <li>
                      Develop strategic policies that nurture homegrown
                      industries while fostering fair and equitable global
                      trade.
                    </li>

                  </ul>
                </FrameworkCard>

                {/* South-South */}
                <FrameworkCard
                  number="2"
                  title="Win-Win South-South and Global Cooperation Based on Equality"
                >
                  <p className="mb-5">
                    Global engagement should move away from asymmetric
                    partnerships that perpetuate dependency and toward
                    cooperation based on equality and shared value.
                  </p>

                  <ul className="list-disc pl-6 space-y-3">

                    <li>
                      Strengthen South-South alliances, including engagement
                      with platforms such as BRICS+ and ASEAN-Africa.
                    </li>

                    <li>
                      Enhance Africa’s bargaining power in global economic
                      relations.
                    </li>

                    <li>
                      Promote technology and knowledge transfer that
                      prioritizes long-term African development.
                    </li>

                    <li>
                      Advance discussions around debt justice and fair
                      financing.
                    </li>

                  </ul>
                </FrameworkCard>

                {/* Media Sovereignty */}
                <FrameworkCard
                  number="3"
                  title="Media Sovereignty: Controlling Our Narrative"
                >
                  <p className="mb-5">
                    The legacy page highlighted concerns about the
                    significant reliance of African media ecosystems on
                    external content and argued for greater African
                    ownership of narratives about the continent.
                  </p>

                  <ul className="list-disc pl-6 space-y-3">

                    <li>
                      Invest in Pan-African media networks and Afrocentric
                      digital platforms.
                    </li>

                    <li>
                      Promote balanced representation in international media.
                    </li>

                    <li>
                      Support journalistic training and investigative
                      reporting rooted in African realities.
                    </li>

                  </ul>
                </FrameworkCard>

                {/* Cultural Sovereignty */}
                <FrameworkCard
                  number="4"
                  title="Cultural Sovereignty: Reclaiming Our Heritage"
                >
                  <p className="mb-5">
                    Cultural sovereignty focuses on the protection,
                    preservation, and revitalization of Africa’s heritage.
                  </p>

                  <ul className="list-disc pl-6 space-y-3">

                    <li>
                      Support the repatriation of African cultural artifacts.
                    </li>

                    <li>
                      Resist cultural domination and strengthen African
                      cultural identity.
                    </li>

                    <li>
                      Revitalize indigenous African languages.
                    </li>

                    <li>
                      Support Afrocentric education and creative industries,
                      including Nollywood, Afrobeats, and African literature
                      as sources of global soft power.
                    </li>

                  </ul>
                </FrameworkCard>

                {/* Scientific Sovereignty */}
                <FrameworkCard
                  number="5"
                  title="Scientific Sovereignty: Innovation on Our Terms"
                >
                  <p className="mb-5">
                    Scientific sovereignty requires strengthening Africa’s
                    capacity to conduct research, develop technology, and
                    retain scientific talent.
                  </p>

                  <ul className="list-disc pl-6 space-y-3">

                    <li>
                      Increase investment in research and development.
                    </li>

                    <li>
                      Establish African-led research hubs in areas including
                      artificial intelligence, renewable energy, and
                      medicine.
                    </li>

                    <li>
                      Create competitive opportunities for African
                      scientists and innovators.
                    </li>

                    <li>
                      Reduce the effects of brain drain by strengthening
                      local scientific and innovation ecosystems.
                    </li>

                  </ul>
                </FrameworkCard>

                {/* Philosophical Sovereignty */}
                <FrameworkCard
                  number="6"
                  title="Philosophical Sovereignty: Decolonizing African Thought"
                >
                  <p className="mb-5">
                    The legacy framework argued for greater recognition of
                    endogenous African knowledge systems and intellectual
                    traditions in shaping policies and institutions.
                  </p>

                  <ul className="list-disc pl-6 space-y-3">

                    <li>
                      Promote endogenous knowledge systems, including Ubuntu,
                      Negritude, and African feminist thought.
                    </li>

                    <li>
                      Develop educational curricula that reflect Africa’s
                      historical and philosophical contributions.
                    </li>

                    <li>
                      Foster critical thinking aligned with African
                      socio-economic realities.
                    </li>

                  </ul>
                </FrameworkCard>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================================
            OUR STRATEGIC ROLE
        ========================================================= */}
        <section className="py-24 bg-blue-950 text-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-5xl mx-auto text-center">

              <span className="text-blue-300 font-semibold uppercase tracking-wider text-sm">
                Permanent Strategic Platform
              </span>

              <h2 className="text-4xl lg:text-5xl font-bold mt-3 mb-8">
                Our Strategic Role
              </h2>

              <p className="text-xl text-blue-100 leading-relaxed mb-8">
                The Africa Economic Forum is designed as a permanent
                strategic platform, not a one-off event. It aligns African
                sovereign priorities with global capital, policy frameworks,
                and execution capacity in a structured and continuous manner.
              </p>

              <p className="text-lg text-blue-100 leading-relaxed mb-8">
                Through sector-specific forums, high-level deal rooms, and
                year-round engagement, the AEF enables governments, investors,
                and institutions to move beyond dialogue toward partnerships,
                co-investment structures, and policy alignment.
              </p>

              <p className="text-lg text-blue-100 leading-relaxed">
                The AEF serves as a bridge between strategy and execution,
                bringing political vision, private capital, and institutional
                capacity into the same architecture — with Africa setting
                the agenda and defining the terms of cooperation.
              </p>

            </div>

          </div>

        </section>

        {/* =========================================================
            MISSION
        ========================================================= */}
        <section className="py-20 bg-gray-50">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">

              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t('about.missionTitle')}
              </h2>

              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                {t('about.missionSubtitle')}
              </p>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {[
                {
                  icon: 'ri-handshake-line',
                  bg: 'bg-blue-100',
                  text: 'text-blue-600',
                  title: t('about.winWinTitle'),
                  textContent: t('about.winWinText'),
                },
                {
                  icon: 'ri-user-star-line',
                  bg: 'bg-green-100',
                  text: 'text-green-600',
                  title: t('about.visionaryLeadershipTitle'),
                  textContent: t('about.visionaryLeadershipText'),
                },
                {
                  icon: 'ri-links-line',
                  bg: 'bg-purple-100',
                  text: 'text-purple-600',
                  title: t('about.strategicConnectionsTitle'),
                  textContent: t('about.strategicConnectionsText'),
                },
                {
                  icon: 'ri-megaphone-line',
                  bg: 'bg-orange-100',
                  text: 'text-orange-600',
                  title: t('about.narrativeElevationTitle'),
                  textContent: t('about.narrativeElevationText'),
                },
                {
                  icon: 'ri-community-line',
                  bg: 'bg-teal-100',
                  text: 'text-teal-600',
                  title: t('about.communityEmpowermentTitle'),
                  textContent: t('about.communityEmpowermentText'),
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white p-8 rounded-xl shadow-md"
                >

                  <div
                    className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-6`}
                  >
                    <i
                      className={`${item.icon} text-2xl ${item.text}`}
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-center leading-relaxed">
                    {item.textContent}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* =========================================================
            VISION
        ========================================================= */}
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

        {/* =========================================================
            CORE VALUES
        ========================================================= */}
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
                  className="bg-gray-50 p-8 rounded-xl"
                >

                  <div className="flex items-center mb-6">

                    <div className="text-3xl mr-4">
                      {item.icon}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>

                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {item.text}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* =========================================================
            ORGANIZING COMMITTEE
        ========================================================= */}
        <section className="py-20 bg-gray-50">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">

              <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">
                Leadership
              </span>

              <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">
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

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                  <img
                    src="/images/billy-issa.jpg"
                    alt="Dr. Billy Issa"
                    className="w-full h-72 object-cover object-top"
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

        {/* =========================================================
            CTA
        ========================================================= */}
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

      {/* =========================================================
          FOOTER
      ========================================================= */}
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
