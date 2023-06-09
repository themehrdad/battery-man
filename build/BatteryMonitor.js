"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatteryMonitor = void 0;
const si = __importStar(require("systeminformation"));
const tplink_smarthome_api_1 = require("tplink-smarthome-api");
const settings = require('../settings.json');
class BatteryMonitor {
    ip = "";
    client = new tplink_smarthome_api_1.Client();
    // @ts-ignore
    device;
    constructor() {
    }
    async init() {
        this.ip = settings.ip;
        this.device = await this.client.getDevice({ host: this.ip });
    }
    async run() {
        await this.runInterval();
        setInterval(async () => {
            await this.runInterval();
        }, 5 * 60 * 1000);
    }
    async runInterval() {
        const { percent, isCharging } = await si.battery();
        const date = new Date(Date.now());
        this.logStatus({ date, percent, isCharging });
        if (percent <= 20 && !isCharging) {
            await this.turnThePowerOn();
        }
        else if ((percent >= 80 && isCharging) || (percent == 100)) {
            await this.shutThePowerOff();
        }
        else {
            this.logDecision("doing nothing");
        }
    }
    async shutThePowerOff() {
        this.logDecision("shutting the power off");
        await this.device.setPowerState(false);
    }
    async turnThePowerOn() {
        this.logDecision("turning the power on");
        await this.device.setPowerState(true);
    }
    logDecision(message) {
        console.log(`${message}\n------------------`);
    }
    logStatus(status) {
        const message = `${status.date} - ${status.percent}% - ${status.isCharging ? "charging" : "not charging"}`;
        console.log(message);
    }
}
exports.BatteryMonitor = BatteryMonitor;
