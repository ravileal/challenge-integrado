/* eslint-disable no-unused-vars */
const { BaseController } = require('./base-controller');

class UniversitiesController extends BaseController {
    constructor({ server, ...context }) {
        super({
            server,
            context,
            connection: context.connection,
            view: context.universityView,
            useCases: {
                getOne: context.getOneUniversityUseCase,
                getAll: context.getAllUniversityUseCase,
                create: context.createUniversityUseCase,
                update: context.updateUniversityUseCase,
                delete: context.deleteUniversityUseCase,
            },
        });
    }

    async post({ data }) {
        const payload = { universityView: super.view.fit(data) };
        const result = await super.post(payload);
        return result;
    }

    async put({ data, path: { paths } }) {
        const payload = { universityView: super.view.fit(data), id: paths[0] };
        const result = await super.put(payload);
        return result;
    }
}
module.exports = { UniversitiesController };
