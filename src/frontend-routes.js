import React from 'react';

const Home = React.lazy(() => import('./views/pages/home/Home'));
const About = React.lazy(() => import('./views/pages/about/About'));
const Profile = React.lazy(() => import('./components/Profile'));
const Posts = React.lazy(() => import('./views/pages/posts/PostListing'));
const MyPosts = React.lazy(() => import('./views/pages/posts/MyPostListing'));
const PostDetail = React.lazy(() => import('./views/pages/posts/PostDetail'));
const CreatePost = React.lazy(() => import('./views/pages/posts/CreatePost'));
const routes = [
  { path: '/', exact: true, name: 'Home', component : Home },
  { path: '/about', exact: true, name: 'About', component : About },
  { path: '/profile', exact: true, name: 'Profile', component : Profile, isAuth : "true" },
  { path: '/posts', exact: true, name: 'Posts', component : Posts },
  { path: '/my-posts', exact: true, name: 'Posts', component : MyPosts },
  { path: '/post/:id', exact: true, name: 'PostDetail', component : PostDetail },
  { path: '/create-post', exact: true, name: 'CreatePost', component : CreatePost },
  { path: '/update-post/:id', exact: true, name: 'UpdatePost', component : CreatePost }
];
  
export default routes;
