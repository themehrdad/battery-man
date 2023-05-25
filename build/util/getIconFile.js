"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIconFile = void 0;
const electron_1 = require("electron");
const path_1 = require("path");
function getIconFile() {
    const scaleFactor = Math.ceil(electron_1.screen.getPrimaryDisplay().scaleFactor);
    const iconName = `battery-${16 * scaleFactor}.png`;
    return (0, path_1.join)(__dirname, '../../icons/charge', iconName);
}
exports.getIconFile = getIconFile;
