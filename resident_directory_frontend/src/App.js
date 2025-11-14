import React, { useMemo, useState } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from './router';
import NavBar from './components/NavBar';
import { supabaseMissingConfig } from './services/supabaseClient';

/**
 * PUBLIC_INTERFACE
 * App
 * Root component: renders the NavBar and RouterProvider.
 * Shows a non-blocking configuration banner if Supabase envs are missing.
 */
function App() {
  const router = useMemo(() => createAppRouter(), []);
  const [showConfigBanner, setShowConfigBanner] = useState(supabaseMissingConfig);

  return (
    <div className="App">
      {showConfigBanner && (
        <div className="config-banner" role="region" aria-label="Configuration missing">
          <div className="container config-banner__inner">
            <span>
              Supabase configuration is missing. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY in your environment to enable data.
            </span>
            <button className="btn btn-secondary" onClick={() => setShowConfigBanner(false)} aria-label="Dismiss configuration message">
              Dismiss
            </button>
          </div>
        </div>
      )}
      <NavBar />
      <main className="app-main">
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
