import React, { useEffect, useState } from 'react'
import DetailPaymentInvoice from '@/components/organisms/PaymentInvoiceManagement/detail'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Payment } from '@/store/service'
import { notification } from 'antd'

export default function DetailInvoicePage() {
  const dispatch = useDispatch()
  const router = useRouter()

  const [notifApi, contextHolder] = notification.useNotification()

  const { invoiceDetail, invoicePayment } = useSelector(
    (state) => state.payment
  )

  const [page, setPage] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    order: 'id,asc'
  })

  const fetchData = () => {
    const body = {
      id: router.query.id,
      payload: { limit: page.limit, offset: page.offset, order: page.order }
    }
    dispatch(Payment.GetInvoiceDetail(router.query.id))
      .unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
      })
      .catch((err) => {
        err.error.map((message) => {
          notifApi.error({ message })
        })
      })
    dispatch(Payment.GetInvoicePayment(body))
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
  }, [router, page])

  return (
    <>
      {contextHolder}
      <DetailPaymentInvoice
        type='invoice'
        data={invoiceDetail.data}
        invoicePayment={invoicePayment.data}
        page={page}
        setPage={setPage}
        fetchData={fetchData}
      />
    </>
  )
}
