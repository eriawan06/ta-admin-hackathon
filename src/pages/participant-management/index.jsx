import ParticipantManagement from '@/components/organisms/ParticipantManagement'
import React from 'react'

const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          name: 'next.js'
        }
      } // See the "paths" section below
    ],
    fallback: true // false or "blocking"
  }
}

export default function ParticipantManagementPage() {
  return (
    <ParticipantManagement/>
  )
}
