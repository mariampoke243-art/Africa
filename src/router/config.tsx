import { createBrowserRouter } from 'react-router-dom';
import AgendaPage from '../pages/AgendaPage';
// ... autres imports de pages

export const router = createBrowserRouter([
  {
    path: '/agenda',
    element: <AgendaPage />,
  },
  // ... vos autres routes
]);
