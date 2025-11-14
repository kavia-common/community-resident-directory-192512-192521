import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;

// Expose a boolean flag for UI to show config banner.
export const supabaseMissingConfig = !SUPABASE_URL || !SUPABASE_KEY;

if (supabaseMissingConfig) {
  // eslint-disable-next-line no-console
  console.warn(
    '[ResidentDirectory] Missing Supabase configuration. ' +
      'Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY to enable data fetching.'
  );
}

/**
 * PUBLIC_INTERFACE
 * supabase
 * Initialized Supabase client (may be limited if env missing).
 */
export const supabase = createClient(SUPABASE_URL || 'https://example.invalid', SUPABASE_KEY || 'public-anon-key', {
  auth: { persistSession: false },
});
