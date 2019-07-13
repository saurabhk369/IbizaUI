/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BladesManagerService } from './blades-manager.service';

describe('Service: BladesManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BladesManagerService]
    });
  });

  it('should ...', inject([BladesManagerService], (service: BladesManagerService) => {
    expect(service).toBeTruthy();
  }));
});
