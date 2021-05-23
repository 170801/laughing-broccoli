import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        data: { title: 'Settings'}
    }
];

import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {}
