import React, { useEffect } from 'react'
import { CustomButton, CustomInput } from '@/components/_shared'
import { Form, Modal, notification, Select } from 'antd'
import { useDispatch } from 'react-redux'
import { Event } from '@/store/service'
import { BiMinus } from 'react-icons/bi'

export default function AssessmentFormPopup({
  open = false,
  setOpen = () => {},
  eventID,
  initialValue,
  isUpdate
}) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [notifApi, contextHolder] = notification.useNotification()

  useEffect(() => {
    if (isUpdate) {
      form.setFieldValue('criteria', initialValue?.criteria)
      form.setFieldValue('percentage_val', initialValue?.percentage_val)
      form.setFieldValue('score_start', initialValue?.score_start)
      form.setFieldValue('score_end', initialValue?.score_end)
      form.setFieldValue('is_active', initialValue?.is_active)
    } else form.resetFields()
  }, [isUpdate, initialValue])

  const onSubmit = (e) => {
    if (eventID) {
      isUpdate === true
        ? dispatch(
            Event.EditEventAssessment({
              id: initialValue.id,
              body: {
                criteria: e.criteria,
                percentage_val: parseInt(e.percentage_val),
                score_start: parseInt(e.score_start),
                score_end: parseInt(e.score_end)
              }
            })
          )
            .unwrap()

            .then((ress) => {
              notifApi.success({ message: ress.data.message })
              setTimeout(() => {
                dispatch(Event.GetEventAssessment(eventID))
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
            Event.CreateEventAssessment({
              event_id: parseInt(eventID),
              criteria: e.criteria,
              percentage_val: parseInt(e.percentage_val),
              score_start: parseInt(e.score_start),
              score_end: parseInt(e.score_end)
            })
          )
            .unwrap()
            .then((ress) => {
              notifApi.success({ message: ress.data.message })
              setTimeout(() => {
                dispatch(Event.GetEventAssessment(eventID))
                setOpen(false)
              }, 2000)
            })
            .catch((ress) => {
              notifApi.error({ message: ress?.error })
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
        style={{ paddingInline: 5 }}
        footer={<></>}
      >
        <>
          <Form
            form={form}
            onFinish={onSubmit}
            layout='vertical'
          >
            <div className='flex flex-col gap-[18px] mb-[25px] '>
              <div>
                <Form.Item
                  label='Criteria'
                  name='criteria'
                  style={{ marginBottom: 0 }}
                >
                  <CustomInput />
                </Form.Item>
              </div>
              <div className='flex flex-col'>
                <Form.Item
                  label='Percentage Value'
                  name='percentage_val'
                  style={{ marginBottom: 0 }}
                >
                  <CustomInput />
                </Form.Item>
              </div>
              <div className='flex flex-col'>
                <div className='flex flex-row'>
                  <Form.Item
                    label='Score Range'
                    name='score_start'
                    className='w-[49%]'
                    style={{ marginBottom: 0 }}
                  >
                    <CustomInput />
                  </Form.Item>
                  <div className=' flex justify-center items-center'>
                    <BiMinus
                      size={20}
                      className='mt-8'
                    />
                  </div>
                  <Form.Item
                    label=' '
                    name='score_end'
                    className='w-[49%]'
                    style={{ marginBottom: 0 }}
                  >
                    <CustomInput />
                  </Form.Item>
                </div>
              </div>
              {isUpdate ? (
                <div className='flex flex-col gap-0'>
                  <Form.Item
                    label='Status'
                    name='is_active'
                    style={{ marginBottom: 0 }}
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
            </div>
            <div className='flex gap-[25px] items-center justify-start'>
              <CustomButton
                className='w-[126px]'
                children={'Save'}
                onClick={() => form.submit()}
              />
            </div>
          </Form>
        </>
      </Modal>
    </>
  )
}
