import React from 'react'
import { Modal, Typography, Table } from 'antd'
import { CustomButton } from '@/components/_shared'
import Column from './table-column'
import { useEffect } from 'react'
import { useState } from 'react'

export default function ProjectModal({
  open = false,
  setOpen = () => { },
  project,
  eventAssessments = []
}) {
  const [dataTable, setDataTable] = useState([])
  useEffect(() => {
    console.log('EVENT ASSESSMENTS: ', eventAssessments);
    const assessments = []
    eventAssessments.map((data) => {
      assessments.push({
        criteria: data.criteria,
        percentage: data.percentage_val + '%',
        score: data.score_start + '-' + data.score_end
      })
    })
    setDataTable(assessments)
  }, [eventAssessments])

  const handleSubmit = () => {
    
  }
  

  return (
    <>
      <Modal
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        closeIcon={null}
        width='80%'
        footer={
          <>
            <div className='flex gap-[21px] flex-row'>
              <CustomButton
                height='32px'
                onClick={() => setOpen(false)}
              >
                Submit
              </CustomButton>
              <CustomButton
                onClick={() => setOpen(false)}
                height='32px'
                type='primary-ghost'
              >
                Cancel
              </CustomButton>
            </div>
          </>
        }
      >
        <div className='flex gap-[34px] flex-col'>
          <div className='rounded-lg pt-[23px] px-6 pb-[15px]'>
            <Typography.Title
              level={5}
              style={{ marginBottom: '18px' }}
            >
              Assessment Criteria
            </Typography.Title>
            <Table
              columns={Column.criteriaColumn}
              dataSource={dataTable}
              size='small'
              pagination={{ hideOnSinglePage: true }}
            />
          </div>
          <div className='rounded-lg pt-[23px] px-6 pb-5'>
            <Typography.Title
              level={5}
              style={{ marginBottom: '18px' }}
            >
              Assessment {project.name}
            </Typography.Title>
            <Table
              columns={Column.projectColumn}
              dataSource={dataTable}
              size='small'
              pagination={{ hideOnSinglePage: true }}
              summary={() => {
                return (
                  <>
                    <Table.Summary className='bg-opacity-40'>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>
                          Total Score
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>0</Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  </>
                )
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
