export interface LanguageState {
  currentLang: CurrentLangEnum;
}

export enum CurrentLangEnum {
  'Ka' = 'ka',
  'En' ='en'
}
export const initialLanguageState: LanguageState = {
  currentLang: CurrentLangEnum.Ka,
};
