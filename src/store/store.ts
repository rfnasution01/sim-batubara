import { configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import stateFilter from './reducer/stateFilter'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    stateFilter: stateFilter,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
