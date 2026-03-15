import { getCurrentUser } from '@/app/actions'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Calendar, Trophy, List, LogOut } from 'lucide-react'
import { logout } from '@/app/actions'
import EventCard from '@/components/EventCard'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) return null

  const myRegistrations = await prisma.registration.findMany({
    where: { userId: user.id },
    include: { event: true },
    orderBy: { registeredAt: 'desc' },
    take: 3
  })

  return (
    <div className="space-y-8">
      {/* Header Profile */}
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="h-20 w-20 bg-blue-100 text-blue-700 text-3xl font-bold rounded-full flex mx-auto md:mx-0 items-center justify-center">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <form action={logout}>
           <button className="flex items-center gap-2 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition font-medium text-sm w-full md:w-auto justify-center border border-transparent hover:border-red-100">
             <LogOut size={18} /> Logout Device
           </button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Nav */}
        <Link href="/events/games" className="group bg-white p-6 rounded-xl shadow-sm border hover:border-blue-500 hover:shadow-md transition flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
             <Trophy size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition">Games Events</h3>
            <p className="text-sm text-gray-500">View sports & esports</p>
          </div>
        </Link>
        <Link href="/events/cultural" className="group bg-white p-6 rounded-xl shadow-sm border hover:border-purple-500 hover:shadow-md transition flex items-center gap-4">
          <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition">
             <Calendar size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition">Cultural Events</h3>
            <p className="text-sm text-gray-500">View fests & drama</p>
          </div>
        </Link>
        <Link href="/my-events" className="group bg-white p-6 rounded-xl shadow-sm border hover:border-green-500 hover:shadow-md transition flex items-center gap-4">
          <div className="h-12 w-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition">
             <List size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition">My Events</h3>
            <p className="text-sm text-gray-500">Manage registrations</p>
          </div>
        </Link>
      </div>

      <div className="mt-8">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Registrations</h2>
            {myRegistrations.length > 0 && (
              <Link href="/my-events" className="text-blue-600 text-sm font-medium hover:underline">View all</Link>
            )}
         </div>
         {myRegistrations.length === 0 ? (
            <div className="bg-gray-50 border rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <List size={32} />
              </div>
              <p className="text-gray-500 mb-4 font-medium">You haven't registered for any events yet.</p>
              <Link href="/events/games" className="inline-flex bg-white text-blue-600 font-medium px-5 py-2.5 border rounded-lg shadow-sm hover:bg-gray-50 transition">Browse Events</Link>
            </div>
         ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myRegistrations.map((reg: any) => (
                 <EventCard key={reg.id} event={reg.event} isRegistered={true} />
              ))}
            </div>
         )}
      </div>
    </div>
  )
}
