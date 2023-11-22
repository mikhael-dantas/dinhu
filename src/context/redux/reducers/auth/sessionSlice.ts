import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SLICE_BASE_NAME } from "./constants"
import { PERSIST_STORE_NAME } from "@/constants/app.constant"

export interface SessionState {
  signedIn: boolean
  token: string | null
}

const initialState: SessionState = {
  signedIn: false,
  token: "",
}

const sessionSlice = createSlice({
  name: `${SLICE_BASE_NAME}/session`,
  initialState,
  reducers: {
    signInSuccess(state, action: PayloadAction<string>) {
      state.signedIn = true
      state.token = action.payload

      localStorage.setItem(PERSIST_STORE_NAME + ".token", action.payload)
    },
    signOutSuccess(state) {
      state.signedIn = false
      state.token = null

      localStorage.removeItem(PERSIST_STORE_NAME + ".token")
      localStorage.removeItem(PERSIST_STORE_NAME + ".user")
    },
  },
})

export const { signInSuccess, signOutSuccess } = sessionSlice.actions
export default sessionSlice.reducer
