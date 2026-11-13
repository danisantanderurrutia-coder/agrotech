import React, { useState } from 'react';
import { COURSES_DATA } from '../data/mockData';
import { Course } from '../types';
import { GraduationCap, Calendar, Clock, MapPin, Check, ArrowLeft, Sparkles, BookOpen, UserCheck } from 'lucide-react';

interface CoursesPageProps {
  onNavigate: (viewId: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolledSuccess, setEnrolledSuccess] = useState<boolean>(false);

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setEnrolledSuccess(true);
    setTimeout(() => setEnrolledSuccess(false), 5000);
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
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Academia & Capacitación Agrícola</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              Cursos, Webinars & <span className="text-amber-400">Talleres en Terreno</span>
            </h1>

            <p className="text-base text-emerald-100/80 font-serif max-w-3xl">
              Formación técnica accesible y rigurosa en sensórica IoT de campo, teledetección satelital con Sentinel-2 y diseño de microclimas para pequeños y medianos agricultores.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        
        {enrolledSuccess && selectedCourse && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-sans text-xs shadow-sm animate-fadeIn flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Check className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block text-sm">¡Inscripción confirmada para "{selectedCourse.title}"!</span>
                <span>Te hemos enviado los accesos e instrucciones directas al correo.</span>
              </div>
            </div>
            <span className="font-bold text-amber-800 text-base">{selectedCourse.price}</span>
          </div>
        )}

        {/* DESTACADO ESPECIAL: TALLERES DIGITALES AGROCLIMÁTICOS */}
        <div className="bg-gradient-to-br from-[#0B2519] via-emerald-950 to-[#071A11] p-6 sm:p-8 rounded-3xl border border-emerald-700/40 shadow-xl text-white space-y-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Academia Digital Urrutia Edulab</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Talleres Digitales <span className="text-amber-400 font-serif italic">Agroclimáticos</span>
              </h2>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-amber-500 text-[#0B2519] font-bold text-xs shadow-sm">
              Acceso Inmediato 100% Online
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <p className="text-sm sm:text-base text-emerald-100/90 font-serif leading-relaxed">
                Programas intensivos de formación en línea sobre precisión agrícola maulina: procesamiento satelital con Google Earth Engine, programación de microcontroladores ESP32 para riego inteligente y elaboración de bioinsumos nativos.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs text-emerald-200">
                <div className="flex items-center gap-2 bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-700/50">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Plataforma HD</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-700/50">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Código ESP32 & Datasets</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-900/60 p-2.5 rounded-xl border border-emerald-700/50">
                  <Check className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Certificación Técnica</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 p-4 rounded-2xl border border-emerald-500/30 space-y-3 text-xs">
              <div className="flex items-center justify-between text-amber-300 font-mono">
                <span>MODALIDAD</span>
                <span className="font-bold">Streaming + Tutorías</span>
              </div>
              <div className="text-slate-200 font-sans">
                <strong>Suscripción / Gratuito:</strong> Incluido para la comunidad de agricultores de Maule
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COURSES_DATA.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className="space-y-4">
                {/* Cover Image */}
                <div className="h-52 w-full relative overflow-hidden bg-slate-100">
                  <img 
                    src={course.coverImage} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B2519]/90 backdrop-blur-md text-amber-400 text-[11px] font-sans font-bold border border-emerald-500/30">
                    {course.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-slate-900/80 text-white font-sans text-[10px] backdrop-blur-sm">
                    {course.duration}
                  </div>
                </div>

                {/* Course Metadata */}
                <div className="p-6 pt-1 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-sans font-bold">
                    <span className="text-emerald-800">{course.type}</span>
                    <span>{course.dateOrAccess}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-emerald-800 transition-colors leading-snug">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-amber-800 font-sans font-bold">
                    <UserCheck className="w-3.5 h-3.5 text-amber-700" />
                    <span>Relator: {course.instructor}</span>
                  </div>

                  <p className="text-xs text-slate-600 font-serif leading-relaxed">
                    {course.description}
                  </p>

                  {/* Syllabus checklist */}
                  <div className="pt-2 space-y-1.5">
                    <span className="text-[10px] font-sans font-bold text-slate-500 uppercase block">CONTENIDO DEL CURSO:</span>
                    <ul className="space-y-1 text-xs text-slate-700 font-sans">
                      {course.syllabus.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Enrollment footer */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[10px] font-sans text-slate-500 block uppercase font-bold">INVERSIÓN</span>
                  <span className="font-extrabold text-emerald-800 text-sm">{course.price}</span>
                </div>

                <button
                  onClick={() => handleEnroll(course)}
                  className="px-4 py-2.5 rounded-xl bg-[#0B2519] text-white font-sans text-xs font-bold hover:bg-emerald-900 active:scale-95 transition-all shadow-sm"
                >
                  Inscribirme
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
