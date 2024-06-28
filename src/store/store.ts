import { configureStore } from '@reduxjs/toolkit'

import { api } from './api'
import stateFilter from './reducer/stateFilter'
import stateDetailPegawai from './reducer/stateDetailPegawai'
import stateDetailRiwayat from './reducer/stateDetailRiwayat'
import stateIdPegawai from './reducer/stateIdPegawai'
import stateIdJabatan from './reducer/stateIdJabatan'
import stateSearch from './reducer/stateSearch'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    stateFilter: stateFilter,
    stateDetailPegawai: stateDetailPegawai,
    stateIdPegawai: stateIdPegawai,
    stateDetailRiwayat: stateDetailRiwayat,
    stateIdJabatan: stateIdJabatan,
    stateSearch: stateSearch,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
