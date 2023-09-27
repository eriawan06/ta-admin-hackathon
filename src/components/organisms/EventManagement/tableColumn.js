import { AiFillCloseCircle } from 'react-icons/ai'
import { PiEyeFill } from 'react-icons/pi'
import { BiSolidPencil } from 'react-icons/bi'
import dayjs from 'dayjs'
import Router from 'next/router'

const column = (current, limit, forDelete) => [
  {
    title: 'No.',
    render: (_text, _record, index) => (current - 1) * limit + index + 1
  },
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Start Date',
    dataIndex: 'start_date',
    render: (record) => dayjs(record).format('YYYY-MM-DD')
  },
  {
    title: 'End Date',
    dataIndex: 'end_date',
    render: (record) => dayjs(record).format('YYYY-MM-DD')
  },
  {
    title: 'Registration Fee',
    dataIndex: 'reg_fee',
    render: (record) => `RP. ${record} / Person`
  },
  {
    title: 'Status',
    dataIndex: 'status'
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id) => (
      <div className='flex flex-row gap-[10px]'>
        <PiEyeFill
          className='cursor-pointer'
          onClick={() => {
            Router.push(`/event-management/detail/${id}`)
          }}
        />
        <BiSolidPencil
          className='cursor-pointer'
          onClick={() => Router.push(`/event-management/edit/${id}`)}
        />
        <AiFillCloseCircle
          className='cursor-pointer'
          onClick={() => forDelete(id)}
        />
      </div>
    )
  }
]

export default column
