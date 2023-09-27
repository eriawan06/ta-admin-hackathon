import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { useRouter } from 'next/router'
import { CustomInput, CustomSelect, CustomTable } from '@/components/_shared'
import { Typography, DatePicker, notification } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import column from './table-column'
import { Utils } from '@/helper'

import { useDispatch, useSelector } from 'react-redux'
import { Project } from '@/store/service'
import dayjs from 'dayjs'

export default function ProjectManagement() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading, projectList } = useSelector((state) => state.project)
  const [notifApi, holder] = notification.useNotification()

  const { isJudge } = Utils.role()

  const [page, setPage] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    eventId: '',
    teamId: '',
    createdAt: '',
    status: 'draft',
    sort: 'id,asc'
  })
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(
      Project.GetProjectList({
        limit: page.limit,
        offset: page.offset,
        event: page.eventId,
        team: page.teamId,
        created_at: page.createdAt,
        status: page.status,
        order: page.sort,
        q: search
      })
    )
      .unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
      })
      .catch((err) => {
        err.error.map((message) => {
          notifApi.error({ message })
        })
      })
  }, [page, search])

  const breadcrumb = [
    {
      title: 'Project Management',
      onClick: () => router.push('/project-management')
    }
  ]

  const entriesOption = [
    {
      label: '5 Entries',
      value: 5
    },
    {
      label: '10 Entries',
      value: 10
    }
  ]

  const paginationChange = (pages, pageSize) => {
    setPage({
      ...page,
      offset: (pages - 1) * pageSize,
      current: pages
    })
  }
 console.log(projectList)
  return (
    <AuthenticatedLayout
      breadcrumb={breadcrumb}
      title='Project Management'
    >
      {holder}
      <div className='flex flex-col gap-[25px]'>
        <div className='grid grid-cols-2 items-end gap-[14px] rounded bg-white drop-shadow-md px-6 py-[23px]'>
          <div className='grid grid-cols-5 items-end gap-[14px]'>
            <div className='flex flex-col'>
              <Typography.Text className='font-bold'>Event ID</Typography.Text>
              <CustomInput
                size='large'
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    setPage({ ...page, eventId: e.target.value })
                  }
                }}
              />
            </div>
            <div className='flex flex-col'>
              <Typography.Text className='font-bold'>Team ID</Typography.Text>
              <CustomInput
                size='large'
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    setPage({ ...page, teamId: e.target.value })
                  }
                }}
              />
            </div>
            <div className='flex flex-col col-span-2'>
              <Typography.Text className='font-bold'>
                Created At
              </Typography.Text>
              <DatePicker
                format='YYYY-MM-DD'
                size='large'
                onChange={(date, dateString) => {
                  setPage({ ...page, createdAt: dateString })
                  console.log(dateString) // dateString akan berisi tanggal dengan format "07-09-2023"
                }}
              />
            </div>
            <div className='flex flex-col'>
              <Typography.Text className='font-bold'>Status</Typography.Text>
              <CustomSelect
                options={[
                  { label: 'Draft', value: 'draft' },
                  { label: 'Submitted', value: 'submitted' },
                  { label: 'Inactive', value: 'inactive' }
                ]}
                size='large'
                value={page.status}
                onChange={(e) => setPage({ ...page, offset:0, current:1, status: e })}
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <CustomInput
              prefix={<SearchOutlined />}
              placeholder='Search Project Name'
              size='large'
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  setSearch(e.target.value)
                }
              }}
            />
          </div>
        </div>
        <div className='flex flex-col gap-[22px] rounded bg-white drop-shadow-md p-6'>
          <div className='flex flex-row gap-[13px] justify-end'>
            <CustomSelect
              size='large'
              options={[
                { label: 'Oldest', value: 'id,asc' },
                { label: 'Latest', value: 'id,desc' }
              ]}
              value={page.sort}
              onChange={(e) => setPage({ ...page, sort: e })}
            />
            <CustomSelect
              options={entriesOption}
              size='large'
              value={page.limit}
              onChange={(e) => setPage({ ...page, limit: e })}
            />
          </div>
          <div>
            <CustomTable
              column={column(page.current, page.limit, isJudge)}
              dataSource={projectList.data?.projects}
              totalData={projectList?.data?.total_item}
              onChangePagination={paginationChange}
              current={page.current}
              pageSize={page.limit}
              rowKey='id'
              loading={loading}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
