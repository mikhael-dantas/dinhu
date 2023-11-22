const withTwin = require('./withTwin.js')

/**
 * @type {import('next').NextConfig}
*/
module.exports = withTwin({
  // swcMinify: true,
  reactStrictMode: true,
})

// // const nodeExternals = require('webpack-node-externals');
// /** @type {import('next').NextConfig} */
// export default {
//   eslint: {
//     dirs: ['.'],
//   },
//   poweredByHeader: false,
//   reactStrictMode: true,
//   webpack: (config) => {
//     // config.externals is needed to resolve the following errors:
//     // Module not found: Can't resolve 'bufferutil'
//     // Module not found: Can't resolve 'utf-8-validate'
//     config.externals.push({
//       bufferutil: 'bufferutil',
//       'utf-8-validate': 'utf-8-validate',
//     });

//     return config;
//   },
// }