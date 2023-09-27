import { createSlice } from '@reduxjs/toolkit'
import { Global } from '@/store/service'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  loading: false,
  occupation: []
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action
      }
    })

    // Get occupation
    builder.addCase(Global.GetOccupation.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Global.GetOccupation.fulfilled, (state, action) => {
      state.loading = false
      state.occupation = action.payload.data
    })
    builder.addCase(Global.GetOccupation.rejected, (state) => {
      state.loading = false
    })
  }
})

export default globalSlice.reducer
