import { Component } from '@angular/core';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(private taskService: TaskService) {}

  public createNewTask(): void {
    this.taskService.initiateCreateTask();
  }
}
