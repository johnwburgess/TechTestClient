import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { FizzBuzz } from './fizzbuzz';
import { FizzBuzzService } from './fizzbuzz.service';
import { FakeFizzBuzzService } from './fake.fizzbuzz.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers:[
        {provide:FizzBuzzService,useClass:FakeFizzBuzzService},
      ],
      imports: [
        // no more boilerplate code w/ custom providers needed :-)
        HttpClientModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'TechTest'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('TechTest');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to TechTest!');
  }));

  it(`should have as inputInteger 0`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.inputInteger).toEqual(0);
  }));

  it(`should have as fizzbuzz {}`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.fizzbuzz).toEqual({});
  }));

  it(`resetFizzBuzz should have as inputInteger 0`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.inputInteger = 10;

    app.resetFizzBuzz();
    expect(app.fizzbuzz).toEqual({});
  }));

  it(`resetFizzBuzz should have as fizzbuzz {}`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.fizzbuzz = {"something":"else"};

    app.resetFizzBuzz();
    expect(app.fizzbuzz).toEqual({});
  }));

  it(`getFizzBuzz should call fizzbuzz service`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const fizzBuzzService = TestBed.get(FizzBuzzService);
    const expectedFizzBuzzValue = {"content": "value"};

    spyOn(fizzBuzzService, "getFizzBuzz").and.returnValue(new Promise<FizzBuzz>((resolve) => {resolve(expectedFizzBuzzValue);}));

    const app = fixture.debugElement.componentInstance;

    return new Promise((resolve) => {
      app.getFizzBuzz();

      resolve(app);
    }).then(() => {
      expect(fizzBuzzService.getFizzBuzz).toHaveBeenCalledWith(1);
      expect(app.fizzbuzz).toEqual(expectedFizzBuzzValue);
    });

  }));
});
