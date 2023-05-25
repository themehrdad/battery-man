import {WindowBase} from "./WindowBase";
import {writeFileSync} from "fs";

export class SettingsWindow extends WindowBase {
    protected getHtmlFile(): string {
        return "settings";
    }

    protected getHeight(): number {
        return 250;
    }

    protected getWidth(): number {
        return 300;
    }

    protected getIpcChannels(): string[] {
        return ["save-settings"];
    }

    protected onIpcMessage(channel: string, ...args: any[]): void {
        if(channel === "save-settings") {
            writeFileSync("settings.json", JSON.stringify(args[0]));
        }
    }

    protected getLoadingData(): any {
        try {
            const data = require("../settings.json");
            return data;
        } catch {
            return {};
        }
    }
}