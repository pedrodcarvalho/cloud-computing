import react from 'react';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Login />
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Dashboard />
    ),
  },
]);

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
};

export default App;
