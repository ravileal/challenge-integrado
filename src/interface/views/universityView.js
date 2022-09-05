class UniversityView {
    constructor({
        id,
        name,
        'state-province': stateProvince,
        state_code,
        country,
        alpha_two_code,
        web_pages,
        domains,
    }) {
        this.id = id;
        this.name = name;
        this['state-province'] = stateProvince;
        this.state_code = state_code;
        this.country = country;
        this.alpha_two_code = alpha_two_code;
        this.web_pages = web_pages;
        this.domains = domains;
    }

    static fromModel({ id, name, state, stateCode, country, countryCode, webPages, domains }) {
        return new UniversityView({
            id,
            name,
            ['state-province']: state,
            state_code: stateCode,
            country,
            alpha_two_code: countryCode,
            web_pages: webPages,
            domains,
        });
    }

    toModel() {
        return {
            id: this.id,
            name: this.name,
            state: this['state-province'],
            stateCode: this.state_code,
            country: this.country,
            countryCode: this.alpha_two_code,
            webPages: this.web_pages,
            domains: this.domains,
        };
    }
}

module.exports = { UniversityView };
