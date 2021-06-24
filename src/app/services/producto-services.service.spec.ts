import { TestBed } from '@angular/core/testing';

import { ProductoServicesService } from './producto-services.service';

describe('ProductoServicesService', () => {
  let service: ProductoServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
