import { PiEyeFill } from 'react-icons/pi'
import dayjs from 'dayjs'

const faqsTableColumn = (current, limit, openFaqsDetail) => [
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
    dataIndex: 'IsActive',
    render: (record) => (record === true ? 'Active' : 'Inactive')
  },
  {
    title: 'Action',
    align: 'center',
    render: (record) => (
      <>
        <div className='flex flex-row gap-[10px]'>
          <PiEyeFill
            className='cursor-pointer w-full text-center'
            onClick={() => openFaqsDetail(record.title, record.note)}
          />
        </div>
      </>
    )
  }
]

export default faqsTableColumn
