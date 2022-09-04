const { UniversityEntity } = require('../domain/entities/university-entity');

const deleteUniversityUseCase = async ({ universityRepository, schemaFactory }, { id }) => {
    const schema = schemaFactory(UniversityEntity.ENTITY);
    await universityRepository.delete(id, { schema });
};

module.exports = { deleteUniversityUseCase };
