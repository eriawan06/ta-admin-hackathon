import { Modal, Typography } from 'antd'
import React from 'react'

export default function RulesDetailPopup({
  open = false,
  setOpen = () => {},
  title,
  note
}) {
  return (
    <>
      <Modal
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width='561px'
        style={{ padding: 30 }}
        footer={<></>}
      >
        <>
          <div className='flex flex-col'>
            <Typography.Text className='font-bold'>Title :</Typography.Text>
            <Typography.Text>{title}</Typography.Text>
            <Typography.Text className='font-bold mt-[25px]'>
              Notes :
            </Typography.Text>
            <Typography.Text>{note}</Typography.Text>
          </div>
        </>
      </Modal>
    </>
  )
}
