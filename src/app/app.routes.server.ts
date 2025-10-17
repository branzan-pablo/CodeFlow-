import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Rotas estáticas que devem ser pré-renderizadas
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'posts',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'about',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'editor',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'newsletter',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'privacy',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'terms',
    renderMode: RenderMode.Prerender,
  },
  // Rotas dinâmicas que devem usar SSR
  {
    path: 'posts/:slug',
    renderMode: RenderMode.Server,
  },
  // Fallback - todas as outras rotas
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
