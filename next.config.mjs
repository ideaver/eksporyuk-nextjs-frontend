/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirect() {
    return [
      {
        source: "/.well-known/:file",
        destination: "/api/.well-known/:file",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

// FIREBASE DEPLOY
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     loader: "imgix",
//     path: "https://noop/",
//   },
//   reactStrictMode: false,
//   trailingSlash: true,
//   output: "export",
// };

// export default nextConfig;
