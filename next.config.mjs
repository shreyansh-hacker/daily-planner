/** @type {import('next').NextConfig} */
const repoName = 'daily-planner'; // Replace with your actual GitHub repo name if it's different

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true, // Ensures static export works well on GitHub Pages
};

export default nextConfig;