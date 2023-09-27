import React from 'react'
import { Modal } from 'antd'

export default function ModalEvent({
  open = false,
  onCancel = () => {},
  onOke = () => {},
  id,
  children
}) {
  return (
    <>
      <Modal
        open={open}
        onCancel={onCancel}
        onOk={onOke}
      >
        {children}
      </Modal>
    </>
  )
}
