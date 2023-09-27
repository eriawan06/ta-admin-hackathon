import { createSlice } from '@reduxjs/toolkit'
import { Payment } from '@/store/service'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  loading: false,
  invoiceList: [],
  paymentList: [],
  invoiceDetail: {},
  invoicePayment: [],
  paymentDetail: {}
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...action.payload.auth
      }
    })

    // Get all invoice
    builder.addCase(Payment.GetInvoiceList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Payment.GetInvoiceList.fulfilled, (state, action) => {
      state.loading = false
      state.invoiceList = action.payload.data
    })
    builder.addCase(Payment.GetInvoiceList.rejected, (state) => {
      state.loading = false
    })

    // Get all payment
    builder.addCase(Payment.GetPaymentList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Payment.GetPaymentList.fulfilled, (state, action) => {
      state.loading = false
      state.paymentList = action.payload.data
    })
    builder.addCase(Payment.GetPaymentList.rejected, (state) => {
      state.loading = false
    })

    // Get detail invoice
    builder.addCase(Payment.GetInvoiceDetail.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Payment.GetInvoiceDetail.fulfilled, (state, action) => {
      state.loading = false
      state.invoiceDetail = action.payload.data
    })
    builder.addCase(Payment.GetInvoiceDetail.rejected, (state) => {
      state.loading = false
    })

    // Get invoice's payment
    builder.addCase(Payment.GetInvoicePayment.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Payment.GetInvoicePayment.fulfilled, (state, action) => {
      state.loading = false
      state.invoicePayment = action.payload.data
    })
    builder.addCase(Payment.GetInvoicePayment.rejected, (state) => {
      state.loading = false
    })

    // Get detail payment
    builder.addCase(Payment.GetPaymentDetail.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Payment.GetPaymentDetail.fulfilled, (state, action) => {
      state.loading = false
      state.paymentDetail = action.payload.data
    })
    builder.addCase(Payment.GetPaymentDetail.rejected, (state) => {
      state.loading = false
    })

    // Edit payment
    builder.addCase(Payment.UpdatePayment.pending, (state) => {
      state.loading = true
    })
    builder.addCase(Payment.UpdatePayment.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(Payment.UpdatePayment.rejected, (state) => {
      state.loading = false
    })
  }
})

export default paymentSlice.reducer
