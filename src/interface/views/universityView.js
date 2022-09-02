class UniversityView {
    fit({ id, name, state, state_code, country, country_code, web_pages, domains }) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.state_code = state_code;
        this.country = country;
        this.country_code = country_code;
        this.web_pages = web_pages;
        this.domains = domains;
    }

    fromModel({ id, name, state, stateCode, country, countryCode, webPages, domains }) {
        this.id = id;
        this.name = name;
        this.state = state;
        this.state_code = stateCode;
        this.country = country;
        this.country_code = countryCode;
        this.web_pages = webPages;
        this.domains = domains;
    }
}

module.exports = { UniversityView };
