import { createSlice } from '@reduxjs/toolkit'
import { Participant } from '@/store/service'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  loading: false,
  participantList:[],
  detailParticipant:{name:''}
}

export const participantSlice = createSlice({
  name: 'participant',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.auth
      }
    })

    //get all participant
    builder.addCase(Participant.GetParticipantList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Participant.GetParticipantList.fulfilled, (state,action) => {
      state.participantList = action.payload.data
      state.loading = false
    })
    builder.addCase(Participant.GetParticipantList.rejected, (state) => {
      state.loading = false
    })
  

    //get detail participant
    builder.addCase(Participant.GetParticipantDetail.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Participant.GetParticipantDetail.fulfilled, (state,action) => {
      state.detailParticipant = action.payload.data.data
      state.loading = false
    })
    builder.addCase(Participant.GetParticipantDetail.rejected, (state) => {
      state.loading = false
    })

    // delete participant
    builder.addCase(Participant.DeleteParticipant.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Participant.DeleteParticipant.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Participant.DeleteParticipant.rejected, (state) => {
      state.loading = false
    })
  
    // update status participant
    builder.addCase(Participant.UpdateParticipantStatus.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Participant.UpdateParticipantStatus.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Participant.UpdateParticipantStatus.rejected, (state) => {
      state.loading = false
    })
  }
  
  
})

export default participantSlice.reducer
