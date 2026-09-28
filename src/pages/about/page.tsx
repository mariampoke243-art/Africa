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
    bio: `Amina Touré is a development practitioner, researcher, and strategic communicator with a strong focus on Africa’s political economy and global narratives. Amina holds a Bachelor of Laws and an MSc in International Development & Humanitarian Emergencies from the London School of Economics, and is completing an MPhil in African Studies at the University of Cambridge, specializing in extractive industries, Chinese investment, and state–business relations in the Democratic Republic of Congo (DRC).`,
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-64 object-cover object-top"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <div className="p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
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
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src="https://static.readdy.ai/image/849a2f489cee8d6814d30c5afad3a84a/b4bfbdc8f08b91298cef1ff69a069583.png"
                  alt="AEF Logo"
                  className="h-10 w-10 object-contain"
                />
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">{t('header.home')}</Link>
              <Link to="/about" className="text-blue-600 font-medium">{t('header.about')}</Link>
              <Link to="/initiatives" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">{t('header.initiatives')}</Link>
              <Link to="/stakeholders" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">{t('header.stakeholders')}</Link>
              <Link to="/agenda" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">{t('header.agenda')}</Link>
              <Link to="/publications" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">{t('header.publications')}</Link>
              <Link to="/meetings" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">{t('header.meetings')}</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">{t('header.contact')}</Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {getInitials(user.user_metadata?.full_name || user.email?.charAt(0) || 'U')}
                      </div>
                    )}
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                        <div className="font-medium truncate">{user.user_metadata?.full_name || t('header.user')}</div>
                        <div className="text-gray-500 truncate">{user.email}</div>
                      </div>
                      <button onClick={handleViewProfile} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('header.viewProfile')}</button>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('header.signOut')}</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/signin" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">{t('header.signIn')}</Link>
              )}
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-blue-600 focus:outline-none">
                <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`} />
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 font-medium">{t('header.home')}</Link>
                <Link to="/about" className="text-blue-600 font-medium">{t('header.about')}</Link>
                <Link to="/initiatives" className="text-gray-700 font-medium">{t('header.initiatives')}</Link>
                <Link to="/stakeholders" className="text-gray-700 font-medium">{t('header.stakeholders')}</Link>
                <Link to="/agenda" className="text-gray-700 font-medium">{t('header.agenda')}</Link>
                <Link to="/publications" className="text-gray-700 font-medium">{t('header.publications')}</Link>
                <Link to="/meetings" className="text-gray-700 font-medium">{t('header.meetings')}</Link>
                <Link to="/contact" className="text-gray-700 font-medium">{t('header.contact')}</Link>
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
            backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url('https://readdy.ai/api/search-image?query=African%20leaders%20and%20business%20executives%20in%20a%20modern%20conference%20hall%20discussing%20economic%20development&width=1920&height=800&seq=about-hero&orientation=landscape')`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">{t('about.heroTitle', { defaultValue: 'About Africa Economic Forum' })}</h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">{t('about.heroSubtitle', { defaultValue: 'Driving sustainable development, investment diplomacy, and transformative growth across the African continent.' })}</p>
          </div>
        </section>

        {/* ================= WHAT WE ARE ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.whatWeAreTitle', { defaultValue: 'What We Are' })}</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">{t('about.whatWeAreText1', { defaultValue: 'The Africa Economic Forum (AEF) is an elite premier platform bridging global investors, policy shapers, and African enterprise leaders to catalyze high-impact economic transformations.' })}</p>
                <p className="text-lg text-gray-600 leading-relaxed">{t('about.whatWeAreText2', { defaultValue: 'We foster direct dialogue, strategic alliances, and concrete trade actions designed to secure Africa’s economic sovereignty and prosperity.' })}</p>
              </div>
              <div>
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20African%20business%20district%20with%20skyscrapers%20and%20economic%20development&width=600&height=500&seq=what-we-are&orientation=portrait"
                  alt="What We Are"
                  className="w-full h-96 object-cover object-top rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= THE CONCEPT: THE PERPETUAL FORUM & THE AFRICAN TABLE ================= */}
        <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">The Concept: The Perpetual Forum & The African Table</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Reinventing how Africa engages with the global economy through continuous dialogue, inclusive participation, and sovereign-led platforms that move beyond annual events into perpetual execution.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">The Perpetual Forum</h3>
                <p className="text-gray-600 leading-relaxed">
                  Unlike traditional summits that conclude when the conference ends, the Africa Economic Forum operates as a continuous engine of action, connecting public and private stakeholders year-round to track deliverables, sustain momentum, and translate policy agreements into concrete operational realities.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">The African Table</h3>
                <p className="text-gray-600 leading-relaxed">
                  A foundational philosophy ensuring that Africans are not merely subjects of discussion or resource providers, but principal architects, decision-makers, and equal negotiators at every global and regional economic roundtable.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= VISION ================= */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8">{t('about.visionTitle', { defaultValue: 'Our Vision' })}</h2>
            <p className="text-2xl text-blue-100 max-w-5xl mx-auto leading-relaxed">
              {t('about.visionText', { defaultValue: 'To forge an economically unified, sovereign, and self-reliant Africa empowered by visionary leadership, industrial innovation, and equitable global partnerships.' })}
            </p>
          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.missionTitle', { defaultValue: 'Our Mission' })}</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">{t('about.missionSubtitle', { defaultValue: 'Mobilizing capital, technology, and strategic influence to accelerate Africa’s sustainable emergence.' })}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: 'ri-handshake-line', color: 'blue', title: 'Win-Win Partnerships', text: 'Promoting investment structures that deliver mutual prosperity for international partners and African nations.' },
                { icon: 'ri-user-star-line', color: 'green', title: 'Visionary Leadership', text: 'Cultivating governance excellence and strategic foresight across public and private sectors.' },
                { icon: 'ri-links-line', color: 'purple', title: 'Strategic Connections', text: 'Bridging policymakers, global investors, and innovators to ignite high-value joint ventures.' },
                { icon: 'ri-megaphone-line', color: 'orange', title: 'Narrative Elevation', text: 'Reshaping global perceptions of Africa by highlighting home-grown innovation, resilience, and wealth creation.' },
                { icon: 'ri-community-line', color: 'teal', title: 'Community Empowerment', text: 'Ensuring grassroots economic inclusion, capacity building, and generational prosperity.' },
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 p-8 rounded-lg shadow-sm">
                  <div className={`w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <i className={`${item.icon} text-2xl text-blue-600`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{item.title}</h3>
                  <p className="text-gray-600 text-center">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.coreValuesTitle', { defaultValue: 'Core Values' })}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('about.coreValuesSubtitle', { defaultValue: 'The ethical and operational anchors guiding our initiatives.' })}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: '🌍', title: 'Sovereignty', text: 'Advocating for African self-determination and control over resources.' },
                { icon: '🤝', title: 'Equity', text: 'Demanding fair participation in global trade agreements and financial markets.' },
                { icon: '🔥', title: 'Transformational Leadership', text: 'Empowering leaders committed to systemic, durable impact.' },
                { icon: '📣', title: 'Narrative Justice', text: 'Correcting historical imbalances in how African economic stories are told.' },
                { icon: '💡', title: 'Innovation', text: 'Leveraging modern technology, artificial intelligence, and progressive policy.' },
                { icon: '👥', title: 'Inclusion', text: 'Ensuring youth, women, and marginalized communities drive economic gains.' },
              ].map((item) => (
                <div key={item.title} className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="flex items-center mb-6">
                    <div className="text-3xl mr-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ORGANIZING COMMITTEE & LEADERSHIP ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.organizingCommitteeTitle', { defaultValue: 'Leadership & Committees' })}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('about.organizingCommitteeSubtitle', { defaultValue: 'Meet the distinguished minds driving the Africa Economic Forum.' })}</p>
            </div>

            {/* Founder */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">🌟 Founder & President</h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Visionary leadership steering the Africa Economic Forum toward global impact.</p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                  <img src="/images/billy-issa.jpg" alt="Dr. Billy Issa" className="w-full h-64 object-cover object-top" />
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Dr. Billy Issa</h4>
                    <p className="text-sm text-blue-600 mb-3 font-medium">Founder and President, Africa Economic Forum</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Dr. Billy Issa is a visionary leader and international strategist committed to redefining Africa’s economic landscape. Through the Africa Economic Forum, he champions investment diplomacy, sovereign industrialization, and sustainable public-private partnerships.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Advisory Board */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">AEF Strategic Advisory Board</h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Former heads of state, eminent diplomats, and global policy leaders guiding our strategic direction.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {advisoryBoard.map((member) => (
                  <MemberCard key={member.name} member={member} t={t} />
                ))}
              </div>
            </div>

            {/* Executive Board */}
            <div className="mb-20">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">AEF Executive Board</h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Specialized forum chairs and executive authorities directing core operational sectors.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {executiveBoard.map((member) => (
                  <MemberCard key={member.name} member={member} t={t} />
                ))}
              </div>
            </div>

            {/* Scientific Committee */}
            <div>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Scientific Committee</h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Scholars, researchers, and macroeconomic experts providing analytical foundation and policy insights.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {scientificCommittee.map((member) => (
                  <MemberCard key={member.name} member={member} t={t} />
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Join the Movement</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">Be part of the premier network shaping Africa's economic destiny.</p>
            <Link to="/join" className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Become a Member
            </Link>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-semibold text-lg mb-6">{t('footer.aboutUs', { defaultValue: 'About Us' })}</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-300 hover:text-white">Our Mission</Link></li>
                <li><Link to="/framework" className="text-gray-300 hover:text-white">Our Framework</Link></li>
                <li><Link to="/history" className="text-gray-300 hover:text-white">History</Link></li>
                <li><Link to="/about" className="text-gray-300 hover:text-white">Leadership</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">{t('footer.moreFromForum', { defaultValue: 'More from Forum' })}</h3>
              <ul className="space-y-3">
                <li><Link to="/initiatives" className="text-gray-300 hover:text-white">Centres</Link></li>
                <li><Link to="/meetings" className="text-gray-300 hover:text-white">Meetings</Link></li>
                <li><Link to="/stakeholders" className="text-gray-300 hover:text-white">Stakeholders</Link></li>
                <li><Link to="/agenda" className="text-gray-300 hover:text-white">Forum Stories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">{t('footer.engage', { defaultValue: 'Engage' })}</h3>
              <ul className="space-y-3">
                <li><Link to="/partners" className="text-gray-300 hover:text-white">Partner With Us</Link></li>
                <li><Link to="/join" className="text-gray-300 hover:text-white">Become a Member</Link></li>
                <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">{t('footer.quickLinks', { defaultValue: 'Quick Links' })}</h3>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/careers" className="text-gray-300 hover:text-white">Careers</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 Africa Economic Forum. All rights reserved. Developed by Code Design Global.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
