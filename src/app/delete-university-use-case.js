const deleteUniversityUseCase = async ({ universityRepository }, { id }, connection) => {
    const universityModel = await universityRepository.getOne({ id }, connection);
    universityModel.deletedAt = new Date();
    await universityRepository.save(universityModel, connection);
};

module.exports = { deleteUniversityUseCase };
