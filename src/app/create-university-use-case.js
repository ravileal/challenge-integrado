const { UniversityModel } = require('../domain/entities/university-model');
const { randomUUID: uuid } = require('node:crypto');

const createUniversityUseCase = async (
    { universityRepository },
    { universityView },
    connection,
) => {
    const universityModel = new UniversityModel({
        id: uuid(),
        ...universityView,
        createdAt: new Date(),
    });
    await universityRepository.save(universityModel, connection);
};

module.exports = { createUniversityUseCase };
