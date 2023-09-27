import React from 'react'
import { Modal, Form, notification, message } from 'antd'
import { CustomInput, CustomTextarea, CustomButton } from '@/components/_shared'
import { useDispatch } from 'react-redux'
import { Payment } from '@/store/service'

export default function ModalPaymentInvoice({
  open = false,
  setOpen = () => {},
  id,
  refreshData = () => {}
}) {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [notifApi, contextHolder] = notification.useNotification()

  const onSubmit = (value) => {
    const body = {
      id: id,
      payload: {
        amount: parseInt(value.amount),
        note: value.note
      }
    }
    dispatch(Payment.UpdatePayment(body))
      .unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
        setTimeout(() => {
          setOpen(false)
        }, 3000)
        refreshData()
      })
      .catch((err) => {
        err.error.map((message) => {
          notifApi.error({ message })
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
        footer={null}
        destroyOnClose
      >
        <div className='flex gap-[18px] flex-col'>
          {contextHolder}
          <Form
            layout='vertical'
            form={form}
            requiredMark={false}
            onFinish={onSubmit}
          >
            <Form.Item
              label='Amount'
              name='amount'
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <CustomInput />
            </Form.Item>
            <Form.Item
              label='Note'
              name='note'
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <CustomTextarea
                className='resize-x'
                style={{ height: '138px' }}
              />
            </Form.Item>
          </Form>
          <div>
            <CustomButton
              className='mb-[30px] px-8'
              onClick={() => form.submit()}
            >
              Save
            </CustomButton>
          </div>
        </div>
      </Modal>
    </>
  )
}
