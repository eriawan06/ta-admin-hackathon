import { createSlice } from '@reduxjs/toolkit'
import { Auth } from '@/store/service'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  loading: false,
  user: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.auth
      }
    })

    // Login
    builder.addCase(Auth.login.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Auth.login.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
    })
    builder.addCase(Auth.login.rejected, (state) => {
      state.loading = false
    })

    // Change password
    builder.addCase(Auth.ChangePassword.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Auth.ChangePassword.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Auth.ChangePassword.rejected, (state) => {
      state.loading = false
    })

    // Send verification code
    builder.addCase(Auth.SendVerificationCode.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Auth.SendVerificationCode.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Auth.SendVerificationCode.rejected, (state) => {
      state.loading = false
    })

    // Change password after validate
    builder.addCase(Auth.ForgotPassword.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Auth.ForgotPassword.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Auth.ForgotPassword.rejected, (state) => {
      state.loading = false
    })
  }
})

export default authSlice.reducer
