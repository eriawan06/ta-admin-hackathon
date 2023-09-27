import React from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { useRouter } from 'next/router'
import GeneralInfo from '@/components/molecules/ProjectManagement/general-info'
import ProjectDetails from '@/components/molecules/ProjectManagement/project-details'
import { Skeleton } from 'antd'

export default function DetailProjectManagement({ project }) {
  const router = useRouter()

  const breadcrumb = [
    {
      title: 'Project Management',
      onClick: () => router.push('/project-management')
    },
    {
      title: 'Detail Project',
      onClick: () => router.push('/project-management/detail-project')
    }
  ]

  return (
    <AuthenticatedLayout
      breadcrumb={breadcrumb}
      withBack
      title='Detail Project'
    >
      {!project ? (
        <Skeleton />
      ) : (
        <>
          {/* General Info */}
          <GeneralInfo project={project} />
          {/* Project Details */}
          <ProjectDetails project={project} />
        </>
      )}
    </AuthenticatedLayout>
  )
}
