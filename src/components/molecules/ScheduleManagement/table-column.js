import { IoMdAddCircle } from 'react-icons/io'

const column = (addTeam) => [
  {
    title: 'No.',
    render: (_text, _record, index) => index + 1
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 316
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
    render: (record) => (record ? 'Active' : 'Inactive')
  },
  {
    title: 'Action',
    render: (record) => (
      <div className='flex flex-row ps-5 gap-[10px]'>
        <IoMdAddCircle
          className='cursor-pointer'
          onClick={() => addTeam(record.id)}
        />
      </div>
    )
  }
]

export default column
