const PORT = 2254;
import express from "express";

export class ProductionWebServer {
    constructor() {
    }
    async run() {
        const app = express();
        app.use(express.static('html'));
        app.listen(PORT, () => {
            console.log(`Production web server started on port ${PORT}`);
        });
    }
}