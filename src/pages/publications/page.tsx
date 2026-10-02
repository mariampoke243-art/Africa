import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function PublicationsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setIsProfileDropdownOpen(false);
  };

  const handleViewProfile = () => {
    navigate('/profile');
    setIsProfileDropdownOpen(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const switchToCreateAccount = () => {
    setShowCreateAccount(true);
  };

  const switchToSignIn = () => {
    setShowCreateAccount(false);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSignInModal(false);
  };

  const handleCreateAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSignInModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
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
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
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
              <Link to="/publications" className="text-blue-600 font-medium">
                Publications
              </Link>
              <Link to="/meetings" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Meetings
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title={user.user_metadata?.full_name || user.email}
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
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                        <div className="font-medium">
                          {user.user_metadata?.full_name || 'User'}
                        </div>
                        <div className="text-gray-500">{user.email}</div>
                      </div>

                      <button
                        onClick={handleViewProfile}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        View Profile
                      </button>

                      <button
                        onClick={handleSignOut}
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <i
                  className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}
                ></i>
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

                <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">
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

                <Link to="/publications" className="text-blue-600 font-medium">
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
                      onClick={() => {
                        handleViewProfile();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium mb-2"
                    >
                      View Profile
                    </button>

                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
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

      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url('https://readdy.ai/api/search-image?query=African%20economic%20forum%20business%20leaders%20strategic%20economic%20discussion%20Africa%20geopolitics%20investment%20modern%20professional%20conference%20setting&width=1920&height=800&seq=aef-insights-hero&orientation=landscape')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            INSIGHTS DE L'AEF
          </h1>

          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Perspectives sur l’économie, le capital, la géopolitique et la transformation stratégique de l’Afrique
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-1 bg-blue-900 mx-auto mb-8"></div>

          <p className="text-xl text-gray-600 leading-relaxed">
            Plate-forme éditoriale du Forum économique africain explorant les
            forces économiques, géopolitiques et d'investissement qui façonnent
            le rôle de l'Afrique dans l'évolution de l'ordre mondial.
          </p>
        </div>
      </section>

      {/* Perspectives de l'AEF */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Perspectives de l’AEF
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Perspectives de l’AEF rassemble des commentaires et des analyses
                sur les questions qui façonnent l’agenda économique de l’Afrique.
              </p>

              <p className="text-lg text-gray-600 mt-4">
                La plate-forme portera sur les thèmes suivants :
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Réalignement économique mondial',
                'Flux d’investissements et d’investissements',
                'Partenariats Afrique-Golfe',
                'Échanges et AFLE',
                'Industrialisation et création de valeur',
                'Minéraux critiques et ressources stratégiques',
                'Énergie et infrastructure',
                'Souveraineté de la santé',
                'Technologie et transformation numérique',
                'Agriculture et sécurité alimentaire',
                'Partenariats stratégiques et diplomatie économique'
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex items-start"
                >
                  <div className="w-2 h-2 bg-blue-900 rounded-full mt-2.5 mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg font-semibold text-blue-900">
                Les publications arrivent bientôt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Briefs stratégiques */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Briefs stratégiques de l'AEF
            </h2>

            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Analyse ciblée sur l'économie stratégique, l'investissement et les
              questions géopolitiques qui affectent l'Afrique.
            </p>

            <div className="bg-gray-50 rounded-xl p-8 text-left">
              <p className="text-lg text-gray-600 leading-relaxed">
                Les briefs stratégiques de l'AEF donneront aux investisseurs,
                aux décideurs, aux chefs d'entreprise et aux institutions des
                perspectives concises.
              </p>
            </div>

            <p className="mt-8 text-lg font-semibold text-blue-900">
              Les premiers briefs arrivent bientôt.
            </p>
          </div>
        </div>
      </section>

      {/* Recherche et Intelligence AEF */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-5">
                Recherche et Intelligence AEF
              </h2>

              <h3 className="text-2xl font-semibold text-blue-900 mb-6">
                Établissement d'une Plate-forme Africaine de Recherche et d'Intelligence
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed">
                Africa Economic Forum élabore un programme de recherche et
                d'intelligence dédié, axé sur la transformation économique,
                les flux d'investissements, les secteurs stratégiques et
                l'évolution de la position de l'Afrique dans l'économie mondiale.
              </p>

              <p className="text-lg text-gray-600 mt-6">
                Le programme se développera progressivement :
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                'Documents de recherche',
                'Briefs de politique',
                'Analyse par pays et secteur',
                'Intelligence d’investissements',
                'Perspectives économiques',
                'Rapports spéciaux',
                'Données et publications analytiques'
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <i className="ri-line-chart-line text-xl text-blue-900"></i>
                  </div>

                  <h4 className="font-semibold text-gray-900">
                    {item}
                  </h4>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg font-semibold text-blue-900">
                Le programme AEF Research &amp; Intelligence est en cours d'élaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Des idées à l'investissement */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Des idées à l'investissement
          </h2>

          <p className="text-xl text-blue-100 leading-relaxed mb-12">
            L'AEF connecte les idées et l'analyse avec les personnes et les
            institutions capables de transformer les opportunités en
            investissements, partenariats et exécution.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/10 rounded-lg p-6">
              <p className="text-lg">
                <strong>Les gouvernements</strong> apportent des opportunités.
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <p className="text-lg">
                <strong>Les investisseurs</strong> apportent du capital.
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <p className="text-lg">
                <strong>Les partenaires internationaux</strong> apportent les
                marchés et l'expertise.
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <p className="text-lg">
                <strong>Les projets</strong> rencontrent les personnes qui
                peuvent les financer et les exécuter.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              to="/"
              className="inline-flex items-center bg-white text-blue-900 px-8 py-4 rounded-md hover:bg-gray-100 font-semibold transition-colors"
            >
              Explore Africa Economic Forum 2026
              <i className="ri-arrow-right-line ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Restez connecté */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Restez connecté
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed mb-10">
            Suivez Africa Economic Forum pour de nouvelles perspectives,
            des analyses stratégiques et des annonces de l'écosystème AEF.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://www.linkedin.com/company/the-africa-economic-forum/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-900 text-white px-8 py-4 rounded-md hover:bg-blue-800 font-semibold transition-colors"
            >
              Suivez l'AEF
            </a>

            <Link
              to="/"
              className="border border-blue-900 text-blue-900 px-8 py-4 rounded-md hover:bg-blue-50 font-semibold transition-colors"
            >
              Explore AEF 2026
            </Link>
          </div>
        </div>
      </section>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {showCreateAccount ? 'Create Account' : 'Sign In'}
                </h3>

                <button
                  onClick={() => setShowSignInModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              {!showCreateAccount ? (
                <>
                  <form onSubmit={handleSignInSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>

                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>

                      <input
                        type="password"
                        name="password"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Enter your password"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="remember_me"
                          className="cursor-pointer"
                        />
                        <span className="text-sm text-gray-600">
                          Remember me
                        </span>
                      </label>

                      <button
                        type="button"
                        className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer"
                    >
                      Sign In
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?

                      <button
                        onClick={switchToCreateAccount}
                        className="text-blue-600 hover:text-blue-800 font-medium ml-1 cursor-pointer"
                      >
                        Create Account
                      </button>
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <form onSubmit={handleCreateAccountSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>

                        <input
                          type="text"
                          name="first_name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="First name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>

                        <input
                          type="text"
                          name="last_name"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>

                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization
                      </label>

                      <input
                        type="text"
                        name="organization"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Your organization"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>

                      <input
                        type="password"
                        name="password"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Create a password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>

                      <input
                        type="password"
                        name="confirm_password"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Confirm your password"
                      />
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="terms_agreement"
                        required
                        className="mt-1 cursor-pointer"
                      />

                      <span className="text-sm text-gray-600">
                        I agree to the Terms of Service and Privacy Policy
                      </span>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        name="newsletter_consent"
                        className="mt-1 cursor-pointer"
                      />

                      <span className="text-sm text-gray-600">
                        I would like to receive updates about Forum activities and events
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-900 text-white px-6 py-3 rounded-md hover:bg-blue-800 font-medium whitespace-nowrap cursor-pointer"
                    >
                      Create Account
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?

                      <button
                        onClick={switchToSignIn}
                        className="text-blue-600 hover:text-blue-800 font-medium ml-1 cursor-pointer"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </>
              )}

              {/* Social Auth */}
              {!showCreateAccount && (
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>

                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                      <i className="ri-google-fill text-red-500 text-lg"></i>
                      <span className="ml-2">Google</span>
                    </button>

                    <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                      <i className="ri-linkedin-fill text-blue-600 text-lg"></i>
                      <span className="ml-2">LinkedIn</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

            <div>
              <h3 className="font-semibold text-lg mb-6">About us</h3>

              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white cursor-pointer">
                    Our mission
                  </Link>
                </li>

                <li>
                  <Link to="/framework" className="text-gray-300 hover:text-white cursor-pointer">
                    Our Institutional Framework
                  </Link>
                </li>

                <li>
                  <Link to="/history" className="text-gray-300 hover:text-white cursor-pointer">
                    History
                  </Link>
                </li>

                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white cursor-pointer">
                    Leadership and governance
                  </Link>
                </li>

                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white cursor-pointer">
                    Our Impact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">
                More from the Forum
              </h3>

              <ul className="space-y-3">
                <li>
                  <Link to="/initiatives" className="text-gray-300 hover:text-white cursor-pointer">
                    Centres
                  </Link>
                </li>

                <li>
                  <Link to="/meetings" className="text-gray-300 hover:text-white cursor-pointer">
                    Meetings
                  </Link>
                </li>

                <li>
                  <Link to="/stakeholders" className="text-gray-300 hover:text-white cursor-pointer">
                    Stakeholders
                  </Link>
                </li>

                <li>
                  <Link to="/agenda" className="text-gray-300 hover:text-white cursor-pointer">
                    Forum Stories
                  </Link>
                </li>

                <li>
                  <Link to="/publications" className="text-gray-300 hover:text-white cursor-pointer">
                    Press releases
                  </Link>
                </li>

                <li>
                  <Link to="/gallery" className="text-gray-300 hover:text-white cursor-pointer">
                    Photo gallery
                  </Link>
                </li>

                <li>
                  <Link to="/publications" className="text-gray-300 hover:text-white cursor-pointer">
                    Podcasts
                  </Link>
                </li>

                <li>
                  <Link to="/publications" className="text-gray-300 hover:text-white cursor-pointer">
                    Videos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">
                Engage with us
              </h3>

              <ul className="space-y-3">
                <li>
                  {user ? (
                    <button
                      onClick={handleSignOut}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/signin"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap cursor-pointer"
                    >
                      Sign in
                    </Link>
                  )}
                </li>

                <li>
                  <Link to="/partners" className="text-gray-300 hover:text-white cursor-pointer">
                    Partner with us
                  </Link>
                </li>

                <li>
                  <Link to="/join" className="text-gray-300 hover:text-white cursor-pointer">
                    Become a member
                  </Link>
                </li>

                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white cursor-pointer">
                    Sign up for our press releases
                  </Link>
                </li>

                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white cursor-pointer">
                    Subscribe to our newsletters
                  </Link>
                </li>

                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white cursor-pointer">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">
                Quick links
              </h3>

              <ul className="space-y-3 mb-8">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white cursor-pointer">
                    Sustainability at the Forum
                  </Link>
                </li>

                <li>
                  <Link to="/careers" className="text-gray-300 hover:text-white cursor-pointer">
                    Careers
                  </Link>
                </li>
              </ul>

              <div>
                <h4 className="font-semibold mb-4">
                  Language editions
                </h4>

                <div className="flex space-x-2">
                  <Link to="/" className="text-gray-300 hover:text-white cursor-pointer">
                    EN
                  </Link>

                  <span className="text-gray-500">•</span>

                  <Link to="/es" className="text-gray-300 hover:text-white cursor-pointer">
                    ES
                  </Link>

                  <span className="text-gray-500">•</span>

                  <Link to="/cn" className="text-gray-300 hover:text-white cursor-pointer">
                    中文
                  </Link>

                  <span className="text-gray-500">•</span>

                  <Link to="/jp" className="text-gray-300 hover:text-white cursor-pointer">
                    日本語
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-6 text-sm text-gray-400">

              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/17Jr8NpqZJ/"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-facebook-fill text-xl"></i>
                </a>

                <a
                  href="https://www.linkedin.com/company/the-africa-economic-forum/"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-linkedin-fill text-xl"></i>
                </a>

                <a
                  href="https://www.instagram.com/theafricaeconomicforum?igsh=MWowNmw1NjdueXNkbQ=="
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-instagram-fill text-xl"></i>
                </a>

                <a
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-youtube-fill text-xl"></i>
                </a>
              </div>

              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
                <Link
                  to="/privacy"
                  className="hover:text-white cursor-pointer"
                >
                  Privacy Policy &amp; Terms of Service
                </Link>

                <p>© 2026 Africa Economic Forum</p>

                <a
                  href="https://codesignglobal.com"
                  className="hover:text-white cursor-pointer"
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
