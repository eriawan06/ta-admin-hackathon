import React from 'react'
import { Input } from 'antd'

export default function CustomInput({
  placeholder,
  className,
  value,
  onChange = () => {},
  type = '',
  ...props
}) {
  return (
    <>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        type={type}
        {...props}
      />
    </>
  )
}
