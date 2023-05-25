"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrayIcon = void 0;
const electron_1 = require("electron");
const getIconFile_1 = require("./util/getIconFile");
class TrayIcon {
    trayMenu;
    tray = undefined;
    constructor(trayMenu) {
        this.trayMenu = trayMenu;
    }
    init() {
        this.tray = new electron_1.Tray((0, getIconFile_1.getIconFile)());
        this.tray.setTitle("Battery Man");
        this.tray.setToolTip("Battery Man");
        this.tray.setContextMenu(this.trayMenu.Menu);
    }
}
exports.TrayIcon = TrayIcon;
