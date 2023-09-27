import DetailSchedule from '@/components/organisms/ScheduleManagement/detail'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Schedule, Team } from '@/store/service'
import { notification } from 'antd'

export default function DetailSchedulePage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [notifApi, contextHolder] = notification.useNotification()

  const [page, setPage] = useState({ limit: 10, offset: 0, current: 0 })

  const { scheduleDetail } = useSelector((state) => state.schedule)
  const { TeamSchedule } = useSelector((state) => state.team)

  const fetchData = () =>{
    dispatch(Schedule.DetailSchedule(router.query.id))
        .unwrap()
        .then((res) => {
          notifApi.success({ message: res.data.message })
        })
        .catch((err) => {
          err.error.map((message) => {
            notifApi.error({ message })
          })
        })
      dispatch(
        Team.GetTeamSchedule({
          limit: page.limit,
          offset: page.offset,
          schedule: router.query.id,
          order: 'id,asc'
        })
      )
        .unwrap()
        .then((res) => {
          notifApi.success({ message: res.data.message })
        })
        .catch((err) => {
          err.error.map((message) => {
            notifApi.error({ message })
          })
        })
  }

  useEffect(() => {
    if (router.isReady) {
      fetchData()
    }
  }, [router])

  return (
    <>
      {contextHolder}
      <DetailSchedule
        detail={scheduleDetail?.data}
        team={TeamSchedule.teams}
        page={page}
        setPage={setPage}
        fetchData={fetchData}
      />
    </>
  )
}
