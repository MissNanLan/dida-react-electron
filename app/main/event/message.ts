import { ipcMain, BrowserWindow } from 'electron';

export default class MessageBuilder{
    mainWindow: BrowserWindow;

    constructor(mainWindow: BrowserWindow) {
      this.mainWindow = mainWindow;
    }
    handleMessage(){
        this.createNoticeWindow()
    }

    createNoticeWindow(){
        ipcMain.on('create-notice-window',(event,data)=>{
            let win:BrowserWindow | null= new BrowserWindow({
                width: 800,
                height: 600,
                webPreferences:{nodeIntegration:true}
            })
            win.on('close', () => { win = null })
            win.loadURL(`file://${__dirname}/static/window.html`);
            win.webContents.on('did-finish-load', function(){
                if(win) win.webContents.send('dataJsonPort', data);
            });
            win.webContents.openDevTools()
        })
    }
}