'use client';
import { useTransition } from 'react';

export default function NewProjectForm() {
  const [pending, start] = useTransition();
  async function create(formData: FormData) {
    const res = await fetch('/api/create-project', {
      method: 'POST',
      body: JSON.stringify({ name: String(formData.get('name') || '').trim() }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) location.reload();
    else alert(await res.text());
  }
  return (
    <form action={(fd) => start(() => create(fd))} style={{ margin: '16px 0' }}>
      <input name="name" placeholder="New project name" required style={{ padding: 8, marginRight: 8 }} />
      <button type="submit" disabled={pending}>{pending ? 'Creating…' : 'Create Project'}</button>
    </form>
  );
}