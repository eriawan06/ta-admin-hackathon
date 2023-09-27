import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import {
  CustomButton,
  CustomInput,
  CustomTable,
  CustomSelect
} from '@/components/_shared'
import { SearchOutlined } from '@ant-design/icons'
import column from './table-column'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Judges, Mentor } from '@/store/service'
import { notification, Modal, Typography, message } from 'antd'

export default function MentorJudgesManagement({ breadcrumb, route, title }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [page, setPage] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    status: 'active',
    sort: 'id,asc'
  })
  const [isMentor, setIsMentor] = useState(
    title.toLowerCase().includes('mentor')
  )
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState({ open: false, id: null })

  const [notificationApi, holder] = notification.useNotification()

  const { dataJudges, loadingJudges } = useSelector((state) => state.judges)
  const { dataMentor, loadingMentor } = useSelector((state) => state.mentor)

  useEffect(() => {
    setIsMentor(title.toLowerCase().includes('mentor'))
  }, [title])

  const fetchData = (query) => {
    isMentor
      ? dispatch(
          Mentor.GetMentorList({
            limit: page.limit,
            offset: page.offset,
            order: page.sort,
            status: page.status,
            q: query
          })
        )
          .unwrap()
          .then((res) => {
            notificationApi.success({ message: res.data.message })
          })
          .catch((err) => {
            err.error.map((message) => {
              notificationApi.error({ message })
            })
          })
      : dispatch(
          Judges.GetAllJudges({
            limit: page.limit,
            offset: page.offset,
            order: page.sort,
            status: page.status,
            q: query
          })
        )
          .unwrap()
          .then((res) => {
            notificationApi.success({ message: res.data.message })
          })
          .catch((err) => {
            err.error.map((message) => {
              notificationApi.error({ message })
            })
          })
  }

  const onKeySearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value)
      setPage({ ...page, current: 1, offset: 0 })
    }
  }

  useEffect(() => {
    fetchData(search)
  }, [page, search])

  const paginationChange = (pages, pageSize) => {
    setPage({ ...page, offset: (pages - 1) * pageSize, current: pages })
  }

  const deleteItem = () => {
    isMentor
      ? dispatch(Mentor.DeleteMentor(modalOpen.id))
          .unwrap()
          .then((res) => {
            notificationApi.success({ message: res.data.message })
            setModalOpen({ open: false, id: null })
            fetchData(search)
          })
          .catch((err) => {
            err.error.map((message) => {
              notificationApi.error({ message })
            })
          })
      : dispatch(Judges.DeleteJudges(modalOpen.id))
          .unwrap()
          .then((res) => {
            notificationApi.success({ message: res.data.message })
            setModalOpen({ open: false, id: null })
            fetchData(search)
          })
          .catch((err) => {
            err.error.map((message) => {
              notificationApi.error({ message })
            })
          })
  }

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
    <AuthenticatedLayout
      breadcrumb={breadcrumb}
      title={title}
    >
      <div className='rounded flex flex-col gap-[23px] bg-white drop-shadow-md p-6'>
        {holder}
        <div className='grid grid-cols-6'>
          <div className='grid col-span-3 grid-cols-3 gap-6'>
            <CustomButton 
              onClick={() => router.push(route.add)}
            >
              + Add
            </CustomButton>
            <CustomInput
              className='col-span-2'
              prefix={<SearchOutlined />}
              placeholder='Search'
              onKeyUp={onKeySearch}
            />
          </div>
          <div className='grid col-span-2 col-start-5 grid-cols-3 gap-[13px]'>
            <CustomSelect
              options={statusOption}
              value={page.status}
              onChange={(e) =>
                setPage({ ...page, status: e, offset: 0, current: 1 })
              }
            />
            <CustomSelect
              options={sortOption}
              value={page.sort}
              onChange={(e) => setPage({ ...page, sort: e })}
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
          loading={isMentor ? loadingMentor : loadingJudges}
          column={column(route, page.current, page.limit, setModalOpen)}
          dataSource={
            isMentor ? dataMentor?.data?.mentors : dataJudges?.data?.judges
          }
          rowKey='id'
          totalData={
            isMentor
              ? dataMentor?.data?.total_item
              : dataJudges?.data?.total_item
          }
          onChangePagination={paginationChange}
          current={page.current}
          pageSize={page.limit}
        />
      </div>
      <Modal
        open={modalOpen.open}
        onCancel={() => setModalOpen({ open: false, id: null })}
        onOk={() => deleteItem()}
        okButtonProps={{
          className: 'custom-button-primary'
        }}
        closeIcon={null}
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
