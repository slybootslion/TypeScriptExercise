import i18n from 'i18next'
import { ADD_LANGUAGE, CHANGE_LANGUAGE, LanguageActionTypes } from "./languageActions";

export interface LanguageState {
  language: 'zh' | 'en',
  languageList: { name: string, code: string }[]
}

const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    {name: '中文', code: 'zh'},
    {name: 'English', code: 'en'},
  ]
}

export default function (state = defaultState, action: LanguageActionTypes) {
  if (action.type === CHANGE_LANGUAGE) {
    i18n.changeLanguage(action.payload)
    return {
      ...state,
      language: action.payload
    }
  }
  if (action.type === ADD_LANGUAGE) {
    return {
      ...state,
      languageList: [
        ...state.languageList,
        action.payload
      ]

    }
  }
  return state
}
