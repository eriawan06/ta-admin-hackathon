/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'sagara-hackathon.s3.ap-southeast-3.amazonaws.com',
        pathname: '/*/**'
      }
    ]
  }
}

module.exports = nextConfig
