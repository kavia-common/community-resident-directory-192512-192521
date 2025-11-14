import React, { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * NavBar
 * Top navigation bar with brand, centered search slot (children),
 * and theme toggle persisted to localStorage.
 */
export default function NavBar({ centerContent, resultsCount }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Top navigation">
      <div className="container navbar__inner">
        <div className="brand" aria-label="Application brand">
          <div className="brand__logo" aria-hidden />
          <div className="brand__text">Resident Directory</div>
        </div>

        <div className="nav-search" aria-label="Global search">
          {centerContent}
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title="Toggle theme"
        >
          <svg className="theme-toggle__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            {theme === 'light' ? (
              <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.66 2.46l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM17 13h3v-2h-3v2zm-5 8h2v-3h-2v3zM4.96 19.04l1.8 1.79 1.41-1.41-1.79-1.8-1.42 1.42zM20 17h3v-2h-3v2z" />
            ) : (
              <path d="M9.37 5.51A7 7 0 1 0 18.49 14.63 8 8 0 0 1 9.37 5.51z" />
            )}
          </svg>
          <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </nav>
  );
}
