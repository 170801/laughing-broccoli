import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutgoingComponent } from './outgoing.component';
import { OutgoingRoutingModule } from './outgoing-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { OnHoverModule } from '../../shared/directives/on-hover/on-hover.module';



@NgModule({
  declarations: [
    OutgoingComponent
  ],
  imports: [
    CommonModule, OutgoingRoutingModule, MatCheckboxModule, MatFormFieldModule,
    MatIconModule, MatPaginatorModule, MatTableModule, MatInputModule,
    MatButtonModule, MatSortModule, OnHoverModule
  ]
})
export class OutgoingModule { }
