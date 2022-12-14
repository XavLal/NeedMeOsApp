// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 820,
    icon: __dirname + '/img/favicon.png',
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#27293d',
      symbolColor: '#ffffff'
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Load local file
  //mainWindow.loadFile('index.html')

  // Load a remote URL
  mainWindow.loadURL('https://app.needme.fr/osapp')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Thumbbar shortcuts
  mainWindow.setThumbarButtons([
    {
      tooltip: 'Tableau de bord',
      icon: path.join(__dirname, 'img/favicon.png'),
      click () { mainWindow.loadURL('https://app.needme.fr/') }
    },
    {
      tooltip: 'Devis & Factures',
      icon: path.join(__dirname, 'img/billing.png'),
      click () { mainWindow.loadURL('https://app.needme.fr/billing') }
    },
    {
      tooltip: 'Dossiers',
      icon: path.join(__dirname, 'img/project.png'),
      click () { mainWindow.loadURL('https://app.needme.fr/projects') }
    },
    {
      tooltip: 'Clients',
      icon: path.join(__dirname, 'img/wallet.png'),
      click () { mainWindow.loadURL('https://app.needme.fr/wallets') }
    },
    {
      tooltip: 'Contacts',
      icon: path.join(__dirname, 'img/contact.png'),
      click () { mainWindow.loadURL('https://app.needme.fr/contacts') }
    }
  ])

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
