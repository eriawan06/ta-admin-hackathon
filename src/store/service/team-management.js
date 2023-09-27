import { createAsyncThunk } from '@reduxjs/toolkit'
import { serviceGet, servicePost, servicePut } from '@/services/_config'

const GetTeamList = createAsyncThunk(
  'get/teamList',
  async (payload, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}teams/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const GetTeamDetail = createAsyncThunk(
  'get/teamDetail',
  async (id, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}teams/${id}`)().catch(
      (err) => rejectWithValue(err.response.data)
    )
  }
)

const GetTeamMember = createAsyncThunk(
  'get/teamMember',
  async (id, { rejectWithValue }) => {
    return serviceGet(
      `${process.env.NEXT_PUBLIC_API_URL}teams/${id}/members`
    )().catch((err) => rejectWithValue(err.response.data))
  }
)

const UpdateStatusTeam = createAsyncThunk(
  'post/updateStatusTeam',
  async (payload, { rejectWithValue }) => {
    const { id, body } = payload
    return servicePut(`${process.env.NEXT_PUBLIC_API_URL}teams/${id}/status`)(
      body
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const GetTeamSchedule = createAsyncThunk(
  'get/teamListSchedule',
  async (payload, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}teams/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

export default {
  GetTeamList,
  GetTeamDetail,
  GetTeamMember,
  UpdateStatusTeam,
  GetTeamSchedule
}
