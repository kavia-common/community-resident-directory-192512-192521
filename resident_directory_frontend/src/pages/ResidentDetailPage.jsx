import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchResidentById } from '../services/residentsApi';

/**
 * PUBLIC_INTERFACE
 * ResidentDetailPage
 * Displays detailed information about a single resident.
 */
export default function ResidentDetailPage() {
  const { id } = useParams();
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchResidentById(id)
      .then((res) => {
        if (!mounted) return;
        if (res.error) {
          setError(res.error);
        } else {
          setResident(res.data || null);
        }
      })
      .catch((e) => setError(e))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <div className="detail-card">
          <div className="skeleton" style={{ width: 160, height: 160, borderRadius: 24 }} />
          <div className="skeleton" style={{ width: '50%', height: 18, marginTop: 16 }} />
          <div className="skeleton" style={{ width: '30%', height: 14, marginTop: 8 }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="detail-card">
          <p role="alert">Error: {error.message || String(error)}</p>
          <Link className="back-link" to="/">← Back to Directory</Link>
        </div>
      </div>
    );
  }

  if (!resident) {
    return (
      <div className="container">
        <div className="detail-card">
          <p>No resident found.</p>
          <Link className="back-link" to="/">← Back to Directory</Link>
        </div>
      </div>
    );
  }

  const initials = (resident.name || '??')
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="container">
      <Link className="back-link" to="/">← Back to Directory</Link>
      <div className="detail-card" style={{ marginTop: 12 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div
            className="avatar"
            style={{ width: 120, height: 120, borderRadius: 20 }}
            aria-label={`${resident.name} avatar large`}
          >
            {resident.avatar_url ? (
              <img
                src={resident.avatar_url}
                alt={`${resident.name} avatar`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 20 }}
              />
            ) : (
              <span style={{ fontSize: 36 }}>{initials}</span>
            )}
          </div>
          <div>
            <h1 style={{ margin: '0 0 6px 0' }}>{resident.name}</h1>
            <div className="text-muted">Apartment {resident.apartment}</div>
            <div className="chips" style={{ marginTop: 10 }}>
              {resident.phone ? <span className="chip">📞 {resident.phone}</span> : null}
              {resident.email ? <span className="chip">✉️ {resident.email}</span> : null}
            </div>
          </div>
        </div>

        {resident.notes ? (
          <div style={{ marginTop: 16 }}>
            <div className="page-title" style={{ fontSize: '1.1rem' }}>Notes</div>
            <p className="text-muted">{resident.notes}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
