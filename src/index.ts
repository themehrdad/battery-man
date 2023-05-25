import {Application} from "./Application";

const application = new Application();
application.run().then(() => {
    console.log("Application started");
});
