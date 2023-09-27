import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  serviceGet,
  servicePost,
  serviceDeleteWithSlug,
  servicePutWithSlug
} from '@/services/_config'

const GetAllJudges = createAsyncThunk(
  'get/allJudges',
  async (payload, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}users/judges/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const CreateJudges = createAsyncThunk(
  'post/createJudges',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}users/judges/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const GetJudgesDetail = createAsyncThunk(
  'get/detailJudges',
  async (id, { rejectWithValue }) => {
    return serviceGet(
      `${process.env.NEXT_PUBLIC_API_URL}users/judges/${id}`
    )().catch((err) => rejectWithValue(err.response.data))
  }
)

const DeleteJudges = createAsyncThunk(
  'delete/judges',
  async (id, { rejectWithValue }) => {
    return serviceDeleteWithSlug(
      `${process.env.NEXT_PUBLIC_API_URL}users/judges`
    )(id).catch((err) => rejectWithValue(err.response.data))
  }
)

const UpdateJudges = createAsyncThunk(
  'put/judges',
  async (payload, { rejectWithValue }) => {
    const { id, body } = payload
    return servicePutWithSlug(`${process.env.NEXT_PUBLIC_API_URL}users/judges`)(
      id,
      body
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

export default {
  GetAllJudges,
  CreateJudges,
  GetJudgesDetail,
  DeleteJudges,
  UpdateJudges
}
