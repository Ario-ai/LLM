/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
      return [
        // {
        //   source: "/api/chat/:input",
        //   destination: "http://3.90.123.35:8008/get_llm_chat?query=:input",
        // },
        // {
        //     source: "/api/context/:chat",
        //     destination: "http://3.90.123.35:8008/get_vector_matching?query=:input&k=5",
        //   },
        //   {
        //     source: "/api/ask/:input",
        //     destination: "http://3.90.123.35:8008/get_llm_context?query=:input",
        //   },
      ];
    },
  };
  module.exports = nextConfig;