//向目标页面插入js
console.log('insert.js loaded')

//监听content 发过来的消息
window.addEventListener("message", function (e){

})

//向content 发送消息
postMessage()
window.postMessage({ "test": '你好！' }, '*');