import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Creates a privileged Supabase client with the service-role key.
 * Strictly for server-side transactions, Edge Functions, and OTP verification.
 * NEVER expose to the browser!
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!url || !serviceRoleKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY on server environment.');
  }

  return createSupabaseClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

