/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/invitations',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/invitations`,
      },
    ]
  },
}

module.exports = nextConfig
