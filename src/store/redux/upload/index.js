import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Upload } from '@/store/service'

const initialState = {
  data: [],
  loading: false
}

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action
      }
    })

    builder.addCase(Upload.UploadProfileJudges.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Upload.UploadProfileJudges.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload.data
    })
    builder.addCase(Upload.UploadProfileJudges.rejected, (state) => {
      state.loading = false
    })
  }
})

export default uploadSlice.reducer
