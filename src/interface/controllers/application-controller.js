const { controllerFactory } = require('../factories/controller-factory');

class ApplicationController {
    constructor({ server }) {
        this.server = server;
        this.server.onRequest = this.#onRequest;
    }

    execute() {
        this.server.start();
    }

    #onRequest(resource, request, server) {
        controllerFactory(resource, { request, server });
    }
}
module.exports = { ApplicationController };
