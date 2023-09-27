import React from 'react'
import MentorJudgesManagement from '@/components/organisms/MentorJudgesForm'
import { useRouter } from 'next/router'

export default function MentorManagementPage() {
  const router = useRouter()

  const breadcrumb = [
    {
      title: 'Mentor Management',
      onClick: () => router.push('/mentor-management')
    }
  ]

  const route = {
    detail: '/mentor-management/detail-mentor',
    edit: '/mentor-management/edit-mentor',
    add: '/mentor-management/add-mentor'
  }

  return (
    <MentorJudgesManagement
      breadcrumb={breadcrumb}
      route={route}
      title='Mentor Management'
    />
  )
}
