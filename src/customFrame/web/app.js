console.log("app.js");
// const fs = require('fs')
// console.log("fs",fs);

window.addEventListener('load', () => {
    document.querySelector(".my-drag").addEventListener('mousedown', () => {
        window.window_control.windowMove(true)
    })
    document.querySelector(".my-drag").addEventListener('mouseup', () => {
        window.window_control.windowMove(false)
    })

    document.querySelector(".my-btn-min").addEventListener('click', () => {
        window.window_control.toMin()
    })

    document.querySelector(".my-btn-max").addEventListener('click', () => {
        window.window_control.toMax()
    })

    document.querySelector(".my-btn-close").addEventListener('click', () => {
        window.window_control.toClose()
    })
})



function titleDown(e) {
    window.window_control.windowMove(true)
}
function titleUp(e) {
    window.window_control.windowMove(false)
}