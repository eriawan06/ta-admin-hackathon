import { AiFillCloseCircle } from 'react-icons/ai'
import { PiEyeFill } from 'react-icons/pi'
import { BiSolidPencil } from 'react-icons/bi'
import Router from 'next/router'
import { Popconfirm } from 'antd'


const ParticipantManagementColumn = (current,limit, onClickSetModalStatus, onClickSetModalDelete) => [
  {
    title: 'No.',
    render: (_text, _record, index) => (current - 1) * limit + index + 1

  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone_number'
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
          onClick={() => Router.push( `/participant-management/detail/${record.id} `)}
        />
        <BiSolidPencil
          className='cursor-pointer'
          onClick={()=> onClickSetModalStatus(record) }
        />
        <AiFillCloseCircle 
          className='cursor-pointer' 
          onClick={()=> onClickSetModalDelete(record.user_id)} 
        />
      </div>
    )
  }
]

export default ParticipantManagementColumn
