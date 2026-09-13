import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { Layout } from '../components/Layout';

// Lazy load components
const HomePage = lazy(() => import('../pages/home/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const InitiativesPage = lazy(() => import('../pages/initiatives/page'));
const PublicationsPage = lazy(() => import('../pages/publications/page'));
const AgendaPage = lazy(() => import('../pages/agenda/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const CareersPage = lazy(() => import('../pages/careers/page'));
const FrameworkPage = lazy(() => import('../pages/framework/page'));
const GalleryPage = lazy(() => import('../pages/gallery/page'));
const HistoryPage = lazy(() => import('../pages/history/page'));
const JoinPage = lazy(() => import('../pages/join/page'));
const MeetingsPage = lazy(() => import('../pages/meetings/page'));
const PartnersPage = lazy(() => import('../pages/partners/page'));
const PrivacyPage = lazy(() => import('../pages/privacy/page'));
const ProfilePage = lazy(() => import('../pages/profile/page'));
const SignInPage = lazy(() => import('../pages/signin/page'));
const AdminPage = lazy(() => import('../pages/admin/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

// Stakeholders pages
const StakeholdersPage = lazy(() => import('../pages/stakeholders/page'));
const AcademiaPage = lazy(() => import('../pages/stakeholders/academia/page'));
const ArtistsAthletesPage = lazy(() => import('../pages/stakeholders/artists-athletes/page'));
const BusinessesPage = lazy(() => import('../pages/stakeholders/businesses/page'));
const GovernmentsPage = lazy(() => import('../pages/stakeholders/governments/page'));
const InternationalPage = lazy(() => import('../pages/stakeholders/international/page'));
const InvestorsPage = lazy(() => import('../pages/stakeholders/investors/page'));
const MediaPage = lazy(() => import('../pages/stakeholders/media/page'));
const SocialEntrepreneursPage = lazy(() => import('../pages/stakeholders/social-entrepreneurs/page'));
const WomenPage = lazy(() => import('../pages/stakeholders/women/page'));
const YouthPage = lazy(() => import('../pages/stakeholders/youth/page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'initiatives',
        element: <InitiativesPage />,
      },
      {
        path: 'publications',
        element: <PublicationsPage />,
      },
      {
        path: 'agenda',
        element: <AgendaPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'careers',
        element: <CareersPage />,
      },
      {
        path: 'framework',
        element: <FrameworkPage />,
      },
      {
        path: 'gallery',
        element: <GalleryPage />,
      },
      {
        path: 'history',
        element: <HistoryPage />,
      },
      {
        path: 'join',
        element: <JoinPage />,
      },
      {
        path: 'meetings',
        element: <MeetingsPage />,
      },
      {
        path: 'partners',
        element: <PartnersPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
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
        path: 'admin',
        element: <AdminPage />,
      },
      {
        path: 'stakeholders',
        element: <StakeholdersPage />,
      },
      {
        path: 'stakeholders/academia',
        element: <AcademiaPage />,
      },
      {
        path: 'stakeholders/artists-athletes',
        element: <ArtistsAthletesPage />,
      },
      {
        path: 'stakeholders/businesses',
        element: <BusinessesPage />,
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
        path: 'stakeholders/investors',
        element: <InvestorsPage />,
      },
      {
        path: 'stakeholders/media',
        element: <MediaPage />,
      },
      {
        path: 'stakeholders/social-entrepreneurs',
        element: <SocialEntrepreneursPage />,
      },
      {
        path: 'stakeholders/women',
        element: <WomenPage />,
      },
      {
        path: 'stakeholders/youth',
        element: <YouthPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
