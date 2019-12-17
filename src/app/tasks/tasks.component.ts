import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../shared/model/task.interface';
import { TaskStatus } from '../shared/model/task-status.enum';
import { TasksResponse } from '../shared/model/tasks-response.interface';
import { MatDrawer } from '@angular/material';
import { Subscription } from 'rxjs';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: [ './tasks.component.scss' ]
})
export class TasksComponent implements OnInit, OnDestroy {

  @ViewChild('drawer', { static: true }) taskDrawer: MatDrawer;

  public toDo: Array<Task> = [];

  public inProgress: Array<Task> = [];

  public done: Array<Task> = [];

  public drawerTask: Task | undefined;

  public loading = true;

  private subscriptions: Subscription = new Subscription();

  constructor(private taskService: TaskService,
              private notificationService: NotificationService) {}

  public ngOnInit(): void {
    this.loadTasks();
    this.listenOnTaskCreated();
    this.listenOnTaskDeleted();
    this.listenOnTaskDetails();
  }

  public updateTaskStatus(task: Task): void {
    this.taskDrawer.close();
    this.taskService.initiateUpdateTask(task);
  }

  public updateTask(task: Task): void {
    this.taskService.initiateUpdateTask(task);
    const tasksOfSameStatus = this.getTasksOfSameStatus(task.status);
    const taskToUpdate = tasksOfSameStatus
      .findIndex((item: Task) => item.id === task.id);

    if (taskToUpdate) {
      tasksOfSameStatus.splice(taskToUpdate, 1, task);
    }
  }

  public deleteTask(task: Task): void {
    this.taskService.initiateDeleteTask(task);
  }

  private loadTasks(): void {
    const getTasksSub = this.taskService.getGroupedTasks()
      .subscribe((taskGroups: TasksResponse) => {
        this.setCategorisedTasks(taskGroups);
      }, (error) => {
        this.notificationService.openErrorNotification(
          `Failed to retrieve tasks: ${ error.message }.`
        );
      }, () => this.loading = false);
    this.subscriptions.add(getTasksSub);
  }

  private listenOnTaskCreated() {
    const createdSub = this.taskService.newTask$
      .subscribe((task: Task) => {
        this.setCategorisedTasks({
          status: task.status,
          tasks: [ task ]
        });
      });
    this.subscriptions.add(createdSub);
  }

  private listenOnTaskDeleted(): void {
    const deletedSub = this.taskService.deletedTask$
      .subscribe((task: Task) => {
        const tasksOfSameStatus = this.getTasksOfSameStatus(task.status);
        const taskToDelete = tasksOfSameStatus
          .findIndex((item: Task) => item.id === task.id);

        if (taskToDelete) {
          tasksOfSameStatus.splice(taskToDelete, 1);
        }
      });
    this.subscriptions.add(deletedSub);
  }

  private listenOnTaskDetails(): void {
    const viewDetails = this.taskService.taskDetails$
      .subscribe((task: Task) => {
        if (task) {
          this.drawerTask = task;
          this.taskDrawer.open();
        }
      });
    this.subscriptions.add(viewDetails);
  }

  private setCategorisedTasks(tasksGroup: TasksResponse): void {
    switch (tasksGroup.status) {
      case TaskStatus.TO_DO:
        this.toDo = [
          ...this.toDo,
          ...tasksGroup.tasks
        ];
        break;
      case TaskStatus.IN_PROGRESS:
        this.inProgress = [
          ...this.inProgress,
          ...tasksGroup.tasks
        ];
        break;
      case TaskStatus.DONE:
        this.done = [
          ...this.done,
          ...tasksGroup.tasks
        ];
    }
  }

  private getTasksOfSameStatus(status: string): Array<Task> {
    return status === TaskStatus.TO_DO ? this.toDo :
      (status === TaskStatus.IN_PROGRESS ? this.inProgress : this.done);
  }

  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
}
