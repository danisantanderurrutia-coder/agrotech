/**
 * Utilidades para resolución y tolerancia de fallos de activos estáticos en AgroTech Chile.
 * Soporta de manera transparente:
 *  - Despliegue en GitHub Pages (danisantanderurrutia-coder.github.io/agrotech/)
 *  - Entornos locales de desarrollo (Vite dev server, localhost:7771, preview)
 *  - Rutas relativas o absolutas, con o sin trailing slash
 */

export function resolveAsset(path: string | undefined | null): string {
  if (!path) return '';
  
  // Si ya es una URL absoluta o data URI, retornarla tal cual
  if (
    path.startsWith('http://') || 
    path.startsWith('https://') || 
    path.startsWith('data:') || 
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Limpiar cualquier prefijo './' o '/' inicial
  const cleanPath = path.replace(/^\.?\//, '');

  // Detectar si el navegador está bajo el contexto de GitHub Pages (/agrotech)
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    if (pathname.includes('/agrotech')) {
      return `/agrotech/${cleanPath}`;
    }
  }

  // En entorno local o fallback estándar
  const base = import.meta.env?.BASE_URL || './';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${cleanPath}`;
}

/**
 * Manejador de error para elementos <img>:
 * 1. Intenta la ruta complementaria (/agrotech/... vs ./...)
 * 2. Si ambas fallan, oculta el icono roto y revela el contenedor .img-error-fallback
 */
export function handleImageFallback(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  originalPath?: string | null
) {
  const target = e.currentTarget;
  if (!target.dataset.fallbackTried && originalPath) {
    target.dataset.fallbackTried = 'true';
    const clean = originalPath.replace(/^\.?\//, '');
    if (target.src.includes('/agrotech/')) {
      target.src = `./${clean}`;
    } else {
      target.src = `/agrotech/${clean}`;
    }
    return;
  }

  // Si ya se intentó el fallback o falló la alternativa, ocultar la imagen rota
  target.style.display = 'none';
  const parent = target.parentElement;
  if (parent) {
    const fallbackEl = parent.querySelector<HTMLElement>('.img-error-fallback');
    if (fallbackEl) {
      fallbackEl.style.display = 'flex';
    }
  }
}
