import { useEffect, useState } from 'react'
import { Storage } from '.'

const role = () => {
  let user

  const [isAdmin, setIsAdmin] = useState(false)
  const [isJudge, setisJudge] = useState(false)
  const [isMentor, setisMentor] = useState(false)

  useEffect(() => {
    user = Storage.getStorage('user')
    setIsAdmin(user?.role_name === 'Superadmin')
    setisJudge(user?.role_name === 'Judge')
    setisMentor(user?.role_name === 'Mentor')
  }, [])

  return { isAdmin, isJudge, isMentor }
}

export default { role }
