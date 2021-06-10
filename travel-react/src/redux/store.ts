import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import { actionLog } from './middlewares/actionLog'
import { productDetailSlice } from './productDetail/slice'
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/slice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  whitelist: ['user'],
  storage
}

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  user: userSlice.reducer
})

const persistReducerS = persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog))
const store = configureStore({
  reducer: persistReducerS,
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), actionLog],
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export default {store, persistor}
