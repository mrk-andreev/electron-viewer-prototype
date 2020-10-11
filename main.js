const {app, BrowserWindow} = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        autoHideMenuBar: true,
        kiosk: true,
        alwaysOnTop: true,
    })
    mainWindow.loadURL('https://dev.az.conundrum.ai/')
        .then(() => {
            mainWindow.webContents.openDevTools({
                mode: 'undocked',
                activate: true,
            })
        });
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
