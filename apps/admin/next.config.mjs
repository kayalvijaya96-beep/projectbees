/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@projectbee/ui', '@projectbee/shared-types', '@projectbee/supabase-config'],
  reactStrictMode: true,
};

export default nextConfig;
