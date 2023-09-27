import { AiFillCloseCircle } from 'react-icons/ai'
import { PiEyeFill } from 'react-icons/pi'
import Router from 'next/router'

const column = (setModalDeleteOpen) =>  [
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
      <div className='flex flex-row gap-[10px]'>
        <PiEyeFill
          className='cursor-pointer'
          onClick={() => Router.push(`/team-management/detail/${record.id}`)}
        />
        <AiFillCloseCircle
          className='cursor-pointer' 
          onClick={()=> setModalDeleteOpen({ open:true , id:record.id }) }
         />
      </div>
    )
  }
]

export default column
