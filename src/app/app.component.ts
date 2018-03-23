import { Component } from '@angular/core';

import { FizzBuzz } from './fizzbuzz';
import { FizzBuzzService } from './fizzbuzz.service';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'TechTest';

  // The value to be sent to the FizzBuzz Rest service
  inputInteger: number = 0;

  // The response from the REST service
  fizzbuzz: FizzBuzz = {} as FizzBuzz;

  //Inject the REST service
  constructor(
    private fizzBuzzService: FizzBuzzService
  ) { }

  // Make a call to the FizzBuzz service passing the next numeric value
  // On completion update the response (the content property is bound to view)
  getFizzBuzz(): void {
    this.fizzBuzzService.getFizzBuzz(++this.inputInteger)
      .then( fizzbuzz => this.fizzbuzz = fizzbuzz );
  }

  // Reset to 0 the numeric value to be sent to the service
  // And clear the response
  resetFizzBuzz(): void {
    this.inputInteger = 0;
    this.fizzbuzz = {} as FizzBuzz;
  }
}
