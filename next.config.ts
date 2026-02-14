import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  images: {
    remotePatterns: [
    {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '**'
    },
    {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**'
    }
    ],
    qualities: [40, 20, 75, 100],
  },
    turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};
export default withPlaiceholder(nextConfig);
