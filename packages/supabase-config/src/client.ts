import { createBrowserClient } from '@supabase/ssr';

export function createClient(supabaseUrl?: string, supabaseAnonKey?: string) {
  const url = supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = supabaseAnonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!url || !anonKey) {
    console.warn('Supabase URL or Anon Key is missing in browser client configuration.');
  }

  return createBrowserClient(url, anonKey);
}
