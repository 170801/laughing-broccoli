import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallAddComponent } from './call-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { PhoneInputModule } from '../../../shared/components/phone-input/phone-input.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CallAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    PhoneInputModule,
    MatIconModule
  ],
  exports: [
    CallAddComponent
  ]
})
export class CallAddModule { }
