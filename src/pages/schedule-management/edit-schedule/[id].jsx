import React, { useEffect } from 'react'
import EditSchedule from '@/components/organisms/ScheduleManagement/edit'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Schedule } from '@/store/service'

export default function EditSchedulePage() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { scheduleDetail } = useSelector((state) => state.schedule)

  useEffect(() => {
    if (router.isReady) {
      dispatch(Schedule.DetailSchedule(router.query.id))
    }
  }, [router])

  return <EditSchedule detail={scheduleDetail?.data} />
}
