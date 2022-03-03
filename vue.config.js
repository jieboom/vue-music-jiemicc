/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const registerRouter = require('./backend/router')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/less/variable.less'), path.resolve(__dirname, 'src/assets/less/mixin.less')]
    }
  },
  devServer: {
    before (app) {
      registerRouter(app)
    }
  }
}
