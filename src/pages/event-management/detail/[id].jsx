import React from 'react'
import EventManagementDetailComponent from '@/components/organisms/EventManagement/detail'

// const getStaticPaths = async () => {
//   return {
//     paths: [
//       {
//         params: {
//           name: 'next.js'
//         }
//       } // See the "paths" section below
//     ],
//     fallback: true // false or "blocking"
//   }
// }

export default function EventManagementDetail() {
  return (
    <>
      <EventManagementDetailComponent />
    </>
  )
}
