import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/app/actions'
import { redirect } from 'next/navigation'
import CheckoutForm from '@/components/CheckoutForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function EventCheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getCurrentUser()
  if (!user) redirect('/identify')

  const event = await prisma.event.findUnique({
    where: { id }
  })

  if (!event) return <div className="text-center p-8">Event not found</div>

  // Check if already registered
  const existingRegistration = await prisma.registration.findUnique({
    where: {
      userId_eventId: {
        userId: user.id,
        eventId: event.id
      }
    }
  })

  if (existingRegistration) {
    return (
      <div className="text-center py-20">
         <h2 className="text-2xl font-bold mb-4">You are already registered!</h2>
         <Link href="/my-events" className="text-blue-600 hover:underline">View My Events</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Link href="javascript:history.back()" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 font-medium">
         <ArrowLeft size={16} /> Back
      </Link>
      <div className="grid md:grid-cols-2 gap-8 items-start">
         <div className="bg-gray-50 p-6 md:p-8 rounded-xl border">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">{event.category}</span>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">{event.eventName}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
            <div className="space-y-3 pt-6 border-t border-gray-200">
               <div className="flex justify-between">
                  <span className="text-gray-500">Date & Time</span>
                  <span className="font-semibold">{new Date(event.eventDate).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-gray-500">Participant</span>
                  <span className="font-semibold">{user.name}</span>
               </div>
               <div className="flex justify-between items-center text-lg pt-2 mt-2 border-t">
                  <span className="text-gray-700 font-bold">Total Due</span>
                  <span className="font-black text-blue-600">{event.entryFee > 0 ? `$${event.entryFee.toFixed(2)}` : 'FREE'}</span>
               </div>
            </div>
         </div>
         <div>
            <CheckoutForm eventId={event.id} eventName={event.eventName} entryFee={event.entryFee} />
         </div>
      </div>
    </div>
  )
}
