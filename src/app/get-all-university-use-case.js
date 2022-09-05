const { UniversityEntity } = require('../domain/entities/university-entity');

const getAllUniversityUseCase = async (
    { universityRepository, UniversityView, schemaFactory },
    { filters },
) => {
    const schema = schemaFactory(UniversityEntity.ENTITY);
    const { data: universitiesModel, pagination } = await universityRepository.getAll(filters, {
        schema,
    });
    const universitiesView = universitiesModel.map(UniversityView.fromModel);
    return {
        pagination,
        data: universitiesView,
    };
};

module.exports = { getAllUniversityUseCase };
