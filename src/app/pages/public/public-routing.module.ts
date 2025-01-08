import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { unauthGuard } from '../../shared/guards/unauth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
        path: 'auth',
        canActivate: [unauthGuard],
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PublicRoutingModule { }
