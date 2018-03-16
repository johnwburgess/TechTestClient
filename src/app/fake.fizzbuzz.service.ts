import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { FizzBuzz } from './fizzbuzz'

@Injectable()

export class FakeFizzBuzzService {

  // Inject the HttpClient into the service
  constructor(private httpClient: HttpClient) {
  }

  // Call the REST service passing the input as a path variable
  getFizzBuzz(inputInteger: number): Promise<FizzBuzz> {
    return new Promise<FizzBuzz>((resolve, reject) => {
                                				resolve({"content": inputInteger.toString()});
                                		});
  }

}
