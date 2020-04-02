const { app, BrowserWindow,dialog } = require('electron');
const path = require('path');
let mainWindow = null;
//判断命令行脚本的第二参数是否含--debug
const debug = /--debug/.test(process.argv[2]);
function makeSingleInstance () {
    if (process.mas) return;
    app.requestSingleInstanceLock();
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}
function createWindow () {
    const windowOptions = {
        width: 800,
        height: 600,
        frame:true,
        autoHideMenuBar:true,
        title:"滴答" 
    };
    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.loadURL("http://localhost:3001/");
    // 加载应用----react 打包
    // mainWindow.loadURL(path.join('file://', __dirname, '/build/index.html'));
    //接收渲染进程的信息
    const ipc = require('electron').ipcMain;
    ipc.on('min', function () {
        mainWindow.minimize();
    });
    ipc.on('max', function () {
        mainWindow.maximize();
    });
    ipc.on("login",function () {
        mainWindow.maximize();
    });
    //如果是--debug 打开开发者工具，窗口最大化，
    if (debug) {
        mainWindow.webContents.openDevTools();
        require('devtron').install();
    }

    // mainWindow.on('closed', () => {
    //     mainWindow = null
    // })
    mainWindow.on('close', (e) => {
        dialog.showMessageBox({
          type: 'info',
          title: 'Information',
          defaultId: 0,
          message: '确定要关闭吗？',
          buttons: ['最小化','直接退出']
        },(index)=>{
          if(index===0){
            e.preventDefault();		//阻止默认行为，一定要有
            mainWindow.minimize();	//调用 最小化实例方法
          } else {
            mainWindow = null;
            //app.quit();	//不要用quit();试了会弹两次
            app.exit();		//exit()直接关闭客户端，不会执行quit();
          }
        }) 
      });
}
makeSingleInstance();
//app主进程的事件和方法
app.on('ready', () => {
    createWindow();
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
module.exports = mainWindow;