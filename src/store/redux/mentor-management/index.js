import { createSlice } from '@reduxjs/toolkit'
import { Mentor } from '@/store/service'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  dataMentor: [],
  loadingMentor: false,
  detailMentor: { name: '' }
}

export const mentorSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.auth
      }
    })

    // Get all mentors
    builder.addCase(Mentor.GetMentorList.pending, (state) => {
      state.loadingMentor = true
    })
    builder.addCase(Mentor.GetMentorList.fulfilled, (state, action) => {
      state.loadingMentor = false
      state.dataMentor = action.payload.data
    })
    builder.addCase(Mentor.GetMentorList.rejected, (state) => {
      state.loadingMentor = false
    })

    // Create new mentors
    builder.addCase(Mentor.CreateMentor.pending, (state) => {
      state.loadingMentor = true
    })
    builder.addCase(Mentor.CreateMentor.fulfilled, (state) => {
      state.loadingMentor = false
    })
    builder.addCase(Mentor.CreateMentor.rejected, (state) => {
      state.loadingMentor = false
    })

    // Get detail mentors
    builder.addCase(Mentor.GetMentorDetail.pending, (state) => {
      state.loadingMentor = true
      state.detailMentor = { name: '' }
    })
    builder.addCase(Mentor.GetMentorDetail.fulfilled, (state, action) => {
      state.loadingMentor = false
      state.detailMentor = action.payload.data
    })
    builder.addCase(Mentor.GetMentorDetail.rejected, (state) => {
      state.loadingMentor = false
    })

    // Delete mentors
    builder.addCase(Mentor.DeleteMentor.pending, (state) => {
      state.loadingMentor = true
    })
    builder.addCase(Mentor.DeleteMentor.fulfilled, (state) => {
      state.loadingMentor = false
    })
    builder.addCase(Mentor.DeleteMentor.rejected, (state) => {
      state.loadingMentor = false
    })

    // Update mentors
    builder.addCase(Mentor.UpdateMentor.pending, (state) => {
      state.loadingMentor = true
    })
    builder.addCase(Mentor.UpdateMentor.fulfilled, (state) => {
      state.loadingMentor = false
    })
    builder.addCase(Mentor.UpdateMentor.rejected, (state) => {
      state.loadingMentor = false
    })
  }
})

export default mentorSlice.reducer
