const { UniversityModel } = require('../entities/university-model');
const {
    IUniversityRepository,
} = require('../../infra/database/repositories/university-repository');
const { NotFoundError } = require('../../shared/errors/not-found-error');

class UniversityRepository extends IUniversityRepository {
    #domain = 'universities';

    #toDomain(value) {
        return new UniversityModel(value);
    }

    async getAll(filters, connection) {
        const universities = await connection.getAll(filters, this.#domain);
        if (!universities.length) throw new NotFoundError(`Not found university`);
        const universitiesModel = universities.map(this.#toDomain);
        return universitiesModel;
    }

    async getOne(id, filters, connection) {
        const university = await connection.getOne(id, filters, this.#domain);
        if (!university) throw new NotFoundError(`Not found university`);
        const universityModel = this.#toDomain(university);
        return universityModel;
    }

    async save(model, connection) {
        await connection.save(model, this.#domain);
        // return this.#toDomain({ id, ...model });
    }
}

module.exports = { UniversityRepository };
