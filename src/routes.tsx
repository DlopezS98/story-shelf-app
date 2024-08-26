import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './modules/auth/components/login';
import Discover from './modules/discover/components/discover';
import Books from './modules/books/components/books';
import WishList from './modules/wish-list/components/wish-list';
// import Wishlist from './modules/core/components/wishlist';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Books /> },
      { path: '/discover', element: <Discover /> },
      { path: '/recommendations', element: <div><h1>Recommendations</h1></div> },
      { path: '/wishlist', element: <WishList /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router; 

