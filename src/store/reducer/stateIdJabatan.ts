import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateIdJabatanType = {
  id: string
}

const initialState: StateIdJabatanType = {
  id: null,
}

const stateIdJabatanSlice = createSlice({
  name: 'idJabatan',
  initialState,
  reducers: {
    setStateIdJabatan: (state, action: PayloadAction<StateIdJabatanType>) => {
      const { id } = action.payload
      state.id = id
    },
  },
})

export const { setStateIdJabatan } = stateIdJabatanSlice.actions

export const getIdJabatanSlice = (state: {
  stateIdJabatan: StateIdJabatanType
}) => state.stateIdJabatan

export default stateIdJabatanSlice.reducer
