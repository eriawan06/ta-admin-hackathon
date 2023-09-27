import React, { useEffect } from 'react'
import DetailProjectManagement from '@/components/organisms/ProjectManagement/detail'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Project } from '@/store/service'
import { notification } from 'antd'

export default function DetailProjectManagementPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [notifApi, contextHolder] = notification.useNotification()
  const { projectDetail } = useSelector((state) => state.project)

  useEffect(() => {
    if (router.isReady) {
      dispatch(Project.GetProjectDetail(router.query.id))
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
      <DetailProjectManagement project={projectDetail.data} />
    </>
  )
}
