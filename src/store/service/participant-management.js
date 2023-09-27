import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  serviceDeleteWithSlug,
  serviceGet,
  serviceGetWithSlug,
  servicePutWithSlug
} from '@/services/_config'

const GetParticipantList = createAsyncThunk(
  'get/participantList',
  async (payload, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}users/participants/`)(
      payload
      ).catch((err) => rejectWithValue(err.response.data))
  }
)

const GetParticipantDetail = createAsyncThunk(
  'get/detailParticipant',
  async (id, { rejectWithValue }) => {
    return serviceGetWithSlug( `${process.env.NEXT_PUBLIC_API_URL}users/participants/detail`)(
      id
      ).catch((err) => rejectWithValue(err.response.data))
  }
)

const UpdateParticipantStatus = createAsyncThunk(
  'put/participantManagement',
  async (body, { rejectWithValue }) => {
    const { id, payload } = body
    return servicePutWithSlug(`${process.env.NEXT_PUBLIC_API_URL}users`)(
      id,
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const DeleteParticipant = createAsyncThunk(
  'delete/participantManagement',
  async (id, { rejectWithValue }) => {
    return serviceDeleteWithSlug(`${process.env.NEXT_PUBLIC_API_URL}users`)(
      id
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

export default { GetParticipantList, GetParticipantDetail, DeleteParticipant, UpdateParticipantStatus }
