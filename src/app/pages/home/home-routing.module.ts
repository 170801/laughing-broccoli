import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'all', pathMatch: 'full'},
    { path: '', component: HomeComponent, children: [
        {
            path: 'all',
            loadChildren: () => import('./../all/all.module').then(m => m.AllModule)
        },
        {
            path: 'incoming',
            loadChildren: () => import('./../incoming/incoming.module').then(m => m.IncomingModule)
        },
        {
            path: 'outgoing',
            loadChildren: () => import('./../outgoing/outgoing.module').then(m => m.OutgoingModule)
        },
        {
            path: 'settings',
            loadChildren: () => import('./../user/settings/settings.module').then(m => m.SettingsModule)
        }
    ],
    canActivateChild: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
