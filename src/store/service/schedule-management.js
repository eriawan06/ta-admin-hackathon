import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  serviceGet,
  servicePost,
  serviceGetWithSlug,
  servicePutWithSlug,
  serviceDeleteWithSlug
} from '@/services/_config'

const GetScheduleList = createAsyncThunk(
  'get/scheduleList',
  async (payload, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}schedules/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const CreateSchedule = createAsyncThunk(
  'post/scheduleManagement',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}schedules/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const DetailSchedule = createAsyncThunk(
  'get/scheduleDetail',
  async (id, { rejectWithValue }) => {
    return serviceGetWithSlug(`${process.env.NEXT_PUBLIC_API_URL}schedules`)(
      id
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const UpdateSchedule = createAsyncThunk(
  'put/scheduleManagement',
  async (body, { rejectWithValue }) => {
    const { id, payload } = body
    return servicePutWithSlug(`${process.env.NEXT_PUBLIC_API_URL}schedules`)(
      id,
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const DeleteSchedule = createAsyncThunk(
  'delete/scheduleManagement',
  async (id, { rejectWithValue }) => {
    return serviceDeleteWithSlug(`${process.env.NEXT_PUBLIC_API_URL}schedules`)(
      id
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const AddTeamtoSchedule = createAsyncThunk(
  'post/addTeamtoSchedule',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}schedules/teams`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const DeleteTeamAtSchedule = createAsyncThunk(
  'delete/deleteTeamAtSchedule',
  async(payload,{rejectWithValue})=>{
    const {id,team_id} = payload 
    return serviceDeleteWithSlug(`${process.env.NEXT_PUBLIC_API_URL}schedules/${id}/teams`)(
      team_id
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

export default {
  GetScheduleList,
  CreateSchedule,
  DetailSchedule,
  UpdateSchedule,
  DeleteSchedule,
  AddTeamtoSchedule,
  DeleteTeamAtSchedule
}
