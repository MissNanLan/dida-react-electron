import {
    app,
    Menu,
    Tray,
    BrowserWindow,
  } from 'electron';
const path = require('path');

let tray:Tray;

export default class TrayBuilder{
    mainWindow: BrowserWindow;
    

    constructor(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow;
        const iconName = process.platform === 'win32' ? 'static/icon.ico' : 'static/icon.png'
        tray = new Tray(path.join(__dirname, iconName));
    }

    buildTray(){
        const {mainWindow} = this
        
        const contextMenu = Menu.buildFromTemplate([
            {
              label: '设置',
              submenu:[
                {
                  type : 'checkbox',
                  label: '开机启动',
                  checked : app.getLoginItemSettings().openAtLogin,
                  click : function () {
                    if(!app.isPackaged){
                      app.setLoginItemSettings({
                        openAtLogin: !app.getLoginItemSettings().openAtLogin,
                        path: process.execPath
                      })
                    }else{
                      app.setLoginItemSettings({
                        openAtLogin: !app.getLoginItemSettings().openAtLogin
                      })
                    }
                    console.log(app.getLoginItemSettings().openAtLogin)
                    console.log(!app.isPackaged);
            
                  }
                },
                {
                  type : 'checkbox',
                  label: '显示菜单栏',
                  checked : this.mainWindow.isMenuBarVisible(),
                  click : function () {
                    if(!mainWindow.isMenuBarVisible()){
                      mainWindow.setMenuBarVisibility(true)
                    }else{
                      mainWindow.setMenuBarVisibility(false)
                    
                    }
                    console.log(mainWindow.isMenuBarVisible())
                  }
                }
              ]
            },
            {
              label: '显示主界面', click: () => {
                mainWindow.show();
                mainWindow.setSkipTaskbar(false);
              }
            },
            {
              type: 'separator'
            },
            {
              label: '退出', click: () => {
                mainWindow.destroy();
                app.quit();
              }
            },
          ])
          tray.setToolTip('稽查小助手');
          tray.setContextMenu(contextMenu);
          tray.on('click',()=>{
            mainWindow.show();
            mainWindow.setSkipTaskbar(false);
          })
    }
}



