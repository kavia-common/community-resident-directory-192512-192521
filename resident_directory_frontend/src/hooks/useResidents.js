import { useEffect, useMemo, useState } from 'react';
import { fetchResidents } from '../services/residentsApi';

/**
 * PUBLIC_INTERFACE
 * useResidents
 * Manages search (debounced), pagination, and data fetching state.
 */
export default function useResidents(initial = {}) {
  const [search, setSearch] = useState(initial.search || '');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(initial.page || 1);
  const [pageSize] = useState(initial.pageSize || 12);
  const [sort] = useState(initial.sort || 'name.asc');

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const params = useMemo(
    () => ({ search: debouncedSearch, page, pageSize, sort }),
    [debouncedSearch, page, pageSize, sort]
  );

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchResidents(params)
      .then((res) => {
        if (!mounted) return;
        setData(res.data || []);
        setCount(res.count || 0);
        if (res.error) setError(res.error);
      })
      .catch((e) => mounted && setError(e))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [params]);

  return {
    search,
    setSearch,
    page,
    setPage,
    pageSize,
    sort,
    loading,
    error,
    data,
    count,
  };
}
