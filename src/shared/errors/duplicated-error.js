class DuplicatedError extends Error {
    status = 409;
    constructor(message) {
        super();
        this.message = message;
    }
}

module.exports = { DuplicatedError };
