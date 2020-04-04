const { app, remote } = window.electron
const screen = window.electron.screen
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
        noticeWin.loadURL("https://www.baidu.com/");
    }
}

export default DialogService