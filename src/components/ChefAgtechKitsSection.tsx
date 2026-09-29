import React, { useState } from 'react';
import { CHEF_KITS } from '../data/mockData';
import type { ChefKit } from '../types';
import { Cpu, MessageSquare, CheckCircle, ShieldAlert, Sparkles, DollarSign, Send, Zap, Eye, Volume2 } from 'lucide-react';

export const ChefAgtechKitsSection: React.FC = () => {
  const [selectedKit, setSelectedKit] = useState<ChefKit>(CHEF_KITS[1]); // Default to Anti-Heladas
  const [simulatedMsg, setSimulatedMsg] = useState<string>(selectedKit.whatsappPreview);

  const handleSelectKit = (kit: ChefKit) => {
    setSelectedKit(kit);
    setSimulatedMsg(kit.whatsappPreview);
  };

  return (
    <section id="chef-kits" className="py-12 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-sans font-bold">
            <Cpu className="w-3.5 h-3.5 text-emerald-700" />
            <span>Kits Telemétricos Modulares • Hardware Local + Suscripción WhatsApp</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2519]">
            Kits Telemétricos Modulares & <span className="text-amber-600">Bot de Alerta WhatsApp</span>
          </h2>

          <p className="text-slate-600 text-base font-serif">
            Hardware mecatrónico de bajo costo ensamblado en Maule con suscripción mensual de alertas térmicas y diagnósticos agronómicos por IA directo a tu celular.
          </p>
        </div>

        {/* Kits Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHEF_KITS.map((kit) => (
            <div
              key={kit.id}
              onClick={() => handleSelectKit(kit)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer group hover:-translate-y-1 flex flex-col justify-between bg-white ${
                selectedKit.id === kit.id
                  ? 'border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-emerald-500/50 shadow-sm'
              }`}
            >
              <div>
                {kit.imageUrl && (
                  <div className="h-40 w-full mb-3 rounded-xl overflow-hidden border border-slate-200 relative">
                    <img src={kit.imageUrl} alt={kit.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-amber-50/95 text-amber-900 border border-amber-300 font-bold text-[10px] shadow-sm backdrop-blur-sm">
                      {kit.badge}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between font-sans text-xs mb-2">
                  <span className="text-emerald-800 font-bold">{kit.subPriceClp}</span>
                  <span className="text-slate-500 text-[11px] font-mono">{kit.hwPriceClp}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-800 transition-colors">
                  {kit.title}
                </h3>

                <p className="text-xs text-slate-600 font-serif mt-2 line-clamp-2 leading-relaxed">
                  {kit.useCase}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 font-sans text-xs flex items-center justify-between text-emerald-800 font-bold">
                <span>Ver Sensores & Demo</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Kit Detail & WhatsApp Bot Simulator */}
        {selectedKit && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Hardware & Deliverables Specs */}
            <div className="lg:col-span-7 glass-panel-green p-6 sm:p-8 rounded-2xl border border-cyber-cyan/30 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyber-border pb-4">
                <div>
                  <span className="text-cyber-gold font-mono text-xs font-bold uppercase block">
                    ESPECIFICACIONES TÉCNICAS • {selectedKit.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">{selectedKit.title}</h3>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className="text-cyber-paperMuted block">Suscripción Data:</span>
                  <span className="text-cyber-cyan font-bold text-base">{selectedKit.subPriceClp}</span>
                </div>
              </div>

              {/* Sensors & Actuators Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-cyber-dark/80 border border-cyber-border space-y-2 font-mono text-xs">
                  <span className="text-cyber-cyan font-bold flex items-center gap-1.5 uppercase text-[10px]">
                    <Zap className="w-3.5 h-3.5" /> Módulo de Sensórica
                  </span>
                  <ul className="space-y-1.5 text-cyber-paper/90">
                    {selectedKit.sensors.map((s: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-cyber-dark/80 border border-cyber-border space-y-2 font-mono text-xs">
                  <span className="text-cyber-gold font-bold flex items-center gap-1.5 uppercase text-[10px]">
                    <Zap className="w-3.5 h-3.5" /> Módulo de Actuadores
                  </span>
                  <ul className="space-y-1.5 text-cyber-paper/90">
                    {selectedKit.actuators.map((a: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-gold shrink-0" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Deliverables checklist */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-cyber-paperMuted block uppercase">ENTREGABLES AL AGRICULTOR:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedKit.deliverables.map((d: string, idx: number) => (
                    <div key={idx} className="p-3 rounded-lg bg-cyber-dark border border-cyber-border text-xs text-cyber-paper/90 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Simulated WhatsApp Bot Mobile Interface */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-cyber-border space-y-4">
              
              <div className="flex items-center justify-between border-b border-cyber-border pb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-white">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">Simulador Bot WhatsApp Business</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-mono">
                  Online 24/7
                </span>
              </div>

              {/* WhatsApp Phone Screen Mockup */}
              <div className="rounded-xl bg-[#0B141A] border border-cyber-border p-4 space-y-3 font-sans text-xs shadow-2xl relative">
                
                {/* Header chat bar */}
                <div className="flex items-center gap-2.5 pb-2.5 border-b border-white/10">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-xs">
                    AT
                  </div>
                  <div>
                    <span className="text-white font-bold block text-xs">AgroTech Chile Bot</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Maule Field AI Agent</span>
                  </div>
                </div>

                {/* Received Message Bubble */}
                <div className="p-3 rounded-xl bg-[#202C33] text-white max-w-[88%] space-y-1 rounded-tl-none border border-white/5 font-mono text-[11px] leading-relaxed shadow">
                  <p>{simulatedMsg}</p>
                  <span className="text-[9px] text-gray-400 block text-right">03:34 AM ✓✓</span>
                </div>

                {/* Simulated Quick Action buttons */}
                <div className="pt-2 flex flex-col gap-1.5 font-mono text-[11px]">
                  <button 
                    onClick={() => setSimulatedMsg("📊 Estado Actual Suelo: 34% VWC. Temperatura DS18B20: 3.2°C. Batería Solar: 98% (OK)")}
                    className="p-2 rounded-lg bg-[#111B21] border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/30 transition-colors text-left"
                  >
                    👉 Pedir Reporte de Suelo en Vivo
                  </button>
                  <button 
                    onClick={() => setSimulatedMsg("⚙️ Actuador Válvula: Apertura manual confirmada por 30 minutos.")}
                    className="p-2 rounded-lg bg-[#111B21] border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors text-left"
                  >
                    👉 Activar Electroválvula de Riego
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
