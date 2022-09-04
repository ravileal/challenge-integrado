const { UniversityEntity } = require('../domain/entities/university-entity');

const updateUniversityUseCase = async (
    { universityRepository, schemaFactory },
    { id, dataView },
) => {
    const schema = schemaFactory(UniversityEntity.ENTITY);
    const findModel = universityRepository.getById(id);
    const universityModel = new UniversityEntity({
        id,
        ...findModel,
        ...dataView,
        updatedAt: new Date(),
        schema,
    });
    await universityRepository.save(universityModel);
};

module.exports = { updateUniversityUseCase };
