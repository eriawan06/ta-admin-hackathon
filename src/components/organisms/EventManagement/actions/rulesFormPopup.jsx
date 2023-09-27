import React, { useEffect } from 'react'
import { CustomButton, CustomInput } from '@/components/_shared'
import { Form, Input, Modal, Select, notification } from 'antd'
import { useDispatch } from 'react-redux'
import { Event } from '@/store/service'

export default function RulesFormPopup({
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
      form.setFieldValue('is_active', initialValue?.is_active)
      form.setFieldValue('note', initialValue?.note)
    } else form.resetFields()
  }, [isUpdate, initialValue])

  const onSubmit = (e) => {
    if (eventID) {
      isUpdate === true
        ? dispatch(
            Event.EditEventRules({
              id: initialValue.id,
              body: {
                title: e.title,
                is_active: e.is_active,
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
            Event.CreateEventRules({
              event_id: parseInt(eventID),
              title: e.title,
              is_active: e.is_active,
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
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        closeIcon={null}
        width='561px'
        style={{ padding: 30 }}
        footer={<></>}
      >
        <>
          <div className='flex flex-col '>
            <Form
              form={form}
              onFinish={onSubmit}
              layout='vertical'
            >
              <div className='flex flex-col gap-0'>
                <Form.Item
                  label='Title'
                  name='title'
                  style={{ marginBottom: 18 }}
                >
                  <CustomInput />
                </Form.Item>
              </div>
              {isUpdate ? (
                <div className='flex flex-col gap-0'>
                  <Form.Item
                    label='Status'
                    name='is_active'
                    style={{ marginBottom: 18 }}
                  >
                    <Select
                      options={[
                        {
                          value: true,
                          label: 'Active'
                        },
                        {
                          value: false,
                          label: 'Inactive'
                        }
                      ]}
                    />
                  </Form.Item>
                </div>
              ) : (
                <></>
              )}
              <div>
                <Form.Item
                  label='Note'
                  name='note'
                  style={{ marginBottom: '12px' }}
                >
                  <TextArea style={{ height: '128px', resize: 'none' }} />
                </Form.Item>
              </div>
              <div className='flex gap-[25px] items-center justify-start mt-6'>
                <CustomButton
                  className='w-[153px]'
                  children={'Save'}
                  onClick={() => form.submit()}
                />
              </div>
            </Form>
          </div>
        </>
      </Modal>
    </>
  )
}
