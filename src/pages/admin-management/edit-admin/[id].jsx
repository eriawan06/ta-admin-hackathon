import React, { useEffect } from 'react'
import EditAdmin from '@/components/organisms/AdminManagement/edit-admin'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Admin } from '@/store/service'

export default function EditAdminPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { detailAdmin } = useSelector((state) => state.admin)

  useEffect(() => {
    if (router.isReady) {
      dispatch(Admin.GetDetailAdmin(router.query.id))
    }
  }, [router])

  return <EditAdmin data={detailAdmin.data} />
}
