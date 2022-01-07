/** @type {import('next').NextConfig} */
const path = require('path');
module.exports = {
  reactStrictMode: true,
  amp: {
    skipValidation: true
  },
 webpack(config) {
    //关闭css.module
  config.module.rules[2].oneOf.forEach((one) => {
    if (!`${one.issuer?.and}`.includes('_app')) return;
    one.issuer.and = [path.resolve(__dirname)];
  });
  return config;
},
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
