import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DirectoryPage from './pages/DirectoryPage';
import ResidentDetailPage from './pages/ResidentDetailPage';

/**
 * PUBLIC_INTERFACE
 * createAppRouter
 * Creates the application router with two primary routes.
 */
export function createAppRouter() {
  return createBrowserRouter([
    {
      path: '/',
      element: <DirectoryPage />,
    },
    {
      path: '/residents/:id',
      element: <ResidentDetailPage />,
    },
  ]);
}

export default createAppRouter;
