import { Component, Input } from '@angular/core';
import { Task } from '../../shared/model/task.interface';
import { MatDialog, MatDrawer } from '@angular/material';
import { TaskService } from '../../service/task.service';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: [ './task-details.component.scss' ]
})
export class TaskDetailsComponent {

  @Input() task: Task | undefined;

  @Input() drawer: MatDrawer;

  constructor(private taskService: TaskService,
              private dialog: MatDialog) {}

  public closeDrawer(): void {
    this.drawer.close();
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
          this.task = undefined;
          this.taskService.initiateDeleteTask(this.task);
        }
      });
  }
}
