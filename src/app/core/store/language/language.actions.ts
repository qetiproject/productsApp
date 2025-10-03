import { createAction, props } from '@ngrx/store';
import { CurrentLangEnum } from './language.state';

export const setLanguage = createAction(
  '[Language] Set Language',
  props<{ lang: CurrentLangEnum }>()
);
