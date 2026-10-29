import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HeroI } from '../interface/hero.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService extends ApiService<HeroI, HeroI> {
  constructor(http: HttpClient) {
    super(http, 'hero');
  }

  getHeroes() {
    return this.get().subscribe({
      next: (data) => data,
      error: (error) => error,
    });
  }

  postHero(hero: HeroI) {
    return this.post(hero).subscribe({
      next: (data) => data,
      error: (error) => error,
    });
  }

  putHero(hero: HeroI) {
    return this.put(hero).subscribe({
      next: (data) => data,
      error: (error) => error,
    });
  }

  deleteHero(id: number) {
    return this.delete(id).subscribe({
      next: (data) => data,
      error: (error) => error,
    });
  }
}
