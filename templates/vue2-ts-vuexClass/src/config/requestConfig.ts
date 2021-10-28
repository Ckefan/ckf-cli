
let href = window.location.host.split('.')
let mlj = href.filter(e => e.indexOf('mlj') > -1)[0]
mlj = mlj ? mlj : 'mlj162'
// const common = `https://deleven.dev.mlj130.com` // dev接口公共部分
// const msCommon = `https://limited-time-offers-backend-dev.io.${mlj}.com` // dev秒杀接口
const common = `https://secret-list.io.${mlj}.com` // 接口公共部分
const msCommon = `https://limited-time-offers-backend.io.${mlj}.com` // 秒杀接口

export default {
  secIndex: `${msCommon}/index`,  // 秒杀接口
}
