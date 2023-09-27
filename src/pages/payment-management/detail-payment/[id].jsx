import React, { useEffect } from 'react'
import DetailPaymentInvoice from '@/components/organisms/PaymentInvoiceManagement/detail'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Payment } from '@/store/service'
import { notification } from 'antd'

export default function DetailPaymentPage() {
  const dispatch = useDispatch()
  const router = useRouter()

  const [notifApi, contextHolder] = notification.useNotification()

  const { paymentDetail } = useSelector((state) => state.payment)

  const fetchData = () => {
    dispatch(Payment.GetPaymentDetail(router.query.id))
      .unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
      })
      .catch((err) => {
        err.error.map((message) => {
          notifApi.error({ message })
        })
      })
  }

  useEffect(() => {
    if (router.isReady) {
      fetchData()
    }
  }, [router])

  return (
    <>
      {contextHolder}
      <DetailPaymentInvoice
        type='payment'
        data={paymentDetail.data}
        fetchData={fetchData}
      />
    </>
  )
}
