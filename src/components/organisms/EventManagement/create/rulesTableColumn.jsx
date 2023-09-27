import { AiFillCloseCircle } from 'react-icons/ai'
import { PiEyeFill } from 'react-icons/pi'
import { BiSolidPencil } from 'react-icons/bi'
import dayjs from 'dayjs'

const rulesTableColumn = (
  current,
  limit,
  openRulesPopup,
  openRulesDetail,
  DeleteItems
) => [
  {
    title: 'No.',
    render: (_text, _record, index) => (current - 1) * limit + index + 1
  },
  {
    title: 'Title',
    dataIndex: 'title'
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    render: (record) => ` ${dayjs(record).format('YYYY-MM-DD')}`
  },
  {
    title: 'Updated At',
    dataIndex: 'updated_at',
    render: (record) => ` ${dayjs(record).format('YYYY-MM-DD')}`
  },
  {
    title: 'Status',
    dataIndex: 'is_active',
    render: (record) => (record === true ? 'Active' : 'Inactive')
  },
  {
    title: 'Action',
    render: (record) => (
      <>
        <div className='flex flex-row gap-[10px]'>
          <PiEyeFill
            className='cursor-pointer'
            onClick={() => openRulesDetail(record.title, record.note)}
          />
          <BiSolidPencil
            className='cursor-pointer'
            onClick={() => openRulesPopup(true, record)}
          />
          <AiFillCloseCircle
            className='cursor-pointer'
            onClick={() => DeleteItems(record.id, 'Event Rules')}
          />
        </div>
      </>
    )
  }
]

export default rulesTableColumn
