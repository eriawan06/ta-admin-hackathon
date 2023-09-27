import React from 'react'
import { useRouter } from 'next/router'
import { CustomButton } from '@/components/_shared'
import { Form, Modal, Typography, Select, notification } from 'antd'
import { useDispatch } from 'react-redux'
import { Event } from '@/store/service'

export default function JudgesFormPopup({
  open = false,
  setOpen = () => {},
  judgeData,
  eventID
}) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const router = useRouter()
  const [notifApi, contextHolder] = notification.useNotification()

  const onSubmit = (e) => {
    const payload = {
      event_id: parseInt(eventID),
      judge_id: parseInt(e.judgeID)
    }

    dispatch(Event.CreateEventJudge(payload))
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
                name='judgeID'
                label='judge'
                style={{ marginBottom: 0 }}
              >
                <Select
                  placeholder='Select a Judge'
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={judgeData?.data?.judges?.map((item) => ({
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
                children={`Create New Judge`}
                onClick={() => router.push('/judges-management/add-judges')}
              />
            </div>
          </Form>
        </>
      </Modal>
    </>
  )
}
