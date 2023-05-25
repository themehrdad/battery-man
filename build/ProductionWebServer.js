"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionWebServer = void 0;
const PORT = 2254;
const express_1 = __importDefault(require("express"));
class ProductionWebServer {
    constructor() {
    }
    async run() {
        const app = (0, express_1.default)();
        app.use(express_1.default.static('html'));
        app.listen(PORT, () => {
            console.log(`Production web server started on port ${PORT}`);
        });
    }
}
exports.ProductionWebServer = ProductionWebServer;
