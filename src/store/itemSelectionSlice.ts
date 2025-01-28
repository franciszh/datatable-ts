import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ItemSelectionState {
  guid?: string
}

const initialState: ItemSelectionState = {
  guid: undefined,
}

export const itemSelectionSlice = createSlice({
  name: 'itemSelected',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.guid = action.payload
    },
  },
})

export const { update } = itemSelectionSlice.actions

export default itemSelectionSlice.reducer