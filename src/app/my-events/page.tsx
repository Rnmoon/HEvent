import { getCurrentUser, unregisterEvent } from '@/app/actions'
import { prisma } from '@/lib/db'
import { CalendarDays, Tag, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

export default async function MyEventsPage() {
  const user = await getCurrentUser()
  if (!user) return null

  const myRegistrations = await prisma.registration.findMany({
    where: { userId: user.id },
    include: { event: true },
    orderBy: { event: { eventDate: 'asc' } }
  })

  // Server action to delete
  async function removeRegistration(formData: FormData) {
    'use server'
    const regId = formData.get('regId') as string
    if (regId) {
      await unregisterEvent(regId)
      revalidatePath('/my-events')
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">My Registered Events</h1>
        <p className="mt-2 text-gray-500">View and manage the events you are participating in.</p>
      </div>

      {myRegistrations.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-xl border">
          <p className="mb-4 text-lg">You haven't registered for any events yet.</p>
          <div className="flex justify-center gap-4">
            <Link href="/events/games" className="text-blue-600 hover:underline">Explore Games</Link>
            <span>or</span>
            <Link href="/events/cultural" className="text-blue-600 hover:underline">Cultural Fests</Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRegistrations.map((reg: any) => (
            <div key={reg.id} className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col h-full relative group">
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 pr-8">{reg.event.eventName}</h3>
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                    <Tag size={12} /> {reg.event.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{reg.event.description}</p>
                <div className="flex flex-col gap-2 mt-auto">
                   <div className="flex items-center gap-2 text-sm text-gray-500">
                     <CalendarDays size={16} />
                     <span>{new Date(reg.event.eventDate).toLocaleDateString()} at {new Date(reg.event.eventDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-800 rounded">Registered</span>
                      <span className="text-xs">on {new Date(reg.registeredAt).toLocaleDateString()}</span>
                   </div>
                </div>
              </div>
              <form action={removeRegistration} className="absolute top-4 right-4 bg-white rounded-full">
                <input type="hidden" name="regId" value={reg.id} />
                <button type="submit" title="Cancel Registration" className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition opacity-0 group-hover:opacity-100 focus:opacity-100">
                   <Trash2 size={18} />
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
