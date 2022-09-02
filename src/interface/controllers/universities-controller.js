/* eslint-disable no-unused-vars */
const { BaseController } = require('./base-controller');

class UniversitiesController extends BaseController {
    constructor({ server }) {
        const methods = {
            get: UniversitiesController.#get,
            post: UniversitiesController.#post,
            put: UniversitiesController.#put,
            delete: UniversitiesController.#delete,
        };
        super({ server, methods });
    }

    static async #get({ header, path, query }) {
        return 'asd';
    }

    static async #post({ data, header, path, query }) {
        return 'post';
    }

    static async #put({ data, header, path, query }) {
        return 'put';
    }

    static async #delete({ header, path, query }) {
        return 'delete';
    }
}
module.exports = { UniversitiesController };
