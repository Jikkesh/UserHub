import { TestBed } from '@angular/core/testing';

import { UserDataInterceptor } from './user-data.interceptor';

describe('UserDataInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UserDataInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UserDataInterceptor = TestBed.inject(UserDataInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
