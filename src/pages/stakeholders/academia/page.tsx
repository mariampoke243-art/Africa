import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabase/client';

export default function Academia() {
  // Modified component state
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Original component state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    institutionName: '',
    contactName: '',
    title: '',
    email: '',
    phone: '',
    website: '',
    institutionType: '',
    researchAreas: [] as string[],
    currentProjects: '',
    collaborationGoals: '',
    publicationInterests: [] as string[],
    networkingPreferences: [] as string[],
    termsAccepted: false,
  });

  const institutionTypes = [
    'University',
    'Research Institute',
    'Think Tank',
    'Policy Institute',
    'Academic Foundation',
    'International Research Center',
    'Government Research Agency',
    'Private Research Organization',
  ];

  const researchAreaOptions = [
    'Economic Policy & Development',
    'International Relations',
    'Sustainable Development',
    'Climate Change & Environment',
    'Technology & Innovation',
    'Social Policy & Governance',
    'Education & Human Capital',
    'Health & Public Policy',
    'Energy & Resources',
    'Trade & Investment',
    'Security & Conflict Resolution',
    'Urban Development',
  ];

  const publicationOptions = [
    'Policy Briefs & Reports',
    'Academic Journal Articles',
    'White Papers',
    'Research Collaborations',
    'Conference Presentations',
    'Book Publications',
    'Media Commentary',
    'Expert Testimonies',
  ];

  const networkingOptions = [
    'Research Collaboration',
    'Policy Advisory Roles',
    'Expert Panels & Committees',
    'Academic Conferences',
    'Peer Review Activities',
    'Mentorship Programs',
    'International Exchanges',
    'Public Speaking Opportunities',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'termsAccepted') {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      } else {
        const arrayField = name as
          | 'researchAreas'
          | 'publicationInterests'
          | 'networkingPreferences';
        setFormData((prev) => ({
          ...prev,
          [arrayField]: checked
            ? [...prev[arrayField], value]
            : prev[arrayField].filter((item) => item !== value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions and privacy policy.');
      return;
    }

    try {
      const { error } = await supabase
        .from('academia_think_tank_applications')
        .insert([
          {
            institution_name: formData.institutionName,
            contact_name: formData.contactName,
            title: formData.title,
            email: formData.email,
            phone: formData.phone,
            website: formData.website || null,
            institution_type: formData.institutionType,
            research_areas: formData.researchAreas,
            current_projects: formData.currentProjects,
            collaboration_goals: formData.collaborationGoals,
            publication_interests: formData.publicationInterests,
            networking_preferences: formData.networkingPreferences,
            terms_accepted: formData.termsAccepted,
          },
        ]);

      if (error) {
        console.error('Error submitting Academia Think Tank application:', error);
        alert('An error occurred while submitting your application. Please try again.');
        return;
      }

      console.log('Academia Think Tank application submitted:', formData);
      alert('Application submitted successfully! We will contact you soon.');
      setIsFormOpen(false);
      setFormData({
        institutionName: '',
        contactName: '',
        title: '',
        email: '',
        phone: '',
        website: '',
        institutionType: '',
        researchAreas: [],
        currentProjects: '',
        collaborationGoals: '',
        publicationInterests: [],
        networkingPreferences: [],
        termsAccepted: false,
      });
    } catch (err) {
      console.error('Academia Think Tank application error:', err);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  // Page content
  type Block =
    | { k: 'p'; t: string }
    | { k: 'b'; t: string }
    | { k: 'l'; label?: string; items: string[] }
    | { k: 'c'; label?: string; items: string[] };

  const changeLines = [
    'Global powers are redefining their partnerships with the continent.',
    'Capital is searching for new opportunities.',
    'Supply chains are being reorganised.',
    'Critical minerals are becoming strategic assets.',
    'Energy systems are being transformed.',
    'Artificial intelligence is reshaping economies.',
    'African governments are placing greater emphasis on sovereignty, industrialisation and local value creation.',
  ];

  const missionChain = ['Research', 'Intelligence', 'Policy', 'Investment', 'Action'];

  const researchAreas: { num: string; title: string; icon: string; color: string; blocks: Block[] }[] = [
    {
      num: '01',
      title: 'Economic Sovereignty',
      icon: 'ri-shield-star-line',
      color: 'bg-blue-100 text-blue-600',
      blocks: [
        { k: 'p', t: 'Examining how African countries can strengthen productive capacity, diversify economies and increase control over strategic economic assets.' },
        {
          k: 'l',
          label: 'Key questions:',
          items: [
            'What does economic sovereignty mean in a globalised economy?',
            'How can African economies move beyond commodity dependence?',
            'What policies can accelerate local value creation?',
            'How can African countries strengthen domestic capital formation?',
          ],
        },
      ],
    },
    {
      num: '02',
      title: 'Critical Minerals & Industrialisation',
      icon: 'ri-hammer-line',
      color: 'bg-green-100 text-green-600',
      blocks: [
        { k: 'p', t: 'Africa possesses resources that are increasingly central to the global energy and technology transition.' },
        { k: 'p', t: 'The question is no longer simply:' },
        { k: 'b', t: 'Who owns the resources?' },
        { k: 'p', t: 'It is increasingly:' },
        { k: 'b', t: 'Who captures the value?' },
        { k: 'p', t: 'Our research examines the transition from extraction to processing, manufacturing and industrial ecosystems.' },
        { k: 'c', items: ['From mines to materials.', 'From resources to industries.', 'From extraction to transformation.'] },
      ],
    },
    {
      num: '03',
      title: 'Energy & Energy Transition',
      icon: 'ri-flashlight-line',
      color: 'bg-orange-100 text-orange-600',
      blocks: [
        { k: 'p', t: "Africa's energy future will influence industrialisation, competitiveness and social development." },
        {
          k: 'l',
          label: 'The AEF Think Tank examines:',
          items: [
            'Energy access',
            'Renewable energy',
            'Natural gas',
            'Power infrastructure',
            'Energy investment',
            'Industrial energy demand',
            'Energy transition financing',
            'Regional energy markets',
          ],
        },
        { k: 'p', t: 'Our focus is on the intersection between energy security, affordability and industrial development.' },
      ],
    },
    {
      num: '04',
      title: 'Global Capital & Investment',
      icon: 'ri-funds-line',
      color: 'bg-purple-100 text-purple-600',
      blocks: [
        { k: 'b', t: 'Where is global capital moving?' },
        { k: 'b', t: 'Why is it moving?' },
        { k: 'b', t: 'And what will determine where it invests next?' },
        {
          k: 'l',
          label: 'Our research examines the evolving relationship between Africa and:',
          items: [
            'Gulf capital',
            'Chinese investment',
            'American capital',
            'European institutions',
            'Asian investors',
            'African institutional investors',
            'Sovereign wealth funds',
            'Private equity',
            'Development finance institutions',
          ],
        },
      ],
    },
    {
      num: '05',
      title: 'Geopolitics of Investment',
      icon: 'ri-global-line',
      color: 'bg-red-100 text-red-600',
      blocks: [
        { k: 'p', t: 'Africa is increasingly situated at the intersection of competing strategic interests.' },
        { k: 'p', t: 'The AEF Think Tank analyses how geopolitical shifts influence:' },
        { k: 'c', items: ['Capital', 'Trade', 'Infrastructure', 'Technology', 'Energy', 'Minerals', 'Partnerships'] },
        { k: 'p', t: 'The objective is not to choose sides.' },
        { k: 'b', t: 'It is to understand the changing strategic environment in which African decision-makers operate.' },
      ],
    },
    {
      num: '06',
      title: 'Artificial Intelligence & Digital Transformation',
      icon: 'ri-cpu-line',
      color: 'bg-teal-100 text-teal-600',
      blocks: [
        { k: 'p', t: 'AI is rapidly changing productivity, business models, public services and labour markets.' },
        { k: 'p', t: 'Our research examines how African economies can move from being consumers of digital technologies to becoming active participants in the global digital economy.' },
        {
          k: 'l',
          label: 'Areas include:',
          items: [
            'AI adoption',
            'Digital infrastructure',
            'African data ecosystems',
            'Digital public infrastructure',
            'Fintech',
            'Digital skills',
            'AI governance',
            'Technology investment',
          ],
        },
      ],
    },
    {
      num: '07',
      title: 'Intra-African Trade',
      icon: 'ri-exchange-line',
      color: 'bg-blue-100 text-blue-600',
      blocks: [
        { k: 'p', t: "The African Continental Free Trade Area represents one of the continent's most significant economic integration projects." },
        { k: 'p', t: 'The Think Tank studies the practical conditions required to translate market integration into increased production, trade and investment.' },
        { k: 'c', items: ['Trade corridors.', 'Industrial corridors.', 'Financial connectivity.', 'Regional value chains.'] },
      ],
    },
    {
      num: '08',
      title: 'Africa & Emerging Economic Powers',
      icon: 'ri-compass-3-line',
      color: 'bg-green-100 text-green-600',
      blocks: [
        { k: 'p', t: "Africa's partnerships are becoming increasingly diversified." },
        { k: 'p', t: "The AEF Think Tank studies Africa's evolving economic relationships with emerging centres of capital, technology and influence across the Gulf, Asia, Central Asia and other rapidly developing markets." },
      ],
    },
  ];

  const outlookChips = ['Investment', 'Trade', 'Capital', 'Technology', 'Energy', 'Industrialisation', 'Geopolitics'];

  const outlookAudience = [
    'Heads of State and Government',
    'Ministers',
    'CEOs',
    'Investors',
    'Financial institutions',
    'Sovereign wealth funds',
    'Development institutions',
    'Diplomats',
    'Policymakers',
    'Researchers',
  ];

  const briefFocus = ['The issue.', 'The evidence.', 'The implications.', 'The policy choices.'];

  const strategicTopics = [
    "Africa's critical minerals opportunity",
    'The future of African industrialisation',
    'Gulf capital and African infrastructure',
    'AI and the African workforce',
    "Africa's new economic diplomacy",
    'The future of African energy',
    'Sovereign wealth and African development',
    'The geopolitics of African trade corridors',
  ];

  const dataChips = ['Capital flows', 'Trade', 'Investment', 'Commodities', 'Energy', 'Infrastructure', 'Demographics', 'Technology'];

  const expertChips = [
    'Economists',
    'Researchers',
    'Policy specialists',
    'Academics',
    'CEOs',
    'Investors',
    'Diplomats',
    'Technology experts',
    'Energy specialists',
    'Trade experts',
    'Development practitioners',
  ];

  const cycle = ['THINK', 'CONNECT', 'DECIDE', 'INVEST', 'DELIVER'];

  const whoWeServe = [
    { title: 'Governments', text: 'Strategic intelligence for economic policy and international partnerships.', icon: 'ri-government-line', color: 'bg-blue-100 text-blue-600' },
    { title: 'Investors', text: 'Market perspectives and analysis of structural opportunities.', icon: 'ri-funds-line', color: 'bg-green-100 text-green-600' },
    { title: 'Businesses', text: 'Understanding the economic and geopolitical environment shaping markets.', icon: 'ri-briefcase-line', color: 'bg-purple-100 text-purple-600' },
    { title: 'Financial Institutions', text: 'Research on investment themes, capital flows and economic transformation.', icon: 'ri-bank-line', color: 'bg-orange-100 text-orange-600' },
    { title: 'Development Institutions', text: 'Evidence and perspectives on structural development challenges.', icon: 'ri-earth-line', color: 'bg-red-100 text-red-600' },
    { title: 'Academia & Research', text: 'A platform for African economic research and intellectual exchange.', icon: 'ri-graduation-cap-line', color: 'bg-teal-100 text-teal-600' },
    { title: 'Media', text: 'Research-driven perspectives on major African economic developments.', icon: 'ri-news-line', color: 'bg-blue-100 text-blue-600' },
  ];

  const joinCards = [
    { title: 'Researchers', text: 'Contribute expertise and original research.', icon: 'ri-flask-line', color: 'bg-blue-100 text-blue-600' },
    { title: 'Institutions', text: 'Collaborate on research initiatives and strategic studies.', icon: 'ri-building-line', color: 'bg-green-100 text-green-600' },
    { title: 'Corporate Partners', text: 'Support research around strategic sectors and economic transformation.', icon: 'ri-handshake-line', color: 'bg-purple-100 text-purple-600' },
    { title: 'Policy Leaders', text: "Engage with evidence and perspectives informing Africa's economic agenda.", icon: 'ri-government-line', color: 'bg-orange-100 text-orange-600' },
    { title: 'Experts', text: 'Join the AEF Expert Network.', icon: 'ri-user-star-line', color: 'bg-teal-100 text-teal-600' },
  ];

  const closingWords = ['Capital.', 'Technology.', 'Industrialisation.', 'Energy.', 'Trade.', 'Talent.', 'Sovereignty.', 'Partnerships.'];

  const renderBlocks = (blocks: Block[]) =>
    blocks.map((b, i) => {
      if (b.k === 'p') return <p key={i} className="text-gray-600 mb-3">{b.t}</p>;
      if (b.k === 'b') return <p key={i} className="font-semibold text-gray-900 mb-2">{b.t}</p>;
      if (b.k === 'c')
        return (
          <div key={i} className="flex flex-wrap gap-2 mb-3">
            {b.items.map((item) => (
              <span key={item} className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">{item}</span>
            ))}
          </div>
        );
      return (
        <div key={i} className="mb-3">
          {b.label && <p className="text-sm font-semibold text-gray-900 mb-2">{b.label}</p>}
          <ul className="space-y-1">
            {b.items.map((item) => (
              <li key={item} className="flex items-start space-x-2 text-sm text-gray-600">
                <i className="ri-arrow-right-s-line text-blue-600 flex-shrink-0"></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    });

  // Modified component handlers
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('aef_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (
          parsed &&
          typeof parsed.name === 'string' &&
          typeof parsed.email === 'string'
        ) {
          setUser(parsed);
        }
      }
    } catch (err) {
      console.error('Failed to read user from localStorage:', err);
    }
  }, []);

  const handleSignIn = () => {
    setShowSignInModal(true);
    setShowCreateAccount(false);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('aef_user');
    } catch (err) {
      console.error('Failed to remove user from localStorage:', err);
    }
    setUser(null);
  };

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (email && password) {
      const userName = email.split('@')[0];
      const userData = {
        name: userName.charAt(0).toUpperCase() + userName.slice(1),
        email: email,
      };

      try {
        localStorage.setItem('aef_user', JSON.stringify(userData));
        setUser(userData);
        alert('Sign in successful! Welcome back.');
        setShowSignInModal(false);
      } catch (err) {
        console.error('Failed to store user data:', err);
        alert('An error occurred while signing in. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleCreateAccountSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm_password') as string;
    const firstName = formData.get('first_name') as string;
    const lastName = formData.get('last_name') as string;

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    if (email && password && firstName && lastName) {
      const userData = {
        name: `${firstName} ${lastName}`,
        email: email,
      };

      try {
        localStorage.setItem('aef_user', JSON.stringify(userData));
        setUser(userData);
        alert('Account created successfully! Welcome to Africa Economic Forum.');
        setShowSignInModal(false);
        setShowCreateAccount(false);
      } catch (err) {
        console.error('Failed to store new account data:', err);
        alert('An error occurred while creating the account. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const switchToCreateAccount = () => {
    setShowCreateAccount(true);
  };

  const switchToSignIn = () => {
    setShowCreateAccount(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img
                  src="https://static.readdy.ai/image/433d1257c1dbc1f8bb2f3f1c418f6689/0727857f21d196505f8ef18cfc1cd897.png"
                  alt="Africa Economic Forum"
                  className="h-10 w-auto"
                />
              </a>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </a>
              <a
                href="/initiatives"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Initiatives
              </a>
              <a
                href="/stakeholders"
                className="text-teal-600 px-3 py-2 text-sm font-medium border-b-2 border-teal-600"
              >
                Stakeholders
              </a>
              <a
                href="/agenda"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Agenda
              </a>
              <a
                href="/publications"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Publications
              </a>
              <a
                href="/meetings"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Meetings
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </a>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700">Welcome, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap cursor-pointer"
                >
                  Sign In
                </button>
              )}
            </div>
            <button
              className="md:hidden p-2 cursor-pointer"
              onClick={toggleMobileMenu}
            >
              <i
                className={`ri-${isMobileMenuOpen ? 'close' : 'menu'}-line text-2xl`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/initiatives"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Initiatives
              </a>
              <a
                href="/stakeholders"
                className="block px-3 py-2 text-base font-medium text-teal-600 bg-teal-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Stakeholders
              </a>
              <a
                href="/agenda"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Agenda
              </a>
              <a
                href="/publications"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Publications
              </a>
              <a
                href="/meetings"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Meetings
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <div className="px-3 py-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="text-gray-700">Welcome, {user.name}</div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleSignIn();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 whitespace-nowrap cursor-pointer"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section
          className="relative min-h-[24rem] bg-cover bg-center bg-no-repeat flex items-center py-16"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://readdy.ai/api/search-image?query=Modern%20university%20research%20facility%2C%20academics%20collaborating%2C%20books%20and%20research%20materials%2C%20intellectual%20environment%2C%20bright%20natural%20lighting%2C%20scholarly%20atmosphere&width=1200&height=400&seq=10&orientation=landscape')`,
          }}
        >
          <div className="container mx-auto px-6">
            <div className="max-w-3xl text-white">
              <h1 className="text-5xl font-bold mb-6">AEF Think Tank</h1>
              <p className="text-2xl font-semibold mb-4 leading-snug">
                Africa's Strategic Intelligence Platform
              </p>
              <p className="text-xl mb-8 leading-relaxed">
                Research. Foresight. Policy. Influence.
              </p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Join the Think Tank
              </button>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Africa is no longer simply responding to global transformations.
              </p>
              <p className="text-xl font-semibold text-gray-900 leading-relaxed">
                It is becoming one of the places where the next global economic order will be shaped.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                The AEF Think Tank is the strategic intelligence and policy research platform of the Africa Economic Forum, dedicated to understanding Africa's evolving position in the global economy and translating complex geopolitical, economic and technological shifts into actionable intelligence.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From economic sovereignty and critical minerals to artificial intelligence, energy, trade, investment and global capital flows, the AEF Think Tank brings together researchers, economists, policymakers, business leaders, investors and institutional experts to examine the forces shaping Africa's future.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We do not simply analyse the African agenda.
              </p>
              <p className="text-2xl font-bold text-blue-700">
                We help define it.
              </p>
            </div>
          </div>
        </section>

        {/* The Question */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-widest text-blue-600 mb-3">THE QUESTION WE ARE ADDRESSING</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Who will shape Africa's next economic era?</h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Africa is experiencing a profound transformation.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-left mb-8">
                {changeLines.map((line) => (
                  <div key={line} className="bg-white p-5 rounded-lg shadow-md flex items-start space-x-3">
                    <i className="ri-arrow-right-circle-line text-xl text-blue-600 flex-shrink-0"></i>
                    <p className="text-gray-700">{line}</p>
                  </div>
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-2">These changes require more than conferences.</p>
              <p className="text-xl font-semibold text-gray-900 mb-2">They require intelligence.</p>
              <p className="text-xl font-semibold text-blue-700">The AEF Think Tank exists to provide that intelligence.</p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              <p className="text-sm font-semibold tracking-widest text-blue-200 mb-3">OUR MISSION</p>
              <h2 className="text-3xl font-bold mb-8">Turning African realities into strategic intelligence.</h2>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                The AEF Think Tank produces research, analysis and strategic perspectives designed to help decision-makers understand the forces transforming African economies and Africa's role in the world.
              </p>
              <p className="text-lg text-blue-100 mb-4">Our work connects:</p>
              <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
                {missionChain.map((step, index) => (
                  <React.Fragment key={step}>
                    <span className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold">{step}</span>
                    {index < missionChain.length - 1 && <i className="ri-arrow-right-line text-xl text-blue-200"></i>}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-lg text-blue-100 leading-relaxed">
                We aim to create a trusted space where evidence, African perspectives and global expertise meet.
              </p>
            </div>
          </div>
        </section>

        {/* Areas of Research */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <p className="text-sm font-semibold tracking-widest text-blue-600 text-center mb-3">OUR AREAS OF RESEARCH</p>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Eight Areas Shaping Africa's Economic Future</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {researchAreas.map((area) => (
                  <div key={area.num} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${area.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <i className={`${area.icon} text-xl`}></i>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-blue-600">{area.num}</p>
                        <h3 className="font-semibold text-gray-900">{area.title}</h3>
                      </div>
                    </div>
                    {renderBlocks(area.blocks)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AEF Africa Outlook */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-widest text-blue-600 mb-3">THE AEF AFRICA OUTLOOK</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our flagship research publication.</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The AEF Africa Outlook brings together data, expert analysis and strategic perspectives on the forces reshaping African economies.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Each edition examines the major trends influencing:
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {outlookChips.map((chip) => (
                  <span key={chip} className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">{chip}</span>
                ))}
              </div>
              <p className="text-lg text-gray-700 mb-4">The Outlook is designed for:</p>
              <ul className="grid sm:grid-cols-2 gap-3 text-left max-w-2xl mx-auto">
                {outlookAudience.map((a) => (
                  <li key={a} className="flex items-start space-x-3 text-gray-700">
                    <i className="ri-check-line text-xl text-blue-600 flex-shrink-0"></i>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Policy Briefs & Strategic Papers */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
                <p className="text-sm font-semibold tracking-widest text-blue-600 mb-3">POLICY BRIEFS</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">From complex issues to decision-ready intelligence.</h3>
                <p className="text-gray-700 mb-4">
                  AEF Think Tank Policy Briefs provide concise analysis of specific strategic questions facing African decision-makers.
                </p>
                <p className="text-gray-700 mb-3">Each brief focuses on:</p>
                <ul className="space-y-2">
                  {briefFocus.map((f) => (
                    <li key={f} className="flex items-start space-x-3 text-gray-800 font-medium">
                      <i className="ri-check-line text-xl text-blue-600 flex-shrink-0"></i>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg">
                <p className="text-sm font-semibold tracking-widest text-green-700 mb-3">AEF STRATEGIC PAPERS</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Long-form research on structural transformations.</h3>
                <p className="text-gray-700 mb-4">
                  Long-form research examining structural transformations affecting Africa.
                </p>
                <p className="text-gray-700 mb-3">Topics may include:</p>
                <ul className="space-y-2">
                  {strategicTopics.map((t) => (
                    <li key={t} className="flex items-start space-x-3 text-gray-800">
                      <i className="ri-arrow-right-s-line text-xl text-green-700 flex-shrink-0"></i>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Data & Intelligence */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-widest text-blue-600 mb-3">AEF DATA & INTELLIGENCE</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Evidence matters.</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The Think Tank develops analytical resources designed to help decision-makers understand African markets and strategic trends.
              </p>
              <p className="text-lg text-gray-700 mb-4">Our intelligence work may cover:</p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {dataChips.map((chip) => (
                  <span key={chip} className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">{chip}</span>
                ))}
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Where appropriate, research is developed in collaboration with economists, institutions, universities, industry experts and data partners.
              </p>
            </div>
          </div>
        </section>

        {/* Expert Network */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-widest text-blue-600 mb-3">THE AEF EXPERT NETWORK</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">A multidisciplinary community.</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The Think Tank brings together a multidisciplinary community of:
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {expertChips.map((chip) => (
                  <span key={chip} className="bg-white border border-blue-200 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">{chip}</span>
                ))}
              </div>
              <p className="text-xl font-semibold text-blue-700">
                The objective is to create a bridge between knowledge and decision-making.
              </p>
            </div>
          </div>
        </section>

        {/* From Research to the Deal Room */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-widest text-blue-300 mb-3">FROM RESEARCH TO THE AEF DEAL ROOM</p>
              <h2 className="text-3xl font-bold mb-6">Research should not remain on a bookshelf.</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Insights generated through the AEF Think Tank can inform discussions taking place across the wider AEF ecosystem — including investment dialogues, sector roundtables, diplomatic engagements and the AEF Deal Room.
              </p>
              <p className="text-lg text-gray-300 mb-6">This creates a unique cycle:</p>
              <div className="flex flex-wrap justify-center items-center gap-3">
                {cycle.map((step, index) => (
                  <React.Fragment key={step}>
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold tracking-wide">{step}</span>
                    {index < cycle.length - 1 && <i className="ri-arrow-right-line text-xl text-blue-300"></i>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Independent Thinking */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Independent Thinking. African Perspective. Global Reach.</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  The AEF Think Tank is designed to create space for rigorous debate.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We welcome different perspectives, challenge assumptions and encourage evidence-based discussion.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our objective is not to produce consensus for its own sake.
                </p>
                <p className="text-xl font-semibold text-blue-700 leading-relaxed">
                  It is to improve the quality of the conversation surrounding Africa's economic future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Serve */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <p className="text-sm font-semibold tracking-widest text-blue-600 text-center mb-3">WHO WE SERVE</p>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Intelligence for Africa's Decision-Makers</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {whoWeServe.map((item) => (
                  <div key={item.title} className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
                    <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <i className={`${item.icon} text-xl`}></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Join the Think Tank */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <p className="text-sm font-semibold tracking-widest text-blue-600 text-center mb-3">JOIN THE THINK TANK</p>
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Become part of the knowledge ecosystem.</h2>
              <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
                The AEF Think Tank is building a network of people committed to understanding and shaping Africa's economic transformation.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                {joinCards.map((item) => (
                  <div key={item.title} className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <i className={`${item.icon} text-2xl`}></i>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Join the Think Tank
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center text-white">
              <p className="text-sm font-semibold tracking-widest text-blue-200 mb-3">A KNOWLEDGE PLATFORM FOR A CHANGING AFRICA</p>
              <p className="text-xl mb-6 leading-relaxed">
                Africa's next chapter will not be defined only by the resources beneath its soil.
              </p>
              <p className="text-lg text-blue-100 mb-4">It will be defined by the decisions made around:</p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {closingWords.map((w) => (
                  <span key={w} className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold">{w}</span>
                ))}
              </div>
              <p className="text-lg text-blue-100 mb-6 leading-relaxed">
                The AEF Think Tank exists to study those decisions, understand their implications and contribute to the ideas that will shape the continent's future.
              </p>
              <p className="text-2xl font-bold mb-8">
                The future belongs to those who understand the forces shaping it.
              </p>
              <p className="text-xl font-semibold">AEF Think Tank</p>
              <p className="text-blue-100">Research Africa. Understand the world. Shape what comes next.</p>
            </div>
          </div>
        </section>

        {/* Application Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Academia Think Tank Application
                  </h3>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <i className="ri-close-line text-2xl"></i>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution Name *
                      </label>
                      <input
                        type="text"
                        name="institutionName"
                        value={formData.institutionName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institution Type *
                      </label>
                      <select
                        name="institutionType"
                        value={formData.institutionType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Type</option>
                        {institutionTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title/Position *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Research Areas (Select all that apply)
                    </label>
                    <div className="grid md:grid-cols-2 gap-3 max-h-40 overflow-y-auto">
                      {researchAreaOptions.map((area) => (
                        <label key={area} className="flex items-center">
                          <input
                            type="checkbox"
                            name="researchAreas"
                            value={area}
                            checked={formData.researchAreas.includes(area)}
                            onChange={handleInputChange}
                            className="mr-3 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Research Projects *
                    </label>
                    <textarea
                      name="currentProjects"
                      value={formData.currentProjects}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your current research projects and areas of expertise..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Collaboration Goals *
                    </label>
                    <textarea
                      name="collaborationGoals"
                      value={formData.collaborationGoals}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What do you hope to achieve through collaboration with the AEF Think Tank?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Publication Interests
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {publicationOptions.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            name="publicationInterests"
                            value={option}
                            checked={formData.publicationInterests.includes(option)}
                            onChange={handleInputChange}
                            className="mr-3 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Networking Preferences
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {networkingOptions.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            name="networkingPreferences"
                            value={option}
                            checked={formData.networkingPreferences.includes(option)}
                            onChange={handleInputChange}
                            className="mr-3 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="mr-3 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <label className="text-sm text-gray-700">
                      I agree to the terms and conditions and privacy policy *
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

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

              {/* Sign‑In Form */}
              {!showCreateAccount && (
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
                        <input type="checkbox" name="remember_me" className="cursor-pointer" />
                        <span className="text-sm text-gray-600">Remember me</span>
                      </label>
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
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
              )}

              {/* Create Account Form */}
              {showCreateAccount && (
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

              {/* Social Auth Buttons – shown only for sign‑in */}
              {!showCreateAccount && (
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
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
                  <a href="/about" className="text-gray-300 hover:text-white cursor-pointer">
                    Our mission
                  </a>
                </li>
                <li>
                  <a href="/framework" className="text-gray-300 hover:text-white cursor-pointer">
                    Our Institutional Framework
                  </a>
                </li>
                <li>
                  <a href="/history" className="text-gray-300 hover:text-white cursor-pointer">
                    History
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-300 hover:text-white cursor-pointer">
                    Leadership and governance
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-300 hover:text-white cursor-pointer">
                    Our Impact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">More from the Forum</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/initiatives" className="text-gray-300 hover:text-white cursor-pointer">
                    Centres
                  </a>
                </li>
                <li>
                  <a href="/meetings" className="text-gray-300 hover:text-white cursor-pointer">
                    Meetings
                  </a>
                </li>
                <li>
                  <a href="/stakeholders" className="text-gray-300 hover:text-white cursor-pointer">
                    Stakeholders
                  </a>
                </li>
                <li>
                  <a href="/agenda" className="text-gray-300 hover:text-white cursor-pointer">
                    Forum Stories
                  </a>
                </li>
                <li>
                  <a href="/publications" className="text-gray-300 hover:text-white cursor-pointer">
                    Press releases
                  </a>
                </li>
                <li>
                  <a href="/gallery" className="text-gray-300 hover:text-white cursor-pointer">
                    Photo gallery
                  </a>
                </li>
                <li>
                  <a href="/publications" className="text-gray-300 hover:text-white cursor-pointer">
                    Podcasts
                  </a>
                </li>
                <li>
                  <a href="/publications" className="text-gray-300 hover:text-white cursor-pointer">
                    Videos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">Engage with us</h3>
              <ul className="space-y-3">
                <li>
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 whitespace-nowrap cursor-pointer"
                    >
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={handleSignIn}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 whitespace-nowrap cursor-pointer"
                    >
                      Sign in
                    </button>
                  )}
                </li>
                <li>
                  <a href="/partners" className="text-gray-300 hover:text-white cursor-pointer">
                    Become our partner
                  </a>
                </li>
                <li>
                  <a href="/join" className="text-gray-300 hover:text-white cursor-pointer">
                    Become a member
                  </a>
                </li>
                <li>
                  <a href="/publications" className="text-gray-300 hover:text-white cursor-pointer">
                    Subscribe to our press releases
                  </a>
                </li>
                <li>
                  <a href="/publications" className="text-gray-300 hover:text-white cursor-pointer">
                    Subscribe to our newsletters
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-300 hover:text-white cursor-pointer">
                    Contact us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-6">Quick links</h3>
              <ul className="space-y-3 mb-8">
                <li>
                  <a href="/initiatives" className="text-gray-300 hover:text-white cursor-pointer">
                    Sustainability at the Forum
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-gray-300 hover:text-white cursor-pointer">
                    Careers
                  </a>
                </li>
              </ul>
              <div>
                <h4 className="font-semibold mb-4">Language editions</h4>
                <div className="flex space-x-2">
                  <a href="/" className="text-gray-300 hover:text-white cursor-pointer">
                    PT
                  </a>
                  <span className="text-gray-500">•</span>
                  <a href="/en" className="text-gray-300 hover:text-white cursor-pointer">
                    EN
                  </a>
                  <span className="text-gray-500">•</span>
                  <a href="/es" className="text-gray-300 hover:text-white cursor-pointer">
                    ES
                  </a>
                  <span className="text-gray-500">•</span>
                  <a href="/fr" className="text-gray-300 hover:text-white cursor-pointer">
                    FR
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
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
                <a href="/privacy" className="hover:text-white cursor-pointer">
                  Privacy Policy &amp; Terms of Service
                </a>

                <p>© 2026 Africa Economic Forum</p>
                <a href="https://codesignglobal.com" className="hover:text-white cursor-pointer">
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
