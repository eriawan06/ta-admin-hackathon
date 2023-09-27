import React, { useState } from 'react'
import { Modal, Typography, notification } from 'antd'
import { CustomButton } from '@/components/_shared'
import { useDispatch } from 'react-redux'
import { Participant } from '@/store/service'
import { useRouter } from 'next/router'

export default function UpdateParticipantStatusModal({
  open = false,
  setOpen = () => {},
  data,
  fetchData
}) {
  const dispatch = useDispatch()
  const router = useRouter()
  const [api, contextHolder] = notification.useNotification()

  const onSubmit = (status) => {
    const body = {
      id: data.user_id,
      payload: {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        is_active:Boolean(status)
      }
    }
    dispatch(Participant.UpdateParticipantStatus(body))
    .unwrap()
    .then((res) => {
      api.success({ message: res.data.message })
      setTimeout(() => {
        router.push('/participant-management')
      }, 500)
      fetchData()
      setOpen(false)
    })
    .catch((err) => {
      err.error.map((message) => {
        api.error({ message: message })
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
          {contextHolder}
            <div className='flex gap-[25px] justify-center'>
              <CustomButton
                className='w-[126px]'
                children={'Active'}
                onClick={()=>onSubmit(true)}
              />
              <CustomButton
                className='w-[126px]'
                children={'Inactive'}
                onClick={()=>onSubmit(false)}
              />
            </div>
          </>
        }
      >
        <>
          <div className='flex items-center flex-col gap-[19px]'>
            <Typography.Text className='text-2xl font-bold'>
              Update Status Participant
            </Typography.Text>
            <Typography.Text className='mb-[16px] w-[198px] text-center'>
              Are you sure to change participant’s status? 
            </Typography.Text>
          </div>
        </>
      </Modal>
    </>
  )
}
