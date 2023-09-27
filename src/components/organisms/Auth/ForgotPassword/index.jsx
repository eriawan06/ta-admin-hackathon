import React, { useEffect, useState } from 'react'
import { Form, Input, Typography, notification } from 'antd'
import { CustomButton, CustomInput } from '@/components/_shared'
import { useDispatch, useSelector } from 'react-redux'
import { Auth } from '@/store/service'
import { useRouter } from 'next/router'

export default function ForgotPassword() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [notifApi, contexHolder] = notification.useNotification()

  const { loading } = useSelector((state) => state.auth)

  const [isVerify, setIsVerify] = useState({ verif: false, code: '' })

  useEffect(() => {
    if (router.isReady) {
      if (router.query['verification-code']) {
        setIsVerify({ verif: true, code: router.query['verification-code'] })
      }
    }
  }, [router])

  useEffect(() => {
    if (isVerify.verif) {
      dispatch(Auth.CheckVerificationCode({ verification_code: isVerify.code }))
        .unwrap()
        .then((res) => {
          notifApi.success({ message: res.data.message })
        })
        .catch((err) => {
          err.error?.map((message) => {
            notifApi.error({ message })
          })
          setIsVerify({ verif: false, code: '' })
          router.push('/auth/forgot-password')
        })
    }
  }, [isVerify])

  const onSubmit = (value) => {
    if (isVerify.verif) {
      const payload = {
        verification_code: isVerify.code,
        new_password: value.new_password
      }
      dispatch(Auth.ForgotPassword(payload))
        .unwrap()
        .then((res) => {
          notifApi.success({ message: res.data.message })
          setTimeout(() => {
            router.replace('/')
          }, 500)
        })
        .catch((err) => {
          err?.error?.map((message) => {
            notifApi.error({ message })
          })
        })
    } else if (!isVerify.verif) {
      const payload = {
        email: value.email,
        type: 'reset-password'
      }
      dispatch(Auth.SendVerificationCode(payload))
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
  }

  return (
    <>
      {contexHolder}
      <div className='text-center mb-[26px]'>
        <Typography.Title style={{ fontSize: '32px' }}>
          Forgot Password
        </Typography.Title>
        <Typography.Text>
          Use the form below to get back to your account
        </Typography.Text>
      </div>
      <Form
        layout='vertical'
        requiredMark={false}
        form={form}
        onFinish={onSubmit}
      >
        {isVerify.verif ? (
          <div>
            <Form.Item
              label='Password'
              name='password'
              validateFirst
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='Confirm Password'
              name='new_password'
              rules={[
                { required: true, message: 'This field is required' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
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
            <CustomButton
              onClick={() => form.submit()}
              className='w-full mb-[25px]'
              loading={loading}
            >
              Change Password
            </CustomButton>
            <div className='text-center'>
              <Typography.Text>
                Just remember your password?&nbsp;
                <span
                  className='font-bold cursor-pointer'
                  onClick={() => router.push('/')}
                >
                  LOGIN
                </span>
              </Typography.Text>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-[10px]'>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                  type: 'email'
                }
              ]}
            >
              <CustomInput type='email' />
            </Form.Item>
            <CustomButton
              onClick={() => form.submit()}
              className='w-full mb-[25px]'
              loading={loading}
            >
              Send Email
            </CustomButton>
            <div className='text-center'>
              <Typography.Text>
                Just remember your password?&nbsp;
                <span
                  className='font-bold cursor-pointer'
                  onClick={() => router.push('/')}
                >
                  LOGIN
                </span>
              </Typography.Text>
            </div>
          </div>
        )}
      </Form>
    </>
  )
}
