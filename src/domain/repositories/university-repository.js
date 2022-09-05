const {
    IUniversityRepository,
} = require('../../infra/database/repositories/university-repository');
const { DuplicatedError } = require('../../shared/errors/duplicated-error');
const { NotFoundError } = require('../../shared/errors/not-found-error');
const { UniversityEntity } = require('../entities/university-entity');

class UniversityRepository extends IUniversityRepository {
    #toDomain(schema) {
        return new UniversityEntity({
            id: schema._id.toString(),
            name: schema.name,
            state: schema.state,
            stateCode: schema.state_Code,
            country: schema.country,
            countryCode: schema.country_Code,
            webPages: schema.web_Pages,
            domains: schema.domains,
            createdAt: schema.createdAt,
            updatedAt: schema.updatedAt,
            schema: schema,
        });
    }

    async getAll({ pagination: { pageSize, pageNumber }, ...filters }, model) {
        const universities = await model.schema
            .find(filters)
            .limit(pageSize)
            .skip(pageNumber * pageSize);
        const totalCount = await model.schema.countDocuments(filters);
        const universitiesModel = universities.map(this.#toDomain);
        return {
            pagination: {
                pageNumber,
                pageSize,
                totalCount,
            },
            data: universitiesModel,
        };
    }

    async getById(id, model) {
        let university;
        try {
            university = await model.schema.findOne({ _id: id });
        } catch (e) {
            console.error(e);
        }
        if (!university) throw new NotFoundError(`Not found university`);
        const universityModel = this.#toDomain(university);
        return universityModel;
    }

    async save(model) {
        try {
            const university = await model.schema.save();
            const universityModel = this.#toDomain(university);
            return universityModel;
        } catch (e) {
            if (e.message.includes('duplicate key'))
                throw new DuplicatedError('University already registered');
        }
    }

    async delete(id, model) {
        await model.schema.deleteOne({ _id: id });
    }
}

module.exports = { UniversityRepository };
