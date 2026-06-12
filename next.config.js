/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Comment out or remove this line for development
  // output: "export",

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;