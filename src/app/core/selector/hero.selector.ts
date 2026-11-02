import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeroState } from '../interface/hero.store.interface';

export const selectHeroState = createFeatureSelector<HeroState>('hero');

export const selectHeroData = createSelector(selectHeroState, (state) => state?.getHeroes);
export const selectHeroDataPagination = createSelector(
  selectHeroState,
  (state) => state?.paginationHeroes,
);
