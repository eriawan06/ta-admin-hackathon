import { PiEyeFill } from 'react-icons/pi'
import { BiSolidPencil } from 'react-icons/bi'
import Router from 'next/router'
import { Date } from '@/helper'

const column = (current, limit, isJudge) => [
  {
    title: 'No.',
    render: (_text, _record, index) => (current - 1) * limit + index + 1
  },
  {
    title: 'Event ID',
    dataIndex: 'event_id'
  },
  {
    title: 'Team ID',
    dataIndex: 'team_id'
  },
  {
    title: 'Project ID',
    dataIndex: 'id'
  },
  {
    title: 'Project Name',
    dataIndex: 'name',
    width: 322
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (record) => (record === 'submitted' ? 'Submitted' : record === 'inactive' ? 'Inactive' : 'Draft' ),
    width: 126
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    render: Date.fullTime,
    width: 195
  },
  {
    title: 'Action',
    render: (record) => (
      <div className='flex flex-row gap-[11px]'>
        <PiEyeFill
          className='cursor-pointer'
          size={20}
          onClick={() =>
            Router.push(`/project-management/detail-project/${record.id}`)
          }
        />
        {!isJudge && (
          <BiSolidPencil
            className='cursor-pointer'
            size={20}
            //   onClick={() => Router.push('/project-management/edit-project')}
          />
        )}
      </div>
    )
  }
]

export default column
