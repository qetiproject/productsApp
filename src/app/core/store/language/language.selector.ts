import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LanguageState } from './language.state';

export const selectLanguageFeature = createFeatureSelector<LanguageState>('language');

export const selectCurrentLanguage = createSelector(
  selectLanguageFeature,
  (state: LanguageState) => state.currentLang
);
