import { app, BrowserWindow} from 'electron'


app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        minWidth: 1400,
        minHeight: 800,
        //autoHideMenuBar: true,
    })
    mainWindow.maximize()
    mainWindow.loadURL("http://localhost:3000/")
})


app.on("window-all-closed", () => {
    if(process.platform !== "darwin") app.quit()
})