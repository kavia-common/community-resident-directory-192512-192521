import { supabase, supabaseMissingConfig } from './supabaseClient';

/**
 * PUBLIC_INTERFACE
 * fetchResidents
 * Fetches residents with optional search, pagination, and sorting.
 */
export async function fetchResidents({ search = '', page = 1, pageSize = 12, sort = 'name.asc' } = {}) {
  if (supabaseMissingConfig) {
    return { data: [], count: 0, error: null };
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('residents')
    .select('*', { count: 'exact' });

  if (search && search.trim()) {
    const s = `%${search.trim()}%`;
    // ilike on name OR apartment using or()
    query = query.or(`name.ilike.${s},apartment.ilike.${s}`);
  }

  if (sort) {
    const [col, dir] = sort.split('.');
    query = query.order(col, { ascending: dir !== 'desc' });
  }

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    return { data: [], count: 0, error };
  }

  return { data: data || [], count: count ?? 0, error: null };
}

/**
 * PUBLIC_INTERFACE
 * fetchResidentById
 * Fetches a single resident by id.
 */
export async function fetchResidentById(id) {
  if (supabaseMissingConfig) {
    return { data: null, error: null };
  }
  const { data, error } = await supabase.from('residents').select('*').eq('id', id).single();
  if (error) return { data: null, error };
  return { data, error: null };
}
