import { AbstractControl } from '@angular/forms';

export class DateValidators {
  static dueDate(control: AbstractControl): { [key: string]: any } | null {
    if (!control || !control.value) {
      return null;
    }

    const dueDate = new Date(control.value);
    const today = new Date(Date.now());

    if (dueDate.valueOf() < today.valueOf()) {
      return { pastDate: 'Please provide future date.' };
    }

    return null;
  }
}
