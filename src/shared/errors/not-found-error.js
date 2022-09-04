class NotFoundError extends Error {
    status = 404;
    constructor(message) {
        super();
        this.message = message;
    }
}

module.exports = { NotFoundError };
