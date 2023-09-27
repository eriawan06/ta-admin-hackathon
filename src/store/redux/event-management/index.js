import { createSlice } from '@reduxjs/toolkit'
import { Event } from '@/store/service'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  loading: false,
  eventList: [],
  eventDetail: [],
  eventAssessment: [],
  eventMentor: [],
  eventJudges: []
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.auth
      }
    })
    // Get List :
    builder.addCase(Event.GetEventList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.GetEventList.fulfilled, (state, action) => {
      state.eventList = action.payload.data
      state.loading = false
    })
    builder.addCase(Event.GetEventList.rejected, (state) => {
      state.loading = false
    })
    // Get Detail :
    builder.addCase(Event.GetEventDetail.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.GetEventDetail.fulfilled, (state, action) => {
      state.eventDetail = action.payload.data.data
      state.loading = false
    })
    builder.addCase(Event.GetEventDetail.rejected, (state) => {
      state.loading = false
    })
    // Get Event Assessment :
    builder.addCase(Event.GetEventAssessment.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.GetEventAssessment.fulfilled, (state, action) => {
      state.eventAssessment = action.payload.data.data
      state.loading = false
    })
    builder.addCase(Event.GetEventAssessment.rejected, (state) => {
      state.loading = false
    })
    // Create Event :
    builder.addCase(Event.CreateEvent.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.CreateEvent.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Event.CreateEvent.rejected, (state) => {
      state.loading = false
    })
    // Edit Event :
    builder.addCase(Event.EditEvent.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.EditEvent.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Event.EditEvent.rejected, (state) => {
      state.loading = false
    })
    // Delete Event  :
    builder.addCase(Event.DeleteEvent.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.DeleteEvent.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Event.DeleteEvent.rejected, (state) => {
      state.loading = false
    })

    // MENTOR CARDS SECTION ==============================
    // Get Event Mentor :
    builder.addCase(Event.GetEventMentor.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.GetEventMentor.fulfilled, (state, action) => {
      state.loading = false
      state.eventMentor = action.payload.data.data
    })
    builder.addCase(Event.GetEventMentor.rejected, (state) => {
      state.loading = false
    })
    // Create Event Mentor :
    builder.addCase(Event.CreateEventMentor.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.CreateEventMentor.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Event.CreateEventMentor.rejected, (state) => {
      state.loading = false
    })
    // Delete Event Mentor :
    builder.addCase(Event.DeleteEventMentor.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.DeleteEventMentor.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Event.DeleteEventMentor.rejected, (state) => {
      state.loading = false
    })

    // JUDGES CARDS SECTION ==============================
    // Get Event Judges :
    builder.addCase(Event.GetEventJudges.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.GetEventJudges.fulfilled, (state, action) => {
      state.eventJudges = action.payload.data.data
      state.loading = false
    })
    builder.addCase(Event.GetEventJudges.rejected, (state) => {
      state.loading = false
    })
    // Create Event Judge :
    builder.addCase(Event.CreateEventJudge.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.CreateEventJudge.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Event.CreateEventJudge.rejected, (state) => {
      state.loading = false
    })
    // Delete Event Judge :
    builder.addCase(Event.DeleteEventJudge.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.DeleteEventJudge.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Event.DeleteEventJudge.rejected, (state) => {
      state.loading = false
    })

    // TIMELINES CARDS SECTION ==============================
    // Create Event Timeline :
    builder.addCase(Event.CreateEventTimeline.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.CreateEventTimeline.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Event.CreateEventTimeline.rejected, (state) => {
      state.loading = false
    })
    // Edit Event Timeline :
    builder.addCase(Event.EditEventTimeline.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.EditEventTimeline.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Event.EditEventTimeline.rejected, (state) => {
      state.loading = false
    })
    // Delete Event Timeline :
    builder.addCase(Event.DeleteEventTimeline.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Event.DeleteEventTimeline.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Event.DeleteEventTimeline.rejected, (state) => {
      state.loading = false
    })
  }
})

export default eventSlice.reducer
