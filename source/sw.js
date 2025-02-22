if ('serviceWorker' in window.navigator && navigator.serviceWorker.controller) {
    // 发送更新指令到sw
    // 'update'改为'refresh'即可触发缓存刷新
    navigator.serviceWorker.controller.postMessage('update')
    navigator.serviceWorker.addEventListener('message', event => {
        const data = event.data
        switch (data.type) {
            case 'update':
                // 这里写更新后的操作
                break
            case 'refresh':
                // 这里写强刷缓存后的操作
                break
            default:
                console.error(`未知事件：${data.type}`)
        }
    })
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw-rules.js').then(() => {
    if (localStorage.getItem('install') !== 'true') {
      localStorage.setItem('install', 'true')
      location.reload()
    }
  })
}