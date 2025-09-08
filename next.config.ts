import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      'picsum.photos',
      'gdimg.gmarket.co.kr',
      'i.namu.wiki',
    ],
  },
};

export default nextConfig;
