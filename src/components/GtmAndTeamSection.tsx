import React from 'react';
import { TEAM_MEMBERS, GTM_PHASES } from '../data/mockData';
import { Globe, Users, TrendingUp, Calendar, CheckCircle2, Award, ShieldCheck } from 'lucide-react';

export const GtmAndTeamSection: React.FC = () => {
  return (
    <section id="gtm" className="py-16 bg-cyber-dark border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
        
        {/* SECTION 1: GO TO MARKET ROADMAP */}
        <div className="space-y-10">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-greenDeep border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Estrategia de Crecimiento • Go-To-Market en 3 Fases</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ruta de Monetización <span className="text-cyber-gold">(5 Meses)</span>
            </h2>

            <p className="text-cyber-paperMuted text-base font-serif">
              Diseño financiero sustentable. Cajas rápidas B2C en la Fase 1 para reinvertir en ensamble de hardware KioT y contratos B2B de exportación.
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GTM_PHASES.map((gtm) => (
              <div 
                key={gtm.phase}
                className="glass-panel p-6 rounded-2xl border border-cyber-border hover:border-cyber-cyan/40 transition-all space-y-4 relative group"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-cyber-dark text-cyber-cyan font-bold border border-cyber-cyan/30">
                    {gtm.phase} • {gtm.timeframe}
                  </span>
                  <span className="text-cyber-gold font-semibold text-[10px] uppercase">{gtm.status}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyber-cyan transition-colors">
                  {gtm.title}
                </h3>

                <p className="text-xs text-cyber-paperMuted font-mono">
                  {gtm.focus}
                </p>

                <div className="space-y-2 pt-2 border-t border-cyber-border/60 text-xs text-cyber-paper/90">
                  {gtm.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-cyber-border/60 text-xs font-mono text-cyber-gold">
                  <span className="text-[10px] text-cyber-paperMuted block uppercase">META CLAVE (KPI):</span>
                  <span className="font-bold">{gtm.kpi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: FOUNDING TEAM */}
        <div className="space-y-10 pt-6 border-t border-cyber-border/60">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-greenDeep border border-cyber-cyan/30 text-cyber-cyan text-xs font-mono">
              <Users className="w-3.5 h-3.5" />
              <span>Equipo Fundador • Sinergia Chile & Alemania</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Dos Socios, <span className="text-cyber-cyan">Visión Global</span>
            </h2>

            <p className="text-cyber-paperMuted text-base font-serif">
              Equilibrio entre ensamblaje y ventas directas con las botas en el barro en el Maule, y análisis de geofísica y modelos climáticos globales desde Alemania.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.name}
                className="glass-panel-green p-6 sm:p-8 rounded-2xl border border-cyber-cyan/30 space-y-6 shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs text-cyber-gold">
                      <span>{member.flag}</span>
                      <span>{member.location}</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-white">{member.name}</h3>
                    <p className="text-xs text-cyber-cyan font-mono font-semibold">{member.role}</p>
                  </div>

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl border shadow-lg ${member.avatarBg}`}>
                    {member.flag}
                  </div>
                </div>

                <p className="text-sm text-cyber-paper/90 font-serif leading-relaxed">
                  {member.bio}
                </p>

                {/* Focus Badge */}
                <div className="p-3 rounded-xl bg-cyber-dark/90 border border-cyber-border text-xs font-mono space-y-1">
                  <span className="text-cyber-gold font-bold block text-[10px] uppercase">FOCO OPERATIVO:</span>
                  <span className="text-white font-medium">{member.focus}</span>
                </div>

                {/* Skills tags */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-cyber-paperMuted block">COMPETENCIAS TÉCNICAS:</span>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-cyber-panel text-cyber-paper font-mono text-xs border border-cyber-border">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
