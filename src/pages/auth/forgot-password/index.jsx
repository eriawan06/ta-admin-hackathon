import React from 'react'
import AuthLayout from '@/layouts/AuthLayout'
import ForgotPassword from '@/components/organisms/Auth/ForgotPassword'

ForgotPasswordPage.getLayout = (page) => <AuthLayout noImage>{page}</AuthLayout>

export default function ForgotPasswordPage() {
  return <ForgotPassword />
}
