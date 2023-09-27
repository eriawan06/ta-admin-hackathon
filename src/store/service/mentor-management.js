import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  serviceGet,
  servicePost,
  serviceDeleteWithSlug,
  servicePutWithSlug
} from '@/services/_config'

const GetMentorList = createAsyncThunk(
  'get/mentorList',
  async (payload, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}users/mentors/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const CreateMentor = createAsyncThunk(
  'post/createMentor',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}users/mentors/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const GetMentorDetail = createAsyncThunk(
  'get/detailMentor',
  async (id, { rejectWithValue }) => {
    return serviceGet(
      `${process.env.NEXT_PUBLIC_API_URL}users/mentors/${id}`
    )().catch((err) => rejectWithValue(err.response.data))
  }
)

const DeleteMentor = createAsyncThunk(
  'delete/Mentor',
  async (id, { rejectWithValue }) => {
    return serviceDeleteWithSlug(
      `${process.env.NEXT_PUBLIC_API_URL}users/mentors`
    )(id).catch((err) => rejectWithValue(err.response.data))
  }
)

const UpdateMentor = createAsyncThunk(
  'put/mentor',
  async (payload, { rejectWithValue }) => {
    const { id, body } = payload
    return servicePutWithSlug(
      `${process.env.NEXT_PUBLIC_API_URL}users/mentors`
    )(id, body).catch((err) => rejectWithValue(err.response.data))
  }
)

export default {
  GetMentorList,
  CreateMentor,
  GetMentorDetail,
  DeleteMentor,
  UpdateMentor
}
