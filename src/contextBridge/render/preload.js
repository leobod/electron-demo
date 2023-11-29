/**
 * 预加载脚本与浏览器共享同一个全局 Window 接口
 * 并且可以访问 Node.js API
 * 因为 contextIsolation 是默认的,所以以下写法不行
 * window.myAPI = { desktop: true }
 * 
 * 语境隔离（Context Isolation）意味着预加载脚本与渲染器的主要运行环境是隔离开来的，以避免泄漏任何具特权的 API 到您的网页内容代码中。
 * 使用 contextBridge 模块来安全地实现交互
 */

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
    desktop: true
})