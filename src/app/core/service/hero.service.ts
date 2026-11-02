import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroI } from '../interface/hero.interface';
import { ApiService } from './api.service';
import { HEROES } from './fakeData';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class heroService extends ApiService<HeroI, HeroI> {
  private heroes: HeroI[] = JSON.parse(JSON.stringify(HEROES));
  constructor(http: HttpClient) {
    super(http, 'hero');
  }

  getHeroes(): Observable<HeroI[]> {
    return of(this.heroes).pipe(delay(700));
    /* Ejemplo de como se usaria el API service
    return this.get().subscribe({
      next: (data) => data,
      error: (error) => error,
    });*/
  }

  getFilteredHeroes(name: string): Observable<HeroI[]> {
    const filteredList: HeroI[] = this.heroes.filter((v) =>
      v.name.toLowerCase().includes(name.toLowerCase()),
    );
    return of(filteredList).pipe(delay(700));
    /* Ejemplo de como se usaria el API service
    return this.get().subscribe({
      next: (data) => data,
      error: (error) => error,
    });*/
  }

  addHero(hero: HeroI) {
    const newHero: HeroI = { ...hero, id: this.heroes.length + 1 };
    console.log(this.heroes, newHero);
    this.heroes = [...this.heroes, newHero];
    return of({ code: 200, info: 'success' }).pipe(delay(300));
    /* Ejemplo de como se usaria el API service
    return this.post(hero).subscribe({
      next: (data) => data,
      error: (error) => error,
    });*/
  }

  updateHero(hero: HeroI) {
    console.log('hola', hero);
    this.heroes = this.heroes.map((h) => {
      if (h.id === hero.id) {
        h = hero;
      }
      return h;
    });
    return of({ code: 200, info: 'success' }).pipe(delay(300));
    /* Ejemplo de como se usaria el API service
    return this.put(hero).subscribe({
      next: (data) => data,
      error: (error) => error,
    });*/
  }

  deleteHero(id: number) {
    this.heroes = this.heroes.filter((v) => v.id !== id);
    return of({ code: 200, info: 'success' }).pipe(delay(300));
    /* Ejemplo de como se usaria el API service
    return this.delete(id).subscribe({
      next: (data) => data,
      error: (error) => error,
    });*/
  }
}
