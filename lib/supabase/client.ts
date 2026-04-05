import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is properly configured
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

// Use placeholder URL during build if not configured
const url = SUPABASE_URL || 'https://placeholder.supabase.co';
const key = SUPABASE_ANON_KEY || 'placeholder-key';

// Persist singleton across hot reloads in development
const globalForSupabase = globalThis as unknown as { __supabase?: SupabaseClient };

export function createClient() {
  if (typeof window !== 'undefined' && !isSupabaseConfigured()) {
    console.warn(
      'Missing Supabase configuration. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.'
    );
  }

  return createSupabaseClient(url, key, {
    db: {
      schema: 'public',
    },
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      persistSession: typeof window !== 'undefined',
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

// Singleton — survives Fast Refresh / HMR re-evaluations
export const supabase = globalForSupabase.__supabase ?? createClient();
if (typeof window !== 'undefined') {
  globalForSupabase.__supabase = supabase;
}

// Helper for backward compat — now same as default since we use public schema
export const supabasePublicSchema = () => supabase;
