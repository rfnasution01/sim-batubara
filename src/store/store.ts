import { configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import stateTheme from './reducer/stateTheme'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    stateTheme: stateTheme,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
