import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { heroService } from '../service/hero.service';
import { heroActions } from '../action/hero.action';
import { HeroI } from '../interface/hero.interface';
import { genericAction } from '../interface/hero.store.interface';

@Injectable()
export class HeroEffects {
  private actions$ = inject(Actions);
  private heroService = inject(heroService);

  loadHeroes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        heroActions.getHeroes,
        heroActions.addHeroSuccess,
        heroActions.deleteHeroSuccess,
        heroActions.updateHeroSuccess,
      ),
      exhaustMap(() =>
        this.heroService.getHeroes().pipe(
          map(
            (data: HeroI[]) => heroActions.getHeroesSuccess({ data: data }),
            catchError(() => {
              heroActions.getHeroesError({
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
      exhaustMap((val: genericAction<HeroI>) =>
        this.heroService.addHero(val.data).pipe(
          map((data) => heroActions.addHeroSuccess()),
          catchError(() => {
            heroActions.addHeroError({
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
      exhaustMap((val: genericAction<HeroI>) =>
        this.heroService.updateHero(val.data).pipe(
          map((data) => heroActions.updateHeroSuccess()),
          catchError(() => {
            heroActions.updateHeroError({
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
      exhaustMap((val: genericAction<number>) =>
        this.heroService.deleteHero(val.data).pipe(
          map((_data) => heroActions.deleteHeroSuccess()),
          catchError(() => {
            heroActions.deleteHeroError({
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
