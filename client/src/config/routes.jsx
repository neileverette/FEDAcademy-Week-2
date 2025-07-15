import { Tasks } from '../Pages/Tasks';
import { Profile } from '../Pages/Profile';
import { Portfolio } from '../Pages/Portfolio';
import { Archive } from '../Pages/Archive';
import { Review } from '../Pages/Review';

export default [
  {
    path: '/',
    element: <Tasks />,
    label: 'Tasks',
  },
  {
    path: '/archive',
    element: <Archive />,
    label: 'Archive',
  },
  {
    path: '/portfolio',
    element: <Portfolio />,
    label: 'Portfolio',
  },
  {
    path: '/review',
    element: <Review />,
    label: 'Review',
  },
  {
    path: '/profile',
    element: <Profile />,
    label: 'Profile',
  },
];
