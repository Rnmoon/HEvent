import { identifyUser } from '@/app/actions'
import { ArrowRight } from 'lucide-react'

export default function IdentifyPage() {
  return (
    <div className="flex items-center justify-center pt-10">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome</h1>
          <p className="text-gray-500 mt-2">Enter your details to register for events. We'll remember you on this device.</p>
        </div>

        <form action={identifyUser} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              required
              className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              className="mt-1 block w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3"
              placeholder="john@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Continue <ArrowRight size={16} />
          </button>
        </form>
        <p className="mt-6 text-xs text-center text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy. No password required.
        </p>
      </div>
    </div>
  )
}
