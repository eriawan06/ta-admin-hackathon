import React from 'react'
import Image from 'next/image'

export default function CustomImage({
  className,
  imageUrl = '/images/DefaultImage.svg',
  alt = 'images',
  width,
  height,
  fill = false,
  ...props
}) {
  return (
    <>
      <Image
        alt={alt}
        src={imageUrl}
        fill={fill}
        width={fill ? 0 : width}
        height={fill ? 0 : height}
        style={{ objectFit: 'cover' }}
        {...props}
      />
    </>
  )
}
