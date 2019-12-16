import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusPipe } from './pipe/status.pipe';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    StatusPipe,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    StatusPipe,
    ConfirmationDialogComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class SharedModule {}
