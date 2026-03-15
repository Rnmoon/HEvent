'use client'

import Link from 'next/link'

export default function EventCard({ event, isRegistered }: { event: any, isRegistered: boolean }) {
  const eventDateObj = new Date(event.eventDate)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const dateStr = `${monthNames[eventDateObj.getMonth()]} ${eventDateObj.getDate()}${getOrdinalSuffix(eventDateObj.getDate())}`
  const timeStr = eventDateObj.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

  function getOrdinalSuffix(n: number) {
    const s = ["th", "st", "nd", "rd"]
    const v = n % 100
    return (s[(v - 20) % 10] || s[v] || s[0])
  }

  return (
    <div className="bg-[#f2efe4] rounded-3xl p-4 flex flex-col h-full shadow-xl transition-transform hover:-translate-y-2 relative border border-white/20">
      
      {/* Event Image Placeholder (or real image if it exists) */}
      <div className="w-full h-56 bg-gray-800 rounded-2xl mb-6 overflow-hidden relative shadow-inner">
         <img 
            src={event.imageUrl || 'https://images.unsplash.com/photo-1540039155733-d7316ba31c25?auto=format&fit=crop&q=80'} 
            alt={event.eventName}
            className="w-full h-full object-cover"
         />
      </div>

      <div className="px-2 flex flex-col items-center text-center flex-grow">
        <h3 className="text-3xl font-bold text-gray-900 mb-1">{event.eventName}</h3>
        <p className="text-gray-800 font-semibold mb-3">{dateStr}</p>
        
        <p className="text-gray-500 text-xs px-4 mb-3 line-clamp-2 min-h-8">
           {event.category} • {event.description}
        </p>
        
        <p className="font-bold text-gray-900 text-sm mb-6">Starts {timeStr}</p>
        
        <div className="bg-accent-yellow text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full mb-2">
           {event.entryFee > 0 ? `Entry Price: $${event.entryFee.toFixed(2)}` : 'Entry Price: Free'}
        </div>
        
        {event.entryFee > 0 && (
           <p className="text-[10px] text-gray-500 mb-6">or At The Door: ${(event.entryFee + 20).toFixed(0)}</p>
        )}
        {event.entryFee === 0 && (
           <p className="text-[10px] text-gray-500 mb-6">Limited capacity. Register early.</p>
        )}

      </div>

      <div className="px-2 mt-auto pb-2">
        {isRegistered ? (
          <button disabled className="w-full text-center text-green-700 font-bold py-3 uppercase tracking-widest text-sm border-t border-gray-300 opacity-60">
            REGISTERED ✓
          </button>
        ) : (
          <Link 
            href={`/events/${event.id}/register`}
            className="w-full block text-center text-gray-900 hover:text-blue-600 font-bold py-3 uppercase tracking-widest text-sm border-t border-gray-300 transition-colors"
          >
            {event.entryFee > 0 ? 'BUY TICKET' : 'REGISTER NOW'}
          </Link>
        )}
      </div>
    </div>
  )
}
