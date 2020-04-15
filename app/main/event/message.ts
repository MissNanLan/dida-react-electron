import { ipcMain, BrowserWindow } from 'electron';
import path from 'path';

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
                width: 500,
                height: 400,
                webPreferences:{
                    nodeIntegration:true
                },
                autoHideMenuBar:true,
                focusable:true
            })
            // url.format({
            //     pathname: path.join(__dirname, '/dist/index.html'),
            //     protocol: 'file:',
            //     slashes: true
            // })
            win.on('close', () => { win = null })
            let proUrl = `file://${__dirname}/dist/dialog/index.html`
            let devUrl = `http://localhost:1212/static/window.html`
            let url = `${process.env.NODE_ENV === 'development' ?devUrl:proUrl}`
            win.loadURL(url);
            win.webContents.on('did-finish-load', function(){
                if(win) win.webContents.send('dataJsonPort', data);
            });
            // win.webContents.openDevTools()
        })
    }
}