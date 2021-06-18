import React from 'react';

const Home = React.lazy(() => import('./views/pages/home/Home'));
const About = React.lazy(() => import('./views/pages/about/About'));
const Profile = React.lazy(() => import('./components/Profile'));

const routes = [
  { path: '/', exact: true, name: 'Home', component : Home },
  { path: '/about', exact: true, name: 'About', component : About },
  { path: '/profile', exact: true, name: 'Profile', component : Profile, isAuth : "true" }
];
  
export default routes;
