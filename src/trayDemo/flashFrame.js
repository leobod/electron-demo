const { app, BrowserWindow, nativeImage, Tray, screen } = require('electron');
const path = require('path');
//入口文件
let indexHtml = 'http://localhost:' + 8080 + '/xiongxin/';
//熊信图标路径
const iconPath = path.join(__dirname, `../src/assets/logo/icon.png`);

//所有窗体
let windows = {
    mainWindow: null, //主窗口
}

//系统托盘实例
let appTray = null;

/**
 * 创建系统托盘
 */
function createAppTray() {
    //系统托盘
    appTray = new Tray(iconPath);
    //系统托盘的提示文本
    appTray.setToolTip('熊信');
    //点击系统托盘打开窗口
    appTray.on('click', () => {
        flashFrame(false)//取消系统托盘闪烁
        windows.mainWindow.show();
    });
}

/** 设置主窗口任务栏闪烁、系统托盘图闪烁
 * @param {Boolean} isFlash 是否闪烁 true为闪烁，false为取消
 */
let flashTimer = null;
function flashFrame(isFlash) {
    //设置任务栏闪烁
    windows.mainWindow.flashFrame(isFlash)
    //设置系统托盘闪烁
    if (isFlash) {
        clearInterval(flashTimer)
        let flag = false
        flashTimer = setInterval(() => {
            flag = !flag
            if (flag) {
                appTray.setImage(nativeImage.createEmpty())
            } else {
                appTray.setImage(iconPath)
            }
        }, 500)
    } else {
        appTray.setImage(iconPath)
        clearInterval(flashTimer)
    }
}

//创建主窗口
const createMainWindow = () => {
    //创建并控制浏览器窗口。
    windows.mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        minWidth: 900,
        minHeight: 600,
        frame: false, // 无边框
        icon: iconPath,// 窗口图标
        webPreferences: {//网页功能设置。
            preload: path.join(__dirname, 'preload.js'),//在页面运行其他脚本之前预先加载指定的脚本 无论页面是否集成Node, 此脚本都可以访问所有Node API 脚本路径为文件的绝对路径。
            webSecurity: false,//禁用同源策略
            nodeIntegration: true,
            nodeIntegrationInWorker: true
        }
    });

    //加载路径
    windows.mainWindow.loadURL(indexHtml);

    //创建系统托盘
    createAppTray()

    //设置系统托盘闪烁
    flashFrame(true)
};

//当Electron 初始化完成时触发
app.whenReady().then(() => {
    createMainWindow();//创建主窗口
    app.on('activate', () => { // macOS 应用通常即使在没有打开任何窗口的情况下也继续运行，并且在没有窗口可用的情况下激活应用时会打开新的窗口。
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
});

//关闭所有窗口时退出应用 ，监听 app 模块的 'window-all-closed' 事件。如果用户不是在 macOS(darwin) 上运行程序，则调用 app.quit()。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

