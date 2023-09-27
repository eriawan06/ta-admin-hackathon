import DetailMentorJudges from '@/components/organisms/MentorJudgesForm/detail'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Mentor } from '@/store/service'
import { notification } from 'antd'

export default function DetailMentorManagementPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [notifApi, contextHolder] = notification.useNotification()

  const { detailMentor } = useSelector((state) => state.mentor)

  useEffect(() => {
    if (router.isReady) {
      dispatch(Mentor.GetMentorDetail(router.query.id))
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
      title: 'Mentor Management',
      onClick: () => router.push('/mentor-management')
    },
    {
      title: 'Detail Mentor',
      onClick: () => router.push('/mentor-management/detail-mentor')
    }
  ]

  return (
    <>
      {contextHolder}
      <DetailMentorJudges
        breadcrumb={breadcrumb}
        detail={detailMentor.data}
        title='Detail Mentor'
      />
    </>
  )
}
