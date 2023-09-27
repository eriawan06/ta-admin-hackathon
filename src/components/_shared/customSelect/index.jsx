import React from 'react'
import { Select } from 'antd'

export default function CustomSelect({
  value,
  className,
  options,
  // height = '48px',
  style,
  onChange = () => {},
  ...props
}) {
  return (
    <Select
      value={value}
      className={`rounded flex items-center ${className}`}
      options={options}
      style={{ ...style }}
      onChange={onChange}
      {...props}
    />
  )
}
