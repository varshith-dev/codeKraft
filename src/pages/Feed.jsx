import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Copy, Check } from 'lucide-react';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    supabase.from('posts').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setPosts(data || []));
  }, []);

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6 pb-20">
      {posts.map((post) => (
        <div key={post.id} className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
          <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-100">{post.title}</h3>
            <span className="text-xs font-mono px-2 py-1 rounded bg-slate-900 text-slate-400 border border-slate-700">
              {post.type.toUpperCase()}
            </span>
          </div>

          <div className="bg-slate-900/50">
            {post.type === 'meme' && post.content_url && (
               post.content_url.match(/\.(mp4|webm|ogg)$/i) 
                ? <video controls src={post.content_url} className="w-full" />
                : <img src={post.content_url} loading="lazy" className="w-full object-contain max-h-[600px]" />
            )}

            {post.type === 'code' && (
              <div className="relative group">
                <button 
                  onClick={() => copyCode(post.code_snippet, post.id)}
                  className="absolute top-2 right-2 p-2 rounded bg-slate-800 opacity-0 group-hover:opacity-100 transition border border-slate-600"
                >
                  {copied === post.id ? <Check size={16} className="text-emerald-400"/> : <Copy size={16}/>}
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
  );
}