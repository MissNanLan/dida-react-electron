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
                width: 800,
                height: 600,
                webPreferences:{
                    nodeIntegration:true,
                    webSecurity: false
                }
            })
            // url.format({
            //     pathname: path.join(__dirname, '/dist/index.html'),
            //     protocol: 'file:',
            //     slashes: true
            // })
            win.on('close', () => { win = null })
            let proUrl = `file://${__dirname}/static/window.html`
            let devUrl = path.join(__dirname,'static/window.html')
            let url = `${process.env.NODE_ENV === 'development' ?devUrl:proUrl}`
            win.loadURL(url);
            win.webContents.on('did-finish-load', function(){
                if(win) win.webContents.send('dataJsonPort', data);
            });
            win.webContents.openDevTools()
        })
    }
}