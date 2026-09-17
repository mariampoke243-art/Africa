import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type CommitteeMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
};

const advisoryBoard: CommitteeMember[] = [
  {
    name: 'Hon. Dr. Akwasi Opong-Fosu',
    role: 'Advisory Board Member',
    image: '/images/Hon.Dr.Akwasi.jpg',
    bio: `Hon. Dr. Akwasi Opong-Fosu is a distinguished Ghanaian politician, governance and public policy expert with over four decades of public service. He spent almost two decades in local government leadership, including as Mayor, and later served as President of the African Union of Local Authorities and UN Special Advisor on Local Authorities. A former Member of Parliament, he held key ministerial portfolios, including Minister of State at the Presidency responsible for Development Authorities. He currently chairs the Ghana Investment Promotion Centre and founded the Africa Global Emergence Centre, a research, policy and advocacy think tank working at the intersection of governance and economic growth through increased trade and investment flows to Africa.`,
  },
];

const executiveBoard: CommitteeMember[] = [
  {
    name: 'Zarinah Traci Silas',
    role: 'Chair and Executive Board Member of the Africa Economic Forum',
    image: '/images/Zarinah Traci Silas.jpg',
    bio: `Zarinah Traci Silas, J.D. is Peace Chair and Executive Board Member of the Africa Economic Forum, a career federal executive holding a lifetime appointment to the United States Senior Executive Service. Over two decades, she has advised Presidents, Cabinet Secretaries, and world leaders on national security and counterterrorism, building DHS’s $120 million USD terrorism prevention program and founding CBP’s first Forced Labor Division, commanding a $3 billion USD portfolio against global trafficking. As a trained international lawyer, she is Co-Founder of Africa Resources Capital Holdings and CEO of Ballard & Silas LLC, driving international trade and diplomacy worldwide.`,
  },
  {
    name: 'Jacqueline JaQ Campbell',
    role: 'Chair of the AEF Investors Alliance & Co-Chair, Africa Women Forum',
    image: '/images/Jaqueline JaQ Campbell.jpg',
    bio: `Jacqueline “JaQ” Campbell is a wealth management executive, entrepreneur, educator, and U.S.–Africa investment strategist with more than three decades of financial-services experience. She is on a global investment and trade mission to bring capital and careers to the continent of Africa, building bridges between investors, institutions, businesses, and emerging talent. As Founder & CEO of Alexander Legacy Private Wealth, Visiting Faculty at GIMPA, and Chair of the Africa Economic Forum Investors Alliance, her work advances investment, workforce development, and economic opportunity. Enstooled in Ghana as Nana Yaa Asabea, JaQ is committed to transforming relationships into sustainable investment, ownership, and generational prosperity across Africa.`,
  },
  {
    name: 'Dr. Femi Salami',
    role: 'Executive Board Member & Chair of the Africa Mining & Minerals Forum',
    image: '/images/Dr. Femi Salami.jpg',
    bio: `Dr. Femi Salami (Ph.D., P.E., MAusIMM) is a distinguished mining engineer, academic, and professional with expertise in mining innovation, energy sustainability, critical minerals development, and climate-smart mining. He earned a First-Class Bachelor’s degree in Mining Engineering from the Federal University of Technology Akure, Nigeria and a Ph.D. in Mining Engineering from Missouri University of Science and Technology, USA. Dr. Salami has received over 70 awards and recognitions for scholarly excellence in Mining. He is a licensed mining engineer in the United Kingdom and Nigeria and a Professional Engineer (P.E.) in the United States. He is also a member of several leading professional and scientific organizations.`,
  },
  {
    name: 'H.E. Abraham Dwuma Odoom',
    role: 'Former Member of Parliament and Deputy Minister of Agriculture, Ghana',
    image: '/images/abraham-dwuma-odoom.jpg',
    bio: `Ghanaian public servant and former Member of Parliament with experience in agricultural transformation, pro-poor policies, agribusiness, rural development, and food security.`,
  },
  {
    name: 'Amina Touré',
    role: 'Director of Communication, Media & Public Relations, Africa Economic Forum',
    image: '/images/amina-Touré.jpeg',
    bio: `Development practitioner, researcher, and strategic communicator specializing in African political economy and global narratives. She holds a Bachelor of Laws and an MSc in International Development & Humanitarian Emergencies from LSE and is completing an MPhil in African Studies at Cambridge. Her research and professional work covers extractives, Chinese investment, state-business relations in the DRC, policy research, media strategy, and narrative shaping. She is also an independent journalist covering the conflict in eastern Congo and the mining sector in southern Africa.`,
  },
];

const scientificCommittee: CommitteeMember[] = [
  {
    name: 'Nathan Lewis',
    role: 'International Economist & Author',
    image: '/images/nathan-lewis.jpg',
    bio: `International economist and author specializing in monetary policy, fiscal systems, sound money, sustainable finance, and economic development. He is a Senior Fellow at Discovery Institute.`,
  },
];

function MemberCard({ member }: { member: CommitteeMember }) {
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
          {member.role}
        </p>

        <p className="text-gray-600 text-sm leading-relaxed">
          {member.bio}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
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
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>

              <Link to="/about" className="text-blue-600 font-medium">
                About
              </Link>

              <Link to="/initiatives" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Initiative
              </Link>

              <Link to="/stakeholders" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Stakeholders
              </Link>

              <Link to="/agenda" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Agenda
              </Link>

              <Link to="/publications" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Publications
              </Link>

              <Link to="/meetings" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Meetings
              </Link>

              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
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
                    title={user.user_metadata?.full_name || user.email || 'Profile'}
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="Profile"
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
                          {user.user_metadata?.full_name || 'User'}
                        </div>

                        <div className="text-gray-500 truncate">
                          {user.email}
                        </div>
                      </div>

                      <button
                        onClick={handleViewProfile}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Profile
                      </button>

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign In
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

                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
                  Home
                </Link>

                <Link to="/about" className="text-blue-600 font-medium">
                  About
                </Link>

                <Link to="/initiatives" className="text-gray-700 hover:text-blue-600 font-medium">
                  Initiative
                </Link>

                <Link to="/stakeholders" className="text-gray-700 hover:text-blue-600 font-medium">
                  Stakeholders
                </Link>

                <Link to="/agenda" className="text-gray-700 hover:text-blue-600 font-medium">
                  Agenda
                </Link>

                <Link to="/publications" className="text-gray-700 hover:text-blue-600 font-medium">
                  Publications
                </Link>

                <Link to="/meetings" className="text-gray-700 hover:text-blue-600 font-medium">
                  Meetings
                </Link>

                <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                  Contact
                </Link>

                {user ? (
                  <div className="pt-4 border-t border-gray-100">

                    <div className="flex items-center space-x-3 mb-4">
                      {user.user_metadata?.avatar_url ? (
                        <img
                          src={user.user_metadata.avatar_url}
                          alt="Profile"
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
                        {user.user_metadata?.full_name || 'User'}
                      </span>
                    </div>

                    <button
                      onClick={handleViewProfile}
                      className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium mb-2"
                    >
                      View Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Sign Out
                    </button>

                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      to="/signin"
                      className="block text-gray-700 hover:text-blue-600 font-medium"
                    >
                      Sign In
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
              About the Africa Economic Forum
            </h1>

            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              A pan-African and global platform for economic dialogue,
              strategic cooperation, and sovereign development. More than an
              event, the AEF is a movement that repositions Africa as a
              strategic partner and co-architect of the world's future.
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
                    What We Are
                  </h2>

                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    The Africa Economic Forum (AEF) is a pan-African and global
                    platform for economic dialogue, strategic cooperation, and
                    sovereign development. More than an event, the AEF is a
                    movement that brings together African leaders, governments,
                    investors, entrepreneurs, intellectuals, and international
                    allies to co-create new models of growth, leadership, and
                    global engagement.
                  </p>

                  <p className="text-lg text-gray-600 leading-relaxed">
                    Founded as a response to decades of imbalanced development
                    models, the AEF repositions Africa not as a continent in
                    need, but as a strategic partner, solution provider, and
                    co-architect of the world's future.
                  </p>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20African%20business%20district%20with%20skyscrapers%20and%20economic%20development%2C%20bustling%20financial%20center%20with%20contemporary%20architecture%2C%20symbol%20of%20African%20economic%20sovereignty%20and%20strategic%20partnerships%2C%20dignified%20cooperation&width=600&height=500&seq=what-we-are&orientation=portrait"
                  alt="Africa Economic Development"
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
                Our Mission
              </h2>

              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
                To catalyze economic transformation and sovereignty in Africa
                through strategic cooperation and visionary leadership.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {[
                {
                  icon: 'ri-handshake-line',
                  color: 'blue',
                  title: 'Win-Win Cooperation',
                  text: 'Designing win-win cooperation frameworks between Africa and global partners based on mutual respect and shared prosperity.',
                },
                {
                  icon: 'ri-user-star-line',
                  color: 'green',
                  title: 'Visionary Leadership',
                  text: 'Promoting ethical, inclusive and visionary leadership across the continent that builds institutions and creates lasting change.',
                },
                {
                  icon: 'ri-links-line',
                  color: 'purple',
                  title: 'Strategic Connections',
                  text: "Connecting African opportunities with capital, technology, and talent to unlock the continent's full potential.",
                },
                {
                  icon: 'ri-megaphone-line',
                  color: 'orange',
                  title: 'Narrative Elevation',
                  text: "Elevating Africa's narrative and value in the global order by challenging stereotypes and amplifying African voices.",
                },
                {
                  icon: 'ri-community-line',
                  color: 'teal',
                  title: 'Community Empowerment',
                  text: 'Building ecosystems that empower youth, women, and local communities to shape and lead the future.',
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
              Our Vision
            </h2>

            <p className="text-2xl text-blue-100 max-w-5xl mx-auto leading-relaxed">
              To position Africa as a sovereign economic power, a center of
              innovation, and a global co-leader — shaping the future through
              strategic alliances, dignified cooperation, and purpose-driven
              leadership.
            </p>

          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do and shape our approach
                to creating transformational change across Africa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {[
                ['🌍', 'Sovereignty & Self-Determination', 'We believe Africa must define its own path, develop on its own terms, and build strategic autonomy in economy, media, culture, science, and governance.'],
                ['🤝', 'Equity & Win-Win Cooperation', 'We advocate for fair partnerships based on mutual benefit, respect, and shared prosperity — not charity or dependency.'],
                ['🔥', 'Transformational Leadership', 'We promote ethical, servant, and purpose-driven leadership that builds institutions, uplifts people, and creates lasting change.'],
                ['📣', 'Narrative Justice', 'We challenge stereotypes and amplify African voices, successes, and world-changing contributions.'],
                ['💡', 'Innovation & Excellence', "We nurture local talents, ideas and technologies that offer bold solutions to Africa's and the world's challenges."],
                ['👥', 'Inclusion & Intergenerational Empowerment', 'We create space for youth, women, and communities to shape and lead the future.'],
              ].map(([icon, title, text]) => (
                <div
                  key={title}
                  className="bg-gray-50 p-8 rounded-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="text-3xl mr-4">{icon}</div>

                    <h3 className="text-xl font-semibold text-gray-900">
                      {title}
                    </h3>
                  </div>

                  <p className="text-gray-600">
                    {text}
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
                Our Impact
              </h2>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Building bridges between Africa and the world through strategic
                partnerships and transformational initiatives.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              {[
                ['54', 'African Countries Engaged'],
                ['1000+', 'Global Leaders Connected'],
                ['$50B+', 'Investment Opportunities Facilitated'],
                ['25+', 'Strategic Partnerships Formed'],
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
                Organizing Committee
              </h2>

              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Meet the distinguished leaders guiding Africa's economic
                transformation through strategic vision, executive leadership,
                and scientific expertise.
              </p>
            </div>

            {/* Founder */}
            <div className="mb-20">

              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  🌟 Founder
                </h3>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Visionary leadership driving Africa's economic transformation
                  and global strategic partnerships.
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
                      Visionary Founder &amp; Host
                    </p>

                    <p className="text-gray-600 text-sm leading-relaxed">
                      Visionary leader and architect of the Africa Economic
                      Forum, dedicated to repositioning Africa as a strategic
                      global partner and driving sustainable economic
                      transformation across the continent through innovative
                      partnerships and sovereign development initiatives.
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
                  Distinguished leaders providing strategic guidance and vision
                  to the Africa Economic Forum.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {advisoryBoard.map((member) => (
                  <MemberCard
                    key={member.name}
                    member={member}
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
                  Executive leaders supporting the Forum’s strategic direction,
                  regional engagement, and implementation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {executiveBoard.map((member) => (
                  <MemberCard
                    key={member.name}
                    member={member}
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
                  Economic and scientific expertise supporting evidence-based
                  dialogue and strategic development.
                </p>
              </div>

              <div className="max-w-md mx-auto">
                {scientificCommittee.map((member) => (
                  <MemberCard
                    key={member.name}
                    member={member}
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
              Join the Movement
            </h2>

            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Be part of Africa's transformation. Connect with visionary
              leaders, contribute to strategic partnerships, and help shape
              the continent's sovereign economic future.
            </p>

            <Link
              to="/join"
              className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Become a Member
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
                About us
              </h3>

              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white">
                    Our mission
                  </Link>
                </li>

                <li>
                  <Link to="/framework" className="text-gray-300 hover:text-white">
                    Our Institutional Framework
                  </Link>
                </li>

                <li>
                  <Link to="/history" className="text-gray-300 hover:text-white">
                    History
                  </Link>
                </li>

                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white">
                    Leadership and governance
                  </Link>
                </li>

                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white">
                    Our Impact
                  </Link>
                </li>
              </ul>
            </div>

            {/* More */}
            <div>
              <h3 className="font-semibold text-lg mb-6">
                More from the Forum
              </h3>

              <ul className="space-y-3">
                <li>
                  <Link to="/initiatives" className="text-gray-300 hover:text-white">
                    Centres
                  </Link>
                </li>

                <li>
                  <Link to="/meetings" className="text-gray-300 hover:text-white">
                    Meetings
                  </Link>
                </li>

                <li>
                  <Link to="/stakeholders" className="text-gray-300 hover:text-white">
                    Stakeholders
                  </Link>
                </li>

                <li>
                  <Link to="/agenda" className="text-gray-300 hover:text-white">
                    Forum Stories
                  </Link>
                </li>

                <li>
                  <Link to="/publications" className="text-gray-300 hover:text-white">
                    Press releases
                  </Link>
                </li>

                <li>
                  <Link to="/gallery" className="text-gray-300 hover:text-white">
                    Photo gallery
                  </Link>
                </li>

                <li>
                  <Link to="/publications" className="text-gray-300 hover:text-white">
                    Podcasts
                  </Link>
                </li>

                <li>
                  <Link to="/publications" className="text-gray-300 hover:text-white">
                    Videos
                  </Link>
                </li>
              </ul>
            </div>

            {/* Engage */}
            <div>
              <h3 className="font-semibold text-lg mb-6">
                Engage with us
              </h3>

              <ul className="space-y-3">

                <li>
                  {isAuthenticated && user ? (
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/signin"
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Sign in
                    </Link>
                  )}
                </li>

                <li>
                  <Link to="/partners" className="text-gray-300 hover:text-white">
                    Become our partner
                  </Link>
                </li>

                <li>
                  <Link to="/join" className="text-gray-300 hover:text-white">
                    Become a member
                  </Link>
                </li>

                <li>
                  <Link to="/publications" className="text-gray-300 hover:text-white">
                    Subscribe to our press releases
                  </Link>
                </li>

                <li>
                  <Link to="/publications" className="text-gray-300 hover:text-white">
                    Subscribe to our newsletters
                  </Link>
                </li>

                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white">
                    Contact us
                  </Link>
                </li>

              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-6">
                Quick links
              </h3>

              <ul className="space-y-3 mb-8">
                <li>
                  <Link to="/initiatives" className="text-gray-300 hover:text-white">
                    Sustainability at the Forum
                  </Link>
                </li>

                <li>
                  <Link to="/careers" className="text-gray-300 hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>

              <h4 className="font-semibold mb-4">
                Language editions
              </h4>

              <div className="flex space-x-2">
                <Link to="/" className="text-gray-300 hover:text-white">
                  PT
                </Link>

                <span className="text-gray-500">•</span>

                <Link to="/en" className="text-gray-300 hover:text-white">
                  EN
                </Link>

                <span className="text-gray-500">•</span>

                <Link to="/es" className="text-gray-300 hover:text-white">
                  ES
                </Link>

                <span className="text-gray-500">•</span>

                <Link to="/fr" className="text-gray-300 hover:text-white">
                  FR
                </Link>
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
                  Privacy Policy &amp; Terms of Service
                </Link>

                <p>
                  © 2026 Africa Economic Forum
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
