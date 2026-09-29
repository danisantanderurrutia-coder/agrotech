import React, { useState } from 'react';
import { Presentation, Mail, MapPin, Globe, Sparkles, Send, CheckCircle } from 'lucide-react';

interface FooterProps {
  onOpenPitchDeck: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPitchDeck }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setContactSubmitted(true);
      setTimeout(() => setContactSubmitted(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0B2519] text-white border-t border-[#1E3A2B] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Vision Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center p-1 shadow-md">
                <img src="./logo-peumo-quantum.jpg" alt="Urrutia AgroTech Emblem" className="w-full h-full object-contain rounded" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white">URRUTIA AGROTECH</span>
                <p className="text-xs text-amber-400 font-sans font-bold">Agro-Precisión & Satélites ESG</p>
              </div>
            </div>

            <p className="text-sm text-emerald-100/80 font-serif leading-relaxed">
              Donde la raíz chilena encuentra la alta tecnología. Ecosistema de precisión agrícola, sensores telemétricos e inteligencia ambiental en la Región del Maule, Chile.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-emerald-200/80 pt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Talca, Región del Maule, Chile</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Friburgo, Alemania</span>
              </div>
            </div>
          </div>

          {/* Contact Newsletter Box */}
          <div className="lg:col-span-4 bg-[#071810] p-6 rounded-2xl border border-emerald-900 space-y-3">
            <h4 className="font-bold text-white text-sm font-sans flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Contacto Directo & Pilotos en Campo</span>
            </h4>
            <p className="text-xs text-emerald-100/70 font-serif">
              ¿Eres agricultor, parcelero o exportador en el Maule? Solicita un demo de la Estación Telemétrica o tu Informe Climático Predial.
            </p>

            {contactSubmitted ? (
              <div className="p-3 rounded-xl bg-emerald-900/80 border border-emerald-500/50 text-emerald-200 text-xs font-sans flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>¡Mensaje recibido! Te contactaremos a la brevedad.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 pt-1">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.email@fundo.cl" 
                  className="flex-1 px-3 py-2 rounded-xl bg-[#0B2519] border border-emerald-800 text-xs text-white placeholder-emerald-200/40 focus:outline-none focus:border-emerald-400 font-sans"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs font-sans hover:bg-emerald-500 transition-all flex items-center gap-1 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Pitch Deck Launcher */}
          <div className="lg:col-span-3 bg-gradient-to-b from-[#123826] to-[#0B2519] p-6 rounded-2xl border border-amber-500/40 space-y-3 flex flex-col justify-between shadow-lg">
            <div className="space-y-1">
              <span className="text-[10px] font-sans font-bold uppercase text-amber-400 block tracking-wider">
                INVERSORES & SOCIOS
              </span>
              <h4 className="font-bold text-white text-sm">Presentación Ejecutiva</h4>
              <p className="text-xs text-emerald-100/70 font-serif">
                Revisa nuestro deck interactivo de 10 diapositivas.
              </p>
            </div>

            <button
              onClick={onOpenPitchDeck}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs font-sans shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Presentation className="w-4 h-4 text-white" />
              <span>Abrir Pitch Deck</span>
            </button>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-emerald-200/60">
          <p>© 2026 Urrutia AgroTech. Todos los derechos reservados. Maule, Chile.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>Datos: ESA Sentinel-2 / Landsat / DGA Chile</span>
            <span className="text-amber-400 font-sans font-bold">Agro-Precisión Maule</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
