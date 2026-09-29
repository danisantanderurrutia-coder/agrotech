import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { HardwarePage } from './components/HardwarePage';
import { SatellitesPage } from './components/SatellitesPage';
import { StorePage } from './components/StorePage';
import { CommunityPage } from './components/CommunityPage';
import { CoursesPage } from './components/CoursesPage';
import { BlogPage } from './components/BlogPage';
import { SomosPage } from './components/SomosPage';
import { InternalPartnerPage } from './components/InternalPartnerPage';
import { EcosystemAppsHub } from './components/EcosystemAppsHub';
import { BrandIdentitySection } from './components/BrandIdentitySection';
import { Footer } from './components/Footer';
import { PitchDeckModal } from './components/PitchDeckModal';

export function App() {
  const [currentView, setCurrentView] = useState<string>(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const v = p.get('view') || 'landing';
      return v === 'docs' ? 'apps' : v;
    } catch {
      return 'landing';
    }
  });
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);

  const handleNavigate = (viewId: string) => {
    setCurrentView(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-agri-bg text-agri-text flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Navbar 
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage 
            onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'hardware' && (
          <HardwarePage 
            onNavigate={handleNavigate}
          />
        )}

        {(currentView === 'apps' || currentView === 'agritwin') && (
          <EcosystemAppsHub 
            initialApp="agritwin"
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'regional' && (
          <EcosystemAppsHub 
            initialApp="regional"
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'rewild-hub' && (
          <EcosystemAppsHub 
            initialApp="rewild"
            onNavigate={handleNavigate}
          />
        )}

        {(currentView === 'satellites' || currentView === 'satellites-visor') && (
          <SatellitesPage 
            onNavigate={handleNavigate}
            initialSubTab="visor"
          />
        )}

        {currentView === 'satellites-rewild' && (
          <SatellitesPage 
            onNavigate={handleNavigate}
            initialSubTab="rewild"
          />
        )}

        {currentView === 'satellites-pasaporte' && (
          <SatellitesPage 
            onNavigate={handleNavigate}
            initialSubTab="pasaporte"
          />
        )}

        {currentView === 'store' && (
          <StorePage 
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'community' && (
          <CommunityPage 
            initialTab="activities"
            onNavigate={handleNavigate}
          />
        )}

        {(currentView === 'join' || currentView === 'community-join') && (
          <CommunityPage 
            initialTab="join"
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'courses' && (
          <CoursesPage 
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'blog' && (
          <BlogPage 
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'somos' && (
          <SomosPage />
        )}

        {(currentView === 'internal' || currentView === 'social') && (
          <InternalPartnerPage 
            onNavigate={handleNavigate}
            onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
          />
        )}

        {currentView === 'merch' && (
          <StorePage 
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'edulab' && (
          <CommunityPage 
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'brand' && (
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 animate-fadeIn">
            <BrandIdentitySection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
      />

      {/* Fullscreen Interactive Pitch Deck Modal */}
      <PitchDeckModal 
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
      />

    </div>
  );
}

export default App;

