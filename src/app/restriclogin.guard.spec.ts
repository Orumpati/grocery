import { TestBed } from '@angular/core/testing';

import { RestricloginGuard } from './restriclogin.guard';

describe('RestricloginGuard', () => {
  let guard: RestricloginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RestricloginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
