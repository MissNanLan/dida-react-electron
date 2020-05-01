/* eslint @typescript-eslint/ban-ts-ignore: off */
import {
  app,
  Menu,
  shell,
  BrowserWindow,
  MenuItemConstructorOptions,
  dialog 
} from 'electron';

interface DarwinMenuItemConstructorOptions extends MenuItemConstructorOptions {
  selector?: string;
  submenu?: DarwinMenuItemConstructorOptions[] | Menu;
}

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.webContents.on('context-menu', (_, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.webContents.inspectElement(x, y);
          }
        }
      ]).popup({ window: this.mainWindow });
    });
  }

  buildDarwinTemplate() {
    const subMenuAbout: DarwinMenuItemConstructorOptions = {
      label: 'Electron',
      submenu: [
        {
          label: 'About ElectronReact',
          selector: 'orderFrontStandardAboutPanel:'
        },
        { type: 'separator' },
        { label: 'Services', submenu: [] },
        { type: 'separator' },
        {
          label: 'Hide ElectronReact',
          accelerator: 'Command+H',
          selector: 'hide:'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        },
        { label: 'Show All', selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    };
    const subMenuEdit: DarwinMenuItemConstructorOptions = {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        }
      ]
    };
    const subMenuViewDev: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.webContents.toggleDevTools();
          }
        }
      ]
    };
    const subMenuViewProd: MenuItemConstructorOptions = {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        }
      ]
    };
    const subMenuWindow: DarwinMenuItemConstructorOptions = {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        { label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
        { type: 'separator' },
        { label: 'Bring All to Front', selector: 'arrangeInFront:' }
      ]
    };
    const subMenuHelp: MenuItemConstructorOptions = {
      label: 'Help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            shell.openExternal('https://electronjs.org');
          }
        },
        {
          label: 'Documentation',
          click() {
            shell.openExternal(
              'https://github.com/electron/electron/tree/master/docs#readme'
            );
          }
        },
        {
          label: 'Community Discussions',
          click() {
            shell.openExternal('https://www.electronjs.org/community');
          }
        },
        {
          label: 'Search Issues',
          click() {
            shell.openExternal('https://github.com/electron/electron/issues');
          }
        }
      ]
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
        ? subMenuViewDev
        : subMenuViewProd;

    return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
  }

  buildDefaultTemplate() {
    const {mainWindow}=this
    const templateDefault = [
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
            }
          },
          {
            type : 'checkbox',
            label: '显示菜单栏',
            accelerator: 'F10',
            checked : this.mainWindow.isMenuBarVisible(),
            click : function () {
              if(!mainWindow.isMenuBarVisible()){
                mainWindow.setMenuBarVisibility(true)
              }else{
                mainWindow.setMenuBarVisibility(false)
              }
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
          }
        ]
      },
      {
        label: '&视图',
        submenu:
          // process.env.NODE_ENV === 'development' ||
          // process.env.DEBUG_PROD === 'true'
          //   ? [
          //       {
          //         label: '&Reload',
          //         accelerator: 'Ctrl+R',
          //         click: () => {
          //           this.mainWindow.webContents.reload();
          //         }
          //       },
          //       {
          //         label: 'Toggle &Full Screen',
          //         accelerator: 'F11',
          //         click: () => {
          //           this.mainWindow.setFullScreen(
          //             !this.mainWindow.isFullScreen()
          //           );
          //         }
          //       },
          //       {
          //         label: 'Toggle &Developer Tools',
          //         accelerator: 'Alt+Ctrl+I',
          //         click: () => {
          //           this.mainWindow.webContents.toggleDevTools();
          //         }
          //       }
          //     ]
          //   :
             [
                {
                  label: '全屏',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                }
              ]
      },
      {
        label: '帮助',
        submenu: [
          // {
          //   label: '使用介绍',
          //   click() {
          //     dialog.showMessageBoxSync(mainWindow,{
          //       icon:'resources/icon.ico',
          //       title:'使用介绍',
          //       message:'稽查小组首'
          //     })
          //   }
          // },
          {
            label: '声明',
            click() {
              dialog.showMessageBoxSync(mainWindow,{
                title:'声明',
                message:`
              1.本软件(稽查小助手)非商业用途，不得未经作者授权进行修改、发售;
              2.任何因软件使用导致的损失，与作者无关;
              3.本软件所有存储资料均位于/resources/data目录下，无任何联网功能;
              4.本软件所有字体、图标、如有侵权，请联系作者删除;
              4.未明示授权的一切权利归作者所有，用户使用其他权利时必须获得作者的书面同意。
                `
              })
            }
          }
        ]
      }
    ];

    return templateDefault;
  }
}
