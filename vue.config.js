const path = require('path')

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/morney-1-website/' : '/',
  lintOnSave: false,
  chainWebpack: (config) => {
    const dir = path.resolve(__dirname, 'src/assets/icons')
    //确定dir的目录，__dirname表示当前目录下的
    config.module
      .rule('svg-sprite') //规则的名字
      .test(/.svg$/)
      .include.add(dir) //只有这个dir的目录使用这个规则
      .end()
      .use('svg-sprite-loader') //使用那些loader
      .loader('svg-sprite-loader') //说你的loader是哪个
      .options({ extract: false }) //添加一个选项，不要写出文件我不需要
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .end() //删除这个fill属性
    config
      .plugin('svg-sprite') //配置插件
      .use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }])
    config.module.rule('svg').exclude.add(dir) //其他svg loader 排除 icons目录
  },
}
