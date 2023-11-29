const { app, BrowserWindow, ipcMain, screen } = require('electron')
const path = require('node:path')

let movingInterval = null;

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './render/preload.js')
        }
    })

    ipcMain.on('max-app', () => {
        if (win.isMaximized()) {
            win.restore();
        } else {
            win.maximize();
        }
    })

    ipcMain.on('min-app', () => {
        if (win) {
            win.minimize()
        }
    })

    ipcMain.on('close-app', () => {
        if (win) {
            win.close()
        }
    })

    ipcMain.on("window-move-open", (events, canMoving) => {
        if (canMoving) {
            // 读取原位置
            const winPosition = win.getPosition();
            winStartPosition = { x: winPosition[0], y: winPosition[1] };
            mouseStartPosition = screen.getCursorScreenPoint();
            // 清除
            if (movingInterval) {
                clearInterval(movingInterval);
            }
            // 新开
            movingInterval = setInterval(() => {
                // 实时更新位置
                const cursorPosition = screen.getCursorScreenPoint();
                const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x;
                const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y;
                win.setPosition(x, y, true);
            }, 10);
        } else {
            clearInterval(movingInterval);
            movingInterval = null;
        }
    });


    // 加载本地的 html
    win.loadFile('./web/index.html')
    // 打开开发者工具
    win.webContents.toggleDevTools()

}

app.whenReady().then(() => {
    createWindow()
})
