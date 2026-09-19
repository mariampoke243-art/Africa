import HomePage from '../pages/home/page';
import AboutPage from '../pages/about/page';
import HistoryPage from '../pages/history/page';
import InitiativesPage from '../pages/initiatives/page';
import MeetingsPage from '../pages/meetings/page';
import AgendaPage from '../pages/Agenda/page';
import StakeholdersPage from '../pages/stakeholders/page';
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
import SpotlightPage from '../pages/spotlight/page';
import IntervenantsPage from '../pages/intervenants/IntervenantsPage';

import { Layout } from '../components/Layout';

const routes = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/history', element: <HistoryPage /> },
      { path: '/initiatives', element: <InitiativesPage /> },
      { path: '/meetings', element: <MeetingsPage /> },
      { path: '/agenda', element: <AgendaPage /> },
      { path: '/stakeholders', element: <StakeholdersPage /> },
      { path: '/partners', element: <PartnersPage /> },
      { path: '/publications', element: <PublicationsPage /> },
      { path: '/gallery', element: <GalleryPage /> },
      { path: '/careers', element: <CareersPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/join', element: <JoinPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/signin', element: <SignInPage /> },
      { path: '/privacy', element: <PrivacyPage /> },
      { path: '/admin', element: <AdminPage /> },
      { path: '/spotlight', element: <SpotlightPage /> },
      { path: '/spotlight/:id', element: <SpotlightPage /> },
      { path: '/intervenants', element: <IntervenantsPage /> },
    ],
  },
];

export default routes;
