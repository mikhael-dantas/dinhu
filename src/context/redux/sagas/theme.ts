// // authSaga.ts
// import { call, put, takeLatest } from "redux-saga/effects"
// import { ActionDToggleTheme } from "../reducers/theme"

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

// function* toggleThemeSaga(action: ReturnType<typeof ActionDToggleTheme>) {
//   // Using the call effect to handle async operations
//   yield call(delay, 100)

//   // Dispatch the original action to update the store
//   yield put(ActionDToggleTheme(action.payload))
// }

// //! WATCHERS
// export function* themeSaga() {
//   yield takeLatest(ActionDToggleTheme.type, toggleThemeSaga)
// }
