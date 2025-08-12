// lib/supabase-server.ts
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

/**
 * Async server-side Supabase client for Next.js App Router (Next 15).
 * - Awaits Next's cookies() (it's async now).
 * - Supplies a minimal cookie adapter (get/set/remove).
 *   In server components we only need `get`; `set/remove` are no-ops here.
 */
export async function supabaseServer() {
  const cookieStore = await cookies(); // Next 15: returns Promise<ReadonlyRequestCookies>

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Adapter shape expected by @supabase/ssr
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        // No-ops in RSC; real updates happen in middleware or route handlers
        set() {},
        remove() {},
      } as any, // Cast to satisfy the interface while using the async cookie store
    }
  );
}