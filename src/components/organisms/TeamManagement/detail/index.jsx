import React, { useEffect } from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { Typography, notification } from 'antd'
import { CustomButton, CustomImage } from '@/components/_shared'
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'
import { Team } from '@/store/service'
import dayjs from 'dayjs'

// Import Icon
import { FiBookmark } from 'react-icons/fi'
import { RiCloseLine } from 'react-icons/ri'

export default function TeamManagementDetailComponent() {
  // Data and Depedency Variable ==============================
  const dispatch = useDispatch()
  const router = useRouter()
  const id = router.query.id
  const [notifApi, contextHolder] = notification.useNotification()
  const { TeamDetail } = useSelector((state) => state.team)

  // Breadcrumb Settings :
  const breadcrumb = [
    {
      title: 'Team Management',
      onClick: () => router.push('/team-management')
    },
    {
      title: 'Detail Team'
    }
  ]

  const { teamMember } = useSelector((state) => state.team)

  useEffect(() => {
    if (id) {
      dispatch(Team.GetTeamDetail(id))
        .unwrap()
        .then((ress) => {
          notifApi.success({ message: ress.data.message, duration: 2 })
        })
        .catch((ress) => {
          notifApi.error({ message: ress?.error, duration: 2 })
        })

      dispatch(Team.GetTeamMember(router.query.id))
        .unwrap()
        .then((res) => {
          notifApi.success({ message: res.data.message, duration: 2 })
        })
        .catch((err) => {
          err.error.map((message) => {
            notifApi.error({ message, duration: 2 })
          })
        })
    }
  }, [id])

  const SkillBox = ({ children }) => {
    return (
      <div className='flex items-center gap-2 p-2  bg-white shadow-md w-fit rounded'>
        <RiCloseLine />
        <Typography.Text className='text-sm'>{children}</Typography.Text>
      </div>
    )
  }

  const MemberCard = ({
    memberID,
    name,
    job,
    role,
    from,
    gender,
    studentAt,
    bio,
    skill,
    avatar
  }) => {
    return (
      <div
        className='flex flex-col min-h-[223px] h-fit bg-[#ddd] rounded cursor-pointer'
        onClick={() =>
          router.push(`/participant-management/detail/${memberID}`)
        }
      >
        <div className='flex w-full items-center gap-4 py-[24px] px-10 box-border'>
          <div
            className='w-[63px] h-[63px] bg-cover bg-center rounded-full'
            style={{ backgroundImage: `url(${avatar})` }}
          ></div>
          <div className='flex-grow'>
            <div className='flex justify-between items-center mb-3'>
              <div className='flex items-center gap-[17px]'>
                <Typography.Text className='text-base font-bold'>
                  {name}
                </Typography.Text>
                <div className='w-fit py-[5px] px-[24px] rounded bg-white '>
                  <Typography.Text className='text-sm '>{job}</Typography.Text>
                </div>
              </div>
              {role ? (
                <>
                  <div className='w-fit py-[5px] px-[24px] rounded bg-white '>
                    <Typography.Text className='text-sm '>
                      Admin
                    </Typography.Text>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div className='flex items-center gap-[13px]'>
              <div className='flex items-center gap-1'>
                <FiBookmark className='text-lg' />
                <Typography.Text className='text-sm'>{from}</Typography.Text>
              </div>
              <div className='flex items-center gap-1'>
                <FiBookmark className='text-lg' />
                <Typography.Text className='text-sm'>{gender}</Typography.Text>
              </div>
              <div className='flex items-center gap-1'>
                <FiBookmark className='text-lg' />
                <Typography.Text className='text-sm'>
                  Student at {studentAt}
                </Typography.Text>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 py-[24px] px-10 gap-5 box-border border-t-[1px] border-[#000]'>
          <div>
            <div className='flex gap-1 items-center'>
              <FiBookmark className='text-lg' />
              <Typography.Text className='text-sm'>Bio</Typography.Text>
            </div>
            <div className='mt-[11px]'>
              <Typography.Text className='text-sm mt-[11px]'>
                {bio}
              </Typography.Text>
            </div>
          </div>
          <div>
            <div className='flex gap-1 items-center '>
              <FiBookmark className='text-lg' />
              <Typography.Text className='text-sm'>Skills</Typography.Text>
            </div>
            <div className=' flex gap-[14px] mt-[11px] flex-wrap'>
              {skill.map((skill, skillIndex) => (
                <React.Fragment key={skillIndex}>
                  <SkillBox children={skill.skill_name} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  console.log(TeamDetail.project_link)

  return (
    <>
      <AuthenticatedLayout
        withBack
        breadcrumb={breadcrumb}
      >
        {contextHolder}
        <div className='flex gap-[26px]'>
          <div className='flex flex-col gap-5'>
            <div className=' w-[270px] h-[270px] rounded-md bg-white drop-shadow-md flex justify-center items-center'>
              <div className='w-[145px] aspect-square relative'>
                <CustomImage
                  width={145}
                  height={145}
                  imageUrl={TeamDetail.avatar}
                />
              </div>
            </div>
            <div className=' w-[270px] h-[187px] rounded bg-white drop-shadow-md p-6 box-border flex flex-col gap-6'>
              <Typography.Text className='text-xl font-bold'>
                Team's Project
              </Typography.Text>

              <CustomButton
                width='100%'
                height='67px'
                className='flex justify-center items-center w-full'
                children='View'
                onClick={() =>
                  router.push(
                    `/project-management/detail-project/${TeamDetail.project_id}`
                  )
                }
              />
            </div>
          </div>
          <div className='flex-grow rounded bg-white drop-shadow-md p-[30px] box-border'>
            <div className='grid grid-cols-2 mb-[25px]'>
              <div className='flex flex-col'>
                <Typography.Text className='font-bold mb-3'>
                  Team ID
                </Typography.Text>
                <Typography.Text>
                  {TeamDetail?.id ? TeamDetail?.id : '-'}
                </Typography.Text>
              </div>
              <div className='flex flex-col'>
                <Typography.Text className='font-bold mb-3'>
                  Team Name
                </Typography.Text>
                <Typography.Text>
                  {TeamDetail?.name ? TeamDetail?.name : '-'}
                </Typography.Text>
              </div>
            </div>
            <div className='grid grid-cols-2 mb-[25px]'>
              <div className='flex flex-col'>
                <Typography.Text className='font-bold mb-3'>
                  Event ID
                </Typography.Text>
                <Typography.Text>
                  {TeamDetail?.event_id ? TeamDetail?.event_id : '-'}
                </Typography.Text>
              </div>
              <div className='flex flex-col'>
                <Typography.Text className='font-bold mb-3'>
                  Created By
                </Typography.Text>
                <Typography.Text>
                  {TeamDetail?.participant_name
                    ? TeamDetail?.participant_name
                    : '-'}
                </Typography.Text>
              </div>
            </div>
            <div className='grid grid-cols-2 mb-[25px]'>
              <div className='flex flex-col'>
                <Typography.Text className='font-bold mb-3'>
                  Created At
                </Typography.Text>
                <Typography.Text>
                  {TeamDetail?.event_id
                    ? dayjs(TeamDetail?.event_id).format('YYYY-MM-DD')
                    : '-'}
                </Typography.Text>
              </div>
              <div className='flex flex-col'>
                <Typography.Text className='font-bold mb-3'>
                  {TeamDetail?.is_active
                    ? TeamDetail?.is_active === true
                      ? 'Active'
                      : 'Inactive'
                    : '-'}
                </Typography.Text>
                <Typography.Text>Test</Typography.Text>
              </div>
            </div>
            <div className='grid grid-cols-1'>
              <div className='flex flex-col'>
                <Typography.Text className='font-bold mb-3'>
                  Description
                </Typography.Text>
                <Typography.Text>
                  {TeamDetail?.description ? TeamDetail?.description : '-'}
                </Typography.Text>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full rounded p-[22px] bg-white drop-shadow-md mt-6'>
          <Typography.Text className='text-xl font-bold'>
            Members
          </Typography.Text>
          <div className='grid gap-7 max-h-[474px] overflow-auto mt-7'>
            {teamMember?.map((member, memberIndex) => (
              <React.Fragment key={memberIndex}>
                <MemberCard
                  memberID={member.id}
                  name={member.name}
                  job={member.speciality_name}
                  role={member.is_admin}
                  from={member.city_name}
                  gender={member.gender}
                  studentAt={member.institution}
                  bio={member.bio}
                  skill={member.skills}
                  avatar={member.avatar}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  )
}
