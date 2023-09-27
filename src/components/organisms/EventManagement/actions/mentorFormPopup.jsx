import React from 'react'
import { useRouter } from 'next/router'
import { CustomButton } from '@/components/_shared'
import { Form, Modal, Typography, Select, notification } from 'antd'
import { useDispatch } from 'react-redux'
import { Event } from '@/store/service'

export default function MentorFormPopup({
  open = false,
  setOpen = () => {},
  mentorData,
  eventID
}) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const router = useRouter()
  const [notifApi, contextHolder] = notification.useNotification()

  const onSubmit = (e) => {
    const payload = {
      event_id: parseInt(eventID),
      mentor_id: parseInt(e.mentorID)
    }

    dispatch(Event.CreateEventMentor(payload))
      .unwrap()
      .then((ress) => {
        notifApi.success({ message: ress.data.message })
        setTimeout(() => {
          dispatch(Event.GetEventDetail(eventID))
          setOpen(false)
        }, 2000)
      })
      .catch((err) => {
        err.error.map((item) => {
          notifApi.error({ message: item })
        })
        setTimeout(() => {
          setOpen(false)
        }, 2000)
      })
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        closeIcon={null}
        width='561px'
        style={{ padding: 30 }}
        footer={<></>}
      >
        <>
          <Form
            form={form}
            onFinish={onSubmit}
            layout='vertical'
          >
            <div className='flex flex-col gap-1 mb-[6px] '>
              <Form.Item
                name='mentorID'
                label='mentor'
                style={{ marginBottom: 0 }}
              >
                <Select
                  placeholder='Select a Mentor'
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={mentorData?.data?.mentors?.map((item) => ({
                    label: item.name,
                    value: item.id
                  }))}
                />
              </Form.Item>
            </div>
            <div className='flex gap-[25px] items-center justify-start mt-3'>
              <CustomButton
                className='w-[126px]'
                children='Save'
                onClick={() => form.submit()}
              />
              <Typography.Text>or</Typography.Text>
              <CustomButton
                className='w-[175px]'
                children={`Create New Mentor`}
                onClick={() => router.push('/mentor-management/add-mentor')}
              />
            </div>
          </Form>
        </>
      </Modal>
    </>
  )
}
