import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: RegistrationComponent,
        data: { title: 'Registration'}
    }
];

import { NgModule } from '@angular/core';
import { RegistrationComponent } from './registration.component';

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegistrationRoutingModule { }
