import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksBoardComponent } from './tasks-board.component';
import { MaterialModule } from '../../material/material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskCardComponent } from '../task-card/task-card.component';

describe('TasksBoardComponent', () => {
  let component: TasksBoardComponent;
  let fixture: ComponentFixture<TasksBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TasksBoardComponent,
        TaskCardComponent
      ],
      imports: [
        MaterialModule,
        DragDropModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
