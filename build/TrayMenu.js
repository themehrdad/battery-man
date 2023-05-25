"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrayMenu = void 0;
const electron_1 = require("electron");
class TrayMenu {
    application;
    menu = undefined;
    constructor(application) {
        this.application = application;
    }
    get Menu() {
        return this.menu;
    }
    init() {
        this.menu = electron_1.Menu.buildFromTemplate([
            {
                id: "settings",
                label: "Settings",
                click: () => {
                    this.application.showSettings();
                }
            }, {
                id: "exit",
                label: "Exit",
                click: () => {
                    this.application.exit();
                }
            }
        ]);
    }
}
exports.TrayMenu = TrayMenu;
