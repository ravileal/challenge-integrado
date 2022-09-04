/* eslint-disable no-unused-vars */
const { BaseController } = require('./base-controller');

class UniversitiesController extends BaseController {
    constructor({ server, ...context }) {
        super({
            server,
            context,
            connection: context.connection,
            view: context.UniversityView,
            useCases: {
                getById: context.getByIdUniversityUseCase,
                getAll: context.getAllUniversityUseCase,
                create: context.createUniversityUseCase,
                update: context.updateUniversityUseCase,
                delete: context.deleteUniversityUseCase,
            },
        });
    }

    configureServer() {
        const actions = ['get', 'post', 'put', 'delete'];
        for (const action of actions)
            this.server[action] = async request => {
                const cbAction = async () => await this[action].call(this, request);
                const result = await this.connection.getConnection(cbAction);
                return result;
            };
    }
}
module.exports = { UniversitiesController };
