import { BrowserWindow } from 'electron';

export default class MainWindow {
  mainWindow: BrowserWindow;
  constructor() {
    this.createMainWindow();
  }

  createMainWindow() {
    this.mainWindow = new BrowserWindow({
      height: 800,
      width: 1200,
      show: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
  }

  loadURL(url: string) {
    this.mainWindow.loadURL(url);
    // this.mainWindow.webContents.openDevTools();
  }

  openDevTools() {
    this.mainWindow.webContents.openDevTools();
  }

  show() {
    this.mainWindow.show();
  }
}
