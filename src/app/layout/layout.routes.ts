import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                title: 'Inicio',
                loadComponent: () => import('../features/home/home.component').then(c => c.HomeComponent)
            }
        ]
    }
];