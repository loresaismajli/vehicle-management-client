import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateComponent } from './private.component';

const routes: Routes = [
    {
        path: '',
        component: PrivateComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: 'home',
                loadChildren: () =>
                    import('./home/home.module').then((m) => m.HomeModule),
            },
            {
                path: 'services',
                loadChildren: () =>
                    import('./services/services.module').then((m) => m.ServicesModule),
            },
            {
                path: 'accidents',
                loadChildren: () =>
                    import('./accidents/accidents.module').then((m) => m.AccidentsModule),
            },
            {
                path: 'vehicles',
                loadChildren: () =>
                    import('./vehicles/vehicles.module').then((m) => m.VehiclesModule),
            },
            {
                path: 'users',
                loadChildren: () =>
                    import('./users/users.module').then((m) => m.UsersModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivateRoutingModule { }
