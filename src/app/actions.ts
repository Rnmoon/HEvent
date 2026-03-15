'use server'

import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'

export async function identifyUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  if (!name || !email) {
    throw new Error('Name and email are required')
  }

  // Generate a random token
  const token = crypto.randomUUID()

  try {
    // Check if email already exists
    let user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          user_token: token
        }
      })
    } else {
      // If user exists, update token or just reuse? Let's simply reuse the new token or keep old
      // Wait, the requirement says "first visit only" and "identify returning users by token".
      // But if they lost token and re-enter email, we should probably update their token
      // so they can log in again.
      user = await prisma.user.update({
        where: { email },
        data: { user_token: token }
      })
    }

    // Await cookies before setting, next 15+ async cookies
    const cookieStore = await cookies()
    cookieStore.set('user_token', user.user_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/'
    })
  } catch (error) {
    console.error('Error identifying user:', error)
    throw new Error('Failed to create user profile')
  }

  redirect('/dashboard')
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('user_token')?.value

  if (!token) return null

  const user = await prisma.user.findUnique({
    where: { user_token: token }
  })

  return user
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('user_token')
  redirect('/')
}

export async function registerEvent(eventId: string, details: { phoneNumber: string, college: string, paymentId?: string, amountPaid: number }) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authenticated')

  try {
    await prisma.registration.create({
      data: {
        userId: user.id,
        eventId: eventId,
        phoneNumber: details.phoneNumber,
        college: details.college,
        paymentId: details.paymentId,
        amountPaid: details.amountPaid,
      }
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to register:', error)
    return { error: 'Registration failed or already registered' }
  }
}

export async function unregisterEvent(registrationId: string) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authenticated')

  try {
    // Ensure the registration belongs to user
    const reg = await prisma.registration.findUnique({ where: { id: registrationId }})
    if (reg?.userId !== user.id) throw new Error('Unauthorized')

    await prisma.registration.delete({
      where: { id: registrationId }
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to unregister:', error)
    return { error: 'Failed to cancel registration' }
  }
}

