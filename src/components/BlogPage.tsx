import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost, BlogComment } from '../types';
import { 
  Newspaper, Calendar, Clock, User, MessageSquare, Send, 
  ArrowLeft, Check, Sparkles, Tag, Share2, Mail 
} from 'lucide-react';

interface BlogPageProps {
  onNavigate: (viewId: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Comment form state
  const [commentName, setCommentName] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [commentAddedSuccess, setCommentAddedSuccess] = useState<boolean>(false);

  // Newsletter form state
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !commentName.trim() || !commentText.trim()) return;

    const newComment: BlogComment = {
      id: `c_${Date.now()}`,
      author: commentName.trim(),
      date: 'Ahora mismo',
      text: commentText.trim()
    };

    const updatedPosts = posts.map(p => {
      if (p.id === selectedPost.id) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    });

    setPosts(updatedPosts);
    setSelectedPost({ ...selectedPost, comments: [...selectedPost.comments, newComment] });
    setCommentName('');
    setCommentText('');
    setCommentAddedSuccess(true);
    setTimeout(() => setCommentAddedSuccess(false), 4000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0B2519] py-12 border-b border-[#1E3A2B] text-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-4">
          <button 
            onClick={() => onNavigate('landing')}
            className="inline-flex items-center gap-2 font-sans font-bold text-xs text-amber-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Inicio</span>
          </button>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-sans font-bold">
              <Newspaper className="w-3.5 h-3.5 text-emerald-400" />
              <span>Bitácora & Periodismo Agroclimático</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              Blog: <span className="text-amber-400">Columnas, Noticias & Entrevistas</span>
            </h1>

            <p className="text-base text-emerald-100/80 font-serif max-w-3xl">
              Análisis técnico sin rodeos sobre microclimas, heladas en el Maule, mecatrónica de terreno e inteligencia satelital para la agricultura moderna.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* VIEW 1: FULL SINGLE ARTICLE READER */}
        {selectedPost ? (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            
            <button
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 font-sans font-bold text-xs text-emerald-800 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la lista de artículos</span>
            </button>

            {/* Article Header */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex flex-wrap items-center gap-3 text-xs font-sans font-bold text-slate-500">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  {selectedPost.category}
                </span>
                <span>• {selectedPost.date}</span>
                <span>• {selectedPost.readTime}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2519] leading-tight">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-xs font-sans">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-bold">
                  {selectedPost.author.charAt(0)}
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{selectedPost.author}</span>
                  <span className="text-slate-500">{selectedPost.authorRole}</span>
                </div>
              </div>

              {/* Featured Cover Image */}
              <div className="h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-sm">
                <img 
                  src={selectedPost.coverImage} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Paragraphs */}
              <div className="space-y-4 text-slate-700 font-serif text-base leading-relaxed pt-4">
                {selectedPost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100 font-sans text-xs">
                <span className="font-bold text-slate-500 mr-2">Temas:</span>
                {selectedPost.tags.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                    #{t}
                  </span>
                ))}
              </div>

            </div>

            {/* Newsletter Subscription Box */}
            <div className="bg-[#0B2519] p-6 sm:p-8 rounded-3xl border border-[#1E3A2B] text-white space-y-4 shadow-md">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="font-extrabold text-lg">¿Te gustó este artículo? Suscríbete a nuestro boletín</h3>
                  <p className="text-xs text-emerald-100/80 font-serif">Recibe columnas semanales de clima y mecatrónica maulina directo en tu correo.</p>
                </div>
              </div>

              {newsletterSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-900/80 border border-emerald-500 text-emerald-200 text-xs font-sans flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>¡Suscripción confirmada! Te enviaremos los próximos análisis.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input 
                    type="email" 
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="tu.email@fundo.cl"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#071810] border border-emerald-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 font-sans"
                  />
                  <button 
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 text-[#0B2519] font-sans font-bold text-xs hover:bg-amber-400 transition-colors"
                  >
                    Suscribirme
                  </button>
                </form>
              )}
            </div>

            {/* Interactive Comments Section */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-extrabold text-slate-900 text-xl flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-700" />
                  <span>Comentarios ({selectedPost.comments.length})</span>
                </h3>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="space-y-3 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 font-sans text-xs">
                <span className="font-bold text-slate-800 block text-sm">Deja tu comentario u opinión:</span>
                
                {commentAddedSuccess && (
                  <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-900 font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>¡Comentario publicado con éxito!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="Tu Nombre o Nombre de Fundo" 
                    className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Escribe aquí tus comentarios, dudas técnicas sobre la helada o experiencias..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-emerald-600"
                />

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0B2519] text-white font-bold hover:bg-emerald-900 transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publicar Comentario</span>
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-4 pt-2">
                {selectedPost.comments.length === 0 ? (
                  <p className="text-xs text-slate-500 font-serif italic text-center py-4">Sé el primero en comentar este artículo.</p>
                ) : (
                  selectedPost.comments.map((c) => (
                    <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 font-sans text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{c.author}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{c.date}</span>
                      </div>
                      <p className="text-slate-700 font-serif leading-relaxed text-xs">{c.text}</p>
                    </div>
                  ))
                )}
              </div>

            </div>

          </div>
        ) : (

          /* VIEW 2: BLOG LIST & CATEGORY FILTER */
          <div className="space-y-10">
            
            {/* Category Pills & Search Header */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <Newspaper className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Editorial AgroTech</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#0B2519]">Artículos & Publicaciones Recientes</h2>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 font-sans text-xs bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedCategory === 'all' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Todos ({posts.length})
                </button>
                <button
                  onClick={() => setSelectedCategory('Columna de Opinión')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedCategory === 'Columna de Opinión' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Columnas
                </button>
                <button
                  onClick={() => setSelectedCategory('Entrevista')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedCategory === 'Entrevista' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Entrevistas
                </button>
                <button
                  onClick={() => setSelectedCategory('Noticias Agtech')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedCategory === 'Noticias Agtech' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Noticias
                </button>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <div className="space-y-4">
                    {/* Cover image */}
                    <div className="h-52 w-full relative overflow-hidden bg-slate-100">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B2519]/90 backdrop-blur-md text-amber-400 text-[10px] font-sans font-bold border border-emerald-500/30">
                        {post.category}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-900/80 text-white font-sans text-[10px]">
                        {post.readTime}
                      </div>
                    </div>

                    <div className="p-6 pt-1 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-sans">
                        <span>{post.date}</span>
                        <span className="text-emerald-800 font-bold">{post.comments.length} comentarios</span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-emerald-800 transition-colors leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-600 font-serif leading-relaxed line-clamp-3">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-xs font-sans text-emerald-800 font-bold mt-4">
                    <span>Leer Artículo Completo</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Subscription Box */}
            <div className="bg-[#0B2519] p-6 sm:p-8 rounded-3xl border border-[#1E3A2B] text-white space-y-4 shadow-md max-w-2xl mx-auto text-center">
              <div className="space-y-1">
                <h3 className="font-extrabold text-xl">Boletín Técnico Agroclimático</h3>
                <p className="text-xs text-emerald-100/80 font-serif">Recibe las últimas alertas de helada e informes de cuencas en tu casilla de correo.</p>
              </div>

              {newsletterSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-900/80 border border-emerald-500 text-emerald-200 text-xs font-sans flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>¡Suscrito con éxito! Gracias por acompañarnos.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
                  <input 
                    type="email" 
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="tu.email@fundo.cl"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#071810] border border-emerald-800 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 font-sans"
                  />
                  <button 
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 text-[#0B2519] font-sans font-bold text-xs hover:bg-amber-400 transition-colors"
                  >
                    Unirme
                  </button>
                </form>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
