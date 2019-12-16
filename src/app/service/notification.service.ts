import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  openSuccessNotification(message: string) {
    this.snackBar.open(
      message,
      '',
      {
        panelClass: 'success-notification',
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 5000
      }
    );
  }

  openErrorNotification(message: string) {
    this.snackBar.open(
      message,
      '',
      {
        panelClass: 'error-notification',
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 5000
      }
    );
  }
}
