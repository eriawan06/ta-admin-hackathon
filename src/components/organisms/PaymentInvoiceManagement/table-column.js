import Router from 'next/router'
import { PiEyeFill } from 'react-icons/pi'
import { BiSolidPencil } from 'react-icons/bi'
import { Date } from '@/helper'

const invoiceColumn = (current, limit) => [
  {
    title: 'No.',
    width: 66,
    render: (_item, _record, index) => (current - 1) * limit + index + 1
  },
  {
    title: 'Event ID',
    dataIndex: 'event_id'
  },
  {
    title: 'Invoice Number',
    dataIndex: 'invoice_number'
  },
  {
    title: 'Participant Name',
    dataIndex: 'participant_name'
  },
  {
    title: 'Amount',
    dataIndex: 'amount'
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: 'Action',
    width: 85,
    render: (record) => (
      <div className='flex justify-center'>
        <PiEyeFill
          className='cursor-pointer'
          onClick={() =>
            Router.push(`/payment-management/detail-invoice/${record.id}`)
          }
        />
      </div>
    )
  }
]

const paymentColumn = (setOpen, setId) => [
  {
    title: 'No.',
    width: 66,
    render: (_item, _record, index) => index + 1
  },
  {
    title: 'Invoice Number',
    dataIndex: 'invoice_number'
  },
  {
    title: 'Type',
    dataIndex: 'payment_type'
  },
  {
    title: 'Payment Method',
    dataIndex: 'payment_method'
  },
  {
    title: 'CreatedAt',
    dataIndex: 'created_at',
    render: Date.fullTime
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: 'Action',
    width: 93,
    render: (record) => (
      <div className='flex justify-center flex-row gap-3'>
        <PiEyeFill
          className='cursor-pointer'
          onClick={() =>
            Router.push(`/payment-management/detail-payment/${record.id}`)
          }
        />
        {record.status === 'proceed' ? (' '):(
          <BiSolidPencil
            className='cursor-pointer'
            onClick={() => {
              setOpen(true)
              setId(record.id)
            }}
          />
        )}
      </div>
    )
  }
]

export default { invoiceColumn, paymentColumn }
