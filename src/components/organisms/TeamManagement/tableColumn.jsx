import { PiEyeFill } from 'react-icons/pi'
import { BiSolidPencil } from 'react-icons/bi'
import Router from 'next/router'

const TeamManagementColumn = (current, limit, onClickSetModal) => [
  {
    title: 'No.',
    render: (_text, _record, index) => (current - 1) * limit + index + 1
  },
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Event ID',
    dataIndex: 'event_id'
  },
  {
    title: 'Member',
    dataIndex: 'num_of_member'
  },
  {
    title: 'Created By',
    dataIndex: 'participant_name'
  },
  {
    title: 'Status',
    dataIndex: 'is_active',
    render: (record) => (record === true ? 'Active' : 'Inactive')
  },
  {
    title: 'Action',
    render: (record) => (
      <div className='flex flex-row gap-[10px]'>
        <PiEyeFill
          className='cursor-pointer'
          onClick={() => Router.push(`/team-management/detail/${record.id}`)}
        />
        <BiSolidPencil
          className='cursor-pointer'
          onClick={() => onClickSetModal(record.id)}
        />
      </div>
    )
  }
]

export default TeamManagementColumn
