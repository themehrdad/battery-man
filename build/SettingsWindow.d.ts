import { WindowBase } from "./WindowBase";
export declare class SettingsWindow extends WindowBase {
    protected getHtmlFile(): string;
    protected getHeight(): number;
    protected getWidth(): number;
    protected getIpcChannels(): string[];
    protected onIpcMessage(channel: string, ...args: any[]): void;
    protected getLoadingData(): any;
}
