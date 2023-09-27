import React, { useState } from 'react'
import { Modal, Typography, notification } from 'antd'
import { CustomButton } from '@/components/_shared'
import { useDispatch } from 'react-redux'
import { Participant } from '@/store/service'
import { useRouter } from 'next/router'

export default function DeleteParticipantModal({
  open = false,
  setOpen = () => {},
  id,
  fetchData
}) {

    const dispatch = useDispatch()
    const [notifApi,holder] = notification.useNotification()


  // Delete Function
  const deleteItem = (id) => {
    dispatch(Participant.DeleteParticipant(id))
      .unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
        fetchData()
        setOpen(false)
      })
      .catch((err) => {
        err.error.map((message) => {
          notifApi.error({ message })
        })
      })
  }

  return (
    <>
      <Modal
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        closeIcon={null}
        width='386px'
        footer={
          <>
            {holder}
            <div className='flex gap-[25px] justify-center'>
              <CustomButton
                className='w-[126px]'
                children={'Cancel'}
                onClick={() => setOpen(false)}
              />
              <CustomButton
                className='w-[126px]'
                children={'Continue'}
                onClick={() => deleteItem(id)}
              />
            </div>
          </>
        }
      >
        <>
          <div className='flex items-center flex-col gap-[19px]'>
            <Typography.Text className='text-2xl font-bold'>
              Delete Participant
            </Typography.Text>
            <Typography.Text className='mb-[16px] w-[198px] text-center'>
              Are you sure to delete participant’s status?
            </Typography.Text>
          </div>
        </>
      </Modal>
    </>
  )
}
