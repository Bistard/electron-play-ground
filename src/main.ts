
import * as Path from'path';

import { BrowserWindow, ipcMain, app, dialog, Menu } from 'electron';

/**
 * @description main electron startup class, instantiates at end of the file.
 */
class Main {

    winMain: Electron.BrowserWindow | null;
    
    constructor() {
        this.winMain = null;
        this.createWindow();
        this._setListeners();
    }

    /**
     * @description instantiates the winMain and seutup a few window relevant.
     * listeners.
     */
    createWindow(): void {
        app.whenReady().then(() => {

            this.winMain = new BrowserWindow({
                width: 1200,
                height: 800,
                minWidth: 300,
                minHeight: 200,
                webPreferences: {
                    nodeIntegration: true,
                    contextIsolation: false,
                    enableRemoteModule: true,
                    devTools: true,
                    preload: Path.join(__dirname, 'preload.js'),
                },
                resizable: true,
                show: false,
                frame: true
            });
            
            // sets winMain in the global scope so that other modules can also 
            // access winMain.
            // global.winMain = this.winMain;
            
            // remove the default menu. Shortcuts like reload and developer-tool
            // are set in the later
            // this.winMain.setMenu(null);

            /* const gotTheLock = app.requestSingleInstanceLock(); */

            // loads index.html first and displays when ready
            this.winMain.loadFile('./src/index.html');
            this.winMain.webContents.on('did-finish-load', () => {
                
                // send app path to the renderer process
                this.winMain!.webContents.send('get-app-path', app.getAppPath());
                
                // display window
                this.winMain!.show();
            });

            // auto opens develope tools
            this.winMain!.webContents.openDevTools({mode: 'detach', activate: true});

            // titleBar listeners
            this.winMain.on('maximize', () => {
                this.winMain!.webContents.send('isMaximized');
            });

            this.winMain.on('unmaximize', () => {
                this.winMain!.webContents.send('isRestored');
            });

            this.winMain.on('closed', () => {
                this.winMain = null;
            });

            this.winMain.on('blur', () => {
                this.winMain!.webContents.send('closeContextMenu');
            });

            ipcMain.on('minApp', () => {
                this.winMain!.minimize();
            });

            ipcMain.on('maxResApp', () => {
                if (this.winMain!.isMaximized()) {
                    this.winMain!.restore();
                } else {
                    this.winMain!.maximize();
                }
            });

            // notify the renderer process before actual closing
            ipcMain.on('closeApp', () => {
                this.winMain!.webContents.send('closingApp');
            });

            // once renderer process is ready, we do the actual closing
            ipcMain.on('rendererReadyForClosingApp', () => {
                this.winMain!.close();
            });
            
            // response to FolderModule, default path is 'desktop' and only can
            // open directory.
            ipcMain.on('openDir', () => {
                dialog.showOpenDialog(
                    this.winMain!,
                    {
                        /* defaultPath: app.getPath('desktop'), */
                        defaultPath: 'D:\\dev\\AllNote',
                        //defaultPath: '/Users/apple/markdownNote_latest/forTestingOnly',
                        buttonLabel: 'open a file or folder',
                        properties: [
                            'openDirectory',
                        ],
                    }
                ).then((path) => {
                    if (path === undefined) {
                        throw 'opened path is undefined';
                    }

                    if (!path.canceled) {
                        // eg. D:\dev\AllNote
                        let rootdir = path.filePaths[0];
                        this.winMain!.webContents.send('openDir', rootdir);
                    }
                });
            });
        
            // only for testing purpose, can be removed in release version
            ipcMain.on('test', (_event, data) => {
                console.log(data);
            });

            

        });
    }

    /**
     * @description not just main.js, other xxxModule will also have similar 
     * funcitons to handle responses or register shortcuts.
     */
    private _setListeners(): void {
        
        /**
         * @readonly comments for now, not convinent for develop.
         */
        // This catches any unhandle promise rejection errors.
        // process.on('unhandledRejection', (reason, p) => {
        //    console.error(`Unhandled Rejection at: ${util.inspect(p)} reason: ${reason}`)
        // }) 
        
        app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (BrowserWindow.getAllWindows().length === 0) {
                this.createWindow();
            }
        });

        // Quit when all windows are closed, except on macOS. There, it's common
        // for applications and their menu bar to stay active until the user 
        // quits explicitly with Cmd + Q.
        app.on('window-all-closed', function () {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });


    }

}

/** 
 * @readonly '❤hello, world!❤'
 */
new Main();
