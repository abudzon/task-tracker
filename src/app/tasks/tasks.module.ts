import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksBoardComponent } from './tasks-board/tasks-board.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TasksComponent } from './tasks.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { SharedModule } from '../shared/shared.module';

const components = [
  TasksBoardComponent,
  TaskCardComponent,
  TaskCreateComponent,
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
    DragDropModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ...components
  ],
  entryComponents: [
    TaskCreateComponent
  ]
})
export class TasksModule { }
