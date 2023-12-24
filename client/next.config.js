/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "imranbappy.me", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**/image/upload/**/**/**", //p (https://res.cloudinary.com/do5erbtee/image/upload/v1690483744/hhees6ficibm596ilayj.png) on
      },
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
