import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SLICE_BASE_NAME } from "./constants"
import { User } from "@/server/modules/user/user.entity"
import { PERSIST_STORE_NAME } from "@/constants/app.constant"

export type UserState = Omit<User, "password" | "sys_blocked">

const initialState: UserState = {
  id: "",
  nome: "",
  email: "",
  conta: "",
  authority: [],
}

const userSlice = createSlice({
  name: `${SLICE_BASE_NAME}/user`,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload?.id
      state.nome = action.payload?.nome
      state.email = action.payload?.email
      state.conta = action.payload?.conta
      state.authority = action.payload.authority

      localStorage.setItem(PERSIST_STORE_NAME + ".user", JSON.stringify(action.payload))
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
