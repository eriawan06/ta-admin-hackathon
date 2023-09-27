import React from 'react'
import Image from 'next/image'
import { Menu } from 'antd'
import ListMenu from './listMenu'

export default function SideMenu({ selectedKeys, onClickMenu }) {
  return (
    <>
      <div className='py-4 flex flex-col'>
        <div className='px-8'>
          <Image
            src='/images/logo/sagara-logo-red.png'
            alt='sagara-logo'
            style={{ color: 'white' }}
            width={400}
            height={82}
          />
        </div>
        <div className='mt-14'>
          <Menu
            mode='inline'
            items={ListMenu()}
            selectedKeys={selectedKeys}
            onClick={onClickMenu}
          />
        </div>
      </div>
    </>
  )
}
