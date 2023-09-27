import { createAsyncThunk } from '@reduxjs/toolkit'
import { servicePostWithoutAuth, servicePut } from '@/services/_config'

const login = createAsyncThunk(
  'post/login',
  async (payload, { rejectWithValue }) => {
    return servicePostWithoutAuth(
      `${process.env.NEXT_PUBLIC_API_URL}auth/login/admin`
    )(payload).catch((err) => rejectWithValue(err.response.data))
  }
)

const ChangePassword = createAsyncThunk(
  'put/changePassword',
  async (payload, { rejectWithValue }) => {
    return servicePut(
      `${process.env.NEXT_PUBLIC_API_URL}users/change-password`
    )(payload).catch((err) => rejectWithValue(err.response.data))
  }
)

const SendVerificationCode = createAsyncThunk(
  `post/getVerificationCode`,
  async (payload, { rejectWithValue }) => {
    return servicePostWithoutAuth(
      `${process.env.NEXT_PUBLIC_API_URL}auth/get-verification-code`
    )(payload).catch((err) => rejectWithValue(err.response.data))
  }
)

const CheckVerificationCode = createAsyncThunk(
  'post/validateVerification',
  async (code, { rejectWithValue }) => {
    return servicePostWithoutAuth(
      `${process.env.NEXT_PUBLIC_API_URL}auth/validate-verification-code`
    )(code).catch((err) => rejectWithValue(err.response.data))
  }
)

const ForgotPassword = createAsyncThunk(
  'post/setNewPassword',
  async (payload, { rejectWithValue }) => {
    return servicePostWithoutAuth(
      `${process.env.NEXT_PUBLIC_API_URL}auth/forgot-password`
    )(payload).catch((err) => rejectWithValue(err.response.data))
  }
)

export default {
  login,
  ChangePassword,
  SendVerificationCode,
  CheckVerificationCode,
  ForgotPassword
}
