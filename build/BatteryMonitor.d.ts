export declare class BatteryMonitor {
    private ip;
    private client;
    private device;
    constructor();
    init(): Promise<void>;
    run(): Promise<void>;
    private runInterval;
    private shutThePowerOff;
    private turnThePowerOn;
}
