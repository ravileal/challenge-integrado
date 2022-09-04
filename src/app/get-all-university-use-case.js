const { UniversityEntity } = require('../domain/entities/university-entity');

const getAllUniversityUseCase = async (
    { universityRepository, UniversityView, schemaFactory },
    { filters },
) => {
    const schema = schemaFactory(UniversityEntity.ENTITY);
    const { data: universitiesModel, pagination } = await universityRepository.getAll(
        { pagination: filters.pagination },
        { schema },
    );
    const universitiesView = universitiesModel.map(v => new UniversityView(v));
    return {
        pagination,
        data: universitiesView,
    };
};

module.exports = { getAllUniversityUseCase };
