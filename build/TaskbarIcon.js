"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskbarIcon = void 0;
const electron_1 = require("electron");
const getIconFile_1 = require("./util/getIconFile");
class TaskbarIcon {
    constructor() { }
    init() {
        const iconPath = (0, getIconFile_1.getIconFile)();
        electron_1.app.dock.setIcon(iconPath);
    }
    async show() {
        return electron_1.app.dock.show();
    }
    async hide() {
        return electron_1.app.dock.hide();
    }
    isVisible() {
        return electron_1.app.dock.isVisible();
    }
}
exports.TaskbarIcon = TaskbarIcon;
