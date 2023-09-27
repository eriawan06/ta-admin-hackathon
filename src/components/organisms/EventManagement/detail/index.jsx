import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import { CustomButton, CustomTable, CustomImage } from '@/components/_shared'
import { Typography, notification } from 'antd'

import rulesTableColumn from './rulesTableColumn'
import faqsTableColumn from './faqsTableColumn'
import AssessmentTableColumn from './assessmentTableColumn'
import RulesDetailPopup from '../actions/rulesDetailPopup'
import FaqsDetailPopup from '../actions/faqsDetailPopup'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import { useDispatch, useSelector } from 'react-redux'
import { Event } from '@/store/service'

export default function EventManagementDetailComponent() {
  const dispatch = useDispatch()
  const router = useRouter()
  const id = router.query.id
  const [notifApi, contextHolder] = notification.useNotification()
  const { eventDetail, eventAssessment, eventMentor, eventJudges, loading } = useSelector(
    (state) => state.event
  )
  const [RulesOpen, setRulesOpen] = useState(false)
  const [RulesDetailShow, setRulesDetailShow] = useState({
    title: '',
    note: ''
  })
  const [FaqsOpen, setFaqsOpen] = useState(false)
  const [FaqsDetailShow, setFaqsDetailShow] = useState({
    title: '',
    note: ''
  })
  const [RulesTableSetting, setRulesTableSetting] = useState({
    limit: 5,
    offset: 0,
    current: 1,
    sort: 'id,asc'
  })
  const [FaqsTableSetting, setFaqsTableSetting] = useState({
    limit: 5,
    offset: 0,
    current: 1,
    sort: 'id,asc'
  })
  const [AssessmentTableSetting, setAssessmentTableSetting] = useState({
    limit: 5,
    offset: 0,
    current: 1,
    sort: 'id,asc'
  })

  const breadcrumb = [
    {
      title: 'Event Management',
      onClick: () => router.push('/event-management')
    },
    {
      title: 'Detail Event',
      onClick: () => router.push(`/event-management/detail/${id}`)
    }
  ]

  const ImageCard = ({ imageLink, title, desc }) => {
    return (
      <>
        <div className='h-[251px]'>
          <div className='min-w-[197px] max-w-[197px] h-[235px] bg-transparent flex flex-col mt-4 hover:mt-0 duration-300 rounded-lg overflow-hidden'>
            <div className='w-full h-[163px] bg-transparent relative'>
              <CustomImage
                imageUrl={imageLink}
                fill
              />
            </div>
            <div className='flex flex-col flex-grow justify-center px-4 box-border'>
              <Typography.Text className='font-bold text-base '>
                {title}
              </Typography.Text>
              <Typography.Text className='text-xs mb-[-25px]'>
                {desc}
              </Typography.Text>
            </div>
            <div className='relative bg-gradient-to-t from-[#e53e3e40] to-transparent h-[32px] z-20 '></div>
          </div>
        </div>
      </>
    )
  }

  const Card = ({ title, date, desc }) => {
    return (
      <>
        <div className='h-[232px]'>
          <div className='min-w-[180px] h-[206px] bg-transparent flex flex-col  box-border px-4 justify-evenly mt-4 hover:mt-0 duration-300 border-b-4 border-[#E53E3E]'>
            <div className='flex flex-col'>
            <Typography.Text className='text-lg font-bold'>{title}</Typography.Text>
            <Typography.Text className='text-sm'>{desc}</Typography.Text>
            </div>
            <Typography.Text className='text-xl font-bold'>
              {date}
            </Typography.Text>
          </div>
        </div>
      </>
    )
  }

  const fetchDataMentorJudges = () =>{
   const payload = {
    event : id
   } 
    dispatch(Event.GetEventMentor(payload))
        .unwrap()
        .then((ress) => {
          notifApi.success({ message: ress.data.message })
          setTimeout(() => {}, 2000)
        })
        .catch((ress) => {
          notifApi.error({ message: ress?.error })
          setTimeout(() => {}, 2000)
        })

    dispatch(Event.GetEventJudges(payload))
        .unwrap()
        .then((ress) => {
          notifApi.success({ message: ress.data.message })
          setTimeout(() => {}, 2000)
        })
        .catch((ress) => {
          notifApi.error({ message: ress?.error })
          setTimeout(() => {}, 2000)
        })
  }
  useEffect(() => {
    if (id) {
      dispatch(Event.GetEventDetail(id))
        .unwrap()
        .then((ress) => {
          notifApi.success({ message: ress.data.message })
          setTimeout(() => {}, 2000)
        })
        .catch((ress) => {
          notifApi.error({ message: ress?.error })
          setTimeout(() => {}, 2000)
        })
      fetchDataMentorJudges()
    }

  }, [id])

  useEffect(() => {
    if (eventDetail?.id) {
      dispatch(Event.GetEventAssessment(eventDetail?.id))
        .unwrap()
        .then((ress) => {
          notifApi.success({ message: ress.data.message })
          setTimeout(() => {}, 2000)
        })
        .catch((ress) => {
          notifApi.error({ message: ress?.error })
          setTimeout(() => {}, 2000)
        })
    }
  }, [eventDetail])

  const openRulesDetail = (title, note) => {
    setRulesOpen(true)
    setRulesDetailShow({
      ...RulesDetailShow,
      title: title,
      note: note
    })
  }
  const openFaqsDetail = (title, note) => {
    setFaqsOpen(true)
    setFaqsDetailShow({
      ...FaqsDetailShow,
      title: title,
      note: note
    })
  }

  const RulesPagination = (pages, pageSize) => {
    setRulesTableSetting({
      ...RulesTableSetting,
      offset: (pages - 1) * pageSize,
      current: pages
    })
  }
  const FaqsPagination = (pages, pageSize) => {
    setFaqsTableSetting({
      ...FaqsTableSetting,
      offset: (pages - 1) * pageSize,
      current: pages
    })
  }
  const AssessmentPagination = (pages, pageSize) => {
    setAssessmentTableSetting({
      ...AssessmentTableSetting,
      offset: (pages - 1) * pageSize,
      current: pages
    })
  }

  return (
    <AuthenticatedLayout
      withBack
      breadcrumb={breadcrumb}
    >
      {contextHolder}
      <div className='flex gap-[18px] mb-[33px]'>
        <CustomButton
          className='min-w-[126px] w-fit'
          children='Edit'
          onClick={() => router.push(`/event-management/edit/${id}`)}
        />
      </div>
      <div className='w-full h-fit p-[30px] rounded bg-white drop-shadow-md mb-[22px]'>
        <div className='grid grid-cols-2 mb-[25px]'>
          <div className='flex flex-col'>
            <Typography.Text className='font-bold mb-3'>Name</Typography.Text>
            <Typography.Text>
              {eventDetail?.name ? eventDetail?.name : '-'}
            </Typography.Text>
          </div>
          <div className='flex flex-col'>
            <Typography.Text className='font-bold mb-3'>Status</Typography.Text>
            <Typography.Text>
              {eventDetail?.status ? eventDetail?.status : '-'}
            </Typography.Text>
          </div>
        </div>
        <div className='grid grid-cols-2 mb-[25px]'>
          <div className='flex flex-col'>
            <Typography.Text className='font-bold mb-3'>
              Start Date
            </Typography.Text>
            <Typography.Text>
              {eventDetail?.start_date
                ? dayjs(eventDetail?.start_date).format('YYYY-MM-DD')
                : '-'}
            </Typography.Text>
          </div>
          <div className='flex flex-col'>
            <Typography.Text className='font-bold mb-3'>
              End Date
            </Typography.Text>
            <Typography.Text>
              {eventDetail?.end_date
                ? dayjs(eventDetail?.end_date).format('YYYY-MM-DD')
                : '-'}
            </Typography.Text>
          </div>
        </div>
        <div className='grid grid-cols-2 mb-[25px]'>
          <div className='flex flex-col'>
            <Typography.Text className='font-bold mb-3'>
              Registration Fee
            </Typography.Text>
            <Typography.Text>
              {eventDetail?.reg_fee ? eventDetail?.reg_fee : '-'}
            </Typography.Text>
          </div>
          <div className='flex flex-col'>
            <Typography.Text className='font-bold mb-3'>
              Payment Due Date
            </Typography.Text>
            <Typography.Text>
              {eventDetail?.payment_due_date
                ? dayjs(eventDetail?.payment_due_date).format('YYYY-MM-DD')
                : '-'}
            </Typography.Text>
          </div>
        </div>
        <div className='grid grid-cols-2 mb-[25px]'>
          <div className='flex flex-col'>
            <Typography.Text className='font-bold mb-3'>
              Team Min Member
            </Typography.Text>
            <Typography.Text>
              {eventDetail?.team_min_member
                ? eventDetail?.team_min_member
                : '-'}
            </Typography.Text>
          </div>
          <div className='flex flex-col'>
            <Typography.Text className='font-bold mb-3'>
              Team Max Member
            </Typography.Text>
            <Typography.Text>
              {eventDetail?.team_max_member
                ? eventDetail?.team_max_member
                : '-'}
            </Typography.Text>
          </div>
        </div>
        <div className='grid grid-cols-1'>
          <div className='flex flex-col'>
            <Typography.Text className='font-bold mb-3'>
              Description
            </Typography.Text>
            <Typography.Text>
              {eventDetail?.description ? eventDetail?.description : '-'}
            </Typography.Text>
          </div>
        </div>
      </div>
      <div className='w-full h-fit p-[30px] rounded bg-white drop-shadow-md mb-[22px]'>
        <div className='w-full text-center mb-[35px]'>
          <Typography.Text className='text-xl font-bold'>
            List Mentor
          </Typography.Text>
        </div>
        <div className='flex gap-[21px] overflow-auto pb-4'>
          {eventMentor?.length !== 0 ? (
            eventMentor?.map((mentor, index) => (
              <React.Fragment key={index}>
                <ImageCard
                  imageLink={mentor?.avatar}
                  title={mentor?.name ? mentor?.name : '-'}
                  desc={`${
                    mentor?.occupation
                      ? mentor?.occupation
                      : '-'
                  } At ${
                    mentor?.institution
                      ? mentor?.institution
                      : '-'
                  }`}
                />
              </React.Fragment>
            ))
          ) : (
            <>
              <Typography.Text className='text-base text-center w-full font-bold'>
                No Data....
              </Typography.Text>
            </>
          )}
        </div>
      </div>
      <div className='w-full h-fit p-[30px] rounded bg-white drop-shadow-md mb-[22px]'>
        <div className='w-full text-center mb-[35px]'>
          <Typography.Text className='text-xl font-bold'>
            List Judge
          </Typography.Text>
        </div>
        <div className='flex gap-[21px] overflow-auto pb-4'>
          {eventJudges?.length !== 0 ? (
            eventJudges?.map((judge,index) => (
              <React.Fragment key={index}>
                <ImageCard
                  imageLink={judge?.avatar}
                  title={judge?.name ? judge?.name : '-'}
                  desc={`${
                    judge?.occupation ? judge?.occupation : '-'
                  } At ${
                    judge?.institution
                      ? judge?.institution
                      : '-'
                  }`}
                />
              </React.Fragment>
            ))
          ) : (
            <>
              <Typography.Text className='text-base text-center w-full font-bold'>
                No Data....
              </Typography.Text>
            </>
          )}
        </div>
      </div>
      <div className='w-full h-fit p-[30px] rounded bg-white drop-shadow-md mb-[22px]'>
        <div className='w-full text-center mb-[35px]'>
          <Typography.Text className='text-xl font-bold'>
            Timelines
          </Typography.Text>
        </div>
        <div className='flex gap-[14px] overflow-auto pb-4'>
          {eventDetail?.timelines?.length !== 0 ? (
            eventDetail?.timelines?.map((timelines, timeline) => (
              <React.Fragment key={timeline}>
                <Card
                  title={timelines.title}
                  date={`${dayjs(timelines.start_date).format('DD')} ${dayjs(
                    timelines.start_date
                  ).format('MMMM')}`}
                  desc={timelines.note ? timelines.note : '-'}
                />
              </React.Fragment>
            ))
          ) : (
            <>
              <Typography.Text className='text-base text-center w-full font-bold'>
                No Data....
              </Typography.Text>
            </>
          )
          }
        </div>
      </div>
      <div className='w-full h-fit p-[30px] rounded bg-white drop-shadow-md mb-[22px]'>
        <div className='w-full text-center mb-[35px]'>
          <Typography.Text className='text-xl font-bold'>
            Sponsors & Partners
          </Typography.Text>
        </div>
        <div className='flex gap-[21px] overflow-auto pb-4'>
          {eventDetail?.companies?.length !== 0 ? (
            eventDetail?.companies?.map((companies, company) => (
              <React.Fragment key={company}>
                <ImageCard
                  imageLink={companies?.logo}
                  title={companies?.name ? companies?.name : '-'}
                  desc={
                    companies?.partnership_type
                      ? companies?.partnership_type
                      : '-'
                  }
                />
              </React.Fragment>
            ))
          ) : (
            <>
              <Typography.Text className='text-base text-center w-full font-bold'>
                No Data....
              </Typography.Text>
            </>
          )}
        </div>
      </div>
      <div className='w-full h-fit p-[30px] rounded bg-white drop-shadow-md mb-[22px]'>
        <Typography.Text className='text-xl font-bold'>Rules</Typography.Text>
        <CustomTable
          className='mt-[58px]'
          column={rulesTableColumn(
            RulesTableSetting.current,
            RulesTableSetting.limit,
            openRulesDetail
          )}
          dataSource={eventDetail?.rules}
          totalData={eventDetail?.rules?.length}
          onChangePagination={RulesPagination}
          current={RulesTableSetting.current}
          pageSize={RulesTableSetting.limit}
          rowKey='id'
          loading={loading}
        />
      </div>
      <div className='w-full h-fit p-[30px] rounded bg-white drop-shadow-md mb-[22px]'>
        <Typography.Text className='text-xl font-bold'>
          Frequently Asked Questions (FAQ)
        </Typography.Text>
        <CustomTable
          className='mt-[58px]'
          column={faqsTableColumn(
            FaqsTableSetting.current,
            FaqsTableSetting.limit,
            openFaqsDetail
          )}
          dataSource={eventDetail?.faqs}
          totalData={eventDetail?.faqs?.length}
          onChangePagination={FaqsPagination}
          current={FaqsTableSetting.current}
          pageSize={FaqsTableSetting.limit}
          rowKey='id'
          loading={loading}
        />
      </div>
      <div className='w-full h-fit p-[30px] rounded bg-white drop-shadow-md mb-[22px]'>
        <Typography.Text className='text-xl font-bold'>
          Assessment Criteria
        </Typography.Text>
        <CustomTable
          className='mt-[58px]'
          column={AssessmentTableColumn(
            AssessmentTableSetting.current,
            AssessmentTableSetting.limit
          )}
          dataSource={eventAssessment?.criteria}
          totalData={eventAssessment?.criteria?.length}
          onChangePagination={AssessmentPagination}
          current={AssessmentTableSetting.current}
          pageSize={AssessmentTableSetting.limit}
          rowKey='id'
          loading={loading}
        />
      </div>

      {/* Detail Popup ============================== */}
      <RulesDetailPopup
        open={RulesOpen}
        setOpen={setRulesOpen}
        title={RulesDetailShow?.title}
        note={RulesDetailShow?.note}
      />
      <FaqsDetailPopup
        open={FaqsOpen}
        setOpen={setFaqsOpen}
        title={FaqsDetailShow?.title}
        note={FaqsDetailShow?.note}
      />
    </AuthenticatedLayout>
  )
}
