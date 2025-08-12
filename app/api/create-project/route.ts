import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function POST(req: Request) {
  const { name } = await req.json();
  if (!name) return new NextResponse('Name required', { status: 400 });

  const supabase = await supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse('Unauthorized', { status: 401 });

  const { error } = await supabase
    .from('projects')
    .insert({ name, owner_id: user.id });

  if (error) return new NextResponse(error.message, { status: 400 });
  return NextResponse.json({ ok: true });
}