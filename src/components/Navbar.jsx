import { Link } from 'react-router-dom';
import { Terminal, LogOut, PlusSquare } from 'lucide-react';

export default function Navbar({ session }) {
  return (
    <nav className="border-b border-slate-800 bg-slate-950 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-emerald-500/10 p-2 rounded-lg group-hover:bg-emerald-500/20 transition">
            <Terminal className="text-emerald-500" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-100">
            Code<span className="text-emerald-500">Crafts</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link 
                to="/create" 
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-emerald-900/20"
              >
                <PlusSquare size={18} />
                <span>Craft Post</span>
              </Link>
              <button 
                onClick={() => window.location.reload()} 
                className="text-slate-400 hover:text-white transition p-2"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/auth" className="text-emerald-400 font-medium hover:text-emerald-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}