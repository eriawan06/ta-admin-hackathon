import { createAsyncThunk } from '@reduxjs/toolkit'
import { serviceGet, serviceGetWithSlug } from '@/services/_config'

const GetProjectList = createAsyncThunk(
  'get/projectList',
  async (payload, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}projects/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const GetProjectDetail = createAsyncThunk(
  'get/projectDetail',
  async (id, { rejectWithValue }) => {
    return serviceGetWithSlug(`${process.env.NEXT_PUBLIC_API_URL}projects`)(
      id
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

export default { GetProjectList, GetProjectDetail }
