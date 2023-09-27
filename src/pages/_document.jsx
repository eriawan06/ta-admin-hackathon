import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel='preconnect'
          href='https://fonts.googleapis.com'
        />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='crossOrigin'
        />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&amp;family=Roboto:wght@300;400;700&amp;display=swap'
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
