import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  serviceGet,
  servicePost,
  serviceGetWithSlug,
  servicePutWithSlug,
  serviceDeleteWithSlug
} from '@/services/_config'

const GetAllAdmin = createAsyncThunk(
  'get/adminManagement',
  async (payload, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}users/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const CreateAdmin = createAsyncThunk(
  'post/adminManagement',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}users/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const GetDetailAdmin = createAsyncThunk(
  'get/adminDetail',
  async (id, { rejectWithValue }) => {
    return serviceGetWithSlug(`${process.env.NEXT_PUBLIC_API_URL}users`)(
      id
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const UpdateAdmin = createAsyncThunk(
  'put/adminManagement',
  async (body, { rejectWithValue }) => {
    const { id, payload } = body
    return servicePutWithSlug(`${process.env.NEXT_PUBLIC_API_URL}users`)(
      id,
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const DeleteAdmin = createAsyncThunk(
  'delete/adminManagement',
  async (id, { rejectWithValue }) => {
    return serviceDeleteWithSlug(`${process.env.NEXT_PUBLIC_API_URL}users`)(
      id
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

export default {
  GetAllAdmin,
  CreateAdmin,
  GetDetailAdmin,
  UpdateAdmin,
  DeleteAdmin
}
