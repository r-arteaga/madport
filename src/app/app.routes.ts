import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(p => p.HomePage)
    },
    {
        path: 'settings',
        loadComponent: () => import('./settings/settings.page').then(p => p.SettingsPage)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
]