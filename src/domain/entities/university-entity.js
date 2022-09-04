const { ValidationError } = require('../../shared/errors/validation-error');

class UniversityEntity {
    static #REQUIRED_FIELDS = ['name', 'state', 'country'];
    static #ARRAY_FIELDS = ['webPages', 'domains'];

    static ENTITY = 'university';

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
        schema,
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
        this.schema = schema;
        this.#validate();
    }

    #validate() {
        const fields = UniversityEntity.#REQUIRED_FIELDS.filter(field => {
            if (this.#isNil(this[field])) return true;
            if (UniversityEntity.#ARRAY_FIELDS.includes(field) && this.#isEmptyArray(field))
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

    toSchema() {
        return new this.schema({
            _id: this.id,
            name: this.name,
            state: this.state,
            state_Code: this.stateCode,
            country: this.country,
            country_Code: this.countryCode,
            web_Pages: this.webPages,
            domains: this.domains,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        });
    }
}

module.exports = { UniversityEntity };
