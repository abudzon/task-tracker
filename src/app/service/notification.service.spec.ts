import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { MaterialModule } from '../material/material.module';

describe('NotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MaterialModule]
  }));

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });
});
