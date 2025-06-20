import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.ts',
      },
    },
  },
  async rewrites() {
    const beforeFiles = [
      { source: '/api/vote/:path*', destination: `${process.env.BACKEND_URL}/vote/:path*` },
      { source: '/api/:path*', destination: `${process.env.BACKEND_URL}/api/:path*` },
    ];
    return {
      beforeFiles,
    };
  },
};

export default nextConfig;
