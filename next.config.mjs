// Substitua o conteúdo do arquivo next.config.mjs por este:

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  // Adicionar otimizações
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
  },
  env: {
    PORT: process.env.PORT || "3000"
  }
}

export default nextConfig