import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { HeroService } from './hero.service';
import { Hero } from '../interfaces/hero';
import { HERO, HEROES } from '../mock-data';
import { MessageDialogService } from './message-dialog.service';
import { MatDialogModule } from '@angular/material/dialog';

const testUrl = 'api/heroes';

describe('HeroService', () => {
  let service: HeroService;
  let httpTestingController: HttpTestingController; 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatDialogModule ],
      providers: [ MessageDialogService]
    });

    service = TestBed.inject(HeroService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should make a GET request and return an array of Heroes', () => {
    const testData: Hero[] = HEROES;

    service.getHeroes().subscribe({
      next: data => expect(data)
        .toEqual(testData),
      error: fail
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);

    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: testData });
    req.event(expectedResponse);
  });

  it('should make a GET request by id and return a Hero', () => {
    const testData: Hero = HERO
    const getHeroeById = `${testUrl}/${testData.id}`

    service.getHeroById(testData.id).subscribe({
      next: data => expect(data)
        .toEqual(testData),
      error: fail
    });

    const req = httpTestingController.expectOne(getHeroeById);
    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);

    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: testData });
    req.event(expectedResponse);
  });

  it('should make a GET request by name and return an array of Heroes', () => {
    const testData: Hero[] = [HERO]
    const searchHeroesByNameUrl = `${testUrl}/?name=${testData[0].name}`

    service.searchHeroesByName(testData[0].name).subscribe({
      next: data => expect(data)
        .toEqual(testData),
      error: fail
    });

    const req = httpTestingController.expectOne(searchHeroesByNameUrl);
    expect(req.request.method).toEqual('GET');
    expect(req.request.body).toEqual(null);

    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: testData });
    req.event(expectedResponse);
  });

  
  it('should make a POST request and add a Hero', () => {
    const testData: Hero = HERO

    service.addHero(testData).subscribe({
      next: data => expect(data)
        .toEqual(testData),
      error: fail
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);

    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: testData });
    req.event(expectedResponse);
  });

  it('should make a PUT request and update a Hero', () => {
    const testData: Hero = HERO;
    service.updateHero(testData).subscribe({
      next: data => expect(data)
        .toEqual(testData),
      error: fail
    });

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(testData);

    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: testData });
    req.event(expectedResponse);
  });

  it('should make a DELETE request and delete a Hero', () => {
    const testData: number = HERO.id;
    const deleteUrl = `${testUrl}/${testData}`

    service.deleteHero(testData).subscribe({
      next: data => expect(data)
        .toEqual(testData),
      error: fail
    });

    const req = httpTestingController.expectOne(deleteUrl);
    expect(req.request.method).toEqual('DELETE');
    expect(req.request.body).toEqual(null);

    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: testData });
    req.event(expectedResponse);
  });
});


