import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { heroService } from '../service/hero.service';
import { heroActions } from '../action/hero.action';
import { HeroI } from '../interface/hero.interface';
import { genericAction, pagination } from '../interface/hero.store.interface';

@Injectable()
export class HeroEffects {
  private actions$ = inject(Actions);
  private heroService = inject(heroService);

  loadHeroes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(heroActions.getHeroes),
      exhaustMap((val) =>
        this.heroService.getHeroes(val.data).pipe(
          map(
            (data: pagination<HeroI>) => heroActions.getHeroesSuccess({ data }),
            catchError(() =>
              of(
                heroActions.getHeroesError({
                  code: 1500,
                  info: '',
                }),
              ),
            ),
          ),
        ),
      ),
    );
  });

  autoLoad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        heroActions.addHeroSuccess,
        heroActions.deleteHeroSuccess,
        heroActions.updateHeroSuccess,
      ),
      exhaustMap((val) =>
        this.heroService.getHeroes({ size: 5, index: 0 }).pipe(
          map(
            (data: pagination<HeroI>) => heroActions.getHeroesSuccess({ data: data }),
            catchError(() =>
              of(
                heroActions.getHeroesError({
                  code: 1500,
                  info: '',
                }),
              ),
            ),
          ),
        ),
      ),
    );
  });

  getFilteredHeroes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(heroActions.filterHeroes),
      exhaustMap((val) =>
        this.heroService.getFilteredHeroes(val.data).pipe(
          map(
            (data: pagination<HeroI>) => heroActions.filterHeroesSuccess({ data: data }),
            catchError(() =>
              of(
                heroActions.filterHeroesError({
                  code: 1500,
                  info: '',
                }),
              ),
            ),
          ),
        ),
      ),
    );
  });

  addHero$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(heroActions.addHero),
      exhaustMap((val: genericAction<HeroI>) =>
        this.heroService.addHero(val.data).pipe(
          map((data) => heroActions.addHeroSuccess()),
          catchError(() =>
            of(
              heroActions.addHeroError({
                code: 1500,
                info: '',
              }),
            ),
          ),
        ),
      ),
    );
  });

  updateHero$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(heroActions.updateHero),
      exhaustMap((val: genericAction<HeroI>) =>
        this.heroService.updateHero(val.data).pipe(
          map((data) => heroActions.updateHeroSuccess()),
          catchError(() =>
            of(
              heroActions.updateHeroError({
                code: 1500,
                info: '',
              }),
            ),
          ),
        ),
      ),
    );
  });

  deleteHeroe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(heroActions.deleteHero),
      exhaustMap((val: genericAction<number>) =>
        this.heroService.deleteHero(val.data).pipe(
          map((_data) => heroActions.deleteHeroSuccess()),
          catchError(() =>
            of(
              heroActions.deleteHeroError({
                code: 1500,
                info: '',
              }),
            ),
          ),
        ),
      ),
    );
  });
}
