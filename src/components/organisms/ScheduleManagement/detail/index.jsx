import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { Typography, Skeleton, notification, Modal } from 'antd'
import { useRouter } from 'next/router'
import { CustomButton, CustomTable, CustomImage } from '@/components/_shared'
import column from './table-column'
import { Date } from '@/helper'
import ScheduleModal from '@/components/molecules/ScheduleManagement/modal'
import { useDispatch } from 'react-redux'
import { Team, Schedule } from '@/store/service'

export default function DetailSchedule({
  detail,
  team,
  page,
  setPage,
  fetchData
}) {
  const router = useRouter()
  const dispatch = useDispatch()

  const [notifApi, contextHolder] = notification.useNotification()

  const [open, setOpen] = useState(false)

  const [modalDelete, setModalDelete] = useState({ open: false, id: null })
  //delete team
  const deleteItem = () => {
    const payload = {
      id: detail.id,
      team_id: modalDelete.id
    }
    dispatch(Schedule.DeleteTeamAtSchedule(payload))
      .unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
        setModalDelete({ open: false, id: null })
        setPage({ ...page, current: 1, offset: 0 })
        fetchData()
      })
      .catch((err) => {
        err.error.map((message) => {
          notifApi.error({ message })
        })
      })
  }

  const addTeamtoSchedule = (teamId) => {
    dispatch(
      Schedule.AddTeamtoSchedule({ schedule_id: detail.id, team_id: teamId })
    )
      .unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
        fetchData()
      })
      .catch((err) => {
        err.error?.map((message) => {
          notifApi.error({ message })
        })
      })
  }

  // Get role User
  const [roleUser, setRoleUser] = useState(null)
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setRoleUser(JSON.parse(user))
    }
  }, [])

  const breadcrumb = [
    {
      title: 'Schedule Management',
      onClick: () => router.push('/schedule-management')
    },
    {
      title: 'Detail Schedule',
      onClick: () => router.push('/schedule-management/detail-schedule')
    }
  ]

  return (
    <AuthenticatedLayout
      withBack
      breadcrumb={breadcrumb}
    >
      {contextHolder}
      {!detail ? (
        <Skeleton />
      ) : (
        <div className='flex flex-col gap-[42px]'>
          <div className='flex gap-[26px] '>
            <div className='flex flex-col w-[270px] h-[192px] gap-[13px] items-center justify-center bg-white drop-shadow-md rounded'>
              <div className='w-[98px] h-[98px] rounded-full border overflow-hidden'>
                <CustomImage
                  imageUrl={detail.mentor_avatar}
                  width={98}
                  height={98}
                />
              </div>
              <div className='flex flex-col items-center'>
                <Typography.Text className='font-bold'>
                  {detail.mentor_name}
                </Typography.Text>
                <Typography.Text>{detail.mentor_occupation}</Typography.Text>
              </div>
            </div>
            <div className='flex flex-grow bg-white drop-shadow-md rounded'>
              <div className='grid grid-cols-2 grid-rows-2 w-full p-[30px] gap-3'>
                <div className='flex flex-col gap-3'>
                  <Typography.Text className='font-bold'>
                    Event ID
                  </Typography.Text>
                  <Typography.Text>{detail.event_id}</Typography.Text>
                </div>
                <div className='flex flex-col gap-3'>
                  <Typography.Text className='font-bold'>
                    Schedule ID
                  </Typography.Text>
                  <Typography.Text>{detail.id}</Typography.Text>
                </div>
                <div className='flex flex-col gap-3 '>
                  <Typography.Text className='font-bold'>Title</Typography.Text>
                  <Typography.Text>{detail.title}</Typography.Text>
                </div>
                <div className='flex flex-col gap-3'>
                  <Typography.Text className='font-bold'>
                    Date & Time
                  </Typography.Text>
                  <Typography.Text>
                    {Date.fullTime(detail.held_on)}
                  </Typography.Text>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-[45px] py-[35px] px-[30px] bg-white drop-shadow-md rounded'>
            <div className='flex justify-between items-center'>
              <Typography.Text className='font-bold text-xl'>
                Teams
              </Typography.Text>
              {roleUser?.role_name === 'Mentor' || roleUser?.role_name === 'Admin' ? (
                ' '
              ) : (
                <CustomButton
                  className='w-[120px]'
                  onClick={() => setOpen(true)}
                >
                  + Add
                </CustomButton>
              )}
            </div>
            <div>
              <CustomTable
                column={column(setModalDelete, roleUser)}
                dataSource={team}
                rowKey='name'
              />
            </div>
          </div>
          <ScheduleModal
            open={open}
            setOpen={setOpen}
            addTeam={addTeamtoSchedule}
          />
          <Modal
            open={modalDelete.open}
            onCancel={() => setModalDelete({ open: false, id: null })}
            onOk={() => deleteItem()}
            title='Delete'
            okButtonProps={{
              className: 'custom-button-primary'
            }}
          >
            <>
              <div className='flex items-center flex-col gap-[19px]'>
                <Typography.Text className='text-2xl font-bold'>
                  Delete Confirmation
                </Typography.Text>
                <Typography.Text className='mb-[16px] w-[350px] text-center'>
                  You are about to delete this?
                </Typography.Text>
              </div>
            </>
          </Modal>
        </div>
      )}
    </AuthenticatedLayout>
  )
}
