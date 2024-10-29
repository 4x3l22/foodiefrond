import { TestBed } from '@angular/core/testing';

import { RcontrasenaService } from './rcontrasena.service';

describe('RcontrasenaService', () => {
  let service: RcontrasenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RcontrasenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
