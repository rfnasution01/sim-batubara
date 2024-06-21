import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type StateThemeType = {
  color: string | null
}

const initialState: StateThemeType = {
  color: null,
}

const stateThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setStateTheme: (state, action: PayloadAction<StateThemeType>) => {
      const { color } = action.payload
      state.color = color
    },
  },
})

export const { setStateTheme } = stateThemeSlice.actions

export const getThemeSlice = (state: { stateTheme: StateThemeType }) =>
  state.stateTheme

export default stateThemeSlice.reducer
