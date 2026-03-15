'use client'

import { CalendarDays, Tag } from 'lucide-react'
import Link from 'next/link'

export default function EventCard({ event, isRegistered }: { event: any, isRegistered: boolean }) {

  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col h-full">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{event.eventName}</h3>
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
            <Tag size={12} /> {event.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
          <CalendarDays size={16} />
          <span>{new Date(event.eventDate).toLocaleDateString()} at {new Date(event.eventDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      </div>
      <div className="px-5 py-4 bg-gray-50 border-t mt-auto">
        <div className="flex justify-between items-center mb-4">
           <span className="text-gray-500 font-medium text-sm">Entry Fee</span>
           <span className="font-bold text-gray-900">{event.entryFee > 0 ? `$${event.entryFee.toFixed(2)}` : 'Free'}</span>
        </div>
        
        {isRegistered ? (
          <button disabled className="w-full bg-green-100 text-green-700 font-semibold py-2 px-4 rounded-lg cursor-not-allowed border border-green-200">
            Registered ✓
          </button>
        ) : (
          <Link 
            href={`/events/${event.id}/register`}
            className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition shadow-sm"
          >
            Register Now
          </Link>
        )}
      </div>
    </div>
  )
}
