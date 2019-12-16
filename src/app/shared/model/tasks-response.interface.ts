import { Task } from './task.interface';
import { TaskStatus } from './task-status.enum';

export interface TasksResponse {
  status: TaskStatus;
  tasks: Array<Task>;
}
