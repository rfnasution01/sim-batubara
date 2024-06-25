import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateDetailRiwayatType = {
  tab: string
}

const initialState: StateDetailRiwayatType = {
  tab: null,
}

const stateDetailRiwayatSlice = createSlice({
  name: 'detailRiwayat',
  initialState,
  reducers: {
    setStateDetailRiwayat: (
      state,
      action: PayloadAction<StateDetailRiwayatType>,
    ) => {
      const { tab } = action.payload
      state.tab = tab
    },
  },
})

export const { setStateDetailRiwayat } = stateDetailRiwayatSlice.actions

export const getDetailRiwayatSlice = (state: {
  stateDetailRiwayat: StateDetailRiwayatType
}) => state.stateDetailRiwayat

export default stateDetailRiwayatSlice.reducer
