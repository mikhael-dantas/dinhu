import { CombinedState, combineReducers } from "@reduxjs/toolkit"
import AuthReducer, { AuthState } from "./auth"
import LocaleReducer, { LocaleState } from "./locale/localeSlice"
import ThemeReducer, { ThemeState } from "./theme/themeSlice"
import BaseReducer, { BaseState } from "./base"
import SearchmenuReducer, { SearchmenuState } from "./search/searchmenuSlice"

export interface RootState {
  auth: CombinedState<AuthState>
  locale: LocaleState
  theme: ThemeState
  base: BaseState
  searchmenu: SearchmenuState
}

const rootReducer = combineReducers<RootState>({
  theme: ThemeReducer,
  auth: AuthReducer,
  locale: LocaleReducer,
  base: BaseReducer,
  searchmenu: SearchmenuReducer,
})

export default rootReducer
