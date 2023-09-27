import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import {
  CustomInput,
  CustomSelect,
  CustomButton,
  CustomTable
} from '@/components/_shared'
import { Typography, DatePicker, notification } from 'antd'

import column from './tableColumn'
import DeleteEventConfirmation from './actions/deleteEventConfirmation'
import { SearchOutlined } from '@ant-design/icons'
import { Router, useRouter } from 'next/router'
import dayjs from 'dayjs'

import { useDispatch, useSelector } from 'react-redux'
import { Event } from '@/store/service'

export default function EventManagementComponent() {
  const dispatch = useDispatch()
  // Data and Depedency Variable ==============================
  const router = useRouter()
  const [OpenDelete, setOpenDelete] = useState(false)
  const [IdForDelete, setIdForDelete] = useState(null)
  const { loading, eventList } = useSelector((state) => state.event)
  const [notifApi, contextHolder] = notification.useNotification()

  // Table Settings ==============================
  const [Search, setSearch] = useState('')
  const [TableSetting, setTableSetting] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    sort: 'id,asc',
    status: 'running',
    start: '',
    end: ''
  })

  const breadcrumb = [
    {
      title: 'Event Management',
      onClick: () => Router.push('/event-management')
    }
  ]

  // Search Function
  const onKeySearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value)
      setTableSetting({ ...TableSetting, current: 1, offset: 0 })
    }
  }

  // Gwt Event List Function (Run After Fetch Filter Data)
  const fetchData = (query) => {
    dispatch(
      Event.GetEventList({
        limit: TableSetting.limit,
        offset: TableSetting.offset,
        order: TableSetting.sort,
        status: TableSetting.status,
        start: TableSetting.start,
        end: TableSetting.end,
        q: query
      })
    )
      .unwrap()
      .then((ress) => {
        notifApi.success({ message: ress.data.message })
        setTimeout(() => {}, 2000)
      })
      .catch((ress) => {
        notifApi.error({ message: ress?.error })
        setTimeout(() => {}, 2000)
      })
  }

  // Fetching Filter Data
  useEffect(() => {
    fetchData(Search)
  }, [TableSetting, Search])

  // Table Filter Options :
  const statusOption = [
    { value: 'running', label: 'Running' },
    { value: 'finished', label: 'Finished' },
    { value: 'inactive', label: 'Inactive' }
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

  // Function For Table Pagination ==============================
  const paginationChange = (pages, pageSize) => {
    setTableSetting({
      ...TableSetting,
      offset: (pages - 1) * pageSize,
      current: pages
    })
  }

  // Function For Delete Event ====================
  const forDelete = (id) => {
    setOpenDelete(true)
    setIdForDelete(id)
  }

  return (
    <AuthenticatedLayout breadcrumb={breadcrumb}>
      {contextHolder}
      <div className='w-full  h-fit p-[30px] bg-white drop-shadow-md mb-[25px] rounded grid grid-cols-2 gap-[30px] items-end'>
        <div className='grid grid-cols-3 gap-[30px] '>
          <div className='flex flex-col gap-[5px]'>
            <Typography.Text>Start Date</Typography.Text>
            <DatePicker
              onChange={(e) =>
                setTableSetting({
                  ...TableSetting,
                  start: dayjs(e).format('YYYY-MM-DD'),
                  offset: 0,
                  current: 1
                })
              }
            />
          </div>
          <div className='flex flex-col gap-[5px]'>
            <Typography.Text>End Date</Typography.Text>
            <DatePicker
              onChange={(e) =>
                setTableSetting({
                  ...TableSetting,
                  end: dayjs(e).format('YYYY-MM-DD'),
                  offset: 0,
                  current: 1
                })
              }
            />
          </div>
          <div className='flex flex-col gap-[5px]'>
            <Typography.Text>Status</Typography.Text>
            <CustomSelect
              options={statusOption}
              value={TableSetting.status}
              onChange={(e) =>
                setTableSetting({
                  ...TableSetting,
                  status: e,
                  offset: 0,
                  current: 1
                })
              }
            />
          </div>
        </div>
        <div>
          <CustomInput
            prefix={<SearchOutlined />}
            placeholder='Search'
            onKeyUp={onKeySearch}
          />
        </div>
      </div>
      <div className='w-full h-fit p-[30px] bg-white drop-shadow-md rounded'>
        <div className='flex justify-between mb-[23px]'>
          <CustomButton
            className='w-[120px]'
            children='+ Add'
            onClick={() => router.push('event-management/create')}
          />
          <div className='flex gap-3'>
            <CustomSelect
              options={sortOption}
              value={TableSetting.sort}
              onChange={(e) => setTableSetting({ ...TableSetting, sort: e })}
            />
            <CustomSelect
              options={entriesOption}
              value={TableSetting.limit}
              onChange={(e) =>
                setTableSetting({
                  ...TableSetting,
                  limit: e,
                  offset: 0,
                  current: 1
                })
              }
            />
          </div>
        </div>
        <CustomTable
          column={column(TableSetting.current, TableSetting.limit, forDelete)}
          dataSource={eventList?.data?.events}
          totalData={eventList?.data?.total_item}
          onChangePagination={paginationChange}
          current={TableSetting.current}
          pageSize={TableSetting.limit}
          rowKey='id'
          loading={loading}
        />
        <DeleteEventConfirmation
          open={OpenDelete}
          setOpen={setOpenDelete}
          id={IdForDelete}
          TableSetting={TableSetting}
          Search={Search}
        />
      </div>
    </AuthenticatedLayout>
  )
}
