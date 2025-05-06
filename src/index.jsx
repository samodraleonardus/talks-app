/* eslint-disable camelcase */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import store from './states';

import './styles/style.css';

const router = createBrowserRouter(
  [
    {
      path: '*',
      element: <App />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);