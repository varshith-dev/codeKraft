import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Code, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function CreatePost({ session }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('meme'); 
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let contentUrl = null;
      if (activeTab === 'meme' && file) {
        // Limit Check
        const isVideo = file.type.startsWith('video/');
        if (file.size > (isVideo ? 150 : 20) * 1024 * 1024) throw new Error("File too large");

        const filePath = `${session.user.id}/${Math.random()}.${file.name.split('.').pop()}`;
        const { error: upErr } = await supabase.storage.from('meme-uploads').upload(filePath, file);
        if (upErr) throw upErr;
        
        const { data } = supabase.storage.from('meme-uploads').getPublicUrl(filePath);
        contentUrl = data.publicUrl;
      }

      const { error } = await supabase.from('posts').insert({
        user_id: session.user.id,
        type: activeTab,
        title,
        content_url: contentUrl,
        code_snippet: activeTab === 'code' ? codeSnippet : null,
        code_language: 'javascript', 
      });

      if (error) throw error;
      navigate('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-emerald-400">Craft a New Post</h2>
        
        <div className="flex bg-slate-900/50 p-1 rounded-lg mb-6">
          {['meme', 'code'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md transition-all ${
                activeTab === tab ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'meme' ? <ImageIcon size={18} /> : <Code size={18} />}
              <span className="capitalize">{tab}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title your creation..."
            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-emerald-500 outline-none text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {activeTab === 'meme' ? (
            <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl p-10 text-center transition bg-slate-900/30">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-emerald-500/10 file:text-emerald-400 file:border-0 hover:file:bg-emerald-500/20 cursor-pointer"
              />
            </div>
          ) : (
            <textarea
              placeholder="// console.log('Hello Code Crafts')"
              className="w-full p-4 bg-slate-950 font-mono text-sm border border-slate-700 rounded-lg h-64 focus:border-emerald-500 outline-none text-emerald-50"
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
            />
          )}

          <button
            disabled={uploading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 rounded-lg flex justify-center items-center gap-2"
          >
            {uploading ? <Loader2 className="animate-spin" size={20} /> : 'Publish'}
          </button>
        </form>
      </div>
    </div>
  );
}