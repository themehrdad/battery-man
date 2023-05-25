export declare class Application {
    private taskbarIcon;
    private trayIcon;
    private trayMenu;
    private settingsWindow;
    private batteryMonitor;
    private productionWebServer;
    private init;
    showSettings(): void;
    exit(): void;
    run(): Promise<void>;
}
