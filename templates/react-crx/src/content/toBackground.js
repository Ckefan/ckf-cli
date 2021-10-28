// content 向background发送消息  （短连接）
export function sendToBackground (config) {
  config.apiType = 'background'
  if (window.chrome && window.chrome.runtime) {
    window.chrome && window.chrome.runtime.sendMessage({
      type: 'apiRequest',
      config: config,
    }, (result) => {
      // 接收background script的sendResponse方法返回的消数据result
      config.done && config.done()
      if (result.result === 'succ') {
        config.success && config.success(result)
      } else {
        config.fail && config.fail(result.msg)
      }
    })
  } else {
    console.log('未找到chrome API')
  }
}

export function getBackground (config) {
  if (window.chrome && window.chrome.runtime) {
    window.chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      // 接受来自background的消息
      console.log('接收来自backgroundjs的消息：', request, sender, sendResponse)
      window.chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const { type } = request
        // 接收来自content的api请求
        if (type === 'apiRequest') {
          let { config } = request
          // API请求成功的回调
          config.success = (data) => {
            data.result = 'succ'
            sendResponse(data)
          }
          // API请求失败的回调
          config.fail = (msg) => {
            sendResponse({
              result: 'fail',
              msg
            })
          }
        }
      })
      return true
    })
  }
}