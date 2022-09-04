const {
    IUniversityRepository,
} = require('../../infra/database/repositories/university-repository');
const { NotFoundError } = require('../../shared/errors/not-found-error');
const { UniversityEntity } = require('../entities/university-entity');

class UniversityRepository extends IUniversityRepository {
    #toDomain(data) {
        return new UniversityEntity({
            id: data._id.toString(),
            name: data.name,
            state: data.state,
            stateCode: data.state_Code,
            country: data.country,
            countryCode: data.country_Code,
            webPages: data.web_Pages,
            domains: data.domains,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });
    }

    async getAll(filters, model) {
        const universities = await model.schema.find(filters);
        if (!universities.length) throw new NotFoundError(`Not found university`);
        const universitiesModel = universities.map(this.#toDomain);
        return universitiesModel;
    }

    async getById(id, model) {
        const university = await model.schema.findOne({ _id: id });
        if (!university) throw new NotFoundError(`Not found university`);
        const universityModel = this.#toDomain(university);
        return universityModel;
    }

    async save(model) {
        const university = await model.toSchema().save();
        const universityModel = this.#toDomain(university);
        return universityModel;
    }

    async delete(id, model) {
        await model.schema.deleteOne({ _id: id });
    }
}

module.exports = { UniversityRepository };
