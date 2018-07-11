console.warn("注入：content-script脚本！")


//消息控制器 消息json是由插件环境：background || popup 或 浏览器环境发送的通知。
function messageController(message) {
    console.log("messageController收到消息：", message);
    if (!(message instanceof Object)) return;
    switch (message.type) {
        case "COPY_INFO":
            handleCopyInfo()
            break;
        case "POST_INFO":
            handlePostInfo()
            break;
        default:
            alert("消息controller未收到任何消息！");
    }

}


// 监听dom加载完毕事件。注意，必须设置了run_at=document_start 此段代码才会生效
document.addEventListener('DOMContentLoaded', function () {
    injectCustomJs("src/js/inject.js");
    initCustomPanel();

    //生成右下角dom按钮 用来向content-script发送消息
    function initCustomPanel() {
        var panel = document.createElement('div');
        panel.className = 'chrome-plugin-demo-panel';
        panel.innerHTML = `
		<div class="btn-area">
			<a href="javascript:sendMessageToContentScript({type:'COPY_INFO'})">一键复制信息</a><br>
			<a href="javascript:sendMessageToContentScript({type:'POST_INFO'})">一键粘贴信息</a><br>
		</div>
		<div id="my_custom_log">
		</div>
	`;
        document.body.appendChild(panel);
    }


    // 向页面注入 (网页环境与content-script环境通)信的JS接口
    function injectCustomJs(jsPath) {
        jsPath = jsPath || 'src/js/inject.js';
        var temp = document.createElement('script');
        temp.setAttribute('type', 'text/javascript');
        // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
        temp.src = chrome.extension.getURL(jsPath);
        temp.onload = function () {
            // 放在页面不好看，执行完后移除掉
            this.parentNode.removeChild(this);
        };
        document.body.appendChild(temp);
    }
})


//监听bankground发送的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //统一由消息控制器处理
    messageController(request);
});


//监听网页环境发送的消息
window.addEventListener("message", function (e) {
    //统一由消息控制器处理
    messageController(e.data);
}, false);


//拷贝方法
function handleCopyInfo() {
    localStorage.setItem("info", document.title)
    alert("拷贝：" + document.title);

}


//粘贴方法
function handlePostInfo() {

    alert("粘贴：" + localStorage.getItem("info"));
}