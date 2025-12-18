import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/**',
        protocol: 'https',
      },
      {
        hostname: 'pokeapi.co',
        pathname: '/**',
        protocol: 'https',
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        destination: 'https://pokeapi.co/api/:path*',
        source: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
