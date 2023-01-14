/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**.utah.gov',
        port: '',
        pathname: '/1_devices/**'
      },
      {
        protocol: 'http',
        hostname: '**.utah.gov',
        port: '',
        pathname: '/AnimatedGifs/**'
      },
    ]
  },
  trailingSlash: true,
  
}

module.exports = nextConfig
