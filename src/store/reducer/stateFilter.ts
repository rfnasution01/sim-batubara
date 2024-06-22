import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateFilterType = {
  search: string
  pageNumber: number
  pageSize: number
}

const initialState: StateFilterType = {
  search: '',
  pageNumber: 1,
  pageSize: 10,
}

const stateFilterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStateFilter: (state, action: PayloadAction<StateFilterType>) => {
      const { search, pageNumber, pageSize } = action.payload
      state.search = search
      state.pageNumber = pageNumber
      state.pageSize = pageSize
    },
  },
})

export const { setStateFilter } = stateFilterSlice.actions

export const getFilterSlice = (state: { stateFilter: StateFilterType }) =>
  state.stateFilter

export default stateFilterSlice.reducer
