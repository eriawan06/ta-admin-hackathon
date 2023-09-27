import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import column from './table-column'
import { DatePicker, Typography, Form, notification, Skeleton } from 'antd'
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

export default function EditSchedule({ detail }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [notifApi, contextHolder] = notification.useNotification()

  const { eventList } = useSelector((state) => state.event)
  const { dataMentor } = useSelector((state) => state.mentor)
  const { TeamSchedule } = useSelector((state) => state.team)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch(Event.GetEventList({ order: 'id,asc' }))
    dispatch(Mentor.GetMentorList({ order: 'id,asc' }))
  }, [])

  useEffect(() => {
    if (detail) {
      const payload = {
        limit: 10,
        order: 'id,asc',
        offset: 0,
        schedule: detail.id
      }
      dispatch(Team.GetTeamSchedule(payload))
        .unwrap()
        .then((res) => {
          notifApi.success({ message: res.data.message })
        })
        .catch((err) => {
          err.error?.map((message) => {
            notifApi.error({ message })
          })
        })
    }
  }, [detail])

  useEffect(() => {
    if (detail) {
      form.setFieldValue('event_id', detail.event_id)
      form.setFieldValue('title', detail.title)
      dataMentor.data?.mentors.filter((mentor) => {
        if (mentor.name === detail.mentor_name) {
          form.setFieldValue('mentor_id', mentor.id)
        }
      })

      form.setFieldValue('held_on', dayjs(detail.held_on))
    }
  }, [detail, dataMentor])

  const onSubmit = (e) => {
    const body = {
      id: router.query.id,
      payload: { ...e, held_on: dayjs(e.held_on).format() }
    }
    dispatch(Schedule.UpdateSchedule(body))
      .unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
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
        dispatch(
          Team.GetTeamList({
            limit: page.limit,
            offset: page.offset,
            order: 'id,asc',
            schedule: detail.id
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
      title: 'Edit Schedule'
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
                    <DatePicker showTime className='w-full' />
                  </Form.Item>
                </div>
              </Form>
              <CustomButton
                onClick={() => form.submit()}
                className='w-[153px]'
              >
                Save
              </CustomButton>
            </div>
          </div>
          <div className='flex flex-col gap-[45px] py-[35px] px-[30px] bg-white drop-shadow-md rounded'>
            <div className='flex justify-between items-center'>
              <Typography.Text className='font-bold text-xl'>
                Teams
              </Typography.Text>
              <CustomButton
                className='w-[120px]'
                onClick={() => setOpen(true)}
              >
                + Add
              </CustomButton>
            </div>
            <div>
              <CustomTable
                column={column}
                dataSource={TeamSchedule.teams}
                rowKey='name'
              />
            </div>
          </div>
        </div>
      )}
      <ScheduleModal
        open={open}
        setOpen={setOpen}
        addTeam={addTeamtoSchedule}
      />
    </AuthenticatedLayout>
  )
}
