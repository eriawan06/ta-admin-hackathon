import React, { useEffect, useState } from 'react'
import { Layout, Avatar } from 'antd'
import { Storage } from '@/helper'
import Image from 'next/image'
import Head from 'next/head'
import ChangePassword from '@/components/organisms/Auth/ChangePassword'

const { Content, Header } = Layout

export default function ForgotPasswordPage() {
  const [user, setuser] = useState()

  useEffect(() => {
    const stored = Storage.getStorage('user')
    setuser(stored)
  }, [])

  return (
    <>
      <Head>
        <title>Hackathon - Change Password</title>
      </Head>
      <Layout>
        <Header
          style={{
            color: 'white',
            backgroundColor: 'black',
            padding: 0,
            margin: 0
          }}
        >
          <div className='flex h-full flex-row justify-between items-center px-[18px]'>
            <Image
              src='/images/logo/sagara-logo-red.png'
              alt='sagara-logo'
              style={{ color: 'white' }}
              width={166}
              height={45}
            />
            {user?.full_name && (
              <div className='flex flex-row gap-[6px] items-center'>
                <Avatar className='bg-white' />
                <span className='font-bold text-[16px]'>{user?.full_name}</span>
              </div>
            )}
          </div>
        </Header>
        <Content>
          <div className='w-[525px] my-14 drop-shadow-md mx-auto bg-white'>
            <ChangePassword />
          </div>
        </Content>
      </Layout>
    </>
  )
}
