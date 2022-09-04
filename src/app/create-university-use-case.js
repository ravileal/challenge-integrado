const { UniversityEntity } = require('../domain/entities/university-entity');
// const { randomUUID: uuid } = require('node:crypto');

const createUniversityUseCase = async (
    { universityRepository, schemaFactory, UniversityView },
    { dataView },
    connection,
) => {
    const schema = schemaFactory(UniversityEntity.ENTITY);
    const data = {
        ...dataView,
        createdAt: new Date(),
        schema,
    };
    const universityModel = new UniversityEntity(data);
    const result = await universityRepository.save(universityModel, connection);
    const university = new UniversityView(result);
    return university;
};

module.exports = { createUniversityUseCase };
