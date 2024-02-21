import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./core/core.routes').then(r => r.routes)
    },
    {
        path: '**',
        title: '404 Not found',
        loadComponent: () => import('./features/not-found/not-found.component').then(c => c.NotFoundComponent)
    }
];
