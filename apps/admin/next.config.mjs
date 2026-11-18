/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/admin',
  transpilePackages: ['@projectbee/ui', '@projectbee/shared-types', '@projectbee/supabase-config'],
  reactStrictMode: true,
};

export default nextConfig;


