import { useRedirectAfterLoad } from '@/hooks/utils'
import { getToken } from '@/libs/token'
import { Card, Col, Row, Skeleton, Image, Space } from 'antd'

export default function AuthLayout({ children, noImage = false }) {
  const { isLoading, isRedirecting } = useRedirectAfterLoad(
    '/dashboard',
    (router) => {
      // do not auto redirect to dashboard for
      // - logout
      if (router.pathname === '/auth/logout') return false
      return !!getToken()
    }
  )

  return !isLoading && !isRedirecting ? (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{
        minHeight: '100vh',
        backgroundColor: '#05070F'
      }}>
      <Col>
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          {!noImage && (
            <Image
              src='/images/logo/sagara-logo-red.png'
              alt='Sagara Logo'
              width={350}
              height={50}
              preview={false}
            />
          )}
          <Card style={{ width: 350 }}>
            {children}
          </Card>
        </Space>
      </Col>
    </Row>
  ) : (
    <>
      <Skeleton />
    </>
  )
}
