import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';


// DOC: This is the router. Basically an array of individual pages
// C+Find: FREDDY_ROUTER
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'properties',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/properties/properties.component').then(m => m.PropertiesComponent)
    },
    {
        path: 'recover',
        loadComponent: () => import('./pages/recover-password/recover-password.component').then(m => m.RecoverPasswordComponent)
    },
    {
        path: 'rooms/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/rooms/rooms.component').then(m => m.RoomsComponent)
    }
];
