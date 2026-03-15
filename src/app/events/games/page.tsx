import { prisma } from '@/lib/db'
import EventCard from '@/components/EventCard'
import { getCurrentUser } from '@/app/actions'

export default async function GamesEventsPage() {
  const user = await getCurrentUser()
  const events = await prisma.event.findMany({
    where: { category: 'Games' },
    orderBy: { eventDate: 'asc' }
  })

  // Get user's registrations to determine if they already registered
  const userRegistrations = user 
    ? await prisma.registration.findMany({ where: { userId: user.id } })
    : []
    
  const registeredEventIds = new Set(userRegistrations.map((r: any) => r.eventId))

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Games & Sports</h1>
        <p className="mt-2 text-gray-500">Compete in campus sports and esports tournaments.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: any) => (
          <EventCard 
            key={event.id} 
            event={event} 
            isRegistered={registeredEventIds.has(event.id)} 
          />
        ))}
      </div>
      
      {events.length === 0 && (
         <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-xl border">
            No games events available right now.
         </div>
      )}
    </div>
  )
}
