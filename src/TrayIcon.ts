import { Tray } from "electron";
import {getIconFile} from "./util/getIconFile";
import {TrayMenu} from "./TrayMenu";

export class TrayIcon {
    private tray?: Tray = undefined;

    constructor(private trayMenu: TrayMenu) {}

    public init() {
        this.tray = new Tray(getIconFile());
        this.tray.setTitle("Battery Man");
        this.tray.setToolTip("Battery Man");
        this.tray.setContextMenu(this.trayMenu.Menu!);
    }
}