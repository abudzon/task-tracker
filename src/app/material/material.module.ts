import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatDividerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatIconModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
} from '@angular/material';

const modules = [
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatDividerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatIconModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules
  ]
})
export class MaterialModule { }
