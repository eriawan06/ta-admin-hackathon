const AssessmentTableColumn = (current, limit) => [
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
  }
]

export default AssessmentTableColumn
