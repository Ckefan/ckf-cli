const path = require('path')
const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');
const autoprefixer = require('autoprefixer');
const pxtoviewport = require('postcss-px-to-viewport');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const shell = require('shelljs')
const fs = require('fs')

const TimeStamp = new Date().getTime();

const resolve = dir => {
  return path.join(__dirname, dir)
}

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
// 线上打包路径，请根据项目实际线上情况
const BASE_URL = IS_PRODUCTION ? './' : '/'

module.exports = {
  publicPath: BASE_URL,
  outputDir: 'dist', // 打包生成的生产环境构建文件的目录
  assetsDir: '', // 放置生成的静态资源路径，默认在outputDir
  indexPath: 'index.html', // 指定生成的 index.html 输入路径，默认outputDir
  pages: undefined, // 构建多页
  productionSourceMap: false, // 开启 生产环境的 source map?
  chainWebpack: config => {
    // 配置路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
    if (IS_PRODUCTION) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin)
        .init(Plugin => new Plugin());
    }
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        });
        return options;
      });
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'stage') {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.done.tap('done', compilation => {
            // windows系统执行不了zip命令，需要手动压缩
            // const target = path.join(__dirname, 'dist.zip')
            // if (fs.existsSync(target)) {
            //   fs.unlinkSync(target)
            // }
            // try {
            //   shell.exec(`zip -r -q dist.zip ./dist`)
            // } catch (e) {
            //   console.log(e)
            // }
          })
        },
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
          filename: `js/[name].${TimeStamp}.js`,
          chunkFilename: `js/[name].${TimeStamp}.js`
        },
      })
    }
  },
  css: {
    modules: false, // 启用 CSS modules
    extract: false, // 是否使用css分离插件
    sourceMap: true, // 开启 CSS source maps?
    loaderOptions: { // css预设器配置项
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 750,
            unitPrecision: 3,
            minPixelValue: 1,
            exclude: [
              /.*\/node_modules\/@vant|vant\/.*/
            ],
            selectorBlackList: ['.ignore', '.hairlines'],
          })
        ]
      }
    }
  },
  devServer: {
    hot: true,
    port: 8080, // 端口
    proxy: {
      '/sec': {
        target: 'https://limited-time-offers-backend-dev.io.mlj130.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/sec': 'sec'
        }
      },
    }
  }
}