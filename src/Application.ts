import {TaskbarIcon} from "./TaskbarIcon";
import {app} from "electron";
import {TrayIcon} from "./TrayIcon";
import {TrayMenu} from "./TrayMenu";
import {SettingsWindow} from "./SettingsWindow";
import {BatteryMonitor} from "./BatteryMonitor";
import isDev from "electron-is-dev";
import {ProductionWebServer} from "./ProductionWebServer";

export class Application {
    private taskbarIcon: TaskbarIcon = new TaskbarIcon();
    // @ts-ignore
    private trayIcon: TrayIcon;
    // @ts-ignore
    private trayMenu: TrayMenu;
    private settingsWindow = new SettingsWindow();
    private batteryMonitor = new BatteryMonitor();
    // @ts-ignore
    private productionWebServer: ProductionWebServer;

    private async init() {
        this.trayMenu = new TrayMenu(this);
        this.trayMenu.init();
        this.trayIcon = new TrayIcon(this.trayMenu);
        await app.whenReady();
        this.taskbarIcon.init();
        this.trayIcon.init();
        this.settingsWindow.init();
        await this.batteryMonitor.init();
    }

    public showSettings() {
        this.settingsWindow.show();
    }

    public exit() {
        app.exit();
    }

    public async run() {
        await this.init();
        if(!isDev) {
            this.productionWebServer = new ProductionWebServer();
            await this.productionWebServer.run();
        }
        await this.taskbarIcon.hide();
        await this.batteryMonitor.run();
    }
}