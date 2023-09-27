import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { Form, Select, Upload, notification, Skeleton } from 'antd'
import { CustomInput, CustomButton } from '@/components/_shared'
import { useDispatch, useSelector } from 'react-redux'
import {
  Judges,
  Mentor,
  Global,
  Upload as UploadService
} from '@/store/service'
import { BsPlusLg } from 'react-icons/bs'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function EditMentorJudges({ breadcrumb, detail, title }) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const router = useRouter()
  const [api, contextHolder] = notification.useNotification()
  const [isMentor, setIsMentor] = useState(
    title.toLowerCase().includes('mentor')
  )
  const [fileList, setFileList] = useState('')

  const { occupation } = useSelector((state) => state.global)

  useEffect(() => {
    dispatch(Global.GetOccupation({ order: 'id,asc' }))
    setIsMentor(title.toLowerCase().includes('mentor'))
  }, [title])

  useEffect(() => {
    if (detail) {
      form.setFieldValue('name', detail.name)
      form.setFieldValue('email', detail.email)
      form.setFieldValue('phone_number', detail.phone_number)
      form.setFieldValue('occupation', detail.occupation_id)
      form.setFieldValue('institution', detail.institution)
      form.setFieldValue('status', detail.is_active)
      setFileList(detail.avatar)
    }
  }, [detail])

  const beforeUpload = (file) => {
    const isImage = file.type?.includes('image')
    const size = 2 // size ini Mb
    const isLt2M = file.size <= 1024 * size * 1000

    if (!isImage) {
      console.log('Format file tidak sesuai')
    }
    if (!isLt2M) {
      console.log(`Maksimal ukuran file ${size}MB`)
    }

    return isLt2M && isImage
  }

  const customRequest = async ({ file }) => {
    const payload = new FormData()
    payload.append('file', file, file.name)
    payload.append('path', 'project/images')
    payload.append('overwrite', false)

    dispatch(UploadService.UploadProfileJudges(payload))
      .unwrap()
      .then((res) => {
        setFileList(res.data.data.file_url)
      })
      .catch((err) => {
        console.log('err: ', err)
      })
  }

  const onSubmit = (value) => {
    const payload = {
      id: router.query.id,
      body: {
        name: value.name,
        email: value.email,
        phone_number: value.phone_number,
        password: value.password,
        occupation: parseInt(value.occupation),
        institution: value.institution,
        is_active: Boolean(value.status) ? true : false,
        avatar: fileList
      }
    }
    isMentor
      ? dispatch(Mentor.UpdateMentor(payload))
          .unwrap()
          .then((res) => {
            api.success({ message: res.data.message })
            setTimeout(() => {
              api.destroy()
              router.push('/mentor-management')
            }, 1000)
          })
          .catch((err) => {
            err.error.map((message) => {
              api.error({ message })
            })
          })
      : dispatch(Judges.UpdateJudges(payload))
          .unwrap()
          .then((res) => {
            api.success({ message: res.data.message })
            setTimeout(() => {
              api.destroy()
              router.push('/judges-management')
            }, 1000)
          })
          .catch((err) => {
            err.error.map((message) => {
              api.error({ message })
            })
          })
  }

  return (
    <AuthenticatedLayout
      breadcrumb={breadcrumb}
      withBack
      title={title}
    >
      {contextHolder}
      {!detail ? (
        <Skeleton />
      ) : (
        <div className='bg-white drop-shadow-md flex gap-[33px] p-[30px] '>
          <div className='w-[145px] h-[145px] flex justify-end items-end'>
            <div className='group w-full h-full border overflow-hidden rounded-full bg-white'>
              <Upload
                maxCount={1}
                accept='image/*'
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={customRequest}
              >
                <Image
                  src={fileList || detail?.avatar}
                  alt='profile'
                  width={200}
                  height={200}
                />
                <div className='invisible group-hover:visible absolute bg-black/50 rounded-full w-[145px] h-[145px]'>
                  <BsPlusLg className='w-full h-full text-white' />
                </div>
              </Upload>
            </div>
          </div>
          <Form
            layout='vertical'
            className='flex flex-grow'
            form={form}
            onFinish={onSubmit}
            requiredMark={false}
          >
            <div className='w-full flex flex-col gap-[9px] '>
              <div className=' grid grid-rows-3 grid-cols-2 gap-x-[32px]'>
                <Form.Item
                  rules={[
                    { required: true, message: 'This field is required' }
                  ]}
                  label='Name'
                  name='name'
                  style={{ marginBottom: 18 }}
                >
                  <CustomInput />
                </Form.Item>
                <Form.Item
                  rules={[
                    { required: true, message: 'This field is required' }
                  ]}
                  label='Email'
                  name='email'
                  style={{ marginBottom: 18 }}
                >
                  <CustomInput />
                </Form.Item>
                <Form.Item
                  rules={[
                    { required: true, message: 'This field is required' }
                  ]}
                  label='Phone Number'
                  name='phone_number'
                  style={{ marginBottom: 18 }}
                >
                  <CustomInput />
                </Form.Item>
                <Form.Item
                  rules={[
                    { required: true, message: 'This field is required' }
                  ]}
                  label='Occupation'
                  name='occupation'
                  style={{ marginBottom: 18 }}
                >
                  <Select
                    placeholder='Select an occupation'
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={occupation?.data?.occupations.map((item) => ({
                      label: item.name,
                      value: item.id
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    { required: true, message: 'This field is required' }
                  ]}
                  label='Company / Institution'
                  name='institution'
                  style={{ marginBottom: 18 }}
                >
                  <CustomInput />
                </Form.Item>
                <Form.Item
                  rules={[
                    { required: true, message: 'This field is required' }
                  ]}
                  label='Status'
                  name='status'
                >
                  <Select
                    style={{ width: '100%' }}
                    options={[
                      { value: true, label: 'Active' },
                      { value: false, label: 'Inactive' }
                    ]}
                  />
                </Form.Item>
              </div>
              <CustomButton
                onClick={() => form.submit()}
                className='w-[153px] h-[40px]'
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
