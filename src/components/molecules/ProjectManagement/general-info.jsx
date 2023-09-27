import React, { useEffect, useState } from 'react'
import { Typography, notification } from 'antd'
import Image from 'next/image'
import { Date } from '@/helper'
import { CustomButton } from '@/components/_shared'
import ProjectModal from './modal'
import { Utils } from '@/helper'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Event } from '@/store/service'

export default function GeneralInfo({ project }) {
  const [modalOpen, setModalOpen] = useState(false)
  const { isJudge } = Utils.role()

  const router = useRouter()
  const dispatch = useDispatch()
  const [notifApi, contextHolder] = notification.useNotification()
  // const { eventAssessment } = useSelector((state) => state.event)

  //TODO: tolong rapihin lagi pake redux
  const [eventAssessment, setEventAssessment] = useState([])

  useEffect(() => {
    if (router.isReady && project) {
      dispatch(Event.GetEventAssessment(project.event_id))
        .unwrap()
        .then((ress) => {
          setEventAssessment(ress.data.data.criteria)
          notifApi.success({ message: ress.data.message })
          setTimeout(() => {}, 2000)
        })
        .catch((ress) => {
          notifApi.error({ message: ress?.error })
          setTimeout(() => {}, 2000)
        })
    }
  }, [router])

  return (
    <>
      {contextHolder}
      <div
        id='general-info'
        className='mb-10'
      >
        <div className='mb-[30px] flex flex-row justify-between'>
          <Typography.Title level={3}>General Info</Typography.Title>
          {project.status === 'submitted'  ? isJudge && (
            <>
            <CustomButton
              height='34px'
              onClick={() => setModalOpen(true)}
            >
              assess
            </CustomButton>
            </>
          ) : ' '}
        </div>

        <div className='bg-white drop-shadow-md p-[30px]'>
          <div className='grid grid-cols-3'>
            <div className='col-span-2 space-y-[25px]'>
              <div className='grid grid-cols-2'>
                <div className='flex gap-3 flex-col'>
                  <div className='font-bold'>Event Id</div>
                  <div>{project.event_id}</div>
                </div>
                <div className='flex gap-3 flex-col'>
                  <div className='font-bold'>Team Id</div>
                  <div>{project.team_id}</div>
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='flex gap-3 flex-col'>
                  <div className='font-bold'>Team Name</div>
                  <div>{project.team.name}</div>
                </div>
                <div className='flex gap-3 flex-col'>
                  <div className='font-bold'>Project Id</div>
                  <div>{project.id}</div>
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div className='flex gap-3 flex-col'>
                  <div className='font-bold'>Project Name</div>
                  <div>{project.name}</div>
                </div>
                <div className='flex gap-3 flex-col'>
                  <div className='font-bold'>Status</div>
                  <div>{project.status}</div>
                </div>
              </div>
            </div>

            <div>
              <Image
                src={project.thumbnail}
                alt='project'
                width={358}
                height={212}
                className='w-[358px] h-[212px]'
                priority
              />
            </div>
          </div>

          <div className='mt-[25px] grid grid-cols-3'>
            <div className='flex gap-3 flex-col'>
              <div className='font-bold'>Created At</div>
              <div>{Date.fullTime(project.created_at)}</div>
            </div>
            <div className='flex gap-3 flex-col'>
              <div className='font-bold'>Updated At</div>
              <div>{Date.fullTime(project.updated_at)}</div>
            </div>
            <div className='flex gap-3 flex-col'>
              <div className='font-bold'>Submitted At</div>
              <div>{Date.fullTime(project.submitted_at)}</div>
            </div>
          </div>
        </div>
      </div>
      <ProjectModal
        open={modalOpen}
        setOpen={setModalOpen}
        project={project}
        eventAssessments={eventAssessment}
      />
    </>
  )
}
