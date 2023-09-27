import MentorJudgesManagement from '@/components/organisms/MentorJudgesForm'
import React from 'react'
import { useRouter } from 'next/router'

export default function JudgesManagementPage() {
  const router = useRouter()

  const breadcrumb = [
    {
      title: 'Judges Management',
      onClick: () => router.push('/judges-management')
    }
  ]

  const route = {
    detail: '/judges-management/detail-judges',
    edit: '/judges-management/edit-judges',
    add: '/judges-management/add-judges'
  }

  return (
    <MentorJudgesManagement
      breadcrumb={breadcrumb}
      route={route}
      title='Judges Management'
    />
  )
}
