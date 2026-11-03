import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, firstValueFrom, throwError, defaultIfEmpty } from 'rxjs';
import { heroService } from '../service/hero.service';
import { heroActions } from '../action/hero.action';
import { HeroI } from '../interface/hero.interface';
import { pagination } from '../interface/hero.store.interface';
import { HeroEffects } from './hero.effect';
import { provideZonelessChangeDetection } from '@angular/core';
import { Action } from '@ngrx/store';

describe('HeroEffects', () => {
  let actions$: Observable<any>;
  let effects: HeroEffects;
  let heroServiceSpy: jasmine.SpyObj<heroService>;

  const success = { code: 200, info: 'success' };
  const newHero: HeroI = {
    name: 'Super',
    state: true,
    age: 30,
    description: 'Esta es la descripcion',
    id: null,
    power: 'Volar',
  };

  const mockPagination = {} as pagination<HeroI>;
  const mockRequest = {} as any;

  beforeEach(() => {
    heroServiceSpy = jasmine.createSpyObj('heroService', [
      'getHeroes',
      'getFilteredHeroes',
      'addHero',
      'updateHero',
      'deleteHero',
    ]);

    TestBed.configureTestingModule({
      providers: [
        HeroEffects,
        provideMockActions(() => actions$),
        {
          provide: heroService,
          useValue: heroServiceSpy,
        },
        provideZonelessChangeDetection(),
      ],
    });

    effects = TestBed.inject(HeroEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('Get Heroes', () => {
    it('should call getHeroes when getHeroes action is dispatched', async () => {
      actions$ = of(heroActions.getHeroes({ data: mockRequest }));

      heroServiceSpy.getHeroes.and.returnValue(of(mockPagination));

      await firstValueFrom(effects.loadHeroes$);

      expect(heroServiceSpy.getHeroes).toHaveBeenCalledOnceWith(mockRequest);
    });

    it('should return getHeroesSuccess action is dispatched', async () => {
      actions$ = of(heroActions.getHeroes({ data: mockRequest }));

      heroServiceSpy.getHeroes.and.returnValue(of(mockPagination));

      await firstValueFrom(effects.loadHeroes$);

      expect(heroServiceSpy.getHeroes).toHaveBeenCalledOnceWith(mockRequest);
    });

    it('should return getHeroes with size and page', async () => {
      actions$ = of(heroActions.addHeroSuccess());

      heroServiceSpy.getHeroes.and.returnValue(of(mockPagination));

      const result = await firstValueFrom(effects.autoLoad$);

      expect(result).toEqual(
        heroActions.getHeroesSuccess({
          data: mockPagination,
        }),
      );
    });
  });

  describe('Fitered Heroes', () => {
    it('should call getHeroes when getHeroes action is dispatched', async () => {
      actions$ = of(heroActions.filterHeroes({ data: mockRequest }));

      heroServiceSpy.getFilteredHeroes.and.returnValue(of(mockPagination));

      await firstValueFrom(effects.getFilteredHeroes$);

      expect(heroServiceSpy.getFilteredHeroes).toHaveBeenCalledOnceWith(mockRequest);
    });

    it('should return filterHeroesSuccess when service succeeds', async () => {
      actions$ = of(heroActions.filterHeroes({ data: mockRequest }));

      heroServiceSpy.getFilteredHeroes.and.returnValue(of(mockPagination));

      const result = await firstValueFrom(effects.getFilteredHeroes$);

      expect(result).toEqual(heroActions.filterHeroesSuccess({ data: mockPagination }));
    });
  });

  describe('Add Heroe', () => {
    const objToTest = newHero;
    const resultSuccess = success;

    it('should call addHeroe when getHeroes action is dispatched', async () => {
      actions$ = of(heroActions.addHero({ data: objToTest }));

      heroServiceSpy.addHero.and.returnValue(of(resultSuccess));

      await firstValueFrom(effects.addHero$);

      expect(heroServiceSpy.addHero).toHaveBeenCalledOnceWith(objToTest);
    });

    it('should return addHeroSuccess when service succeeds', async () => {
      actions$ = of(heroActions.addHero({ data: objToTest }));

      heroServiceSpy.addHero.and.returnValue(of(resultSuccess));

      const result = await firstValueFrom(effects.addHero$);

      expect(result).toEqual(heroActions.addHeroSuccess());
    });
  });

  describe('Update Heroe', () => {
    const objToTest = { ...newHero, id: 2 };
    const resultSuccess = success;

    it('should call updateHero when getHeroes action is dispatched', async () => {
      actions$ = of(heroActions.updateHero({ data: objToTest }));

      heroServiceSpy.updateHero.and.returnValue(of(resultSuccess));

      await firstValueFrom(effects.updateHero$);

      expect(heroServiceSpy.updateHero).toHaveBeenCalledOnceWith(objToTest);
    });

    it('should return updateHeroSuccess when service succeeds', async () => {
      actions$ = of(heroActions.updateHero({ data: objToTest }));

      heroServiceSpy.updateHero.and.returnValue(of(resultSuccess));

      const result = await firstValueFrom(effects.updateHero$);

      expect(result).toEqual(heroActions.updateHeroSuccess());
    });
  });

  describe('Delete Heroe', () => {
    const objToTest = 2;
    const resultSuccess = success;

    it('should call deleteHero when getHeroes action is dispatched', async () => {
      actions$ = of(heroActions.deleteHero({ data: objToTest }));

      heroServiceSpy.deleteHero.and.returnValue(of(resultSuccess));

      await firstValueFrom(effects.deleteHeroe$);

      expect(heroServiceSpy.deleteHero).toHaveBeenCalledOnceWith(objToTest);
    });

    it('should return deleteHeroSuccess when service succeeds', async () => {
      actions$ = of(heroActions.deleteHero({ data: objToTest }));

      heroServiceSpy.deleteHero.and.returnValue(of(resultSuccess));

      const result = await firstValueFrom(effects.deleteHeroe$);

      expect(result).toEqual(heroActions.deleteHeroSuccess());
    });
  });
});
