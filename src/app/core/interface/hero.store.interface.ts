import { HeroI } from './hero.interface';

export interface HeroState {
  getHeroes: vectorControlState<HeroI>;
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
