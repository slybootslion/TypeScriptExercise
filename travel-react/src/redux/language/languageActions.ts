export const CHANGE_LANGUAGE = 'changeLanguage'
export const ADD_LANGUAGE = 'addLanguage'

interface ChangLanguageAction {
  type: typeof CHANGE_LANGUAGE
  payload: 'zh' | 'en'
}

interface AddLanguageAction {
  type: typeof ADD_LANGUAGE
  payload: { name: string, code: string }
}

export type LanguageActionTypes = ChangLanguageAction | AddLanguageAction

export const changeLanguageActionCreator = (languageCode: 'zh' | 'en'): ChangLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode
  }
}

export const addLanguageActionCreator = (name: string, code: string): AddLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload: {name, code}
  }
}
