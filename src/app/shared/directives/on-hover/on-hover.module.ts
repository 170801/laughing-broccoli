import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OnHoverDirective } from './on-hover.directive';

@NgModule({
    imports: [CommonModule],
    exports: [OnHoverDirective],
    declarations: [OnHoverDirective],
    providers: [],
})
export class OnHoverModule { }
