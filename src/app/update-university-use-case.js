const { UniversityEntity } = require('../domain/entities/university-entity');

const updateUniversityUseCase = async (
    { universityRepository, schemaFactory, UniversityView },
    { id, dataView },
) => {
    new UniversityEntity(dataView.toModel());
    const schema = schemaFactory(UniversityEntity.ENTITY);
    const findModel = await universityRepository.getById(id, { schema });
    const universityModel = new UniversityEntity({
        ...findModel,
        ...dataView.toModel(),
        updatedAt: new Date(),
    });
    universityModel.toSchema('update');
    const result = await universityRepository.save(universityModel);
    const university = UniversityView.fromModel(result);
    return university;
};

module.exports = { updateUniversityUseCase };
