import { TestBed } from '@angular/core/testing';

import { PlantsSheetsService } from './plants-sheets.service';

describe('PlantsSheetsService', () => {
  let service: PlantsSheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantsSheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
