import { apiRequest } from '@/api'

/*global chrome*/
chrome.runtime.onInstalled.addListener(function () {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		chrome.declarativeContent.onPageChanged.addRules([{
			// 运行插件运行的页面URL规则
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({ pageUrl: {} }),
			],
			actions: [new window.chrome.declarativeContent.ShowPageAction()]
		}])
	})
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	// 接受来自content-script的消息，requset里不允许传递function类型的参数
	console.log('background接收到来自content的消息：', request, sender)
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		console.log('background-query:', tabs)
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
			// 发起请求
			apiRequest(config)
		}
	})
	return true
})


let _port;
const nativeHost = 'com.tdp.desktop';
function init () {
	console.log(['初始化消息监听']);

	_port = chrome.runtime.connectNative(nativeHost);

	_port.onMessage.addListener(function (msg) {
		console.log(['从 app 来了消息 ', msg]);


		const { action, data } = msg;


		//点击桌面app的小贴纸，全屏并激活页面
		if (action === 'start-stickers') {
			const { left, top, width, height } = data;

			chrome.windows.getCurrent((currentWindow) => {
				console.log({ currentWindow })
				chrome.windows.update(currentWindow.id, {
					left,
					top,
					width,
					height,
					focused: true,
				});

				//获取浏览器当前网页的信息
				chrome.tabs.query({
					active: true,
					currentWindow: true,
				}, function (tabs) {
					console.log(tabs)
					if (!tabs.length) return;
					chrome.tabs.sendMessage(tabs[0].id, {
						action: 'start-stickers',
						msg,
					});
				});
			});
		}



		// 给窗口定位和设置大小
		if (action === 'resize_and_position') {
			const { left, top, width, height } = data;
			chrome.windows.getCurrent((currentWindow) => {
				chrome.windows.update(currentWindow.id, {
					left,
					top,
					width,
					height,
					focused: true,
				});
			});



		} else if (action === 'focus-chrome') {

			// 恢复窗口位置和大小
			// const { width, height } = data;
			chrome.windows.getCurrent((currentWindow) => {

				chrome.windows.update(currentWindow.id, {
					focused: true,
				});

			});

		} else if (action === 'restore_resize_and_position') {
			// 恢复窗口位置和大小
			const { width, height } = data;
			chrome.windows.getCurrent((currentWindow) => {

				chrome.windows.update(currentWindow.id, {
					left: 0,
					top: 0,
					width,
					height,
					focused: true,
				});

			});

		} else if (action === 'window_resize_position') {
			// 获取窗口的位置大小
			chrome.windows.getCurrent(currentWindow => {
				// 把大小发回原生app
				console.log('');
				chrome.runtime.sendNativeMessage(nativeHost, {
					action: 'window_resize_position',
					data: {
						width: currentWindow.width,
						height: currentWindow.height,
						left: currentWindow.left,
						top: currentWindow.top,
					}
				});
			});

		} else {
			// 向当前tab 发送消息
			chrome.tabs.query({
				active: true,
				currentWindow: true,
			}, function (tabs) {
				if (!tabs.length) return;
				chrome.tabs.sendMessage(tabs[0].id, {
					action: 'native-message',
					msg,
				});
			});
		}


	});

}

window.addEventListener('load', init);


// // 监听事件
// chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {

//     console.log('chrome.extension.onMessage')
//     console.log({
//         request
//     });

//     if (request.type === 'screenshot') {
//         console.log(['screenshot now']);
//         caputure(sender.tab.id, request.dimensions, function (dataURL) {
//             console.log(['send response', dataURL]);
//             sendResponse({
//                 dataURL
//             });
//         });

//         return true;
//     } else if (request.type === 'native-message') {
//         // 发往destkop 的消息 - 简单转发
//         console.log('给app发送消息');
//         chrome.runtime.sendNativeMessage(nativeHost, request.data);

//         sendResponse();

//     } else {
//         sendResponse({});
//     }

// });

// var canvas = null;
/**
 * 截图
 * @param {*} tabId 
 * @param {*} dimensions 
 */
function caputure (tabId, dimensions, cb) {

	chrome.tabs.get(tabId, function (tab) {
		chrome.tabs.captureVisibleTab(tab.windowId, { format: 'png' }, function (dataUrl) {

			let canvas = document.createElement('canvas');
			document.body.append(canvas);

			let image = new Image();
			image.onload = function () {

				console.log(['image height', image.height, dimensions]);

				// 缩放比例 - 已高度为准
				let radio = image.height / dimensions.fullHeight;

				// 直接用指定的大小
				canvas.width = dimensions.fullWidth;
				canvas.height = dimensions.fullHeight;

				var context = canvas.getContext('2d');
				context.drawImage(image,
					0, 0, dimensions.fullWidth * radio, image.height,
					0, 0, canvas.width, canvas.height);

				var cropDataUrl = canvas.toDataURL('image/png');

				//document.body.removeChild(canvas);

				// 然后再把图切到 dimensions 位置和大小
				//let canvas2 = document.createElement('canvas');
				let canvas2 = canvas;
				//document.body.append(canvas2);

				console.log(['start image2', cropDataUrl, dimensions]);

				let image2 = new Image();
				image2.onload = function () {

					canvas2.width = dimensions.width;
					canvas2.height = dimensions.height;

					console.log(['image2', image2, image2.width, image2.height]);

					let context = canvas2.getContext('2d');
					context.drawImage(image2,
						dimensions.left, dimensions.top, canvas2.width, canvas2.height,
						0, 0, canvas2.width, canvas2.height);

					var cropDataUrl2 = canvas2.toDataURL('image/png');

					document.body.removeChild(canvas2);

					cb && cb(cropDataUrl2);

				};

				image2.src = cropDataUrl;
			}

			image.src = dataUrl;

		});
	});

}