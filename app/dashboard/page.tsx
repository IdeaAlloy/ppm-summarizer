import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabase-server';
import NewProjectForm from './new-project-form';

export default async function Dashboard() {
  const supabase = supabaseServer();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: projects } = await supabase
    .from('projects')
    .select('id,name,created_at')
    .order('created_at', { ascending: false });

  return (
    <main style={{ padding: 24, maxWidth: 720 }}>
      <h1>Your Projects</h1>
      <NewProjectForm />
      <ul>
        {(projects ?? []).map(p => (
          <li key={p.id}>
            <strong>{p.name}</strong> – {new Date(p.created_at as any).toLocaleString()}
          </li>
        ))}
      </ul>
    </main>
  );
}