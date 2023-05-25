import { TrayMenu } from "./TrayMenu";
export declare class TrayIcon {
    private trayMenu;
    private tray?;
    constructor(trayMenu: TrayMenu);
    init(): void;
}
