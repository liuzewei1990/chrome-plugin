
// 弹出消息封装
function alert(msg) {
    chrome.notifications.create(null, {
        type: 'basic', iconUrl: 'src/images/icon.png', title: '友情提示',
        message: String(msg)
    });
}


//创建复制右键菜单
chrome.contextMenus.create({
    "type": "normal", "title": '一键复制商户信息', 'contexts': ['page', 'selection'], "documentUrlPatterns": ["*://*.baidu.com/*"],
    "onclick": function (info, tab) {
        chrome.tabs.sendMessage(tab.id, { type: "COPY_INFO" })
    }
});


//创建粘贴右键菜单
chrome.contextMenus.create({
    "type": "normal", "title": '一键粘贴商户信息', 'contexts': ['page', 'selection'], "documentUrlPatterns": ["*://*.baidu.com/*"],
    "onclick": function (info, tab) {
        chrome.tabs.sendMessage(tab.id, { type: "POST_INFO" });
    }
});


//监听manifest.json中配置的键盘快捷键事件
chrome.commands.onCommand.addListener(function (commandType) {
    // commandType : COPY_INFO || POST_INFO
    sendMessageToContentScript({ type: commandType });
});


//发送消息通知content-script 执行对应任务 注意：要向content发送消息必须指定tabId,表明向哪个tab中的content发送消息
//这里是设置成当前焦点tab
function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("sendMessageToContentScript：", tabs)
        console.log("message：", message)
        let tab = tabs.length ? tabs[0] : null;
        if (tab) {
            chrome.tabs.sendMessage(tab.id, message, function (response) {
                if (callback) callback(response);
            });
        }
    });
}



