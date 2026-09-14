import { createBrowserRouter } from 'react-router-dom';
import AgendaPage from '../pages/AgendaPage';
// Importez votre page d'accueil ou composant principal si nécessaire
// import HomePage from '../pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AgendaPage />, // ou un Layout / HomePage
  },
  {
    path: '/agenda',
    element: <AgendaPage />,
  },
]);

export default router;
