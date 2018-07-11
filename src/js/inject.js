
// 发送普通消息到content-script
function sendMessageToContentScript(msg) {
    window.postMessage(msg, '*');
}