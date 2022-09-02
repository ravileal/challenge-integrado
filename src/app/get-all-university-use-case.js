const getAllUniversityUseCase = async (
    { universityRepository, universityView },
    { filters },
    connection,
) => {
    const universitiesModel = await universityRepository.getAll(filters, connection);
    const universitiesView = universitiesModel.map(universityView.fit);
    return universitiesView;
};

module.exports = { getAllUniversityUseCase };
