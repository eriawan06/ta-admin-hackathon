import EditMentorJudges from '@/components/organisms/MentorJudgesForm/edit'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Judges } from '@/store/service'

export default function EditJudgesManagementPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { detailJudges } = useSelector((state) => state.judges)

  useEffect(() => {
    if (router.isReady) {
      dispatch(Judges.GetJudgesDetail(router.query.id))
    }
  }, [router])

  const breadcrumb = [
    {
      title: 'Judges Management',
      onClick: () => router.push('/judges-management')
    },
    {
      title: 'Edit Judges',
      onClick: () => router.push('/judges-management/edit-judges')
    }
  ]

  return (
    <EditMentorJudges
      breadcrumb={breadcrumb}
      detail={detailJudges.data}
      title='Detail Judges'
    />
  )
}
