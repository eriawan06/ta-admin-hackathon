import AddMentorJudges from '@/components/organisms/MentorJudgesForm/create'
import { useRouter } from 'next/router'
import React from 'react'

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

export default function AddJudgesManagementPage() {
  const router = useRouter()

  const breadcrumb = [
    {
      title: 'Judges Management',
      onClick: () => router.push('/judges-management')
    },
    {
      title: 'Add Judges',
      onClick: () => router.push('/judges-management/add-judges')
    }
  ]

  return <AddMentorJudges breadcrumb={breadcrumb} />
}
