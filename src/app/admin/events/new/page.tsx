import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createEvent } from '../../actions'
import Link from 'next/link'

export default async function NewEventPage() {
  const cookieStore = await cookies()
  if (cookieStore.get('admin_token')?.value !== 'true') redirect('/admin/login')

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
         <h1 className="text-2xl font-bold">Create New Event</h1>
         <Link href="/admin" className="text-gray-500 hover:text-gray-900">Cancel</Link>
      </div>

      <div className="bg-white p-6 md:p-8 border rounded-xl shadow-sm">
        <form action={createEvent} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <input type="text" name="eventName" required className="block w-full border border-gray-300 rounded-md p-2.5 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g. Chess Championship" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select name="category" required className="block w-full border border-gray-300 rounded-md p-2.5 bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
               <option value="Games">Games</option>
               <option value="Cultural">Cultural</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea name="description" required rows={4} className="block w-full border border-gray-300 rounded-md p-2.5 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="About the event..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
            <input type="datetime-local" name="eventDate" required className="block w-full border border-gray-300 rounded-md p-2.5 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Entry Fee ($)</label>
            <input type="number" step="0.01" min="0" defaultValue="0" name="entryFee" required className="block w-full border border-gray-300 rounded-md p-2.5 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg shadow hover:bg-blue-700 transition">
            Save Event
          </button>
        </form>
      </div>
    </div>
  )
}
