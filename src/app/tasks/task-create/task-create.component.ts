import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskStatus } from '../../shared/model/task-status.enum';
import * as uuid from 'uuid';
import { MatDialogRef } from '@angular/material';
import { DateValidators } from '../../shared/validator/date-validators';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: [ './task-create.component.scss' ]
})
export class TaskCreateComponent implements OnInit {

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

  constructor(public matDialogRef: MatDialogRef<TaskCreateComponent>) {}

  ngOnInit(): void {
    this.tasksFormGroup = new FormGroup({
      title: new FormControl('', [ Validators.required ]),
      description: new FormControl('', [ Validators.required ]),
      status: new FormControl(TaskStatus.TO_DO, [ Validators.required ]),
      dueDate: new FormControl('', [ DateValidators.dueDate ])
    });
  }

  public submitTask(): void {
    const newTask = {
      id: uuid.v4(),
      title: this.tasksFormGroup.controls.title.value,
      creationDate: new Date(Date.now()),
      description: this.tasksFormGroup.controls.description.value,
      status: this.tasksFormGroup.controls.status.value,
      dueDate: new Date(this.tasksFormGroup.controls.dueDate.value)
    };

    if (this.tasksFormGroup.valid) {
      this.matDialogRef.close(newTask);
    }
  }
}
