import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                title: 'Task planner',
                loadComponent: () => import('../features/dashboard/dashboard.component').then(c => c.DashboardComponent)
            },
            {
                path: 'tasks/:status',
                title: 'Task planner',
                loadComponent: () => import('../features/task-list/task-list.component').then(c => c.TaskListComponent)
            },
            {
                path: 'tasks/filtered',
                title: 'Task planner',
                loadComponent: () => import('../features/task-list/task-list.component').then(c => c.TaskListComponent)
            }
        ]
    }
];