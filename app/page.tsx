import Link from 'next/link';
import { supabaseServer } from '@/lib/supabase-server';

export default async function Home() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Post‑Mortem Summarizer</h1>
        <nav style={{ display: 'flex', gap: 12 }}>
          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/logout">Logout</Link>
            </>
          ) : (
            <Link href="/login">Sign in</Link>
          )}
        </nav>
      </header>

      <section style={{ marginTop: 24 }}>
        <p>
          Turn raw project notes into clear, consistent post‑mortems. Create a project, paste in notes, and
          generate a shareable summary in minutes.
        </p>

        {user ? (
          <div style={{ marginTop: 16 }}>
            <Link
              href="/dashboard"
              style={{
                display: 'inline-block',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #e2e2e2',
                textDecoration: 'none',
              }}
            >
              ➜ Go to your dashboard
            </Link>
          </div>
        ) : (
          <div style={{ marginTop: 16 }}>
            <Link
              href="/login"
              style={{
                display: 'inline-block',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #e2e2e2',
                textDecoration: 'none',
              }}
            >
              ➜ Sign in to get started
            </Link>
          </div>
        )}
      </section>

      <footer style={{ marginTop: 48, fontSize: 12, color: '#666' }}>
        <p>
          Built with Next.js + Supabase (free‑tier). Previews deploy on every PR; production updates on merges
          to <code>main</code>.
        </p>
      </footer>
    </main>
  );
}