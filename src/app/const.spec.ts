import { HeroState } from './core/interface/hero.store.interface';

const PAGINATION_CLEAN = {
  vector: [],
  size: 0,
};

export const MOCK_STORE_HERO: HeroState = {
  paginationHeroes: {
    index: 0,
    size: 5,
  },
  getHeroes: {
    data: PAGINATION_CLEAN,
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
