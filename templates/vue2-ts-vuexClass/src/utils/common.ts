/*
 * @Description: 公共函数
 * 
 */

import Cookies from 'js-cookie'
import { cookieExpires } from '@/config' // cookie保存的天数
import { isNil } from 'lodash'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
require('dayjs/locale/zh-cn')

/**
 * ============ Cookie ============
 */

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name)
}

export const setCookie = (name: string, value: any, params = {}): void => {
  if (isEmpty(value)) { return }
  Cookies.set(name, value, params)
}

export const removeCookie = (name: string, params = {}): void => {
  Cookies.remove(name, params)
}

/**
 * ============ localStorage ============
 */

export const setLocalStorage = (name: string, value: any): void => {
  if (isEmpty(value)) { return }
  window.localStorage.setItem(name, value)
}

export const getLocalStorage = (name: string) => {
  return window.localStorage.getItem(name)
}

export const removeLocalStorage = (name: string) => {
  window.localStorage.removeItem(name)
}

export const clearLocal = () => {
  window.localStorage.clear()
}

/**
 * ============ sessionStorage ============
 */

export const setSessionStorage = (name: string, value: any): void => {
  if (isEmpty(value)) { return }
  window.sessionStorage.setItem(name, value)
}

export const getSessionStorage = (name: string) => {
  window.sessionStorage.getItem(name)
}

export const removeSessionStorage = (name: string) => {
  window.sessionStorage.removeItem(name)
}

/**
 * @msg: 判断值是否为null或者undefined或者''或者'undefined'
 * @param {any} val
 * @return：boolean
 */
export const isEmpty = (val: any) => {
  if (isNil(val) || val === 'undefined' || val === '') {
    return true
  }
  return false
}

/**
 * @msg: 存取token
 * @param {string} token
 * @return: boolean | string
 */
export const TOKEN_KEY: string = 'token'
export const setToken = (token: string) => {
  setCookie(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}
export const getToken = () => {
  const token = getCookie(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return false
  }
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url: string) => {
  if (!url) {
    return {}
  }
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj: any = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj: any, key: string | number) => {
  if (key) {
    return key in obj
  } else {
    const keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @msg: 获取系统当前时间
 * @param {string} fmt 时间格式 具体看代码
 * @return: string
 */
export const getDate = (fmt: any) => {
  let time = ''
  const date = new Date()
  const o: any = {
    "M+": date.getMonth() + 1, // 月份 
    "d+": date.getDate(), // 日 
    "H+": date.getHours(), // 小时 
    "m+": date.getMinutes(), // 分 
    "s+": date.getSeconds(), // 秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度 
    "S": date.getMilliseconds() // 毫秒 
  }
  if (/(y+)/.test(fmt)) {
    time = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      time = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    }
  }
  return time
}

/**
 * @msg: 获取系统当前时间
 * @param {string} date 时间
 * @param {string} fmt 时间格式
 * @return: string
 */
export const formatDate = (date: any, fmt: string) => {
  let time = ''
  const o: any = {
    "M+": date.getMonth() + 1, // 月份 
    "d+": date.getDate(), // 日 
    "H+": date.getHours(), // 小时 
    "m+": date.getMinutes(), // 分 
    "s+": date.getSeconds(), // 秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度 
    "S": date.getMilliseconds() // 毫秒 
  }
  if (/(y+)/.test(fmt)) {
    time = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      time = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    }
  }
  return time
}

/**
 * 去除前后空格,然后校验输入值是否为空
 * @param {string | number} str 
 * @param {string} text 
 * @return: Object
 */

export const verifyStr = (str: string | number, text: string) => {
  const _str = str.toString().trim()
  const toastStr = _str.length ? false : `请填写${text}～`
  return {
    errMsg: toastStr,
    done: !toastStr,
    value: _str
  }
}

// 截取字符串
export const sliceStr = (str: any, sliceLen: number) => {
  if (!str) { return '' }
  let realLength = 0
  const len = str.length
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      realLength += 2
    }
    if (realLength > sliceLen) {
      return `${str.slice(0, i)}...`
    }
  }

  return str
}


/**
 * JSON 克隆
 * @param {Object | Json} jsonObj json对象
 * @return {Object | Json} 新的json对象
 */
export function objClone(jsonObj: any) {
  let buf: any
  if (jsonObj instanceof Array) {
    buf = []
    let i = jsonObj.length
    while (i--) {
      buf[i] = objClone(jsonObj[i])
    }
    return buf
  } else if (jsonObj instanceof Object) {
    buf = {}
    for (let k in jsonObj) {
      buf[k] = objClone(jsonObj[k])
    }
    return buf
  } else {
    return jsonObj
  }
}

/**
 * 重新渲染动画初始化
 * 
 */
export const windowInit = () => {
  let lastTime = 0
  const vendors: string[] | any = ['webkit', 'moz']
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = (window as any)[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = (window as any)[vendors[x] + 'CancelAnimationFrame'] || // name has changed in Webkit
      (window as any)[vendors[x] + 'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
      const currTime = new Date().getTime()
      const timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
      const interval = currTime - lastTime
      const id = window.setTimeout(() => {
        callback(interval)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id) => {
      clearTimeout(id)
    }
  }
}
/**
 * 双十一倒计时天数
 * 
 */
export const to11Num = () => {
  dayjs.locale('zh-cn');
  dayjs.extend(relativeTime);
  return dayjs().to(dayjs('2020-11-11')).split(' ')[0];
}
/**
 * 双十一倒计时天数
 * 
 */
export const today = () => {
  return dayjs().format('YYYY-MM-DD')
}
/**
 * 获取2020-10-19 ~ 2020-11-11
 * 
 */
export const getTo11Days = () => {
  const num = 24;
  let days = [];
  for (let i = 0; i < num; i++) {
    days.push({
      week: formatWeek(dayjs('2020-10-19').add(i, 'day').format('dddd')),
      day: dayjs().add(i, 'day').format('DD')
    })
  }

  return days;
}
/**
 * 中文星期转英文缩写
 * 
 */
export const formatWeek = (week: string) => {
  switch (week) {
    case ('星期一'): return '一';
    case ('星期二'): return '二';
    case ('星期三'): return '三';
    case ('星期四'): return '四';
    case ('星期五'): return '五';
    case ('星期六'): return '六';
    case ('星期日'): return '日';
  }
}
export const sleep = async (delay: number, date?: Date) => {
  return new Promise((resolve) => {
    if (date) {
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      if (diff < 0) {
        resolve()
      } else if (diff < delay) {
        setTimeout(resolve, diff)
      } else {
        setTimeout(resolve, delay)
      }
    } else {
      setTimeout(resolve, delay)
    }
  })
}
export const isIOS = false
// 识别微信，微博，QQ，浏览器环境
export const env = () => {
  const ua = navigator.userAgent;
  if (ua.match(/weibo/)) {
    return 'weibo';
  }
  if (ua.toLowerCase().match(/MicroMessenger/i)) {
    return 'wechat';
  }
  if (ua.toLowerCase().match(/qq/i)) {
    return 'qq';
  }
  return 'brower'
}
/**
 * alimama链接转tbopen链接
 * 
 */
export const toOpenUrl = (url: string) => {
  let clickUrl = url
  let openUrl = url
  if (url.match(/cdn.mlj36/i)) {
    const e = url.split('e=')[1]
    clickUrl = window.atob(e)
    openUrl = `tbopen://m.taobao.com/tbopen/index.html?action=ali.open.nav&module=h5&bootImage=0&h5Url=${clickUrl}`
  } else if (url.match(/s.click/i) || url.match(/uland.taobao.com/i)) {
    openUrl = `tbopen://m.taobao.com/tbopen/index.html?action=ali.open.nav&module=h5&bootImage=0&h5Url=${url}`
  } else {
    clickUrl = url
    openUrl = url
  }
  return env() === 'weibo' ? openUrl : clickUrl
}

export const envOpenUrl = (url: string) => {
  let tbopenUrl = url
  if ( env() === 'qq' || env() === 'wechat') { // QQ 和微信不能识别tbopen
    return url
  } else {
    if (url.match(/tbopen:/i)) {
      return url
    } else {
      tbopenUrl = `tbopen://m.taobao.com/tbopen/index.html?action=ali.open.nav&module=h5&bootImage=0&h5Url=${ encodeURIComponent(url)}`
    }
  }
}