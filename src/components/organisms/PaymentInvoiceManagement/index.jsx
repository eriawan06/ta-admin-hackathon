import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { Radio, Typography, Select, DatePicker, notification } from 'antd'
import { CustomInput, CustomTable } from '@/components/_shared'
import { AiOutlineSearch } from 'react-icons/ai'
import Column from './table-column'
import { useDispatch, useSelector } from 'react-redux'
import { Payment } from '@/store/service'
import dayjs from 'dayjs'
import ModalPaymentInvoice from '@/components/molecules/paymentInvoiceManagement/Modal'

export default function PaymentInvoiceManagement() {
  const dispatch = useDispatch()

  const { loading, paymentList, invoiceList } = useSelector(
    (state) => state.payment
  )

  const [notifApi, contextHolder] = notification.useNotification()

  const [type, setType] = useState('invoice')
  const [invoicePage, setInvoicePage] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    status: 'paid',
    event: '',
    order: 'id,asc'
  })
  const [paymentPage, setPaymentPage] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    status: 'proceed',
    createdAt: '',
    type: 'manual',
    order: 'id,asc'
  })
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [id, setId] = useState(null)

  const breadcrumb = [
    {
      title: 'Payment Management'
    }
  ]

  const fetchData = () => {
    if (type === 'invoice') {
      dispatch(
        Payment.GetInvoiceList({
          limit: invoicePage.limit,
          offset: invoicePage.offset,
          status: invoicePage.status,
          event: invoicePage.event,
          q: search,
          order: invoicePage.order
        })
      )
        .unwrap()
        .then((res) => {
          notifApi.success({ message: res.data.message, duration: 3 })
        })
        .catch((err) => {
          err.error.map((message) => {
            notifApi.error({ message, duration: 3 })
          })
        })
    } else {
      dispatch(
        Payment.GetPaymentList({
          limit: paymentPage.limit,
          order: paymentPage.order,
          offset: paymentPage.offset,
          status: paymentPage.status,
          created_at: paymentPage.createdAt
            ? dayjs(paymentPage.createdAt).format('DD-MM-YYYY')
            : '',
          type: paymentPage.type,
          q: search
        })
      )
        .unwrap()
        .then((res) => {
          notifApi.success({ message: res.data.message, duration: 3 })
        })
        .catch((err) => {
          err.error.map((message) => {
            notifApi.error({ message, duration: 3 })
          })
        })
    }
  }

  useEffect(() => {
    fetchData(search)
  }, [type, invoicePage, paymentPage, search])

  const eventSearch = (e) => {
    if (e.key === 'Enter') {
      setInvoicePage({
        ...invoicePage,
        event: e.target.value,
        offset: 0,
        current: 1
      })
    }
  }

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value)
      setInvoicePage({ ...invoicePage, offset: 0, current: 1 })
      setPaymentPage({ ...paymentPage, offset: 0, current: 1 })
    }
  }

  const invoicePaginationChange = (pages, pageSize) => {
    setInvoicePage({
      ...invoicePage,
      offset: (pages - 1) * pageSize,
      current: pages
    })
  }

  const paymentPaginationChange = (pages, pageSize) => {
    setPaymentPage({
      ...paymentPage,
      offset: (pages - 1) * pageSize,
      current: pages
    })
  }

  const option = [
    {
      id: 1,
      label: 'Invoice',
      value: 'invoice'
    },
    {
      id: 2,
      label: 'Payment',
      value: 'payment'
    }
  ]

  return (
    <AuthenticatedLayout
      breadcrumb={breadcrumb}
      title='Payment Management'
    >
      {contextHolder}
      {/* Radio */}
      <div className='mb-12'>
        <Radio.Group
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ width: '100%' }}
          buttonStyle='solid'
          size='large'
        >
          {option.map((item) => (
            <Radio.Button
              key={item.id}
              value={item.value}
              style={{ width: '50%', textAlign: 'center' }}
            >
              {item.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>

      {/* Filter */}
      <div
        className={`rounded bg-white drop-shadow-md py-[23px] mb-[25px] px-6 grid grid-cols-24 items-end ${
          type === 'invoice' ? 'gap-[30px]' : 'gap-[11px]'
        }`}
      >
        {type === 'invoice' ? (
          <>
            <div className='col-span-8 flex gap-[5px] flex-col'>
              <Typography.Text className='font-bold'>Event ID</Typography.Text>
              <CustomInput
                onKeyUp={eventSearch}
                placeholder='Search'
              />
            </div>
            <div className='col-span-4 flex gap-[5px] flex-col'>
              <Typography.Text className='font-bold'>Status</Typography.Text>
              <Select
                options={[
                  { label: 'Unpaid', value: 'unpaid' },
                  { label: 'Processing', value: 'processing' },
                  { label: 'Paid', value: 'paid' }
                ]}
                value={invoicePage.status}
                onChange={(e) =>
                  setInvoicePage({
                    ...invoicePage,
                    status: e,
                    offset: 0,
                    current: 1
                  })
                }
              />
            </div>
            <div className='col-span-12'>
              <CustomInput
                placeholder='Search invoice number, participant name'
                prefix={<AiOutlineSearch />}
                onKeyUp={onSearch}
              />
            </div>
          </>
        ) : (
          <>
            <div className='col-span-3 flex gap-[5px] flex-col'>
              <Typography.Text className='font-bold'>
                Created At
              </Typography.Text>
              <DatePicker
                format='DD-MM-YYYY'
                onChange={(e) =>
                  setPaymentPage({
                    ...paymentPage,
                    createdAt: e,
                    offset: 0,
                    current: 1
                  })
                }
                value={paymentPage.createdAt}
              />
            </div>
            <div className='col-span-3 flex gap-[5px] flex-col'>
              <Typography.Text className='font-bold'>Status</Typography.Text>
              <Select
                options={[
                  { label: 'Created', value: 'created' },
                  { label: 'Proceed', value: 'proceed' }
                ]}
                className='w-full'
                onChange={(e) =>
                  setPaymentPage({
                    ...paymentPage,
                    status: e,
                    offset: 0,
                    current: 1
                  })
                }
                value={paymentPage.status}
              />
            </div>
            <div className='col-span-3 flex gap-[5px] flex-col'>
              <Typography.Text className='font-bold'>Type</Typography.Text>
              <Select
                options={[
                  { label: 'Manual', value: 'manual' },
                  { label: 'Auto', value: 'auto' }
                ]}
                value={paymentPage.type}
                onChange={(e) =>
                  setPaymentPage({
                    ...paymentPage,
                    type: e,
                    offset: 0,
                    current: 1
                  })
                }
                className='w-full'
              />
            </div>
            <div className='col-span-15'>
              <CustomInput
                placeholder='Search invoice number, participant name'
                prefix={<AiOutlineSearch />}
                onKeyUp={onSearch}
              />
            </div>
          </>
        )}
      </div>

      {/* Table */}
      <div className='bg-white drop-shadow-md rounded p-6'>
        <div className='mb-[22px] flex flex-row justify-between items-center'>
          <Typography.Title level={4}>
            {type === 'invoice' ? 'List Invoice' : 'List Payment'}
          </Typography.Title>
          <div className='flex gap-[13px] flex-row items-center'>
            <Select
              options={[
                { label: 'Oldest', value: 'id,asc' },
                { label: 'Latest', value: 'id,desc' }
              ]}
              value={type === 'invoice' ? invoicePage.order : paymentPage.order}
              onChange={(e) =>
                type === 'invoice'
                  ? setInvoicePage({
                      ...invoicePage,
                      order: e,
                      offset: 0,
                      current: 1
                    })
                  : setPaymentPage({
                      ...paymentPage,
                      order: e,
                      offset: 0,
                      current: 1
                    })
              }
            />
            <Select
              options={[
                { label: '5 Entries', value: 5 },
                { label: '10 Entries', value: 10 }
              ]}
              value={type === 'invoice' ? invoicePage.limit : paymentPage.limit}
              onChange={(e) =>
                type === 'invoice'
                  ? setInvoicePage({ ...invoicePage, limit: e, current: 1 })
                  : setPaymentPage({ ...paymentPage, limit: e, current: 1 })
              }
            />
          </div>
        </div>
        <CustomTable
          column={
            type === 'invoice'
              ? Column.invoiceColumn(invoicePage.current, invoicePage.limit)
              : Column.paymentColumn(setModalOpen, setId)
          }
          dataSource={
            type === 'invoice'
              ? invoiceList?.data?.invoices
              : paymentList?.data?.payments
          }
          rowKey='id'
          loading={loading}
          onChangePagination={
            type === 'invoice'
              ? invoicePaginationChange
              : paymentPaginationChange
          }
          totalData={
            type === 'invoice'
              ? invoiceList?.data?.total_item
              : paymentList?.data?.total_item
          }
          current={
            type === 'invoice' ? invoicePage.current : paymentPage.current
          }
        />
        <ModalPaymentInvoice
          open={modalOpen}
          setOpen={setModalOpen}
          id={id}
          refreshData={fetchData}
        />
      </div>
    </AuthenticatedLayout>
  )
}
