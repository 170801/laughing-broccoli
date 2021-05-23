import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all.component';

export const routes: Routes = [
    {
        path: '',
        component: AllComponent,
        data: { title: 'All calls'}
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AllRoutingModule { }
