import React, { useState, useEffect } from 'react';
import { Presentation, ShieldAlert, Cpu, Sparkles, MapPin, ArrowRight, Activity, Thermometer, Radio, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenPitchDeck: () => void;
  onNavigateToProducts: () => void;
  onNavigateToAgroTwin?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPitchDeck, onNavigateToProducts, onNavigateToAgroTwin }) => {
  // Live IoT telemetry / biophysical simulation for hero badge
  const [currentTemp, setCurrentTemp] = useState(2.4);
  const [frostWarning, setFrostWarning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Small fluctuation around 1.5 - 3.5 °C
      const nextTemp = +(1.5 + Math.random() * 2.2).toFixed(1);
      setCurrentTemp(nextTemp);
      setFrostWarning(nextTemp < 2.0);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-tech-grid py-12 lg:py-20 border-b border-slate-200/80">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-700/20 text-emerald-900 text-xs font-sans font-semibold">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>Valle del Maule • Región del Maule, Chile</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-600/30 text-emerald-800 text-xs font-mono shadow-sm">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
            <span>Simulación Satelital Calibrada • Sentinel-2 & ERA5</span>
          </div>

          {/* Real-time frost alert indicator */}
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold border transition-all ${
            frostWarning 
              ? 'bg-rose-100 border-rose-400 text-rose-800 animate-pulse' 
              : 'bg-emerald-100 border-emerald-300 text-emerald-800'
          }`}>
            <Thermometer className="w-3.5 h-3.5" />
            <span>Microclima Maule: {currentTemp}°C</span>
            {frostWarning && <span className="font-bold text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded">ALERTA HELADA</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy with Profile Logo */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start gap-5">
              
              {/* Profile-sized Logo */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-emerald-600 shadow-md shrink-0 bg-[#071810] p-1 mt-1">
                <img src="./logo-peumo-quantum.jpg" alt="Logo AgroTech Chile" className="w-full h-full object-contain rounded-xl" />
              </div>

              <div className="space-y-3 flex-1">
                <div className="inline-flex items-center gap-2 text-amber-800 font-sans text-xs tracking-wider uppercase font-bold">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Ingeniería Agroclimática & Gemelos Digitales Geo-AI</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2519] tracking-tight leading-tight">
                  Inteligencia Terrícola y Gemelos Digitales:{' '}
                  <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-amber-600 bg-clip-text text-transparent">
                    resiliencia hídrica y microclima sin esperar hardware.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-800 font-medium font-serif leading-relaxed pt-1">
                  AgroTech Chile fusiona constelaciones satelitales Sentinel y Landsat con modelos biofísicos de microclima y suelos para predecir estrés hídrico, heladas y riesgo de incendio predial. Simulación geoespacial de alta resolución operativa desde el día uno, 100% lista para calibrarse con sensores IoT en terreno.
                </p>
              </div>

            </div>

            {/* Core Value Props Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="glass-panel p-4 rounded-xl border-l-4 border-l-emerald-600 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900 font-sans uppercase">1. Simulación Biofísica</h4>
                <p className="text-xs text-slate-600 mt-1">Balance de humedad en 3 capas de suelo mediante FAO-56 Penman-Monteith.</p>
              </div>

              <div className="glass-panel p-4 rounded-xl border-l-4 border-l-amber-500 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900 font-sans uppercase">2. Memoria Satelital</h4>
                <p className="text-xs text-slate-600 mt-1">Sentinel-2 & Landsat a 10m/px con 10 años de serie temporal de vigor foliar.</p>
              </div>

              <div className="glass-panel p-4 rounded-xl border-l-4 border-l-emerald-800 shadow-sm">
                <h4 className="text-xs font-bold text-slate-900 font-sans uppercase">3. Puente a Hardware IoT</h4>
                <p className="text-xs text-slate-600 mt-1">Nodos LoRaWAN 915MHz listos para enchufar y autocalibrar el gemelo digital.</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenPitchDeck}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-[#0B2519] font-bold text-sm shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                <Presentation className="w-5 h-5 text-[#0B2519]" />
                <span>Solicitar Simulación Predial (Demo B2B)</span>
              </button>

              <button
                onClick={onNavigateToAgroTwin || onNavigateToProducts}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white border border-emerald-700/30 text-emerald-900 font-bold text-sm shadow-sm hover:bg-emerald-50 active:scale-95 transition-all"
              >
                <Cpu className="w-5 h-5 text-emerald-700" />
                <span>Explorar Gemelo AgroTwin 3D</span>
                <ArrowRight className="w-4 h-4 ml-1 text-emerald-700" />
              </button>
            </div>

            {/* Founding Team Banner Tag */}
            <div className="pt-4 flex items-center gap-4 text-xs text-slate-600 border-t border-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span className="font-bold text-slate-900">Equipo Chile-Alemania:</span>
              </div>
              <span>Ingeniería Mecatrónica en Talca 🇨🇱 + Geofísica Climática en Friburgo 🇩🇪</span>
            </div>

          </div>

          {/* Hero Visual Display Widget */}
          <div className="lg:col-span-5 relative">
            
            <div className="glass-panel-green p-5 rounded-2xl border border-emerald-500/40 shadow-xl space-y-4">
              
              {/* Image Container */}
              <div className="relative rounded-xl overflow-hidden border border-emerald-900/60 group shadow-md">
                <img 
                  src="./logo-peumo-quantum.jpg" 
                  alt="Gemelo Digital AgroTech Chile" 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 bg-[#071810]"
                />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono bg-[#0B2519]/90 backdrop-blur-md p-2.5 rounded-lg border border-emerald-500/30 text-white">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span>Gemelo Digital Operativo</span>
                  </div>
                  <span className="text-amber-400 font-bold">Modo Simulación</span>
                </div>
              </div>

              {/* Quick Telemetry Widget */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-[#071810] p-3 rounded-xl border border-emerald-900 space-y-1">
                  <span className="text-emerald-300/80 block text-[10px]">BALANCE HÍDRICO RADICULAR</span>
                  <span className="text-emerald-400 font-bold text-sm">74.2% Capacidad</span>
                  <p className="text-[10px] text-emerald-400">Modelo FAO-56 • 20-60cm</p>
                </div>

                <div className="bg-[#071810] p-3 rounded-xl border border-emerald-900 space-y-1">
                  <span className="text-emerald-300/80 block text-[10px]">RIESGO DE HELADA LOCAL</span>
                  <span className="text-amber-400 font-bold text-sm">Riesgo Bajo</span>
                  <p className="text-[10px] text-emerald-200/70">Drenaje Katabático: &gt; 2.0°C</p>
                </div>
              </div>

              {/* Value Badge */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs">
                <div className="flex items-center gap-2 text-emerald-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Gemelo Digital Predial B2B (Sin Esperar Sensores)</span>
                </div>
                <span className="text-amber-400 font-mono font-bold">Inmediato</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
