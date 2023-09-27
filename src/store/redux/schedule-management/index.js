import { createSlice } from '@reduxjs/toolkit'
import { Schedule } from '@/store/service'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  loading: false,
  scheduleList: [],
  scheduleDetail: {}
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.auth
      }
    })

    // Get all schedule
    builder.addCase(Schedule.GetScheduleList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Schedule.GetScheduleList.fulfilled, (state, action) => {
      state.loading = false
      state.scheduleList = action.payload.data
    })
    builder.addCase(Schedule.GetScheduleList.rejected, (state) => {
      state.loading = false
    })

    // Create new schedule
    builder.addCase(Schedule.CreateSchedule.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Schedule.CreateSchedule.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Schedule.CreateSchedule.rejected, (state) => {
      state.loading = false
    })

    // Get detail schedule
    builder.addCase(Schedule.DetailSchedule.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Schedule.DetailSchedule.fulfilled, (state, action) => {
      state.loading = false
      state.scheduleDetail = action.payload.data
    })
    builder.addCase(Schedule.DetailSchedule.rejected, (state) => {
      state.loading = false
    })

    // Update schedule
    builder.addCase(Schedule.UpdateSchedule.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Schedule.UpdateSchedule.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Schedule.UpdateSchedule.rejected, (state) => {
      state.loading = false
    })

    // Delete schedule
    builder.addCase(Schedule.DeleteSchedule.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Schedule.DeleteSchedule.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Schedule.DeleteSchedule.rejected, (state) => {
      state.loading = false
    })

    // Add team to schedule
    builder.addCase(Schedule.AddTeamtoSchedule.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Schedule.AddTeamtoSchedule.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Schedule.AddTeamtoSchedule.rejected, (state) => {
      state.loading = false
    })

    // Delete Team At Schedule
    builder.addCase(Schedule.DeleteTeamAtSchedule.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Schedule.DeleteTeamAtSchedule.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Schedule.DeleteTeamAtSchedule.rejected, (state) => {
      state.loading = false
    })

  }
})

export default scheduleSlice.reducer
