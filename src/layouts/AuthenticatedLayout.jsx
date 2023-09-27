import React, { memo, useState, useEffect } from 'react'
import { Layout, Breadcrumb, Avatar, Popover } from 'antd'
import { useRouter } from 'next/router'
import { BsArrowLeftShort } from 'react-icons/bs'
import Head from 'next/head'
import { Storage } from '@/helper'
import { CustomButton } from '@/components/_shared'
import SideMenu from './SideMenu'

const AuthenticatedLayout = memo(
  ({ children, breadcrumb, withBack = false, title }) => {
    const router = useRouter()
    const { Sider, Content, Header } = Layout

    const [key, setKey] = useState()
    const [hydration, setHydration] = useState(false)
    let user = Storage.getStorage('user')

    useEffect(() => {
      const stored = Storage.getStorage('user')
      user = stored
    }, [])

    const onClickMenu = ({ key }) => {
      setKey(key)
      router.push(`/${key}`)
    }

    useEffect(() => {
      const newKey = router.pathname.split('/')
      setKey(newKey)
    }, [])

    const button = [
      {
        title: 'Change Password',
        onClick: () => {
          router.push('/change-password')
        }
      },
      {
        title: 'Logout',
        onClick: () => {
          Storage.clearStorage()
          router.push('/')
        }
      }
    ]

    const AvatarContent = (
      <div className='flex flex-col'>
        {button.map((res, i) => (
          <CustomButton
            key={i}
            type='link'
            height='fit-content'
            className='group text-primary-red flex items-center mt-3 px-3 py-2 text-primary font-bold space-x-2'
            block
            onClick={res.onClick}
          >
            {res.title}
          </CustomButton>
        ))}
      </div>
    )

    useEffect(() => {
      setHydration(true)
    }, [])

    return (
      <>
        <Head>
          <title>{title ? `Hackathon - ${title}` : 'Hackathon'}</title>
        </Head>
        <Layout className='h-auto min-h-[100vh]'>
          <Sider
            style={{
              backgroundColor: 'black',
              borderRadius: '0 0 10px 0',
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0
            }}
          >
            <SideMenu
              selectedKeys={key}
              onClickMenu={onClickMenu}
            />
          </Sider>
          <Layout className='h-fit ml-[260px]'>
            <Header
              style={{
                color: 'white',
                backgroundColor: 'black',
                padding: 0,
                margin: 0
              }}
            >
              <div className='flex h-full flex-row justify-between px-[18px]'>
                {hydration && user?.full_name && (
                  <>
                    <div className='flex flex-row gap-[6px] items-center'>
                      {withBack && (
                        <BsArrowLeftShort
                          className='cursor-pointer'
                          size={24}
                          onClick={() => router.back()}
                        />
                      )}
                      <Breadcrumb
                        items={breadcrumb}
                        separator='>'
                      />
                    </div>
                    <Popover
                      placement='bottomRight'
                      content={AvatarContent}
                    >
                      <div className='flex flex-row items-center gap-1'>
                        <Avatar className='bg-white' />
                        <span className='font-bold text-[16px]'>
                          {user?.full_name}
                        </span>
                      </div>
                    </Popover>
                  </>
                )}
              </div>
            </Header>
            <Content className='pt-[42px] pl-[18px] pr-8 pb-5 h-full'>
              <>{children}</>
            </Content>
          </Layout>
        </Layout>
      </>
    )
  }
)

export default AuthenticatedLayout
