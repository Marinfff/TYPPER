import { app, BrowserWindow } from 'electron';

let mainWindow: BrowserWindow | null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 330,
    height: 430,
    title: 'Tm',
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('./dist/index.html');
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
