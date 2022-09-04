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
        const university = await model.toSchema().save();
        const universityModel = this.#toDomain(university);
        return universityModel;
    }

    async delete(id, model) {
        await model.schema.deleteOne({ _id: id });
    }
}

module.exports = { UniversityRepository };
