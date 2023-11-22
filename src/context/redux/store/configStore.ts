// store.ts
// configureStore.ts
import { configureStore } from "@reduxjs/toolkit"
// import createSagaMiddleware from "redux-saga"
import rootReducer from "../reducers"
// import rootSaga from "../sagas"

// const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

// sagaMiddleware.run(rootSaga)

export default store
