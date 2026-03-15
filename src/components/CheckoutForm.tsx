'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerEvent } from '@/app/actions'
import { CreditCard, CheckCircle } from 'lucide-react'

export default function CheckoutForm({ eventId, eventName, entryFee }: { eventId: string, eventName: string, entryFee: number }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const phoneNumber = formData.get('phoneNumber') as string
    const college = formData.get('college') as string
    
    // Mock Payment ID if there is a fee
    const paymentId = entryFee > 0 ? `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}` : undefined
    
    const res = await registerEvent(eventId, {
      phoneNumber,
      college,
      paymentId,
      amountPaid: entryFee
    })
    
    if (res?.error) {
      alert(res.error)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => {
        router.push('/my-events')
        router.refresh()
      }, 2000)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 h-64 bg-green-50 rounded-xl border border-green-200">
         <CheckCircle className="text-green-500 w-16 h-16 mx-auto" />
         <div>
            <h3 className="text-2xl font-bold text-green-900">Registration Confirmed</h3>
            <p className="text-green-700 mt-2">Redirecting to your dashboard...</p>
         </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 md:p-8 rounded-xl border shadow-sm max-w-lg mx-auto mt-8">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
        <p className="text-sm text-gray-500">Registering for {eventName}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input type="tel" name="phoneNumber" required pattern="[0-9]{10}" title="10 digit mobile number" className="block w-full border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-blue-500 border" placeholder="9876543210" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">College/University</label>
          <input type="text" name="college" required className="block w-full border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-blue-500 border" placeholder="Engineering College" />
        </div>
      </div>

      {entryFee > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg border mt-6 space-y-3">
           <h3 className="font-semibold text-gray-900 flex items-center gap-2">
             <CreditCard size={18} className="text-gray-500" /> Payment Details
           </h3>
           <div className="flex justify-between items-center text-sm mb-4">
              <span className="text-gray-600">Entry Fee (Total)</span>
              <span className="font-bold text-lg text-gray-900">${entryFee.toFixed(2)}</span>
           </div>
           <div>
             <label className="block text-xs font-medium text-gray-700 mb-1">Card Number (Mock)</label>
             <input type="text" required pattern="\d{16}" maxLength={16} className="block w-full border-gray-300 rounded-md p-2 bg-white border text-sm" placeholder="1234 5678 9101 1121" />
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Expiry</label>
                <input type="text" required placeholder="MM/YY" className="block w-full border-gray-300 rounded-md p-2 bg-white border text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">CVC</label>
                <input type="password" required maxLength={3} className="block w-full border-gray-300 rounded-md p-2 bg-white border text-sm" placeholder="123" />
              </div>
           </div>
           <p className="text-xs text-gray-400 text-center mt-2">This is a mock payment gateway.</p>
        </div>
      )}

      {entryFee === 0 && (
         <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm border border-blue-100 flex justify-between items-center font-medium">
            <span>Entry Fee</span>
            <span className="bg-blue-200 text-blue-900 px-2 py-0.5 rounded uppercase text-xs">Free</span>
         </div>
      )}

      <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 mt-6 rounded-lg transition disabled:bg-blue-400 disabled:cursor-not-allowed">
        {loading ? 'Processing...' : (entryFee > 0 ? `Pay $${entryFee.toFixed(2)} & Register` : 'Confirm Free Registration')}
      </button>
    </form>
  )
}
