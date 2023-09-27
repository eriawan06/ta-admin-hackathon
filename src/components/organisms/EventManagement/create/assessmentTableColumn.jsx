import { AiFillCloseCircle } from 'react-icons/ai'
import { BiSolidPencil } from 'react-icons/bi'

const AssessmentTableColumn = (
  current,
  limit,
  openAssessmentPopup,
  DeleteItems
) => [
  {
    title: 'No.',
    render: (_text, _record, index) => (current - 1) * limit + index + 1
  },
  {
    title: 'Criteria',
    dataIndex: 'criteria'
  },
  {
    title: 'Percentage Value',
    dataIndex: 'percentage_val',
    render: (record) => `${record}%`
  },
  {
    title: 'Score Range',
    render: (record) => `${record.score_start} - ${record.score_end}`
  },
  {
    title: 'Action',
    render: (record) => (
      <div className='flex flex-row gap-[10px]'>
        <BiSolidPencil
          className='cursor-pointer'
          onClick={() => openAssessmentPopup(true, record)}
        />
        <AiFillCloseCircle
          className='cursor-pointer'
          onClick={() => DeleteItems(record.id, 'Event Assessment')}
        />
      </div>
    )
  }
]

export default AssessmentTableColumn
