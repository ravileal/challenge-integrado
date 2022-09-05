const { ValidationError } = require('../../shared/errors/validation-error');

class UniversityEntity {
    static #REQUIRED_FIELDS = ['name'];
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
        throw new ValidationError(`Empity field: ${fieldsJoin}`);
    }

    #isNil(value) {
        return value === null || value === undefined;
    }

    #isEmptyArray(value) {
        return Array.isArray(value) && !value.length;
    }

    toSchema(action = 'save') {
        action === 'update' ? this.updateSchema() : this.newSchema();
        return this.schema;
    }

    newSchema() {
        this.schema = new this.schema({
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

    updateSchema() {
        this.schema.set('name', this.name);
        this.schema.set('state', this.state);
        this.schema.set('state_Code', this.stateCode);
        this.schema.set('country', this.country);
        this.schema.set('country_Code', this.countryCode);
        this.schema.set('web_Pages', this.webPages);
        this.schema.set('domains', this.domains);
        this.schema.set('createdAt', this.createdAt);
        this.schema.set('updatedAt', this.updatedAt);
    }
}

module.exports = { UniversityEntity };
