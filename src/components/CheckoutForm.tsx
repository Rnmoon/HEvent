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
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-6 min-h-[400px] bg-[#111] rounded-3xl border border-accent-yellow/30 shadow-[0_0_40px_rgba(250,204,21,0.1)]">
         <CheckCircle className="text-accent-yellow w-24 h-24 mx-auto" />
         <div>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Secured</h3>
            <p className="text-gray-400 mt-2 font-medium">Your pass has been assigned. Redirecting...</p>
         </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-[#111] p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] pointer-events-none"></div>

      <div className="border-b border-white/10 pb-6 mb-8 relative z-10">
        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Checkout Details</h2>
        <p className="text-sm font-medium text-gray-500 mt-1">Completing registration for {eventName}</p>
      </div>

      <div className="space-y-5 relative z-10">
        <div>
          <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Phone Number</label>
          <input type="tel" name="phoneNumber" required pattern="[0-9]{10}" title="10 digit mobile number" className="block w-full bg-[#0a0a0a] border border-white/10 text-white rounded-xl focus:ring-accent-yellow focus:border-accent-yellow p-4 outline-none transition-all placeholder-gray-700 font-medium" placeholder="9876543210" />
        </div>
        <div>
          <label className="block text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">College/University</label>
          <input type="text" name="college" required className="block w-full bg-[#0a0a0a] border border-white/10 text-white rounded-xl focus:ring-accent-yellow focus:border-accent-yellow p-4 outline-none transition-all placeholder-gray-700 font-medium" placeholder="Underground Academy" />
        </div>
      </div>

      {entryFee > 0 && (
        <div className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 mt-8 space-y-5 relative z-10">
           <h3 className="font-bold text-white flex items-center gap-3 uppercase tracking-wider text-sm mb-4">
             <CreditCard size={18} className="text-accent-yellow" /> Payment Method
           </h3>
           <div>
             <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">Card Number (Mock)</label>
             <input type="text" required pattern="\d{16}" maxLength={16} className="block w-full bg-white/5 border border-white/10 text-white rounded-lg focus:ring-accent-yellow p-3 outline-none transition-all placeholder-gray-600 font-mono text-sm tracking-widest" placeholder="1234 5678 9101 1121" />
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">Expiry</label>
                <input type="text" required placeholder="MM/YY" className="block w-full bg-white/5 border border-white/10 text-white rounded-lg focus:ring-accent-yellow p-3 outline-none transition-all placeholder-gray-600 font-mono text-sm tracking-widest" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">CVC</label>
                <input type="password" required maxLength={3} className="block w-full bg-white/5 border border-white/10 text-white rounded-lg focus:ring-accent-yellow p-3 outline-none transition-all placeholder-gray-600 font-mono text-sm tracking-widest" placeholder="•••" />
              </div>
           </div>
           <p className="text-[10px] uppercase tracking-widest text-gray-500 text-center mt-4">Simulation Gateway</p>
        </div>
      )}

      {entryFee === 0 && (
         <div className="bg-white/5 text-gray-300 p-5 rounded-2xl border border-white/10 flex justify-between items-center font-bold uppercase tracking-widest text-sm relative z-10">
            <span>Entry Pass</span>
            <span className="bg-accent-yellow text-background px-3 py-1 rounded bg-opacity-100">Free</span>
         </div>
      )}

      <button disabled={loading} type="submit" className="w-full bg-accent-yellow hover:bg-yellow-500 text-background font-black uppercase tracking-widest py-4 mt-8 rounded-xl transition-all shadow-[0_0_20px_rgba(250,204,21,0.2)] disabled:bg-gray-600 disabled:text-gray-400 disabled:shadow-none hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:-translate-y-1 relative z-10">
        {loading ? 'Processing...' : (entryFee > 0 ? `Pay $${entryFee.toFixed(2)} & Connect` : 'Confirm Registration')}
      </button>
    </form>
  )
}
