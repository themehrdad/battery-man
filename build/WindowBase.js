"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowBase = void 0;
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const path = __importStar(require("path"));
class WindowBase {
    browserWindow = undefined;
    constructor() { }
    init() { }
    show() {
        if (!this.browserWindow) {
            this.browserWindow = new electron_1.BrowserWindow({
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
                electron_1.ipcMain.handle(channel, (_, ...args) => {
                    this.onIpcMessage(channel, ...args);
                });
            }
        }
        const data = this.getLoadingData() || {};
        const json = JSON.stringify(data);
        const port = electron_is_dev_1.default ? 3000 : 2254;
        const url = `http://localhost:${port}/?page=${this.getHtmlFile()}&data=${json}`;
        this.browserWindow.loadURL(url)
            .then(() => { });
        this.browserWindow?.show();
        this.browserWindow.webContents.openDevTools();
    }
}
exports.WindowBase = WindowBase;
