import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import {
  CustomTable,
  CustomButton,
  CustomInput,
  CustomSelect
} from '@/components/_shared'
import { SearchOutlined } from '@ant-design/icons'
import column from './table-column'
import { useDispatch, useSelector } from 'react-redux'
import { Admin } from '@/store/service'
import { notification, Modal, Typography } from 'antd'

export default function AdminManagement() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, userList } = useSelector((state) => state.admin)
  const [notifApi, contextHolder] = notification.useNotification()

  const [page, setPage] = useState({
    limit: 10,
    current: 1,
    offset: 0,
    order: 'id,asc',
    status: 'active'
  })
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState({ open: false, id: null })

  const fetchData = () => {
    const payload = {
      limit: page.limit,
      order: page.order,
      offset: page.offset,
      status: page.status,
      q: search,
      role: 2
    }
    dispatch(Admin.GetAllAdmin(payload))
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
  }, [search, page])

  const deleteItem = () => {
    dispatch(Admin.DeleteAdmin(modalOpen.id))
      .unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
        setModalOpen({ open: false, id: null })
        fetchData()
      })
      .catch((err) => {
        err.error.map((message) => {
          notifApi.error({ message })
        })
      })
  }

  const paginationChange = (pages, pageSize) => {
    setPage({ ...page, offset: (pages - 1) * pageSize, current: pages })
  }

  const onKeySearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value)
      setPage({ ...page, current: 1, offset: 0 })
    }
  }

  const breadcrumb = [
    {
      title: 'Admin Management',
      onClick: () => router.push('/admin-management')
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
    <AuthenticatedLayout
      breadcrumb={breadcrumb}
      title='Admin Management'
    >
      {contextHolder}
      <div className='rounded flex flex-col gap-[23px] p-6 bg-white drop-shadow-md '>
        <div className=' grid grid-cols-6 gap-[30px] '>
          <div className=' col-span-3 grid grid-cols-3 gap-6'>
            <CustomButton
              className=''
              onClick={() => router.push('/admin-management/add-admin')}
            >
              + Add
            </CustomButton>
            <CustomInput
              prefix={<SearchOutlined />}
              placeholder='Search'
              className='col-span-2'
              onKeyUp={onKeySearch}
            />
          </div>
          <div className='grid col-span-2 col-start-5 grid-cols-3 gap-[13px]'>
            <CustomSelect 
              options={statusOption}
              value={page.status}
              onChange={(e) =>
                setPage({ ...page, status: e, current: 1, offset: 0 })
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
                setPage({ ...page, limit: e, current: 1, offset: 0 })
              }
            />
          </div>
        </div>
        <CustomTable
          column={column(setModalOpen)}
          dataSource={userList.data?.users}
          rowKey='id'
          loading={loading}
          totalData={userList.data?.total_item}
          pageSize={page.limit}
          current={page.current}
          onChangePagination={paginationChange}
        />
        <Modal
          open={modalOpen.open}
          onCancel={() => setModalOpen({ open: false, id: null })}
          onOk={() => deleteItem()}
          title='Delete'
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
      </div>
    </AuthenticatedLayout>
  )
}
