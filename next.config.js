/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains: [
      "localhost",
      "assets.stayuncle.com",
      "stayuncle.s3.ap-south-1.amazonaws.com",
      "via.placeholder.com",
    ],
  },
  env: {
    // API_END_POINT: "https://hair-app.onrender.com/api/v1",
    // API_END_POINT: "https://crowningglorylm.com/api/v1",
    // API_END_POINT: "http://54.177.51.232:3000/api/v1",
    API_END_POINT: "http://localhost:3000/api/v1",
    API_TOKEN: "",
  },
};
//updated by me bijan

module.exports = nextConfig;
