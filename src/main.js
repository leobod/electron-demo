const {
    app,
    BrowserWindow,
    protocol
} = require('electron')

/* 注册用在本程序内部的自定义协议 */
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } },
]);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })
    win.loadURL('http://192.168.1.188:9993/')
    // win.loadURL('http://39.98.255.142:6037/web/index.html')
    win.webContents.toggleDevTools()
}

// 应用程序启动时注册协议处理程序
app.whenReady().then(() => {


    // 注册协议处理程序的回调函数
    protocol.registerBufferProtocol('app', (request, callback) => {
        // 处理回调函数的逻辑代码
        console.log(`Incoming request for ${request.url}`);
    });

    // 创建窗口
    createWindow();
});

// 应用程序退出时取消协议处理程序
app.on('will-quit', () => {
    protocol.unregisterProtocol('app');
});
