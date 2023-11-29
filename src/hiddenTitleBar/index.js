const {
    app,
    BrowserWindow
} = require('electron')

/**
设置可拖动
    当隐藏了标题栏后,默认不可拖动
    在index.ejs的body上设置样式
    style="-webkit-app-region: drag;"  全局拖动,点击事件失效
    style="-webkit-app-region: no-drag;"  不可拖动区域,使得点击事件恢复
 */

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 800,
        minHeight: 600,
        titleBarStyle: 'hiddenInsect',
        /* hidden 标题栏样式的结果是隐藏标题栏和全尺寸内容窗口, 
           在 macOS上，应用 hidden 标题栏样式仍然会暴露标准窗口左上方 的控制按钮(“红绿灯”)。
           hiddenInset 修改macOS红绿灯控件的位置
        */
        frame: false, /* 创建无边框窗口 */
        // transparent: true，// 创建透明窗口
        webPreferences: {
            nodeIntegration: true,
            devTools: true
        }
    })
    win.loadURL('http://192.168.1.188:9993/')
    // win.loadURL('http://39.98.255.142:6037/web/index.html')
    win.webContents.toggleDevTools()
}

app.whenReady().then(() => {
    // 创建窗口
    createWindow();
});

app.on('will-quit', () => {

});
