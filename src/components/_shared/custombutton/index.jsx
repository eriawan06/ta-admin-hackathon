import { Button } from 'antd'
import React from 'react'

const CustomButton = ({
  id,
  children,
  disabled = false,
  type = 'primary',
  className = '',
  onClick,
  loading = false,
  height = '48px',
  htmlType = 'button',
  style,
  ...props
}) => {
  return (
    <Button
      id={id}
      onClick={onClick}
      type={type}
      loading={loading}
      disabled={disabled}
      htmlType={htmlType}
      className={`custom-button custom-button-${
        disabled ? 'disabled' : type
      } ${className} `}
      style={{ height: height, ...style }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default CustomButton
