import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroI } from '../interface/hero.interface';
import { ApiService } from './api.service';
import { HEROES } from './fakeData';
import { delay, Observable, of } from 'rxjs';
import { paginationRequest } from '../action/hero.action';
import { pagination } from '../interface/hero.store.interface';

@Injectable({
  providedIn: 'root',
})
export class heroService extends ApiService<HeroI, HeroI> {
  private heroes: HeroI[] = JSON.parse(JSON.stringify(HEROES));
  constructor(http: HttpClient) {
    super(http, 'hero');
  }

  getHeroes(data: paginationRequest): Observable<pagination<HeroI>> {
    const index = Math.max(0, Math.floor(data.index ?? 0));
    const size = Math.max(0, Math.floor(data.size ?? 0));
    const start = Math.min(index * size, this.heroes.length);
    const end = Math.min(index * size + size, this.heroes.length);
    const heroesACtives = this.heroes.filter((h) => h.state);
    const dataFiltered = heroesACtives.slice(start, end);

    return of({ vector: dataFiltered, size: heroesACtives.length }).pipe(delay(700));
    /* Ejemplo de como se usaria el API service
    return this.get().subscribe({
      next: (data) => data,
      error: (error) => error,
    });*/
  }

  getFilteredHeroes(name: string): Observable<pagination<HeroI>> {
    const filteredList: HeroI[] = this.heroes
      .filter((h) => h.state)
      .filter((v) => v.name.toLowerCase().includes(name.toLowerCase()));
    return of({ vector: filteredList, size: this.heroes.length }).pipe(delay(700));
    /* Ejemplo de como se usaria el API service
    return this.get().subscribe({
      next: (data) => data,
      error: (error) => error,
    });*/
  }

  addHero(hero: HeroI) {
    const newHero: HeroI = { ...hero, id: this.heroes.length + 1 };

    this.heroes = [...this.heroes, newHero];
    return of({ code: 200, info: 'success' }).pipe(delay(300));
    /* Ejemplo de como se usaria el API service
    return this.post(hero).subscribe({
      next: (data) => data,
      error: (error) => error,
    });*/
  }

  updateHero(hero: HeroI) {
    this.heroes = this.heroes.map((h) => {
      if (h.id === hero.id) {
        return hero;
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
    this.heroes = this.heroes.map((h) => {
      if (h.id === id) {
        return { ...h, state: false };
      } else {
        return h;
      }
    });
    return of({ code: 200, info: 'success' }).pipe(delay(300));
    /* Ejemplo de como se usaria el API service
    return this.delete(id).subscribe({
      next: (data) => data,
      error: (error) => error,
    });*/
  }
}
