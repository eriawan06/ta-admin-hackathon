import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  serviceGet,
  serviceGetWithSlug,
  servicePutWithSlug
} from '@/services/_config'

const GetInvoiceList = createAsyncThunk(
  'get/invoiceList',
  async (payload, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}invoices/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const GetPaymentList = createAsyncThunk(
  'get/paymentList',
  async (payload, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}payments/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const GetInvoiceDetail = createAsyncThunk(
  'get/invoiceDetail',
  async (id, { rejectWithValue }) => {
    return serviceGetWithSlug(`${process.env.NEXT_PUBLIC_API_URL}invoices`)(
      id
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const GetInvoicePayment = createAsyncThunk(
  'get/invoiceDetailPayment',
  async (body, { rejectWithValue }) => {
    const { id, payload } = body
    return serviceGet(
      `${process.env.NEXT_PUBLIC_API_URL}invoices/${id}/payments`
    )(payload).catch((err) => rejectWithValue(err.response.data))
  }
)

const GetPaymentDetail = createAsyncThunk(
  'get/paymentDetail',
  async (id, { rejectWithValue }) => {
    return serviceGetWithSlug(`${process.env.NEXT_PUBLIC_API_URL}payments`)(
      id
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const UpdatePayment = createAsyncThunk(
  'put/paymentManagement',
  async (body, { rejectWithValue }) => {
    const { id, payload } = body
    return servicePutWithSlug(`${process.env.NEXT_PUBLIC_API_URL}payments`)(
      id,
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

export default {
  GetPaymentList,
  GetInvoiceList,
  GetInvoiceDetail,
  GetInvoicePayment,
  GetPaymentDetail,
  UpdatePayment
}
