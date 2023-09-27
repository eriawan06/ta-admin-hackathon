import { App, ConfigProvider, theme } from 'antd'
import { Provider } from 'react-redux'
import '@/styles/global.css'
import { store } from '@/store/redux'

export default function NextApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: 'rgb(229,62,62)',
            colorPrimaryHover: 'rgb(229,62,62, 0.8)'
          }
        }
      }}
    >
      <Provider store={store}>
        <App>{getLayout(<Component {...pageProps} />)}</App>
      </Provider>
    </ConfigProvider>
  )
}
