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
};

export default nextConfig;
