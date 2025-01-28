import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { genericApi } from '../service/generic'
import itemSelectionReducer from '../store/itemSelectionSlice'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [genericApi.reducerPath]: genericApi.reducer,
    itemSelected: itemSelectionReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(genericApi.middleware),
})

setupListeners(store.dispatch)

// Infer the `RootState` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch