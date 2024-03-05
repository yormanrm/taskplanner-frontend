import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";
import { loggedInGuard } from "./guards/loggedIn.guard";

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadChildren: () => import('../layout/layout.routes').then(r => r.routes),
        pathMatch: 'full'
    },
    {
        path: 'authentication',
        title: 'Authentication',
        canActivate: [loggedInGuard],
        loadComponent: () => import('../features/authentication/authentication.component').then(c => c.AuthenticationComponent)
    }
];