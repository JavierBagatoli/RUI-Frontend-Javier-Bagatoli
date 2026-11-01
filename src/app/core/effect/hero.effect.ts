import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { heroService } from '../service/hero.service';
import { heroActions } from '../action/hero.action';
import { HeroI } from '../interface/hero.interface';

@Injectable()
export class MoviesEffects {
  private actions$ = inject(Actions);
  private heroService = inject(heroService);

  loadHeroes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(heroActions.getHeros),
      exhaustMap(() =>
        this.heroService.getHeroes().pipe(
          map(
            (data: HeroI[]) => heroActions.getHerosSuccess({ data: data }),
            catchError(() => {
              heroActions.getHerosError({
                code: 1500,
                info: '',
              });
              return EMPTY;
            }),
          ),
        ),
      ),
    );
  });

  addHeroe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(heroActions.addHero),
      exhaustMap((val: HeroI) =>
        this.heroService.addHero(val).pipe(
          map((data) => heroActions.addHeroSuccess()),
          catchError(() => {
            heroActions.getHerosError({
              code: 1500,
              info: '',
            });
            return EMPTY;
          }),
        ),
      ),
    );
  });

  updateHeroe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(heroActions.updateHero),
      exhaustMap((val: HeroI) =>
        this.heroService.updateHero(val).pipe(
          map((data) => heroActions.updateHeroSuccess()),
          catchError(() => {
            heroActions.getHerosError({
              code: 1500,
              info: '',
            });
            return EMPTY;
          }),
        ),
      ),
    );
  });

  deleteHeroe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(heroActions.deleteHero),
      exhaustMap((data: { id: number }) =>
        this.heroService.deleteHero(data.id).pipe(
          map((_data) => heroActions.deleteHeroSuccess()),
          catchError(() => {
            heroActions.getHerosError({
              code: 1500,
              info: '',
            });
            return EMPTY;
          }),
        ),
      ),
    );
  });
}
