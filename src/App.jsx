import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './supabaseClient'
import Navbar from './components/Navbar'
import Feed from './pages/Feed'
import Profile from './pages/Profile' // You had this
import CreatePost from './pages/CreatePost'
import Auth from './pages/Auth'

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-slate-50 font-sans">
        <Navbar session={session} />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/auth" element={!session ? <Auth /> : <Navigate to="/" />} />
          <Route path="/create" element={session ? <CreatePost session={session} /> : <Navigate to="/auth" />} />
          
          {/* This is the line you were missing: */}
          <Route path="/profile" element={session ? <Profile session={session} /> : <Navigate to="/auth" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}