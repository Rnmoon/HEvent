import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export default async function AdminParticipantsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cookieStore = await cookies()
  if (cookieStore.get('admin_token')?.value !== 'true') redirect('/admin/login')

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      registrations: {
        include: { user: true },
        orderBy: { registeredAt: 'desc' }
      }
    }
  })

  if (!event) return <div className="p-8 text-center text-red-500">Event not found</div>

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
         <div className="flex items-center gap-4">
           <Link href="/admin" className="text-gray-500 hover:text-gray-900 bg-gray-100 p-2 rounded-full transition">
              <ArrowLeft size={20} />
           </Link>
           <div>
             <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 flex items-center gap-2">
               Participants
             </h1>
             <p className="text-sm text-gray-500">{event.eventName} • {event.category}</p>
           </div>
         </div>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone & College</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered At</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {event.registrations.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No participants yet.</td>
              </tr>
            )}
            {event.registrations.map((reg: any) => (
              <tr key={reg.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{reg.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="font-medium">{reg.phoneNumber || 'N/A'}</div>
                  <div className="text-xs">{reg.college || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {reg.amountPaid > 0 ? (
                     <div>
                       <div className="font-medium text-green-600">${reg.amountPaid.toFixed(2)}</div>
                       <div className="text-xs font-mono">{reg.paymentId}</div>
                     </div>
                  ) : (
                     <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold">Free</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(reg.registeredAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
