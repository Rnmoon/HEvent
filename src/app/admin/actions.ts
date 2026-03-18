'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function adminLogin(formData: FormData) {
  const password = formData.get('password')

  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set('admin_token', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 // 1 day
    })
    redirect('/admin')
  } else {
    redirect('/admin/login?error=invalid-password')
  }
}

export async function adminLogout() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
  redirect('/admin/login')
}

export async function createEvent(formData: FormData) {
  // Validate admin
  const cookieStore = await cookies()
  if (!cookieStore.get('admin_token')) throw new Error('Unauthorized')

  const eventName = formData.get('eventName') as string
  const category = formData.get('category') as string
  const description = formData.get('description') as string
  const eventDate = formData.get('eventDate') as string
  
  const isTeamEventStr = formData.get('isTeamEvent') as string
  const minTeamSizeStr = formData.get('minTeamSize') as string
  const maxTeamSizeStr = formData.get('maxTeamSize') as string

  if (!eventName || !category || !description || !eventDate) throw new Error('All fields required')
  
  const isTeamEvent = isTeamEventStr === 'on'
  const minTeamSize = minTeamSizeStr ? parseInt(minTeamSizeStr, 10) : null
  const maxTeamSize = maxTeamSizeStr ? parseInt(maxTeamSizeStr, 10) : null

  await prisma.event.create({
    data: {
      eventName,
      category,
      description,
      eventDate: new Date(eventDate),
      isTeamEvent,
      minTeamSize,
      maxTeamSize
    }
  })

  redirect('/admin')
}

export async function deleteEvent(id: string) {
  const cookieStore = await cookies()
  if (!cookieStore.get('admin_token')) throw new Error('Unauthorized')

  // delete related registrations first or cascade (but cascade needs schema update), we delete manually
  await prisma.registration.deleteMany({
    where: { eventId: id }
  })
  
  await prisma.event.delete({
    where: { id }
  })

  // We must revalidate path or redirect to refresh list
  const { revalidatePath } = await import('next/cache')
  revalidatePath('/admin')
}
