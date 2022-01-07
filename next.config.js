/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  amp: {
    skipValidation: true
  }
}
// const withCss = require('@zeit/next-css')
//
// if(typeof require !== 'undefined'){
//   require.extensions['.css']=file=>{}
// }
//
// module.exports = withCss({
//   reactStrictMode: true,
//   amp: {
//     skipValidation: true
//   }
// })
