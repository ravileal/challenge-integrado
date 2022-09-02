const getOneUniversityUseCase = async (
    { universityRepository, universityView },
    { filters },
    connection,
) => {
    const universityModel = await universityRepository.getOne(filters, connection);
    const university = universityView.fit(universityModel);
    return university;
};

module.exports = { getOneUniversityUseCase };
