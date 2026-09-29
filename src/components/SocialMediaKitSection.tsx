import React, { useState } from 'react';
import { SOCIAL_TEMPLATES } from '../data/mockData';
import type { SocialTemplate } from '../types';
import { Share2, Video, Copy, Check, MessageSquare, Camera, Globe } from 'lucide-react';

export const SocialMediaKitSection: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<SocialTemplate>(SOCIAL_TEMPLATES[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(selectedTemplate.captionTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="social" className="py-16 bg-cyber-dark border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-greenDeep border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
            <Share2 className="w-3.5 h-3.5" />
            <span>Entregable #4 • Kit de Plantillas para Redes Sociales</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Estrategia de Contenidos <span className="text-cyber-cyan">de Precisión Agrícola</span>
          </h2>

          <p className="text-cyber-paperMuted text-base font-serif">
            Divulgación científica + realidad de campo en el Maule. Plantillas de alto impacto para TikTok, Instagram y LinkedIn B2B.
          </p>
        </div>

        {/* Platform Selector Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {SOCIAL_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setSelectedTemplate(tmpl)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                selectedTemplate.id === tmpl.id
                  ? 'bg-cyber-cyan text-cyber-dark shadow-glow-cyan'
                  : 'bg-cyber-panel border border-cyber-border text-cyber-paper hover:text-white'
              }`}
            >
              {tmpl.platform === 'TikTok' && <Video className="w-4 h-4" />}
              {tmpl.platform.includes('Instagram') && <Camera className="w-4 h-4" />}
              {tmpl.platform === 'LinkedIn' && <Globe className="w-4 h-4" />}
              <span>{tmpl.title}</span>
            </button>
          ))}
        </div>

        {/* Template Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Template Mockup Frame */}
          <div className="lg:col-span-6 glass-panel-green p-6 rounded-2xl border border-cyber-cyan/30 space-y-4">
            
            <div className="flex items-center justify-between font-mono text-xs text-cyber-paperMuted border-b border-cyber-border pb-3">
              <span className="text-cyber-gold font-bold uppercase">{selectedTemplate.platform} TEMPLATE</span>
              <span>{selectedTemplate.format}</span>
            </div>

            {/* Visual Phone / Card Canvas Mockup */}
            <div className="p-6 rounded-xl bg-cyber-dark border border-cyber-border space-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyber-cyan/10 rounded-full blur-2xl" />

              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyber-cyan font-bold">@urrutia.agrotech</span>
                <span className="px-2 py-0.5 rounded bg-cyber-panel text-cyber-paperMuted text-[10px]">
                  Urrutia AgroTech Style
                </span>
              </div>

              {/* Headline Prompt Box */}
              <div className="p-4 rounded-lg bg-cyber-greenDeep/90 border border-emerald-500/40 text-white font-bold text-base sm:text-lg tracking-tight">
                "{selectedTemplate.headlinePrompt}"
              </div>

              {/* Visual Concept Description */}
              <div className="p-3.5 rounded-lg bg-cyber-panel border border-cyber-border space-y-1 font-mono text-xs">
                <span className="text-cyber-gold font-bold block text-[10px]">CONCEPTO VISUAL:</span>
                <p className="text-cyber-paper/80">{selectedTemplate.visualConcept}</p>
              </div>

              {/* Call To Action Badge */}
              <div className="p-3 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono flex items-center justify-between">
                <span className="font-bold uppercase text-[10px]">Llamado a la Acción (CTA):</span>
                <span className="font-semibold">{selectedTemplate.callToAction}</span>
              </div>
            </div>

          </div>

          {/* Right: Caption Template & Copy Helper */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-2xl border border-cyber-border space-y-5">
            
            <div className="flex items-center justify-between border-b border-cyber-border pb-3">
              <div className="flex items-center gap-2 text-white font-bold font-mono text-sm">
                <MessageSquare className="w-4 h-4 text-cyber-gold" />
                <span>Plantilla de Caption & Hashtags</span>
              </div>

              <button
                onClick={handleCopyCaption}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-cyan text-cyber-dark font-bold font-mono text-xs hover:brightness-110 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Caption'}</span>
              </button>
            </div>

            {/* Caption Text Box */}
            <div className="p-4 rounded-xl bg-cyber-dark border border-cyber-border font-serif text-sm text-cyber-paper/90 leading-relaxed whitespace-pre-wrap">
              {selectedTemplate.captionTemplate}
            </div>

            <div className="p-4 rounded-xl bg-cyber-panel border border-cyber-border text-xs font-mono space-y-2">
              <span className="text-cyber-gold font-bold block text-[10px]">RECOMENDACIÓN AGRO-GEEK:</span>
              <p className="text-cyber-paperMuted">
                Publicar videos de ensamblaje de hardware en taller entre las 07:00 y las 09:00 AM, coincidiendo con la primera hora de campo de los agricultores maulinos.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
