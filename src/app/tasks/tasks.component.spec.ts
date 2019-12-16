import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { MaterialModule } from '../material/material.module';
import { TasksBoardComponent } from './tasks-board/tasks-board.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskCardComponent } from './task-card/task-card.component';
import { StatusPipe } from '../shared/pipe/status.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TasksComponent,
        TasksBoardComponent,
        TaskDetailsComponent,
        TaskCardComponent,
        StatusPipe
      ],
      imports: [
        MaterialModule,
        DragDropModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
