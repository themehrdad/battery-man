import {screen} from "electron";
import {join} from "path";

export function getIconFile() {
    const scaleFactor = Math.ceil(screen.getPrimaryDisplay().scaleFactor);
    const iconName = `battery-${16 * scaleFactor}.png`;
    return join(__dirname, '../../icons/charge', iconName);
}