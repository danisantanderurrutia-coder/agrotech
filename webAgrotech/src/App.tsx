import React, { useState, useEffect } from 'react';
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
import { AgriTwinShowcasePage } from './components/AgriTwinShowcasePage';
import { EdulabPage } from './components/EdulabPage';
import { InteractiveDocsHub } from './components/InteractiveDocsHub';
import { CuadernoOperadorHub } from './components/CuadernoOperadorHub';
import { BrandIdentitySection } from './components/BrandIdentitySection';
import { RoadmapProductosPage } from './components/RoadmapProductosPage';
import { Footer } from './components/Footer';
import { PitchDeckModal } from './components/PitchDeckModal';
import { parseRoute, syncHashUrl, VaultTab } from './utils/router';

export function App() {
  const initialRoute = parseRoute();
  const [currentView, setCurrentView] = useState<string>(initialRoute.view);
  const [vaultTab, setVaultTab] = useState<VaultTab>(initialRoute.vaultTab || 'vault');
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);

  // Escuchar cambios de hash o navegación en historial (Back / Forward del navegador)
  useEffect(() => {
    const handleLocationChange = () => {
      const parsed = parseRoute();
      setCurrentView(parsed.view);
      if (parsed.vaultTab) {
        setVaultTab(parsed.vaultTab);
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleNavigate = (viewId: string, subTab?: string) => {
    if (viewId === 'vault' || viewId === 'docs' || viewId === 'boveda') {
      const targetTab = (subTab as VaultTab) || 'vault';
      setVaultTab(targetTab);
      setCurrentView('vault');
      syncHashUrl('vault', targetTab);
    } else {
      setCurrentView(viewId);
      syncHashUrl(viewId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAgriTwin = currentView === 'agritwin' || currentView === 'agritwin-showcase';

  return (
    <div className={`min-h-screen flex flex-col font-sans ${isAgriTwin ? 'bg-[#07111B] text-slate-100 selection:bg-orange-500 selection:text-white' : 'bg-agri-bg text-agri-text selection:bg-emerald-600 selection:text-white'}`}>
      
      {/* Sticky Header Navigation (Solo fuera de AgriTwin, que cuenta con su propia consola ejecutiva) */}
      {!isAgriTwin && (
        <Navbar 
          currentView={currentView}
          onNavigate={handleNavigate}
          onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
        />
      )}

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

        {(currentView === 'agritwin' || currentView === 'agritwin-showcase') && (
          <AgriTwinShowcasePage 
            onNavigate={handleNavigate}
          />
        )}

        {(currentView === 'roadmap' || currentView === 'roadmap-productos') && (
          <RoadmapProductosPage 
            onNavigate={handleNavigate}
          />
        )}

        {(currentView === 'apps' || currentView === 'hub') && (
          <EcosystemAppsHub 
            initialApp={currentView === 'hub' ? 'overview' : 'agritwin'}
            onNavigate={handleNavigate}
          />
        )}

        {(currentView === 'regional' || currentView === 'territorial') && (
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

        {currentView === 'permaculture' && (
          <EcosystemAppsHub 
            initialApp="permaculture"
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'cuaderno' && (
          <CuadernoOperadorHub 
            onNavigate={handleNavigate}
          />
        )}

        {(currentView === 'docs' || currentView === 'vault') && (
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 animate-fadeIn">
            <InteractiveDocsHub 
              initialTab={vaultTab}
              onTabChange={(tab) => {
                setVaultTab(tab);
                syncHashUrl('vault', tab);
              }}
              onNavigate={handleNavigate}
            />
          </div>
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

        {(currentView === 'internal' || currentView === 'social' || currentView === 'admin' || currentView === 'datawheel' || currentView === 'roadmap' || currentView === 'agroalerta') && (
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
          <EdulabPage 
            onNavigate={handleNavigate}
          />
        )}

        {(currentView === 'brand' || currentView === 'naming') && (
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 animate-fadeIn">
            <BrandIdentitySection initialTab={currentView === 'naming' ? 'naming' : 'visual'} />
          </div>
        )}
      </main>

      {/* Footer (Solo fuera de AgriTwin, que cuenta con su propio pie institucional) */}
      {!isAgriTwin && (
        <Footer 
          onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
          onNavigate={handleNavigate}
        />
      )}

      {/* Fullscreen Interactive Pitch Deck Modal */}
      <PitchDeckModal 
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
      />

    </div>
  );
}

export default App;

