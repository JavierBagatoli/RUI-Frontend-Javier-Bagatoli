import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HeroI } from '../interface/hero.interface';

export const heroActions = createActionGroup({
  source: 'Hero',
  events: {
    Restart: emptyProps(),
    'Get Heros': emptyProps(),
    'Add Hero': props<HeroI>(),
    'Update Hero': props<HeroI>(),
    'Delete Hero': props<{ id: number }>(),
  },
});
