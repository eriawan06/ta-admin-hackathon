import React, { useState, useEffect } from 'react'

// Import Components
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout'
import {
  CustomButton,
  CustomTable,
  CustomInput,
  CustomImage
} from '@/components/_shared'
import { DatePicker, Typography, Input, Select, Form, notification } from 'antd'

// Import Column Settings
import rulesTableColumn from './rulesTableColumn'
import faqsTableColumn from './faqsTableColumn'
import AssessmentTableColumn from './assessmentTableColumn'

// Import Detail Popup Actions
import RulesDetailPopup from '../actions/rulesDetailPopup'
import FaqsDetailPopup from '../actions/faqsDetailPopup'

// Import Form Popup Actions
import MentorFormPopup from '../actions/mentorFormPopup'
import JudgesFormPopup from '../actions/judgesFormPopup'
import TimelineFormPopup from '../actions/timelineFormPopup'
import SponsorFormPopup from '../actions/sponsorFormPopup'
import RulesFormPopup from '../actions/rulesFormPopup'
import FaqsFormPopup from '../actions/faqsFormPopup'
import AssessmentFormPopup from '../actions/assessmentFormPopup'

// Import Delete Popup Action
import DeleteEventSectionItem from '../actions/deleteEventSectionItem'

// Import Depedency
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Event, Mentor, Judges } from '@/store/service'
import dayjs from 'dayjs'

// Import Icon
import { AiFillCloseCircle } from 'react-icons/ai'
import { BiSolidPencil } from 'react-icons/bi'

// ==============================
// ==============================
// ==============================

export default function CreateEventManagementComponent() {
  // Data and Depedency Variable ==============================
  const { TextArea } = Input
  const [form] = Form.useForm()
  const router = useRouter()
  const [EventID, setEventID] = useState(null)
  const dispatch = useDispatch()
  const [notifApi, contextHolder] = notification.useNotification()

  // Get Data From Redux ==============================
  const { eventDetail, eventAssessment, eventMentor, eventJudges, loading } = useSelector(
    (state) => state.event
  )
  const { dataMentor } = useSelector((state) => state.mentor)
  const { dataJudges } = useSelector((state) => state.judges)

  // Table Settings ==============================
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

  // Popup Detail UseStates ==============================
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

  // Popup Form UseStates ==============================
  const [OpenMentorForm, setOpenMentorForm] = useState(false)
  const [OpenJudgeForm, setOpenJudgeForm] = useState(false)
  const [OpenTimelinesPopup, setOpenTimelinesPopup] = useState(false)
  const [IsUpdateTimelines, setIsUpdateTimelines] = useState(false)
  const [TimelinesSelectionData, setTimelinesSelectionData] = useState({
    id: null,
    title: '',
    start_date: null,
    end_date: null,
    note: ''
  })
  const [OpenCompanyPopup, setOpenCompanyPopup] = useState(false)
  const [IsUpdateCompany, setIsUpdateCompany] = useState(false)
  const [CompanySelectionData, setCompanySelectionData] = useState({
    id: null,
    name: '',
    email: '',
    phone_number: '',
    partnership_type: '',
    sponsorship_level: '',
    sponsorship_amount: null,
    logo: ''
  })
  const [OpenRulesPopup, setOpenRulesPopup] = useState(false)
  const [IsUpdateRules, setIsUpdateRules] = useState(false)
  const [RulesSelectionData, setRulesSelectionData] = useState({
    id: null,
    title: '',
    note: '',
    is_active: ''
  })
  const [OpenFaqsPopup, setOpenFaqsPopup] = useState(false)
  const [IsUpdateFaqs, setIsUpdateFaqs] = useState(false)
  const [FaqsSelectionData, setFaqsSelectionData] = useState({
    id: null,
    title: '',
    note: '',
    is_active: ''
  })
  const [OpenAssessmentPopup, setOpenAssessmentPopup] = useState(false)
  const [IsUpdateAssessment, setIsUpdateAssessment] = useState(false)
  const [AssessmentSelectionData, setAssessmentSelectionData] = useState({
    id: null,
    criteria: '',
    percentage_val: null,
    score_start: null,
    score_end: null,
    is_active: ''
  })

  // Popup Delete UseStates ==============================
  const [OpenDelete, setOpenDelete] = useState(false)
  const [Section, setSection] = useState('')
  const [IdForDelete, setIdForDelete] = useState(null)

  const breadcrumb = [
    {
      title: 'Event Management',
      onClick: () => router.push('/event-management')
    },
    {
      title: 'Create Event',
      onClick: () => router.push('/event-management/create')
    }
  ]

  const ImageCard = ({
    imageLink,
    title,
    desc,
    pencilOnclick,
    closeOnclick,
    cantUpdate
  }) => {
    return (
      <>
        <div className='h-[251px]'>
          <div className='imagecardTainer mt-4 hover:mt-0 duration-300'>
            <div className='min-w-[197px] max-w-[197px] h-[235px] bg-transparent flex flex-col  rounded-lg overflow-hidden'>
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
            <div className='relative z-99 min-w-[197px] h-[235px] mt-[-235px] opacity-0 hover:opacity-90 bg-white flex justify-center items-center gap-2 duration-300'>
              {cantUpdate ? (
                <></>
              ) : (
                <BiSolidPencil
                  onClick={pencilOnclick}
                  fontSize={'28px'}
                />
              )}
              <AiFillCloseCircle
                onClick={closeOnclick}
                fontSize={'28px'}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  const Card = ({ date, desc, pencilOnclick, closeOnclick }) => {
    return (
      <>
        <div className=' h-[232px]'>
          <div className='cardTainer mt-4 hover:mt-0 duration-300'>
            <div className='relative min-w-[180px] h-[206px] bg-transparent flex flex-col  box-border px-4 justify-evenly border-b-4 border-[#E53E3E]'>
              <Typography.Text className='text-sm'>{desc}</Typography.Text>
              <Typography.Text className='text-xl font-bold'>
                {date}
              </Typography.Text>
            </div>
            <div className='relative z-99 min-w-[180px] h-[206px] mt-[-206px] opacity-0 hover:opacity-90 bg-white flex justify-center items-center gap-2 duration-300'>
              <BiSolidPencil
                onClick={pencilOnclick}
                fontSize={'28px'}
              />
              <AiFillCloseCircle
                onClick={closeOnclick}
                fontSize={'28px'}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  // Function For Create Event Main Data ==============================
  const onSubmit = (e) => {
    const payload = {
      name: e.name,
      start_date: dayjs(e.start_date).format('YYYY-MM-DD'),
      end_date: dayjs(e.end_date).format('YYYY-MM-DD'),
      reg_fee: parseInt(e.reg_fee),
      payment_due_date: dayjs(e.payment_due_date).format('YYYY-MM-DD'),
      team_min_member: parseInt(e.team_min_member),
      team_max_member: parseInt(e.team_max_member),
      description: e.description
    }
    dispatch(Event.CreateEvent(payload))
      .unwrap()
      .then((ress) => {
        notifApi.success({ message: ress.data.message })
        setTimeout(() => {
          setEventID(ress.data.data.id)
        }, 2000)
      })
      .catch((err) => {
        err.error.map((item) => {
          notifApi.error({ message: item })
        })
        setTimeout(() => {}, 2000)
      })
  }

  // fetch data mentor & Judges Selected
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
    if (EventID) {
      // GET Event Detail ==============================
      dispatch(Event.GetEventDetail(EventID))
        .unwrap()
        .then((ress) => {
          notifApi.success({ message: ress.data.message })
          setTimeout(() => {}, 2000)
        })
        .catch((ress) => {
          notifApi.error({ message: ress?.error })
          setTimeout(() => {}, 2000)
        })

      // Get mentor & judges selected
      fetchDataMentorJudges()
      // Get Mentor Options ==============================
      dispatch(Mentor.GetMentorList({ order: 'id,asc' })).unwrap()
      // Get Judge Options ==============================
      dispatch(Judges.GetAllJudges({ order: 'id,asc' })).unwrap()
      // GET Event Assessment ==============================
      dispatch(Event.GetEventAssessment(EventID))
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
  }, [EventID])

  // Function For Get Show Data Popup ==============================
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

  // Function For Form Popup Setting ==============================
  const openTimelinesPopup = (isUpdate, timelinesSelectionData) => {
    setIsUpdateTimelines(isUpdate)
    setOpenTimelinesPopup(true)
    setTimelinesSelectionData({
      ...TimelinesSelectionData,
      id: timelinesSelectionData?.id,
      title: timelinesSelectionData?.title,
      start_date: timelinesSelectionData?.start_date,
      end_date: timelinesSelectionData?.end_date,
      note: timelinesSelectionData?.note
    })
  }
  const openCompannyPopup = (isUpdate, companySelectionData) => {
    setIsUpdateCompany(isUpdate)
    setOpenCompanyPopup(true)
    setCompanySelectionData({
      ...CompanySelectionData,
      id: companySelectionData?.id,
      name: companySelectionData?.name,
      email: companySelectionData?.email,
      phone_number: companySelectionData?.phone_number,
      partnership_type: companySelectionData?.partnership_type,
      sponsorship_level: companySelectionData?.sponsorship_level,
      sponsorship_amount: companySelectionData?.sponsorship_amount,
      logo: companySelectionData?.logo
    })
  }
  const openRulesPopup = (isUpdate, rulesSelectionData) => {
    setIsUpdateRules(isUpdate)
    setOpenRulesPopup(true)
    setRulesSelectionData({
      ...RulesSelectionData,
      id: rulesSelectionData?.id,
      title: rulesSelectionData?.title,
      is_active: rulesSelectionData?.is_active,
      note: rulesSelectionData?.note
    })
  }
  const openFaqsPopup = (isUpdate, faqsSelectionData) => {
    setIsUpdateFaqs(isUpdate)
    setOpenFaqsPopup(true)
    setFaqsSelectionData({
      ...FaqsSelectionData,
      id: faqsSelectionData?.id,
      title: faqsSelectionData?.title,
      is_active: faqsSelectionData?.IsActive,
      note: faqsSelectionData?.note
    })
  }
  const openAssessmentPopup = (isUpdate, assessmentSelectionData) => {
    setIsUpdateAssessment(isUpdate)
    setOpenAssessmentPopup(true)
    console.log(assessmentSelectionData)
    setAssessmentSelectionData({
      ...AssessmentSelectionData,
      id: assessmentSelectionData?.id,
      criteria: assessmentSelectionData?.criteria,
      percentage_val: assessmentSelectionData?.percentage_val,
      score_start: assessmentSelectionData?.score_start,
      score_end: assessmentSelectionData?.score_end,
      is_active: assessmentSelectionData?.IsActive
    })
  }

  // Function For Delete ==============================
  const DeleteItems = (id, section) => {
    setOpenDelete(true)
    setSection(section)
    setIdForDelete(id)
  }

  // Function For Table Pagination ==============================
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

  // ==============================
  // ==============================
  // ==============================

  return (
    <AuthenticatedLayout
      withBack
      breadcrumb={breadcrumb}
    >
      {contextHolder}
      <Form
        form={form}
        onFinish={onSubmit}
        layout='vertical'
      >
        <div className='w-full h-fit p-[30px] rounded bg-white drop-shadow-md mb-[22px]'>
          <div className='grid grid-cols-2 gap-[69px]'>
            <Form.Item
              label='Name'
              name='name'
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <CustomInput placeholder='Input Name' />
            </Form.Item>
            <Form.Item
              label='Start Date'
              name='start_date'
              rules={[{ required: true, message: 'This field is require!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </div>
          <div className='grid grid-cols-2 gap-[69px]'>
            <Form.Item
              label='End Date'
              name='end_date'
              rules={[{ required: true, message: 'This field is require!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label='Registration Fee'
              name='reg_fee'
              rules={[{ required: true, message: 'This field is require!' }]}
            >
              <CustomInput className='Input Registration Fee' />
            </Form.Item>
          </div>
          <div className='grid grid-cols-2  gap-[69px]'>
            <div className='flex flex-col'>
              <Form.Item
                label='Payment Due Date'
                name='payment_due_date'
                rules={[{ required: true, message: 'This field is require!' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label='Team Min Member'
                name='team_min_member'
                rules={[{ required: true, message: 'This field is require!' }]}
              >
                <CustomInput className='Input Registration Fee' />
              </Form.Item>
              <Form.Item
                label='Team Max Member'
                name='team_max_member'
                rules={[{ required: true, message: 'This field is require!' }]}
              >
                <CustomInput className='Input Registration Fee' />
              </Form.Item>
            </div>
            <div className='flex flex-col'>
              <Form.Item
                label='Description'
                name='description'
                className='w-full h-full flex flex-col'
              >
                <TextArea style={{ minHeight: '205px' }} />
              </Form.Item>
            </div>
          </div>
          {EventID ? (
            <></>
          ) : (
            <>
              <CustomButton
                className='min-w-[154px] w-fit'
                children='Save'
                onClick={() => form.submit()}
              />
            </>
          )}
        </div>
      </Form>
      {EventID ? (
        <>
          <div className='w-full h-fit p-[30px] rounded bg-white drop-shadow-md mb-[22px]'>
            <div className='flex justify-between items-center mb-[35px]'>
              <Typography.Text className='text-xl font-bold'>
                List Mentor
              </Typography.Text>
              <CustomButton
                className='min-w-[126px] w-fit'
                children='+ Add'
                onClick={() => setOpenMentorForm(true)}
              />
            </div>
            <div className='flex gap-[21px] overflow-auto pb-4 '>
              {eventMentor?.length !== 0 ? (
                eventMentor?.map((mentor, index) => (
                  <React.Fragment key={index}>
                    <ImageCard
                      cantUpdate
                      imageLink={mentor?.avatar}
                      title={
                        mentor?.name ? mentor?.name : '-'
                      }
                      desc={`${
                        mentor?.occupation
                          ? mentor?.occupation
                          : '-'
                      } At ${
                        mentor?.institution
                          ? mentor?.institution
                          : '-'
                      }`}
                      closeOnclick={() =>
                        DeleteItems(mentor.id, 'Event Mentor')
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
            <div className='flex justify-between items-center mb-[35px]'>
              <Typography.Text className='text-xl font-bold'>
                List Judge
              </Typography.Text>
              <CustomButton
                className='min-w-[126px] w-fit'
                children='+ Add'
                onClick={() => setOpenJudgeForm(true)}
              />
            </div>
            <div className='flex gap-[21px] overflow-auto pb-4 horizontal-scrollbar '>
              {eventJudges?.length !== 0 ? (
                eventJudges?.map((judge, index) => (
                  <React.Fragment key={index}>
                    <ImageCard
                      cantUpdate
                      imageLink={judge?.avatar}
                      title={judge?.name ? judge?.name : '-'}
                      desc={`${
                        judge?.occupation
                          ? judge?.occupation
                          : '-'
                      } At ${
                        judge?.institution
                          ? judge?.institution
                          : '-'
                      }`}
                      closeOnclick={() => DeleteItems(judge.id, 'Event Judge')}
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
            <div className='flex justify-between items-center mb-[51px]'>
              <Typography.Text className='text-xl font-bold'>
                Timelines
              </Typography.Text>
              <CustomButton
                className='min-w-[126px] w-fit'
                children='+ Add'
                onClick={() => openTimelinesPopup(false)}
              />
            </div>
            <div className='flex gap-[14px] overflow-auto pb-4 '>
              {eventDetail?.timelines?.length !== 0 ? (
                eventDetail?.timelines?.map((timelines, timeline) => (
                  <React.Fragment key={timeline}>
                    <Card
                      date={`${dayjs(timelines.start_date).format(
                        'DD'
                      )} ${dayjs(timelines.start_date).format('MMMM')}`}
                      desc={timelines.note ? timelines.note : '-'}
                      pencilOnclick={() => openTimelinesPopup(true, timelines)}
                      closeOnclick={() =>
                        DeleteItems(timelines.id, 'Event Timeline')
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
            <div className='flex justify-between items-center mb-[51px]'>
              <Typography.Text className='text-xl font-bold'>
                Sponsors & Partners
              </Typography.Text>
              <CustomButton
                className='min-w-[126px] w-fit'
                children='+ Add'
                onClick={() => openCompannyPopup(false)}
              />
            </div>
            <div className='flex gap-[21px] overflow-auto pb-4 '>
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
                      pencilOnclick={() => openCompannyPopup(true, companies)}
                      closeOnclick={() =>
                        DeleteItems(companies.id, 'Event Company')
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
            <div className='flex justify-between items-center'>
              <Typography.Text className='text-xl font-bold'>
                Rules
              </Typography.Text>
              <CustomButton
                className='min-w-[126px] w-fit'
                children='+ Add'
                onClick={() => openRulesPopup(false)}
              />
            </div>
            <CustomTable
              className='mt-[58px]'
              column={rulesTableColumn(
                RulesTableSetting.current,
                RulesTableSetting.limit,
                openRulesPopup,
                openRulesDetail,
                DeleteItems
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
            <div className='flex justify-between items-center'>
              <Typography.Text className='text-xl font-bold'>
                Frequently Asked Questions (FAQ)
              </Typography.Text>
              <CustomButton
                className='min-w-[126px] w-fit'
                children='+ Add'
                onClick={() => openFaqsPopup(false)}
              />
            </div>
            <CustomTable
              className='mt-[58px]'
              column={faqsTableColumn(
                FaqsTableSetting.current,
                FaqsTableSetting.limit,
                openFaqsPopup,
                openFaqsDetail,
                DeleteItems
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
            <div className='flex justify-between items-center'>
              <Typography.Text className='text-xl font-bold'>
                Assessment Criteria
              </Typography.Text>
              <CustomButton
                className='min-w-[126px] w-fit'
                children='+ Add'
                onClick={() => openAssessmentPopup(false)}
              />
            </div>
            <CustomTable
              className='mt-[58px]'
              column={AssessmentTableColumn(
                AssessmentTableSetting.current,
                AssessmentTableSetting.limit,
                openAssessmentPopup,
                DeleteItems
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
        </>
      ) : (
        <></>
      )}

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

      {/* Form Popup ============================== */}
      <MentorFormPopup
        eventID={EventID}
        open={OpenMentorForm}
        setOpen={setOpenMentorForm}
        mentorData={dataMentor}
      />
      <JudgesFormPopup
        eventID={EventID}
        open={OpenJudgeForm}
        setOpen={setOpenJudgeForm}
        judgeData={dataJudges}
      />
      <TimelineFormPopup
        eventID={EventID}
        isUpdate={IsUpdateTimelines}
        open={OpenTimelinesPopup}
        setOpen={setOpenTimelinesPopup}
        initialValue={TimelinesSelectionData}
      />
      <SponsorFormPopup
        eventID={EventID}
        isUpdate={IsUpdateCompany}
        open={OpenCompanyPopup}
        setOpen={setOpenCompanyPopup}
        initialValue={CompanySelectionData}
      />
      <RulesFormPopup
        eventID={EventID}
        isUpdate={IsUpdateRules}
        open={OpenRulesPopup}
        setOpen={setOpenRulesPopup}
        initialValue={RulesSelectionData}
      />
      <FaqsFormPopup
        eventID={EventID}
        isUpdate={IsUpdateFaqs}
        open={OpenFaqsPopup}
        setOpen={setOpenFaqsPopup}
        initialValue={FaqsSelectionData}
      />
      <AssessmentFormPopup
        eventID={EventID}
        isUpdate={IsUpdateAssessment}
        open={OpenAssessmentPopup}
        setOpen={setOpenAssessmentPopup}
        initialValue={AssessmentSelectionData}
      />

      {/* Form Delete ============================== */}
      <DeleteEventSectionItem
        eventID={EventID}
        open={OpenDelete}
        setOpen={setOpenDelete}
        id={IdForDelete}
        section={Section}
      />
    </AuthenticatedLayout>
  )
}
