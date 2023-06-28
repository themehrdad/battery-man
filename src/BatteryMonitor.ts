import * as si from 'systeminformation';
import {Client} from 'tplink-smarthome-api';
import {AnyDevice} from "tplink-smarthome-api/lib/client";

const settings = require('../settings.json');

export class BatteryMonitor {
    private ip: string = "";
    private client: Client = new Client();
    // @ts-ignore
    private device: AnyDevice;

    constructor() {
    }

    public async init() {
        this.ip = settings.ip;
        this.device = await this.client.getDevice({host: this.ip});
    }

    public async run() {
        await this.runInterval();
        setInterval(async () => {
            await this.runInterval();
        }, 5 * 60 * 1000);
    }

    private async runInterval() {
        const {percent, isCharging} = await si.battery();
        const date = new Date(Date.now());

        this.logStatus({date, percent, isCharging});

        if (percent <= 20 && !isCharging) {
            await this.turnThePowerOn();
        } else if ((percent >= 80 && isCharging) || (percent == 100)) {
            await this.shutThePowerOff();
        } else {
            this.logDecision("doing nothing");
        }
    }

    private async shutThePowerOff() {
        this.logDecision("shutting the power off");
        await this.device.setPowerState(false);
    }

    private async turnThePowerOn() {
        this.logDecision("turning the power on");
        await this.device.setPowerState(true);
    }

    logDecision(message: string) {
        console.log(`${message}\n------------------`);
    }

    logStatus(status: {date: Date, percent: number, isCharging: boolean}) {
        const message = `${status.date} - ${status.percent}% - ${status.isCharging ? "charging" : "not charging"}`;
        console.log(message);
    }
}