// // authSaga.ts
// import { call, put, takeLatest } from "redux-saga/effects"
// import { ActionDLogout, ActionDLogin } from "../reducers/auth"

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

// function* loginSaga(action: ReturnType<typeof ActionDLogin>) {
//   // Using the call effect to handle async operations
//   yield call(delay, 100)

//   // Dispatch the original action to update the store
//   yield put(ActionDLogin(action.payload))
// }

// function* logoutSaga(action: ReturnType<typeof ActionDLogin>) {
//   yield put(ActionDLogout())
// }

// //! WATCHERS
// export function* authSaga() {
//   yield takeLatest(ActionDLogin.type, loginSaga)
//   yield takeLatest(ActionDLogout.type, logoutSaga)
// }
