import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroI } from '../interface/hero.interface';
import { ApiService } from './api.service';
import { HEROS } from './fakeData';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class heroService extends ApiService<HeroI, HeroI> {
  constructor(http: HttpClient) {
    super(http, 'hero');
  }

  getHeroes(): Observable<HeroI[]> {
    return of(HEROS).pipe(delay(300));
    /* Ejemplo de como se usaria el API service
    return this.get().subscribe({
      next: (data) => data,
      error: (error) => error,
    });*/
  }

  addHero(_hero: HeroI) {
    return of({ code: 200, info: 'success' }).pipe(delay(300));
    /* Ejemplo de como se usaria el API service
    return this.post(hero).subscribe({
      next: (data) => data,
      error: (error) => error,
    });*/
  }

  updateHero(_hero: HeroI) {
    return of({ code: 200, info: 'success' }).pipe(delay(300));
    /* Ejemplo de como se usaria el API service
    return this.put(hero).subscribe({
      next: (data) => data,
      error: (error) => error,
    });*/
  }

  deleteHero(_id: number) {
    return of({ code: 200, info: 'success' }).pipe(delay(300));
    /* Ejemplo de como se usaria el API service
    return this.delete(id).subscribe({
      next: (data) => data,
      error: (error) => error,
    });*/
  }
}
