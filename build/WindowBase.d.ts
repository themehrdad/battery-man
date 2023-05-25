export declare abstract class WindowBase {
    private browserWindow?;
    constructor();
    init(): void;
    protected abstract getHtmlFile(): string;
    protected abstract getWidth(): number;
    protected abstract getHeight(): number;
    protected abstract getLoadingData(): any;
    protected abstract getIpcChannels(): string[];
    protected abstract onIpcMessage(channel: string, ...args: any[]): void;
    show(): void;
}
