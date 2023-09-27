import React from 'react'
import { Typography, Form, Input, notification } from 'antd'
import { CustomButton } from '@/components/_shared'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Auth } from '@/store/service'

export default function ChangePassword() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [notifApi, contextHolder] = notification.useNotification()

  const onSubmit = (e) => {
    dispatch(Auth.ChangePassword(e))
      .unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
        setTimeout(() => {
          router.back()
        }, 1000)
      })
      .catch((err) => {
        err.error.map((message) => {
          notifApi.error({ message })
        })
      })
  }

  return (
    <>
      {contextHolder}
      <div className='p-20'>
        <Typography.Title
          level={3}
          style={{
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '30px'
          }}
        >
          Change Password
        </Typography.Title>
        <Form
          onFinish={onSubmit}
          requiredMark={false}
          layout='vertical'
          form={form}
        >
          <div className='grid gap-4'>
            <Form.Item
              name='old_password'
              label='Old Password'
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='new_password'
              label='Password'
              validateFirst
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='confirm_new_password'
              label='Confirm Password'
              rules={[
                { required: true, message: 'This field is required' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    )
                  }
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <CustomButton onClick={() => form.submit()}>
              Change Password
            </CustomButton>
          </div>
        </Form>
      </div>
    </>
  )
}
