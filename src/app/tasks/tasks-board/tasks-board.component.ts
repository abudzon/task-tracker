import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from '../../shared/model/task.interface';
import { TaskStatus } from '../../shared/model/task-status.enum';

@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: [ './tasks-board.component.scss' ]
})
export class TasksBoardComponent {

  @Input() toDoTasks: Array<Task> = [];

  @Input() inProgressTasks: Array<Task> = [];

  @Input() doneTasks: Array<Task> = [];

  @Output() toDoTasksChange = new EventEmitter<Array<Task>>();

  @Output() inProgressTasksChange = new EventEmitter<Array<Task>>();

  @Output() doneTasksChange = new EventEmitter<Array<Task>>();

  @Output() statusChange = new EventEmitter<Task | undefined>();

  public drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateStatus(
        event.container.id,
        event.item.element.nativeElement.id
      );
    }
    this.toDoTasksChange.emit(this.toDoTasks);
    this.inProgressTasksChange.emit(this.inProgressTasks);
    this.doneTasksChange.emit(this.doneTasks);
  }

  private updateStatus(statusId: string, taskId: string): void {
    const updatedTask = this.getUpdatedTask(
      statusId,
      taskId
    );
    this.statusChange.emit(updatedTask);
  }

  private getUpdatedTask(statusId: string, taskId: string): Task | undefined {
    let updatedTask: Task;

    switch (statusId) {
      case 'to-do-tasks':
        updatedTask = this.toDoTasks.find((item: Task) => item.id === taskId);
        updatedTask.status = TaskStatus.TO_DO;
        break;
      case 'in-progress-tasks':
        updatedTask = this.inProgressTasks.find((item: Task) => item.id === taskId);
        updatedTask.status = TaskStatus.IN_PROGRESS;
        break;
      case 'done-tasks':
        updatedTask = this.doneTasks.find((item: Task) => item.id === taskId);
        updatedTask.status = TaskStatus.DONE;
    }

    return updatedTask;
  }
}
