"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsWindow = void 0;
const WindowBase_1 = require("./WindowBase");
const fs_1 = require("fs");
class SettingsWindow extends WindowBase_1.WindowBase {
    getHtmlFile() {
        return "settings";
    }
    getHeight() {
        return 250;
    }
    getWidth() {
        return 300;
    }
    getIpcChannels() {
        return ["save-settings"];
    }
    onIpcMessage(channel, ...args) {
        if (channel === "save-settings") {
            (0, fs_1.writeFileSync)("settings.json", JSON.stringify(args[0]));
        }
    }
    getLoadingData() {
        try {
            const data = require("../settings.json");
            return data;
        }
        catch {
            return {};
        }
    }
}
exports.SettingsWindow = SettingsWindow;
