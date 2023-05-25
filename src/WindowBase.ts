import {BrowserWindow, ipcMain} from "electron";
import isDev from "electron-is-dev";
import * as path from "path";

export abstract class WindowBase {
    private browserWindow?: BrowserWindow = undefined;

    constructor() {}

    public init() {}


    protected abstract getHtmlFile(): string;
    protected abstract getWidth(): number;
    protected abstract getHeight(): number;
    protected abstract getLoadingData(): any;
    protected abstract getIpcChannels(): string[];
    protected abstract onIpcMessage(channel: string, ...args: any[]): void;

    public show() {
        if (!this.browserWindow) {
            this.browserWindow = new BrowserWindow({
                width: this.getWidth(),
                height: this.getHeight(),
                webPreferences: {
                    nodeIntegration: false,
                    contextIsolation: true,
                    preload: path.join(__dirname, "../html/preload.js"),
                }
            });

            this.browserWindow.on("close", (e) => {
                e.preventDefault();
                this.browserWindow?.hide();
            });

            const channels = this.getIpcChannels();
            for (const channel of channels) {
                ipcMain.handle(channel, (_, ...args) => {
                    this.onIpcMessage(channel, ...args);
                });
            }
        }

        const data = this.getLoadingData() || {};
        const json = JSON.stringify(data);
        const port = isDev ? 3000 : 2254;
        const url = `http://localhost:${port}/?page=${this.getHtmlFile()}&data=${json}`
        this.browserWindow.loadURL(url)
            .then(() => {});

        this.browserWindow?.show();
        this.browserWindow.webContents.openDevTools();
    }
}