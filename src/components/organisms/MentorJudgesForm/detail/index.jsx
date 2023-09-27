import React from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { Typography, Skeleton } from 'antd'
import Image from 'next/image'

export default function DetailMentorJudges({ breadcrumb, detail, title }) {
  return (
    <AuthenticatedLayout
      breadcrumb={breadcrumb}
      withBack
      title={title}
    >
      {!detail?.id ? (
        <Skeleton />
      ) : (
        <div className='flex gap-[26px]'>
          <div className='bg-white drop-shadow-md box-border h-[270px] w-[270px] p-[64px]'>
            <div className='border rounded-full w-full h-full overflow-hidden bg-white'>
              <Image
                src={detail.avatar}
                width={140}
                height={140}
                alt='profile'
              />
            </div>
          </div>
          <div className='flex-grow p-[29px] grid grid-rows-3 grid-cols-2 gap-x-[75px] gap-y-[25px] bg-white drop-shadow-md '>
            <div className='flex flex-col gap-3'>
              <Typography.Text className='font-bold text-sm '>
                Name
              </Typography.Text>
              <Typography.Text className='text-sm'>
                {detail.name}
              </Typography.Text>
            </div>
            <div className='flex flex-col gap-3'>
              <Typography.Text className='font-bold text-sm'>
                Email
              </Typography.Text>
              <Typography.Text className='text-sm'>
                {detail.email}
              </Typography.Text>
            </div>
            <div className='flex flex-col gap-3 '>
              <Typography.Text className='font-bold text-sm'>
                Phone Number
              </Typography.Text>
              <Typography.Text className='text-sm'>
                +{detail.phone_number}
              </Typography.Text>
            </div>
            <div className='flex flex-col gap-3'>
              <Typography.Text className='font-bold text-sm'>
                Occupation
              </Typography.Text>
              <Typography.Text className='text-sm'>
                {detail.occupation.name}
              </Typography.Text>
            </div>
            <div className='flex flex-col gap-3'>
              <Typography.Text className='font-bold text-sm'>
                Company / Institution
              </Typography.Text>
              <Typography.Text className='text-sm'>
                {detail.institution}
              </Typography.Text>
            </div>
            <div className='flex flex-col gap-3 '>
              <Typography.Text className='font-bold text-sm'>
                Status
              </Typography.Text>
              <Typography.Text className='text-sm'>
                {detail.is_active ? 'Active' : 'Inactive'}
              </Typography.Text>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  )
}
