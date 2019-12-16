import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../shared/model/task.interface';
import { MatDialog, MatDrawer } from '@angular/material';
import { TaskService } from '../../service/task.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: [ './task-details.component.scss' ]
})
export class TaskDetailsComponent {

  @Input() task: Task | undefined;

  @Input() drawer: MatDrawer;

  @Output() taskToDelete = new EventEmitter<Task>();

  @Output() taskToUpdate = new EventEmitter<Task>();

  constructor(private dialog: MatDialog) {}

  public closeDrawer(): void {
    this.drawer.close();
  }

  public editTask(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '800px',
      data: this.task
    });

    dialogRef.afterClosed()
      .subscribe((result: Task | undefined) => {
        if (result) {
          console.log(result);
          this.task = result;
          this.taskToUpdate.emit(this.task);
        }
      });
  }

  public deleteTask(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
      data: {
        title: 'Are you sure you want to delete this task?',
        message: `Task title: '${ this.task.title }'`
      }
    });

    dialogRef.afterClosed()
      .subscribe((result: boolean) => {
        if (result) {
          this.drawer.close();
          this.taskToDelete.emit(this.task);
          this.task = undefined;
        }
      });
  }
}
