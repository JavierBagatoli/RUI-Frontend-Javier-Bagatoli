import { HeroI } from './hero.interface';
import { paginationRequest } from './pagination.interface';

export interface HeroState {
  paginationHeroes: paginationRequest;
  getHeroes: dataControlState<pagination<HeroI>>;
  addHero: dataControlState<HeroI>;
  updateHero: dataControlState<HeroI>;
  deleteHero: dataControlState<HeroI>;
}

export interface vectorControlState<T> {
  data: T[];
  loading: boolean;
  error: genericErrorI | null;
}

export interface dataControlState<T> {
  data: T | null;
  loading: boolean;
  error: genericErrorI | null;
}

export interface genericErrorI {
  code: number;
  info: string;
}

export interface genericAction<T> {
  type: string;
  data: T;
}

export interface pagination<T> {
  vector: T[];
  size: number;
}
