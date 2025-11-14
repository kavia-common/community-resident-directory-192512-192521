import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * ResidentCard
 * Displays a resident with avatar, name, apartment, and contact chips.
 */
export default function ResidentCard({ resident }) {
  const navigate = useNavigate();
  const { id, name, apartment, phone, email, avatar_url } = resident || {};

  const initials = (name || '??')
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <article
      className="resident-card"
      onClick={() => navigate(`/residents/${id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/residents/${id}`);
      }}
      aria-label={`Open details for ${name}`}
    >
      <div className="avatar" aria-label={`${name} avatar`}>
        {avatar_url ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={avatar_url} alt={`${name} avatar`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <div className="resident-info">
        <h3 className="resident-name">{name}</h3>
        <div className="resident-meta">Apt {apartment}</div>
        <div className="chips">
          {phone ? <span className="chip">📞 {phone}</span> : null}
          {email ? <span className="chip">✉️ {email}</span> : null}
        </div>
      </div>
    </article>
  );
}
