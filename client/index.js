const electron = require("electron");
const {app , BrowserWindow} = electron;

let mainWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({ 
        width: 1820,
        height: 1024,
        resizable:true,
        autoHideMenuBar:true,
        webPreferences : {
            nodeIntegration :true,
            contextIsolation : false
        }
    });

    mainWindow.loadURL(`${app.getAppPath()}\\build\\index.html`);
})