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
        setInterval(async () => {
            await this.runInterval();
        }, 5 * 60 * 1000);
    }

    private async runInterval() {
        const {percent, isCharging} = await si.battery();
        const date = new Date().toTimeString();

        console.log({date, percent, isCharging});

        if (percent <= 20 && !isCharging) {
            await this.turnThePowerOn();
        } else if (percent >= 80 && isCharging) {
            await this.shutThePowerOff();
        } else {
            console.log("doing nothing");
        }
    }

    private async shutThePowerOff() {
        console.log("shutting the power off");
        await this.device.setPowerState(false);
    }

    private async turnThePowerOn() {
        console.log("turning the power on");
        await this.device.setPowerState(true);
    }
}