// lib/supabase-server.ts
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

/**
 * Stable server-side client (works cleanly on Next 15 + Vercel)
 */
export function supabaseServer() {
  return createServerComponentClient({ cookies });
}
