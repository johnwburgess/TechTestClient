import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { FizzBuzz } from './fizzbuzz'

@Injectable()

export class FizzBuzzService {

  // Inject the HttpClient into the service
  constructor(private httpClient: HttpClient) {
  }

  private fizzBuzzUrl = 'http://localhost:8080/fizzbuzz';

  // Call the REST service passing the input as a path variable
  getFizzBuzz(inputInteger: number): Promise<FizzBuzz> {
    const url = `${this.fizzBuzzUrl}/${inputInteger}`;
    return this.httpClient.get(url)
      .toPromise()
      .then(response => response as FizzBuzz)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
