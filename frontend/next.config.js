/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  env: {
    ALLOWED_EMAILS: process.env.ALLOWED_EMAILS,
  },
}
