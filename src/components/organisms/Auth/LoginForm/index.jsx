import { useRouter } from 'next/router'
import { setToken } from '@/libs/token'
import { Form, message, Input, Button, Typography } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Auth } from '@/store/service'
import { Storage } from '@/helper'

export default function LoginForm() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)
  const [messageApi, contextHolder] = message.useMessage()

  const handleSubmit = async (values) => {
    messageApi.open({
      type: 'loading',
      content: 'Loading...'
    })
    dispatch(Auth.login(values))
      .unwrap()
      .then((res) => {
        messageApi.destroy()
        messageApi.success(res.data.message)
        setToken(res.data.data.token)
        Storage.setStorage('user', res.data.data.user)
        router.push(
          res.data.data.user.role_name === 'Superadmin' ||
            res.data.data.user.role_name === 'Admin'
            ? '/admin-management'
            : res.data.data.user.role_name === 'Judge'
            ? '/project-management'
            : '/schedule-management'
        )
      })
      .catch(() => {
        messageApi.destroy()
        messageApi.error(
          'Login failed: please make sure your credentials is valid and try again...',
          2.5
        )
      })
  }

  return (
    <>
      {contextHolder}
      <Form
        name='login-form'
        className='login-form'
        layout='vertical'
        initialValues={{
          remember: true
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            }
          ]}
        >
          <Input
            size='large'
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Enter your email here'
          />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
          style={{ marginBottom: 0 }}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Enter your password here'
          />
        </Form.Item>
        <div className='text-right mb-6'>
          <Typography.Text
            className='cursor-pointer'
            onClick={() => router.push('/auth/forgot-password')}
          >
            Forgot Password?
          </Typography.Text>
        </div>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button bg-primary-red'
            style={{ width: '100%' }}
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
