import { Component, Input } from '@angular/core';
import { Task } from '../../shared/model/task.interface';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: [ './task-card.component.scss' ]
})
export class TaskCardComponent {

  @Input() task: Task;

  constructor(private taskService: TaskService) {}

  public viewDetails() {
    this.taskService.openTaskDetailsDrawer(this.task.id);
  }
}
