"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const TaskbarIcon_1 = require("./TaskbarIcon");
const electron_1 = require("electron");
const TrayIcon_1 = require("./TrayIcon");
const TrayMenu_1 = require("./TrayMenu");
const SettingsWindow_1 = require("./SettingsWindow");
const BatteryMonitor_1 = require("./BatteryMonitor");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const ProductionWebServer_1 = require("./ProductionWebServer");
class Application {
    taskbarIcon = new TaskbarIcon_1.TaskbarIcon();
    // @ts-ignore
    trayIcon;
    // @ts-ignore
    trayMenu;
    settingsWindow = new SettingsWindow_1.SettingsWindow();
    batteryMonitor = new BatteryMonitor_1.BatteryMonitor();
    // @ts-ignore
    productionWebServer;
    async init() {
        this.trayMenu = new TrayMenu_1.TrayMenu(this);
        this.trayMenu.init();
        this.trayIcon = new TrayIcon_1.TrayIcon(this.trayMenu);
        await electron_1.app.whenReady();
        this.taskbarIcon.init();
        this.trayIcon.init();
        this.settingsWindow.init();
        await this.batteryMonitor.init();
    }
    showSettings() {
        this.settingsWindow.show();
    }
    exit() {
        electron_1.app.exit();
    }
    async run() {
        await this.init();
        if (!electron_is_dev_1.default) {
            this.productionWebServer = new ProductionWebServer_1.ProductionWebServer();
            await this.productionWebServer.run();
        }
        await this.taskbarIcon.hide();
        await this.batteryMonitor.run();
    }
}
exports.Application = Application;
