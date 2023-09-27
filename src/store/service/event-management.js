import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  serviceGet,
  servicePost,
  serviceDeleteWithSlug,
  servicePutWithSlug
} from '@/services/_config'

const GetEventList = createAsyncThunk(
  'get/eventList',
  async (payload, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}events/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)
const GetEventDetail = createAsyncThunk(
  'get/eventDetail',
  async (id, { rejectWithValue }) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}events/${id}`)().catch(
      (err) => rejectWithValue(err.response.data)
    )
  }
)
const GetEventAssessment = createAsyncThunk(
  'get/eventAssessment',
  async (id, { rejectWithValue }) => {
    return serviceGet(
      `${process.env.NEXT_PUBLIC_API_URL}events/assessments/?order=id,asc&limit=10&page=1&event=${id}`
    )().catch((err) => rejectWithValue(err.response.data))
  }
)
const CreateEvent = createAsyncThunk(
  'post/createEvent',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}events/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)
const EditEvent = createAsyncThunk(
  'put/editEvent',
  async (payload, { rejectWithValue }) => {
    const { id, body } = payload
    return servicePutWithSlug(`${process.env.NEXT_PUBLIC_API_URL}events`)(
      id,
      body
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

const DeleteEvent = createAsyncThunk(
  'delete/deleteEvent',
  async (id, { rejectWithValue }) => {
    return serviceDeleteWithSlug(`${process.env.NEXT_PUBLIC_API_URL}events`)(
      id
    ).catch((err) => rejectWithValue(err.response.data))
  }
)

// Event Mentor Section :)
const GetEventMentor = createAsyncThunk(
  'get/eventMentor',
  async( payload, {rejectWithValue}) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}events/mentors/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
) 
const CreateEventMentor = createAsyncThunk(
  'post/createEventMentor',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}events/mentors/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)
const DeleteEventMentor = createAsyncThunk(
  'delete/deleteEventMentor',
  async (id, { rejectWithValue }) => {
    return serviceDeleteWithSlug(
      `${process.env.NEXT_PUBLIC_API_URL}events/mentors`
    )(id).catch((err) => rejectWithValue(err.response.data))
  }
)

// Event Judge Section :
const GetEventJudges = createAsyncThunk(
  'get/eventJudges',
  async( payload, {rejectWithValue}) => {
    return serviceGet(`${process.env.NEXT_PUBLIC_API_URL}events/judges/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
) 
const CreateEventJudge = createAsyncThunk(
  'post/createEventJudge',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}events/judges/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)
const DeleteEventJudge = createAsyncThunk(
  'delete/deleteEventJudge',
  async (id, { rejectWithValue }) => {
    return serviceDeleteWithSlug(
      `${process.env.NEXT_PUBLIC_API_URL}events/judges`
    )(id).catch((err) => rejectWithValue(err.response.data))
  }
)

// Event Timeline Section :
const CreateEventTimeline = createAsyncThunk(
  'post/createEventTimeline',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}events/timelines/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)
const EditEventTimeline = createAsyncThunk(
  'put/editEventTimeline',
  async (payload, { rejectWithValue }) => {
    const { id, body } = payload
    return servicePutWithSlug(
      `${process.env.NEXT_PUBLIC_API_URL}events/timelines`
    )(id, body).catch((err) => rejectWithValue(err.response.data))
  }
)
const DeleteEventTimeline = createAsyncThunk(
  'delete/deleteEventTimeline',
  async (id, { rejectWithValue }) => {
    return serviceDeleteWithSlug(
      `${process.env.NEXT_PUBLIC_API_URL}events/timelines`
    )(id).catch((err) => rejectWithValue(err.response.data))
  }
)

// Event Company Section :
const CreateEventCompany = createAsyncThunk(
  'post/createEventCompany',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}events/companies/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)
const EditEventCompany = createAsyncThunk(
  'put/editEventCompany',
  async (payload, { rejectWithValue }) => {
    const { id, body } = payload
    return servicePutWithSlug(
      `${process.env.NEXT_PUBLIC_API_URL}events/companies`
    )(id, body).catch((err) => rejectWithValue(err.response.data))
  }
)
const DeleteEventCompany = createAsyncThunk(
  'delete/deleteEventCompany',
  async (id, { rejectWithValue }) => {
    return serviceDeleteWithSlug(
      `${process.env.NEXT_PUBLIC_API_URL}events/companies`
    )(id).catch((err) => rejectWithValue(err.response.data))
  }
)

// Event Rules Section :
const CreateEventRules = createAsyncThunk(
  'post/createEventRules',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}events/rules/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)
const EditEventRules = createAsyncThunk(
  'put/editEventRules',
  async (payload, { rejectWithValue }) => {
    const { id, body } = payload
    return servicePutWithSlug(`${process.env.NEXT_PUBLIC_API_URL}events/rules`)(
      id,
      body
    ).catch((err) => rejectWithValue(err.response.data))
  }
)
const DeleteEventRules = createAsyncThunk(
  'delete/deleteEventRules',
  async (id, { rejectWithValue }) => {
    return serviceDeleteWithSlug(
      `${process.env.NEXT_PUBLIC_API_URL}events/rules`
    )(id).catch((err) => rejectWithValue(err.response.data))
  }
)

// Event Faqs Section :
const CreateEventFaqs = createAsyncThunk(
  'post/createEventFaqs',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}events/faqs/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)
const EditEventFaqs = createAsyncThunk(
  'put/editEventFaqs',
  async (payload, { rejectWithValue }) => {
    const { id, body } = payload
    return servicePutWithSlug(`${process.env.NEXT_PUBLIC_API_URL}events/faqs`)(
      id,
      body
    ).catch((err) => rejectWithValue(err.response.data))
  }
)
const DeleteEventFaqs = createAsyncThunk(
  'delete/deleteEventFaqs',
  async (id, { rejectWithValue }) => {
    return serviceDeleteWithSlug(
      `${process.env.NEXT_PUBLIC_API_URL}events/faqs`
    )(id).catch((err) => rejectWithValue(err.response.data))
  }
)

// Event Assessment Section :
const CreateEventAssessment = createAsyncThunk(
  'post/createEventAssessment',
  async (payload, { rejectWithValue }) => {
    return servicePost(`${process.env.NEXT_PUBLIC_API_URL}events/assessments/`)(
      payload
    ).catch((err) => rejectWithValue(err.response.data))
  }
)
const EditEventAssessment = createAsyncThunk(
  'put/editEventAssessment',
  async (payload, { rejectWithValue }) => {
    const { id, body } = payload
    return servicePutWithSlug(
      `${process.env.NEXT_PUBLIC_API_URL}events/assessments`
    )(id, body).catch((err) => rejectWithValue(err.response.data))
  }
)
const DeleteEventAssessment = createAsyncThunk(
  'delete/deleteEventAssessment',
  async (id, { rejectWithValue }) => {
    return serviceDeleteWithSlug(
      `${process.env.NEXT_PUBLIC_API_URL}events/assessments`
    )(id).catch((err) => rejectWithValue(err.response.data))
  }
)

export default {
  GetEventList,
  GetEventDetail,
  GetEventAssessment,
  CreateEvent,
  EditEvent,
  DeleteEvent,
  // Mentor Card Section :
  GetEventMentor,
  CreateEventMentor,
  DeleteEventMentor,
  // Judge Card Section
  GetEventJudges,
  CreateEventJudge,
  DeleteEventJudge,
  // Timeline Card Section
  CreateEventTimeline,
  EditEventTimeline,
  DeleteEventTimeline,
  // Company Card Section
  CreateEventCompany,
  EditEventCompany,
  DeleteEventCompany,
  // Rules Card Section
  CreateEventRules,
  EditEventRules,
  DeleteEventRules,
  // Faqs Card Section
  CreateEventFaqs,
  EditEventFaqs,
  DeleteEventFaqs,
  // Assessment Card Section
  CreateEventAssessment,
  EditEventAssessment,
  DeleteEventAssessment
}
