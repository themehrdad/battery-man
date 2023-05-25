import {Menu} from 'electron';
import {Application} from "./Application";

export class TrayMenu {
    private menu?: Menu = undefined;

    constructor(private application: Application) {
    }

    public get Menu() {
        return this.menu;
    }

    init() {
        this.menu = Menu.buildFromTemplate([
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