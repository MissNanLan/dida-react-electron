import {
    app,
    Menu,
    shell,
    Tray,
    BrowserWindow,
    MenuItemConstructorOptions
  } from 'electron';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
    selector?: string;
    submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class TrayBuilder{
    mainWindow: BrowserWindow;

    constructor(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow;
    }

    buildTray(){
        
    }
}



