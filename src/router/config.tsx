import HomePage from '../pages/home/page';
import AboutPage from '../pages/about/page';
import HistoryPage from '../pages/history/page';
import InitiativesPage from '../pages/initiatives/page';
import MeetingsPage from '../pages/meetings/page';
import AgendaPage from '../pages/Agenda/page';

// =========================
// STAKEHOLDERS
// =========================
import StakeholdersPage from '../pages/stakeholders/page';
import BusinessesPage from '../pages/stakeholders/businesses/page';
import InvestorsPage from '../pages/stakeholders/investors/page';
import GovernmentsPage from '../pages/stakeholders/governments/page';
import InternationalPage from '../pages/stakeholders/international/page';
import SocialEntrepreneursPage from '../pages/stakeholders/social-entrepreneurs/page';
import AcademiaPage from '../pages/stakeholders/academia/page';
import YouthPage from '../pages/stakeholders/youth/page';
import WomenPage from '../pages/stakeholders/women/page';
import MediaPage from '../pages/stakeholders/media/page';
import ArtistsAthletesPage from '../pages/stakeholders/artists-athletes/page';

// =========================
// OTHER PAGES
// =========================
import PartnersPage from '../pages/partners/page';
import PublicationsPage from '../pages/publications/page';
import GalleryPage from '../pages/gallery/page';
import CareersPage from '../pages/careers/page';
import ContactPage from '../pages/contact/page';
import JoinPage from '../pages/join/page';
import ProfilePage from '../pages/profile/page';
import SignInPage from '../pages/signin/page';
import PrivacyPage from '../pages/privacy/page';
import AdminPage from '../pages/admin/page';

// =========================
// SPOTLIGHT / INTERVENANTS
// =========================
import SpotlightPage from '../pages/spotlight/page';
import IntervenantsPage from '../pages/intervenants/IntervenantsPage';

import { Layout } from '../components/Layout';

const pageRoutes = [
  // =========================
  // HOME
  // =========================
  {
    index: true,
    element: <HomePage />,
  },

  // =========================
  // ABOUT
  // =========================
  {
    path: 'about',
    element: <AboutPage />,
  },
  {
    path: 'history',
    element: <HistoryPage />,
  },

  // =========================
  // INITIATIVES
  // =========================
  {
    path: 'initiatives',
    element: <InitiativesPage />,
  },

  // =========================
  // MEETINGS
  // =========================
  {
    path: 'meetings',
    element: <MeetingsPage />,
  },

  // =========================
  // AGENDA
  // =========================
  {
    path: 'agenda',
    element: <AgendaPage />,
  },

  // =========================
  // STAKEHOLDERS
  // =========================
  {
    path: 'stakeholders',
    element: <StakeholdersPage />,
  },

  {
    path: 'stakeholders/businesses',
    element: <BusinessesPage />,
  },

  {
    path: 'stakeholders/investors',
    element: <InvestorsPage />,
  },

  {
    path: 'stakeholders/governments',
    element: <GovernmentsPage />,
  },

  {
    path: 'stakeholders/international',
    element: <InternationalPage />,
  },

  {
    path: 'stakeholders/social-entrepreneurs',
    element: <SocialEntrepreneursPage />,
  },

  {
    path: 'stakeholders/academia',
    element: <AcademiaPage />,
  },

  {
    path: 'stakeholders/youth',
    element: <YouthPage />,
  },

  {
    path: 'stakeholders/women',
    element: <WomenPage />,
  },

  {
    path: 'stakeholders/media',
    element: <MediaPage />,
  },

  {
    path: 'stakeholders/artists-athletes',
    element: <ArtistsAthletesPage />,
  },

  // =========================
  // OTHER PAGES
  // =========================
  {
    path: 'partners',
    element: <PartnersPage />,
  },

  {
    path: 'publications',
    element: <PublicationsPage />,
  },

  {
    path: 'gallery',
    element: <GalleryPage />,
  },

  {
    path: 'careers',
    element: <CareersPage />,
  },

  {
    path: 'contact',
    element: <ContactPage />,
  },

  {
    path: 'join',
    element: <JoinPage />,
  },

  {
    path: 'profile',
    element: <ProfilePage />,
  },

  {
    path: 'signin',
    element: <SignInPage />,
  },

  {
    path: 'privacy',
    element: <PrivacyPage />,
  },

  {
    path: 'admin',
    element: <AdminPage />,
  },

  // =========================
  // SPOTLIGHT
  // =========================
  {
    path: 'spotlight',
    element: <SpotlightPage />,
  },

  {
    path: 'spotlight/:id',
    element: <SpotlightPage />,
  },

  // =========================
  // INTERVENANTS
  // =========================
  {
    path: 'intervenants',
    element: <IntervenantsPage />,
  },
];

const routes = [
  {
    element: <Layout />,
    children: [
      // =========================
      // ROUTES NORMALES
      // =========================
      ...pageRoutes,

      // =========================
      // ROUTES AVEC LANGUE
      // /fr/...
      // /en/...
      // /pt/...
      // /es/...
      // /zh/...
      // =========================
      {
        path: ':lang',
        children: pageRoutes,
      },
    ],
  },
];

export default routes;
