import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateIdPegawaiType = {
  id: string
}

const initialState: StateIdPegawaiType = {
  id: null,
}

const stateIdPegawaiSlice = createSlice({
  name: 'idPegawai',
  initialState,
  reducers: {
    setStateIdPegawai: (state, action: PayloadAction<StateIdPegawaiType>) => {
      const { id } = action.payload
      state.id = id
    },
  },
})

export const { setStateIdPegawai } = stateIdPegawaiSlice.actions

export const getIdPegawaiSlice = (state: {
  stateIdPegawai: StateIdPegawaiType
}) => state.stateIdPegawai

export default stateIdPegawaiSlice.reducer
