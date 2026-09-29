import React, { useState } from 'react';
import { MerchandiseSection } from './MerchandiseSection';
import { UrrutiaEdulabSection } from './UrrutiaEdulabSection';
import { BOOKS_DATA } from '../data/mockData';
import { BookItem } from '../types';
import { ShoppingBag, BookOpen, Download, ArrowLeft, Check, Sparkles, Filter, Tag, Gamepad2 } from 'lucide-react';

interface StorePageProps {
  onNavigate: (viewId: string) => void;
}

export const StorePage: React.FC<StorePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'merch' | 'books' | 'games'>('merch');
  const [selectedBookCategory, setSelectedBookCategory] = useState<string>('all');
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [boughtSuccess, setBoughtSuccess] = useState<boolean>(false);

  const filteredBooks = selectedBookCategory === 'all'
    ? BOOKS_DATA
    : selectedBookCategory === 'own'
    ? BOOKS_DATA.filter(b => b.isOwnWork)
    : BOOKS_DATA.filter(b => !b.isOwnWork);

  const handleBuyBook = (book: BookItem) => {
    setSelectedBook(book);
    setBoughtSuccess(true);
    setTimeout(() => setBoughtSuccess(false), 4000);
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-amber-500/40 text-amber-300 text-xs font-sans font-bold">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>Tienda Oficial Urrutia AgroTech</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
              Tienda: <span className="text-amber-400">Merchandising, Libros & Juegos</span>
            </h1>

            <p className="text-base text-emerald-100/80 font-serif max-w-3xl">
              Colección exclusiva "Code Meets Roots", literatura mecatrónica de terreno, guías de campo y juegos didácticos como "Raíces y Chips".
            </p>
          </div>

          {/* Main Tabs Selector */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <button
              onClick={() => setActiveTab('merch')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                activeTab === 'merch'
                  ? 'bg-amber-500 text-[#0B2519] shadow-md'
                  : 'bg-emerald-950/80 border border-emerald-800 text-emerald-200 hover:bg-emerald-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Merchandising Oficial</span>
            </button>

            <button
              onClick={() => setActiveTab('books')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                activeTab === 'books'
                  ? 'bg-amber-500 text-[#0B2519] shadow-md'
                  : 'bg-emerald-950/80 border border-emerald-800 text-emerald-200 hover:bg-emerald-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Libros & Manuales Técnicos</span>
            </button>

            <button
              onClick={() => setActiveTab('games')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-bold transition-all ${
                activeTab === 'games'
                  ? 'bg-amber-500 text-[#0B2519] shadow-md'
                  : 'bg-emerald-950/80 border border-emerald-800 text-emerald-200 hover:bg-emerald-900'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Juegos & Edulab ("Raíces y Chips")</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* TAB 1: MERCHANDISING */}
        {activeTab === 'merch' && (
          <MerchandiseSection />
        )}

        {/* TAB 2: LIBROS Y MANUALES */}
        {activeTab === 'books' && (
          <div className="space-y-10">
            
            {/* Books Header & Filter */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Publicaciones & Editorial</span>
                </div>
                <h2 className="text-2xl font-extrabold text-[#0B2519]">Biblioteca de Campo Urrutia</h2>
                <p className="text-slate-600 text-sm font-serif">
                  Manuales paso a paso de mecatrónica rural, guías de biodiversidad del Maule y obras de autores aliados.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 font-sans text-xs bg-slate-50 p-1.5 rounded-xl border border-slate-200 shrink-0">
                <button
                  onClick={() => setSelectedBookCategory('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedBookCategory === 'all' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Todos ({BOOKS_DATA.length})
                </button>
                <button
                  onClick={() => setSelectedBookCategory('own')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedBookCategory === 'own' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Publicaciones Urrutia ({BOOKS_DATA.filter(b => b.isOwnWork).length})
                </button>
                <button
                  onClick={() => setSelectedBookCategory('allied')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    selectedBookCategory === 'allied' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Autores Aliados ({BOOKS_DATA.filter(b => !b.isOwnWork).length})
                </button>
              </div>
            </div>

            {/* Notification alert */}
            {boughtSuccess && selectedBook && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-sans text-xs flex items-center justify-between shadow-sm animate-fadeIn">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>¡Solicitud enviada para <strong>"{selectedBook.title}"</strong>! Te contactaremos al correo para la entrega del libro/manual.</span>
                </div>
                <span className="font-bold text-amber-700">{selectedBook.price}</span>
              </div>
            )}

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    {/* Cover image */}
                    <div className="h-52 w-full rounded-xl overflow-hidden border border-slate-200 relative group-hover:scale-102 transition-transform duration-500">
                      <img 
                        src={book.coverImage} 
                        alt={book.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-amber-500/90 text-[#0B2519] font-bold text-[10px] shadow-sm backdrop-blur-sm">
                        {book.badge}
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/80 text-white font-mono text-[9px] backdrop-blur-sm">
                        {book.pages} págs.
                      </div>
                    </div>

                    {/* Book Metadata */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 font-sans font-bold">
                        <span>{book.publisher}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">{book.format}</span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-800 transition-colors leading-tight">
                        {book.title}
                      </h3>

                      <p className="text-xs text-amber-800 font-sans font-bold">
                        Por: {book.author}
                      </p>

                      <p className="text-xs text-slate-600 font-serif leading-relaxed line-clamp-3">
                        {book.description}
                      </p>
                    </div>
                  </div>

                  {/* Buy / Download Button */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-emerald-800 text-sm">{book.price}</span>
                    <button
                      onClick={() => handleBuyBook(book)}
                      className="px-3.5 py-2 rounded-xl bg-[#0B2519] text-white font-sans text-xs font-bold hover:bg-emerald-900 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-400" />
                      <span>Obtener</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: JUEGOS Y EDULAB */}
        {activeTab === 'games' && (
          <UrrutiaEdulabSection />
        )}

      </div>

    </div>
  );
};
