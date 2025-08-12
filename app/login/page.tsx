'use client';

import { supabaseBrowser } from '@/lib/supabase-browser';
import { useState } from 'react';

export default function LoginPage() {
  const supabase = supabaseBrowser;
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${location.origin}/dashboard` },
    });
    if (error) alert(error.message);
    else setSent(true);
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Sign in</h1>
      {sent ? (
        <p>Check your email for a magic link.</p>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 8, marginRight: 8 }}
          />
          <button type="submit">Send Magic Link</button>
        </form>
      )}
    </main>
  );
}