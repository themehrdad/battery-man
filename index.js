const {app, BrowserWindow, Tray, Notification, nativeImage, screen} = require('electron');
const path = require('path');
const si = require('systeminformation');

let tray = null;
let batteryData = null;
let notificationDisplayed = false;

async function getBatteryStatus() {
    const batteryData = await si.battery();

    const {hasBattery, cycleCount, isCharging, maxCapacity, currentCapacity} = batteryData;
    const percentage = Math.round((currentCapacity / maxCapacity) * 100);
    return {
        hasBattery,
        cycleCount,
        isCharging,
        maxCapacity,
        currentCapacity,
        percentage
    }
}

function loadAppIcon(needsAttention = false) {
    const dir = needsAttention ? 'discharge' : 'charge';
    const scaleFactor = Math.ceil(screen.getPrimaryDisplay().scaleFactor);
    const iconName = `battery-${16 * scaleFactor}.png`;
    const iconPath = path.join(__dirname, 'icons', dir, iconName);
    return nativeImage.createFromPath(iconPath);
}

const createTray = () => {
    getBatteryStatus().then((data) => {
        batteryData = data;
        const icon = loadAppIcon();
        tray = new Tray(icon);
        tray.setToolTip('Tray man')
    });
}

const setExecutbleIcon = () => {
    app.dock.setIcon(loadAppIcon());
}

const setAppTitle = () => {
    app.dock.hide();
}

app.whenReady().then(() => {
    setAppTitle();
    setExecutbleIcon();
    createTray();
});

const updateStatus = () => {
    getBatteryStatus().then((data) => {
        batteryData = data;
        const {percentage, isCharging} = batteryData;
        const date = new Date();
        console.log({date, percentage, isCharging});
        if (percentage <= 20 && !isCharging && !notificationDisplayed) {
            const notification = {
                title: 'Battery Low',
                body: 'Battery is running low, please plug in your charger'
            }
            new Notification(notification).show();
            tray.setImage(loadAppIcon(true));
            notificationDisplayed = true;
        } else if (percentage >= 80 && isCharging && !notificationDisplayed) {
            const notification = {
                title: 'Battery High',
                body: 'Battery is running high, please unplug from your charger'
            }
            new Notification(notification).show();
            tray.setImage(loadAppIcon(true));
            notificationDisplayed = true;
        } else if (percentage >= 20 && percentage <= 80) {
            tray.setImage(loadAppIcon());
            notificationDisplayed = false;
        }
    });
}


setInterval(() => {
    getBatteryStatus().then((data) => {
        updateStatus();
    });
}, 60 * 1000);