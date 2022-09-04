class ValidationError extends Error {
    status = 400;
    constructor(message) {
        super();
        this.message = message;
    }
}

module.exports = { ValidationError };
