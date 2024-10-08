// /** @type {import('next').NextConfig} */
// const nextConfig = {};



/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
        'aws-sdk': false,
        'mock-aws-s3': false,
        'nodemailer': false,
        'tls': false,
        'net': false,
        'nock': false,
        'readline': false,
        'node:buffer': false,
        'node:crypto': false,
      };
        // Configura el loader para archivos HTML
        config.module.rules.push({
            test: /\.html$/,
            use: 'html-loader',
        });
      return config;
    },
  };
  
export default nextConfig;
  