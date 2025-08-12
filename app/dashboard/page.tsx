export const runtime = 'nodejs';

import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase-server';
import NewProjectForm from './new-project-form';

type ProjectRow = { id: string; name: string; created_at: string };

export default async function Dashboard() {
  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data, error } = await supabase
    .from('projects')
    .select('id,name,created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Your Projects</h1>
        <p style={{ color: 'crimson' }}>Error loading projects: {error.message}</p>
        <NewProjectForm />
      </main>
    );
  }

  const projects: ProjectRow[] = (data ?? []) as ProjectRow[];

  return (
    <main style={{ padding: 24, maxWidth: 720 }}>
      <h1>Your Projects</h1>
      <NewProjectForm />
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — {new Date(p.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </main>
  );
}