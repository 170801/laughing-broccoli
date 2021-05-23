import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { PhoneInputComponent } from './phone-input.component';

@NgModule({
    imports: [MatFormFieldModule, FormsModule, ReactiveFormsModule, MatIconModule],
    exports: [PhoneInputComponent],
    declarations: [PhoneInputComponent],
})
export class PhoneInputModule { }
