const { UniversityEntity } = require('../domain/entities/university-entity');

const getByIdUniversityUseCase = async (
    { universityRepository, UniversityView, schemaFactory },
    { filters: { id } },
) => {
    const schema = schemaFactory(UniversityEntity.ENTITY);
    const universityModel = await universityRepository.getById(id, { schema });
    const university = UniversityView.fromModel(universityModel);
    return university;
};

module.exports = { getByIdUniversityUseCase };
