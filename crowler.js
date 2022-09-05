/* eslint-disable no-console */
const axios = require('axios');

(async () => {
    console.info('Start import universities');
    const resumeOnSave = {
        count: {
            total: 0,
            error: 0,
            sucess: 0,
        },
        errors: new Map(),
    };
    const countries = [
        'argentina',
        'brazil',
        'chile',
        'colombia',
        'paraguay',
        'peru',
        'suriname',
        'uruguay',
    ];
    const base = 'http://universities.hipolabs.com/';
    const promisesFind = countries.map(async country => {
        const result = await axios.get(`${base}search?country=${country}`).catch(console.error);

        return result?.data;
    });
    const universities = await Promise.allSettled(promisesFind);
    const sucessFindData = universities.map(({ value }) => value).flat();
    const promisesCreate = sucessFindData.map(async university => {
        try {
            const result = await axios.post('http://localhost:3000/universities', university);
            resumeOnSave.count.sucess += 1;

            return result?.data;
        } catch (e) {
            console.error({ code: e.code, data: e.config.data, error: e.message });
            resumeOnSave.errors.set(e.message, {
                code: e.code,
                sample: e.config.data,
                error: e.message,
            });
            resumeOnSave.count.error += 1;
        } finally {
            resumeOnSave.count.total += 1;
        }
    });
    await Promise.all(promisesCreate);

    console.info('End import universities - ', resumeOnSave);
})();
