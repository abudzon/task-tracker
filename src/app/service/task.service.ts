import { Injectable } from '@angular/core';
import { Task } from '../shared/model/task.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { from, Observable, Subject } from 'rxjs';
import { concatMap, groupBy, map, mergeMap, toArray } from 'rxjs/operators';
import { TasksResponse } from '../shared/model/tasks-response.interface';
import { TaskCreateComponent } from '../tasks/task-create/task-create.component';
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

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private notificationService: NotificationService) {}

  getAllTasks(): Observable<Array<Task>> {
    return this.http.get<Array<Task>>(`${ this.baseUrl }/tasks`);
  }

  groupTasks(tasks: Array<Task>): Observable<TasksResponse> {
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

  createTask(task: Task) {
    return this.http.post<Task>(`${this.baseUrl}/tasks/`, task);
  }

  updateTask(task: Task) {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${task.id}`, task);
  }

  deleteTask(id: string) {
    return this.http.delete<Task>(`${ this.baseUrl }/tasks/${ id }`);
  }

  initiateCreateTask() {
    const dialogRef = this.dialog.open(TaskCreateComponent, {
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
              this.notificationService.openErrorNotification(`Failed to create task: ${error.message}.`);
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
        this.notificationService.openErrorNotification(`Failed to update task: ${error.message}.`);
      });
  }

  initiateDeleteTask(task: Task) {
    this.deleteTask(task.id)
      .subscribe(() => {
          this.taskDeleted.next(task);
          this.notificationService.openSuccessNotification('Task successfully deleted.');
        },
        (error) => {
          this.notificationService.openErrorNotification(`Failed to delete task: ${error.message}.`);
        });
  }

  openTaskDetailsDrawer(task: Task) {
    this.openTaskDetails.next(task);
  }
}
