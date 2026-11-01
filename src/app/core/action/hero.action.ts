import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HeroI } from '../interface/hero.interface';
import { genericErrorI } from '../interface/hero.store.interface';

export const heroActions = createActionGroup({
  source: 'Hero',
  events: {
    Restart: emptyProps(),
    'Get Heros': emptyProps(),
    'Get Heros Success': props<{ data: HeroI[] }>(),
    'Get Heros Error': props<genericErrorI>(),

    'Add Hero': props<HeroI>(),
    'Add Hero Success': emptyProps(),
    'Add Hero Error': props<genericErrorI>(),

    'Update Hero': props<HeroI>(),
    'Update Hero Success': emptyProps(),
    'Update Hero Error': props<genericErrorI>(),

    'Delete Hero': props<{ id: number }>(),
    'Delete Hero Success': emptyProps(),
    'Delete Hero Error': props<genericErrorI>(),
  },
});
