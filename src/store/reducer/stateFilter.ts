import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateFilterType = {
  search: string
  pageNumber: number
  pageSize: number
  id_golongan: string
  id_organisasi: string
  jabatan: string
}

const initialState: StateFilterType = {
  search: '',
  pageNumber: 1,
  pageSize: 10,
  id_golongan: '',
  id_organisasi: '',
  jabatan: '',
}

const stateFilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStateFilter: (state, action: PayloadAction<StateFilterType>) => {
      const {
        search,
        pageNumber,
        pageSize,
        id_golongan,
        id_organisasi,
        jabatan,
      } = action.payload
      state.search = search
      state.pageNumber = pageNumber
      state.pageSize = pageSize
      state.id_golongan = id_golongan
      state.id_organisasi = id_organisasi
      state.jabatan = jabatan
    },
  },
})

export const { setStateFilter } = stateFilterSlice.actions

export const getFilterSlice = (state: { stateFilter: StateFilterType }) =>
  state.stateFilter

export default stateFilterSlice.reducer
