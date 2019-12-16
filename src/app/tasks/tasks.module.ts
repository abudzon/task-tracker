import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksBoardComponent } from './tasks-board/tasks-board.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TasksComponent } from './tasks.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const components = [
  TasksBoardComponent,
  TaskCardComponent,
  TaskFormComponent,
  TasksComponent,
  TaskDetailsComponent
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  exports: [
    ...components
  ],
  entryComponents: [
    TaskFormComponent
  ]
})
export class TasksModule { }
