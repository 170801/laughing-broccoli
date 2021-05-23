import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomingComponent } from './incoming.component';
import { IncomingRoutingModule } from './incoming-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OnHoverModule } from '../../shared/directives/on-hover/on-hover.module';

@NgModule({
  declarations: [
    IncomingComponent
  ],
  imports: [
    CommonModule,
    IncomingRoutingModule, MatCheckboxModule, MatFormFieldModule,
    MatIconModule, MatPaginatorModule, MatTableModule, MatInputModule,
    MatButtonModule, MatSortModule, OnHoverModule,
  ]
})
export class IncomingModule { }
