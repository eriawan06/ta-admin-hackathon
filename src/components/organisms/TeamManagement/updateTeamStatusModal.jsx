import React from 'react'
import { Modal, Typography, notification } from 'antd'
import { CustomButton } from '@/components/_shared'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Team } from '@/store/service'

export default function UpdateTeamStatusModal({
  open = false,
  setOpen = () => {},
  id,
  fetchData
}) {

  const dispatch = useDispatch()
  const [api, contextHolder] = notification.useNotification()

  const onSubmit = (status) => {
      const payload = {
        id:id,
        body:{
          is_active:Boolean(status)
        }
      }
    
    dispatch(Team.UpdateStatusTeam(payload))
    .unwrap()
    .then((res) => {
      api.success({ message: res.data.message })
      setTimeout(() => {
      }, 500)
      fetchData()
      setOpen(false)
    })
    .catch((err) => {
      console.log(err)
      // })
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
              Update Status Team
            </Typography.Text>
            <Typography.Text className='mb-[16px] w-[150px] text-center'>
              Are you sure to change team’s status?
            </Typography.Text>
          </div>
        </>
      </Modal>
    </>
  )
}
