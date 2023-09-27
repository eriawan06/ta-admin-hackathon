import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { useRouter } from 'next/router'
import {
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomTable
} from '@/components/_shared'
import { DatePicker, Typography, Modal, notification } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import column from './table-column'
import { Utils } from '@/helper'

import { useDispatch, useSelector } from 'react-redux'
import { Schedule } from '@/store/service'
import dayjs from 'dayjs'

export default function ScheduleManagement() {
  const dispatch = useDispatch()
  const { loading, scheduleList } = useSelector((state) => state.schedule)
  const router = useRouter()
  const { isMentor } = Utils.role()
  const [notifApi, contextHolder] = notification.useNotification()

  // Get role User
  const [roleUser, setRoleUser] = useState(null)
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setRoleUser(JSON.parse(user))
    }
  }, [])

  const [page, setPage] = useState({
    limit: 10,
    current: 1,
    offset: 0,
    order: 'id,asc',
    q: '',
    event: '',
    held: ''
  })

  const [modalOpen, setModalOpen] = useState({ open: false, id: null })

  const fetchData = () => {
    const payload = {
      limit: page.limit,
      order: page.order,
      offset: page.offset,
      q: page.q,
      event: page.event,
      held: page.held
    }
    dispatch(Schedule.GetScheduleList(payload))
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

  useEffect(() => {
    fetchData()
  }, [page])

  const paginationChange = (pages, pageSize) => {
    setPage({ ...page, offset: (pages - 1) * pageSize, current: pages })
  }

  const deleteItem = () => {
    dispatch(Schedule.DeleteSchedule(modalOpen.id))
      .unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
        setModalOpen({ open: false, id: null })
        setPage({ ...page, current: 1, offset: 0 })
      })
      .catch((err) => {
        err.error.map((message) => {
          notifApi.error({ message })
        })
      })
  }

  const breadcrumb = [
    {
      title: 'Schedule Management',
      onCLick: () => router.push('/mentor-management')
    }
  ]

  const sortOption = [
    { label: 'Oldest', value: 'id,asc' },
    { label: 'Latest', value: 'id,desc' }
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

  return (
    <AuthenticatedLayout breadcrumb={breadcrumb}>
      {contextHolder}
      <div className='rounded flex gap-[30px] p-[24px] mb-[25px] items-end bg-white drop-shadow-md '>
        <div className='flex flex-col w-[172px]'>
          <Typography.Text className='font-bold'>Event ID</Typography.Text>
          <CustomInput
            placeholder='search'
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setPage({
                  ...page,
                  event: e.target.value,
                  offset: 0,
                  current: 1
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col w-[239px]'>
          <Typography.Text className='font-bold'>Date & Time</Typography.Text>
          <DatePicker
            showTime
            onChange={(dateString) =>
              setPage({
                ...page,
                held: dateString
                  ? dayjs(dateString).format('YYYY-MM-DDTHH:mm:ssZ')
                  : '',
                offset: 0,
                current: 1
              })
            }
            // onOk={onOk}
          />
        </div>
        <div className='flex-grow flex-col '>
          <CustomInput
            prefix={<SearchOutlined />}
            placeholder=' Search title, mentor name'
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                setPage({
                  ...page,
                  q: e.target.value,
                  offset: 0,
                  current: 1
                })
              }
            }}
          />
        </div>
      </div>
      <div className='rounded flex flex-col gap-[23px] bg-white drop-shadow-md p-6'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-6'>
            {roleUser?.role_name === 'Mentor' ? (
              ' '
            ) : (
              <CustomButton
                className='w-[120px] '
                onClick={() => router.push('/schedule-management/add-schedule')}
              >
                + Add
              </CustomButton>
            )}
          </div>
          <div className='flex flex-row items-center gap-[13px]'>
            <CustomSelect
              options={sortOption}
              value={page.order}
              onChange={(e) => setPage({ ...page, order: e })}
            />
            <CustomSelect
              options={entriesOption}
              value={page.limit}
              onChange={(e) => setPage({ ...page, limit: e })}
            />
          </div>
        </div>
        <CustomTable
          column={column(page.current, page.limit, isMentor, setModalOpen)}
          dataSource={scheduleList.data?.schedules}
          rowKey='id'
          loading={loading}
          onChangePagination={paginationChange}
          current={page.current}
          pageSize={page.limit}
          totalData={scheduleList.data?.total_item}
        />
      </div>
      <Modal
        open={modalOpen.open}
        onCancel={() => setModalOpen({ open: false, id: null })}
        onOk={() => deleteItem()}
        title='Delete'
        okButtonProps={{
          className: 'custom-button-primary'
        }}
      >
        <>
          <div className='flex items-center flex-col gap-[19px]'>
            <Typography.Text className='text-2xl font-bold'>
              Delete Confirmation
            </Typography.Text>
            <Typography.Text className='mb-[16px] w-[350px] text-center'>
              You are about to delete this?
            </Typography.Text>
          </div>
        </>
      </Modal>
    </AuthenticatedLayout>
  )
}
