import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { CustomInput, CustomSelect, CustomTable } from '@/components/_shared'
import { Typography, notification } from 'antd'

import TeamManagementColumn from './tableColumn'
import UpdateTeamStatusModal from './updateTeamStatusModal'
import { SearchOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'
import { Team, Event } from '@/store/service'

export default function TeamManagementComponent() {
  // Data and Depedency Variable ==============================
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading, TeamList } = useSelector((state) => state.team)
  const { eventList } = useSelector((state) => state.event)
  const [notifApi, contextHolder] = notification.useNotification()
  const [OpenUpdateStatus, setOpenUpdateStatus] = useState(false)
  const [IdForUpdateStatus, setIdForUpdateStatus] = useState(null)

  // Breadcrumb Settings ==============================
  const breadcrumb = [
    {
      title: 'Team Management',
      onClick: () => router.push('/team-management')
    }
  ]

  // Table Settings ==============================
  const [Search, setSearch] = useState('')
  const [EventID, setEventID] = useState('')
  const [TableSetting, setTableSetting] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    sort: 'id,asc',
    status: '',
    schedule: null,
    event_id:null,
  })

  // Search Function
  const onKeySearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value)
      setTableSetting({ ...TableSetting, current: 1, offset: 0 })
    }
  }
  // Search Function By Event ID
  const onKeySearchEventID = (e) => {
    if (e.key === 'Enter') {
      setEventID(e.target.value)
      setTableSetting({ ...TableSetting, current: 1, offset: 0 })
    }
  }

  // Gwt Event List Function (Run After Fetch Filter Data)
  const fetchData = (query) => {
    dispatch(
      Team.GetTeamList({
        limit: TableSetting.limit,
        offset: TableSetting.offset,
        order: TableSetting.sort,
        status: TableSetting.status,
        schedule: TableSetting.schedule,
        event: TableSetting.event_id,
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

  // Fetching Filter Data & Event list
  useEffect(() => {
    dispatch(Event.GetEventList({ order: 'id,asc' }))
    fetchData(Search)
  }, [TableSetting, Search])

  // Table Filter Options :
  const statusOption = [
    { value: 'active', label: 'Active' },
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

  // Function For Update Status
  const onClickSetModal = (id) => {
    setOpenUpdateStatus(true)
    setIdForUpdateStatus(id)
  }

  return (
    <AuthenticatedLayout breadcrumb={breadcrumb}>
      {contextHolder}
      <div className='w-full h-fit p-[30px] bg-white drop-shadow-md mb-[25px] rounded grid grid-cols-2 gap-[30px] items-end'>
        <div className='grid grid-cols-2 gap-[30px] '>
          <div className='flex flex-col gap-[5px]'>
            <Typography.Text>Event ID</Typography.Text>
            <CustomSelect
              options={eventList.data?.events.map((item) => ({
                label: item.name,
                value: item.id
              }))}
              placeholder='Select an event'
              onChange={(e) => setTableSetting({
                ...TableSetting,
                event_id: e,
              })}
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
        <div className='flex justify-end mb-[23px]'>
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
          column={TeamManagementColumn(
            TableSetting.current,
            TableSetting.limit,
            onClickSetModal
          )}
          dataSource={TeamList.teams}
          totalData={TeamList?.total_item}
          onChangePagination={paginationChange}
          current={TableSetting.current}
          pageSize={TableSetting.limit}
          rowKey='id'
          loading={loading}
        />
      </div>

      {/* Modal : */}
      <UpdateTeamStatusModal
        open={OpenUpdateStatus}
        setOpen={setOpenUpdateStatus}
        id={IdForUpdateStatus}
        fetchData={fetchData}
      />
    </AuthenticatedLayout>
  )
}
