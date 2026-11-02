import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HeroI } from '../interface/hero.interface';
import { genericErrorI } from '../interface/hero.store.interface';

export const heroActions = createActionGroup({
  source: 'Hero',
  events: {
    Restart: emptyProps(),
    'Get Heroes': emptyProps(),
    'Get Heroes Success': props<{ data: HeroI[] }>(),
    'Get Heroes Error': props<genericErrorI>(),

    'Filter Heroes': props<{ data: string }>(),
    'Filter Heroes Success': props<{ data: HeroI[] }>(),
    'Filter Heroes Error': props<genericErrorI>(),

    'Add Hero': props<{ data: HeroI }>(),
    'Add Hero Success': emptyProps(),
    'Add Hero Error': props<genericErrorI>(),

    'Update Hero': props<{ data: HeroI }>(),
    'Update Hero Success': emptyProps(),
    'Update Hero Error': props<genericErrorI>(),

    'Delete Hero': props<{ data: number }>(),
    'Delete Hero Success': emptyProps(),
    'Delete Hero Error': props<genericErrorI>(),
  },
});
