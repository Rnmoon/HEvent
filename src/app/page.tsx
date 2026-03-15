import Link from 'next/link'
import { Calendar, Trophy, Users, MoveRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl mb-16 text-center shadow-lg px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Experience Events <br /> Without the Hassle
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-blue-100">
          Register for college games and cultural fests with just your name and email. No passwords to remember.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/events/games" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
            Explore Games
          </Link>
          <Link href="/events/cultural" className="bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-900 transition border border-blue-500">
            Cultural Fests
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="w-full grid md:grid-cols-3 gap-8 mb-16 max-w-5xl">
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center hover:shadow-md transition">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Passwordless Entry</h3>
          <p className="text-gray-500 text-sm">Join events instantly. Your browser remembers you automatically.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center hover:shadow-md transition">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Competitive Esports</h3>
          <p className="text-gray-500 text-sm">From Chess to Futsal, register for thrilling tournaments.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border text-center hover:shadow-md transition">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Cultural Fests</h3>
          <p className="text-gray-500 text-sm">Showcase your talents in singing, dancing, and drama.</p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="w-full flex flex-col md:flex-row justify-between items-center p-8 bg-gray-50 rounded-xl border gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">Ready to participate?</h2>
          <p className="text-gray-500 mt-1">Check your registered events or find new ones.</p>
        </div>
        <Link href="/dashboard" className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium">
          Get Started <MoveRight size={18} />
        </Link>
      </section>
    </div>
  )
}
