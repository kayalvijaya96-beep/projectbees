import { createServerClient, type CookieOptions } from '@supabase/ssr';

export interface CookieStoreLike {
  get(name: string): { name: string; value: string } | undefined;
  set(name: string, value: string, options: CookieOptions): void;
  remove(name: string, options: CookieOptions): void;
}

export function createServerSupabaseClient(cookieStore: CookieStoreLike) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set(name, value, options);
        } catch {
          // Handled if invoked from a Server Component where setting cookies is restricted
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.remove(name, options);
        } catch {
          // Handled if invoked from a Server Component
        }
      },
    },
  });
}

