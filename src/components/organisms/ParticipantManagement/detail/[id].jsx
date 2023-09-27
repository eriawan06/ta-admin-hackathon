import React, { useEffect } from 'react'

// Import Components
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { Skeleton, Typography, notification } from 'antd'

// Import Depedency
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Participant } from '@/store/service'

export default function DetailParticipant() {
  
  // Data dan Depedency Variable 
  const router = useRouter()
  const dispatch = useDispatch()
  const [notifApi,holder] = notification.useNotification()
  const {detailParticipant} = useSelector((state)=>(state.participant))
  
  // Fetch data detail participant
  useEffect(() => {
    if (router.isReady) {
      dispatch(Participant.GetParticipantDetail(router.query.id)).unwrap()
      .then((res) => {
        notifApi.success({ message: res.data.message })
      })
      .catch((err) => {
        err.error.map((message) => {
          notifApi.error({ message })
        })
      })
    }
  }, [router])

  // Convert Raw data skills
  const skills = detailParticipant?.skills?.map((skill) => skill.skill.name)
  const skillsText = skills?.join(', ')
  // Conver Raw data BirthDate
  const originalDate = detailParticipant?.birthdate
  const dateWithoutTime = originalDate?.split('T')[0]
  
  const breadcrumb = [
    {
      title: 'Participant Management', 
      onClick: () => router.push('/participant-management')
    },
    {
      title: 'Detail Participant',
      onClick: () => router.push('/participant-management/detail-participant')  
    }
  ]
  console.log(detailParticipant)
  
  
  if (!detailParticipant) {
    return <Skeleton />
  }
  return (
    <AuthenticatedLayout withBack breadcrumb={breadcrumb}>
      {holder}
      <div className='flex flex-col p-[30px] rounded bg-white drop-shadow-md'>
        <div className='flex flex-row gap-[43px] pb-[33px] border-b border-black'>
          <div className='w-[196px] flex flex-col items-center'>
              <div
                className='rounded-full h-[136px] w-[136px] bg-cover bg-center border'
                style={{backgroundImage:`url(${detailParticipant?.user?.avatar ? detailParticipant?.user?.avatar : ' ' })`}}
              ></div>
          </div>
          <div className='flex flex-grow flex-col gap-[10px] text'>
            <div className='flex w-full justify-between'>
              <Typography.Text className='font-bold'>Name:</Typography.Text>
              <Typography.Text className='w-[50%]'>{detailParticipant?.user?.name ? detailParticipant?.user?.name : '-'}</Typography.Text>
            </div>
            <div className='flex w-full justify-between'>
              <Typography.Text className='font-bold'>Email:</Typography.Text>
              <Typography.Text className='w-[50%]'>{detailParticipant?.user?.email ? detailParticipant?.user?.email : '-'}</Typography.Text>
            </div>
            <div className='flex w-full justify-between'>
              <Typography.Text className='font-bold'>Phone Number:</Typography.Text>
              <Typography.Text className='w-[50%]'>{detailParticipant?.user?.phone_number ? detailParticipant?.user?.phone_number : '-'}</Typography.Text>
            </div>
            <div className='flex w-full justify-between'>
              <Typography.Text className='font-bold'>Date of Birth:</Typography.Text>
              <Typography.Text className='w-[50%]'>{dateWithoutTime ? dateWithoutTime : '-'}</Typography.Text>
            </div>
            <div className='flex w-full justify-between'>
              <Typography.Text className='font-bold'>Gender:</Typography.Text>
              <Typography.Text className='w-[50%]'>{detailParticipant?.gender ? detailParticipant?.gender : '-'}</Typography.Text>
            </div>
            <div className='flex w-full justify-between'>
              <Typography.Text className='font-bold'>Bio:</Typography.Text>
              <Typography.Text className='w-[50%]'>{detailParticipant?.bio ? detailParticipant?.bio : '-'}</Typography.Text>
            </div>
            <div className='flex w-full justify-between'>
              <Typography.Text className='font-bold'>Address:</Typography.Text>
              <Typography.Text className='w-[50%]'>{detailParticipant?.address ? detailParticipant?.address : '-'}</Typography.Text>
            </div>
            <div className='flex w-full justify-between'>
              <Typography.Text className='font-bold'>Province:</Typography.Text>
              <Typography.Text className='w-[50%]'>{detailParticipant?.province?.name ? detailParticipant?.province?.name : '-'}</Typography.Text>
            </div>
            <div className='flex w-full justify-between'>
              <Typography.Text className='font-bold'>City:</Typography.Text>
              <Typography.Text className='w-[50%]'>{detailParticipant?.city?.name ? detailParticipant?.city?.name : '-'}</Typography.Text>
            </div>
            <div className='flex w-full justify-between'>
              <Typography.Text className='font-bold'>District:</Typography.Text>
              <Typography.Text className='w-[50%]'>{detailParticipant?.district?.name ? detailParticipant?.district?.name : '-'}</Typography.Text>
            </div>
            <div className='flex w-full justify-between'>
              <Typography.Text className='font-bold'>Subdistrict/Village:</Typography.Text>
              <Typography.Text className='w-[50%]'>{detailParticipant?.village?.name ? detailParticipant?.village?.name : '-'}</Typography.Text>
            </div>
          </div>
        </div>
        <div className='flex gap-[43px] py-[33px] border-b border-black'>
          <div className='w-[196px] flex flex-col justify-start'>
            <h3 className='font-bold text-xl underline underline-offset-4 border-black'>
              Education
            </h3>
          </div>
          <div className=' flex flex-grow'>
            <div className='flex flex-grow flex-col gap-[10px]'>
              <div className='flex w-full justify-between'>
                <Typography.Text className='font-bold'>Level of study:</Typography.Text>
                <Typography.Text className='w-[50%]'>{detailParticipant?.level_of_study ? detailParticipant?.level_of_study : '-'}</Typography.Text>
              </div>
              <div className='flex w-full justify-between'>
                <Typography.Text className='font-bold'>School:</Typography.Text>
                <Typography.Text className='w-[50%]'>{detailParticipant?.school ? detailParticipant?.school : '-'}</Typography.Text>
              </div>
              <div className='flex w-full justify-between'>
                <Typography.Text className='font-bold'>Graduation year:</Typography.Text>
                <Typography.Text className='w-[50%]'>{detailParticipant?.graduation_year ? detailParticipant?.graduation_year : '-'}</Typography.Text>
              </div>
              <div className='flex w-full justify-between'>
                <Typography.Text className='font-bold'>Major:</Typography.Text>
                <Typography.Text className='w-[50%]'>{detailParticipant?.major ? detailParticipant?.major : '-'}</Typography.Text>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-[43px] py-[33px] border-b border-black'>
          <div className='w-[196px] flex flex-col justify-start'>
            <h3 className='font-bold text-xl underline underline-offset-4 border-black'>
              Experience & Preference
            </h3>
          </div>
          <div className=' flex flex-grow'>
          <div className='flex flex-grow flex-col gap-[10px]'>
              <div className='flex w-full justify-between'>
                <Typography.Text className='font-bold'>Occupation:</Typography.Text>
                <Typography.Text className='w-[50%]'>{detailParticipant?.user?.occupation?.name ? detailParticipant?.user?.occupation?.name : '-'}</Typography.Text>
              </div>
              <div className='flex w-full justify-between'>
                <Typography.Text className='font-bold'>Company Name:</Typography.Text>
                <Typography.Text className='w-[50%]'>{detailParticipant?.user?.institution ? detailParticipant?.user?.institution :'-'}</Typography.Text>
              </div>
              <div className='flex w-full justify-between'>
                <Typography.Text className='font-bold'>Number of Hackathons Attended:</Typography.Text>
                <Typography.Text className='w-[50%]'>{detailParticipant?.num_of_hackathon}</Typography.Text>
              </div>
              <div className='flex w-full justify-between'>
                <Typography.Text className='font-bold'>Portofolio:</Typography.Text>
                <Typography.Text className='w-[50%]'>{detailParticipant?.link_portofolio ? detailParticipant?.link_portofolio : '-' }</Typography.Text>
              </div>
              <div className='flex w-full justify-between'>
                <Typography.Text className='font-bold'>Repositories:</Typography.Text>
                <Typography.Text 
                className='w-[50%] cursor-pointer'
                onClick={()=> window.location.href = detailParticipant?.link_repository}
                >{detailParticipant?.link_repository ? detailParticipant?.link_repository : '-' }</Typography.Text>
              </div>
              <div className='flex w-full justify-between'>
                <Typography.Text className='font-bold'>Linkedin:</Typography.Text>
                <Typography.Text 
                className='w-[50%] cursor-pointer' 
                onClick={()=> window.location.href = detailParticipant?.link_linkedin }
                >
                  { detailParticipant?.link_linkedin ? detailParticipant?.link_linkedin : '-'  }
                </Typography.Text>
              </div>
              <div className='flex w-full justify-between'>
                <Typography.Text className='font-bold'>Resume:</Typography.Text>
                <Typography.Text 
                className='w-[50%] cursor-pointer'
                onClick={()=> window.location.href = detailParticipant?.resume }
                >
                  {detailParticipant?.resume ? detailParticipant?.resume : '-' }
                </Typography.Text>
              </div>
              <div className='flex w-full justify-between'>
                <Typography.Text className='font-bold'>Speciality:</Typography.Text>
                <Typography.Text className='w-[50%]'>{detailParticipant?.speciality?.name ? detailParticipant?.speciality?.name : '-' }</Typography.Text>
              </div>
              <div className='flex w-full justify-between'>
                <Typography.Text className='font-bold'>Skills:</Typography.Text>
                <Typography.Text className='w-[50%]'>{skillsText ? skillsText : '-' }</Typography.Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
