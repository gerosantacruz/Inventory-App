const {createWindow} = require('./main')
const {app} = require('electron')
require('./database');

//require('electron-reload')(__dirname)
app.setAppUserModelId(process.execPath)
app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);