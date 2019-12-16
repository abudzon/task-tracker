import { TaskStatus } from './task-status.enum';

export interface Task {
  id: string;
  title: string;
  creationDate: Date;
  dueDate: Date;
  description: string;
  status: TaskStatus;
}
