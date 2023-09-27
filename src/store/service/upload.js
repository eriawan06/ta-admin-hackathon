import { createAsyncThunk } from '@reduxjs/toolkit'
import { servicePost } from '@/services/_config'

const UploadProfileJudges = createAsyncThunk(
  'post/judgesProfile',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}upload/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

export default { UploadProfileJudges }
