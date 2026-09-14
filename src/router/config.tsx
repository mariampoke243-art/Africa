import HomePage from '../pages/home/page';
import AgendaPage from '../pages/Agenda/page';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/agenda',
    element: <AgendaPage />,
  },
];

export default routes;
