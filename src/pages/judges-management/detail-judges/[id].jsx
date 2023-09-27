import DetailMentorJudges from '@/components/organisms/MentorJudgesForm/detail'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Judges } from '@/store/service'
import { notification } from 'antd'

export default function DetailJudgesManagementPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [notifApi, contextHolder] = notification.useNotification()

  const { detailJudges } = useSelector((state) => state.judges)

  useEffect(() => {
    if (router.isReady) {
      dispatch(Judges.GetJudgesDetail(router.query.id))
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

  const breadcrumb = [
    {
      title: 'Judges Management',
      onClick: () => router.push('/judges-management')
    },
    {
      title: 'Detail Judges',
      onClick: () => router.push('/judges-management/detail-judges')
    }
  ]

  return (
    <>
      {contextHolder}
      <DetailMentorJudges
        breadcrumb={breadcrumb}
        detail={detailJudges.data}
        title='Detail Judges'
      />
    </>
  )
}
