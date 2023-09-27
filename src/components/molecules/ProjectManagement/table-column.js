import { CustomInput } from '@/components/_shared'

const criteriaColumn = [
  {
    title: 'Criteria',
    dataIndex: 'criteria'
  },
  {
    title: 'Percentage Value',
    dataIndex: 'percentage'
  },
  {
    title: 'Score Value',
    dataIndex: 'score'
  }
]

const projectColumn = [
  {
    title: 'Criteria',
    dataIndex: 'criteria',
    width: '60%'
  },
  {
    title: 'Score Value',
    render: () => <CustomInput size='small' />
  }
]

export default { criteriaColumn, projectColumn }
