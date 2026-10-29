import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HeroeState } from '../interface/hero.store.interface';

export const selectHeroState = createFeatureSelector<HeroeState>('Hero');

export const selectHeroData = createSelector(selectHeroState, (state) => state.data);
