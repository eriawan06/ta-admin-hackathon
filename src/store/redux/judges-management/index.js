import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Judges } from '@/store/service'

const initialState = {
  dataJudges: [],
  loadingJudges: false,
  detailJudges: { name: '' }
}

export const judgesSlice = createSlice({
  name: 'judges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action
      }
    })

    // Get all judges
    builder.addCase(Judges.GetAllJudges.pending, (state) => {
      state.loadingJudges = true
    })
    builder.addCase(Judges.GetAllJudges.fulfilled, (state, action) => {
      state.loadingJudges = false
      state.dataJudges = action.payload.data
    })
    builder.addCase(Judges.GetAllJudges.rejected, (state) => {
      state.loadingJudges = false
    })

    // Create new judges
    builder.addCase(Judges.CreateJudges.pending, (state) => {
      state.loadingJudges = true
    })
    builder.addCase(Judges.CreateJudges.fulfilled, (state) => {
      state.loadingJudges = false
    })
    builder.addCase(Judges.CreateJudges.rejected, (state) => {
      state.loadingJudges = false
    })

    // Get detail judges
    builder.addCase(Judges.GetJudgesDetail.pending, (state) => {
      state.loadingJudges = true
      state.detailJudges = { name: '' }
    })
    builder.addCase(Judges.GetJudgesDetail.fulfilled, (state, action) => {
      state.loadingJudges = false
      state.detailJudges = action.payload.data
    })
    builder.addCase(Judges.GetJudgesDetail.rejected, (state) => {
      state.loadingJudges = false
    })

    // Delete judges
    builder.addCase(Judges.DeleteJudges.pending, (state) => {
      state.loadingJudges = true
    })
    builder.addCase(Judges.DeleteJudges.fulfilled, (state) => {
      state.loadingJudges = false
    })
    builder.addCase(Judges.DeleteJudges.rejected, (state) => {
      state.loadingJudges = false
    })

    // Update judges
    builder.addCase(Judges.UpdateJudges.pending, (state) => {
      state.loadingJudges = true
    })
    builder.addCase(Judges.UpdateJudges.fulfilled, (state) => {
      state.loadingJudges = false
    })
    builder.addCase(Judges.UpdateJudges.rejected, (state) => {
      state.loadingJudges = false
    })
  }
})

export default judgesSlice.reducer
