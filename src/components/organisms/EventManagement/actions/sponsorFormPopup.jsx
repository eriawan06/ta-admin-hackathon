import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { CustomSelect, CustomButton, CustomInput } from '@/components/_shared'
import { Form, Modal, notification, Upload } from 'antd'
import { BsPlusLg } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Event, Upload as UploadService } from '@/store/service'

export default function SponsorFormPopup({
  open = false,
  setOpen = () => {},
  eventID,
  initialValue,
  isUpdate
}) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [notifApi, contextHolder] = notification.useNotification()
  const [fileList, setFileList] = useState('')

  useEffect(() => {
    if (isUpdate) {
      form.setFieldValue('name', initialValue?.name)
      form.setFieldValue('email', initialValue?.email)
      form.setFieldValue('phone_number', initialValue?.phone_number)
      form.setFieldValue('partnership_type', initialValue?.partnership_type)
      form.setFieldValue('sponsorship_level', initialValue?.sponsorship_level)
      form.setFieldValue('sponsorship_amount', initialValue?.sponsorship_amount)
      setFileList(initialValue.logo)
    } else {
      form.resetFields()
      setFileList('')
    }
  }, [isUpdate, initialValue])

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
        notifApi.error('error uploading image')
      })
  }

  const onSubmit = (e) => {
    if (eventID) {
      isUpdate === true
        ? dispatch(
            Event.EditEventCompany({
              id: initialValue.id,
              body: {
                name: e.name,
                email: e.email,
                phone_number: e.phone_number,
                partnership_type: e.partnership_type,
                sponsorship_level: e.sponsorship_level,
                sponsorship_amount: parseInt(e.sponsorship_amount),
                logo: fileList
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
            Event.CreateEventCompany({
              event_id: parseInt(eventID),
              name: e.name,
              email: e.email,
              phone_number: e.phone_number,
              partnership_type: e.partnership_type,
              sponsorship_level: e.sponsorship_level,
              sponsorship_amount: parseInt(e.sponsorship_amount),
              logo: fileList
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
        width='1130px'
        style={{ padding: 30 }}
        footer={<></>}
      >
        <>
          <Form
            form={form}
            onFinish={onSubmit}
            layout='vertical'
          >
            <div className='flex gap-8 items-center mb-[27px] '>
              <div className='group w-[145px] h-[145px] border overflow-hidden rounded-full bg-white'>
                <Upload
                  maxCount={1}
                  accept='image/*'
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  customRequest={customRequest}
                >
                  <Image
                    src={fileList || '/images/DefaultImage.svg'}
                    alt='profile'
                    className='rounded-full w-full h-full'
                    width={140}
                    height={140}
                  />
                  <div className='invisible group-hover:visible absolute bg-black/50 rounded-full w-[145px] h-[145px]'>
                    <BsPlusLg className='w-full h-full text-white' />
                  </div>
                </Upload>
              </div>
              <div className='flex flex-grow gap-[33px]'>
                <div className='w-1/2 grid grid-rows-3 gap-y-[18px]'>
                  <div>
                    <Form.Item
                      label='Name'
                      name='name'
                      style={{ marginBottom: 0 }}
                    >
                      <CustomInput />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label='Phone Number'
                      name='phone_number'
                      style={{ marginBottom: 0 }}
                    >
                      <CustomInput />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label='Sponsorship Level'
                      name='sponsorship_level'
                      style={{ marginBottom: 0 }}
                    >
                      <CustomSelect
                        options={[
                          { value: 'bronze', label: 'Bronze' },
                          { value: 'silver', label: 'Silver' },
                          { value: 'gold', label: 'Gold' },
                          { value: 'platinum', label: 'Platinum' }
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className='w-1/2 grid grid-rows-3 gap-y-[18px]'>
                  <div>
                    <Form.Item
                      label='Email'
                      name='email'
                      style={{ marginBottom: 0 }}
                    >
                      <CustomInput />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label='Patnership Type'
                      name='partnership_type'
                      style={{ marginBottom: 0 }}
                    >
                      <CustomSelect
                        options={[
                          { value: 'sponsor', label: 'Sponsor' },
                          { value: 'media', label: 'Media' }
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label='Amount'
                      name='sponsorship_amount'
                      style={{ marginBottom: 0 }}
                    >
                      <CustomInput />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-[25px] items-center justify-start ps-[177px]'>
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
