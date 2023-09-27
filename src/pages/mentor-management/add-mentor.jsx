import AddMentorJudges from '@/components/organisms/MentorJudgesForm/create'
import { useRouter } from 'next/router'
import React from 'react'

export default function AddMentorManagementPage() {
  const router = useRouter()

  const breadcrumb = [
    {
      title: 'Mentor Management',
      onClick: () => router.push('/mentor-management')
    },
    {
      title: 'Add Mentor',
      onClick: () => router.push('/mentor-management/add-mentor')
    }
  ]

  return <AddMentorJudges breadcrumb={breadcrumb} />
}
