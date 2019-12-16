import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskStatus } from '../../shared/model/task-status.enum';
import * as uuid from 'uuid';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DateValidators } from '../../shared/validator/date-validators';
import { Task } from '../../shared/model/task.interface';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: [ './task-form.component.scss' ]
})
export class TaskFormComponent implements OnInit {

  tasksFormGroup: FormGroup;

  statuses: Array<{ name: string, value: TaskStatus }> = [
    {
      name: 'To do',
      value: TaskStatus.TO_DO
    },
    {
      name: 'In progress',
      value: TaskStatus.IN_PROGRESS
    },
    {
      name: 'Done',
      value: TaskStatus.DONE
    }
  ];

  constructor(public matDialogRef: MatDialogRef<TaskFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Task) {}

  ngOnInit(): void {
    this.tasksFormGroup = new FormGroup({
      title: new FormControl(
        this.data ? this.data.title : '',
        [ Validators.required ]
      ),
      description: new FormControl(
        this.data ? this.data.description : '',
        [ Validators.required ]
      ),
      status: new FormControl(
        this.data ? this.data.status : TaskStatus.TO_DO,
        [ Validators.required ]
      ),
      dueDate: new FormControl(
        this.data && this.data.dueDate ? new Date(this.data.dueDate) : '',
        [ DateValidators.dueDate ]
      )
    });
  }

  public submitTask(): void {
    const newTask = {
      id: this.data ? this.data.id : uuid.v4(),
      title: this.tasksFormGroup.controls.title.value,
      creationDate: this.data ? this.data.creationDate : new Date(Date.now()),
      description: this.tasksFormGroup.controls.description.value,
      status: this.tasksFormGroup.controls.status.value,
      dueDate: new Date(this.tasksFormGroup.controls.dueDate.value)
    };

    if (this.tasksFormGroup.valid) {
      this.matDialogRef.close(newTask);
    }
  }
}
