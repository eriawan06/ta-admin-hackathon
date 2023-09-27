import React, { useEffect } from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { CustomButton, CustomInput } from '@/components/_shared'
import { Form, Select, Skeleton, notification } from 'antd'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { Admin } from '@/store/service'

export default function EditAdmin({ data }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [notifApi, contextHolder] = notification.useNotification()

  const breadcrumb = [
    {
      title: 'Admin Management',
      onClick: () => router.push('/admin-management')
    },
    {
      title: 'Edit Admin',
      onClick: () => router.push('/admin-management/edit-admin')
    }
  ]

  useEffect(() => {
    if (data?.id) {
      form.setFieldValue('name', data?.name)
      form.setFieldValue('email', data?.email)
      form.setFieldValue('phone_number', data?.phone_number)
      form.setFieldValue('is_active', data?.is_active)
    }
  }, [data])

  const onSubmit = (e) => {
    const body = {
      id: router.query.id,
      payload: e
    }
    dispatch(Admin.UpdateAdmin(body))
      .unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
        setTimeout(() => {
          router.push('/admin-management')
        }, 500)
      })
      .catch((err) => {
        err.error.map((message) => {
          notifApi.error({ message: message })
        })
      })
  }

  return (
    <AuthenticatedLayout
      breadcrumb={breadcrumb}
      withBack
      title='Edit Admin'
    >
      {!data?.id ? (
        <Skeleton />
      ) : (
        <div className='rounded bg-white drop-shadow-md w-full py-[29px] px-[30px]'>
          {contextHolder}
          <Form
            layout='vertical'
            form={form}
            onFinish={onSubmit}
          >
            <div className='grid grid-cols-2 gap-x-10'>
              <Form.Item
                label='Name'
                name='name'
              >
                <CustomInput />
              </Form.Item>
              <Form.Item
                label='Email'
                name='email'
              >
                <CustomInput />
              </Form.Item>
            </div>
            <div className='grid grid-cols-2 gap-x-10 gap-y-5'>
              <Form.Item
                label='Phone Number'
                name='phone_number'
              >
                <CustomInput />
              </Form.Item>
              <Form.Item
                label='Status'
                name='is_active'
              >
                <Select
                  style={{ width: '100%' }}
                  options={[
                    { value: true, label: 'Active' },
                    { value: false, label: 'Inactive' }
                  ]}
                />
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
      )}
    </AuthenticatedLayout>
  )
}
