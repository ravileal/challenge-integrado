const { UniversityEntity } = require('../domain/entities/university-entity');

const getByIdUniversityUseCase = async (
    { universityRepository, universityView, schemaFactory },
    { filters: { id } },
) => {
    const schema = schemaFactory(UniversityEntity.ENTITY);
    const universityModel = await universityRepository.getById(id, { schema });
    const university = universityView.fit(universityModel);
    return university;
};

module.exports = { getByIdUniversityUseCase };
