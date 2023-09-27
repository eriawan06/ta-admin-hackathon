import { createSlice } from '@reduxjs/toolkit'
import { Team } from '@/store/service'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  loading: false,
  TeamList: [],
  TeamDetail: [],
  TeamSchedule: []
}

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.auth
      }
    })
    // Get Team List
    builder.addCase(Team.GetTeamList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Team.GetTeamList.fulfilled, (state, action) => {
      state.TeamList = action.payload.data.data
      state.loading = false
    })
    builder.addCase(Team.GetTeamList.rejected, (state) => {
      state.loading = false
    })

    // Get Team Detail
    builder.addCase(Team.GetTeamDetail.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Team.GetTeamDetail.fulfilled, (state, action) => {
      state.TeamDetail = action.payload.data.data
      state.loading = false
    })
    builder.addCase(Team.GetTeamDetail.rejected, (state) => {
      state.loading = false
    })

    // Get team member
    builder.addCase(Team.GetTeamMember.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Team.GetTeamMember.fulfilled, (state, action) => {
      state.loading = false
      state.teamMember = action.payload.data.data
    })
    builder.addCase(Team.GetTeamMember.rejected, (state) => {
      state.loading = false
    })

    // Update Status Team
    builder.addCase(Team.UpdateStatusTeam.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Team.UpdateStatusTeam.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Team.UpdateStatusTeam.rejected, (state) => {
      state.loading = false
    })

    // Get team schedule
    builder.addCase(Team.GetTeamSchedule.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Team.GetTeamSchedule.fulfilled, (state, action) => {
      state.loading = false
      state.TeamSchedule = action.payload.data.data
    })
    builder.addCase(Team.GetTeamSchedule.rejected, (state) => {
      state.loading = false
    })
  }
})

export default teamSlice.reducer
