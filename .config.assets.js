const { dependencies } = require('./package')

function getNpmVersion (name, modules = dependencies) {
  // 目前仅考虑^1.2.3 | ~1.2.3
  return modules[name].replace(/[^~x]/, '')
}

let hostname = ''
switch (process.env.NODE_ENV) {
  case 'production':
    hostname = 'qiniu'
    break
  case 'test':
    hostname = 'testqiniu'
    break
  case 'uat':
    hostname = 'uatqiniu'
    break
  default:
    hostname = 'testqiniu'
    break
}

const privateAssets = {
  css: [
    // `https://${hostname}.shuhaisc.com/shsc-ui/${getNpmVersion('shsc-ui')}/index.css`,
    // `https://${hostname}.shuhaisc.com/shsc-business-ui/${getNpmVersion('shsc-business-ui')}/index.css`
  ],
  js: [
    // `https://${hostname}.shuhaisc.com/shsc-ui/${getNpmVersion('shsc-ui')}/index.umd.min.js`,
    // `https://${hostname}.shuhaisc.com/shsc-business-ui/${getNpmVersion('shsc-business-ui')}/index.umd.min.js`
  ]
}
module.exports = privateAssets