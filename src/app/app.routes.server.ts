import { RenderMode, ServerRoute } from '@angular/ssr';

// DOC: ?
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
