import { createReducer, on } from '@ngrx/store';
import { heroActions } from '../action/hero.action';
import { HeroeState } from '../interface/hero.store.interface';

export const initialState: HeroeState = {
  data: [],
};

export const taskReducer = createReducer(
  initialState,
  on(heroActions.restart, () => {
    return initialState;
  }),

  on(heroActions.getHeros, (state) => {
    return {
      ...state,
      data: [],
    };
  }),

  on(heroActions.addHero, (state) => {
    return {
      ...state,
      data: [],
    };
  }),

  on(heroActions.updateHero, (state) => {
    return {
      ...state,
      data: [],
    };
  }),

  on(heroActions.deleteHero, (state) => {
    return {
      ...state,
      data: [],
    };
  }),
);
