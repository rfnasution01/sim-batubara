import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateSearchType = {
  query: string
}

const initialState: StateSearchType = {
  query: '',
}

const stateSearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setStateSearch: (state, action: PayloadAction<StateSearchType>) => {
      const { query } = action.payload
      state.query = query
    },
  },
})

export const { setStateSearch } = stateSearchSlice.actions

export const getSearchSlice = (state: { stateSearch: StateSearchType }) =>
  state.stateSearch

export default stateSearchSlice.reducer
