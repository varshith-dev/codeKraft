import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Trash2, Copy, Check } from 'lucide-react';

export default function Profile({ session }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    getProfilePosts();
  }, [session]);

  const getProfilePosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', session.user.id) // Only get MY posts
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setPosts(data);
    setLoading(false);
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this craft?");
    if (!confirmDelete) return;

    const { error } = await supabase.from('posts').delete().eq('id', postId);
    if (error) alert(error.message);
    else setPosts(posts.filter((post) => post.id !== postId));
  };

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) return <div className="text-center mt-10 text-slate-400">Loading your crafts...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 pb-20">
      <h2 className="text-3xl font-bold mb-8 text-emerald-400 border-b border-slate-700 pb-4">My Crafts</h2>
      
      {posts.length === 0 ? (
        <div className="text-center text-slate-500 mt-10">
          <p>You haven't crafted anything yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 relative group">
              
              {/* Delete Button (Only visible on Profile) */}
              <button 
                onClick={() => handleDelete(post.id)}
                className="absolute top-4 right-4 z-10 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-lg transition"
                title="Delete Post"
              >
                <Trash2 size={18} />
              </button>

              <div className="p-4 border-b border-slate-700/50">
                <h3 className="font-bold text-lg text-slate-100 pr-12">{post.title}</h3>
                <span className="text-xs font-mono text-emerald-500">{post.type.toUpperCase()}</span>
              </div>

              <div className="bg-slate-900/50">
                {post.type === 'meme' && post.content_url && (
                  post.content_url.match(/\.(mp4|webm|ogg)$/i) 
                    ? <video controls src={post.content_url} className="w-full max-h-[400px]" />
                    : <img src={post.content_url} className="w-full object-contain max-h-[400px]" />
                )}

                {post.type === 'code' && (
                  <div className="relative">
                    <button 
                      onClick={() => copyCode(post.code_snippet, post.id)}
                      className="absolute top-2 right-12 p-2 text-slate-500 hover:text-emerald-400 transition"
                    >
                      {copied === post.id ? <Check size={16}/> : <Copy size={16}/>}
                    </button>
                    <pre className="p-4 overflow-x-auto text-sm font-mono text-emerald-300">
                      <code>{post.code_snippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}