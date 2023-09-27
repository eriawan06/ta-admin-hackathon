import React from 'react'
import { Input } from 'antd'

export default function CustomTextarea({
  placeholder,
  className,
  value,
  onChange = () => {},
  style,
  ...props
}) {
  return (
    <>
      <Input.TextArea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        style={style}
        {...props}
      />
    </>
  )
}
