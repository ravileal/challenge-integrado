const { UniversityModel } = require('../domain/entities/university-model');

const updateUniversityUseCase = async (
    { universityRepository },
    { id, universityView },
    connection,
) => {
    const universityModel = new UniversityModel({ id, ...universityView, updatedAt: new Date() });
    await universityRepository.save(universityModel, connection);
};

module.exports = { updateUniversityUseCase };
