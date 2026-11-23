/**
 * Sistema de Enrutamiento Semántico y Deep-Linking de AgroTech Chile
 * Soporta navegación fluida mediante Slugs Canónicos tanto en:
 *  - Hash Routing SPA (#/boveda/productos, #/agritwin) -> 100% inmune a 404s en GitHub Pages
 *  - Query Params (?view=vault&tab=products) -> Compatibilidad hacia atrás
 *  - Sincronización con el historial del navegador (Back/Forward y Share Links)
 */

export type VaultTab = 
  | 'products'
  | 'predios'
  | 'sensors'
  | 'graphics'
  | 'scripts'
  | 'vault'
  | 'permaculture';

export interface RouteState {
  view: string;
  vaultTab?: VaultTab;
  subTab?: string;
  noteId?: string;
}

// Mapeo canónico de las 7 pestañas de la Bóveda a sus Slugs
export const VAULT_TAB_TO_SLUG: Record<VaultTab, string> = {
  products: 'productos',
  predios: 'predios',
  sensors: 'telemetria',
  graphics: 'graficos',
  scripts: 'scripts',
  vault: 'vault',
  permaculture: 'permacultura'
};

// Mapeo inverso de Slugs y alias hacia la pestaña interna de la Bóveda
export const SLUG_TO_VAULT_TAB: Record<string, VaultTab> = {
  // Pestaña 1
  'productos': 'products',
  'productos-arquitectura': 'products',
  'products': 'products',
  '1': 'products',

  // Pestaña 2
  'predios': 'predios',
  'datos-predios': 'predios',
  'raw-data': 'predios',
  '2': 'predios',

  // Pestaña 3
  'telemetria': 'sensors',
  'sensores': 'sensors',
  'sensores-telemetria': 'sensors',
  'sensors': 'sensors',
  '3': 'sensors',

  // Pestaña 4
  'graficos': 'graphics',
  'activos-graficos': 'graphics',
  'logos': 'graphics',
  'graphics': 'graphics',
  'assets': 'graphics',
  '4': 'graphics',

  // Pestaña 5
  'scripts': 'scripts',
  'notebooks': 'scripts',
  'notebooks-scripts': 'scripts',
  '5': 'scripts',

  // Pestaña 6
  'vault': 'vault',
  'boveda': 'vault',
  'tratado': 'vault',
  'especificaciones': 'vault',
  'documentos': 'vault',
  'atlas': 'vault',
  'whitepapers': 'vault',
  '6': 'vault',

  // Pestaña 7
  'permacultura': 'permaculture',
  'permacultura-regenerativa': 'permaculture',
  'permaculture': 'permaculture',
  '7': 'permaculture'
};

// Mapeo de vistas generales del sistema
export const SLUG_TO_VIEW: Record<string, { view: string; vaultTab?: VaultTab; subTab?: string }> = {
  // Inicio
  '': { view: 'landing' },
  'inicio': { view: 'landing' },
  'landing': { view: 'landing' },
  'home': { view: 'landing' },

  // Bóveda General
  'boveda': { view: 'vault', vaultTab: 'vault' },
  'vault': { view: 'vault', vaultTab: 'vault' },
  'docs': { view: 'vault', vaultTab: 'vault' },

  // Productos & Módulos
  'agritwin': { view: 'agritwin' },
  'agritwin-showcase': { view: 'agritwin' },
  'productos/x-agritwin': { view: 'agritwin' },

  'roadmap': { view: 'roadmap' },
  'roadmap-productos': { view: 'roadmap' },
  'productos/roadmap': { view: 'roadmap' },

  'hardware': { view: 'hardware' },
  'kiot': { view: 'hardware' },
  'nodos': { view: 'hardware' },

  'rewild': { view: 'rewild-hub' },
  'rewild-hub': { view: 'rewild-hub' },
  'productos/x-rewild-mapper': { view: 'rewild-hub' },

  'satelital': { view: 'satellites' },
  'satellites': { view: 'satellites' },
  'pasaporte-verde': { view: 'satellites', subTab: 'pasaporte' },
  'productos/x-terra-radar': { view: 'satellites' },

  'apps': { view: 'apps' },
  'hub': { view: 'apps' },
  'regional': { view: 'regional' },
  'territorial': { view: 'regional' },

  'operador': { view: 'cuaderno' },
  'cuaderno': { view: 'cuaderno' },

  'tienda': { view: 'store' },
  'store': { view: 'store' },
  'equipamiento': { view: 'store' },

  'comunidad': { view: 'community' },
  'red': { view: 'community' },
  'se-parte': { view: 'join' },
  'join': { view: 'join' },

  'academia': { view: 'courses' },
  'cursos': { view: 'courses' },
  'courses': { view: 'courses' },

  'blog': { view: 'blog' },
  'publicaciones': { view: 'blog' },

  'somos': { view: 'somos' },
  'nosotros': { view: 'somos' },
  'manifiesto': { view: 'somos' },

  'gobernanza': { view: 'internal' },
  'socios': { view: 'internal' },
  'partner': { view: 'internal' },

  'marca': { view: 'brand' },
  'identidad': { view: 'brand' },
  'brand': { view: 'brand' },

  'x-living-lab': { view: 'edulab' },
  'edulab': { view: 'edulab' }
};

/**
 * Parsea la URL actual (examinando hash primero, y query params como fallback)
 */
export function parseRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { view: 'landing' };
  }

  // 1. Prioridad: Hash Routing (#/boveda/telemetria o #/agritwin)
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (hash) {
    // Caso especial: #/boveda/...
    if (hash.startsWith('boveda/') || hash.startsWith('vault/')) {
      const parts = hash.split('/');
      const tabSlug = (parts[1] || '').split('?')[0].toLowerCase();
      const vaultTab = SLUG_TO_VAULT_TAB[tabSlug] || 'vault';
      return { view: 'vault', vaultTab };
    }

    // Comprobar coincidencia directa en tabla de slugs
    const cleanHash = hash.split('?')[0].toLowerCase();
    if (SLUG_TO_VIEW[cleanHash]) {
      return SLUG_TO_VIEW[cleanHash];
    }

    // Comprobar si es un slug directo de bóveda (ej: #telemetria)
    if (SLUG_TO_VAULT_TAB[cleanHash]) {
      return { view: 'vault', vaultTab: SLUG_TO_VAULT_TAB[cleanHash] };
    }
  }

  // 2. Fallback: Search Query Params (?view=vault&tab=products)
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const viewParam = searchParams.get('view')?.toLowerCase();
    const tabParam = searchParams.get('tab')?.toLowerCase();

    if (viewParam) {
      if (viewParam === 'vault' || viewParam === 'boveda' || viewParam === 'docs') {
        const vaultTab = tabParam ? (SLUG_TO_VAULT_TAB[tabParam] || 'vault') : 'vault';
        return { view: 'vault', vaultTab };
      }
      if (SLUG_TO_VIEW[viewParam]) {
        return SLUG_TO_VIEW[viewParam];
      }
      return { view: viewParam };
    }

    if (tabParam && SLUG_TO_VAULT_TAB[tabParam]) {
      return { view: 'vault', vaultTab: SLUG_TO_VAULT_TAB[tabParam] };
    }
  } catch {
    // Ignore URL parse error
  }

  // 3. Chequeo por hostname o path directo para AgriTwin standalone
  const pathname = window.location.pathname.toLowerCase();
  const hostname = window.location.hostname.toLowerCase();
  if (pathname.includes('agritwin') || hostname.includes('agritwin')) {
    return { view: 'agritwin' };
  }

  return { view: 'landing' };
}

/**
 * Obtiene el slug de Hash canónico para una vista y pestaña de Bóveda
 */
export function getHashForRoute(view: string, vaultTab?: VaultTab): string {
  if (view === 'vault' || view === 'docs' || view === 'boveda') {
    if (vaultTab && VAULT_TAB_TO_SLUG[vaultTab]) {
      return `#/boveda/${VAULT_TAB_TO_SLUG[vaultTab]}`;
    }
    return `#/boveda`;
  }

  // Buscar slug canónico en el mapa inverso
  for (const [slug, item] of Object.entries(SLUG_TO_VIEW)) {
    if (item.view === view && slug && !slug.includes('/')) {
      return `#/${slug}`;
    }
  }

  return `#/${view}`;
}

/**
 * Actualiza el hash del navegador de manera silenciosa sin recargar la página
 */
export function syncHashUrl(view: string, vaultTab?: VaultTab) {
  if (typeof window === 'undefined') return;
  const newHash = getHashForRoute(view, vaultTab);
  if (window.location.hash !== newHash) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', newHash);
    } else {
      window.location.hash = newHash;
    }
  }
}
