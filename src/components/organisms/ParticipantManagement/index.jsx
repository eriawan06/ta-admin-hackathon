import React, { useEffect, useState } from 'react'

// Import Components
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import {
  CustomInput,
  CustomTable,
  CustomButton,
  CustomSelect
} from '@/components/_shared'
import { SearchOutlined } from '@ant-design/icons'

// Import Column Settings
import ParticipantManagementColumn from './table-column'

// Import Depedency
import { useDispatch, useSelector } from 'react-redux'
import { Participant } from '@/store/service'
import { notification } from 'antd'

// Import Popup Update Status
import UpdateParticipantStatusModal from './actions/updateParticipantStatusModal'
import DeleteParticipantModal from './actions/deleteParticipant'

export default function ParticipantManagement() {

  // Data and Depedency Variable
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [notifApi, holder] = notification.useNotification()
  
  //Get Data From Redux 
  const { loading, participantList } = useSelector((state) => state.participant)
  
  // Table Settings
  const [page, setPage] = useState({
    limit: 10,
    current: 1,
    offset: 0,
    order: 'id,asc',
    status: 'active'
  })
  
  // Popup Update Status useStates
  const [Open, setOpen] = useState(false)
  const [updateStatus, setUpdateStatus] = useState({})
  const [openDelete,setOpenDelete] = useState(false)
  const [idDelete, setIdDelete] = useState()
  
  // Popup Function
  function onClickSetModalStatus(data) {
    setOpen(true)
    setUpdateStatus(data)
  }

  function onClickSetModalDelete(id) {
    setOpenDelete(true)
    setIdDelete(id);
  }

  // Fetch Data Table
  useEffect(() => {
    fetchData()
  }, [page, search])
  
  const paginationChange = (pages, pageSize) => {
    setPage({ ...page, offset: (pages - 1) * pageSize, current: pages })
  }

  const fetchData = () => {
    const payload = {
      limit: page.limit,
      order: page.order,
      offset: page.offset,
      status: page.status,
      q: search
    }
    dispatch(Participant.GetParticipantList(payload))
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
  
  const onKeySearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value)
      setPage({ ...page, current: 1, offset: 0 })
    }
  }

//option for components
  const breadcrumb = [
    {
      title: 'Participant Management',
      onClick: () => router.push('/participant-management')
    }
  ]

  const statusOption = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
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
      <div className='flex flex-col p-[25px] gap-[23px] rounded bg-white drop-shadow-md'>
        {holder}
        <div className='flex gap-[30px] justify-between'>
          <CustomInput
            prefix={<SearchOutlined />}
            placeholder='Search'
            className='max-w-[353px]'
            onKeyUp={onKeySearch}
          />
          <div className='grid grid-cols-3 gap-[13px] items-center'>
            <CustomSelect
              options={statusOption}
              value={page.status}
              onChange={(e) =>
                setPage({ ...page, status: e, offset: 0, current: 1 })
              }
            />
            <CustomSelect
              options={sortOption}
              value={page.order}
              onChange={(e) => setPage({ ...page, order: e })}
            />
            <CustomSelect
              options={entriesOption}
              value={page.limit}
              onChange={(e) =>
                setPage({ ...page, limit: e, offset: 0, current: 1 })
              }
            />
          </div>
        </div>
        <CustomTable
          column={ParticipantManagementColumn(page.current,page.limit,onClickSetModalStatus,onClickSetModalDelete)}
          loading={loading}
          dataSource={participantList?.data?.participants}
          rowKey='id'
          totalData={participantList?.data?.total_item}
          onChangePagination={paginationChange}
          current={page.current}
          pageSize={page.limit}
        />
      </div>
      {/* modal update status */}
      <UpdateParticipantStatusModal
        open={Open}
        setOpen={setOpen}
        data={updateStatus}
        fetchData={fetchData}
      />
      {/* modal delete status */}
      <DeleteParticipantModal
        open={openDelete}
        setOpen={setOpenDelete}
        id={idDelete}
        fetchData={fetchData}
      />
    </AuthenticatedLayout>
  )
}
