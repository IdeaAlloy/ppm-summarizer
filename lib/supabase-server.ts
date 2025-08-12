import { cookies, headers } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export const supabaseServer = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key: string) => cookies().get(key)?.value,
        set: (key, value, options) => {
          cookies().set(key, value, options);
        },
        remove: (key, options) => {
          cookies().set(key, '', { ...options, maxAge: 0 });
        },
      },
      // Optional: forward a couple headers for better DX/analytics
      headers: () => {
        const incoming = headers();
        const h = new Headers();
        for (const k of ['x-forwarded-for', 'user-agent']) {
          const v = incoming.get(k);
          if (v) h.set(k, v);
        }
        return h;
      },
    }
  );
