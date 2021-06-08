import i18n from 'i18next'

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

export default function (state = defaultState, action) {
  if (action.type === 'changeLanguage') {
    i18n.changeLanguage(action.payload)
    return {
      ...state,
      language: action.payload
    }
  }
  if (action.type === 'addLanguage') {
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
