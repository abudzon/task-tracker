import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../model/task-status.enum';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(status: TaskStatus): any {
    let statusToDisplay = '';

    switch (status) {
      case TaskStatus.TO_DO:
        statusToDisplay = 'To do';
        break;
      case TaskStatus.IN_PROGRESS:
        statusToDisplay = 'In progress';
        break;
      case TaskStatus.DONE:
        statusToDisplay = 'Done';
    }

    return statusToDisplay;
  }
}
