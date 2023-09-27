import { createSlice } from '@reduxjs/toolkit'
import { Admin } from '@/store/service'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  loading: false,
  userList: [],
  detailAdmin: {}
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.auth
      }
    })

    // Get all admin
    builder.addCase(Admin.GetAllAdmin.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Admin.GetAllAdmin.fulfilled, (state, action) => {
      state.loading = false
      state.userList = action.payload.data
    })
    builder.addCase(Admin.GetAllAdmin.rejected, (state) => {
      state.loading = false
    })

    // Create admin
    builder.addCase(Admin.CreateAdmin.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Admin.CreateAdmin.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Admin.CreateAdmin.rejected, (state) => {
      state.loading = false
    })

    // Get detail admin
    builder.addCase(Admin.GetDetailAdmin.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Admin.GetDetailAdmin.fulfilled, (state, action) => {
      state.loading = false
      state.detailAdmin = action.payload.data
    })
    builder.addCase(Admin.GetDetailAdmin.rejected, (state) => {
      state.loading = false
    })

    // Update admin
    builder.addCase(Admin.UpdateAdmin.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Admin.UpdateAdmin.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Admin.UpdateAdmin.rejected, (state) => {
      state.loading = false
    })

    // Delete admin
    builder.addCase(Admin.DeleteAdmin.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Admin.DeleteAdmin.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Admin.DeleteAdmin.rejected, (state) => {
      state.loading = false
    })
  }
})

export default adminSlice.reducer
