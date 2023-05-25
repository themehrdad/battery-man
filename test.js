const { Client } = require('tplink-smarthome-api');

const client = new Client();

const plug = client.getDevice({host: '10.0.0.248'}).then((device) => {
    device.getSysInfo().then(console.log);
    device.setPowerState(true);
});