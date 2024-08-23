// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;


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
  