import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { Form, Input, Upload, notification, Select, message } from 'antd'
import { CustomButton, CustomInput } from '@/components/_shared'
import { BsPlusLg } from 'react-icons/bs'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import {
  Judges,
  Mentor,
  Global,
  Upload as UploadService
} from '@/store/service'
import { useRouter } from 'next/router'

export default function AddMentorJudges({ breadcrumb }) {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState('/images/DefaultImage.svg')
  const [isMentor, setIsMentor] = useState(true)
  const dispatch = useDispatch()
  const router = useRouter()
  const [notifApi, contextHolder] = notification.useNotification()

  const { occupation } = useSelector((state) => state.global)

  useEffect(() => {
    dispatch(Global.GetOccupation({ order: 'id,asc' }))
    setIsMentor(router.pathname.includes('mentor'))
  }, [router])

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
        notifApi.success({ message: res.data.message })
      })
      .catch((err) => {
        err.error.map((message) => {
          notifApi.error({ message })
        })
      })
  }

  const onSubmit = (value) => {
    const payload = {
      name: value.name,
      email: value.email,
      phone_number: value.phone_number,
      password: value.password,
      occupation: parseInt(value.occupation),
      institution: value.institution,
      avatar: fileList
    }
    isMentor
      ? dispatch(Mentor.CreateMentor(payload))
          .unwrap()
          .then((res) => {
            notifApi.success({ message: res.data.message })
            setTimeout(() => {
              router.back()
            }, 2000)
          })
          .catch((err) => {
            err.error.map((message) => {
              notifApi.error({ message })
            })
          })
      : dispatch(Judges.CreateJudges(payload))
          .unwrap()
          .then((res) => {
            notifApi.success({ message: res.data.message })
            setTimeout(() => {
              router.back()
            }, 2000)
          })
          .catch((err) => {
            err.error.map((message) => {
              notifApi.error({ message })
            })
          })
  }

  return (
    <AuthenticatedLayout
      breadcrumb={breadcrumb}
      withBack
      title='Add Mentor'
    >
      {contextHolder}
      <div className='bg-white drop-shadow-md flex gap-[33px] p-[30px] '>
        <div className='w-[145px] h-[145px]  flex justify-end items-end'>
          <div className='group w-full h-full border overflow-hidden rounded-full bg-white'>
            <Upload
              maxCount={1}
              accept='image/*'
              showUploadList={false}
              beforeUpload={beforeUpload}
              customRequest={customRequest}
            >
              <Image
                src={fileList}
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
                label='Name'
                name='name'
                style={{ marginBottom: 18 }}
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <CustomInput />
              </Form.Item>
              <Form.Item
                label='Email'
                name='email'
                style={{ marginBottom: 18 }}
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <CustomInput />
              </Form.Item>
              <Form.Item
                label='Phone Number'
                name='phone_number'
                style={{ marginBottom: 18 }}
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <CustomInput />
              </Form.Item>
              <Form.Item
                label='Password'
                name='password'
                style={{ marginBottom: 18 }}
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label='Occupation'
                name='occupation'
                style={{ marginBottom: 18 }}
                rules={[{ required: true, message: 'This field is required' }]}
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
                label='Company / Institution'
                name='institution'
                style={{ marginBottom: 18 }}
                rules={[{ required: true, message: 'This field is required' }]}
              >
                <CustomInput />
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
    </AuthenticatedLayout>
  )
}
