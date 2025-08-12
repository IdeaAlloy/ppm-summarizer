'use client';

import { supabaseBrowser } from '@/lib/supabase-browser';
import { useEffect } from 'react';
export const runtime = 'nodejs';

export default function Logout() {
  useEffect(() => {
    supabaseBrowser.auth.signOut().finally(() => {
      window.location.href = '/';
    });
  }, []);
  return <p style={{ padding: 24 }}>Signing you out…</p>;
}