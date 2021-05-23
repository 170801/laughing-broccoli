import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutgoingComponent } from './outgoing.component';

export const routes: Routes = [
    {
        path: '',
        component: OutgoingComponent,
        data: { title: 'Outgoing calls'}
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OutgoingRoutingModule { }
