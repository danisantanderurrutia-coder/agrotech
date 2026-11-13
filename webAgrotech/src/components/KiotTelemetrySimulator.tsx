import React, { useState } from 'react';
import { Cpu, Thermometer, Droplets, Radio, ShieldCheck, AlertTriangle, RefreshCw, Zap, Sliders, CheckCircle2 } from 'lucide-react';

export const KiotTelemetrySimulator: React.FC = () => {
  const [simTemp, setSimTemp] = useState<number>(1.2);
  const [simMoisture, setSimMoisture] = useState<number>(38);
  const [alarmThreshold, setAlarmThreshold] = useState<number>(2.0);
  const [loraLog, setLoraLog] = useState<string[]>([
    '[03:34:01] ESP32_BOOT: IP65 Node Maule_Valle01 initialized',
    '[03:34:05] LORA_TX: 915MHz Packet 482B [DS18B20: 1.2°C, Soil: 38%]',
    '[03:34:10] GW_ACK: RSSI -84dBm SNR +9.5dB'
  ]);

  const isFrostAlert = simTemp <= alarmThreshold;

  const triggerPing = () => {
    const time = new Date().toLocaleTimeString();
    const newEntry = `[${time}] LORA_TX: 915MHz Packet [DS18B20: ${simTemp}°C, Moisture: ${simMoisture}%] -> Gateway OK`;
    setLoraLog(prev => [newEntry, ...prev.slice(0, 4)]);
  };

  return (
    <section id="kiot-demo" className="py-12 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-sans font-bold">
            <Cpu className="w-3.5 h-3.5 text-emerald-700" />
            <span>Consola de Telemetría Agronómica • Estación Predial IP65</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2519]">
            Estación Telemétrica de Campo <span className="text-emerald-700">Anti-Heladas</span>
          </h2>

          <p className="text-slate-600 text-base font-serif">
            Estación telemétrica plug-and-play fabricada localmente en la Región del Maule. Prueba interactiva de lectura de sensores térmicos DS18B20 y humedad volumétrica de suelo vía transmisión LoRa de alta cobertura.
          </p>
        </div>

        {/* Main Grid: Hardware Image + Interactive Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Hardware Render Display */}
          <div className="lg:col-span-5 relative group">
            <div className="bg-[#0B2519] p-5 rounded-2xl border border-emerald-500/40 shadow-xl space-y-4 text-white">
              
              <div className="relative rounded-xl overflow-hidden border border-emerald-900 shadow-md">
                <img 
                  src="./kiot-hardware.png" 
                  alt="Estación Telemétrica de Campo IP65" 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 bg-[#071810]"
                />
                
                {/* Node Status Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0B2519]/90 border border-emerald-400/50 text-emerald-300 font-mono text-xs flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ESTACIÓN #04-MAULE</span>
                </div>
              </div>

              {/* Hardware Specs list */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-[#071810] border border-emerald-900">
                  <span className="text-emerald-300/70 text-[10px] block">GABINETE</span>
                  <span className="text-white font-bold">IP65 UV Proof</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#071810] border border-emerald-900">
                  <span className="text-emerald-300/70 text-[10px] block">CONECTIVIDAD</span>
                  <span className="text-emerald-400 font-bold">LoRa 915MHz / WiFi</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#071810] border border-emerald-900">
                  <span className="text-emerald-300/70 text-[10px] block">SENSOR TEMP</span>
                  <span className="text-amber-400 font-bold">DS18B20 (±0.5°C)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#071810] border border-emerald-900">
                  <span className="text-emerald-300/70 text-[10px] block">ENERGÍA</span>
                  <span className="text-emerald-300 font-bold">Panel Solar + LiFePO4</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Interactive Telemetry Console */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold font-sans">
                <Zap className="w-5 h-5 text-amber-600" />
                <span>Consola Telemétrica de Campo en Tiempo Real</span>
              </div>
              
              <button
                onClick={triggerPing}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-900 text-white font-sans font-bold text-xs hover:bg-emerald-800 transition-colors shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Transmitir LoRa</span>
              </button>
            </div>

            {/* Frost Alert Status Banner */}
            <div className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
              isFrostAlert 
                ? 'bg-rose-50 border-rose-400 text-rose-900 animate-pulse shadow-sm' 
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}>
              <div className="flex items-center gap-3">
                {isFrostAlert ? <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" /> : <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />}
                <div>
                  <h4 className="font-bold text-sm font-sans">
                    {isFrostAlert ? '¡ALERTA MÁXIMA DE HELADA EN CURSO!' : 'ESTADO TÉRMICO NORMAL'}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {isFrostAlert 
                      ? `Temperatura (${simTemp}°C) bajo el umbral de seguridad (${alarmThreshold}°C). Notificación enviada por WhatsApp/LoRa a administradores.` 
                      : `Sin riesgo inmediato de congelamiento en el microclima predial.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Sliders for Simulation */}
            <div className="space-y-5 pt-2">
              
              {/* Temperature Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-slate-700 font-medium flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-emerald-700" />
                    <span>Sensor DS18B20 Simulado:</span>
                  </span>
                  <span className={`font-bold text-sm ${simTemp <= alarmThreshold ? 'text-rose-600' : 'text-emerald-800'}`}>
                    {simTemp}°C
                  </span>
                </div>
                <input 
                  type="range" 
                  min="-3.0" 
                  max="12.0" 
                  step="0.1" 
                  value={simTemp} 
                  onChange={(e) => setSimTemp(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
                />
              </div>

              {/* Moisture Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-slate-700 font-medium flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-teal-700" />
                    <span>Humedad Volumétrica de Suelo:</span>
                  </span>
                  <span className="font-bold text-sm text-teal-800">{simMoisture}% VWC</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="90" 
                  step="1" 
                  value={simMoisture} 
                  onChange={(e) => setSimMoisture(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
                />
              </div>

              {/* Alarm Threshold Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-slate-700 font-medium flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-amber-600" />
                    <span>Umbral de Alerta de Helada:</span>
                  </span>
                  <span className="font-bold text-sm text-amber-700">{alarmThreshold}°C</span>
                </div>
                <input 
                  type="range" 
                  min="0.0" 
                  max="5.0" 
                  step="0.5" 
                  value={alarmThreshold} 
                  onChange={(e) => setAlarmThreshold(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

            </div>

            {/* Live LoRa Console Packet Feed */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-sans font-bold text-slate-700 block uppercase">TELEMETRÍA LORA 915MHZ EN TIEMPO REAL:</span>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] space-y-1 text-slate-300 max-h-32 overflow-y-auto">
                {loraLog.map((log, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-emerald-400">
                    <Radio className="w-3 h-3 shrink-0 text-emerald-400" />
                    <span className="truncate">{log}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
