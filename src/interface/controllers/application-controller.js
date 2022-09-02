const { controllerFactory } = require('../factories/controller-factory');

class ApplicationController {
    constructor(context) {
        this.server = context.server;
        this.server.onRequest = resource => controllerFactory(resource, context);
    }

    execute() {
        this.server.start();
    }
}
module.exports = { ApplicationController };
