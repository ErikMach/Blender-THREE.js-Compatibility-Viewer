const { app, BrowserWindow, ipcMain } = require('electron')
const { autoUpdater } = require('electron-updater')

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 720,
    webPreferences: {
      devTools: true,
      nodeIntegration: false,
      contextIsolation: false
    }
  })

  //win.setMenu(null)
  win.loadFile('index.html')
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  autoUpdater.checkForUpdatesAndNotify()
})

autoUpdater.on('update-available', () => {
  ipcMain.send('update_available')
  console.log(ipcMain.sendSync('getUp', 'There is an update here'))
})

autoUpdater.on('update-downloaded', () => {
  ipcMain.send('update_downloaded')
})

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
})