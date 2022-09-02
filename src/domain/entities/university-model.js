const { ValidationError } = require('../../shared/errors/validation-error');

class UniversityModel {
    static #REQUIRED_FIELDS = [
        'id',
        'name',
        'state',
        'country',
        'countryCode',
        'webPages',
        'domains',
    ];
    static #ARRAY_FIELDS = ['webPages', 'domains'];

    constructor({
        id,
        name,
        state,
        stateCode,
        country,
        countryCode,
        webPages,
        domains,
        createdAt,
        updatedAt,
        deletedAt,
    }) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.stateCode = stateCode;
        this.country = country;
        this.countryCode = countryCode;
        this.webPages = webPages;
        this.domains = domains;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.#validate();
    }

    #validate() {
        const fields = UniversityModel.#REQUIRED_FIELDS.filter(field => {
            if (this.#isNil(this[field])) return true;
            if (UniversityModel.#ARRAY_FIELDS.includes(field) && this.#isEmptyArray(field))
                return true;
            return false;
        });
        if (!fields.length) return;
        const fieldsJoin = fields.join(', ');
        throw new ValidationError(`Empity fields ${fieldsJoin}`);
    }

    #isNil(value) {
        return value === null || value === undefined;
    }

    #isEmptyArray(value) {
        return Array.isArray(value) && !value.length;
    }
}

module.exports = { UniversityModel };
