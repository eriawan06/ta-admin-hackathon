import { createSlice } from '@reduxjs/toolkit'
import { Project } from '@/store/service'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  loading: false,
  projectList: [],
  projectDetail: {}
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.auth
      }
    })

    // Get all project
    builder.addCase(Project.GetProjectList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Project.GetProjectList.fulfilled, (state, action) => {
      state.loading = false
      state.projectList = action.payload.data
    })
    builder.addCase(Project.GetProjectList.rejected, (state) => {
      state.loading = false
    })

    // Get detail project
    builder.addCase(Project.GetProjectDetail.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Project.GetProjectDetail.fulfilled, (state, action) => {
      state.loading = false
      state.projectDetail = action.payload.data
    })
    builder.addCase(Project.GetProjectDetail.rejected, (state) => {
      state.loading = false
    })
  }
})

export default projectSlice.reducer
