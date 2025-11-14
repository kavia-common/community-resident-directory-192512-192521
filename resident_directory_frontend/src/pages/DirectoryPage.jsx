import React from 'react';

import SearchBar from '../components/SearchBar';
import ResidentList from '../components/ResidentList';
import useResidents from '../hooks/useResidents';

/**
 * PUBLIC_INTERFACE
 * DirectoryPage
 * Main directory with search, results, and pagination controls.
 */
export default function DirectoryPage() {
  const {
    search,
    setSearch,
    page,
    setPage,
    pageSize,
    loading,
    error,
    data,
    count,
  } = useResidents();

  const totalPages = Math.max(1, Math.ceil((count || 0) / pageSize));

  return (
    <div className="container">
      <section className="directory-header">
        <h1 className="page-title">Directory</h1>
        <p className="subtitle">
          Browse, search, and view residents. Showing {data?.length || 0} of {count ?? 0}.
        </p>
      </section>

      <ResidentList residents={data} loading={loading} error={error} />

      <div className="pagination">
        <button
          className="btn"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          ◀ Prev
        </button>
        <div className="text-muted" aria-live="polite" style={{ padding: '10px 8px' }}>
          Page {page} of {totalPages}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
