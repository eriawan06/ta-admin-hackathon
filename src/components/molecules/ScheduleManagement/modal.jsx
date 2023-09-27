import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { CustomButton, CustomTable } from '@/components/_shared'
import column from './table-column'
import { useDispatch, useSelector } from 'react-redux'
import { Team } from '@/store/service'

export default function ScheduleModal({ open = false, setOpen, addTeam }) {
  const dispatch = useDispatch()

  const { TeamList } = useSelector((state) => state.team)

  const [page, setPage] = useState({
    limit: 10,
    offset: 0,
    current: 1,
    order: 'id,asc'
  })

  useEffect(() => {
    if (open) {
      dispatch(
        Team.GetTeamList({
          limit: page.limit,
          offset: page.offset,
          order: page.order
        })
      )
    }
  }, [open])

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
                Done
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
        <CustomTable
          column={column(addTeam)}
          dataSource={TeamList.teams}
          rowKey='name'
        />
      </Modal>
    </>
  )
}
