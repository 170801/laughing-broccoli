import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomingComponent } from './incoming.component';

export const routes: Routes = [
    {
        path: '',
        component: IncomingComponent,
        data: { title: 'Incoming calls'}
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IncomingRoutingModule { }
