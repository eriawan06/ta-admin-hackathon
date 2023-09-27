import React, { useEffect } from 'react'
import { CustomButton, CustomInput } from '@/components/_shared'
import { DatePicker, Modal, Input, Form, notification } from 'antd'
import { useDispatch } from 'react-redux'
import { Event } from '@/store/service'
import dayjs from 'dayjs'

export default function TimelineFormPopup({
  open = false,
  setOpen = () => {},
  eventID,
  initialValue,
  isUpdate
}) {
  const { TextArea } = Input
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [notifApi, contextHolder] = notification.useNotification()

  useEffect(() => {
    if (isUpdate) {
      form.setFieldValue('title', initialValue?.title)
      form.setFieldValue('start_date', dayjs(initialValue?.start_date))
      form.setFieldValue('end_date', dayjs(initialValue?.end_date))
      form.setFieldValue('note', initialValue?.note)
    } else form.resetFields()
  }, [isUpdate, initialValue])

  const onSubmit = (e) => {
    if (eventID) {
      isUpdate === true
        ? dispatch(
            Event.EditEventTimeline({
              id: initialValue.id,
              body: {
                title: e.title,
                start_date: dayjs(e.start_date).format('YYYY-MM-DD'),
                end_date: dayjs(e.end_date).format('YYYY-MM-DD'),
                note: e.note
              }
            })
          )
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
        : dispatch(
            Event.CreateEventTimeline({
              event_id: parseInt(eventID),
              title: e.title,
              start_date: dayjs(e.start_date).format('YYYY-MM-DD'),
              end_date: dayjs(e.end_date).format('YYYY-MM-DD'),
              note: e.note
            })
          )
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
  }

  return (
    <>
      {contextHolder}
      <Modal
        centered
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
            <div className='flex flex-col gap-[18px] '>
              <div>
                <Form.Item
                  label='Title'
                  name='title'
                  style={{ marginBottom: 0 }}
                >
                  <CustomInput />
                </Form.Item>
              </div>
              <div className='flex flex-col'>
                <Form.Item
                  label='Start Date'
                  name='start_date'
                  style={{ marginBottom: 0 }}
                >
                  <DatePicker className='w-full' />
                </Form.Item>
              </div>
              <div className='flex flex-col'>
                <Form.Item
                  label='End Date'
                  name='end_date'
                  style={{ marginBottom: 0 }}
                >
                  <DatePicker className='w-full' />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label='Note'
                  name='note'
                  style={{ marginBottom: '12px' }}
                >
                  <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
                </Form.Item>
              </div>
            </div>
            <div className='flex gap-[25px] items-center justify-start mt-3'>
              <CustomButton
                className='w-[126px]'
                children='Save'
                onClick={() => form.submit()}
              />
            </div>
          </Form>
        </>
      </Modal>
    </>
  )
}
