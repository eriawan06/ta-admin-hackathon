import { AiFillEye, AiFillCloseCircle } from 'react-icons/ai'
import { BiSolidPencil } from 'react-icons/bi'
import Router from 'next/router'

const column = (route, current, limit, setModalOpen) => [
  {
    title: 'No.',
    render: (_text, _record, index) => (current - 1) * limit + index + 1
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
        <AiFillEye
          className='cursor-pointer'
          onClick={() => Router.push(`${route.detail}/${record.id}`)}
        />
        <BiSolidPencil
          className='cursor-pointer'
          onClick={() => Router.push(`${route.edit}/${record.id}`)}
        />
        <AiFillCloseCircle
          className='cursor-pointer'
          onClick={() => setModalOpen({ open: true, id: record.id })}
        />
      </div>
    )
  }
]

export default column
