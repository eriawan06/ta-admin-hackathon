import LoginForm from "@/components/organisms/Auth/LoginForm";
import AuthLayout from "@/layouts/AuthLayout";

LoginPage.getLayout = (page) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default function LoginPage() {
  return (
    <>
      <LoginForm/>
    </>
  )
}