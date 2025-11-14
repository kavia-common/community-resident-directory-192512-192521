import React from 'react';
import ResidentCard from './ResidentCard';

/**
 * PUBLIC_INTERFACE
 * ResidentList
 * Responsive grid that displays residents or skeletons/empty/error states.
 */
export default function ResidentList({ residents, loading, error }) {
  if (error) {
    return (
      <div className="card" style={{ padding: 16 }} role="alert">
        <strong>Something went wrong.</strong>
        <div className="text-muted">{error.message || String(error)}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="resident-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skel-card">
            <div className="skeleton skel-row" style={{ width: '60%', height: 18 }} />
            <div className="skeleton skel-row" style={{ width: '40%' }} />
            <div className="skeleton skel-row" style={{ width: '80%', height: 16 }} />
          </div>
        ))}
      </div>
    );
  }

  if (!residents || residents.length === 0) {
    return (
      <div className="card" style={{ padding: 16 }}>
        <div className="page-title" style={{ marginBottom: 6 }}>No residents found</div>
        <div className="text-muted">Try adjusting your search or clearing filters.</div>
      </div>
    );
  }

  return (
    <div className="resident-grid">
      {residents.map((r) => (
        <ResidentCard key={r.id} resident={r} />
      ))}
    </div>
  );
}
