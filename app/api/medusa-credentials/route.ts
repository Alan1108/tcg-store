import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { deriveMedusaPassword } from '@/lib/medusa-sync'

// Returns derived Medusa credentials for the current Supabase user.
// Makes NO Medusa API call — that happens client-side in the browser.
export async function POST() {
  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const password = await deriveMedusaPassword(user.id)
  const meta = user.user_metadata ?? {}
  const fullName: string = meta.full_name ?? meta.name ?? ''
  const [firstName, ...rest] = fullName.split(' ')

  return NextResponse.json({
    email: user.email,
    password,
    firstName: meta.first_name ?? firstName ?? '',
    lastName: meta.last_name ?? rest.join(' ') ?? '',
  })
}
