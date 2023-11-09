import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserRepositoryService } from './user-repository.service';

describe('UserRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserRepositoryService],
    });
  });

  it('should be created', () => {
    const service: UserRepositoryService = TestBed.inject(UserRepositoryService);
    expect(service).toBeTruthy();
  });
});
