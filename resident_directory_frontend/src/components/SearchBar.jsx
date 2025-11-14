import React from 'react';

/**
 * PUBLIC_INTERFACE
 * SearchBar
 * Controlled search input with optional clear button. Debounce handled upstream.
 */
export default function SearchBar({ value, onChange, placeholder = 'Search residents by name or apartment...', ariaLabel = 'Search residents', onClear }) {
  return (
    <div className="input-affix" role="search">
      <input
        className="search-input"
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
      {value ? (
        <button
          className="clear-btn"
          onClick={() => {
            onClear?.();
            onChange?.('');
          }}
          aria-label="Clear search"
          title="Clear"
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}
