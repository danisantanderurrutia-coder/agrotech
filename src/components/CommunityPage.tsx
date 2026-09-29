import React, { useState } from 'react';
import { COMMUNITY_POSTS, MEMBERSHIP_TIERS } from '../data/mockData';
import { CommunityPost, MembershipTier } from '../types';
import { 
  Users, Heart, ArrowLeft, ThumbsUp, Calendar, MapPin, 
  Check, Sparkles, Shield, MessageCircle, ExternalLink, Award, CreditCard 
} from 'lucide-react';

interface CommunityPageProps {
  onNavigate: (viewId: string) => void;
  initialTab?: 'activities' | 'join';
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate, initialTab = 'activities' }) => {
  const [activeTab, setActiveTab] = useState<'activities' | 'join'>(initialTab);
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [selectedTier, setSelectedTier] = useState<MembershipTier | null>(null);
  const [membershipSuccess, setMembershipSuccess] = useState<boolean>(false);

  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleJoinMembership = (tier: MembershipTier) => {
    setSelectedTier(tier);
    setMembershipSuccess(true);
    setTimeout(() => setMembershipSuccess(false), 5000);
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
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Red Agroecológica & Comunidad Maule</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              Comunidad: <span className="text-emerald-400">Actividades, Redes & "Sé Parte"</span>
            </h1>

            <p className="text-base text-emerald-100/80 font-serif max-w-3xl">
              El espacio de encuentro entre parceleros, agricultores maulinos, investigadores y organizaciones aliadas. Conoce las actividades comunitarias y súmate como socio.
            </p>
          </div>

          {/* Subpestañas */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('activities')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                activeTab === 'activities'
                  ? 'bg-emerald-500 text-[#0B2519] shadow-md'
                  : 'bg-emerald-950/80 border border-emerald-800 text-emerald-200 hover:bg-emerald-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Actividades & Galería</span>
            </button>

            <button
              onClick={() => setActiveTab('join')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                activeTab === 'join'
                  ? 'bg-amber-500 text-[#0B2519] shadow-md'
                  : 'bg-emerald-950/80 border border-emerald-800 text-emerald-200 hover:bg-emerald-900'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Sé Parte (Membresías & Apoyo)</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* TAB 1: ACTIVIDADES Y GALERÍA */}
        {activeTab === 'activities' && (
          <div className="space-y-12">
            
            {/* DESTACADO ESPECIAL: ENCUENTROS MANOS EN LA TIERRA */}
            <div className="bg-gradient-to-br from-[#0B2519] via-emerald-950 to-[#071A11] p-6 sm:p-8 rounded-3xl border border-emerald-700/40 shadow-xl text-white space-y-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Encuentros Presenciales en Terreno • Región del Maule</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Encuentros <span className="text-amber-400 font-serif italic">"Manos en la Tierra"</span>
                  </h2>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-emerald-500 text-[#0B2519] font-bold text-xs shadow-sm">
                  100% Gratuito y Abierto
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <p className="text-sm sm:text-base text-emerald-100/90 font-serif leading-relaxed">
                    Jornadas técnicas y comunitarias en predios agrícolas del Maule. Demostraciones en vivo de sensórica IoT anti-heladas (KioT), monitoreo satelital pre-compra, biotecnología de suelos y talleres prácticos de compostaje y biodiversidad nativa.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs text-emerald-200">
                    <div className="flex items-center gap-2 bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-700/50">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Pruebas KioT IP65</span>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-700/50">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Diagnóstico Hídrico</span>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-700/50">
                      <Check className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Intercambio de Semillas</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white/5 p-4 rounded-2xl border border-emerald-500/30 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-amber-300 font-mono">
                    <span>PRÓXIMA FECHA</span>
                    <span className="font-bold">Sábado 18 Oct</span>
                  </div>
                  <div className="text-slate-200 font-sans">
                    <strong>Lugar:</strong> Parcela Demostrativa San Clemente / Talca, Maule
                  </div>
                  <button 
                    onClick={() => setActiveTab('join')}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B2519] font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-md"
                  >
                    Inscribirme a Próximo Encuentro
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <Users className="w-3.5 h-3.5 text-emerald-700" />
                <span>Bitácora Comunitaria de Terreno</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2519]">Galeria & Experiencias de Campo</h2>
              <p className="text-slate-600 text-sm font-serif max-w-3xl">
                Fotos y novedades de los encuentros participativos en parcelas del Maule, junto a la A.G. de Viñateros Ancestrales, la Red de Custodios de Semillas y comités de agua rural.
              </p>
            </div>

            {/* Posts & Photo Feed */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all">
                  <div className="space-y-4">
                    {post.imageUrl && (
                      <div className="h-56 w-full relative overflow-hidden bg-slate-100">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B2519]/80 backdrop-blur-md text-amber-300 text-[10px] font-sans font-bold border border-emerald-500/30">
                          {post.category}
                        </div>
                      </div>
                    )}

                    <div className="p-6 pt-2 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-sans">
                        <span>{post.date}</span>
                        {post.partnerName && (
                          <span className="text-emerald-800 font-bold text-[11px]">🤝 {post.partnerName}</span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-emerald-800 transition-colors leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-600 font-serif leading-relaxed">
                        {post.text}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between font-sans text-xs">
                    <span className="text-slate-500">Por: {post.author}</span>
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{post.likes} Me Gusta</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Photo Gallery Grid (Unsplash) */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
              <div className="space-y-1">
                <span className="text-amber-800 font-sans text-xs font-bold uppercase">GALERÍA FOTOGRÁFICA UN SPLASH</span>
                <h3 className="text-xl font-bold text-[#0B2519]">Instantes del Campo Maulino</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="h-44 rounded-2xl overflow-hidden shadow-sm relative group">
                  <img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80" alt="Vendimia Maule" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-3 text-white text-xs font-bold">Viñedos Cauquenes</div>
                </div>
                <div className="h-44 rounded-2xl overflow-hidden shadow-sm relative group">
                  <img src="https://images.unsplash.com/photo-1592417817098-8f3d6eb231fc?auto=format&fit=crop&w=600&q=80" alt="Taller Huerto" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-3 text-white text-xs font-bold">Huertos Orgánicos</div>
                </div>
                <div className="h-44 rounded-2xl overflow-hidden shadow-sm relative group">
                  <img src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80" alt="Custodios Semillas" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-3 text-white text-xs font-bold">Semillas Nativas</div>
                </div>
                <div className="h-44 rounded-2xl overflow-hidden shadow-sm relative group">
                  <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80" alt="Red Agricultores" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-3 text-white text-xs font-bold">Red de Agricultores</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SÉ PARTE (MEMBRESÍAS) */}
        {activeTab === 'join' && (
          <div className="space-y-10">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Membresía & Financiamiento Colectivo</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#0B2519]">Súmate como Socio de Urrutia AgroTech</h2>
              <p className="text-slate-600 text-base font-serif">
                Impulsa la investigación abierta en heladas y ciencias del suelo en el Maule. Elige la forma de apoyo que mejor se adapte a ti y accede a beneficios exclusivos.
              </p>
            </div>

            {membershipSuccess && selectedTier && (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-sans text-xs shadow-sm animate-fadeIn flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block text-sm">¡Bienvenido al nivel "{selectedTier.name}"!</span>
                    <span>Te enviamos la invitación al Canal VIP de WhatsApp y al grupo privado de Telegram.</span>
                  </div>
                </div>
                <span className="font-bold text-amber-800 text-base">{selectedTier.priceClp} / mes</span>
              </div>
            )}

            {/* Tiers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MEMBERSHIP_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`bg-white p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between relative ${
                    tier.isPopular 
                      ? 'border-amber-500 shadow-lg ring-2 ring-amber-500/30' 
                      : 'border-slate-200 shadow-sm hover:border-emerald-500/40'
                  }`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-amber-500 text-[#0B2519] font-sans font-extrabold text-[11px] shadow-sm">
                      {tier.badge}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-2 border-b border-slate-100 pb-4">
                      <h3 className="text-xl font-extrabold text-[#0B2519]">{tier.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-emerald-800">{tier.priceClp}</span>
                        <span className="text-xs text-slate-500 font-bold">CLP ({tier.priceEur}) / {tier.period}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-serif leading-relaxed">
                        {tier.description}
                      </p>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-2.5 font-sans text-xs">
                      <span className="text-amber-800 font-bold block text-[10px] uppercase">BENEFICIOS EXCLUSIVOS:</span>
                      <ul className="space-y-2 text-slate-700">
                        {tier.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Payment methods */}
                    <div className="pt-2 space-y-1 font-sans text-[11px] text-slate-500">
                      <span className="font-bold text-slate-700 block">Vías de pago aceptadas:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {tier.paymentMethods.map((m, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleJoinMembership(tier)}
                    className={`w-full mt-6 py-3 rounded-xl font-sans font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                      tier.isPopular
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B2519] hover:brightness-110'
                        : 'bg-[#0B2519] text-white hover:bg-emerald-900'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Unirme como {tier.name}</span>
                  </button>

                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
