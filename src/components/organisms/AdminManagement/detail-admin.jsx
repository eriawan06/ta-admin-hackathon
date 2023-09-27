import React from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { Typography, Skeleton } from 'antd'
import { useRouter } from 'next/router'

export default function DetailAdmin({ detail }) {
  const router = useRouter()

  const breadcrumb = [
    {
      title: 'Admin Management',
      onClick: () => router.push('/admin-management')
    },
    {
      title: 'Detail Admin',
      onClick: () => router.push('/admin-management/detail-admin')
    }
  ]

  return (
    <AuthenticatedLayout
      breadcrumb={breadcrumb}
      withBack
      title='Detail Admin'
    >
      {!detail?.id ? (
        <Skeleton />
      ) : (
        <div className='rounded bg-white drop-shadow-md p-[30px]'>
          <div className='grid grid-cols-2 gap-x-[70px] gap-y-[25px]'>
            <div className='flex flex-col gap-3'>
              <Typography.Text className='font-bold'>Name</Typography.Text>
              <Typography.Text>{detail.name}</Typography.Text>
            </div>
            <div className='flex flex-col gap-3'>
              <Typography.Text className='font-bold'>Email</Typography.Text>
              <Typography.Text>{detail.email}</Typography.Text>
            </div>
            <div className='flex flex-col gap-3'>
              <Typography.Text className='font-bold'>
                Phone Number
              </Typography.Text>
              <Typography.Text>{detail.phone_number}</Typography.Text>
            </div>
            <div className='flex flex-col gap-3'>
              <Typography.Text className='font-bold'>Status</Typography.Text>
              <Typography.Text>
                {detail.is_active ? 'Active' : 'Inactive'}
              </Typography.Text>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  )
}
