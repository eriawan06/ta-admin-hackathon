import React from 'react'
import { Modal, Typography, notification } from 'antd'
import { CustomButton } from '@/components/_shared'
import { useDispatch } from 'react-redux'
import { Event } from '@/store/service'

export default function DeleteEventConfirmation({
  open = false,
  setOpen = () => {},
  TableSetting,
  Search,
  id
}) {
  const dispatch = useDispatch()
  const [notifApi, contextHolder] = notification.useNotification()

  function deleteEvent() {
    dispatch(Event.DeleteEvent(id))
      .unwrap()
      .then((ress) => {
        notifApi.success({ message: ress.data.message })
        setTimeout(() => {}, 2000)
        dispatch(
          Event.GetEventList({
            limit: TableSetting.limit,
            offset: TableSetting.offset,
            order: TableSetting.sort,
            status: TableSetting.status,
            start: TableSetting.start,
            end: TableSetting.end,
            q: Search
          })
        )
          .unwrap()
          .then((ress) => {
            notifApi.success({ message: ress.data.message })
            setTimeout(() => {}, 2000)
          })
          .catch((err) => {
            err.error.map((item) => {
              notifApi.error({ message: item })
            })
            setTimeout(() => {}, 2000)
          })
      })
      .catch((err) => {
        err.error.map((item) => {
          notifApi.error({ message: item })
        })
        setTimeout(() => {}, 2000)
      })
    setOpen(false)
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        closeIcon={null}
        width='386px'
        footer={
          <>
            <div className='flex gap-[25px] justify-center'>
              <CustomButton
                type='primary-ghost'
                className='w-[126px]'
                children={'Cancel'}
                onClick={() => setOpen(false)}
              />
              <CustomButton
                className='w-[126px]'
                children={'Delete'}
                onClick={deleteEvent}
              />
            </div>
          </>
        }
      >
        <>
          <div className='flex items-center flex-col gap-[19px]'>
            <Typography.Text className='text-2xl font-bold'>
              Delete Confirmation
            </Typography.Text>
            <Typography.Text className='mb-[16px] w-[350px] text-center'>
              You are about to delete this Event. This action cannot be undone.
            </Typography.Text>
          </div>
        </>
      </Modal>
    </>
  )
}
