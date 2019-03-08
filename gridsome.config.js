require('dotenv').config({ path: '.env' })

module.exports = {
  siteName: "Harcast",
  siteDescription: "Harvest + Forecast",
  plugins: [],
  chainWebpack: config => {
    config
      .plugin('env')
      .use(require.resolve('webpack/lib/EnvironmentPlugin'), ['HARVEST_TOKEN', 'HARVEST_ACCOUNT_ID'])
  },
}
