import { AiFillCloseCircle } from 'react-icons/ai'
import { PiEyeFill } from 'react-icons/pi'
import { BiSolidPencil } from 'react-icons/bi'
import Router from 'next/router'

const column = (setModalEvent) => [
  {
    title: 'No.',
    render: (_text, _record, index) => index + 1
  },
  {
    title: 'Name',
    dataIndex: 'name'
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
          onClick={() =>
            Router.push(`/admin-management/detail-admin/${record.id}`)
          }
        />
        <BiSolidPencil
          className='cursor-pointer'
          onClick={() =>
            Router.push(`/admin-management/edit-admin/${record.id}`)
          }
        />
        <AiFillCloseCircle
          className='cursor-pointer'
          onClick={() => setModalEvent({ open: true, id: record.id })}
        />
      </div>
    )
  }
]

export default column
