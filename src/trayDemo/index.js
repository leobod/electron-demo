const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron')
const p = require('path');

const iconPath = p.join(__dirname, `./bear.png`);


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })
    win.loadURL('http://192.168.1.188:9993/')
    // win.loadURL('http://39.98.255.142:6037/web/index.html')
    win.webContents.toggleDevTools()
}

let tray = null;

app.whenReady().then(() => {
    createWindow();

    tray = new Tray(iconPath)

    // 注意: 你的 contextMenu, Tooltip 和 Title 代码需要写在这里!
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ])

    tray.setContextMenu(contextMenu)
    tray.setToolTip('熊')
})

app.on('will-quit', () => {

});