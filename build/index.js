"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = require("./Application");
const application = new Application_1.Application();
application.run().then(() => {
    console.log("Application started");
});
