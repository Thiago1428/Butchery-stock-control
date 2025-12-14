import { app, BrowserWindow} from 'electron'

// Desabilita aceleração de hardware para evitar erros com GPUs AMD
app.disableHardwareAcceleration()

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