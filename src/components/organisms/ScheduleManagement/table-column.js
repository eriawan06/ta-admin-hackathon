import { AiFillCloseCircle } from 'react-icons/ai'
import { PiEyeFill } from 'react-icons/pi'
import { BiSolidPencil } from 'react-icons/bi'
import Router from 'next/router'
import { Date } from '@/helper'
import { Popconfirm } from 'antd'

const column = (current, limit, isMentor, setModalOpen) => [
  {
    title: 'No.',
    render: (_text, _record, index) => (current - 1) * limit + index + 1
  },
  {
    title: 'Event ID',
    dataIndex: 'event_id'
  },
  {
    title: 'Mentor Name',
    dataIndex: 'mentor_name'
  },
  {
    title: 'Title',
    dataIndex: 'title'
  },
  {
    title: 'Date & Time',
    dataIndex: 'held_on',
    render: Date.fullTime
  },
  {
    title: 'Action',
    render: (record) => (
      <div className='flex flex-row gap-[10px]'>
        <PiEyeFill
          className='cursor-pointer'
          onClick={() =>
            Router.push(`/schedule-management/detail-schedule/${record.id}`)
          }
        />
        {!isMentor && (
          <>
            <BiSolidPencil
              className='cursor-pointer'
              onClick={() =>
                Router.push(`/schedule-management/edit-schedule/${record.id}`)
              }
            />
            <AiFillCloseCircle
              className='cursor-pointer'
              onClick={() => setModalOpen({ open: true, id: record.id })}
            />
          </>
        )}
      </div>
    )
  }
]

export default column
