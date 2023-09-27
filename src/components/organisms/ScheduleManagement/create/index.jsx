import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import column from './table-column'
import {
  DatePicker,
  Typography,
  Form,
  notification,
  Tooltip,
  Modal
} from 'antd'
import {
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomTable
} from '@/components/_shared'
import ScheduleModal from '@/components/molecules/ScheduleManagement/modal'
import { useDispatch, useSelector } from 'react-redux'
import { Event, Mentor, Schedule, Team } from '@/store/service'
import dayjs from 'dayjs'

export default function AddSchedule() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [notifApi, contextHolder] = notification.useNotification()

  const { eventList } = useSelector((state) => state.event)
  const { dataMentor } = useSelector((state) => state.mentor)
  const { TeamSchedule } = useSelector((state) => state.team)
  const { loading } = useSelector((state) => state.schedule)

  const [page, setPage] = useState({ limit: 10, offset: 0, current: 1 })
  const [open, setOpen] = useState(false)
  const [scheduleId, setScheduleId] = useState(null)
  const [hasTeam, setHasTeam] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState({
    open: false,
    id: null
  })

  useEffect(() => {
    dispatch(Event.GetEventList({ order: 'id,asc' }))
    dispatch(Mentor.GetMentorList({ order: 'id,asc' }))
  }, [])

  const onSubmit = (e) => {
    const payload = { ...e, held_on: dayjs(e.held_on).format() }
    dispatch(Schedule.CreateSchedule(payload))
      .unwrap()
      .then((res) => {
        setScheduleId(res.data.data.id)
        notifApi.success({ message: res.data.message })
      })
      .catch((err) => {
        err.error?.map((message) => {
          notifApi.error({ message })
        })
      })
  }

  const addTeamtoSchedule = (teamId) => {
    dispatch(
      Schedule.AddTeamtoSchedule({ schedule_id: scheduleId, team_id: teamId })
    )
      .unwrap()
      .then((res) => {
        setHasTeam(true)
        setOpen(false)
        notifApi.success({ message: res.data.message })
        dispatch(
          Team.GetTeamSchedule({
            limit: page.limit,
            offset: page.offset,
            order: 'id,asc',
            schedule: scheduleId
          })
        )
          .unwrap()
          .then((res) => {
            notifApi.success({ message: res.data.message })
          })
          .catch((err) => {
            err.error?.map((message) => {
              notifApi.error({ message })
            })
          })
      })
      .catch((err) => {
        err.error?.map((message) => {
          notifApi.error({ message })
        })
      })
  }

  const breadcrumb = [
    {
      title: 'Schedule Management',
      onClick: () => router.push('/schedule-management')
    },
    {
      title: 'Add Schedule',
      onClick: () => router.push('/schedule-management/add-schedule')
    }
  ]

  const deleteTeamAtSchedule = (team_id) => {
    const payload = {
      id: scheduleId,
      team_id: team_id
    }
    dispatch(Schedule.DeleteTeamAtSchedule(payload))
      .unwrap()
      .then((res) => {
        setHasTeam(true)
        setOpen(false)
        notifApi.success({ message: res.data.message })
        dispatch(
          Team.GetTeamSchedule({
            limit: page.limit,
            offset: page.offset,
            order: 'id,asc',
            schedule: scheduleId
          })
        )
          .unwrap()
          .then((res) => {
            notifApi.success({ message: res.data.message })
          })
          .catch((err) => {
            err.error?.map((message) => {
              notifApi.error({ message })
            })
          })
        setModalDeleteOpen({ open: false })
      })
      .catch((err) => {
        err.error?.map((message) => {
          notifApi.error({ message })
        })
        setModalDeleteOpen({ open: false })
      })
  }

  return (
    <AuthenticatedLayout
      withBack
      breadcrumb={breadcrumb}
    >
      {contextHolder}
      <div className='flex flex-col gap-[27px]'>
        <div className='flex flex-col'>
          <div className='flex flex-col p-[30px] rounded bg-white drop-shadow-md gap-[26px]'>
            <Form
              requiredMark={false}
              layout='vertical'
              form={form}
              onFinish={onSubmit}
            >
              <div className='grid grid-cols-2 grid-rows-2 gap-y-[18px] gap-x-[69px]'>
                <Form.Item
                  label='Event Id'
                  name='event_id'
                  rules={[
                    { required: true, message: 'This field is required' }
                  ]}
                >
                  <CustomSelect
                    options={eventList.data?.events.map((item) => ({
                      label: item.name,
                      value: item.id
                    }))}
                    placeholder='Select an event'
                  />
                </Form.Item>
                <Form.Item
                  label='Title'
                  name='title'
                  rules={[
                    { required: true, message: 'This field is required' }
                  ]}
                >
                  <CustomInput />
                </Form.Item>
                <Form.Item
                  label='Mentor'
                  name='mentor_id'
                  rules={[
                    { required: true, message: 'This field is required' }
                  ]}
                >
                  <CustomSelect
                    options={dataMentor.data?.mentors.map((item) => ({
                      label: item.name,
                      value: item.id
                    }))}
                    placeholder='Select a mentor'
                  />
                </Form.Item>
                <Form.Item
                  label='Date & Time'
                  name='held_on'
                  rules={[
                    { required: true, message: 'This field is required' }
                  ]}
                >
                  <DatePicker
                    showTime
                    className='w-full'
                  />
                </Form.Item>
              </div>
            </Form>
            {!scheduleId && (
              <CustomButton
                onClick={() => form.submit()}
                className='w-[153px]'
                loading={loading}
              >
                Save
              </CustomButton>
            )}
          </div>
        </div>
        {scheduleId && (
          <div className='flex flex-col gap-[45px] py-[35px] px-[30px] bg-white drop-shadow-md rounded'>
            <div className='flex justify-between items-center'>
              <Typography.Text className='font-bold text-xl'>
                Teams
              </Typography.Text>
              <Tooltip
                title={!scheduleId ? 'Please add schedule info first' : ''}
              >
                <CustomButton
                  className='w-[120px]'
                  onClick={() => setOpen(true)}
                  disabled={!scheduleId}
                >
                  + Add
                </CustomButton>
              </Tooltip>
            </div>
            <div>
              <CustomTable
                column={column(setModalDeleteOpen)}
                dataSource={hasTeam ? TeamSchedule.teams : []}
                rowKey='name'
              />
            </div>
          </div>
        )}
      </div>
      <ScheduleModal
        open={open}
        setOpen={setOpen}
        addTeam={addTeamtoSchedule}
      />
      <Modal
        open={modalDeleteOpen.open}
        onCancel={() => setModalDeleteOpen({ open: false, id: null })}
        onOk={() => deleteTeamAtSchedule(modalDeleteOpen.id)}
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
    </AuthenticatedLayout>
  )
}
