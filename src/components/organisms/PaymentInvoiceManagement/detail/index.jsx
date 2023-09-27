import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { useRouter } from 'next/router'
import { Typography, Skeleton } from 'antd'
import { CustomSelect, CustomTable, CustomButton } from '@/components/_shared'
import Column from '../table-column'
import { Date } from '@/helper'
import ModalPaymentInvoice from '@/components/molecules/paymentInvoiceManagement/Modal'

export default function DetailPaymentInvoice({
  type = 'invoice',
  data,
  invoicePayment = [],
  page = {},
  setPage = () => {},
  fetchData = () => {}
}) {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [id, setId] = useState()

  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id)
    }
  }, [router])

  const breadcrumb = [
    {
      title: 'Payment Management',
      onClick: () => router.push('/payment-management')
    },
    {
      title: `Detail ${type === 'invoice' ? 'Invoice' : 'Payment'}`
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

  const sortOption = [
    { label: 'Oldest', value: 'id,asc' },
    { label: 'Latest', value: 'id,desc' }
  ]

  return (
    <AuthenticatedLayout
      breadcrumb={breadcrumb}
      withBack
    >
      {!data ? (
        <Skeleton />
      ) : (
        <>
          {type === 'payment' && data.status !== 'proceed' && (
            <CustomButton
              className='mb-[30px] px-5'
              onClick={() => setModalOpen(true)}
            >
              Process
            </CustomButton>
          )}
          <div className='flex gap-[22px] flex-col'>
            <div className='p-[30px] rounded bg-white drop-shadow-md grid grid-cols-3 w-full'>
              {type === 'invoice' ? (
                <>
                  <div className='flex gap-[25px] flex-col'>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Event ID
                      </Typography.Text>
                      <Typography.Text>{data.id}</Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Status
                      </Typography.Text>
                      <Typography.Text>{data.status}</Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Approved at
                      </Typography.Text>
                      <Typography.Text>
                        {Date.fullTime(data.approved_at)}
                      </Typography.Text>
                    </div>
                  </div>

                  <div className='flex gap-[25px] flex-col'>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Invoice Number
                      </Typography.Text>
                      <Typography.Text>{data.invoice_number}</Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Amount
                      </Typography.Text>
                      <Typography.Text>Rp. {data.amount}</Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Approved By
                      </Typography.Text>
                      <Typography.Text>{data.approved_by}</Typography.Text>
                    </div>
                  </div>

                  <div className='flex gap-[25px] flex-col'>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Participant Name
                      </Typography.Text>
                      <Typography.Text>{data.participant_name}</Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Paid Amount
                      </Typography.Text>
                      <Typography.Text>Rp {data.paid_amount}</Typography.Text>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className='flex gap-[25px] flex-col'>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Event ID
                      </Typography.Text>
                      <Typography.Text>{data?.event_id}</Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Payment ID
                      </Typography.Text>
                      <Typography.Text>{data?.id}</Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Created at
                      </Typography.Text>
                      <Typography.Text>
                        {Date.fullTime(data?.created_at)}
                      </Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Bank Account Name
                      </Typography.Text>
                      <Typography.Text>
                        {data?.bank_account_name}
                      </Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Amount
                      </Typography.Text>
                      <Typography.Text>{data?.amount}</Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Note
                      </Typography.Text>
                      <Typography.Text>{data?.note}</Typography.Text>
                    </div>
                  </div>

                  <div className='flex gap-[25px] flex-col'>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Invoice Number
                      </Typography.Text>
                      <Typography.Text>{data?.invoice_number}</Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Payment Type
                      </Typography.Text>
                      <Typography.Text>{data?.payment_type}</Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Status
                      </Typography.Text>
                      <Typography.Text>{data?.status}</Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Bank Account Number
                      </Typography.Text>
                      <Typography.Text>
                        {data?.bank_account_number}
                      </Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Proceed At
                      </Typography.Text>
                      <Typography.Text>
                        {Date.fullTime(data?.proceed_at)}
                      </Typography.Text>
                    </div>
                  </div>

                  <div className='flex gap-[25px] flex-col'>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Participant Name
                      </Typography.Text>
                      <Typography.Text>
                        {data?.participant_name}
                      </Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Payment Method
                      </Typography.Text>
                      <Typography.Text>
                        {data?.payment_method_name}
                      </Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Bank Name
                      </Typography.Text>
                      <Typography.Text>{data?.bank_name}</Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Evidence
                      </Typography.Text>
                      <Typography.Text
                        className='underline cursor-pointer'
                        onClick={() => (window.location.href = data?.evidence)}
                      >
                        Click Here
                      </Typography.Text>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Typography.Text className='font-bold'>
                        Proceed By
                      </Typography.Text>
                      <Typography.Text>{data?.proceed_by}</Typography.Text>
                    </div>
                  </div>
                </>
              )}
            </div>
            {type === 'invoice' && (
              <div className='flex flex-col gap-[22px] rounded bg-white drop-shadow-md p-8'>
                <div className='flex flex-row gap-[13px] justify-between'>
                  <Typography.Text className='font-bold text-xl'>
                    Payment History
                  </Typography.Text>
                  <div className='flex flex-row gap-3'>
                    <CustomSelect
                      options={sortOption}
                      size='large'
                      value={page.order}
                      onChange={(e) => setPage({ ...page, order: e })}
                    />
                    <CustomSelect
                      options={entriesOption}
                      size='large'
                      value={page.limit}
                      onChange={(e) => setPage({ ...page, limit: e })}
                    />
                  </div>
                </div>
                <div>
                  <CustomTable
                    column={Column.paymentColumn(setModalOpen, setId)}
                    dataSource={invoicePayment}
                    rowKey='id'
                  />
                </div>
              </div>
            )}
          </div>
          <ModalPaymentInvoice
            open={modalOpen}
            setOpen={setModalOpen}
            id={id}
            refreshData={fetchData}
          />
        </>
      )}
    </AuthenticatedLayout>
  )
}
