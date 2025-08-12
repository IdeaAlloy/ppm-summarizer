'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';

export default function Logout() {
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.signOut().finally(() => {
      window.location.href = '/';
    });
  }, [supabase]); // include dependency to satisfy react-hooks/exhaustive-deps

  return <p style={{ padding: 24 }}>Signing you out…</p>;
}
