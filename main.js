const {app, BrowserWindow, Tray, Notification, nativeImage, screen} = require('electron');
const path = require('path');
const si = require('systeminformation');

let tray = null;


