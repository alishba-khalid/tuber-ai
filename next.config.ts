import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/versus/invideo',
        destination: '/blog/genbyghost-vs-invideo-ai',
        permanent: true,
      },
      {
        source: '/versus/pictory',
        destination: '/blog/genbyghost-vs-pictory',
        permanent: true,
      },
      {
        source: '/versus/fliki',
        destination: '/blog/genbyghost-vs-fliki',
        permanent: true,
      },
      {
        source: '/versus/autoshorts',
        destination: '/blog/genbyghost-vs-autoshorts-ai',
        permanent: true,
      },
      {
        source: '/versus/veed',
        destination: '/blog/genbyghost-vs-veed',
        permanent: true,
      },
      {
        source: '/versus/capcut',
        destination: '/blog/genbyghost-vs-capcut',
        permanent: true,
      },
      {
        source: '/versus/descript',
        destination: '/blog/genbyghost-vs-descript',
        permanent: true,
      },
      {
        source: '/versus/heygen',
        destination: '/blog/genbyghost-vs-heygen',
        permanent: true,
      },
      {
        source: '/versus/synthesia',
        destination: '/blog/genbyghost-vs-synthesia',
        permanent: true,
      },
      {
        source: '/versus/runway',
        destination: '/blog/genbyghost-vs-runway',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
