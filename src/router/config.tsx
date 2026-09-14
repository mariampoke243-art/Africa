import { createBrowserRouter } from 'react-router-dom';
import AgendaPage from '../pages/agenda/page';
// ... autres imports de pages

export const router = createBrowserRouter([
  {
    path: '/agenda',
    element: <AgendaPage />,
  },
  // ... vos autres routes
]);
