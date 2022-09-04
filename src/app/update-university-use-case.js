const { UniversityEntity } = require('../domain/entities/university-entity');

const updateUniversityUseCase = async (
    { universityRepository, schemaFactory, universityView },
    { id, dataView },
) => {
    new UniversityEntity(dataView);
    const schema = schemaFactory(UniversityEntity.ENTITY);
    const findModel = await universityRepository.getById(id, { schema });
    const universityModel = new UniversityEntity({
        id,
        ...findModel,
        ...dataView,
        updatedAt: new Date(),
        schema,
    });
    const result = await universityRepository.save(universityModel);
    const university = universityView.fit(result);
    return university;
};

module.exports = { updateUniversityUseCase };
