
// 弹出消息封装
function alert(msg) {
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'images/icon.png',
        title: '友情提示',
        message: msg || "消息中心"
    });
}

//创建窗口
$("#create").click(() => {
    chrome.tabs.create({ integer: 0 })
})

//获取当前的标签页信息
$("#getCurrent").click(() => {
    chrome.tabs.getCurrent((tab) => {
        alert(JSON.stringify((typeof tab)))
    })
})

$("#query").click(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        alert(tabs[0].title)
    })
})

$("#sendMessage").click(() => {

    chrome.tabs.sendMessage(tab.id, { type: "" })

})













chrome.notifications.create(null, {
    type: 'basic',
    iconUrl: 'images/icon.png',
    title: '友情提示',
    message: "初始化成功！"
});

