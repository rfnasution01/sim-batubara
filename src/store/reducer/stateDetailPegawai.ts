import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateDetailPegawaiType = {
  tab: string
}

const initialState: StateDetailPegawaiType = {
  tab: null,
}

const stateDetailPegawaiSlice = createSlice({
  name: 'detailPegawai',
  initialState,
  reducers: {
    setStateDetailPegawai: (
      state,
      action: PayloadAction<StateDetailPegawaiType>,
    ) => {
      const { tab } = action.payload
      state.tab = tab
    },
  },
})

export const { setStateDetailPegawai } = stateDetailPegawaiSlice.actions

export const getDetailPegawaiSlice = (state: {
  stateDetailPegawai: StateDetailPegawaiType
}) => state.stateDetailPegawai

export default stateDetailPegawaiSlice.reducer
