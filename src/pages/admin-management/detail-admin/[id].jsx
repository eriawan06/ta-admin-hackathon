import React, { useEffect } from 'react'
import DetailAdmin from '@/components/organisms/AdminManagement/detail-admin'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Admin } from '@/store/service'
import { notification } from 'antd'

export default function DetailAdminPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [notifApi, contextHolder] = notification.useNotification()

  const { detailAdmin } = useSelector((state) => state.admin)

  useEffect(() => {
    if (router.isReady) {
      dispatch(Admin.GetDetailAdmin(router.query.id))
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
  }, [router])

  return (
    <>
      {contextHolder}
      <DetailAdmin detail={detailAdmin.data} />
    </>
  )
}
