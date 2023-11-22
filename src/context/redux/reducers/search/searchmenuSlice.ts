import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SLICE_BASE_NAME } from "./constants"

export type SearchmenuState = {
  substring: string
}

export const initialState: SearchmenuState = {
  substring: "",
}

export const searchmenuSlice = createSlice({
  name: `${SLICE_BASE_NAME}/searchmenu`,
  initialState,
  reducers: {
    setSubstring: (state, action: PayloadAction<string>) => {
      state.substring = action.payload
    },
  },
})

export const { setSubstring } = searchmenuSlice.actions

export default searchmenuSlice.reducer
