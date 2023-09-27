import EditMentorJudges from '@/components/organisms/MentorJudgesForm/edit'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Mentor } from '@/store/service'

export default function EditMentorManagementPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { detailMentor } = useSelector((state) => state.mentor)

  useEffect(() => {
    if (router.isReady) {
      dispatch(Mentor.GetMentorDetail(router.query.id))
    }
  }, [router])

  const breadcrumb = [
    {
      title: 'Mentor Management',
      onClick: () => router.push('/mentor-management')
    },
    {
      title: 'Edit Mentor',
      onClick: () => router.push('/mentor-management/edit-mentor')
    }
  ]

  return (
    <EditMentorJudges
      breadcrumb={breadcrumb}
      detail={detailMentor.data}
      title='Detail Mentor'
    />
  )
}
