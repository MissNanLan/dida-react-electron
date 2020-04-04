const electron = require('electron')
const { app, BrowserWindow, dialog } = electron;
const ipc = electron.ipcMain;
const screen = electron.screen
const path = require('path')

const Menu = electron.Menu
const Tray = electron.Tray

let mainWindow = null;
let appTray = null;

//判断命令行脚本的第二参数是否含--debug
const debug = /--debug/.test(process.argv[2]);

function makeSingleInstance() {
    if (process.mas) return;
    app.requestSingleInstanceLock();
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })
}

function createWindow() {
    let size = screen.getPrimaryDisplay().workAreaSize
    const windowOptions = {
        width: parseInt(size.width * 0.45),
        height: parseInt(size.height * 0.58),
        center: true,
        frame: true,
        resizable: false,
        maximizable: false,
        autoHideMenuBar: true,
        title: "滴答提醒",
        skipTaskbar: false,
        webPreferences: {
            nodeIntegration: false,
            preload: __dirname + '/preload.js'
        }
    };
    mainWindow = new BrowserWindow(windowOptions);
    mainWindow.loadURL("http://localhost:9000/");
    // 加载应用----react 打包
    // mainWindow.loadURL(path.join('file://', __dirname, '/build/index.html'));
    // 开始或停止显示窗口来获得用户的关注
    mainWindow.flashFrame(true);
    //接收渲染进程的信息

    ipc.on('min', function () {
        mainWindow.minimize();
    });
    // ipc.on('max', function () {
    //     mainWindow.maximize();
    // });
    ipc.on("login", function () {
        mainWindow.maximize();
    });
    //如果是--debug 打开开发者工具，窗口最大化，
    if (debug) {
        mainWindow.webContents.openDevTools();
        require('devtron').install();
    }

    mainWindow.on('close', (e) => {
        e.preventDefault();
        mainWindow.hide()
    })
    mainWindow.on('closed', (e) => {
        mainWindow = null
    })
    // mainWindow.on('close', (e) => {
    //     mainWindow.minimize();
    // });
    ipc.on('asynchronous-message', function (event, arg) {
        console.log(arg); // prints "ping"
        event.sender.send('asynchronous-reply', 'pong');
    });

    ipc.on('synchronous-message', function (event, arg) {
        console.log(arg); // prints "ping"
        event.returnValue = 'pong';
    });
    // 托盘图标
    appTray = new Tray(path.join(__dirname, '/public/favicon.ico'))
    const trayMenu = Menu.buildFromTemplate([
        {label:'退出',click:()=>{
            app.quit()
        }}
    ])
    appTray.setContextMenu(trayMenu)
    appTray.setToolTip('滴答提醒')
    appTray.on('click',()=>{
        mainWindow.show();
    })
    
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