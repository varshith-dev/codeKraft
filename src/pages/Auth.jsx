import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { Terminal } from 'lucide-react'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert(error.message)
    else alert('Check your email for the magic link!')
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-slate-800/50 border border-slate-700 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Terminal className="text-emerald-400" size={24} />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">Welcome to Code Crafts</h1>
        <p className="text-slate-400 text-center mb-8">Share snippets, memes, and dev chaos.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-emerald-500 outline-none text-white transition"
            type="email"
            placeholder="dev@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 rounded-lg transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Sending Magic Link...' : 'Send Magic Link'}
          </button>
        </form>
      </div>
    </div>
  )
}