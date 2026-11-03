import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { heroService } from './hero.service';
import { provideHttpClient } from '@angular/common/http';
import { HeroI } from '../interface/hero.interface';

describe('Hero Service', () => {
  let service: heroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [heroService, provideHttpClient(), provideZonelessChangeDetection()],
    });

    service = TestBed.inject(heroService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return paginated heroes', (done) => {
    service.getHeroes({ index: 0, size: 5 }).subscribe({
      next: (response) => {
        expect(response.vector.length).toBe(5);
        expect(response.size).toBeGreaterThan(5);
        done();
      },
      error: done.fail,
    });
  });

  it('should return filtered heroes', (done) => {
    service.getFilteredHeroes('su').subscribe({
      next: (response) => {
        expect(response.vector.length).toBe(3);
        done();
      },
      error: done.fail,
    });
  });

  it('should return add hero', (done) => {
    service.addHero(newHerro).subscribe({
      next: (response) => {
        expect(response).toEqual(responseSuccess);
        done();
      },
      error: done.fail,
    });
  });

  it('should return update hero', (done) => {
    service.updateHero({ ...newHerro, id: 2 }).subscribe({
      next: (response) => {
        expect(response).toEqual(responseSuccess);
        done();
      },
      error: done.fail,
    });
  });

  it('should return delete hero', (done) => {
    service.deleteHero(4).subscribe({
      next: (response) => {
        expect(response).toEqual(responseSuccess);
        done();
      },
      error: done.fail,
    });
  });
});

const newHerro: HeroI = {
  name: 'Super',
  state: true,
  age: 30,
  description: 'Esta es la descripcion',
  id: null,
  power: 'Volar',
};

const responseSuccess = { code: 200, info: 'success' };
