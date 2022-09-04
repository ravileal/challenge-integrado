const { UniversityEntity } = require('../domain/entities/university-entity');

const getAllUniversityUseCase = async (
    { universityRepository, universityView, schemaFactory },
    { filters },
) => {
    const schema = schemaFactory(UniversityEntity.ENTITY);
    const universitiesModel = await universityRepository.getAll(filters, { schema });
    const universitiesView = universitiesModel.map(universityView.fit);
    return universitiesView;
};

module.exports = { getAllUniversityUseCase };
