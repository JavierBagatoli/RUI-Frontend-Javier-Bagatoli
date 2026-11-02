import { createReducer, on } from '@ngrx/store';
import { heroActions } from '../action/hero.action';
import { HeroState } from '../interface/hero.store.interface';

export const initialState: HeroState = {
  getHeroes: {
    data: [],
    loading: false,
    error: null,
  },
  addHero: {
    data: null,
    loading: false,
    error: null,
  },
  updateHero: {
    data: null,
    loading: false,
    error: null,
  },
  deleteHero: {
    data: null,
    loading: false,
    error: null,
  },
};

export const heroReducer = createReducer(
  initialState,
  on(heroActions.restart, () => {
    return initialState;
  }),

  on(heroActions.getHeroes, (state): HeroState => {
    return {
      ...state,
      getHeroes: {
        data: [],
        error: null,
        loading: true,
      },
    };
  }),

  on(heroActions.getHeroesSuccess, (state, { data }): HeroState => {
    return {
      ...state,
      getHeroes: {
        data: data,
        error: null,
        loading: false,
      },
    };
  }),

  on(heroActions.getHeroesError, (state, { ...genericErrorI }): HeroState => {
    return {
      ...state,
      getHeroes: {
        data: [],
        error: genericErrorI,
        loading: false,
      },
    };
  }),

  on(heroActions.filterHeroes, (state): HeroState => {
    return {
      ...state,
      getHeroes: {
        data: [],
        error: null,
        loading: true,
      },
    };
  }),

  on(heroActions.filterHeroesSuccess, (state, { data }): HeroState => {
    return {
      ...state,
      getHeroes: {
        data: data,
        error: null,
        loading: false,
      },
    };
  }),

  on(heroActions.filterHeroesError, (state, { ...genericErrorI }): HeroState => {
    return {
      ...state,
      getHeroes: {
        data: [],
        error: genericErrorI,
        loading: false,
      },
    };
  }),

  on(heroActions.addHero, (state): HeroState => {
    return {
      ...state,
    };
  }),

  on(heroActions.addHeroSuccess, (state): HeroState => {
    return {
      ...state,
      getHeroes: {
        data: [],
        error: null,
        loading: true,
      },
    };
  }),

  on(heroActions.addHeroError, (state): HeroState => {
    return {
      ...state,
    };
  }),

  on(heroActions.updateHero, (state): HeroState => {
    return {
      ...state,
    };
  }),

  on(heroActions.updateHeroSuccess, (state): HeroState => {
    return {
      ...state,
      getHeroes: {
        data: [],
        error: null,
        loading: true,
      },
    };
  }),

  on(heroActions.updateHeroError, (state): HeroState => {
    return {
      ...state,
    };
  }),

  on(heroActions.deleteHero, (state): HeroState => {
    return {
      ...state,
    };
  }),

  on(heroActions.deleteHeroSuccess, (state): HeroState => {
    return {
      ...state,
      getHeroes: {
        data: [],
        error: null,
        loading: true,
      },
    };
  }),

  on(heroActions.deleteHeroError, (state): HeroState => {
    return {
      ...state,
    };
  }),
);
