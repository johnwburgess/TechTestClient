import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FizzBuzzService } from './fizzbuzz.service';
import { FakeFizzBuzzService } from './fake.fizzbuzz.service';

describe('FizzBuzzService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        FizzBuzzService
      ],
      imports: [
        // no more boilerplate code w/ custom providers needed :-)
        HttpClientModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it(`should send an expected get request`, async(inject([FizzBuzzService, HttpTestingController],
    (service: FizzBuzzService, backend: HttpTestingController) => {

      service.getFizzBuzz(1);

      backend.expectOne((req: HttpRequest<any>) => {
        const body = new HttpParams({ fromString: req.body });
        return req.url === 'http://localhost:8080/fizzbuzz/1'
          && req.method === 'GET';
      }, `POST to 'auth/login' with form-encoded user and password`);
  })));
});
