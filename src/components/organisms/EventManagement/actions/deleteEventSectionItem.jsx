import React from 'react'
import { Modal, Typography, notification } from 'antd'
import { CustomButton } from '@/components/_shared'
import { useDispatch } from 'react-redux'
import { Event } from '@/store/service'

export default function DeleteEventSectionItem({
  open = false,
  setOpen = () => {},
  eventID,
  id,
  section
}) {
  const dispatch = useDispatch()
  const [notifApi, contextHolder] = notification.useNotification()

  function deleteEventSectionItem() {
    if (section === 'Event Mentor') {
      dispatch(Event.DeleteEventMentor(id))
        .unwrap()
        .then((ress) => {
          notifApi.success({ message: ress.data.message })
          setTimeout(() => {}, 2000)
          dispatch(Event.GetEventDetail(eventID))
            .unwrap()
            .then((ress) => {
              notifApi.success({ message: ress.data.message })
              setTimeout(() => {}, 2000)
            })
            .catch((err) => {
              err.error.map((item) => {
                notifApi.error({ message: item })
              })
              setTimeout(() => {}, 2000)
            })
        })
        .catch((err) => {
          err.error.map((item) => {
            notifApi.error({ message: item })
          })
          setTimeout(() => {}, 2000)
        })
    } else if (section === 'Event Judge') {
      dispatch(Event.DeleteEventJudge(id))
        .unwrap()
        .then((ress) => {
          notifApi.success({ message: ress.data.message })
          setTimeout(() => {}, 2000)
          dispatch(Event.GetEventDetail(eventID))
            .unwrap()
            .then((ress) => {
              notifApi.success({ message: ress.data.message })
              setTimeout(() => {}, 2000)
            })
            .catch((err) => {
              err.error.map((item) => {
                notifApi.error({ message: item })
              })
              setTimeout(() => {}, 2000)
            })
        })
        .catch((err) => {
          err.error.map((item) => {
            notifApi.error({ message: item })
          })
          setTimeout(() => {}, 2000)
        })
    } else if (section === 'Event Timeline') {
      dispatch(Event.DeleteEventTimeline(id))
        .unwrap()
        .then((ress) => {
          notifApi.success({ message: ress.data.message })
          setTimeout(() => {}, 2000)
          dispatch(Event.GetEventDetail(eventID))
            .unwrap()
            .then((ress) => {
              notifApi.success({ message: ress.data.message })
              setTimeout(() => {}, 2000)
            })
            .catch((err) => {
              err.error.map((item) => {
                notifApi.error({ message: item })
              })
              setTimeout(() => {}, 2000)
            })
        })
        .catch((err) => {
          err.error.map((item) => {
            notifApi.error({ message: item })
          })
          setTimeout(() => {}, 2000)
        })
    } else if (section === 'Event Company') {
      dispatch(Event.DeleteEventCompany(id))
        .unwrap()
        .then((ress) => {
          notifApi.success({ message: ress.data.message })
          setTimeout(() => {}, 2000)
          dispatch(Event.GetEventDetail(eventID))
            .unwrap()
            .then((ress) => {
              notifApi.success({ message: ress.data.message })
              setTimeout(() => {}, 2000)
            })
            .catch((err) => {
              err.error.map((item) => {
                notifApi.error({ message: item })
              })
              setTimeout(() => {}, 2000)
            })
        })
        .catch((err) => {
          err.error.map((item) => {
            notifApi.error({ message: item })
          })
          setTimeout(() => {}, 2000)
        })
    } else if (section === 'Event Rules') {
      dispatch(Event.DeleteEventRules(id))
        .unwrap()
        .then((ress) => {
          notifApi.success({ message: ress.data.message })
          setTimeout(() => {}, 2000)
          dispatch(Event.GetEventDetail(eventID))
            .unwrap()
            .then((ress) => {
              notifApi.success({ message: ress.data.message })
              setTimeout(() => {}, 2000)
            })
            .catch((err) => {
              err.error.map((item) => {
                notifApi.error({ message: item })
              })
              setTimeout(() => {}, 2000)
            })
        })
        .catch((err) => {
          err.error.map((item) => {
            notifApi.error({ message: item })
          })
          setTimeout(() => {}, 2000)
        })
    } else if (section === 'Event Faqs') {
      dispatch(Event.DeleteEventFaqs(id))
        .unwrap()
        .then((ress) => {
          notifApi.success({ message: ress.data.message })
          setTimeout(() => {}, 2000)
          dispatch(Event.GetEventDetail(eventID))
            .unwrap()
            .then((ress) => {
              notifApi.success({ message: ress.data.message })
              setTimeout(() => {}, 2000)
            })
            .catch((err) => {
              err.error.map((item) => {
                notifApi.error({ message: item })
              })
              setTimeout(() => {}, 2000)
            })
        })
        .catch((err) => {
          err.error.map((item) => {
            notifApi.error({ message: item })
          })
          setTimeout(() => {}, 2000)
        })
    } else if (section === 'Event Assessment') {
      dispatch(Event.DeleteEventAssessment(id))
        .unwrap()
        .then((ress) => {
          notifApi.success({ message: ress.data.message })
          setTimeout(() => {}, 2000)
          dispatch(Event.GetEventAssessment(eventID))
            .unwrap()
            .then((ress) => {
              notifApi.success({ message: ress.data.message })
              setTimeout(() => {}, 2000)
            })
            .catch((err) => {
              err.error.map((item) => {
                notifApi.error({ message: item })
              })
              setTimeout(() => {}, 2000)
            })
        })
        .catch((err) => {
          err.error.map((item) => {
            notifApi.error({ message: item })
          })
          setTimeout(() => {}, 2000)
        })
    }
    setOpen(false)
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        closeIcon={null}
        width='386px'
        footer={
          <>
            <div className='flex gap-[25px] justify-center'>
              <CustomButton
                type='primary-ghost'
                className='w-[126px]'
                children={'Cancel'}
                onClick={() => setOpen(false)}
              />
              <CustomButton
                className='w-[126px]'
                children={'Delete'}
                onClick={deleteEventSectionItem}
              />
            </div>
          </>
        }
      >
        <>
          <div className='flex items-center flex-col gap-[19px]'>
            <Typography.Text className='text-2xl font-bold'>
              Delete Confirmation
            </Typography.Text>
            <Typography.Text className='mb-[16px] w-[350px] text-center'>
              You are about to delete this {section}. This action cannot be
              undone.
            </Typography.Text>
          </div>
        </>
      </Modal>
    </>
  )
}
