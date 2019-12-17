import { Injectable } from '@angular/core';
import { Task } from '../shared/model/task.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { from, Observable, Subject } from 'rxjs';
import { concatMap, groupBy, map, mergeMap, toArray } from 'rxjs/operators';
import { TasksResponse } from '../shared/model/tasks-response.interface';
import { TaskFormComponent } from '../tasks/task-form/task-form.component';
import { MatDialog } from '@angular/material';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public taskCreated: Subject<Task> = new Subject<Task>();

  public taskDeleted: Subject<Task> = new Subject<Task>();

  public openTaskDetails: Subject<Task> = new Subject<Task>();

  public newTask$: Observable<Task> = this.taskCreated.asObservable();

  public deletedTask$: Observable<Task> = this.taskDeleted.asObservable();

  public taskDetails$: Observable<Task> = this.openTaskDetails.asObservable();

  private baseUrl = environment.BASE_URL;

  private tasksUrl = `${this.baseUrl}/tasks`;

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private notificationService: NotificationService) {}

  getAllTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(this.tasksUrl);
  }

  private groupTasks(tasks: Array<Task>): Observable<TasksResponse> {
    return from(tasks)
      .pipe(
        groupBy(task => task.status),
        mergeMap(group => group
          .pipe(
            toArray(),
            map((groupArr) => {
              return {
                status: group.key,
                tasks: groupArr
              };
            })
          )
        )
      );
  }

  getGroupedTasks(): Observable<TasksResponse> {
    return this.getAllTasks()
      .pipe(
        concatMap(tasks => this.groupTasks(tasks))
      );
  }

  getTask(id: string) {
    return this.http.get<Task>(`${ this.tasksUrl }/${ id }`);
  }

  createTask(task: Task) {
    return this.http.post<Task>(`${ this.tasksUrl }/`, task);
  }

  updateTask(task: Task) {
    return this.http.put<Task>(`${ this.tasksUrl }/${ task.id }`, task);
  }

  deleteTask(id: string) {
    return this.http.delete<Task>(`${ this.tasksUrl }/${ id }`);
  }

  initiateCreateTask() {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '800px'
    });

    dialogRef.afterClosed()
      .subscribe((result: Task | undefined) => {
        if (result) {
          this.createTask(result)
            .subscribe((newTask: Task) => {
                this.taskCreated.next(newTask);
                this.notificationService.openSuccessNotification('Task successfully created.');
              },
              (error) => {
                this.notificationService.openErrorNotification(`Failed to create task: ${ error.message }.`);
              });
        }
      });
  }

  initiateUpdateTask(task: Task) {
    this.updateTask(task)
      .subscribe(() => {
          this.notificationService.openSuccessNotification('Task successfully updated.');
        },
        (error) => {
          this.notificationService.openErrorNotification(`Failed to update task: ${ error.message }.`);
        });
  }

  initiateDeleteTask(task: Task) {
    this.deleteTask(task.id)
      .subscribe(() => {
          this.taskDeleted.next(task);
          this.notificationService.openSuccessNotification('Task successfully deleted.');
        },
        (error) => {
          this.notificationService.openErrorNotification(`Failed to delete task: ${ error.message }.`);
        });
  }

  openTaskDetailsDrawer(id: string) {
    this.getTask(id)
      .subscribe((task: Task) => {
          this.openTaskDetails.next(task);
        },
        (error) => {
          this.notificationService.openErrorNotification(`Failed to retrieve task: ${ error.message }.`);
        });
  }
}
