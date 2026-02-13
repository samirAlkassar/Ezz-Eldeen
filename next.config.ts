import withPlaiceholder from "@plaiceholder/next";

/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  images: {
    domains: ["i.pinimg.com", "res.cloudinary.com"],
  },
};
export default withPlaiceholder(nextConfig);
