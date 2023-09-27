import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import adminReducer from './admin-management'
import eventReducer from './event-management'
import teamReducer from './team-management'
import paymentReducer from './payment-management'
import scheduleReducer from './schedule-management'
import projectReducer from './project-management'
import judgesReducer from './judges-management'
import uploadReducer from './upload'
import mentorReducer from './mentor-management'
import participantReducer from './participant-management'
import globalReducer from './global'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    event: eventReducer,
    team: teamReducer,
    payment: paymentReducer,
    schedule: scheduleReducer,
    project: projectReducer,
    judges: judgesReducer,
    upload: uploadReducer,
    mentor: mentorReducer,
    participant: participantReducer,
    global: globalReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
