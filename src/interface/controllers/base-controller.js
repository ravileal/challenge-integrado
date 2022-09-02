class BaseController {
    constructor({ server, methods: { get, post, put, patch, delete: _delete } }) {
        this.server = server;
        this.server.get = get;
        this.server.post = post;
        this.server.put = put;
        this.server.patch = patch;
        this.server.delete = _delete;
    }
}
module.exports = { BaseController };
