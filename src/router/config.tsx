import HomePage from '../pages/home/page';
import AgendaPage from '../pages/AgendaPage';

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
