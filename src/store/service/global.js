import { createAsyncThunk } from '@reduxjs/toolkit'
import { serviceGet } from '@/services/_config'

const GetOccupation = createAsyncThunk(
  'get/occupation',
  async (payload, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}occupations/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

export default { GetOccupation }
