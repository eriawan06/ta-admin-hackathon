import { Menu } from '@/const'
import { Storage } from '@/helper'
import { useEffect, useState } from 'react'
import {
  FaUserCog,
  FaUserAlt,
  FaUserSecret,
  FaUserTie,
  FaMagic,
  FaUsers,
  FaFileInvoiceDollar,
  FaClock,
  FaFolderOpen
} from 'react-icons/fa'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  }
}

const ListMenu = () => {
  const [user, setUser] = useState({})
  // const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setUser(Storage.getStorage('user'))
  }, [])

  const adminMenu = [
    getItem(
      Menu.Label.ADMIN_MANAGEMENT,
      Menu.KEY.ADMIN_MANAGEMENT,
      <FaUserCog />
    ),
    getItem(
      Menu.Label.PARTICIPANT_MANAGEMENT,
      Menu.KEY.PARTICIPANT_MANAGEMENT,
      <FaUserAlt />
    ),
    getItem(
      Menu.Label.MENTOR_MANAGEMENT,
      Menu.KEY.MENTOR_MANAGEMENT,
      <FaUserSecret />
    ),
    getItem(
      Menu.Label.JUDGES_MANAGEMENT,
      Menu.KEY.JUDGES_MANAGEMENT,
      <FaUserTie />
    ),
    getItem(
      Menu.Label.EVENT_MANAGEMENT,
      Menu.KEY.EVENT_MANAGEMENT,
      <FaMagic />
    ),
    getItem(Menu.Label.TEAM_MANAGEMENT, Menu.KEY.TEAM_MANAGEMENT, <FaUsers />),
    getItem(
      Menu.Label.PAYMENT_MANAGEMENT,
      Menu.KEY.PAYMENT_MANAGEMENT,
      <FaFileInvoiceDollar />
    ),
    getItem(
      Menu.Label.SCHEDULE_MANAGEMENT,
      Menu.KEY.SCHEDULE_MANAGEMENT,
      <FaClock />
    ),
    getItem(
      Menu.Label.PROJECT_MANAGEMENT,
      Menu.KEY.PROJECT_MANAGEMENT,
      <FaFolderOpen />
    )
  ]

  const judgeMenu = [
    getItem(
      Menu.Label.PROJECT_MANAGEMENT,
      Menu.KEY.PROJECT_MANAGEMENT,
      <FaFolderOpen />
    )
  ]

  const mentorMenu = [
    getItem(
      Menu.Label.SCHEDULE_MANAGEMENT,
      Menu.KEY.SCHEDULE_MANAGEMENT,
      <FaClock />
    )
  ]

  const showMenu = () => {
    const role = user?.role_name
    let menu = []
    switch (role) {
      case 'Admin':
        menu = adminMenu
        break

      case 'Superadmin':
        menu = adminMenu
        break

      case 'Judge':
        menu = judgeMenu
        break

      case 'Mentor':
        menu = mentorMenu
        break

      default:
        break
    }

    return menu
  }
  // useEffect(() => {
  //   setIsReady(true)
  // })

  // if (!isReady) {
  //   return null
  // }

  return showMenu()
}

export default ListMenu
