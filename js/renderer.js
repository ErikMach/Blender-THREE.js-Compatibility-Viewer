const ipcRenderer = require('electron');

const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');

ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available');
console.log("FOUND AN UPDATE!!")
  message.innerText = 'A new update is available. Downloading now...';
  notification.classList.remove('hidden');
});

ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded');
  message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
  restartButton.classList.remove('hidden');
  notification.classList.remove('hidden');
});

ipcRenderer.on('getUp', (evt, arg) => {
  console.log(arg);
});

function closeNotification() {
  notification.classList.add('hidden');
}

function restartApp() {
  ipcRenderer.send('restart_app');
}