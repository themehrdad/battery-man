import {app} from "electron";
import {getIconFile} from "./util/getIconFile";

export class TaskbarIcon {
    constructor() {}

    public init() {
        const iconPath = getIconFile();
        app.dock.setIcon(iconPath);
    }

    public async show() {
        return app.dock.show();
    }

    public async hide() {
        return app.dock.hide();
    }

    public isVisible() {
        return app.dock.isVisible();
    }
}