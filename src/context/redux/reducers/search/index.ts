import { combineReducers } from "@reduxjs/toolkit"
import searchmenu, { SearchmenuState } from "./searchmenuSlice"

const reducer = combineReducers({
  searchmenu,
})

export type SearchState = {
  searchmenu: SearchmenuState
}

export * from "./searchmenuSlice"

export default reducer
