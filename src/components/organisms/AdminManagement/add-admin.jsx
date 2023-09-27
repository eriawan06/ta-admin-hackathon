import React from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { CustomButton, CustomInput } from '@/components/_shared'
import { Form, notification, Input } from 'antd'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Admin } from '@/store/service'

export default function AddAdmin() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [notifApi, contextHolder] = notification.useNotification()

  const onSubmit = (e) => {
    const payload = { ...e, role_id: 2 }
    dispatch(Admin.CreateAdmin(payload))
      .unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
        setTimeout(() => {
          router.push('/admin-management')
        }, 1000)
      })
      .catch((err) => {
        err.error.map((item) => {
          notifApi.error({ message: item })
        })
      })
  }

  const breadcrumb = [
    {
      title: 'Admin Management',
      onClick: () => router.push('/admin-management')
    },
    {
      title: 'Add Admin',
      onClick: () => router.push('/admin-management/add-admin')
    }
  ]

  return (
    <AuthenticatedLayout
      breadcrumb={breadcrumb}
      withBack
      title='Add Admin'
    >
      <div className='rounded bg-white drop-shadow-md w-full py-[29px] px-[30px]'>
        {contextHolder}
        <Form
          form={form}
          layout='vertical'
          requiredMark={false}
          onFinish={onSubmit}
        >
          <div className='grid grid-cols-2 gap-x-10'>
            <Form.Item
              label='Name'
              name='name'
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <CustomInput />
            </Form.Item>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'This field is required',
                  type: 'email'
                }
              ]}
            >
              <CustomInput />
            </Form.Item>
          </div>
          <div className='grid grid-cols-2 gap-x-10 gap-y-5'>
            <Form.Item
              label='Phone Number'
              name='phone_number'
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <CustomInput />
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'This field is required' }]}
            >
              <Input.Password />
            </Form.Item>
            <CustomButton
              onClick={() => form.submit()}
              className='h-[40px] w-[153px]'
            >
              Save
            </CustomButton>
          </div>
        </Form>
      </div>
    </AuthenticatedLayout>
  )
}
