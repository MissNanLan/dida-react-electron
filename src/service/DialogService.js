const {  remote } = window.electron
const path = require('path')
const BrowserWindow = remote.BrowserWindow;



class DialogService {
    static windowDialog() {
        const windowOptions = {
            width: 500,
            height: 400,
            frame: true,
            resizable: true,
            maximizable: false,
            autoHideMenuBar: true,
            title: "提醒",
            skipTaskbar: false,
        };
        let noticeWin = new BrowserWindow(windowOptions);
      //  noticeWin.loadURL("https://www.baidu.com/");
        noticeWin.loadURL(path.join('file://', __dirname, '/build/index.html'));
        noticeWin.loadURL("http://localhost:3000/#/caseManage")
    }
}

export default DialogService