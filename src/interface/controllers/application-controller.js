const { controllerFactory } = require('../factories/controller-factory');

class ApplicationController {
    constructor(context) {
        this.server = context.server;
        this.server.onRequest = resource => {
            const controller = controllerFactory(resource, context);
            controller.configureServer();
        };
    }

    execute() {
        this.server.start();
    }
}
module.exports = { ApplicationController };
