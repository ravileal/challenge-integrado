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
}
module.exports = { UniversitiesController };
