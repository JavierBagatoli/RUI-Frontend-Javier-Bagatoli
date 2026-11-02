import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HeroI } from '../interface/hero.interface';
import { genericErrorI, pagination } from '../interface/hero.store.interface';

export const heroActions = createActionGroup({
  source: 'Hero',
  events: {
    Restart: emptyProps(),
    'Set Pagination': props<paginationRequest>(),

    'Get Heroes': props<{ data: paginationRequest }>(),
    'Get Heroes Success': props<{ data: pagination<HeroI> }>(),
    'Get Heroes Error': props<genericErrorI>(),

    'Filter Heroes': props<{ data: string }>(),
    'Filter Heroes Success': props<{ data: pagination<HeroI> }>(),
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

export interface paginationRequest {
  index: number;
  size: number;
}
